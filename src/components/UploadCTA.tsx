import { Link } from "@tanstack/react-router";

export function ClosingCTA() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="glass-card relative overflow-hidden p-12 text-center md:p-20">
          <div
            className="absolute inset-0 -z-10 opacity-30"
            style={{ background: "var(--gradient-gold)" }}
          />
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-[var(--gold-light)]">
            Your Private Vault
          </p>
          <h2 className="font-display text-4xl font-light leading-tight md:text-6xl">
            Step inside your <span className="text-gradient-gold italic">memories</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-foreground/80">
            Every photograph, every film, every quiet moment, gathered into one
            private space. Beautifully presented. Yours to keep forever.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/gallery"
              className="rounded-full bg-gradient-gold px-10 py-4 text-sm font-semibold uppercase tracking-wider text-[oklch(0.20_0.09_16)] shadow-luxury transition-all hover:scale-[1.03] hover:gold-glow"
            >
              Open the Gallery
            </Link>
            <Link
              to="/films"
              className="rounded-full border border-[var(--gold)]/50 px-10 py-4 text-sm font-semibold uppercase tracking-wider text-[var(--gold-light)] transition-all hover:bg-[var(--gold)]/10"
            >
              Watch the Films
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
