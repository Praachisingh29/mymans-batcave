import { useEffect, useState } from "react";

export function SecretEnding({ unlocked, onClose }: { unlocked: boolean; onClose?: () => void }) {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<"search" | "reveal" | "letter" | "heart">("search");
  const [searchTick, setSearchTick] = useState(0);

  useEffect(() => {
    if (!open) return;
    setPhase("search");
    setSearchTick(0);
    const a = setInterval(() => setSearchTick((t) => t + 1), 500);
    const t1 = setTimeout(() => setPhase("reveal"), 3200);
    const t2 = setTimeout(() => setPhase("letter"), 7500);
    const t3 = setTimeout(() => setPhase("heart"), 18000);
    return () => {
      clearInterval(a);
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
    };
  }, [open]);

  return (
    <section id="ending" className="relative px-6 py-28 md:py-36 max-w-5xl mx-auto text-center">
      <div className="text-[11px] tracking-[0.42em] text-bat/70 uppercase font-[var(--font-mono-ui)]">— THE FINAL TRANSMISSION —</div>
      <h2 className="mt-3 font-[var(--font-display)] text-3xl md:text-5xl text-gold">The Secret Ending</h2>
      <p className="mt-4 text-muted-foreground">
        {unlocked
          ? "Clearance granted. One file remains."
          : "Open more reasons in the vault to unlock the final file."}
      </p>

      <button
        disabled={!unlocked}
        onClick={() => setOpen(true)}
        className={`mt-10 bat-button hover:[&]:bat-button-hover ${unlocked ? "" : "opacity-40 cursor-not-allowed grayscale"}`}
      >
        🔒 Access Restricted File
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] bg-black flex items-center justify-center px-6 overflow-y-auto py-12">
          <div className="absolute inset-0 scanline opacity-30 pointer-events-none" />
          {phase === "search" && (
            <div className="font-[var(--font-mono-ui)] text-bat/90 text-base md:text-lg space-y-2">
              {["SEARCHING FOR FINAL REASON...", "SEARCHING...", "SEARCHING...", "DEEP SCAN INITIATED...", "RESULT FOUND."]
                .slice(0, Math.min(searchTick + 1, 5))
                .map((l, i) => (
                  <div key={i}>&gt; {l}</div>
                ))}
            </div>
          )}

          {phase === "reveal" && (
            <div className="text-center animate-fade-up max-w-3xl">
              <div className="text-xs tracking-[0.42em] text-gold/80 font-[var(--font-mono-ui)]">CLASSIFIED · REASON</div>
              <div className="font-[var(--font-display)] text-7xl md:text-9xl text-bat text-glow mt-4">366</div>
              <p className="font-[var(--font-hand)] text-3xl md:text-5xl text-ivory leading-snug mt-8 text-glow">
                "Because if I had to live this life all over again, I would still choose you. Every single time."
              </p>
            </div>
          )}

          {phase === "letter" && (
            <div className="text-center max-w-3xl animate-fade-up space-y-10">
              <div className="aspect-video w-full bg-gradient-to-br from-graphite to-charcoal rounded-lg border border-gold/30 flex items-center justify-center text-bat/40 text-sm">
                FAVORITE PHOTO · PLACEHOLDER
              </div>
              <div className="space-y-8 font-[var(--font-display)] text-3xl md:text-5xl text-gold leading-tight">
                <p>Gotham needed Batman.</p>
                <p className="text-bat text-glow">I needed Vishu.</p>
              </div>
              <div className="mt-6">
                <div className="text-xs tracking-[0.42em] text-gold/70 font-[var(--font-mono-ui)]">— TRANSMISSION —</div>
                <h3 className="mt-3 font-[var(--font-display)] text-5xl md:text-7xl text-gold text-glow">
                  HAPPY 23<sup>RD</sup> BIRTHDAY
                </h3>
                <h4 className="mt-2 font-[var(--font-display)] text-4xl md:text-6xl text-bat text-glow">MY MAN</h4>
              </div>
              <div className="font-[var(--font-hand)] text-2xl md:text-3xl text-ivory/90 space-y-4 max-w-xl mx-auto">
                <p>Out of billions of people, you became my favorite.</p>
                <p>Thank you for making the last 1.5 years beautiful.</p>
                <p className="text-bat text-glow text-3xl md:text-4xl">You are my forever, my always, and my greatest love story.</p>
              </div>
            </div>
          )}

          {phase === "heart" && (
            <div className="relative text-center animate-fade-up">
              {/* Gotham skyline behind */}
              <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
                <svg viewBox="0 0 800 200" className="w-full max-w-3xl opacity-60">
                  <path
                    d="M0 200 L0 140 L40 140 L40 110 L80 110 L80 150 L140 150 L140 90 L170 90 L170 70 L200 70 L200 110 L250 110 L250 140 L320 140 L320 60 L350 60 L350 90 L400 90 L400 130 L470 130 L470 80 L520 80 L520 110 L570 110 L570 150 L630 150 L630 100 L680 100 L680 140 L740 140 L740 120 L800 120 L800 200 Z"
                    fill="oklch(0.05 0.005 270)"
                    stroke="oklch(0.78 0.14 85 / 0.4)"
                  />
                </svg>
              </div>
              <svg viewBox="0 0 200 180" className="relative mx-auto w-64 h-64 text-bat" style={{ filter: "drop-shadow(0 0 60px var(--bat))" }} fill="currentColor">
                <path d="M100 165 C 30 110, 10 70, 35 40 C 55 18, 85 22, 100 50 C 115 22, 145 18, 165 40 C 190 70, 170 110, 100 165 Z" />
              </svg>
              <div className="relative mt-6 font-[var(--font-hand)] text-3xl md:text-4xl text-ivory text-glow">
                Forever you. Always you. Only you.
              </div>
              <button
                onClick={() => {
                  setOpen(false);
                  onClose?.();
                }}
                className="bat-button mt-12 hover:[&]:bat-button-hover"
              >
                Close Transmission
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
