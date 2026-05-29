const features = [
  {
    title: "Premium Gallery Delivery",
    desc: "Masonry layouts, lightbox viewers and cinematic transitions for every photograph.",
    icon: "❖",
  },
  {
    title: "Wedding Film Experience",
    desc: "Native fullscreen players designed for your cinematic films and traditional videos.",
    icon: "▶",
  },
  {
    title: "Curated Album Selection",
    desc: "Mark your favourites with a tap. Your designer receives a curated, ordered set.",
    icon: "✶",
  },
  {
    title: "Full Quality Downloads",
    desc: "Save original master files of every photograph and film, exactly as delivered.",
    icon: "⤓",
  },
  {
    title: "Family Sharing",
    desc: "Private invites for hosts and guests. Share your day without sharing the internet.",
    icon: "✦",
  },
  {
    title: "Secure Access",
    desc: "Role-based, encrypted, invisible infrastructure. Your memories belong to you alone.",
    icon: "❈",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <p className="mb-6 text-xs uppercase tracking-[0.4em] text-[var(--gold)]">
            The Experience
          </p>
          <h2 className="font-display text-4xl font-light md:text-6xl">
            Crafted for <span className="text-gradient-gold italic">unforgettable</span> days
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <article
              key={f.title}
              className="glass-card hover-lift group relative overflow-hidden p-8"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-gold text-2xl text-[oklch(0.20_0.09_16)] shadow-luxury">
                {f.icon}
              </div>
              <h3 className="mb-3 font-display text-2xl font-medium text-[var(--gold-light)]">
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed text-foreground/75">{f.desc}</p>

              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[var(--gold)]/10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
