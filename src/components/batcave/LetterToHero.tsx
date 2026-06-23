import { useState } from "react";
import { SectionHeader } from "./SectionHeader";

export function LetterToHero() {
  const [open, setOpen] = useState(false);
  const [isBreaking, setIsBreaking] = useState(false);

  const handleSealClick = () => {
    if (isBreaking) return;
    setIsBreaking(true);
    setTimeout(() => {
      setOpen(true);
    }, 600);
  };

  return (
    <section id="letter" className="relative px-6 py-28 md:py-36 max-w-5xl mx-auto">
      <SectionHeader
        kicker="Section 08"
        title="A Letter To My Hero"
        subtitle="From the girl who built this Batcave for you."
        center
      />
      <div className="mt-14 flex justify-center w-full">
        {!open ? (
          <div 
            onClick={handleSealClick}
            className="relative w-full max-w-xl aspect-[1.6/1] bg-[#d2c2a4] border-2 border-gold/30 rounded-lg shadow-[0_30px_70px_rgba(0,0,0,0.6)] flex flex-col justify-between items-center p-8 cursor-pointer select-none group overflow-hidden"
            style={{
              backgroundImage: "radial-gradient(circle at 50% 50%, #e6dfd3 0%, #c5b59a 100%)",
            }}
          >
            {/* Diagonal lines to make it look like a letter back flap */}
            <div className="absolute inset-0 border-t-[80px] border-t-transparent border-l-[280px] border-l-black/5 border-r-[280px] border-r-black/5 pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-[100px] bg-gradient-to-b from-black/10 to-transparent pointer-events-none" />

            <div className="text-[10px] tracking-[0.3em] font-[var(--font-mono-ui)] text-[#5c4f3c]/70 mt-4 uppercase">
              🔒 SECURE TRANSMISSION
            </div>

            <div className="font-[var(--font-display)] text-xl md:text-2xl text-[#3b3224] tracking-widest my-auto text-center font-bold">
              TO MY HERO, VISHU
            </div>

            {/* Red Wax Seal */}
            <div 
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105 ${
                isBreaking ? "animate-break-seal" : ""
              }`}
              style={{
                background: "radial-gradient(circle, #c41e3a 0%, #8b0000 65%, #580000 100%)",
                boxShadow: "0 6px 15px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.3)",
              }}
            >
              <svg viewBox="0 0 200 80" className="w-10 h-8 text-[#ffd700] fill-current drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                <path d="M100 28c-12 0-18 12-18 12s-10-16-32-16c-20 0-32 12-32 22 0 5 6 12 6 12s-12 6-2 9c8 3 19-2 22-5 4 8 19 10 32 5 5 9 16 11 24 11s19-2 24-11c13 5 28 3 32-5 3 3 14 8 22 5 10-3-2-9-2-9s6-7 6-12c0-10-12-22-32-22-22 0-32 16-32 16s-6-12-18-12z" />
              </svg>
            </div>

            <div className="text-[9px] tracking-[0.25em] font-[var(--font-mono-ui)] text-[#5c4f3c]/60 mb-2 uppercase">
              {isBreaking ? "OPENING CODE..." : "💥 CLICK WAX SEAL TO BREAK OPEN"}
            </div>
          </div>
        ) : (
          <article
            className="relative w-full max-w-3xl rounded-lg p-10 md:p-16 animate-fade-up"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.94 0.03 85) 0%, oklch(0.88 0.04 80) 100%)",
              boxShadow:
                "0 40px 100px -20px oklch(0 0 0 / 0.7), inset 0 0 80px oklch(0.55 0.10 60 / 0.15)",
              color: "oklch(0.18 0.02 30)",
            }}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-destructive/90 rounded-sm shadow-md" />
            <div className="font-[var(--font-hand)] text-2xl md:text-3xl leading-relaxed space-y-5">
              <p className="text-3xl md:text-4xl">My dearest Vishu,</p>
              <p>
                There is a version of me that existed before you, and she had no idea what was coming. She did
                not know that one day, all her favorite songs would start to sound like a person.
              </p>
              <p>
                You are my safest room. You are the lamp I keep on when the world goes dark. You are the
                reason I believe in soft endings, in loud laughs, in being held without having to ask.
              </p>
              <p>
                I built this whole city for you because words alone could never carry the weight of how
                much I love you. So I made a Batcave. I made a vault. I made 365 little doors, and behind
                every one of them — is you.
              </p>
              <p>
                Happy 23rd, my hero. The world got it right the year it made you.
              </p>
              <p className="text-3xl md:text-4xl mt-8">Forever yours,<br/>— Me ♡</p>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
