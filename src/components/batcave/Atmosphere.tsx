/**
 * Persistent Gotham atmosphere: fog, rain, flying bats, distant skyline.
 * Pure CSS/SVG — no deps.
 */
import { useMemo } from "react";

export function GothamSkyline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1600 320"
      preserveAspectRatio="none"
      className={`pointer-events-none w-full ${className}`}
      aria-hidden
    >
      <defs>
        <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.10 0.01 270)" />
          <stop offset="100%" stopColor="oklch(0.04 0.005 270)" />
        </linearGradient>
        <radialGradient id="batsig" cx="50%" cy="0%" r="60%">
          <stop offset="0%" stopColor="oklch(0.86 0.19 95 / 0.45)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect width="1600" height="320" fill="url(#sky)" />
      <ellipse cx="800" cy="0" rx="500" ry="240" fill="url(#batsig)" className="animate-flicker" />
      {/* Bat-Signal bat */}
      <g transform="translate(720,30) scale(0.5)" opacity="0.85">
        <path
          d="M160 40c-20 0-30 18-30 18s-15-22-50-22c-30 0-50 18-50 35 0 8 10 18 10 18S25 105 40 110c12 4 30-2 35-8 6 12 30 16 50 8 8 14 25 18 35 18s27-4 35-18c20 8 44 4 50-8 5 6 23 12 35 8 15-5-0-22-0-22s10-10 10-18c0-17-20-35-50-35-35 0-50 22-50 22s-10-18-30-18z"
          fill="oklch(0.06 0.005 270)"
          stroke="oklch(0.86 0.19 95 / 0.6)"
          strokeWidth="2"
        />
      </g>
      {/* skyline silhouette */}
      <path
        d="M0 320 L0 220 L60 220 L60 180 L100 180 L100 240 L160 240 L160 160 L180 160 L180 130 L210 130 L210 160 L240 160 L240 200 L290 200 L290 240 L330 240 L330 100 L350 100 L350 80 L370 80 L370 100 L390 100 L390 230 L450 230 L450 180 L490 180 L490 210 L540 210 L540 150 L580 150 L580 130 L610 130 L610 150 L640 150 L640 220 L700 220 L700 170 L730 170 L730 90 L760 90 L760 60 L780 60 L780 90 L810 90 L810 200 L860 200 L860 240 L920 240 L920 170 L960 170 L960 140 L990 140 L990 170 L1020 170 L1020 230 L1080 230 L1080 180 L1130 180 L1130 220 L1180 220 L1180 130 L1210 130 L1210 100 L1240 100 L1240 130 L1270 130 L1270 240 L1330 240 L1330 200 L1380 200 L1380 170 L1430 170 L1430 230 L1490 230 L1490 200 L1540 200 L1540 220 L1600 220 L1600 320 Z"
        fill="oklch(0.04 0.005 270)"
        stroke="oklch(0.78 0.14 85 / 0.18)"
        strokeWidth="1"
      />
      {/* lit windows */}
      {Array.from({ length: 60 }).map((_, i) => (
        <rect
          key={i}
          x={(i * 27) % 1600}
          y={180 + ((i * 53) % 90)}
          width="2.5"
          height="3"
          fill="oklch(0.86 0.19 95 / 0.55)"
          opacity={0.3 + ((i * 7) % 10) / 14}
        />
      ))}
    </svg>
  );
}

function Bat({ style }: { style: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 200 80" style={style} className="absolute pointer-events-none">
      <path
        d="M100 30c-12 0-18 12-18 12s-10-16-32-16c-20 0-32 12-32 22 0 5 6 12 6 12s-12 6-2 9c8 3 19-2 22-5 4 8 19 10 32 5 5 9 16 11 24 11s19-2 24-11c13 5 28 3 32-5 3 3 14 8 22 5 10-3-2-9-2-9s6-7 6-12c0-10-12-22-32-22-22 0-32 16-32 16s-6-12-18-12z"
        fill="oklch(0.05 0.005 270)"
        stroke="oklch(0.78 0.14 85 / 0.35)"
        strokeWidth="1"
      />
    </svg>
  );
}

export function FlyingBats({ count = 6 }: { count?: number }) {
  const bats = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        top: 5 + Math.random() * 70,
        left: Math.random() * 90,
        size: 30 + Math.random() * 50,
        delay: Math.random() * 8,
        dur: 14 + Math.random() * 14,
        opacity: 0.35 + Math.random() * 0.45,
      })),
    [count],
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {bats.map((b) => (
        <Bat
          key={b.id}
          style={{
            top: `${b.top}%`,
            left: `${b.left}%`,
            width: b.size,
            opacity: b.opacity,
            animation: `float-bat ${b.dur}s ease-in-out ${b.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export function Rain({ count = 80 }: { count?: number }) {
  const drops = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        dur: 0.6 + Math.random() * 0.9,
        len: 30 + Math.random() * 60,
        opacity: 0.08 + Math.random() * 0.2,
      })),
    [count],
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {drops.map((d) => (
        <span
          key={d.id}
          style={{
            position: "absolute",
            left: `${d.left}%`,
            top: -d.len,
            width: 1,
            height: d.len,
            background: `linear-gradient(to bottom, transparent, oklch(0.78 0.14 85 / ${d.opacity}))`,
            animation: `rain-fall ${d.dur}s linear ${d.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export function Fog() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      <div
        className="absolute inset-x-0 bottom-0 h-[40vh]"
        style={{
          background:
            "radial-gradient(ellipse at 30% 100%, oklch(0.22 0.01 270 / 0.55), transparent 60%), radial-gradient(ellipse at 70% 100%, oklch(0.18 0.01 270 / 0.4), transparent 60%)",
          animation: "fog-drift 18s ease-in-out infinite",
        }}
      />
    </div>
  );
}

export function Particles({ count = 24 }: { count?: number }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 6,
        size: 1 + Math.random() * 2.5,
      })),
    [count],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <span
          key={d.id}
          className="absolute rounded-full bg-bat/60 animate-capsule-glow"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
