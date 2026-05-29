export function UploadCTA() {
  return (
    <section id="upload" className="relative py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="glass-card relative overflow-hidden p-12 text-center md:p-20">
          <div className="absolute inset-0 -z-10 opacity-30" style={{ background: "var(--gradient-gold)" }} />
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-[var(--gold-light)]">
            Guest Memories
          </p>
          <h2 className="font-display text-4xl font-light leading-tight md:text-6xl">
            Share what your <span className="text-gradient-gold italic">heart</span> captured
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-foreground/80">
            Guests can upload photos, videos and wishes — adding their perspective to the
            couple's official album, beautifully and privately.
          </p>
          <a
            href="#"
            className="mt-10 inline-block rounded-full bg-gradient-gold px-10 py-4 text-sm font-semibold uppercase tracking-wider text-[oklch(0.20_0.09_16)] shadow-luxury transition-all hover:scale-[1.03] hover:gold-glow"
          >
            Contribute a Memory
          </a>
        </div>
      </div>
    </section>
  );
}
