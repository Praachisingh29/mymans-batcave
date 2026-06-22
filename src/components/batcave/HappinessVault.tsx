import { SectionHeader } from "./SectionHeader";

export function HappinessVault() {
  const openVault = () => {
    window.open(
      "https://drive.google.com/drive/folders/10fQuU54Rir4JFDk93067HTRxj_7JHykp?usp=sharing",
      "_blank"
    );
  };

  return (
    <section id="happiness-vault" className="relative px-6 py-28 md:py-36 max-w-4xl mx-auto">
      <SectionHeader
        kicker="🎁 Special Gift"
        title="✨ Emergency Happiness Refill"
        subtitle="Feeling low on energy, smiles, or motivation? Tap here for an instant dose of happiness. Inside are little moments saved just for you — videos to make you laugh, brighten your day, and remind you that you're deeply loved and never alone. ❤️"
      />

      <div className="mt-16 relative">
        {/* Glowing background effect */}
        <div className="absolute -inset-8 bg-gradient-to-br from-rose-500/20 via-pink-500/10 to-purple-500/20 rounded-2xl blur-2xl opacity-60 animate-pulse" />

        {/* Main card */}
        <div className="relative hologram rounded-xl p-8 md:p-12 border-2 border-pink-400/40 bg-gradient-to-br from-rose-950/40 via-charcoal to-purple-950/40 overflow-hidden group hover:border-pink-400/60 transition-all duration-300 hover:shadow-[0_0_50px_rgba(236,72,153,0.3)]">
          {/* Decorative hearts floating in background */}
          <div className="absolute top-4 right-8 text-4xl opacity-20 group-hover:opacity-40 transition duration-300">💝</div>
          <div className="absolute bottom-8 left-4 text-3xl opacity-15 group-hover:opacity-30 transition duration-300">💖</div>

          {/* Content */}
          <div className="relative z-10 text-center space-y-8">
            {/* Decorative emoji line */}
            <div className="flex items-center justify-center gap-2 text-2xl animate-bounce">
              <span>✨</span>
              <span>💝</span>
              <span>✨</span>
            </div>

            {/* Main message */}
            <div className="space-y-4">
              <div className="text-xl md:text-2xl font-[var(--font-display)] text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-300 to-purple-300 uppercase tracking-wider">
                A Treasure Chest Built Just For You
              </div>
              <p className="text-sm md:text-base text-rose-100/80 italic leading-relaxed max-w-2xl mx-auto">
                On days when the world feels heavy, when your smile needs a little help, or when you just need to remember how loved you are — this is your secret place. A collection of moments, laughs, and love letters in video form.
              </p>
            </div>

            {/* Stats/Features */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-pink-300/20">
              <div className="text-center">
                <div className="text-2xl mb-1">😄</div>
                <div className="text-[10px] font-[var(--font-mono-ui)] text-pink-300/70 uppercase tracking-widest">Instant Laughs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">💪</div>
                <div className="text-[10px] font-[var(--font-mono-ui)] text-pink-300/70 uppercase tracking-widest">Quick Boost</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">❤️</div>
                <div className="text-[10px] font-[var(--font-mono-ui)] text-pink-300/70 uppercase tracking-widest">Pure Love</div>
              </div>
            </div>

            {/* Main Button */}
            <button
              onClick={openVault}
              className="mt-8 inline-flex items-center gap-3 px-8 py-4 rounded-lg font-[var(--font-display)] text-lg uppercase tracking-wider
                         bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400
                         text-background shadow-lg hover:shadow-[0_0_30px_rgba(236,72,153,0.5)]
                         transition-all duration-300 transform hover:scale-105 active:scale-95
                         border border-rose-300/50 hover:border-rose-300
                         group/btn"
            >
              <span className="text-2xl group-hover/btn:animate-spin">🎬</span>
              <span>Open My Happiness Vault</span>
            </button>

            {/* Subtitle message */}
            <p className="text-[10px] font-[var(--font-mono-ui)] text-pink-300/50 tracking-widest uppercase pt-4">
              Click anytime. Healing starts here. 💫
            </p>
          </div>

          {/* Animated border glow */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-rose-400/0 via-pink-400/50 to-purple-400/0 opacity-0 group-hover:opacity-20 transition duration-300" />
        </div>
      </div>

      {/* Footer message */}
      <div className="mt-12 text-center text-xs text-pink-200/40 font-[var(--font-mono-ui)] tracking-widest">
        ✨ Your personal vault of joy — password: love ✨
      </div>
    </section>
  );
}
