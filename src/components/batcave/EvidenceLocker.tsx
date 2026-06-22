import { useRef, useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { compressImageToDataURL, useLocalState } from "@/lib/editable";

interface CaseFile {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl?: string;
}

const STORAGE_KEY = "batcave.evidence.v2";

type Overrides = Record<
  number,
  Partial<Pick<CaseFile, "title" | "date" | "location" | "description" | "imageUrl">>
>;

const DEFAULTS: CaseFile[] = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  title:
    ["The Coffee Shop Stakeout", "Operation: Sunset Drive", "The Movie Night Heist", "Recon: Home Sweet Home", "The Long Walk Investigation", "Mission: First Kiss", "The Lazy Sunday File", "Operation: Surprise Hug", "The Late Night Calls Dossier", "Recon: His Smile, Up Close", "The Adventure Day Report", "Classified: Just Because"][i] ||
    `Case ${i + 1}`,
  date: "—",
  location: "Gotham · with him",
  description:
    "Evidence collected on subject Vishu — overwhelming proof of greatest boyfriend status. Tap edit to add your own notes for this case.",
}));

export function EvidenceLocker() {
  const [overrides, setOverrides] = useLocalState<Overrides>(STORAGE_KEY, {});
  const [active, setActive] = useState<number | null>(null);
  const [editing, setEditing] = useState(false);
  const [uploadingId, setUploadingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pendingIdRef = useRef<number | null>(null);

  const merged = (f: CaseFile): CaseFile => ({ ...f, ...overrides[f.id] });
  const files = DEFAULTS.map(merged);
  const activeFile = active != null ? files.find((f) => f.id === active) : null;

  const patch = (id: number, p: Overrides[number]) => {
    const next: Overrides = { ...overrides, [id]: { ...overrides[id], ...p } };
    try {
      setOverrides(next);
      setError(null);
    } catch {
      setError("Storage is full — try removing a photo first.");
    }
  };

  const removeImage = (id: number) => patch(id, { imageUrl: undefined });

  const resetCase = (id: number) => {
    const next = { ...overrides };
    delete next[id];
    setOverrides(next);
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
      const dataUrl = await compressImageToDataURL(file);
      patch(id, { imageUrl: dataUrl });
    } catch {
      setError("Could not read that image. Try a different file.");
    } finally {
      setUploadingId(null);
    }
  };

  const uploadedCount = Object.values(overrides).filter((o) => o?.imageUrl).length;

  return (
    <section id="evidence" className="relative px-6 py-28 md:py-36 max-w-7xl mx-auto">
      <SectionHeader
        kicker="Section 03"
        title="Evidence Locker"
        subtitle="Collected evidence proving Vishu is the greatest boyfriend alive."
      />
      <div className="mt-4 text-xs tracking-[0.3em] text-gold/60 font-[var(--font-mono-ui)]">
        ACCESS LEVEL: WITNESS ONLY · TOTAL FILES: {files.length} · UPLOADED: {uploadedCount}
      </div>

      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />

      {error && (
        <div className="mt-6 text-sm text-destructive border border-destructive/40 bg-destructive/10 rounded px-4 py-2">
          {error}
        </div>
      )}

      <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {files.map((f) => {
          const isUploading = uploadingId === f.id;
          return (
            <div
              key={f.id}
              className="group glass-panel rounded-lg overflow-hidden text-left transition hover:-translate-y-1 hover:border-bat/50 hover:shadow-[0_0_30px_oklch(0.86_0.19_95_/_0.25)]"
            >
              <button
                onClick={() => { setActive(f.id); setEditing(false); }}
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
                  onClick={() => pickFile(f.id)}
                  className="flex-1 text-[10px] tracking-[0.25em] font-[var(--font-mono-ui)] border border-bat/40 text-bat/90 hover:bg-bat/10 hover:border-bat rounded py-2 transition"
                >
                  {f.imageUrl ? "REPLACE" : "+ UPLOAD"}
                </button>
                <button
                  onClick={() => { setActive(f.id); setEditing(true); }}
                  className="text-[10px] tracking-[0.25em] font-[var(--font-mono-ui)] border border-gold/40 text-gold/90 hover:bg-gold/10 hover:border-gold rounded py-2 px-3 transition"
                  aria-label="Edit case file"
                >
                  ✎
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-10 text-xs text-muted-foreground italic text-center">
        Photos & notes are saved privately in this browser. Use the same browser to keep your evidence locked in.
      </p>

      {activeFile && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-up"
          onClick={() => { setActive(null); setEditing(false); }}
        >
          <div
            className="hologram rounded-xl max-w-3xl w-full p-6 md:p-10 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => { setActive(null); setEditing(false); }}
              className="absolute top-4 right-4 text-bat/70 hover:text-bat text-2xl"
              aria-label="Close"
            >
              ✕
            </button>
            <div className="text-xs tracking-[0.3em] text-gold/70 font-[var(--font-mono-ui)]">
              CASE FILE #{String(activeFile.id).padStart(3, "0")}
            </div>

            {editing ? (
              <input
                value={activeFile.title}
                onChange={(e) => patch(activeFile.id, { title: e.target.value })}
                className="mt-2 w-full bg-transparent border-b border-bat/30 focus:border-bat outline-none font-[var(--font-display)] text-3xl md:text-4xl text-bat"
              />
            ) : (
              <h3 className="font-[var(--font-display)] text-3xl md:text-4xl text-bat mt-2">{activeFile.title}</h3>
            )}

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="aspect-square bg-graphite rounded border border-gold/20 flex items-center justify-center text-bat/40 text-sm overflow-hidden">
                {activeFile.imageUrl ? (
                  <img src={activeFile.imageUrl} alt={activeFile.title} className="w-full h-full object-cover" />
                ) : (
                  <button
                    onClick={() => pickFile(activeFile.id)}
                    className="w-full h-full flex flex-col items-center justify-center gap-2 text-bat/60 hover:text-bat hover:bg-bat/5 transition"
                  >
                    <span className="text-3xl">＋</span>
                    <span className="text-[10px] tracking-[0.3em] font-[var(--font-mono-ui)]">UPLOAD PHOTO</span>
                  </button>
                )}
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-baseline gap-2">
                  <span className="text-gold/60 tracking-widest text-xs">DATE:</span>
                  {editing ? (
                    <input
                      value={activeFile.date}
                      onChange={(e) => patch(activeFile.id, { date: e.target.value })}
                      className="flex-1 bg-transparent border-b border-bat/20 focus:border-bat outline-none text-foreground"
                      placeholder="e.g. June 22, 2026"
                    />
                  ) : (
                    <span>{activeFile.date}</span>
                  )}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-gold/60 tracking-widest text-xs">LOCATION:</span>
                  {editing ? (
                    <input
                      value={activeFile.location}
                      onChange={(e) => patch(activeFile.id, { location: e.target.value })}
                      className="flex-1 bg-transparent border-b border-bat/20 focus:border-bat outline-none text-foreground"
                    />
                  ) : (
                    <span>{activeFile.location}</span>
                  )}
                </div>
                <div className="pt-3 border-t border-gold/20 text-foreground/90 leading-relaxed">
                  {editing ? (
                    <textarea
                      value={activeFile.description}
                      onChange={(e) => patch(activeFile.id, { description: e.target.value })}
                      rows={6}
                      className="w-full bg-black/30 border border-bat/20 focus:border-bat outline-none rounded p-3 text-foreground resize-y"
                    />
                  ) : (
                    activeFile.description
                  )}
                </div>

                <div className="pt-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => pickFile(activeFile.id)}
                    className="text-[10px] tracking-[0.25em] font-[var(--font-mono-ui)] border border-bat/40 text-bat/90 hover:bg-bat/10 hover:border-bat rounded py-2 px-3 transition"
                  >
                    {activeFile.imageUrl ? "REPLACE PHOTO" : "+ PHOTO"}
                  </button>
                  {activeFile.imageUrl && (
                    <button
                      onClick={() => removeImage(activeFile.id)}
                      className="text-[10px] tracking-[0.25em] font-[var(--font-mono-ui)] border border-destructive/40 text-destructive/90 hover:bg-destructive/10 rounded py-2 px-3 transition"
                    >
                      REMOVE PHOTO
                    </button>
                  )}
                  <button
                    onClick={() => setEditing((v) => !v)}
                    className="text-[10px] tracking-[0.25em] font-[var(--font-mono-ui)] border border-gold/40 text-gold/90 hover:bg-gold/10 hover:border-gold rounded py-2 px-3 transition"
                  >
                    {editing ? "DONE" : "✎ EDIT TEXT"}
                  </button>
                  <button
                    onClick={() => resetCase(activeFile.id)}
                    className="text-[10px] tracking-[0.25em] font-[var(--font-mono-ui)] border border-muted-foreground/30 text-muted-foreground hover:bg-muted/10 rounded py-2 px-3 transition"
                  >
                    RESET
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
