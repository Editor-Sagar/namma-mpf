import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { tryUnlockAdmin } from "@/lib/admin";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function AdminUnlockModal({ open, onClose }: Props) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) {
      setValue("");
      setError(false);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tryUnlockAdmin(value)) {
      onClose();
      navigate({ to: "/admin" });
    } else {
      setError(true);
      setTimeout(() => setError(false), 1200);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[oklch(0.10_0.05_14)]/85 p-6 backdrop-blur-xl animate-fade-in"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className={
          "glass-card w-full max-w-md gold-glow rounded-2xl p-8 text-center shadow-luxury animate-fade-up " +
          (error ? "border-[var(--destructive)]/70" : "")
        }
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--gold)]/40 text-[var(--gold-light)] transition hover:bg-[var(--gold)]/10"
          style={{ position: "relative", float: "right", marginTop: "-1rem", marginRight: "-1rem" }}
        >
          ✕
        </button>

        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-gold text-2xl text-[oklch(0.20_0.09_16)] shadow-luxury">
          ✦
        </div>
        <p className="text-[10px] uppercase tracking-[0.4em] text-[var(--gold)]">
          Private Access
        </p>
        <h2 className="mt-2 font-display text-3xl text-gradient-gold">
          Enter the Secret Key
        </h2>
        <p className="mt-3 text-sm text-foreground/70">
          For the keepers of memories only.
        </p>

        <div className="mt-8">
          <input
            autoFocus
            type="password"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="★★★★★"
            className={
              "w-full rounded-full border bg-[oklch(0.20_0.09_16)]/60 px-6 py-4 text-center font-display text-2xl tracking-[0.5em] text-[var(--gold-light)] placeholder:text-[var(--gold)]/40 outline-none transition-all focus:gold-glow " +
              (error
                ? "border-[var(--destructive)]/70 animate-fade-in"
                : "border-[var(--gold)]/40 focus:border-[var(--gold)]")
            }
            aria-label="Secret key"
          />
          {error && (
            <p className="mt-3 text-xs uppercase tracking-[0.3em] text-[var(--destructive)]">
              Incorrect key
            </p>
          )}
        </div>

        <button
          type="submit"
          className="mt-8 w-full rounded-full bg-gradient-gold px-6 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-[oklch(0.20_0.09_16)] shadow-luxury transition-all hover:scale-[1.02] hover:gold-glow"
        >
          Let's enter the MILLION'S hearts
        </button>
      </form>
    </div>
  );
}
