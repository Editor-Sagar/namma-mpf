// Server-only Google Drive helpers via Lovable Connector Gateway.
// Drive is intentionally never mentioned to end users.

const GATEWAY = "https://connector-gateway.lovable.dev/google_drive";
export const ROOT_FOLDER_ID = "1JreFK5tJUfsDzCP6C_hq4r5GaGPB5OaA";

function authHeaders() {
  const lov = process.env.LOVABLE_API_KEY;
  const drv = process.env.GOOGLE_DRIVE_API_KEY;
  if (!lov) throw new Error("Missing LOVABLE_API_KEY");
  if (!drv) throw new Error("Missing GOOGLE_DRIVE_API_KEY");
  return {
    Authorization: `Bearer ${lov}`,
    "X-Connection-Api-Key": drv,
  };
}

export type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  thumbnailLink?: string;
  videoMediaMetadata?: { width?: number; height?: number; durationMillis?: string };
  imageMediaMetadata?: { width?: number; height?: number };
  modifiedTime?: string;
};

export async function listFolderChildren(folderId: string): Promise<DriveFile[]> {
  const q = encodeURIComponent(`'${folderId}' in parents and trashed = false`);
  const fields = encodeURIComponent(
    "files(id,name,mimeType,size,thumbnailLink,videoMediaMetadata,imageMediaMetadata,modifiedTime)"
  );
  const url = `${GATEWAY}/drive/v3/files?q=${q}&fields=${fields}&pageSize=1000&orderBy=name`;
  const res = await fetch(url, { headers: authHeaders() });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Drive list failed ${res.status}: ${body}`);
  }
  const json = (await res.json()) as { files?: DriveFile[] };
  return json.files ?? [];
}

export async function getFileMeta(fileId: string): Promise<DriveFile> {
  const fields = encodeURIComponent(
    "id,name,mimeType,size,thumbnailLink,videoMediaMetadata,imageMediaMetadata,modifiedTime"
  );
  const url = `${GATEWAY}/drive/v3/files/${fileId}?fields=${fields}`;
  const res = await fetch(url, { headers: authHeaders() });
  if (!res.ok) throw new Error(`Drive meta failed ${res.status}`);
  return (await res.json()) as DriveFile;
}

export async function createFolder(name: string, parentId = ROOT_FOLDER_ID): Promise<DriveFile> {
  const res = await fetch(`${GATEWAY}/drive/v3/files?fields=id,name,mimeType`, {
    method: "POST",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      mimeType: "application/vnd.google-apps.folder",
      parents: [parentId],
    }),
  });
  if (!res.ok) throw new Error(`Drive folder create failed ${res.status}: ${await res.text()}`);
  return (await res.json()) as DriveFile;
}

export async function uploadFile(
  parentId: string,
  filename: string,
  mimeType: string,
  body: ArrayBuffer | Uint8Array
): Promise<DriveFile> {
  // Multipart upload
  const boundary = `mpf_${Math.random().toString(36).slice(2)}`;
  const metadata = JSON.stringify({ name: filename, parents: [parentId], mimeType });
  const enc = new TextEncoder();
  const head = enc.encode(
    `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${metadata}\r\n--${boundary}\r\nContent-Type: ${mimeType}\r\n\r\n`
  );
  const tail = enc.encode(`\r\n--${boundary}--`);
  const bodyBytes = body instanceof Uint8Array ? body : new Uint8Array(body);
  const payload = new Uint8Array(head.length + bodyBytes.length + tail.length);
  payload.set(head, 0);
  payload.set(bodyBytes, head.length);
  payload.set(tail, head.length + bodyBytes.length);

  const res = await fetch(
    `${GATEWAY}/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,size`,
    {
      method: "POST",
      headers: {
        ...authHeaders(),
        "Content-Type": `multipart/related; boundary=${boundary}`,
      },
      body: payload,
    }
  );
  if (!res.ok) throw new Error(`Drive upload failed ${res.status}: ${await res.text()}`);
  return (await res.json()) as DriveFile;
}

export async function streamFile(fileId: string, range: string | null): Promise<Response> {
  const headers: Record<string, string> = { ...authHeaders() };
  if (range) headers.Range = range;
  const res = await fetch(`${GATEWAY}/drive/v3/files/${fileId}?alt=media`, { headers });
  return res;
}
