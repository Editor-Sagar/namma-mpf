export function SiteFooter() {
  return (
    <footer className="relative mt-20 border-t border-[var(--gold)]/15 py-16">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <div className="font-display text-3xl text-gradient-gold">Namma MPF</div>
        <p className="mt-2 font-display italic text-foreground/70">
          Our Memories, Preserved Forever
        </p>
        <div className="divider-gold mx-auto my-8 w-40" />
        <p className="text-xs uppercase tracking-[0.3em] text-foreground/50">
          © {new Date().getFullYear()} Namma MPF · Crafted with love
        </p>
      </div>
    </footer>
  );
}
