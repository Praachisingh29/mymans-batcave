import { SectionHeader } from "./SectionHeader";

const ACHIEVEMENTS = [
  { t: "Gym Beast", d: "Showed up. Every. Single. Time.", xp: 9000 },
  { t: "Batman Fanatic", d: "Encyclopedic knowledge of Gotham confirmed.", xp: 7500 },
  { t: "Professional Hug Dealer", d: "Distributes safety in bear-hug form.", xp: 9999 },
  { t: "World's Best Boyfriend", d: "Unanimous decision by the witness.", xp: 10000 },
  { t: "Her Favorite Human", d: "Permanent title. Non-transferable.", xp: 99999 },
  { t: "Heart Protector", d: "Has never once broken what was trusted to him.", xp: 10000 },
  { t: "Soulmate Status", d: "Achievement unlocked across every universe.", xp: 99999 },
];

export function Achievements() {
  return (
    <section id="achievements" className="relative px-6 py-28 md:py-36 max-w-6xl mx-auto">
      <SectionHeader
        kicker="Section 09"
        title="Achievements Unlocked"
        subtitle="Career stats, courtesy of the Batcomputer."
      />
      <div className="mt-12 grid md:grid-cols-2 gap-4">
        {ACHIEVEMENTS.map((a, i) => (
          <div key={a.t} className="hologram rounded-lg p-5 flex items-center gap-4 group hover:border-bat/50 transition">
            <div className="shrink-0 relative w-16 h-16 rounded-full border-2 border-gold/60 flex items-center justify-center text-2xl bg-charcoal animate-capsule-glow" style={{ animationDelay: `${i * 200}ms` }}>
              🏆
              <span className="absolute -top-1 -right-1 text-[10px] bg-bat text-background rounded-full w-6 h-6 flex items-center justify-center font-bold">✓</span>
            </div>
            <div className="flex-1">
              <div className="font-[var(--font-display)] text-lg text-bat uppercase tracking-wider">{a.t}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{a.d}</div>
              <div className="mt-2 h-1 rounded bg-charcoal/80 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-gold to-bat" style={{ width: "100%" }} />
              </div>
              <div className="text-[10px] font-[var(--font-mono-ui)] text-gold/70 mt-1 tracking-widest">+{a.xp.toLocaleString()} XP</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
