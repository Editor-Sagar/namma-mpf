import { createServerFn } from "@tanstack/react-start";
import {
  ROOT_FOLDER_ID,
  createFolder,
  getFileMeta,
  listFolderChildren,
  uploadFile,
  type DriveFile,
} from "./drive.server";

export type GalleryItem = {
  id: string;
  name: string;
  kind: "folder" | "image" | "video" | "other";
  mimeType: string;
  size?: string;
  width?: number;
  height?: number;
};

function classify(f: DriveFile): GalleryItem["kind"] {
  if (f.mimeType === "application/vnd.google-apps.folder") return "folder";
  if (f.mimeType.startsWith("image/")) return "image";
  if (f.mimeType.startsWith("video/")) return "video";
  return "other";
}

function toItem(f: DriveFile): GalleryItem {
  return {
    id: f.id,
    name: f.name,
    kind: classify(f),
    mimeType: f.mimeType,
    size: f.size,
    width: f.imageMediaMetadata?.width ?? f.videoMediaMetadata?.width,
    height: f.imageMediaMetadata?.height ?? f.videoMediaMetadata?.height,
  };
}

export const listClientFolders = createServerFn({ method: "GET" }).handler(async () => {
  const files = await listFolderChildren(ROOT_FOLDER_ID);
  return files
    .filter((f) => f.mimeType === "application/vnd.google-apps.folder")
    .map((f) => ({ id: f.id, name: f.name }));
});

export const listFolder = createServerFn({ method: "GET" })
  .inputValidator((d: { folderId: string }) => d)
  .handler(async ({ data }) => {
    const files = await listFolderChildren(data.folderId);
    const items = files.map(toItem);
    return {
      folders: items.filter((i) => i.kind === "folder"),
      images: items.filter((i) => i.kind === "image"),
      videos: items.filter((i) => i.kind === "video"),
      others: items.filter((i) => i.kind === "other"),
    };
  });

export const getFolderInfo = createServerFn({ method: "GET" })
  .inputValidator((d: { folderId: string }) => d)
  .handler(async ({ data }) => {
    const meta = await getFileMeta(data.folderId);
    return { id: meta.id, name: meta.name };
  });

export const createClientFolder = createServerFn({ method: "POST" })
  .inputValidator((d: { name: string; parentId?: string }) => d)
  .handler(async ({ data }) => {
    const name = data.name.trim().slice(0, 200);
    if (!name) throw new Error("Folder name required");
    const f = await createFolder(name, data.parentId || ROOT_FOLDER_ID);
    return { id: f.id, name: f.name };
  });

export const uploadFilesToFolder = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => {
    if (!(data instanceof FormData)) throw new Error("Expected FormData");
    const folderId = data.get("folderId");
    if (typeof folderId !== "string" || !folderId) throw new Error("folderId required");
    const files = data.getAll("files").filter((v): v is File => v instanceof File);
    if (files.length === 0) throw new Error("No files");
    return { folderId, files };
  })
  .handler(async ({ data }) => {
    const results: { id: string; name: string }[] = [];
    for (const file of data.files) {
      const buf = new Uint8Array(await file.arrayBuffer());
      const r = await uploadFile(
        data.folderId,
        file.name,
        file.type || "application/octet-stream",
        buf
      );
      results.push({ id: r.id, name: r.name });
    }
    return { uploaded: results };
  });
