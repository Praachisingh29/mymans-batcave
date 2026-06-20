import { useState } from "react";
import { SectionHeader } from "./SectionHeader";

const EVENTS = [
  { t: "First Meeting", d: "The moment Gotham's lights changed forever.", body: "Two strangers in a city of millions — and somehow the universe arranged it just right." },
  { t: "First Conversation", d: "Words that felt like home.", body: "I didn't know yet, but every sentence was already a tiny brick in the home we'd build together." },
  { t: "First Photo", d: "Frame one of forever.", body: "Looking back, that one frame holds the start of every smile that came after." },
  { t: "First Inside Joke", d: "Our secret language begins.", body: "Nobody else has to get it. That's the whole point." },
  { t: "First Date", d: "Officially on the record.", body: "I was nervous. You made nervous feel safe." },
  { t: "Becoming Official", d: "Status: unbreakable.", body: "The world got softer the day I got to call you mine." },
  { t: "Favorite Memory", d: "The one I replay on hard days.", body: "Some moments are time machines. This one is mine." },
  { t: "A Milestone", d: "Anniversaries, victories, small wins.", body: "Every milestone with you feels like the whole city is celebrating." },
  { t: "Special Moment", d: "Just us. No occasion needed.", body: "The best moments don't need a reason. Just you, just me, just enough." },
];

export function StoryTimeline() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="story" className="relative px-6 py-28 md:py-36 max-w-6xl mx-auto">
      <SectionHeader kicker="Section 02" title="Our Story" subtitle="Glowing pathways through every moment that built us." />
      <div className="mt-16 relative">
        {/* glowing rail */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2 bg-gradient-to-b from-transparent via-bat/40 to-transparent" />
        <div className="space-y-10">
          {EVENTS.map((e, i) => {
            const left = i % 2 === 0;
            return (
              <div key={i} className={`relative md:grid md:grid-cols-2 md:gap-12 items-center ${left ? "" : "md:[direction:rtl]"}`}>
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-bat -translate-x-1/2 mt-6 animate-capsule-glow shadow-[0_0_20px_var(--bat)]" />
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className={`text-left ml-12 md:ml-0 glass-panel rounded-lg p-6 hover:border-bat/40 transition w-full ${left ? "md:mr-12" : "md:ml-12 [direction:ltr]"}`}
                >
                  <div className="text-[10px] tracking-[0.3em] text-gold/70 font-[var(--font-mono-ui)]">CHAPTER {String(i + 1).padStart(2, "0")}</div>
                  <div className="font-[var(--font-display)] text-2xl text-bat mt-1">{e.t}</div>
                  <div className="text-muted-foreground mt-1 text-sm">{e.d}</div>
                  {open === i && (
                    <div className="mt-4 pt-4 border-t border-gold/20 text-foreground/90 animate-fade-up font-[var(--font-hand)] text-xl leading-relaxed">
                      {e.body}
                    </div>
                  )}
                </button>
                <div className="hidden md:block" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
