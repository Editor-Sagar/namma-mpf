import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass-card mx-auto mt-4 flex max-w-7xl items-center justify-between rounded-2xl px-6 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-gold text-[oklch(0.20_0.09_16)] font-display text-lg font-bold shadow-luxury">
            N
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg font-semibold tracking-wide text-gradient-gold">
              Namma MPF
            </div>
            <div className="hidden text-[10px] uppercase tracking-[0.25em] text-muted-foreground md:block">
              Memories · Preserved
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {[
            { label: "Gallery", href: "#features" },
            { label: "Films", href: "#features" },
            { label: "Albums", href: "#features" },
            { label: "About", href: "#about" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-[var(--gold-light)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#upload"
          className="rounded-full bg-gradient-gold px-5 py-2 text-sm font-semibold text-[oklch(0.20_0.09_16)] shadow-luxury transition-transform hover:scale-[1.03]"
        >
          Upload Memories
        </a>
      </div>
    </header>
  );
}
