import { SectionHeader } from "./SectionHeader";

const VILLAINS = [
  { name: "Overthinking", line: "Silenced by his voice on the phone." },
  { name: "Bad Days", line: "Reversed by one of his hugs." },
  { name: "Loneliness", line: "Cannot exist when he's around." },
  { name: "Insecurity", line: "Looked in the mirror after he loved her." },
  { name: "Distance", line: "Shrinks every time he says 'I'm here.'" },
  { name: "Stress", line: "Dissolves on contact with him." },
  { name: "Anxiety", line: "Loses the fight whenever he smiles." },
];

export function RoguesGallery() {
  return (
    <section id="rogues" className="relative px-6 py-28 md:py-36 max-w-6xl mx-auto">
      <SectionHeader
        kicker="Section 06"
        title="Rogues Gallery"
        subtitle="Every villain that ever tried. Every one of them — defeated by Vishu."
      />
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {VILLAINS.map((v, i) => (
          <div
            key={v.name}
            className="relative group glass-panel rounded-lg overflow-hidden hover:border-destructive/50 transition"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="aspect-[4/3] bg-gradient-to-br from-graphite to-charcoal relative flex items-center justify-center overflow-hidden">
              <div className="font-[var(--font-display)] text-3xl md:text-4xl text-foreground/30 uppercase tracking-tighter group-hover:text-foreground/50 transition">
                {v.name}
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="font-[var(--font-display)] text-5xl md:text-6xl font-bold text-destructive/90 rotate-[-12deg] tracking-widest border-4 border-destructive/80 px-4 py-1 opacity-90">
                  DEFEATED
                </div>
              </div>
            </div>
            <div className="p-4 space-y-2 text-sm">
              <div className="flex justify-between text-[10px] tracking-[0.3em] font-[var(--font-mono-ui)]">
                <span className="text-destructive/80">STATUS: DEFEATED</span>
                <span className="text-bat/80">BY: VISHU</span>
              </div>
              <div className="text-foreground/80 italic">{v.line}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
