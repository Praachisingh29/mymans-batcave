import { useEffect, useMemo, useState } from "react";

const SECRETS = [
  "You are my favorite plot twist.",
  "Even Batman would be jealous.",
  "I'd choose you in every universe.",
  "You are my safest place.",
  "You are my greatest adventure.",
  "I love your hands.",
  "I love how you say my name.",
  "I'd cross Gotham for one of your hugs.",
  "You make ordinary days feel cinematic.",
  "Your laugh is my favorite sound effect.",
  "I love watching you sleep — peacefully.",
  "You're the reason I believe in soft things.",
  "I think about you mid-sentence sometimes.",
  "You're my forever, in every tense.",
  "Even the rain in Gotham hits softer with you.",
  "I love you on Mondays too.",
  "You are home with a heartbeat.",
  "I'd build a city for you. (I kind of did.)",
  "My favorite kind of late night = with you.",
  "You make me brave.",
  "Your name still gives me butterflies.",
  "I love the way you protect everything I love.",
  "We make sense in a world that often doesn't.",
  "You are the calm AND the spark.",
  "I'd marry your soul a thousand times.",
  "You are the best plot in my story.",
  "Loving you is the easiest thing I've ever done.",
  "You are the answer to a question I never asked.",
  "I see you, fully. And I love what I see.",
  "Forever you. Just forever you.",
];

const STORE_KEY = "mmd:bats-found";

interface BatSpot {
  id: number;
  top: string;
  left: string;
  msg: string;
}

export function HiddenBats() {
  const spots = useMemo<BatSpot[]>(
    () =>
      SECRETS.map((msg, i) => ({
        id: i,
        msg,
        // pseudo-random positions distributed down the page
        top: `${(i * 313) % 9000}px`,
        left: `${5 + ((i * 71) % 90)}%`,
      })),
    [],
  );
  const [found, setFound] = useState<Set<number>>(new Set());
  const [popup, setPopup] = useState<string | null>(null);

  useEffect(() => {
    try {
      setFound(new Set(JSON.parse(localStorage.getItem(STORE_KEY) || "[]")));
    } catch {}
  }, []);

  const onCatch = (id: number, msg: string) => {
    setPopup(msg);
    const next = new Set(found);
    next.add(id);
    setFound(next);
    localStorage.setItem(STORE_KEY, JSON.stringify([...next]));
    setTimeout(() => setPopup(null), 3800);
  };

  return (
    <>
      <div className="absolute inset-x-0 top-0 pointer-events-none" style={{ height: "10000px" }}>
        {spots.map((s) =>
          found.has(s.id) ? null : (
            <button
              key={s.id}
              onClick={() => onCatch(s.id, s.msg)}
              className="absolute pointer-events-auto opacity-40 hover:opacity-100 transition group"
              style={{ top: s.top, left: s.left }}
              aria-label="Hidden bat"
            >
              <svg viewBox="0 0 60 24" className="w-8 h-4 text-bat group-hover:scale-150 transition" fill="currentColor">
                <path d="M30 6c-3 0-5 4-5 4s-3-5-9-5-9 4-9 6c0 2 2 4 2 4s-4 2 0 3c3 1 6-1 7-2 1 3 6 3 9 1 2 3 5 3 5 3s3 0 5-3c3 2 8 2 9-1 1 1 4 3 7 2 4-1 0-3 0-3s2-2 2-4c0-2-3-6-9-6s-9 5-9 5-2-4-5-4z" />
              </svg>
            </button>
          ),
        )}
      </div>

      {/* fixed counter */}
      <div className="fixed bottom-4 right-4 z-40 glass-panel rounded-full px-4 py-2 text-[10px] tracking-[0.3em] font-[var(--font-mono-ui)] text-bat/90 pointer-events-none">
        🦇 {found.size}/{SECRETS.length} SECRETS FOUND
      </div>

      {popup && (
        <div className="fixed inset-x-0 top-8 z-50 flex justify-center px-4 pointer-events-none">
          <div className="hologram rounded-lg px-6 py-4 max-w-md text-center animate-fade-up shadow-[0_0_50px_oklch(0.86_0.19_95_/_0.5)]">
            <div className="text-[10px] tracking-[0.4em] text-gold/80 font-[var(--font-mono-ui)]">SECRET UNLOCKED</div>
            <div className="font-[var(--font-hand)] text-2xl text-bat mt-1 text-glow">{popup}</div>
          </div>
        </div>
      )}
    </>
  );
}
