import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
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
          <MusicPlayer />
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

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playlist = [
    "/audio/tum_se_hi_flute.mp3",
    "/audio/tum_se_hi_instrument.mp3"
  ];

  const handleToggle = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.error("Audio play failed:", err);
      });
    }
  };

  const handleEnded = () => {
    const nextIndex = (trackIndex + 1) % playlist.length;
    setTrackIndex(nextIndex);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = playlist[trackIndex];
      if (isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          setIsPlaying(false);
        });
      }
    }
  }, [trackIndex]);

  // Attempt to autoplay once when component mounts and user has interacted
  useEffect(() => {
    const playAttempt = setTimeout(() => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Silent catch since browsers block autoplay until click
        });
      }
    }, 1000);
    return () => clearTimeout(playAttempt);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-black/85 backdrop-blur-md border border-gold/30 rounded-full px-5 py-2 text-gold shadow-lg font-[var(--font-mono-ui)] text-[10px] tracking-widest md:text-xs">
      <audio
        ref={audioRef}
        src={playlist[trackIndex]}
        onEnded={handleEnded}
        preload="auto"
      />
      
      {/* Playing state visualizer */}
      {isPlaying ? (
        <div className="flex items-end gap-0.5 h-3 w-4 shrink-0">
          <span className="bg-bat w-0.5 h-2 animate-audio-bar-1" />
          <span className="bg-bat w-0.5 h-3 animate-audio-bar-2" />
          <span className="bg-bat w-0.5 h-1 animate-audio-bar-3" />
          <span className="bg-bat w-0.5 h-2 animate-audio-bar-4" />
        </div>
      ) : (
        <div className="flex items-end gap-0.5 h-3 w-4 shrink-0">
          <span className="bg-gold/30 w-0.5 h-1.5" />
          <span className="bg-gold/30 w-0.5 h-1" />
          <span className="bg-gold/30 w-0.5 h-2" />
          <span className="bg-gold/30 w-0.5 h-1" />
        </div>
      )}

      <span className="uppercase text-[9px] md:text-[11px] truncate max-w-[120px] md:max-w-none">
        Tum Se Hi ({trackIndex === 0 ? "Flute" : "Instrument"})
      </span>

      <button
        onClick={handleToggle}
        className="w-7 h-7 rounded-full bg-gold/10 hover:bg-gold/25 border border-gold/40 flex items-center justify-center text-xs transition cursor-pointer shrink-0"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? "⏸" : "▶"}
      </button>
    </div>
  );
}
