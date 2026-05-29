export function About() {
  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="mb-6 text-xs uppercase tracking-[0.4em] text-[var(--gold)]">
          About Namma MPF
        </p>
        <h2 className="font-display text-4xl font-light leading-tight md:text-6xl">
          Every glance, every tear, every laugh —
          <span className="text-gradient-gold italic"> woven into a keepsake</span>.
        </h2>
        <div className="divider-gold mx-auto my-10 w-32" />
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-foreground/75">
          Namma MPF is a private, premium memory vault for the people who matter most.
          We deliver your wedding photographs, films and albums through an experience
          that honours the artistry of the moment — without ever feeling like a folder
          or a download link.
        </p>
      </div>
    </section>
  );
}
