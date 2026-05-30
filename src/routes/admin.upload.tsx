import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { isAdmin } from "@/lib/admin";
import {
  listClientFolders,
  createClientFolder,
  uploadFilesToFolder,
} from "@/lib/drive.functions";

export const Route = createFileRoute("/admin/upload")({
  head: () => ({
    meta: [
      { title: "Upload · Admin · Namma MPF" },
      { name: "robots", content: "noindex" },
    ],
  }),
  beforeLoad: () => {
    if (typeof window !== "undefined" && !isAdmin()) {
      throw redirect({ to: "/" });
    }
  },
  component: UploadPage,
});

type Folder = { id: string; name: string };

function UploadPage() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [newName, setNewName] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [shareUrl, setShareUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const refresh = async () => {
    try {
      const data = await listClientFolders();
      setFolders(data);
    } catch (e) {
      setStatus(`Could not load events: ${(e as Error).message}`);
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  useEffect(() => {
    if (!selected) return setShareUrl("");
    setShareUrl(`${window.location.origin}/g/${selected}`);
  }, [selected]);

  const handleCreate = async () => {
    if (!newName.trim()) return;
    setBusy(true);
    setStatus("Creating event…");
    try {
      const f = await createClientFolder({ data: { name: newName.trim() } });
      setNewName("");
      await refresh();
      setSelected(f.id);
      setStatus(`Created “${f.name}”.`);
    } catch (e) {
      setStatus(`Create failed: ${(e as Error).message}`);
    } finally {
      setBusy(false);
    }
  };

  const handleUpload = async () => {
    const files = fileRef.current?.files;
    if (!files || files.length === 0) {
      setStatus("Choose files first.");
      return;
    }
    if (!selected) {
      setStatus("Pick or create an event first.");
      return;
    }
    setBusy(true);
    setStatus(`Uploading ${files.length} file${files.length > 1 ? "s" : ""}…`);
    try {
      const fd = new FormData();
      fd.set("folderId", selected);
      Array.from(files).forEach((f) => fd.append("files", f));
      const res = await uploadFilesToFolder({ data: fd });
      setStatus(`Uploaded ${res.uploaded.length} file(s).`);
      if (fileRef.current) fileRef.current.value = "";
    } catch (e) {
      setStatus(`Upload failed: ${(e as Error).message}`);
    } finally {
      setBusy(false);
    }
  };

  const copyShare = async () => {
    if (!shareUrl) return;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-6 py-16">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--gold)]">Admin Upload</p>
          <h1 className="mt-4 font-display text-5xl font-light md:text-6xl">
            Add to a <span className="text-gradient-gold italic">client</span> gallery
          </h1>
          <div className="divider-gold mx-auto mt-6 w-40" />
        </div>

        <section className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="glass-card p-6">
            <h2 className="font-display text-xl text-[var(--gold-light)]">1. Choose an event</h2>
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="mt-4 w-full rounded-lg border border-[var(--gold)]/30 bg-background/40 px-4 py-3 text-sm"
            >
              <option value="">— Select —</option>
              {folders.map((f) => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>

            <div className="mt-6">
              <label className="text-xs uppercase tracking-[0.3em] text-foreground/60">
                Or create new
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Anita &amp; Rohan, Dec 2026"
                  className="flex-1 rounded-lg border border-[var(--gold)]/30 bg-background/40 px-4 py-2.5 text-sm"
                />
                <button
                  onClick={handleCreate}
                  disabled={busy || !newName.trim()}
                  className="rounded-lg bg-gradient-gold px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[oklch(0.20_0.09_16)] shadow-luxury disabled:opacity-40"
                >
                  Create
                </button>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <h2 className="font-display text-xl text-[var(--gold-light)]">2. Upload files</h2>
            <input
              ref={fileRef}
              type="file"
              multiple
              className="mt-4 block w-full text-sm text-foreground/80 file:mr-4 file:rounded-full file:border-0 file:bg-gradient-gold file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-wider file:text-[oklch(0.20_0.09_16)]"
            />
            <p className="mt-2 text-[11px] text-foreground/50">
              Photos, videos, films, anything. Large files supported.
            </p>
            <button
              onClick={handleUpload}
              disabled={busy || !selected}
              className="mt-5 w-full rounded-full bg-gradient-gold px-6 py-3 text-sm font-semibold uppercase tracking-wider text-[oklch(0.20_0.09_16)] shadow-luxury disabled:opacity-40"
            >
              {busy ? "Working…" : "Upload to gallery"}
            </button>
          </div>
        </section>

        {shareUrl && (
          <section className="glass-card mt-8 p-6">
            <h2 className="font-display text-xl text-[var(--gold-light)]">
              3. Share with your client
            </h2>
            <p className="mt-2 text-sm text-foreground/70">
              Send this private link. Only this link opens this gallery.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <code className="flex-1 truncate rounded-lg border border-[var(--gold)]/30 bg-background/40 px-4 py-3 text-sm">
                {shareUrl}
              </code>
              <button
                onClick={copyShare}
                className="rounded-full border border-[var(--gold)]/50 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--gold-light)] hover:bg-[var(--gold)]/10"
              >
                {copied ? "Copied" : "Copy link"}
              </button>
              <Link
                to="/g/$folderId"
                params={{ folderId: selected }}
                className="rounded-full bg-gradient-gold px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[oklch(0.20_0.09_16)] shadow-luxury"
              >
                Preview
              </Link>
            </div>
          </section>
        )}

        {status && (
          <p className="mt-6 text-center text-sm text-[var(--gold-light)]/80">{status}</p>
        )}

        <div className="mt-16 text-center">
          <Link
            to="/admin"
            className="text-xs uppercase tracking-[0.3em] text-foreground/60 hover:text-[var(--gold-light)]"
          >
            ← Back to admin suite
          </Link>
        </div>
      </main>
    </div>
  );
}
