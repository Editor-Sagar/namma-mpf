import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { DownloadButton } from "@/components/DownloadButton";
import { demoFilms, type Film } from "@/lib/demoMedia";

export const Route = createFileRoute("/films")({
  head: () => ({
    meta: [
      { title: "Films · Namma MPF" },
      {
        name: "description",
        content:
          "Watch your cinematic wedding films in full quality and download the originals to keep forever.",
      },
    ],
  }),
  component: FilmsPage,
});

function FilmsPage() {
  const [active, setActive] = useState<Film>(demoFilms[0]);

  return (
    <div className="min-h-screen">
      <PageHeader
        eyebrow="Cinematic Films"
        title="Aarav ❤ Meera"
        subtitle="Watch in HD · Download originals"
      />

      <main className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="mb-10 text-center">
          <h1 className="font-display text-4xl font-light md:text-5xl">
            The <span className="text-gradient-gold italic">Wedding</span> Films
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-foreground/70">
            Stream in the highest quality your connection allows, or download the
            original master file to keep, exactly as the filmmaker delivered it.
          </p>
          <div className="divider-gold mx-auto mt-6 w-32" />
        </div>

        {/* Player */}
        <div className="glass-card overflow-hidden rounded-2xl shadow-luxury">
          <div className="aspect-video w-full bg-black">
            <video
              key={active.id}
              src={active.src}
              poster={active.poster}
              controls
              playsInline
              preload="metadata"
              className="h-full w-full"
            />
          </div>
          <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
            <div className="min-w-0">
              <div className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">
                Now Playing · {active.duration}
              </div>
              <h2 className="mt-2 font-display text-3xl text-[var(--gold-light)]">
                {active.title}
              </h2>
              <p className="mt-2 max-w-xl text-sm text-foreground/70">
                {active.description}
              </p>
            </div>
            <DownloadButton
              href={active.src}
              filename={`${active.title.replace(/\s+/g, "-").toLowerCase()}.mp4`}
              label="Download Original"
            />
          </div>
        </div>

        {/* Playlist */}
        <div className="mt-12">
          <h3 className="mb-6 text-xs uppercase tracking-[0.4em] text-[var(--gold)]">
            All Films
          </h3>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {demoFilms.map((film) => {
              const isActive = film.id === active.id;
              return (
                <article
                  key={film.id}
                  className={
                    "group glass-card hover-lift overflow-hidden " +
                    (isActive ? "gold-glow border-[var(--gold)]/60" : "")
                  }
                >
                  <button
                    onClick={() => setActive(film)}
                    className="block w-full text-left"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={film.poster}
                        alt={film.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-[oklch(0.15_0.07_14)]/40 transition group-hover:bg-[oklch(0.15_0.07_14)]/20">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-gold text-[oklch(0.20_0.09_16)] shadow-luxury">
                          ▶
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 rounded-full bg-[oklch(0.15_0.07_14)]/80 px-2 py-1 text-[10px] tracking-wider text-[var(--gold-light)]">
                        {film.duration}
                      </div>
                    </div>
                  </button>
                  <div className="flex items-center justify-between gap-3 p-5">
                    <div className="min-w-0">
                      <div className="truncate font-display text-lg text-[var(--gold-light)]">
                        {film.title}
                      </div>
                      <div className="truncate text-xs text-foreground/60">
                        {film.description}
                      </div>
                    </div>
                    <DownloadButton
                      href={film.src}
                      filename={`${film.title.replace(/\s+/g, "-").toLowerCase()}.mp4`}
                      label="Save"
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
