import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BootSequence } from "@/components/batcave/BootSequence";
import { AccessGate } from "@/components/batcave/AccessGate";
import { HeroFile } from "@/components/batcave/HeroFile";
import { StoryTimeline } from "@/components/batcave/StoryTimeline";
import { EvidenceLocker } from "@/components/batcave/EvidenceLocker";
import { ReasonsVault } from "@/components/batcave/ReasonsVault";
import { LoveAnalysis } from "@/components/batcave/LoveAnalysis";
import { RoguesGallery } from "@/components/batcave/RoguesGallery";
import { LetterToHero } from "@/components/batcave/LetterToHero";
import { Achievements } from "@/components/batcave/Achievements";
import { HappinessVault } from "@/components/batcave/HappinessVault";
import { BirthdayRoom } from "@/components/batcave/BirthdayRoom";
import { SecretEnding } from "@/components/batcave/SecretEnding";
import { HiddenBats } from "@/components/batcave/HiddenBats";
import { FlyingBats, Fog, GothamSkyline, Rain } from "@/components/batcave/Atmosphere";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "My Man's Day — A Batcave Built for Vishu" },
      { name: "description", content: "A cinematic, interactive birthday experience built by a girl who has loved Vishu for 1.5 years." },
      { property: "og:title", content: "My Man's Day" },
      { property: "og:description", content: "Because every hero deserves a city built just for him." },
    ],
  }),
  component: Index,
});

function Index() {
  const [authenticated, setAuthenticated] = useState(false);
  const [entered, setEntered] = useState(false);
  const [vaultDone, setVaultDone] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && entered) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [entered]);

  return (
    <main className="relative min-h-screen text-foreground">
      {/* Persistent Gotham atmosphere */}
      <Rain />
      <FlyingBats count={5} />
      <Fog />

      {/* Distant skyline behind everything */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-0 opacity-60">
        <GothamSkyline className="h-[28vh]" />
      </div>

      {!authenticated ? (
        <AccessGate onAccessGranted={() => setAuthenticated(true)} />
      ) : !entered ? (
        <BootSequence onEnter={() => setEntered(true)} />
      ) : (
        <div className="relative z-10">
          <HiddenBats />
          <TopBar />
          <HeroFile />
          <Divider />
          <StoryTimeline />
          <Divider />
          <EvidenceLocker />
          <Divider />
          <ReasonsVault onComplete={() => setVaultDone(true)} />
          <Divider />
          <LoveAnalysis />
          <Divider />
          <RoguesGallery />
          <Divider />
          <LetterToHero />
          <Divider />
          <Achievements />
          <Divider />
          <HappinessVault />
          <Divider />
          <BirthdayRoom />
          <Divider />
          <SecretEnding unlocked={vaultDone} />
          <Footer />
        </div>
      )}
    </main>
  );
}

function TopBar() {
  const links = [
    ["Hero", "hero-file"],
    ["Story", "story"],
    ["Evidence", "evidence"],
    ["Vault", "vault"],
    ["Analysis", "analysis"],
    ["Rogues", "rogues"],
    ["Letter", "letter"],
    ["Wins", "achievements"],
    ["Happiness", "happiness-vault"],
    ["Birthday", "birthday"],
    ["Ending", "ending"],
  ];
  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-background/60 border-b border-gold/15">
      <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 shrink-0">
          <svg viewBox="0 0 200 80" className="w-7 h-4 text-bat" fill="currentColor">
            <path d="M100 28c-12 0-18 12-18 12s-10-16-32-16c-20 0-32 12-32 22 0 5 6 12 6 12s-12 6-2 9c8 3 19-2 22-5 4 8 19 10 32 5 5 9 16 11 24 11s19-2 24-11c13 5 28 3 32-5 3 3 14 8 22 5 10-3-2-9-2-9s6-7 6-12c0-10-12-22-32-22-22 0-32 16-32 16s-6-12-18-12z" />
          </svg>
          <span className="font-[var(--font-display)] text-sm tracking-[0.3em] text-gold">MY MAN'S DAY</span>
        </div>
        <nav className="hidden lg:flex gap-5 text-[11px] font-[var(--font-mono-ui)] tracking-[0.25em] uppercase text-gold/70">
          {links.map(([l, id]) => (
            <a key={id} href={`#${id}`} className="hover:text-bat transition">
              {l}
            </a>
          ))}
        </nav>
        <div className="text-[10px] font-[var(--font-mono-ui)] tracking-[0.3em] text-bat/60 hidden md:block">
          GOTHAM · 23:00
        </div>
      </div>
    </header>
  );
}

function Divider() {
  return (
    <div className="relative max-w-5xl mx-auto px-6">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 mt-20 px-6 py-14 text-center text-xs tracking-[0.3em] text-gold/60 font-[var(--font-mono-ui)]">
      <div className="flex justify-center items-center gap-3">
        <span>BUILT WITH ♡ IN GOTHAM</span>
        <span className="text-bat/60">·</span>
        <span>FOR VISHU · ALWAYS</span>
      </div>
      <div className="mt-3 text-bat/40">END OF FILE</div>
    </footer>
  );
}
