import { useState } from "react";
import { SectionHeader } from "./SectionHeader";

interface CaseFile {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl?: string;
}

// Placeholder case files — replace imageUrl with real photos when ready.
const FILES: CaseFile[] = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  title: ["The Coffee Shop Stakeout", "Operation: Sunset Drive", "The Movie Night Heist", "Recon: Home Sweet Home", "The Long Walk Investigation", "Mission: First Kiss", "The Lazy Sunday File", "Operation: Surprise Hug", "The Late Night Calls Dossier", "Recon: His Smile, Up Close", "The Adventure Day Report", "Classified: Just Because"][i] || `Case ${i + 1}`,
  date: ["—", "—", "—", "—", "—", "—", "—", "—", "—", "—", "—", "—"][i],
  location: "Gotham · with him",
  description:
    "Evidence collected on subject Vishu — overwhelming proof of greatest boyfriend status. Visual confirmation pending upload by the witness.",
}));

export function EvidenceLocker() {
  const [active, setActive] = useState<CaseFile | null>(null);

  return (
    <section id="evidence" className="relative px-6 py-28 md:py-36 max-w-7xl mx-auto">
      <SectionHeader
        kicker="Section 03"
        title="Evidence Locker"
        subtitle="Collected evidence proving Vishu is the greatest boyfriend alive."
      />
      <div className="mt-4 text-xs tracking-[0.3em] text-gold/60 font-[var(--font-mono-ui)]">
        ACCESS LEVEL: WITNESS ONLY · TOTAL FILES: {FILES.length}
      </div>

      <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {FILES.map((f) => (
          <button
            key={f.id}
            onClick={() => setActive(f)}
            className="group glass-panel rounded-lg overflow-hidden text-left transition hover:-translate-y-1 hover:border-bat/50 hover:shadow-[0_0_30px_oklch(0.86_0.19_95_/_0.25)]"
          >
            <div className="relative aspect-[4/5] bg-gradient-to-br from-graphite to-charcoal flex items-center justify-center overflow-hidden">
              {f.imageUrl ? (
                <img src={f.imageUrl} alt={f.title} className="w-full h-full object-cover" />
              ) : (
                <div className="text-center px-4">
                  <div className="text-[9px] tracking-[0.3em] text-bat/50 font-[var(--font-mono-ui)] mb-3">PHOTO REDACTED</div>
                  <svg viewBox="0 0 60 60" className="w-12 h-12 mx-auto text-gold/30">
                    <rect x="6" y="10" width="48" height="40" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="22" cy="26" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M6 44 L22 30 L34 40 L46 28 L54 36 L54 50 L6 50 Z" fill="currentColor" opacity="0.3" />
                  </svg>
                </div>
              )}
              <div className="absolute top-2 left-2 text-[10px] font-[var(--font-mono-ui)] tracking-widest text-bat/80 bg-black/60 px-2 py-0.5 rounded">
                CASE FILE #{String(f.id).padStart(3, "0")}
              </div>
            </div>
            <div className="p-4">
              <div className="font-[var(--font-display)] text-base text-bat group-hover:text-glow transition">{f.title}</div>
              <div className="text-[11px] text-muted-foreground mt-1">{f.location}</div>
            </div>
          </button>
        ))}
      </div>

      <p className="mt-10 text-xs text-muted-foreground italic text-center">
        ☞ Replace placeholder files by adding <code className="text-gold/70">imageUrl</code> to entries in <code className="text-gold/70">src/components/batcave/EvidenceLocker.tsx</code>.
      </p>

      {active && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-up"
          onClick={() => setActive(null)}
        >
          <div
            className="hologram rounded-xl max-w-3xl w-full p-6 md:p-10 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActive(null)}
              className="absolute top-4 right-4 text-bat/70 hover:text-bat text-2xl"
              aria-label="Close"
            >
              ✕
            </button>
            <div className="text-xs tracking-[0.3em] text-gold/70 font-[var(--font-mono-ui)]">
              CASE FILE #{String(active.id).padStart(3, "0")}
            </div>
            <h3 className="font-[var(--font-display)] text-3xl md:text-4xl text-bat mt-2">{active.title}</h3>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="aspect-square bg-graphite rounded border border-gold/20 flex items-center justify-center text-bat/40 text-sm">
                {active.imageUrl ? (
                  <img src={active.imageUrl} alt={active.title} className="w-full h-full object-cover rounded" />
                ) : (
                  "PHOTO UPLOAD PENDING"
                )}
              </div>
              <div className="space-y-3 text-sm">
                <div><span className="text-gold/60 tracking-widest text-xs">DATE: </span>{active.date}</div>
                <div><span className="text-gold/60 tracking-widest text-xs">LOCATION: </span>{active.location}</div>
                <div className="pt-3 border-t border-gold/20 text-foreground/90 leading-relaxed">{active.description}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
