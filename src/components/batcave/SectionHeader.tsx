export function SectionHeader({
  kicker,
  title,
  subtitle,
  center = false,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center" : ""}>
      {kicker && (
        <div className="text-[11px] md:text-xs tracking-[0.42em] text-bat/70 uppercase font-[var(--font-mono-ui)] mb-4">
          {kicker}
        </div>
      )}
      <h2 className="font-[var(--font-display)] text-4xl md:text-6xl font-bold text-gold leading-[0.95]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl">{subtitle}</p>
      )}
      <div className="mt-6 h-px w-24 bg-gradient-to-r from-bat/60 to-transparent" />
    </div>
  );
}
