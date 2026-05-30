import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { getFolderInfo, listFolder, type GalleryItem } from "@/lib/drive.functions";
import { REVIEW_URL, WHATSAPP_URL } from "@/lib/contact";

const folderQuery = (folderId: string) =>
  queryOptions({
    queryKey: ["client-folder", folderId],
    queryFn: async () => {
      const [info, contents] = await Promise.all([
        getFolderInfo({ data: { folderId } }),
        listFolder({ data: { folderId } }),
      ]);
      return { info, contents };
    },
  });

export const Route = createFileRoute("/g/$folderId")({
  head: ({ loaderData }) => {
    const name = loaderData?.info?.name ?? "Private Gallery";
    return {
      meta: [
        { title: `${name} · Namma MPF` },
        { name: "robots", content: "noindex" },
      ],
    };
  },
  loader: async ({ context, params }) => {
    try {
      const data = await context.queryClient.ensureQueryData(folderQuery(params.folderId));
      return data;
    } catch {
      throw notFound();
    }
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center text-center">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-[var(--gold)]">Private link</p>
        <h1 className="mt-3 font-display text-4xl">Gallery not found</h1>
        <Link to="/" className="mt-6 inline-block text-[var(--gold-light)] underline">Return home</Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="flex min-h-screen items-center justify-center px-6 text-center">
      <div>
        <h1 className="font-display text-3xl">We couldn't open this gallery</h1>
        <p className="mt-3 text-sm text-foreground/60">{error.message}</p>
      </div>
    </div>
  ),
  component: ClientGallery,
});

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return y;
}

function MediaThumb({ item }: { item: GalleryItem }) {
  if (item.kind === "video") {
    return (
      <video
        src={`/api/m/${item.id}`}
        muted
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
      />
    );
  }
  return (
    <img
      src={`/api/m/${item.id}`}
      alt={item.name}
      loading="lazy"
      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
  );
}

