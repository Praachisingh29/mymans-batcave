import { useState, useEffect } from "react";

interface AccessGateProps {
  onAccessGranted: () => void;
}

export function AccessGate({ onAccessGranted }: AccessGateProps) {
  const [password, setPassword] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [denied, setDenied] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const [typing, setTyping] = useState(false);

  // Password: "CGVVSP"
  const CORRECT_PASSWORD = "CGVVSP";
  const MAX_ATTEMPTS = 3;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const upperPassword = password.toUpperCase();

    if (upperPassword === CORRECT_PASSWORD) {
      setAccessGranted(true);
      setDenied(false);
      setTimeout(() => {
        onAccessGranted();
      }, 1200);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setDenied(true);
      setPassword("");

      if (newAttempts >= MAX_ATTEMPTS) {
        // Optional: Lock out after max attempts, or just keep denying
      }
    }
  };

  useEffect(() => {
    if (denied) {
      const timer = setTimeout(() => setDenied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [denied]);

  if (accessGranted) {
    return (
      <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-6 py-20">
        <div className="pointer-events-none absolute inset-0 scanline opacity-40" />
        <div className="relative z-10 w-full max-w-2xl text-center animate-fade-up">
          <div className="hologram rounded-lg p-8 md:p-12 font-[var(--font-mono-ui)]">
            <div className="text-4xl mb-6 animate-bounce">🔓</div>
            <div className="text-bat/90 text-xs md:text-sm tracking-[0.3em] mb-4 uppercase">
              <span className="text-gold">✓</span> ACCESS GRANTED
            </div>
            <div className="text-gold/70 text-lg md:text-xl tracking-widest mb-6">
              WELCOME BACK, VISHU
            </div>
            <div className="text-muted-foreground text-sm italic animate-pulse">
              initializing batcave systems...
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-6 py-20">
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 scanline opacity-40" />

      {/* Animated background circles */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] max-w-[90vw] max-h-[90vw] rounded-full border border-bat/10 animate-spin-slow" />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] max-w-[70vw] max-h-[70vw] rounded-full border border-bat/5"
        style={{ animation: "spin-slow 24s linear reverse infinite" }}
      />

      <div className="relative z-10 w-full max-w-md">
        <div className="hologram rounded-lg p-8 md:p-10 font-[var(--font-mono-ui)]">
          {/* Header */}
          <div className="flex items-center gap-2 mb-8 text-bat/80 text-xs tracking-[0.3em]">
            <span className="inline-block w-2 h-2 rounded-full bg-bat animate-capsule-glow" />
            SECURE ACCESS PORTAL
          </div>

          {/* Lock icon */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-3 animate-pulse">🔐</div>
            <div className="text-bat/70 text-sm tracking-widest uppercase">
              AUTHENTICATION REQUIRED
            </div>
          </div>

          {/* Message */}
          <div className="mb-8 p-4 border border-gold/30 rounded bg-gold/5">
            <p className="text-bat/80 text-xs md:text-sm leading-relaxed">
              <span className="text-gold/80">SUBJECT:</span> This batcave is specially designed for one person. To proceed, prove your identity.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <label className="block text-[10px] text-gold/70 mb-2 tracking-[0.2em] uppercase">
                Authentication Code
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setTyping(true);
                  setTimeout(() => setTyping(false), 300);
                }}
                placeholder="••••••"
                className="w-full px-4 py-3 rounded border border-bat/40 bg-charcoal/50 text-bat placeholder-bat/30 
                           focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 transition
                           font-[var(--font-mono-ui)] text-sm tracking-widest uppercase"
                disabled={attempts >= MAX_ATTEMPTS}
              />
              {typing && <span className="absolute right-3 top-[42px] text-gold animate-pulse">▌</span>}
            </div>

            {/* Error message */}
            {denied && (
              <div className="p-3 rounded bg-destructive/20 border border-destructive/50 text-destructive text-xs md:text-sm animate-fade-up">
                <span className="text-destructive/80">✗</span> Access Denied — Incorrect authentication code
              </div>
            )}

            {/* Attempts remaining */}
            {attempts > 0 && (
              <div className="text-[10px] text-bat/50 tracking-[0.2em] uppercase text-center">
                Attempts remaining: {MAX_ATTEMPTS - attempts}
              </div>
            )}

            {attempts >= MAX_ATTEMPTS ? (
              <div className="p-3 rounded bg-destructive/30 border border-destructive text-destructive text-xs md:text-sm text-center font-[var(--font-mono-ui)]">
                <div className="text-lg mb-2">🚨</div>
                SYSTEM LOCKED — Maximum attempts exceeded
              </div>
            ) : (
              <button
                type="submit"
                className="w-full px-4 py-3 rounded border border-gold/60 bg-gold/10 text-gold hover:bg-gold/20 hover:border-gold 
                           transition font-[var(--font-mono-ui)] text-xs md:text-sm tracking-widest uppercase font-semibold
                           hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
              >
                Unlock Access
              </button>
            )}
          </form>

          {/* Footer hint */}
          <div className="mt-8 pt-6 border-t border-bat/20 text-center">
            <div className="text-[9px] text-bat/40 tracking-[0.3em] uppercase">
              Think of the subject's name...
            </div>
          </div>
        </div>

        {/* Warning message */}
        <div className="mt-6 text-center text-[10px] text-bat/30 font-[var(--font-mono-ui)] tracking-[0.2em] uppercase">
          Unauthorized access attempts are logged and monitored.
        </div>
      </div>
    </section>
  );
}
