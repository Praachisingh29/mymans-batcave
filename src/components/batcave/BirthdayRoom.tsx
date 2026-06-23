import { useMemo, useState } from "react";
import { SectionHeader } from "./SectionHeader";

export function BirthdayRoom() {
  const [confetti, setConfetti] = useState(0);
  const [candleLit, setCandleLit] = useState(true);

  const pieces = useMemo(() => {
    if (!confetti) return [];
    return Array.from({ length: 80 }).map((_, i) => ({
      id: `${confetti}-${i}`,
      left: Math.random() * 100,
      delay: Math.random() * 0.6,
      dur: 2.5 + Math.random() * 2.5,
      dx: (Math.random() - 0.5) * 200,
      color: ["#f5d76e", "#ffeb74", "#d4af37", "#fff5c4", "#ffd166"][i % 5],
      size: 6 + Math.random() * 8,
    }));
  }, [confetti]);

  const handleCakeClick = () => {
    if (candleLit) {
      setCandleLit(false);
      setConfetti((c) => c + 1);
    }
  };

  return (
    <section id="birthday" className="relative px-6 py-28 md:py-36 max-w-6xl mx-auto">
      <SectionHeader
        kicker="Section 10"
        title="Birthday Celebration Room"
        subtitle={candleLit ? "Make a wish and blow out the candle!" : "Your wish has been cast into the night!"}
        center
      />

      <div className="relative mt-16 hologram rounded-2xl p-10 md:p-16 overflow-hidden text-center min-h-[420px]">
        {/* balloons */}
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="absolute text-3xl md:text-4xl"
            style={{
              left: `${10 + i * 18}%`,
              top: `${10 + (i % 2) * 8}%`,
              animation: `float-bat ${10 + i * 2}s ease-in-out ${i * 0.6}s infinite`,
            }}
          >
            🎈
          </div>
        ))}

        {/* cake */}
        <div 
          onClick={handleCakeClick} 
          className="relative inline-block cursor-pointer group select-none mb-4"
        >
          <div className="text-7xl md:text-8xl group-hover:scale-105 transition-transform duration-300">🎂</div>
          {candleLit ? (
            <>
              {/* Flame overlay */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl animate-pulse">🔥</div>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-orange-400/40 blur-sm animate-flicker" />
            </>
          ) : (
            /* Smoke overlay */
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-2xl animate-smoke-fade pointer-events-none">
              💨
            </div>
          )}
        </div>

        <h3 className="mt-8 font-[var(--font-display)] text-4xl md:text-6xl text-gold text-glow">
          HAPPY 23<sup>RD</sup> BIRTHDAY VISHU
        </h3>
        
        <p className="mt-4 text-muted-foreground italic max-w-xl mx-auto min-h-[24px]">
          {candleLit ? (
            <span className="animate-pulse text-gold/80 font-[var(--font-mono-ui)] text-xs tracking-widest">
              🎂 TAP THE CAKE TO BLOW OUT THE CANDLE AND MAKE A WISH...
            </span>
          ) : (
            <span className="text-bat font-[var(--font-mono-ui)] text-xs tracking-widest">
              🌌 YOUR WISH HAS BEEN SENT TO GOTHAM'S NIGHT SKY. MAY EVERY DREAM COME TRUE!
            </span>
          )}
        </p>

        <button
          onClick={() => setConfetti((c) => c + 1)}
          className="bat-button mt-10 hover:[&]:bat-button-hover"
        >
          🎆 {candleLit ? "Launch Fireworks" : "Launch More Fireworks"}
        </button>

        {/* confetti */}
        {confetti > 0 && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {pieces.map((p) => (
              <span
                key={p.id}
                style={{
                  position: "absolute",
                  left: `${p.left}%`,
                  top: -20,
                  width: p.size,
                  height: p.size * 1.6,
                  background: p.color,
                  borderRadius: 2,
                  ["--dx" as never]: `${p.dx}px`,
                  animation: `confetti-fall ${p.dur}s linear ${p.delay}s forwards`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
