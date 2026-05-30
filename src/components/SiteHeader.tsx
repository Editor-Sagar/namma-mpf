import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { AdminUnlockModal } from "@/components/AdminUnlockModal";
import { useIsAdmin, lockAdmin } from "@/lib/admin";
import { WHATSAPP_URL } from "@/lib/contact";

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
                  aria-label="Private access"
                  title="Private access"
                  className="text-gradient-gold cursor-pointer transition-all hover:opacity-80"
                >
                  MPF
                </button>
              </div>
              <div className="hidden text-[10px] uppercase tracking-[0.28em] text-[var(--gold-light)]/70 md:block">
                Million's Photography &amp; Films
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
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-gold px-5 py-2 text-sm font-semibold text-[oklch(0.20_0.09_16)] shadow-luxury transition-transform hover:scale-[1.03]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19.05 4.91A10 10 0 0 0 4.1 18.36L3 22l3.74-1.08A10 10 0 1 0 19.05 4.9zM12 20.13a8.13 8.13 0 0 1-4.14-1.13l-.3-.18-2.22.64.66-2.17-.2-.31A8.13 8.13 0 1 1 12 20.13zm4.47-6.1c-.24-.12-1.45-.71-1.67-.79-.23-.08-.39-.12-.55.12-.16.24-.63.79-.78.95-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.18-1.41-1.32-1.65-.14-.24-.02-.36.1-.48.1-.1.24-.27.36-.41.12-.13.16-.23.24-.39.08-.16.04-.3-.02-.42-.06-.12-.55-1.34-.76-1.83-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.13 3.64 1.45.63 2.02.68 2.74.57.44-.07 1.45-.59 1.66-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28z"/>
              </svg>
              Contact Us
            </a>
          )}
        </div>
      </header>

      <AdminUnlockModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
