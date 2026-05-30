// Public media proxy. Streams a file from Drive without revealing the source.
// URL: /api/m/<fileId>
import { createFileRoute } from "@tanstack/react-router";
import { streamFile } from "@/lib/drive.server";

export const Route = createFileRoute("/api/m/$")({
  server: {
    handlers: {
      GET: async ({ params, request }) => {
        const fileId = params._splat?.split("/")[0];
        if (!fileId) return new Response("Not found", { status: 404 });
        const range = request.headers.get("range");
        const upstream = await streamFile(fileId, range);
        const headers = new Headers();
        for (const h of [
          "content-type",
          "content-length",
          "content-range",
          "accept-ranges",
          "etag",
          "last-modified",
        ]) {
          const v = upstream.headers.get(h);
          if (v) headers.set(h, v);
        }
        headers.set("cache-control", "private, max-age=3600");
        return new Response(upstream.body, { status: upstream.status, headers });
      },
      HEAD: async ({ params }) => {
        const fileId = params._splat?.split("/")[0];
        if (!fileId) return new Response(null, { status: 404 });
        const upstream = await streamFile(fileId, null);
        return new Response(null, { status: upstream.status, headers: upstream.headers });
      },
    },
  },
});
