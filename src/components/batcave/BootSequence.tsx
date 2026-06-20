import { useEffect, useState } from "react";

const LINES = [
  "ACCESSING BATCAVE...",
  "INITIALIZING BIOMETRIC SCAN...",
  "BATCOMPUTER ONLINE.",
  "SCANNING SUBJECT...",
  "NAME: VISHU",
  "AGE: 23",
  "THREAT LEVEL: NONE",
  "IMPORTANCE LEVEL: MAXIMUM",
  "STATUS: MOST LOVED HUMAN ALIVE",
  "ANALYSIS COMPLETE.",
  "365 VERIFIED REASONS DETECTED.",
  "ACCESS GRANTED.",
];

export function BootSequence({ onEnter }: { onEnter: () => void }) {
  const [shown, setShown] = useState<string[]>([]);
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let i = 0;
    let charIdx = 0;
    const tick = () => {
      if (cancelled) return;
      if (i >= LINES.length) {
        setDone(true);
        return;
      }
      const line = LINES[i];
      if (charIdx <= line.length) {
        setTyped(line.slice(0, charIdx));
        charIdx++;
        setTimeout(tick, 22 + (line.startsWith("NAME") || line.startsWith("STATUS") ? 18 : 0));
      } else {
        setShown((s) => [...s, line]);
        setTyped("");
        i++;
        charIdx = 0;
        setTimeout(tick, 280);
      }
    };
    setTimeout(tick, 400);
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-6 py-20">
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 scanline opacity-40" />
      {/* Biometric ring */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] max-w-[90vw] max-h-[90vw] rounded-full border border-bat/20 animate-spin-slow" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] max-w-[70vw] max-h-[70vw] rounded-full border border-gold/30" style={{ animation: "spin-slow 32s linear reverse infinite" }} />

      <div className="relative z-10 w-full max-w-3xl">
        {!done ? (
          <div className="hologram rounded-lg p-8 md:p-10 font-[var(--font-mono-ui)] text-sm md:text-base">
            <div className="flex items-center gap-3 mb-6 text-bat/80 text-xs tracking-[0.3em]">
              <span className="inline-block w-2 h-2 rounded-full bg-bat animate-capsule-glow" />
              BATCOMPUTER v23.0 — SECURE TERMINAL
            </div>
            <div className="space-y-1.5 min-h-[340px]">
              {shown.map((l, i) => (
                <div key={i} className="text-bat/90 animate-fade-up">
                  <span className="text-gold/60">&gt;</span> {l}
                </div>
              ))}
              {typed && (
                <div className="text-bat">
                  <span className="text-gold/60">&gt;</span> {typed}
                  <span style={{ animation: "type-caret 1s steps(1) infinite" }}>▌</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center animate-fade-up">
            <div className="mb-4 text-xs tracking-[0.4em] text-gold/70">— A SECRET FILE FOR —</div>
            <h1
              className="font-[var(--font-display)] text-5xl md:text-7xl lg:text-8xl font-bold text-gold text-glow leading-[0.95]"
              style={{ animation: "fade-up 1.2s ease-out both" }}
            >
              MY MAN'S DAY
            </h1>
            <p className="mt-6 text-base md:text-lg text-muted-foreground italic font-[var(--font-hand)] text-2xl md:text-3xl">
              "Because every hero deserves a city built just for him."
            </p>
            <button
              onClick={onEnter}
              className="bat-button mt-12 hover:[&]:bat-button-hover"
              style={{ animation: "fade-up 1.4s ease-out 0.4s both" }}
            >
              <BatIcon className="w-5 h-5" /> Enter Gotham
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export function BatIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 80" className={className} fill="currentColor" aria-hidden>
      <path d="M100 28c-12 0-18 12-18 12s-10-16-32-16c-20 0-32 12-32 22 0 5 6 12 6 12s-12 6-2 9c8 3 19-2 22-5 4 8 19 10 32 5 5 9 16 11 24 11s19-2 24-11c13 5 28 3 32-5 3 3 14 8 22 5 10-3-2-9-2-9s6-7 6-12c0-10-12-22-32-22-22 0-32 16-32 16s-6-12-18-12z" />
    </svg>
  );
}
