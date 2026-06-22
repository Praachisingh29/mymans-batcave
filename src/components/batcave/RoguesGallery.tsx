import { useRef, useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { compressImageToDataURL, useLocalState } from "@/lib/editable";

interface Villain {
  id: number;
  name: string;
  line: string;
  imageUrl?: string;
}

const STORAGE_KEY = "batcave.rogues.v1";

type Overrides = Record<number, Partial<Pick<Villain, "name" | "line" | "imageUrl">>>;

const DEFAULTS: Villain[] = [
  { id: 1, name: "Overthinking", line: "Silenced by his voice on the phone.", imageUrl: "/images/rogues/villain-01.svg" },
  { id: 2, name: "Bad Days", line: "Reversed by one of his hugs.", imageUrl: "/images/rogues/villain-02.svg" },
  { id: 3, name: "Loneliness", line: "Cannot exist when he's around.", imageUrl: "/images/rogues/villain-03.svg" },
  { id: 4, name: "Insecurity", line: "Looked in the mirror after he loved her.", imageUrl: "/images/rogues/villain-04.svg" },
  { id: 5, name: "Distance", line: "Shrinks every time he says 'I'm here.'", imageUrl: "/images/rogues/villain-05.svg" },
  { id: 6, name: "Stress", line: "Dissolves on contact with him.", imageUrl: "/images/rogues/villain-06.svg" },
  { id: 7, name: "Anxiety", line: "Loses the fight whenever he smiles.", imageUrl: "/images/rogues/villain-07.svg" },
];

export function RoguesGallery() {
  const [overrides, setOverrides] = useLocalState<Overrides>(STORAGE_KEY, {});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [uploadingId, setUploadingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pendingIdRef = useRef<number | null>(null);

  const villains = DEFAULTS.map((v) => ({ ...v, ...overrides[v.id] }));

  const patch = (id: number, p: Overrides[number]) => {
    setOverrides({ ...overrides, [id]: { ...overrides[id], ...p } });
    setError(null);
  };

  const resetOne = (id: number) => {
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
      setError("Could not read that image.");
    } finally {
      setUploadingId(null);
    }
  };

  return (
    <section id="rogues" className="relative px-6 py-28 md:py-36 max-w-6xl mx-auto">
      <SectionHeader
        kicker="Section 06"
        title="Rogues Gallery"
        subtitle="Every villain that ever tried. Every one of them — defeated by Vishu."
      />

      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />

      {error && (
        <div className="mt-6 text-sm text-destructive border border-destructive/40 bg-destructive/10 rounded px-4 py-2">
          {error}
        </div>
      )}

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {villains.map((v, i) => {
          const isEditing = editingId === v.id;
          const isUploading = uploadingId === v.id;
          return (
            <div
              key={v.id}
              className="relative group glass-panel rounded-lg overflow-hidden hover:border-destructive/50 transition"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-graphite to-charcoal relative flex items-center justify-center overflow-hidden">
                {v.imageUrl ? (
                  <img src={v.imageUrl} alt={v.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="font-[var(--font-display)] text-3xl md:text-4xl text-foreground/30 uppercase tracking-tighter group-hover:text-foreground/50 transition text-center px-4">
                    {v.name}
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="font-[var(--font-display)] text-5xl md:text-6xl font-bold text-destructive/90 rotate-[-12deg] tracking-widest border-4 border-destructive/80 px-4 py-1 opacity-90 bg-black/30">
                    DEFEATED
                  </div>
                </div>
                {isUploading && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-[10px] tracking-[0.3em] text-bat font-[var(--font-mono-ui)] animate-pulse">
                    UPLOADING…
                  </div>
                )}
              </div>
              <div className="p-4 space-y-2 text-sm">
                <div className="flex justify-between text-[10px] tracking-[0.3em] font-[var(--font-mono-ui)]">
                  <span className="text-destructive/80">STATUS: DEFEATED</span>
                  <span className="text-bat/80">BY: VISHU</span>
                </div>

                {isEditing ? (
                  <>
                    <input
                      value={v.name}
                      onChange={(e) => patch(v.id, { name: e.target.value })}
                      className="w-full bg-transparent border-b border-bat/30 focus:border-bat outline-none font-[var(--font-display)] text-lg text-bat"
                      placeholder="Villain name"
                    />
                    <textarea
                      value={v.line}
                      onChange={(e) => patch(v.id, { line: e.target.value })}
                      rows={2}
                      className="w-full bg-black/30 border border-bat/20 focus:border-bat outline-none rounded p-2 text-foreground italic resize-y"
                      placeholder="How he defeats it…"
                    />
                  </>
                ) : (
                  <>
                    <div className="font-[var(--font-display)] text-lg text-bat">{v.name}</div>
                    <div className="text-foreground/80 italic">{v.line}</div>
                  </>
                )}

                <div className="pt-2 flex flex-wrap gap-2">
                  <button
                    onClick={() => pickFile(v.id)}
                    className="text-[10px] tracking-[0.25em] font-[var(--font-mono-ui)] border border-bat/40 text-bat/90 hover:bg-bat/10 hover:border-bat rounded py-1.5 px-2 transition"
                  >
                    {v.imageUrl ? "REPLACE" : "+ PHOTO"}
                  </button>
                  <button
                    onClick={() => setEditingId(isEditing ? null : v.id)}
                    className="text-[10px] tracking-[0.25em] font-[var(--font-mono-ui)] border border-gold/40 text-gold/90 hover:bg-gold/10 hover:border-gold rounded py-1.5 px-2 transition"
                  >
                    {isEditing ? "DONE" : "✎ EDIT"}
                  </button>
                  {v.imageUrl && (
                    <button
                      onClick={() => patch(v.id, { imageUrl: undefined })}
                      className="text-[10px] tracking-[0.25em] font-[var(--font-mono-ui)] border border-destructive/40 text-destructive/90 hover:bg-destructive/10 rounded py-1.5 px-2 transition"
                    >
                      ✕ PHOTO
                    </button>
                  )}
                  {overrides[v.id] && (
                    <button
                      onClick={() => resetOne(v.id)}
                      className="text-[10px] tracking-[0.25em] font-[var(--font-mono-ui)] border border-muted-foreground/30 text-muted-foreground hover:bg-muted/10 rounded py-1.5 px-2 transition"
                    >
                      RESET
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-10 text-xs text-muted-foreground italic text-center">
        Photos & edits are saved privately in this browser.
      </p>
    </section>
  );
}
