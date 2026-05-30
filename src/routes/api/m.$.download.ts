// Forced-download variant: /api/m/<fileId>/download
import { createFileRoute } from "@tanstack/react-router";
import { getFileMeta, streamFile } from "@/lib/drive.server";

export const Route = createFileRoute("/api/m/$/download")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const fileId = params._splat;
        if (!fileId) return new Response("Not found", { status: 404 });
        const [meta, upstream] = await Promise.all([
          getFileMeta(fileId),
          streamFile(fileId, null),
        ]);
        const headers = new Headers();
        const ct = upstream.headers.get("content-type");
        if (ct) headers.set("content-type", ct);
        const cl = upstream.headers.get("content-length");
        if (cl) headers.set("content-length", cl);
        headers.set(
          "content-disposition",
          `attachment; filename="${encodeURIComponent(meta.name)}"`
        );
        return new Response(upstream.body, { status: upstream.status, headers });
      },
    },
  },
});
