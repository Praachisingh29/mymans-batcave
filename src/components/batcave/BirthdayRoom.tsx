import { useMemo, useState } from "react";
import { SectionHeader } from "./SectionHeader";

export function BirthdayRoom() {
  const [confetti, setConfetti] = useState(0);
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

  return (
    <section id="birthday" className="relative px-6 py-28 md:py-36 max-w-6xl mx-auto">
      <SectionHeader
        kicker="Section 10"
        title="Birthday Celebration Room"
        subtitle="Cake. Bats. Fireworks. Just press the button."
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
        <div className="relative inline-block">
          <div className="text-7xl md:text-8xl animate-flicker">🎂</div>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-6 bg-bat rounded-full shadow-[0_0_20px_var(--bat)]" />
        </div>

        <h3 className="mt-8 font-[var(--font-display)] text-4xl md:text-6xl text-gold text-glow">
          HAPPY 23<sup>RD</sup> BIRTHDAY VISHU
        </h3>
        <p className="mt-4 text-muted-foreground italic">May Gotham bow, and may every wish you whisper come true.</p>

        <button
          onClick={() => setConfetti((c) => c + 1)}
          className="bat-button mt-10 hover:[&]:bat-button-hover"
        >
          🎆 Launch Fireworks
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
