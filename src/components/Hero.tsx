import heroImage from "@/assets/hero-wedding.jpg";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImage}
          alt="Cinematic wedding portrait"
          className="h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero-overlay)" }}
        />
      </div>

      <div className="mx-auto flex min-h-[92vh] max-w-6xl flex-col items-center justify-center px-6 py-32 text-center">
        <p className="animate-fade-in mb-6 text-xs uppercase tracking-[0.4em] text-[var(--gold-light)]/80">
          ✦  A Cinematic Memory Experience  ✦
        </p>

        <h1 className="animate-fade-up font-display text-6xl font-light leading-[0.95] md:text-8xl lg:text-9xl">
          <span className="text-shimmer">Namma MPF</span>
        </h1>

        <div className="divider-gold animate-fade-up delay-200 mx-auto my-8 w-40" />

        <p className="animate-fade-up delay-200 max-w-2xl font-display text-2xl italic text-foreground/90 md:text-3xl">
          Our Memories, Preserved Forever
        </p>

        <p className="animate-fade-up delay-300 mt-6 max-w-xl text-base text-foreground/70 md:text-lg">
          A premium platform for delivering your wedding photographs, cinematic films
          and timeless albums — wrapped in an experience as elegant as the day itself.
        </p>

        <div className="animate-fade-up delay-400 mt-12 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#features"
            className="group rounded-full bg-gradient-gold px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-[oklch(0.20_0.09_16)] shadow-luxury transition-all hover:scale-[1.03] hover:gold-glow"
          >
            View Gallery
          </a>
          <a
            href="#features"
            className="rounded-full border border-[var(--gold)]/50 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-[var(--gold-light)] transition-all hover:bg-[var(--gold)]/10 hover:border-[var(--gold)]"
          >
            Watch Films
          </a>
          <a
            href="#upload"
            className="rounded-full glass-card px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-foreground transition-all hover:gold-glow"
          >
            Upload Memories
          </a>
        </div>

        <div className="animate-fade-in delay-500 absolute bottom-10 left-1/2 -translate-x-1/2 text-[var(--gold-light)]/60">
          <div className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em]">
            Scroll
            <div className="h-10 w-px bg-gradient-to-b from-[var(--gold)] to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
