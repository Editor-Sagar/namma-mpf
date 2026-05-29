import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { isAdmin, lockAdmin } from "@/lib/admin";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin · Namma MPF" },
      { name: "robots", content: "noindex" },
    ],
  }),
  beforeLoad: () => {
    if (typeof window !== "undefined" && !isAdmin()) {
      throw redirect({ to: "/" });
    }
  },
  component: AdminPage,
});

const tiles = [
  { title: "Create Event", desc: "Begin a new wedding archive.", icon: "✦" },
  { title: "Manage Events", desc: "Edit, archive or delete events.", icon: "❖" },
  { title: "Upload Photos", desc: "Add client photographs to the gallery.", icon: "❈" },
  { title: "Upload Films", desc: "Publish cinematic and traditional films.", icon: "▶" },
  { title: "QR Codes", desc: "Generate gallery and upload QR codes.", icon: "▦" },
  { title: "Album Selections", desc: "Review the hosts' favourite picks.", icon: "♡" },
  { title: "Event Access", desc: "Invite hosts and guests privately.", icon: "✶" },
  { title: "Storage", desc: "Monitor backend storage usage.", icon: "⛁" },
];

function AdminPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--gold)]">
            Welcome, Keeper of Memories
          </p>
          <h1 className="mt-4 font-display text-5xl font-light md:text-6xl">
            The <span className="text-gradient-gold italic">Admin</span> Suite
          </h1>
          <div className="divider-gold mx-auto mt-6 w-40" />
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((t) => (
            <article
              key={t.title}
              className="glass-card hover-lift group cursor-pointer p-6"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-gold text-xl text-[oklch(0.20_0.09_16)] shadow-luxury">
                {t.icon}
              </div>
              <h3 className="font-display text-xl text-[var(--gold-light)]">{t.title}</h3>
              <p className="mt-2 text-xs text-foreground/65">{t.desc}</p>
            </article>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center gap-4">
          <Link
            to="/"
            className="text-xs uppercase tracking-[0.3em] text-foreground/60 transition hover:text-[var(--gold-light)]"
          >
            ← Back to Home
          </Link>
          <button
            onClick={lockAdmin}
            className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 transition hover:text-[var(--destructive)]"
          >
            Sign out of admin
          </button>
        </div>
      </main>
    </div>
  );
}
