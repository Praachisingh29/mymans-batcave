import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "./SectionHeader";

interface CaseFile {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl?: string;
}

const STORAGE_KEY = "batcave.evidence.images.v1";

const FILES: CaseFile[] = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  title: ["The Coffee Shop Stakeout", "Operation: Sunset Drive", "The Movie Night Heist", "Recon: Home Sweet Home", "The Long Walk Investigation", "Mission: First Kiss", "The Lazy Sunday File", "Operation: Surprise Hug", "The Late Night Calls Dossier", "Recon: His Smile, Up Close", "The Adventure Day Report", "Classified: Just Because"][i] || `Case ${i + 1}`,
  date: "—",
  location: "Gotham · with him",
  description:
    "Evidence collected on subject Vishu — overwhelming proof of greatest boyfriend status. Upload a photo to seal this case file.",
}));

const MAX_DIM = 1400;
const QUALITY = 0.85;

async function compressImage(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_DIM / Math.max(bitmap.width, bitmap.height));
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(bitmap, 0, 0, w, h);
  return canvas.toDataURL("image/jpeg", QUALITY);
}

export function EvidenceLocker() {
  const [active, setActive] = useState<CaseFile | null>(null);
  const [images, setImages] = useState<Record<number, string>>({});
  const [uploadingId, setUploadingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pendingIdRef = useRef<number | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setImages(JSON.parse(raw));
    } catch {}
  }, []);

  const persist = (next: Record<number, string>) => {
    setImages(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setError(null);
    } catch {
      setError("Storage is full — try removing a photo first.");
    }
  };

  const pickFile = (id: number) => {
    pendingIdRef.current = id;
    setError(null);
    inputRef.current?.click();
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const id = pendingIdRef.current;
    e.target.value = "";
    if (!file || id == null) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    try {
      setUploadingId(id);
      const dataUrl = await compressImage(file);
      const next = { ...images, [id]: dataUrl };
      persist(next);
      setActive((prev) => (prev && prev.id === id ? { ...prev, imageUrl: dataUrl } : prev));
    } catch {
      setError("Could not read that image. Try a different file.");
    } finally {
      setUploadingId(null);
    }
  };

  const removeImage = (id: number) => {
    const next = { ...images };
    delete next[id];
    persist(next);
    setActive((prev) => (prev && prev.id === id ? { ...prev, imageUrl: undefined } : prev));
  };

  const merged = (f: CaseFile): CaseFile => ({ ...f, imageUrl: images[f.id] ?? f.imageUrl });

  return (
    <section id="evidence" className="relative px-6 py-28 md:py-36 max-w-7xl mx-auto">
      <SectionHeader
        kicker="Section 03"
        title="Evidence Locker"
        subtitle="Collected evidence proving Vishu is the greatest boyfriend alive."
      />
      <div className="mt-4 text-xs tracking-[0.3em] text-gold/60 font-[var(--font-mono-ui)]">
        ACCESS LEVEL: WITNESS ONLY · TOTAL FILES: {FILES.length} · UPLOADED: {Object.keys(images).length}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
      />

      {error && (
        <div className="mt-6 text-sm text-destructive border border-destructive/40 bg-destructive/10 rounded px-4 py-2">
          {error}
        </div>
      )}

      <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {FILES.map((raw) => {
          const f = merged(raw);
          const isUploading = uploadingId === f.id;
          return (
            <div
              key={f.id}
              className="group glass-panel rounded-lg overflow-hidden text-left transition hover:-translate-y-1 hover:border-bat/50 hover:shadow-[0_0_30px_oklch(0.86_0.19_95_/_0.25)]"
            >
              <button
                onClick={() => setActive(f)}
                className="block w-full text-left"
              >
                <div className="relative aspect-[4/5] bg-gradient-to-br from-graphite to-charcoal flex items-center justify-center overflow-hidden">
                  {f.imageUrl ? (
                    <img src={f.imageUrl} alt={f.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center px-4">
                      <div className="text-[9px] tracking-[0.3em] text-bat/50 font-[var(--font-mono-ui)] mb-3">PHOTO REDACTED</div>
                      <svg viewBox="0 0 60 60" className="w-12 h-12 mx-auto text-gold/30">
                        <rect x="6" y="10" width="48" height="40" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                        <circle cx="22" cy="26" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M6 44 L22 30 L34 40 L46 28 L54 36 L54 50 L6 50 Z" fill="currentColor" opacity="0.3" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute top-2 left-2 text-[10px] font-[var(--font-mono-ui)] tracking-widest text-bat/80 bg-black/60 px-2 py-0.5 rounded">
                    CASE FILE #{String(f.id).padStart(3, "0")}
                  </div>
                  {isUploading && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-[10px] tracking-[0.3em] text-bat font-[var(--font-mono-ui)] animate-pulse">
                      UPLOADING…
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="font-[var(--font-display)] text-base text-bat group-hover:text-glow transition">{f.title}</div>
                  <div className="text-[11px] text-muted-foreground mt-1">{f.location}</div>
                </div>
              </button>
              <div className="px-4 pb-4 flex gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); pickFile(f.id); }}
                  className="flex-1 text-[10px] tracking-[0.25em] font-[var(--font-mono-ui)] border border-bat/40 text-bat/90 hover:bg-bat/10 hover:border-bat rounded py-2 transition"
                >
                  {f.imageUrl ? "REPLACE" : "+ UPLOAD"}
                </button>
                {f.imageUrl && (
                  <button
                    onClick={(e) => { e.stopPropagation(); removeImage(f.id); }}
                    className="text-[10px] tracking-[0.25em] font-[var(--font-mono-ui)] border border-destructive/40 text-destructive/90 hover:bg-destructive/10 rounded py-2 px-3 transition"
                    aria-label="Remove photo"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-10 text-xs text-muted-foreground italic text-center">
        Photos are saved privately in this browser only. Use the same browser to keep your evidence locked in.
      </p>

      {active && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-up"
          onClick={() => setActive(null)}
        >
          <div
            className="hologram rounded-xl max-w-3xl w-full p-6 md:p-10 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActive(null)}
              className="absolute top-4 right-4 text-bat/70 hover:text-bat text-2xl"
              aria-label="Close"
            >
              ✕
            </button>
            <div className="text-xs tracking-[0.3em] text-gold/70 font-[var(--font-mono-ui)]">
              CASE FILE #{String(active.id).padStart(3, "0")}
            </div>
            <h3 className="font-[var(--font-display)] text-3xl md:text-4xl text-bat mt-2">{active.title}</h3>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="aspect-square bg-graphite rounded border border-gold/20 flex items-center justify-center text-bat/40 text-sm overflow-hidden">
                {active.imageUrl ? (
                  <img src={active.imageUrl} alt={active.title} className="w-full h-full object-cover" />
                ) : (
                  <button
                    onClick={() => pickFile(active.id)}
                    className="w-full h-full flex flex-col items-center justify-center gap-2 text-bat/60 hover:text-bat hover:bg-bat/5 transition"
                  >
                    <span className="text-3xl">＋</span>
                    <span className="text-[10px] tracking-[0.3em] font-[var(--font-mono-ui)]">UPLOAD PHOTO</span>
                  </button>
                )}
              </div>
              <div className="space-y-3 text-sm">
                <div><span className="text-gold/60 tracking-widest text-xs">DATE: </span>{active.date}</div>
                <div><span className="text-gold/60 tracking-widest text-xs">LOCATION: </span>{active.location}</div>
                <div className="pt-3 border-t border-gold/20 text-foreground/90 leading-relaxed">{active.description}</div>
                <div className="pt-3 flex gap-2">
                  <button
                    onClick={() => pickFile(active.id)}
                    className="flex-1 text-[10px] tracking-[0.25em] font-[var(--font-mono-ui)] border border-bat/40 text-bat/90 hover:bg-bat/10 hover:border-bat rounded py-2 transition"
                  >
                    {active.imageUrl ? "REPLACE PHOTO" : "+ UPLOAD PHOTO"}
                  </button>
                  {active.imageUrl && (
                    <button
                      onClick={() => removeImage(active.id)}
                      className="text-[10px] tracking-[0.25em] font-[var(--font-mono-ui)] border border-destructive/40 text-destructive/90 hover:bg-destructive/10 rounded py-2 px-3 transition"
                    >
                      REMOVE
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
