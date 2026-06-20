import { useEffect, useMemo, useState } from "react";
import { REASONS, type Reason, type ReasonCategory } from "@/lib/reasons";
import { SectionHeader } from "./SectionHeader";
import { Particles } from "./Atmosphere";

const CATS: { key: ReasonCategory | "all"; label: string; icon: string }[] = [
  { key: "all", label: "All Reasons", icon: "✦" },
  { key: "love", label: "Love", icon: "❤️" },
  { key: "safety", label: "Safety", icon: "🛡" },
  { key: "home", label: "Home", icon: "🏡" },
  { key: "strength", label: "Strength", icon: "💪" },
  { key: "admire", label: "Admiration", icon: "✨" },
  { key: "fun", label: "Fun Moments", icon: "😂" },
  { key: "future", label: "Future", icon: "🌍" },
  { key: "friend", label: "Friendship", icon: "🤝" },
  { key: "comfort", label: "Comfort", icon: "🌙" },
];

const FAV_KEY = "mmd:favs";
const READ_KEY = "mmd:read";

export function ReasonsVault({ onComplete }: { onComplete?: () => void }) {
  const [opened, setOpened] = useState(false);
  const [active, setActive] = useState<Reason | null>(null);
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<ReasonCategory | "all">("all");
  const [favs, setFavs] = useState<Set<number>>(new Set());
  const [read, setRead] = useState<Set<number>>(new Set());
  const [favOnly, setFavOnly] = useState(false);

  useEffect(() => {
    try {
      setFavs(new Set(JSON.parse(localStorage.getItem(FAV_KEY) || "[]")));
      setRead(new Set(JSON.parse(localStorage.getItem(READ_KEY) || "[]")));
    } catch {}
  }, []);

  const persistFavs = (s: Set<number>) => {
    setFavs(new Set(s));
    localStorage.setItem(FAV_KEY, JSON.stringify([...s]));
  };
  const markRead = (day: number) => {
    if (read.has(day)) return;
    const next = new Set(read);
    next.add(day);
    setRead(next);
    localStorage.setItem(READ_KEY, JSON.stringify([...next]));
    if (next.size >= REASONS.length) onComplete?.();
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return REASONS.filter((r) => {
      if (cat !== "all" && r.category !== cat) return false;
      if (favOnly && !favs.has(r.day)) return false;
      if (q && !r.text.toLowerCase().includes(q) && !String(r.day).includes(q)) return false;
      return true;
    });
  }, [query, cat, favs, favOnly]);

  const random = () => {
    const r = REASONS[Math.floor(Math.random() * REASONS.length)];
    setActive(r);
    markRead(r.day);
  };

  const pct = Math.round((read.size / REASONS.length) * 100);

  if (!opened) {
    return (
      <section id="vault" className="relative px-6 py-28 md:py-40 max-w-6xl mx-auto">
        <SectionHeader
          kicker="Section 04 — The Emotional Core"
          title="The 365 Reasons Vault"
          subtitle="365 glowing memory capsules. One for every day you've made the world better just by being in it."
          center
        />
        <div className="relative mt-16 flex items-center justify-center">
          <Particles count={28} />
          <div className="relative w-[420px] h-[420px] max-w-[90vw] max-h-[90vw]">
            {/* outer ring */}
            <div className="absolute inset-0 rounded-full border-2 border-gold/40 animate-spin-slow" />
            <div className="absolute inset-6 rounded-full border border-bat/30" style={{ animation: "spin-slow 28s linear reverse infinite" }} />
            <div className="absolute inset-12 rounded-full hologram flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 200 80" className="w-40 text-bat animate-flicker" fill="currentColor">
                <path d="M100 28c-12 0-18 12-18 12s-10-16-32-16c-20 0-32 12-32 22 0 5 6 12 6 12s-12 6-2 9c8 3 19-2 22-5 4 8 19 10 32 5 5 9 16 11 24 11s19-2 24-11c13 5 28 3 32-5 3 3 14 8 22 5 10-3-2-9-2-9s6-7 6-12c0-10-12-22-32-22-22 0-32 16-32 16s-6-12-18-12z" />
              </svg>
            </div>
            <button
              onClick={() => setOpened(true)}
              className="absolute left-1/2 -translate-x-1/2 -bottom-2 bat-button hover:[&]:bat-button-hover whitespace-nowrap"
            >
              Open The Vault
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="vault" className="relative px-6 py-24 md:py-32 max-w-7xl mx-auto">
      <SectionHeader
        kicker="Section 04"
        title="The 365 Reasons Vault"
        subtitle="Every capsule is a day. Open one, lose yourself in it."
      />

      {/* Controls */}
      <div className="mt-10 glass-panel rounded-xl p-5 md:p-6 space-y-5">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
          <div className="flex-1 relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search reasons or jump to a day..."
              className="w-full bg-charcoal/80 border border-gold/20 rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-bat/60 focus:ring-2 focus:ring-bat/20"
            />
          </div>
          <button onClick={random} className="bat-button hover:[&]:bat-button-hover text-xs">🎲 Random Reason</button>
          <button
            onClick={() => setFavOnly((v) => !v)}
            className={`px-4 py-3 rounded-lg border text-xs tracking-widest uppercase font-[var(--font-mono-ui)] transition ${favOnly ? "bg-bat text-background border-bat" : "border-gold/30 text-gold/80 hover:border-bat/60"}`}
          >
            ★ Favorites {favs.size > 0 && `(${favs.size})`}
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {CATS.map((c) => (
            <button
              key={c.key}
              onClick={() => setCat(c.key)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs tracking-wider transition border ${
                cat === c.key
                  ? "bg-bat text-background border-bat"
                  : "border-gold/20 text-foreground/80 hover:border-bat/40 hover:text-bat"
              }`}
            >
              <span className="mr-1.5">{c.icon}</span>
              {c.label}
            </button>
          ))}
        </div>
        {/* Progress */}
        <div>
          <div className="flex justify-between text-[11px] font-[var(--font-mono-ui)] tracking-widest text-gold/70 mb-1.5">
            <span>VAULT PROGRESS</span>
            <span>
              {read.size} / {REASONS.length} · {pct}%
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-charcoal overflow-hidden border border-gold/20">
            <div className="h-full bg-gradient-to-r from-gold to-bat transition-all duration-700" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="mt-10 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
        {filtered.map((r) => {
          const isFav = favs.has(r.day);
          const isRead = read.has(r.day);
          return (
            <button
              key={r.day}
              onClick={() => {
                setActive(r);
                markRead(r.day);
              }}
              className={`group relative aspect-square rounded-lg border transition flex items-center justify-center font-[var(--font-mono-ui)] text-xs ${
                isRead
                  ? "border-bat/60 bg-bat/10 text-bat animate-capsule-glow"
                  : "border-gold/15 bg-charcoal/60 text-gold/70 hover:border-bat/50 hover:text-bat"
              }`}
              title={`Day ${r.day}`}
            >
              <span className="font-bold">{r.day}</span>
              {isFav && <span className="absolute top-1 right-1 text-bat text-[10px]">★</span>}
            </button>
          );
        })}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground text-sm">
            No reasons match. Try a different filter.
          </div>
        )}
      </div>

      {/* Detail dialog */}
      {active && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 animate-fade-up"
          onClick={() => setActive(null)}
        >
          <div className="relative w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <Particles count={18} />
            <div className="relative hologram rounded-2xl p-8 md:p-12 text-center">
              {/* spotlight */}
              <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[480px] h-[280px] bg-bat/20 blur-3xl rounded-full pointer-events-none" />
              <button
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 text-bat/70 hover:text-bat text-2xl"
                aria-label="Close"
              >
                ✕
              </button>
              <div className="text-xs tracking-[0.4em] text-gold/70 font-[var(--font-mono-ui)]">
                DAY {String(active.day).padStart(3, "0")} OF 365
              </div>
              <div className="mt-2 text-xs uppercase tracking-widest text-bat/60">
                {CATS.find((c) => c.key === active.category)?.icon}{" "}
                {CATS.find((c) => c.key === active.category)?.label}
              </div>
              <p className="font-[var(--font-hand)] text-3xl md:text-4xl text-ivory leading-snug mt-8 text-glow">
                {active.text}
              </p>
              <div className="mt-10 flex justify-center gap-3">
                <button
                  onClick={() => {
                    const next = new Set(favs);
                    if (next.has(active.day)) next.delete(active.day);
                    else next.add(active.day);
                    persistFavs(next);
                  }}
                  className={`px-5 py-2.5 rounded-full text-xs tracking-widest uppercase border transition ${
                    favs.has(active.day) ? "bg-bat text-background border-bat" : "border-gold/30 text-gold hover:border-bat"
                  }`}
                >
                  {favs.has(active.day) ? "★ Favorited" : "☆ Favorite"}
                </button>
                <button
                  onClick={() => {
                    const i = REASONS.findIndex((x) => x.day === active.day);
                    const next = REASONS[(i + 1) % REASONS.length];
                    setActive(next);
                    markRead(next.day);
                  }}
                  className="px-5 py-2.5 rounded-full text-xs tracking-widest uppercase border border-gold/30 text-gold hover:border-bat"
                >
                  Next Reason →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
