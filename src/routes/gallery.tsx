import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { DownloadButton } from "@/components/DownloadButton";
import { demoPhotos, type GalleryPhoto } from "@/lib/demoMedia";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery · Namma MPF" },
      {
        name: "description",
        content:
          "Your private wedding gallery, view, download and relive every photograph in full quality.",
      },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [active, setActive] = useState<GalleryPhoto | null>(null);

  return (
    <div className="min-h-screen">
      <PageHeader
        eyebrow="Private Gallery"
        title="Aarav ❤ Meera"
        subtitle="14 February 2026 · The Leela Palace"
        rightSlot={
          <DownloadButton
            href="#"
            filename="namma-mpf-gallery.zip"
            label="Download All"
            className="hidden sm:inline-flex"
          />
        }
      />

      <main className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--gold)]">
            {demoPhotos.length} memories
          </p>
          <h1 className="mt-3 font-display text-4xl font-light md:text-5xl">
            The <span className="text-gradient-gold italic">Photograph</span> Collection
          </h1>
          <div className="divider-gold mx-auto mt-6 w-32" />
        </div>

        {/* Masonry layout via CSS columns */}
        <div className="columns-1 gap-4 sm:columns-2 md:gap-5 lg:columns-3 xl:columns-4">
          {demoPhotos.map((p) => (
            <button
              key={p.id}
              onClick={() => setActive(p)}
              className="group mb-4 block w-full overflow-hidden rounded-xl border border-[var(--gold)]/15 transition-all hover:border-[var(--gold)]/50 hover:gold-glow md:mb-5"
            >
              <div className="relative overflow-hidden">
                <img
                  src={p.src}
                  alt={p.title}
                  loading="lazy"
                  width={p.width}
                  height={p.height}
                  className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-[oklch(0.15_0.07_14)]/95 to-transparent p-4 text-left transition-transform duration-500 group-hover:translate-y-0">
                  <div className="font-display text-base text-[var(--gold-light)]">{p.title}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Mobile floating download */}
        <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 sm:hidden">
          <DownloadButton href="#" filename="namma-mpf-gallery.zip" label="Download All" />
        </div>
      </main>

      {active && <Lightbox photo={active} onClose={() => setActive(null)} />}
    </div>
  );
}

function Lightbox({ photo, onClose }: { photo: GalleryPhoto; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-[oklch(0.10_0.05_14)]/95 p-4 backdrop-blur-xl animate-fade-in"
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--gold)]/40 text-xl text-[var(--gold-light)] transition hover:bg-[var(--gold)]/10"
      >
        ✕
      </button>

      <img
        src={photo.src}
        alt={photo.title}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[80vh] max-w-full rounded-lg object-contain shadow-luxury"
      />

      <div
        onClick={(e) => e.stopPropagation()}
        className="mt-6 flex flex-col items-center gap-3"
      >
        <div className="font-display text-2xl text-gradient-gold">{photo.title}</div>
        <DownloadButton
          href={photo.src}
          filename={`${photo.id}-${photo.title.replace(/\s+/g, "-").toLowerCase()}.jpg`}
          label="Download Original"
        />
      </div>
    </div>
  );
}
