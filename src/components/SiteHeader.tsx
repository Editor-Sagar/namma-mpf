import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { AdminUnlockModal } from "@/components/AdminUnlockModal";
import { useIsAdmin, lockAdmin } from "@/lib/admin";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const admin = useIsAdmin();

  return (
    <>
      <header className="sticky top-0 z-50 w-full">
        <div className="glass-card mx-auto mt-4 flex max-w-7xl items-center justify-between rounded-2xl px-6 py-3 md:px-8">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              aria-label="Home"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-gold text-[oklch(0.20_0.09_16)] font-display text-lg font-bold shadow-luxury"
            >
              N
            </Link>
            <div className="leading-tight">
              <div className="font-display text-lg font-semibold tracking-wide">
                <Link to="/" className="text-gradient-gold">Namma </Link>
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  aria-label="Admin access"
                  title="Private access"
                  className="text-gradient-gold cursor-pointer transition-all hover:opacity-80"
                >
                  MPF
                </button>
              </div>
              <div className="hidden text-[10px] uppercase tracking-[0.25em] text-muted-foreground md:block">
                Memories · Preserved
              </div>
            </div>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            <Link to="/gallery" className="text-sm font-medium text-foreground/80 transition-colors hover:text-[var(--gold-light)]">Gallery</Link>
            <Link to="/films" className="text-sm font-medium text-foreground/80 transition-colors hover:text-[var(--gold-light)]">Films</Link>
            <a href="#features" className="text-sm font-medium text-foreground/80 transition-colors hover:text-[var(--gold-light)]">Albums</a>
            <a href="#about" className="text-sm font-medium text-foreground/80 transition-colors hover:text-[var(--gold-light)]">About</a>
          </nav>

          {admin ? (
            <div className="flex items-center gap-2">
              <Link
                to="/admin"
                className="rounded-full bg-gradient-gold px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[oklch(0.20_0.09_16)] shadow-luxury transition-transform hover:scale-[1.03]"
              >
                Admin
              </Link>
              <button
                onClick={lockAdmin}
                className="rounded-full border border-[var(--gold)]/40 px-3 py-2 text-xs text-[var(--gold-light)] transition hover:bg-[var(--gold)]/10"
                aria-label="Sign out admin"
              >
                ⎋
              </button>
            </div>
          ) : (
            <Link
              to="/films"
              className="rounded-full bg-gradient-gold px-5 py-2 text-sm font-semibold text-[oklch(0.20_0.09_16)] shadow-luxury transition-transform hover:scale-[1.03]"
            >
              Watch Films
            </Link>
          )}
        </div>
      </header>

      <AdminUnlockModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
