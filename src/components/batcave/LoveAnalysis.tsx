import { SectionHeader } from "./SectionHeader";

const STATS = [
  { k: "Days Loved", v: "547+", sub: "and counting" },
  { k: "Photos Collected", v: "∞", sub: "evidence locker active" },
  { k: "Memories Created", v: "1.5 yrs", sub: "of best ones" },
  { k: "Smiles Caused", v: "9,842", sub: "conservative estimate" },
  { k: "Hugs Delivered", v: "∞", sub: "still hungry for more" },
  { k: "Comfort Level", v: "100%", sub: "you ARE home" },
  { k: "Boyfriend Rating", v: "10/10", sub: "would choose again" },
  { k: "Heart Sync", v: "MATCHED", sub: "Batcomputer confirms" },
];

export function LoveAnalysis() {
  return (
    <section id="analysis" className="relative px-6 py-28 md:py-36 max-w-7xl mx-auto">
      <SectionHeader
        kicker="Section 05"
        title="Batcomputer Love Analysis"
        subtitle="Real-time telemetry from a heart that watches over you."
      />
      <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <div key={s.k} className="hologram rounded-xl p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bat to-transparent" />
            <div className="text-[10px] tracking-[0.3em] text-gold/60 font-[var(--font-mono-ui)] uppercase">{s.k}</div>
            <div className="font-[var(--font-display)] text-3xl md:text-4xl text-bat mt-2 text-glow">{s.v}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.sub}</div>
            {/* fake sparkline */}
            <svg viewBox="0 0 100 24" className="mt-3 w-full h-6 text-bat/70">
              <polyline
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                points={Array.from({ length: 14 }).map((_, i) => `${i * 7.5},${22 - Math.abs(Math.sin(i + s.k.length)) * 18}`).join(" ")}
              />
            </svg>
          </div>
        ))}
      </div>
    </section>
  );
}