function ClientGallery() {
  const { folderId } = Route.useParams();
  const { data } = useSuspenseQuery(folderQuery(folderId));
  const { info, contents } = data;
  const y = useScrollY();

  const heroVideo = contents.videos[0];

  const images = contents.images;
  const cols: GalleryItem[][] = [[], [], []];
  images.forEach((img, i) => cols[i % 3].push(img));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="relative h-[100vh] overflow-hidden">
        <div className="absolute inset-0 -z-10">
          {heroVideo ? (
            <video
              ref={(el) => {
                if (el) el.play().catch(() => {});
              }}
              src={`/api/m/${heroVideo.id}`}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-[oklch(0.18_0.05_30)] to-[oklch(0.10_0.04_20)]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/40 to-background" />
        </div>

        <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-gold text-[oklch(0.20_0.09_16)] font-display text-lg font-bold shadow-luxury">N</div>
            <div className="leading-tight">
              <div className="font-display text-lg tracking-wide text-gradient-gold">Namma MPF</div>
              <div className="hidden text-[10px] uppercase tracking-[0.28em] text-[var(--gold-light)]/70 md:block">
                Million's Photography & Films
              </div>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gradient-gold px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[oklch(0.20_0.09_16)] shadow-luxury"
            >
              Contact Us
            </a>
          </div>
        </header>

        <div
          className="relative z-10 mx-auto flex h-[calc(100vh-96px)] max-w-5xl flex-col items-center justify-center px-6 text-center"
          style={{ transform: `translateY(${y * 0.25}px)`, opacity: Math.max(0, 1 - y / 600) }}
        >
          <p className="text-[11px] uppercase tracking-[0.45em] text-[var(--gold-light)]/80">
            A Private Collection For
          </p>
          <h1 className="mt-4 font-display text-5xl font-light leading-tight md:text-7xl">
            <span className="text-shimmer">{info.name}</span>
          </h1>
          <div className="divider-gold mx-auto my-8 w-32" />
          <p className="max-w-xl font-display text-xl italic text-foreground/80 md:text-2xl">
            Our Memories, Preserved Forever
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a href="#collection" className="rounded-full bg-gradient-gold px-7 py-3 text-xs font-semibold uppercase tracking-wider text-[oklch(0.20_0.09_16)] shadow-luxury">
              Enter the Collection
            </a>
          </div>
          <div className="mt-10 text-[10px] uppercase tracking-[0.3em] text-[var(--gold-light)]/60">Scroll</div>
        </div>
      </section>

      <section id="collection" className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--gold)]">The Collection</p>
          <h2 className="mt-3 font-display text-4xl font-light md:text-5xl">
            Chapters of <span className="text-gradient-gold italic">{info.name}</span>
          </h2>
          <div className="divider-gold mx-auto mt-5 w-32" />
        </div>

        {contents.folders.length > 0 && (
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {contents.folders.map((f) => (
              <Link
                key={f.id}
                to="/g/$folderId"
                params={{ folderId: f.id }}
                className="glass-card hover-lift group block overflow-hidden p-6"
              >
                <div className="mb-3 text-xl text-[var(--gold)]">✦</div>
                <h3 className="font-display text-xl text-[var(--gold-light)]">{f.name}</h3>
                <p className="mt-2 text-xs uppercase tracking-[0.3em] text-foreground/50">Open chapter →</p>
              </Link>
            ))}
          </div>
        )}

        {images.length > 0 && (
          <div className="mt-20">
            <p className="text-center text-xs uppercase tracking-[0.4em] text-[var(--gold)]">Photographs</p>
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              {cols.map((col, i) => {
                const dir = i === 1 ? -1 : 1;
                const offset = (y - 600) * 0.08 * dir;
                return (
                  <div key={i} className="space-y-4" style={{ transform: `translate3d(0, ${offset}px, 0)` }}>
                    {col.map((img) => {
                      const ratio = img.width && img.height ? img.height / img.width : 1.25;
                      return (
                        <a
                          key={img.id}
                          href={`/api/m/${img.id}/download`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block overflow-hidden rounded-xl border border-[var(--gold)]/20"
                          style={{ aspectRatio: `${1} / ${ratio}` }}
                        >
                          <MediaThumb item={img} />
                        </a>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {contents.videos.length > 0 && (
          <div className="mt-24">
            <p className="text-center text-xs uppercase tracking-[0.4em] text-[var(--gold)]">Films & Videos</p>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {contents.videos.map((v) => (
                <div key={v.id} className="glass-card overflow-hidden p-3">
                  <video
                    src={`/api/m/${v.id}`}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full rounded-lg"
                  />
                  <div className="flex items-center justify-between px-3 py-3">
                    <span className="truncate text-sm text-foreground/80">{v.name}</span>
                    <a
                      href={`/api/m/${v.id}/download`}
                      className="rounded-full border border-[var(--gold)]/40 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--gold-light)] hover:bg-[var(--gold)]/10"
                    >
                      Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {contents.others.length > 0 && (
          <div className="mt-24">
            <p className="text-center text-xs uppercase tracking-[0.4em] text-[var(--gold)]">Albums & Files</p>
            <ul className="mx-auto mt-6 max-w-2xl divide-y divide-[var(--gold)]/15 rounded-2xl border border-[var(--gold)]/20">
              {contents.others.map((o) => (
                <li key={o.id} className="flex items-center justify-between px-5 py-3">
                  <span className="truncate text-sm">{o.name}</span>
                  <a
                    href={`/api/m/${o.id}/download`}
                    className="rounded-full border border-[var(--gold)]/40 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--gold-light)] hover:bg-[var(--gold)]/10"
                  >
                    Download
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {contents.folders.length === 0 &&
          contents.images.length === 0 &&
          contents.videos.length === 0 &&
          contents.others.length === 0 && (
            <p className="mt-16 text-center text-foreground/60">
              Your collection is being prepared. Please check back shortly.
            </p>
          )}
      </section>

      <section className="border-t border-[var(--gold)]/15 py-16">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-4 px-6">
          <DownloadAllButton items={[...contents.images, ...contents.videos, ...contents.others]} />
          <a
            href={REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gradient-gold px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-[oklch(0.20_0.09_16)] shadow-luxury"
          >
            Share Your Million-Dollar Experience
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-[var(--gold)]/50 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-[var(--gold-light)] hover:bg-[var(--gold)]/10"
          >
            Contact Us
          </a>
        </div>
        <p className="mt-8 text-center text-[10px] uppercase tracking-[0.4em] text-foreground/40">
          Namma MPF · Million's Photography & Films
        </p>
      </section>
    </div>
  );
}

function DownloadAllButton({ items }: { items: GalleryItem[] }) {
  const triggered = useRef(false);
  const onClick = () => {
    if (triggered.current) return;
    triggered.current = true;
    items.forEach((it, i) => {
      setTimeout(() => {
        const a = document.createElement("a");
        a.href = `/api/m/${it.id}/download`;
        a.rel = "noopener";
        document.body.appendChild(a);
        a.click();
        a.remove();
      }, i * 400);
    });
    setTimeout(() => (triggered.current = false), items.length * 400 + 500);
  };
  if (items.length === 0) return null;
  return (
    <button
      onClick={onClick}
      className="rounded-full border border-[var(--gold)]/50 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-[var(--gold-light)] hover:bg-[var(--gold)]/10"
    >
      Download All
    </button>
  );
}
