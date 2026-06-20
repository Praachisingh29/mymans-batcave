import { SectionHeader } from "./SectionHeader";

const ROWS = [
  ["Name", "VISHU"],
  ["Age", "23"],
  ["Codename", "THE LOVE OF MY LIFE"],
  ["Status", "PROTECTED"],
  ["Mission", "MAKE HER SMILE"],
  ["Threat Level", "DANGEROUSLY LOVABLE"],
];

export function HeroFile() {
  return (
    <section id="hero-file" className="relative px-6 py-28 md:py-36 max-w-6xl mx-auto">
      <SectionHeader kicker="Classified — Section 01" title="The Hero File" subtitle="Batcomputer dossier · clearance: maximum" />
      <div className="mt-14 grid md:grid-cols-[1.1fr_1fr] gap-8 items-stretch">
        {/* Holographic profile */}
        <div className="hologram rounded-xl p-8 md:p-10 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-bat/10 blur-3xl" />
          <div className="text-xs tracking-[0.32em] text-gold/70 mb-5 font-[var(--font-mono-ui)]">FILE #2002-VSH</div>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="aspect-square rounded border border-gold/20 flex items-center justify-center text-bat/30 text-[10px] font-[var(--font-mono-ui)]">
                {String((i * 137) % 999).padStart(3, "0")}
              </div>
            ))}
          </div>
          <div className="text-xs text-bat/70 font-[var(--font-mono-ui)] tracking-wider">
            BIOMETRIC HASH: VSH·23·∞·HER<br />
            HEART SIGNATURE: <span className="text-bat">MATCHED</span><br />
            LAST OBSERVED: HOLDING HER HAND
          </div>
        </div>

        {/* Data sheet */}
        <div className="glass-panel rounded-xl p-8 md:p-10">
          <div className="space-y-4">
            {ROWS.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[140px_1fr] gap-4 items-baseline border-b border-gold/10 pb-3">
                <div className="text-[11px] tracking-[0.28em] uppercase text-gold/60 font-[var(--font-mono-ui)]">{k}</div>
                <div className="font-[var(--font-display)] text-lg md:text-xl text-bat tracking-wider">{v}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-xs text-muted-foreground italic">
            "Subject demonstrates extreme emotional gravity. Approach with full heart."
          </div>
        </div>
      </div>
    </section>
  );
}
