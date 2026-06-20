import { useState } from "react";
import { SectionHeader } from "./SectionHeader";

export function LetterToHero() {
  const [open, setOpen] = useState(false);
  return (
    <section id="letter" className="relative px-6 py-28 md:py-36 max-w-5xl mx-auto">
      <SectionHeader
        kicker="Section 08"
        title="A Letter To My Hero"
        subtitle="From the girl who built this Batcave for you."
        center
      />
      <div className="mt-14 flex justify-center">
        {!open ? (
          <button onClick={() => setOpen(true)} className="bat-button hover:[&]:bat-button-hover">
            ✉ Unfold The Letter
          </button>
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
