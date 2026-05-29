import { Link, useRouter } from "@tanstack/react-router";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  rightSlot?: React.ReactNode;
};

export function PageHeader({ eyebrow, title, subtitle, rightSlot }: PageHeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass-card mx-auto mt-4 flex max-w-7xl items-center justify-between gap-4 rounded-2xl px-5 py-3 md:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.history.back()}
            aria-label="Back"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--gold)]/40 text-[var(--gold-light)] transition-all hover:bg-[var(--gold)]/10"
          >
            ←
          </button>
          <Link
            to="/"
            aria-label="Home"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-[var(--gold)]/40 text-[var(--gold-light)] transition-all hover:bg-[var(--gold)]/10 sm:flex"
          >
            ⌂
          </Link>
        </div>

        <div className="min-w-0 flex-1 text-center">
          {eyebrow && (
            <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]">
              {eyebrow}
            </div>
          )}
          <div className="truncate font-display text-lg text-gradient-gold md:text-xl">
            {title}
          </div>
          {subtitle && (
            <div className="truncate text-[11px] text-foreground/60">{subtitle}</div>
          )}
        </div>

        <div className="flex items-center gap-2">{rightSlot}</div>
      </div>
    </header>
  );
}
