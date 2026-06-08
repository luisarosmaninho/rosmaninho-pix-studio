import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { photos as staticPhotos, categories as staticCategories, type Photo, type CategorySlug } from "@/lib/photos";
import { getPhotoConfig, savePhotoConfig, verifyAdminPassword } from "@/lib/photo-config-fns";
import { getNesteMomento, saveNesteMomento } from "@/lib/momento-fns";
import {
  getCategories, saveCategoryTexts,
  getPhotosWithMeta, savePhotoMeta, getNewPhotos, addNewPhoto, deleteNewPhoto,
  getJournal, getNewJournalEntries, saveJournalEntry, addNewJournalEntry, deleteNewJournalEntry,
  getNotas, saveNotas,
  getSobreTexts, saveSobreTexts,
  type SobreConfig, type NewPhotoEntry,
} from "@/lib/content-fns";
import type { Nota } from "@/lib/notas";
import type { JournalEntry } from "@/lib/journal";
import type { Category } from "@/lib/photos";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Rosmaninho Fotografia" }] }),
  loader: async () => {
    const [config, momento, categories, photosWithMeta, newPhotos, journalEntries, newJournalEntries, notasList, sobreTexts] = await Promise.all([
      getPhotoConfig(),
      getNesteMomento(),
      getCategories(),
      getPhotosWithMeta(),
      getNewPhotos(),
      getJournal(),
      getNewJournalEntries(),
      getNotas(),
      getSobreTexts(),
    ]);
    return { config, momento, categories, photosWithMeta, newPhotos, journalEntries, newJournalEntries, notasList, sobreTexts };
  },
  component: AdminPage,
});

type TabId = "momento" | "series" | "fotos" | "caderno" | "notas" | "autora" | "ordem";

const TABS: { id: TabId; label: string }[] = [
  { id: "momento", label: "Neste Momento" },
  { id: "series", label: "Séries" },
  { id: "fotos", label: "Fotos" },
  { id: "caderno", label: "Caderno" },
  { id: "notas", label: "Notas & Fragmentos" },
  { id: "autora", label: "Autora" },
  { id: "ordem", label: "Ordem" },
];

// ── Password gate ────────────────────────────────────────────────────────────

function PasswordGate({ onAuth }: { onAuth: (pw: string) => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!password.trim()) { setError("Preenche a password."); return; }
    setLoading(true); setError("");
    try {
      await verifyAdminPassword({ data: { password } });
      onAuth(password);
    } catch { setError("Password incorrecta."); }
    finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen bg-[#0e0e0d] flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/30 mb-2">Rosmaninho Fotografia</p>
          <h1 className="text-white text-3xl font-light tracking-tight">Área reservada</h1>
        </div>
        <input
          type="password" value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }}
          placeholder="Password" autoFocus disabled={loading}
          className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm outline-none focus:border-white/30 transition-colors placeholder:text-white/20 disabled:opacity-50"
        />
        {error && <p className="text-red-400 text-xs">{error}</p>}
        <button type="submit" disabled={loading}
          className="w-full bg-white text-black text-[11px] uppercase tracking-[0.28em] py-3 hover:bg-white/90 transition-colors disabled:opacity-50">
          {loading ? "A verificar…" : "Entrar"}
        </button>
      </form>
    </div>
  );
}

// ── Shared helpers ───────────────────────────────────────────────────────────

function SaveBtn({ saving, ok, label = "Guardar" }: { saving: boolean; ok?: boolean; label?: string }) {
  return (
    <button type="submit" disabled={saving}
      className="bg-white text-black text-[11px] uppercase tracking-[0.28em] px-5 py-2 hover:bg-white/90 transition-colors disabled:opacity-50">
      {saving ? "A guardar…" : ok ? "Guardado ✓" : label}
    </button>
  );
}

function Field({ label, value, onChange, rows = 1, mono = false, hint }: {
  label: string; value: string; onChange: (v: string) => void; rows?: number; mono?: boolean; hint?: string;
}) {
  const cls = `w-full bg-white/5 border border-white/10 text-white px-3 py-2 text-sm outline-none focus:border-white/30 transition-colors placeholder:text-white/20 ${mono ? "font-mono" : ""} resize-none`;
  return (
    <div className="space-y-1">
      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30">{label}</p>
      {rows > 1
        ? <textarea className={cls} rows={rows} value={value} onChange={(e) => onChange(e.target.value)} />
        : <input className={cls} value={value} onChange={(e) => onChange(e.target.value)} />
      }
      {hint && <p className="font-mono text-[9px] text-white/20">{hint}</p>}
    </div>
  );
}

function SelectField({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="space-y-1">
      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30">{label}</p>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/10 text-white px-3 py-2 text-sm outline-none focus:border-white/30 transition-colors">
        {options.map((o) => <option key={o.value} value={o.value} className="bg-[#1a1a18]">{o.label}</option>)}
      </select>
    </div>
  );
}

function SectionHeader({ label, children }: { label: string; children?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-white text-xl font-light">{label}</h2>
      {children}
    </div>
  );
}

function StatusMsg({ ok, err }: { ok?: boolean; err?: string }) {
  if (ok) return <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest">Guardado ✓</span>;
  if (err) return <span className="text-red-400 text-xs">{err}</span>;
  return null;
}

// ── Momento section ──────────────────────────────────────────────────────────

function MomentoSection({ password, initial }: {
  password: string;
  initial: { aLer: string; aLerUrl?: string; aEscutar: string; aEscutarUrl?: string; aFotografar: string; aPensarEm: string };
}) {
  const router = useRouter();
  const [aLer, setALer] = useState(initial.aLer);
  const [aLerUrl, setALerUrl] = useState(initial.aLerUrl ?? "");
  const [aEscutar, setAEscutar] = useState(initial.aEscutar);
  const [aEscutarUrl, setAEscutarUrl] = useState(initial.aEscutarUrl ?? "");
  const [aFotografar, setAFotografar] = useState(initial.aFotografar);
  const [aPensarEm, setAPensarEm] = useState(initial.aPensarEm);
  const [saving, setSaving] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setErr(""); setOk(false);
    try {
      await saveNesteMomento({ data: { password, aLer, aLerUrl, aEscutar, aEscutarUrl, aFotografar, aPensarEm } });
      setOk(true); router.invalidate();
    } catch { setErr("Erro ao guardar."); }
    finally { setSaving(false); }
  }

  return (
    <form onSubmit={handleSave} className="max-w-2xl space-y-6">
      <SectionHeader label="Neste momento">
        <div className="flex items-center gap-4">
          <StatusMsg ok={ok} err={err} />
          <SaveBtn saving={saving} />
        </div>
      </SectionHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="A ler" value={aLer} onChange={setALer} rows={3} />
        <Field label="A ler — link (Bertrand ou outro)" value={aLerUrl} onChange={setALerUrl} rows={1} />
        <Field label="À escuta" value={aEscutar} onChange={setAEscutar} rows={3} />
        <Field label="À escuta — link (Spotify ou outro)" value={aEscutarUrl} onChange={setAEscutarUrl} rows={1} />
        <Field label="A fotografar" value={aFotografar} onChange={setAFotografar} rows={3} />
        <Field label="A pensar em" value={aPensarEm} onChange={setAPensarEm} rows={3} />
      </div>
    </form>
  );
}

// ── Séries section ───────────────────────────────────────────────────────────

function SeriesSection({ password, initial }: { password: string; initial: Category[] }) {
  const router = useRouter();
  const [activeCat, setActiveCat] = useState<CategorySlug>("urbanas");
  const [data, setData] = useState<Record<string, Omit<Category, "slug" | "cover">>>(() => {
    const d: Record<string, Omit<Category, "slug" | "cover">> = {};
    initial.forEach((c) => { const { slug: _s, cover: _c, ...rest } = c; d[c.slug] = rest; });
    return d;
  });
  const [saving, setSaving] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");

  const cat = data[activeCat];

  function update(field: string, value: string | string[]) {
    setData((prev) => ({ ...prev, [activeCat]: { ...prev[activeCat], [field]: value } }));
    setOk(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setErr(""); setOk(false);
    try {
      await saveCategoryTexts({ data: { password, slug: activeCat, data: data[activeCat] } });
      setOk(true); router.invalidate();
    } catch { setErr("Erro ao guardar."); }
    finally { setSaving(false); }
  }

  return (
    <div className="max-w-3xl">
      <SectionHeader label="Séries">
        <div className="flex items-center gap-4">
          <StatusMsg ok={ok} err={err} />
        </div>
      </SectionHeader>

      <div className="flex gap-2 mb-8 flex-wrap">
        {initial.map((c) => (
          <button key={c.slug} onClick={() => { setActiveCat(c.slug); setOk(false); }}
            className={`font-mono text-[10px] uppercase tracking-widest border px-4 py-1.5 transition-colors ${activeCat === c.slug ? "bg-white text-black border-white" : "border-white/20 text-white/50 hover:border-white/40"}`}>
            {c.title}
          </button>
        ))}
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        <Field label="Título" value={cat.title} onChange={(v) => update("title", v)} />
        <Field label="Descrição curta" value={cat.description} onChange={(v) => update("description", v)} rows={2} />
        <Field label="Excerto (texto italic no índice)" value={cat.excerpt} onChange={(v) => update("excerpt", v)} rows={3} />
        <Field label="Intro (parágrafo principal da página da série)" value={cat.intro} onChange={(v) => update("intro", v)} rows={3} />
        <Field
          label="Corpo da intro (parágrafos separados por linha em branco)"
          value={cat.introBody.join("\n\n")}
          onChange={(v) => update("introBody", v.split("\n\n").map((s) => s.trim()).filter(Boolean))}
          rows={10}
        />
        <Field label="Nota (ex: Série em curso · Portugal · 2022–presente)" value={cat.note} onChange={(v) => update("note", v)} />
        <Field label="Citação" value={cat.quote} onChange={(v) => update("quote", v)} rows={2} />
        <Field label="Fonte da citação" value={cat.quoteSource} onChange={(v) => update("quoteSource", v)} />
        <div className="flex justify-end pt-2">
          <SaveBtn saving={saving} ok={ok} label={`Guardar ${cat.title}`} />
        </div>
      </form>
    </div>
  );
}

// ── Fotos section ─────────────────────────────────────────────────────────────

type NewPhotoForm = { title: string; category: CategorySlug; orientation: "portrait" | "landscape" | "square"; src: string; description: string; conditions: string; date: string; location: string };
const emptyPhotoForm = (): NewPhotoForm => ({ title: "", category: "urbanas", orientation: "landscape", src: "", description: "", conditions: "", date: "", location: "" });

function FotosSection({ password, initial, initialNewPhotos }: {
  password: string; initial: Photo[]; initialNewPhotos: NewPhotoEntry[];
}) {
  const router = useRouter();
  const [filter, setFilter] = useState<CategorySlug | "all">("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const [newForm, setNewForm] = useState<NewPhotoForm>(emptyPhotoForm());
  const [newPhotoIds, setNewPhotoIds] = useState<Set<string>>(() => new Set(initialNewPhotos.map((p) => p.id)));
  const [edits, setEdits] = useState<Record<string, { title: string; description: string; conditions: string; date: string; location: string }>>(() => {
    const d: Record<string, { title: string; description: string; conditions: string; date: string; location: string }> = {};
    initial.forEach((p) => { d[p.id] = { title: p.title, description: p.meta.description, conditions: p.meta.conditions ?? "", date: p.meta.date ?? "", location: p.meta.location ?? "" }; });
    return d;
  });
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [addSaving, setAddSaving] = useState(false);
  const [addErr, setAddErr] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  const visible = filter === "all" ? initial : initial.filter((p) => p.category === filter);
  const catLabel: Record<CategorySlug, string> = { urbanas: "Urbanas", natureza: "Natureza", retratos: "Retratos", iguarias: "Iguarias" };

  function updEdit(photoId: string, field: string, val: string) {
    setEdits((prev) => ({ ...prev, [photoId]: { ...prev[photoId], [field]: val } }));
    setSaved(null);
  }

  async function save(photoId: string) {
    const e = edits[photoId];
    setSaving(photoId); setSaved(null);
    try {
      await savePhotoMeta({ data: { password, photoId, ...e } });
      setSaved(photoId); router.invalidate();
    } catch { alert("Erro ao guardar."); }
    finally { setSaving(null); }
  }

  async function handleAddPhoto(e: React.FormEvent) {
    e.preventDefault();
    if (!newForm.title.trim()) { setAddErr("O título é obrigatório."); return; }
    if (!newForm.src.trim()) { setAddErr("O URL da imagem é obrigatório."); return; }
    setAddSaving(true); setAddErr("");
    const id = `foto-${Date.now()}`;
    try {
      await addNewPhoto({ data: { password, photo: { id, ...newForm } } });
      setEdits((prev) => ({ ...prev, [id]: { title: newForm.title, description: newForm.description, conditions: newForm.conditions, date: newForm.date, location: newForm.location } }));
      setNewPhotoIds((prev) => new Set([...prev, id]));
      setNewForm(emptyPhotoForm());
      setShowNewForm(false);
      router.invalidate();
    } catch (err: unknown) { setAddErr(err instanceof Error ? err.message : "Erro ao adicionar."); }
    finally { setAddSaving(false); }
  }

  async function handleDelete(photoId: string) {
    if (!confirm(`Apagar a foto "${edits[photoId]?.title}"?`)) return;
    setDeleting(photoId);
    try {
      await deleteNewPhoto({ data: { password, photoId } });
      setNewPhotoIds((prev) => { const s = new Set(prev); s.delete(photoId); return s; });
      router.invalidate();
    } catch { alert("Erro ao apagar."); }
    finally { setDeleting(null); }
  }

  return (
    <div className="max-w-4xl">
      <SectionHeader label="Fotos — títulos e descrições">
        <div className="flex items-center gap-4">
          <p className="font-mono text-[9px] text-white/25 uppercase tracking-widest">{initial.length} fotos</p>
          <button onClick={() => setShowNewForm(true)}
            className="bg-white text-black text-[11px] uppercase tracking-widest px-5 py-2 hover:bg-white/90 transition-colors">
            + Nova foto
          </button>
        </div>
      </SectionHeader>

      {/* New photo form */}
      {showNewForm && (
        <div className="bg-white/4 border border-white/20 p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/60">Nova foto</p>
            <button onClick={() => { setShowNewForm(false); setAddErr(""); setNewForm(emptyPhotoForm()); }}
              className="text-white/30 hover:text-white text-lg leading-none transition-colors">×</button>
          </div>
          <form onSubmit={handleAddPhoto} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field label="Título *" value={newForm.title} onChange={(v) => setNewForm((p) => ({ ...p, title: v }))} />
              <SelectField label="Categoria *" value={newForm.category} onChange={(v) => setNewForm((p) => ({ ...p, category: v as CategorySlug }))}
                options={CAT_OPTIONS} />
              <SelectField label="Orientação" value={newForm.orientation} onChange={(v) => setNewForm((p) => ({ ...p, orientation: v as NewPhotoForm["orientation"] }))}
                options={[{ value: "landscape", label: "Horizontal" }, { value: "portrait", label: "Vertical" }, { value: "square", label: "Quadrada" }]} />
            </div>
            <Field label="URL da imagem * (endereço web da foto)" value={newForm.src} onChange={(v) => setNewForm((p) => ({ ...p, src: v }))}
              hint="Ex: https://... ou um caminho relativo" />
            <Field label="Descrição (texto revelado no hover)" value={newForm.description} onChange={(v) => setNewForm((p) => ({ ...p, description: v }))} rows={2} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Data (ex: Março 2024 · Inverno 2023)" value={newForm.date} onChange={(v) => setNewForm((p) => ({ ...p, date: v }))} />
              <Field label="Local (ex: Porto · Serra da Estrela)" value={newForm.location} onChange={(v) => setNewForm((p) => ({ ...p, location: v }))} />
            </div>
            <Field label="Condições (ex: entardecer · luz rasante · inverno)" value={newForm.conditions} onChange={(v) => setNewForm((p) => ({ ...p, conditions: v }))} />
            {newForm.src && (
              <div className="space-y-1">
                <p className="font-mono text-[9px] uppercase tracking-widest text-white/30">Pré-visualização</p>
                <img src={newForm.src} alt="" className="h-32 object-cover grayscale" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              </div>
            )}
            {addErr && <p className="text-red-400 text-xs">{addErr}</p>}
            <div className="flex items-center justify-end gap-4 pt-2 border-t border-white/8">
              <button type="button" onClick={() => { setShowNewForm(false); setAddErr(""); setNewForm(emptyPhotoForm()); }}
                className="font-mono text-[10px] text-white/40 hover:text-white uppercase tracking-widest transition-colors">
                Cancelar
              </button>
              <button type="submit" disabled={addSaving}
                className="bg-white text-black text-[11px] uppercase tracking-widest px-5 py-2 hover:bg-white/90 transition-colors disabled:opacity-50">
                {addSaving ? "A adicionar…" : "Adicionar foto"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="flex gap-2 mb-6 flex-wrap">
        {([["all", "Todas"], ["urbanas", "Urbanas"], ["natureza", "Natureza"], ["retratos", "Retratos"], ["iguarias", "Iguarias"]] as [string, string][]).map(([v, l]) => (
          <button key={v} onClick={() => setFilter(v as CategorySlug | "all")}
            className={`font-mono text-[10px] uppercase tracking-widest border px-4 py-1.5 transition-colors ${filter === v ? "bg-white text-black border-white" : "border-white/20 text-white/50 hover:border-white/40"}`}>
            {l} {v !== "all" ? `(${initial.filter((p) => p.category === v).length})` : `(${initial.length})`}
          </button>
        ))}
      </div>

      <div className="space-y-1">
        {visible.map((photo) => {
          const isOpen = expanded === photo.id;
          const e = edits[photo.id];
          const isSaving = saving === photo.id;
          const isSaved = saved === photo.id;
          const isNew = newPhotoIds.has(photo.id);
          const isDeleting = deleting === photo.id;
          if (!e) return null;
          return (
            <div key={photo.id} className={`bg-white/4 border ${isNew ? "border-white/15" : "border-white/6"}`}>
              <button type="button" onClick={() => setExpanded(isOpen ? null : photo.id)}
                className="w-full flex items-center gap-4 px-4 py-3 text-left hover:bg-white/6 transition-colors">
                <img src={photo.src} alt="" className="w-14 h-10 object-cover shrink-0 grayscale" onError={(ev) => { (ev.target as HTMLImageElement).style.opacity = "0.2"; }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-white text-sm font-light truncate">{e.title}</p>
                    {isNew && <span className="font-mono text-[8px] uppercase tracking-widest border border-white/20 text-white/40 px-1.5 py-0.5 shrink-0">Nova</span>}
                  </div>
                  <p className="font-mono text-[9px] text-white/30 uppercase tracking-widest">{catLabel[photo.category]} · {photo.id}</p>
                </div>
                <span className="text-white/30 text-xs">{isOpen ? "▲" : "▼"}</span>
              </button>
              {isOpen && (
                <div className="px-4 pb-4 space-y-3 border-t border-white/8">
                  <div className="pt-3 space-y-3">
                    <Field label="Título" value={e.title} onChange={(v) => updEdit(photo.id, "title", v)} />
                    <Field label="Descrição (texto revelado no hover)" value={e.description} onChange={(v) => updEdit(photo.id, "description", v)} rows={2} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Field label="Data (ex: Março 2024 · Inverno 2023)" value={e.date} onChange={(v) => updEdit(photo.id, "date", v)} />
                      <Field label="Local (ex: Porto · Serra da Estrela)" value={e.location} onChange={(v) => updEdit(photo.id, "location", v)} />
                    </div>
                    <Field label="Condições (opcional, ex: entardecer · luz rasante)" value={e.conditions} onChange={(v) => updEdit(photo.id, "conditions", v)} />
                  </div>
                  <div className="flex items-center justify-between gap-3 pt-1">
                    <div>
                      {isNew && (
                        <button onClick={() => handleDelete(photo.id)} disabled={isDeleting}
                          className="font-mono text-[10px] text-red-400/60 hover:text-red-400 uppercase tracking-widest transition-colors disabled:opacity-50">
                          {isDeleting ? "A apagar…" : "Apagar foto"}
                        </button>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      {isSaved && <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest">Guardado ✓</span>}
                      <button onClick={() => save(photo.id)} disabled={isSaving}
                        className="bg-white text-black text-[11px] uppercase tracking-widest px-4 py-1.5 hover:bg-white/90 transition-colors disabled:opacity-50">
                        {isSaving ? "A guardar…" : "Guardar foto"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Caderno section ───────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
}

const CAT_OPTIONS = [
  { value: "urbanas", label: "Urbanas" },
  { value: "natureza", label: "Natureza" },
  { value: "retratos", label: "Retratos" },
  { value: "iguarias", label: "Iguarias" },
];

type EntryDraft = {
  date: string; location: string; title: string; excerpt: string;
  body: string; photoSrc: string; photoTitle: string;
  relatedCategory: CategorySlug;
};

const emptyDraft = (): EntryDraft => ({
  date: new Date().toISOString().slice(0, 10),
  location: "", title: "", excerpt: "", body: "",
  photoSrc: "", photoTitle: "",
  relatedCategory: "urbanas",
});

function splitIntoParagraphs(text: string): string[] {
  const byDouble = text.split(/\n{2,}/).map((s) => s.trim()).filter(Boolean);
  if (byDouble.length > 1) return byDouble;
  return text.split(/\n/).map((s) => s.trim()).filter(Boolean);
}

function autoExcerpt(body: string): string {
  const paras = splitIntoParagraphs(body);
  const first = paras[0] ?? "";
  return first.length > 180 ? first.slice(0, 177) + "…" : first;
}

function NewEntryForm({ password, onSaved, onCancel }: {
  password: string; onSaved: () => void; onCancel: () => void;
}) {
  const [d, setD] = useState<EntryDraft>(emptyDraft());
  const [customSlug, setCustomSlug] = useState(false);
  const [customExcerpt, setCustomExcerpt] = useState(false);
  const [slug, setSlug] = useState("");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  function upd(field: keyof EntryDraft, val: string) {
    setD((prev) => {
      const next = { ...prev, [field]: val };
      if (field === "title" && !customSlug) setSlug(slugify(val));
      if (field === "body" && !customExcerpt) next.excerpt = autoExcerpt(val);
      return next;
    });
    setErr("");
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!d.title.trim()) { setErr("O título é obrigatório."); return; }
    if (!d.body.trim()) { setErr("O texto é obrigatório."); return; }
    if (!slug.trim()) { setErr("O slug é obrigatório."); return; }
    if (!d.date.trim()) { setErr("A data é obrigatória."); return; }
    setSaving(true); setErr("");
    try {
      const paragraphs = splitIntoParagraphs(d.body);
      const excerpt = d.excerpt.trim() || autoExcerpt(d.body);
      const entry: JournalEntry = {
        slug: slug.trim(),
        date: d.date,
        ...(d.location.trim() ? { location: d.location.trim() } : {}),
        title: d.title,
        excerpt,
        body: paragraphs,
        photoSrc: d.photoSrc,
        photoTitle: d.photoTitle,
        relatedCategory: d.relatedCategory,
      };
      await addNewJournalEntry({ data: { password, entry } });
      onSaved();
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Erro ao guardar.");
    } finally { setSaving(false); }
  }

  const wordCount = d.body.trim() ? d.body.trim().split(/\s+/).length : 0;

  return (
    <div className="bg-white/4 border border-white/20 mb-4">
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
        <p className="font-mono text-[10px] uppercase tracking-widest text-white/60">Nova entrada do Caderno</p>
        <button onClick={onCancel} className="text-white/30 hover:text-white text-lg leading-none transition-colors">×</button>
      </div>

      <form onSubmit={handleSave}>
        {/* Writing area */}
        <div className="px-6 pt-6 pb-4 space-y-4">
          <textarea
            value={d.title}
            onChange={(e) => upd("title", e.target.value)}
            placeholder="Título da entrada…"
            rows={2}
            className="w-full bg-transparent text-white text-2xl font-light placeholder:text-white/20 outline-none resize-none leading-snug"
          />
          <textarea
            value={d.body}
            onChange={(e) => upd("body", e.target.value)}
            placeholder="Escreve livremente. Não precisas de pensar em parágrafos — escreve como escreverias num diário. Podes separar ideias com uma linha em branco ou simplesmente com Enter."
            rows={18}
            className="w-full bg-transparent text-white/85 text-sm leading-relaxed placeholder:text-white/20 outline-none resize-none font-light"
          />
          <div className="flex items-center justify-between border-t border-white/6 pt-3">
            <p className="font-mono text-[9px] text-white/20 uppercase tracking-widest">
              {wordCount > 0 ? `${wordCount} palavras` : ""}
            </p>
          </div>
        </div>

        {/* Excerpt */}
        <div className="px-6 pb-4 space-y-1">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30">
              Resumo <span className="text-white/15 normal-case tracking-normal">(aparece no índice)</span>
            </p>
            {customExcerpt && (
              <button type="button" onClick={() => { setCustomExcerpt(false); setD((p) => ({ ...p, excerpt: autoExcerpt(p.body) })); }}
                className="font-mono text-[9px] text-white/30 hover:text-white transition-colors">
                ← gerar do texto
              </button>
            )}
          </div>
          <textarea
            value={d.excerpt}
            onChange={(e) => { setCustomExcerpt(true); upd("excerpt", e.target.value); }}
            rows={2}
            placeholder="Gerado automaticamente do primeiro parágrafo…"
            className="w-full bg-white/5 border border-white/10 text-white px-3 py-2 text-sm outline-none focus:border-white/30 transition-colors placeholder:text-white/15 resize-none"
          />
        </div>

        {/* Metadata */}
        <div className="px-6 pb-4 border-t border-white/6 pt-4 space-y-4">
          <p className="font-mono text-[9px] uppercase tracking-widest text-white/20">Detalhes</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="space-y-1">
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30">Data *</p>
              <input
                value={d.date} onChange={(e) => upd("date", e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white px-3 py-2 text-sm font-mono outline-none focus:border-white/30 transition-colors"
              />
            </div>
            <div className="space-y-1">
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30">Local</p>
              <input
                value={d.location} onChange={(e) => upd("location", e.target.value)}
                placeholder="Coimbra · Porto"
                className="w-full bg-white/5 border border-white/10 text-white px-3 py-2 text-sm outline-none focus:border-white/30 transition-colors placeholder:text-white/15"
              />
            </div>
            <div className="space-y-1">
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30">Série</p>
              <select value={d.relatedCategory} onChange={(e) => upd("relatedCategory", e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white px-3 py-2 text-sm outline-none focus:border-white/30 transition-colors">
                {CAT_OPTIONS.map((o) => <option key={o.value} value={o.value} className="bg-[#1a1a18]">{o.label}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30">Legenda da foto</p>
              <input
                value={d.photoTitle} onChange={(e) => upd("photoTitle", e.target.value)}
                placeholder="Opcional"
                className="w-full bg-white/5 border border-white/10 text-white px-3 py-2 text-sm outline-none focus:border-white/30 transition-colors placeholder:text-white/15"
              />
            </div>
          </div>
          <div className="space-y-1">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30">URL da foto</p>
            <input
              value={d.photoSrc} onChange={(e) => upd("photoSrc", e.target.value)}
              placeholder="https://… ou caminho relativo"
              className="w-full bg-white/5 border border-white/10 text-white px-3 py-2 text-sm outline-none focus:border-white/30 transition-colors placeholder:text-white/15"
            />
          </div>
          <div className="space-y-1">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30">
              URL da entrada <span className="text-white/15 normal-case tracking-normal">(gerado do título)</span>
            </p>
            <div className="flex gap-2">
              <input
                value={slug} onChange={(e) => { setSlug(e.target.value); setCustomSlug(true); }}
                className="flex-1 bg-white/5 border border-white/10 text-white px-3 py-2 text-sm font-mono outline-none focus:border-white/30 transition-colors"
                placeholder="gerado-automaticamente"
              />
              {customSlug && (
                <button type="button" onClick={() => { setSlug(slugify(d.title)); setCustomSlug(false); }}
                  className="font-mono text-[10px] text-white/40 hover:text-white px-3 border border-white/10 transition-colors">
                  Reset
                </button>
              )}
            </div>
            <p className="font-mono text-[9px] text-white/15">rosmaninhofotografia.pt/diario/{slug || "…"}</p>
          </div>
        </div>

        {err && <p className="text-red-400 text-xs px-6 pb-3">{err}</p>}

        <div className="flex items-center justify-end gap-4 px-6 py-4 border-t border-white/8">
          <button type="button" onClick={onCancel} className="font-mono text-[10px] text-white/40 hover:text-white uppercase tracking-widest transition-colors">
            Cancelar
          </button>
          <button type="submit" disabled={saving}
            className="bg-white text-black text-[11px] uppercase tracking-widest px-5 py-2 hover:bg-white/90 transition-colors disabled:opacity-50">
            {saving ? "A guardar…" : "Publicar entrada"}
          </button>
        </div>
      </form>
    </div>
  );
}

function CadernoSection({ password, initial, initialNewSlugs }: {
  password: string; initial: JournalEntry[]; initialNewSlugs: Set<string>;
}) {
  const router = useRouter();
  const [newSlugs, setNewSlugs] = useState<Set<string>>(initialNewSlugs);
  const [showNewForm, setShowNewForm] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [edits, setEdits] = useState<Record<string, { date: string; location: string; title: string; excerpt: string; body: string; photoTitle: string; photoSrc: string; relatedCategory: string }>>(() => {
    const d: Record<string, { date: string; location: string; title: string; excerpt: string; body: string; photoTitle: string; photoSrc: string; relatedCategory: string }> = {};
    initial.forEach((e) => {
      d[e.slug] = {
        date: e.date, location: e.location ?? "", title: e.title, excerpt: e.excerpt,
        body: e.body.join("\n\n"), photoTitle: e.photoTitle,
        photoSrc: e.photoSrc ?? "",
        relatedCategory: e.relatedCategory,
      };
    });
    return d;
  });
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const sorted = [...initial].sort((a, b) => b.date.localeCompare(a.date));

  async function save(slug: string) {
    const e = edits[slug];
    setSaving(slug); setSaved(null);
    try {
      await saveJournalEntry({ data: { password, slug, data: { ...e, body: e.body.split("\n\n").map((s) => s.trim()).filter(Boolean) } } });
      setSaved(slug); router.invalidate();
    } catch { alert("Erro ao guardar."); }
    finally { setSaving(null); }
  }

  async function deleteEntry(slug: string) {
    if (!confirm(`Apagar a entrada "${edits[slug]?.title}"? Esta acção é irreversível.`)) return;
    setDeleting(slug);
    try {
      await deleteNewJournalEntry({ data: { password, slug } });
      setNewSlugs((prev) => { const next = new Set(prev); next.delete(slug); return next; });
      router.invalidate();
    } catch { alert("Erro ao apagar."); }
    finally { setDeleting(null); }
  }

  function handleNewSaved() {
    setShowNewForm(false);
    router.invalidate();
  }

  return (
    <div className="max-w-3xl">
      <SectionHeader label="Caderno de Matcha — entradas">
        <div className="flex items-center gap-4">
          <p className="font-mono text-[9px] text-white/25 uppercase tracking-widest">{initial.length} entradas</p>
          <button onClick={() => setShowNewForm(true)}
            className="bg-white text-black text-[11px] uppercase tracking-widest px-5 py-2 hover:bg-white/90 transition-colors">
            + Nova entrada
          </button>
        </div>
      </SectionHeader>

      {showNewForm && (
        <NewEntryForm
          password={password}
          onSaved={handleNewSaved}
          onCancel={() => setShowNewForm(false)}
        />
      )}

      <div className="space-y-1">
        {sorted.map((entry) => {
          const isOpen = expanded === entry.slug;
          const e = edits[entry.slug];
          const isSaving = saving === entry.slug;
          const isSaved = saved === entry.slug;
          const isNew = newSlugs.has(entry.slug);
          const isDeleting = deleting === entry.slug;
          if (!e) return null;
          return (
            <div key={entry.slug} className={`bg-white/4 border ${isNew ? "border-white/15" : "border-white/6"}`}>
              <button type="button" onClick={() => setExpanded(isOpen ? null : entry.slug)}
                className="w-full flex items-center gap-4 px-4 py-4 text-left hover:bg-white/6 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-white text-sm font-light truncate">{e.title}</p>
                    {isNew && (
                      <span className="font-mono text-[8px] uppercase tracking-widest border border-white/20 text-white/40 px-1.5 py-0.5 shrink-0">Nova</span>
                    )}
                  </div>
                  <p className="font-mono text-[9px] text-white/30 uppercase tracking-widest mt-0.5">{e.date} · {entry.slug}</p>
                </div>
                <span className="text-white/30 text-xs">{isOpen ? "▲" : "▼"}</span>
              </button>
              {isOpen && (
                <div className="px-4 pb-5 space-y-3 border-t border-white/8 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Field label="Título" value={e.title} onChange={(v) => setEdits((p) => ({ ...p, [entry.slug]: { ...p[entry.slug], title: v } }))} rows={2} />
                    <Field label="Data (AAAA-MM-DD)" value={e.date} onChange={(v) => setEdits((p) => ({ ...p, [entry.slug]: { ...p[entry.slug], date: v } }))} mono />
                    <Field label="Local (ex: Coimbra · Porto · Serra da Estrela)" value={e.location} onChange={(v) => setEdits((p) => ({ ...p, [entry.slug]: { ...p[entry.slug], location: v } }))} />
                  </div>
                  <Field label="Excerto (resumo)" value={e.excerpt} onChange={(v) => setEdits((p) => ({ ...p, [entry.slug]: { ...p[entry.slug], excerpt: v } }))} rows={3} />
                  <Field label="Corpo (parágrafos separados por linha em branco)" value={e.body} onChange={(v) => setEdits((p) => ({ ...p, [entry.slug]: { ...p[entry.slug], body: v } }))} rows={12} />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <SelectField label="Série relacionada" value={e.relatedCategory} onChange={(v) => setEdits((p) => ({ ...p, [entry.slug]: { ...p[entry.slug], relatedCategory: v } }))} options={CAT_OPTIONS} />
                    {isNew && <Field label="URL da foto" value={e.photoSrc} onChange={(v) => setEdits((p) => ({ ...p, [entry.slug]: { ...p[entry.slug], photoSrc: v } }))} />}
                    <Field label="Legenda da foto" value={e.photoTitle} onChange={(v) => setEdits((p) => ({ ...p, [entry.slug]: { ...p[entry.slug], photoTitle: v } }))} />
                  </div>
                  <div className="flex items-center justify-between gap-3 pt-2 border-t border-white/8 mt-2">
                    <div>
                      {isNew && (
                        <button onClick={() => deleteEntry(entry.slug)} disabled={isDeleting}
                          className="font-mono text-[10px] text-red-400/60 hover:text-red-400 uppercase tracking-widest transition-colors disabled:opacity-50">
                          {isDeleting ? "A apagar…" : "Apagar entrada"}
                        </button>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      {isSaved && <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest">Guardado ✓</span>}
                      <button onClick={() => save(entry.slug)} disabled={isSaving}
                        className="bg-white text-black text-[11px] uppercase tracking-widest px-4 py-1.5 hover:bg-white/90 transition-colors disabled:opacity-50">
                        {isSaving ? "A guardar…" : "Guardar entrada"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Notas & Fragmentos section ────────────────────────────────────────────────

const NOTA_TAGS = ["luz", "cidade", "tempo", "silêncio", "água", "olhar"] as const;
const NOTA_SIZES = ["large", "medium", "small", "fragment"] as const;

const SIZE_LABELS: Record<string, string> = {
  large: "Grande", medium: "Médio", small: "Pequeno", fragment: "Fragmento",
};

function NotasSection({ password, initial }: { password: string; initial: Nota[] }) {
  const router = useRouter();
  const [list, setList] = useState<Nota[]>(initial);
  const [saving, setSaving] = useState(false);
  const [ok, setOk] = useState(false);
  const [filterTag, setFilterTag] = useState<string>("todas");
  const [filterSize, setFilterSize] = useState<string>("todos");

  function update(id: string, field: keyof Nota, value: string) {
    setList((prev) => prev.map((n) => n.id === id ? { ...n, [field]: value } : n));
    setOk(false);
  }

  function moveUp(id: string) {
    const i = list.findIndex((n) => n.id === id);
    if (i <= 0) return;
    const next = [...list]; [next[i - 1], next[i]] = [next[i], next[i - 1]];
    setList(next); setOk(false);
  }

  function moveDown(id: string) {
    const i = list.findIndex((n) => n.id === id);
    if (i < 0 || i >= list.length - 1) return;
    const next = [...list]; [next[i], next[i + 1]] = [next[i + 1], next[i]];
    setList(next); setOk(false);
  }

  function addNota(size: Nota["size"] = "medium") {
    const id = `nota-${Date.now()}`;
    setList((prev) => [{ id, text: "", tag: "luz", size }, ...prev]);
    setOk(false); setFilterTag("todas"); setFilterSize("todos");
  }

  function remove(id: string) {
    if (!confirm("Apagar esta nota?")) return;
    setList((prev) => prev.filter((n) => n.id !== id));
    setOk(false);
  }

  async function handleSave() {
    setSaving(true); setOk(false);
    try {
      await saveNotas({ data: { password, notas: list } });
      setOk(true); router.invalidate();
    } catch { alert("Erro ao guardar."); }
    finally { setSaving(false); }
  }

  const filtered = list.filter((n) => {
    if (filterTag !== "todas" && n.tag !== filterTag) return false;
    if (filterSize !== "todos" && n.size !== filterSize) return false;
    return true;
  });

  const fragments = list.filter((n) => n.size === "fragment");
  const nonFragments = list.filter((n) => n.size !== "fragment");

  return (
    <div className="max-w-4xl">
      <SectionHeader label="Notas de Campo & Fragmentos">
        <div className="flex items-center gap-3">
          {ok && <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest">Guardado ✓</span>}
          <button onClick={handleSave} disabled={saving}
            className="bg-white text-black text-[11px] uppercase tracking-widest px-5 py-2 hover:bg-white/90 transition-colors disabled:opacity-50">
            {saving ? "A guardar…" : "Guardar tudo"}
          </button>
        </div>
      </SectionHeader>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-px bg-white/8 mb-8">
        <div className="bg-[#0e0e0d] px-4 py-3">
          <p className="font-mono text-[9px] uppercase tracking-widest text-white/30">Total</p>
          <p className="text-white text-xl font-light mt-0.5">{list.length}</p>
        </div>
        <div className="bg-[#0e0e0d] px-4 py-3">
          <p className="font-mono text-[9px] uppercase tracking-widest text-white/30">Notas</p>
          <p className="text-white text-xl font-light mt-0.5">{nonFragments.length}</p>
        </div>
        <div className="bg-[#0e0e0d] px-4 py-3">
          <p className="font-mono text-[9px] uppercase tracking-widest text-white/30">Fragmentos</p>
          <p className="text-white text-xl font-light mt-0.5">{fragments.length}</p>
        </div>
        <div className="bg-[#0e0e0d] px-4 py-3">
          <p className="font-mono text-[9px] uppercase tracking-widest text-white/30">A editar</p>
          <p className="text-white text-xl font-light mt-0.5">{filtered.length}</p>
        </div>
      </div>

      {/* Add buttons */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button onClick={() => addNota("medium")}
          className="font-mono text-[10px] uppercase tracking-widest border border-dashed border-white/20 text-white/50 hover:text-white hover:border-white/40 px-4 py-2 transition-colors">
          + Nova nota
        </button>
        <button onClick={() => addNota("fragment")}
          className="font-mono text-[10px] uppercase tracking-widest border border-dashed border-white/20 text-white/50 hover:text-white hover:border-white/40 px-4 py-2 transition-colors">
          + Novo fragmento
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-5 flex-wrap">
        <div className="flex gap-1">
          {(["todas", ...NOTA_TAGS] as string[]).map((t) => (
            <button key={t} onClick={() => setFilterTag(t)}
              className={`font-mono text-[9px] uppercase tracking-widest border px-3 py-1 transition-colors ${filterTag === t ? "bg-white text-black border-white" : "border-white/15 text-white/40 hover:border-white/30"}`}>
              {t}
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          {(["todos", ...NOTA_SIZES] as string[]).map((s) => (
            <button key={s} onClick={() => setFilterSize(s)}
              className={`font-mono text-[9px] uppercase tracking-widest border px-3 py-1 transition-colors ${filterSize === s ? "bg-white text-black border-white" : "border-white/15 text-white/40 hover:border-white/30"}`}>
              {s === "todos" ? "todos" : SIZE_LABELS[s]}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 && (
        <p className="font-mono text-[10px] text-white/25 uppercase tracking-widest py-8 text-center">Nenhuma nota com estes filtros.</p>
      )}

      <div className="space-y-2">
        {filtered.map((nota) => {
          const globalIdx = list.findIndex((n) => n.id === nota.id);
          return (
            <div key={nota.id} className={`bg-white/4 border p-4 space-y-3 ${nota.size === "fragment" ? "border-white/12" : "border-white/6"}`}>
              <div className="flex items-start gap-3">
                <div className="flex flex-col gap-0.5 shrink-0 mt-1">
                  <button onClick={() => moveUp(nota.id)} disabled={globalIdx === 0} className="text-white/30 hover:text-white disabled:opacity-10 text-xs px-1">↑</button>
                  <button onClick={() => moveDown(nota.id)} disabled={globalIdx === list.length - 1} className="text-white/30 hover:text-white disabled:opacity-10 text-xs px-1">↓</button>
                </div>
                <div className="flex-1 space-y-2">
                  <textarea
                    value={nota.text} rows={nota.size === "fragment" ? 2 : 3}
                    onChange={(e) => update(nota.id, "text", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white px-3 py-2 text-sm outline-none focus:border-white/30 resize-none"
                    placeholder={nota.size === "fragment" ? "Fragmento breve…" : "Texto da nota…"}
                  />
                  <div className="flex gap-3 flex-wrap">
                    <div className="space-y-1">
                      <p className="font-mono text-[9px] uppercase tracking-widest text-white/30">Tag</p>
                      <select value={nota.tag} onChange={(e) => update(nota.id, "tag", e.target.value)}
                        className="bg-white/5 border border-white/10 text-white text-xs px-2 py-1.5 outline-none focus:border-white/30">
                        {NOTA_TAGS.map((t) => <option key={t} value={t} className="bg-[#1a1a18]">{t}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <p className="font-mono text-[9px] uppercase tracking-widest text-white/30">Tamanho</p>
                      <select value={nota.size} onChange={(e) => update(nota.id, "size", e.target.value)}
                        className="bg-white/5 border border-white/10 text-white text-xs px-2 py-1.5 outline-none focus:border-white/30">
                        {NOTA_SIZES.map((s) => <option key={s} value={s} className="bg-[#1a1a18]">{SIZE_LABELS[s]}</option>)}
                      </select>
                    </div>
                    <div className="flex items-end">
                      <span className={`font-mono text-[8px] uppercase tracking-widest border px-1.5 py-0.5 ${nota.size === "fragment" ? "border-white/15 text-white/30" : "border-white/10 text-white/20"}`}>
                        #{globalIdx + 1}
                      </span>
                    </div>
                  </div>
                </div>
                <button onClick={() => remove(nota.id)} className="shrink-0 text-white/20 hover:text-red-400 transition-colors text-lg leading-none mt-1">×</button>
              </div>
            </div>
          );
        })}
      </div>

      {list.length > 0 && (
        <div className="mt-6 flex justify-end">
          <button onClick={handleSave} disabled={saving}
            className="bg-white text-black text-[11px] uppercase tracking-widest px-6 py-2.5 hover:bg-white/90 transition-colors disabled:opacity-50">
            {saving ? "A guardar…" : ok ? "Guardado ✓" : "Guardar todas as notas"}
          </button>
        </div>
      )}
    </div>
  );
}

// ── Autora section ────────────────────────────────────────────────────────────

function AutoraSection({ password, initial }: { password: string; initial: SobreConfig }) {
  const router = useRouter();
  const [d, setD] = useState<SobreConfig>(initial);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  function upd(field: keyof SobreConfig, val: unknown) {
    setD((prev) => ({ ...prev, [field]: val }));
    setSaved(null);
  }

  async function save(section: string, payload: Partial<SobreConfig>) {
    setSaving(section); setSaved(null);
    try {
      await saveSobreTexts({ data: { password, ...payload } });
      setSaved(section); router.invalidate();
    } catch { alert("Erro ao guardar."); }
    finally { setSaving(null); }
  }

  function SubSave({ id, payload }: { id: string; payload: Partial<SobreConfig> }) {
    return (
      <div className="flex items-center justify-end gap-3 pt-2 border-t border-white/8 mt-4">
        {saved === id && <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest">Guardado ✓</span>}
        <button onClick={() => save(id, payload)} disabled={saving === id}
          className="bg-white text-black text-[11px] uppercase tracking-widest px-4 py-1.5 hover:bg-white/90 transition-colors disabled:opacity-50">
          {saving === id ? "A guardar…" : "Guardar"}
        </button>
      </div>
    );
  }

  function addPercurso() { upd("percurso", [...d.percurso, { ano: "", titulo: "", texto: "" }]); }
  function removePercurso(i: number) { if (!confirm("Remover esta entrada do percurso?")) return; const arr = [...d.percurso]; arr.splice(i, 1); upd("percurso", arr); }
  function addConstancia() { upd("pequenasConstancias", [...d.pequenasConstancias, { titulo: "", texto: "" }]); }
  function removeConstancia(i: number) { if (!confirm("Remover esta constância?")) return; const arr = [...d.pequenasConstancias]; arr.splice(i, 1); upd("pequenasConstancias", arr); }
  function addRitmo() { upd("ritmos", [...d.ritmos, { quando: "", recurso: "" }]); }
  function removeRitmo(i: number) { const arr = [...d.ritmos]; arr.splice(i, 1); upd("ritmos", arr); }
  function addVisitada() { upd("cartografiaVisitadas", [...d.cartografiaVisitadas, { cidade: "", nota: "" }]); }
  function removeVisitada(i: number) { const arr = [...d.cartografiaVisitadas]; arr.splice(i, 1); upd("cartografiaVisitadas", arr); }
  function addSonhada() { upd("cartografiaSonhadas", [...d.cartografiaSonhadas, { cidade: "", nota: "" }]); }
  function removeSonhada(i: number) { const arr = [...d.cartografiaSonhadas]; arr.splice(i, 1); upd("cartografiaSonhadas", arr); }

  return (
    <div className="max-w-3xl space-y-10">
      <SectionHeader label="Página da Autora" />

      {/* Intro paragraphs */}
      <div className="bg-white/4 border border-white/6 p-6 space-y-3">
        <p className="font-mono text-[10px] uppercase tracking-widest text-white/50">Parágrafos de abertura</p>
        {d.introParagraphs.map((para, i) => (
          <div key={i} className="space-y-1">
            <p className="font-mono text-[9px] text-white/30">§ {i + 1}</p>
            <textarea rows={2} value={para} onChange={(e) => { const arr = [...d.introParagraphs]; arr[i] = e.target.value; upd("introParagraphs", arr); }}
              className="w-full bg-white/5 border border-white/10 text-white px-3 py-2 text-sm outline-none focus:border-white/30 resize-none" />
          </div>
        ))}
        <SubSave id="intro" payload={{ introParagraphs: d.introParagraphs }} />
      </div>

      {/* Quote */}
      <div className="bg-white/4 border border-white/6 p-6 space-y-3">
        <p className="font-mono text-[10px] uppercase tracking-widest text-white/50">Citação de abertura</p>
        <Field label="Texto da citação" value={d.introQuote} onChange={(v) => upd("introQuote", v)} rows={3} />
        <SubSave id="quote" payload={{ introQuote: d.introQuote }} />
      </div>

      {/* §01 Guardar */}
      <div className="bg-white/4 border border-white/6 p-6 space-y-3">
        <p className="font-mono text-[10px] uppercase tracking-widest text-white/50">§ 01 — Guardar</p>
        <Field label="Título da secção" value={d.secaoGuardarTitulo} onChange={(v) => upd("secaoGuardarTitulo", v)} rows={2} />
        <Field label="Texto principal" value={d.secaoGuardarTexto} onChange={(v) => upd("secaoGuardarTexto", v)} rows={5} />
        <Field label="Citação em destaque" value={d.secaoGuardarCitacao} onChange={(v) => upd("secaoGuardarCitacao", v)} rows={3} />
        <SubSave id="guardar" payload={{ secaoGuardarTitulo: d.secaoGuardarTitulo, secaoGuardarTexto: d.secaoGuardarTexto, secaoGuardarCitacao: d.secaoGuardarCitacao }} />
      </div>

      {/* §02 Verdadeiras */}
      <div className="bg-white/4 border border-white/6 p-6 space-y-3">
        <p className="font-mono text-[10px] uppercase tracking-widest text-white/50">§ 02 — Verdadeiras</p>
        <Field label="Parágrafo 1" value={d.secaoVerdadeirasTexto1} onChange={(v) => upd("secaoVerdadeirasTexto1", v)} rows={4} />
        <Field label="Parágrafo 2" value={d.secaoVerdadeirasTexto2} onChange={(v) => upd("secaoVerdadeirasTexto2", v)} rows={4} />
        <SubSave id="verdadeiras" payload={{ secaoVerdadeirasTexto1: d.secaoVerdadeirasTexto1, secaoVerdadeirasTexto2: d.secaoVerdadeirasTexto2 }} />
      </div>

      {/* §03 O detalhe */}
      <div className="bg-white/4 border border-white/6 p-6 space-y-3">
        <p className="font-mono text-[10px] uppercase tracking-widest text-white/50">§ 03 — O detalhe</p>
        <Field label="Parágrafo 1" value={d.secaoDetalheTexto1} onChange={(v) => upd("secaoDetalheTexto1", v)} rows={4} />
        <Field label="Parágrafo 2" value={d.secaoDetalheTexto2} onChange={(v) => upd("secaoDetalheTexto2", v)} rows={3} />
        <SubSave id="detalhe" payload={{ secaoDetalheTexto1: d.secaoDetalheTexto1, secaoDetalheTexto2: d.secaoDetalheTexto2 }} />
      </div>

      {/* §04 Percurso */}
      <div className="bg-white/4 border border-white/6 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/50">§ 04 — Percurso</p>
          <button onClick={addPercurso} className="font-mono text-[9px] uppercase tracking-widest border border-dashed border-white/20 text-white/40 hover:text-white hover:border-white/40 px-3 py-1 transition-colors">+ Adicionar</button>
        </div>
        {d.percurso.map((item, i) => (
          <div key={i} className="border-t border-white/8 pt-4 space-y-2">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[9px] text-white/30">Entrada {i + 1}</p>
              <button onClick={() => removePercurso(i)} className="text-white/20 hover:text-red-400 text-sm transition-colors">×</button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Ano" value={item.ano} onChange={(v) => { const arr = [...d.percurso]; arr[i] = { ...arr[i], ano: v }; upd("percurso", arr); }} />
              <Field label="Título" value={item.titulo} onChange={(v) => { const arr = [...d.percurso]; arr[i] = { ...arr[i], titulo: v }; upd("percurso", arr); }} />
            </div>
            <Field label="Texto" value={item.texto} onChange={(v) => { const arr = [...d.percurso]; arr[i] = { ...arr[i], texto: v }; upd("percurso", arr); }} rows={2} />
          </div>
        ))}
        <SubSave id="percurso" payload={{ percurso: d.percurso }} />
      </div>

      {/* §07 Pequenas constâncias */}
      <div className="bg-white/4 border border-white/6 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/50">§ 07 — Pequenas constâncias</p>
          <button onClick={addConstancia} className="font-mono text-[9px] uppercase tracking-widest border border-dashed border-white/20 text-white/40 hover:text-white hover:border-white/40 px-3 py-1 transition-colors">+ Adicionar</button>
        </div>
        {d.pequenasConstancias.map((item, i) => (
          <div key={i} className="border-t border-white/8 pt-4 space-y-2">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[9px] text-white/30">Constância {i + 1}</p>
              <button onClick={() => removeConstancia(i)} className="text-white/20 hover:text-red-400 text-sm transition-colors">×</button>
            </div>
            <Field label="Título" value={item.titulo} onChange={(v) => { const arr = [...d.pequenasConstancias]; arr[i] = { ...arr[i], titulo: v }; upd("pequenasConstancias", arr); }} />
            <Field label="Texto" value={item.texto} onChange={(v) => { const arr = [...d.pequenasConstancias]; arr[i] = { ...arr[i], texto: v }; upd("pequenasConstancias", arr); }} rows={3} />
          </div>
        ))}
        <SubSave id="constancias" payload={{ pequenasConstancias: d.pequenasConstancias }} />
      </div>

      {/* §08 Ritmos */}
      <div className="bg-white/4 border border-white/6 p-6 space-y-3">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/50">§ 08 — Ritmos</p>
          <button onClick={addRitmo} className="font-mono text-[9px] uppercase tracking-widest border border-dashed border-white/20 text-white/40 hover:text-white hover:border-white/40 px-3 py-1 transition-colors">+ Adicionar</button>
        </div>
        {d.ritmos.map((item, i) => (
          <div key={i} className="border-t border-white/8 pt-3">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[9px] text-white/30">Ritmo {i + 1}</span>
              <button onClick={() => removeRitmo(i)} className="text-white/20 hover:text-red-400 text-sm transition-colors">×</button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Quando" value={item.quando} onChange={(v) => { const arr = [...d.ritmos]; arr[i] = { ...arr[i], quando: v }; upd("ritmos", arr); }} />
              <Field label="Recurso" value={item.recurso} onChange={(v) => { const arr = [...d.ritmos]; arr[i] = { ...arr[i], recurso: v }; upd("ritmos", arr); }} />
            </div>
          </div>
        ))}
        <SubSave id="ritmos" payload={{ ritmos: d.ritmos }} />
      </div>

      {/* §09 Cartografia */}
      <div className="bg-white/4 border border-white/6 p-6 space-y-4">
        <p className="font-mono text-[10px] uppercase tracking-widest text-white/50">§ 09 — Cartografia pessoal</p>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest">Visitadas</p>
            <button onClick={addVisitada} className="font-mono text-[9px] uppercase tracking-widest border border-dashed border-white/20 text-white/40 hover:text-white hover:border-white/40 px-3 py-1 transition-colors">+ Adicionar</button>
          </div>
          {d.cartografiaVisitadas.map((item, i) => (
            <div key={i} className="border-t border-white/8 pt-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] text-white/30">Cidade {i + 1}</span>
                <button onClick={() => removeVisitada(i)} className="text-white/20 hover:text-red-400 text-sm transition-colors">×</button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Field label="Cidade" value={item.cidade} onChange={(v) => { const arr = [...d.cartografiaVisitadas]; arr[i] = { ...arr[i], cidade: v }; upd("cartografiaVisitadas", arr); }} />
                <div className="col-span-2"><Field label="Nota" value={item.nota} onChange={(v) => { const arr = [...d.cartografiaVisitadas]; arr[i] = { ...arr[i], nota: v }; upd("cartografiaVisitadas", arr); }} rows={2} /></div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3 border-t border-white/8 pt-4">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest">Sonhadas</p>
            <button onClick={addSonhada} className="font-mono text-[9px] uppercase tracking-widest border border-dashed border-white/20 text-white/40 hover:text-white hover:border-white/40 px-3 py-1 transition-colors">+ Adicionar</button>
          </div>
          {d.cartografiaSonhadas.map((item, i) => (
            <div key={i} className="border-t border-white/8 pt-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] text-white/30">Cidade {i + 1}</span>
                <button onClick={() => removeSonhada(i)} className="text-white/20 hover:text-red-400 text-sm transition-colors">×</button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Field label="Cidade" value={item.cidade} onChange={(v) => { const arr = [...d.cartografiaSonhadas]; arr[i] = { ...arr[i], cidade: v }; upd("cartografiaSonhadas", arr); }} />
                <div className="col-span-2"><Field label="Nota" value={item.nota} onChange={(v) => { const arr = [...d.cartografiaSonhadas]; arr[i] = { ...arr[i], nota: v }; upd("cartografiaSonhadas", arr); }} rows={2} /></div>
              </div>
            </div>
          ))}
        </div>

        <SubSave id="cartografia" payload={{ cartografiaVisitadas: d.cartografiaVisitadas, cartografiaSonhadas: d.cartografiaSonhadas }} />
      </div>
    </div>
  );
}

// ── Ordem section ─────────────────────────────────────────────────────────────

type AdminPhoto = Photo & { hidden: boolean };

function OrdemSection({ password, initialConfig }: { password: string; initialConfig: { order: string[]; hidden: string[] } }) {
  const router = useRouter();
  const [list, setList] = useState<AdminPhoto[]>(() => {
    const withState: AdminPhoto[] = staticPhotos.map((p) => ({ ...p, hidden: initialConfig.hidden.includes(p.id) }));
    if (initialConfig.order.length === 0) return withState;
    return [...withState].sort((a, b) => {
      const ai = initialConfig.order.indexOf(a.id);
      const bi = initialConfig.order.indexOf(b.id);
      if (ai === -1 && bi === -1) return 0;
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });
  });
  const [filter, setFilter] = useState<CategorySlug | "all">("all");
  const [saving, setSaving] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");

  const visible = useMemo(() => filter === "all" ? list : list.filter((p) => p.category === filter), [list, filter]);
  const catLabel: Record<CategorySlug, string> = { urbanas: "Urbanas", natureza: "Natureza", retratos: "Retratos", iguarias: "Iguarias" };
  const catColour: Record<CategorySlug, string> = { urbanas: "bg-stone-700", natureza: "bg-emerald-800", retratos: "bg-rose-900", iguarias: "bg-amber-800" };

  function toggle(id: string) { setList((prev) => prev.map((p) => p.id === id ? { ...p, hidden: !p.hidden } : p)); setOk(false); }
  function moveUp(id: string) { const i = list.findIndex((p) => p.id === id); if (i <= 0) return; const n = [...list]; [n[i - 1], n[i]] = [n[i], n[i - 1]]; setList(n); setOk(false); }
  function moveDown(id: string) { const i = list.findIndex((p) => p.id === id); if (i < 0 || i >= list.length - 1) return; const n = [...list]; [n[i], n[i + 1]] = [n[i + 1], n[i]]; setList(n); setOk(false); }

  async function handleSave() {
    setSaving(true); setErr(""); setOk(false);
    try {
      await savePhotoConfig({ data: { password, hidden: list.filter((p) => p.hidden).map((p) => p.id), order: list.map((p) => p.id) } });
      setOk(true); router.invalidate();
    } catch (e: unknown) { setErr(e instanceof Error ? e.message : "Erro ao guardar."); }
    finally { setSaving(false); }
  }

  return (
    <div className="max-w-4xl">
      <SectionHeader label="Ordem & Visibilidade">
        <div className="flex items-center gap-4">
          <StatusMsg ok={ok} err={err} />
          <button onClick={handleSave} disabled={saving}
            className="bg-white text-black text-[11px] uppercase tracking-widest px-5 py-2 hover:bg-white/90 transition-colors disabled:opacity-50">
            {saving ? "A guardar…" : "Guardar"}
          </button>
        </div>
      </SectionHeader>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/8 mb-8">
        {staticCategories.map((c) => {
          const total = list.filter((p) => p.category === c.slug).length;
          const hidden = list.filter((p) => p.category === c.slug && p.hidden).length;
          return (
            <div key={c.slug} className="bg-[#0e0e0d] px-5 py-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/30">{c.title}</p>
              <p className="text-white text-2xl font-light mt-1">{total - hidden}</p>
              {hidden > 0 && <p className="font-mono text-[10px] text-white/25 mt-0.5">{hidden} oculta{hidden > 1 ? "s" : ""}</p>}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {([["all", `Todas (${list.length})`], ...staticCategories.map((c) => [c.slug, `${c.title} (${list.filter((p) => p.category === c.slug).length})`])] as [string, string][]).map(([v, l]) => (
          <button key={v} onClick={() => setFilter(v as CategorySlug | "all")}
            className={`font-mono text-[10px] uppercase tracking-widest border px-4 py-1.5 transition-colors ${filter === v ? "bg-white text-black border-white" : "border-white/20 text-white/50 hover:border-white/40"}`}>
            {l}
          </button>
        ))}
      </div>

      <div className="space-y-1">
        {visible.map((photo) => {
          const globalIdx = list.findIndex((p) => p.id === photo.id);
          return (
            <div key={photo.id} className={`flex items-center gap-4 bg-white/4 hover:bg-white/6 transition-colors px-4 py-3 ${photo.hidden ? "opacity-40" : ""}`}>
              <img src={photo.src} alt={photo.title} className="w-16 h-12 object-cover shrink-0 grayscale" />
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-light truncate">{photo.title}</p>
                <span className={`font-mono text-[9px] uppercase tracking-widest px-1.5 py-0.5 ${catColour[photo.category]} text-white/70`}>{catLabel[photo.category]}</span>
              </div>
              <span className="font-mono text-[10px] text-white/20 w-6 text-right shrink-0">{String(globalIdx + 1).padStart(2, "0")}</span>
              <div className="flex flex-col gap-0.5 shrink-0">
                <button onClick={() => moveUp(photo.id)} disabled={globalIdx === 0} className="text-white/30 hover:text-white disabled:opacity-10 text-xs px-1">↑</button>
                <button onClick={() => moveDown(photo.id)} disabled={globalIdx === list.length - 1} className="text-white/30 hover:text-white disabled:opacity-10 text-xs px-1">↓</button>
              </div>
              <button onClick={() => toggle(photo.id)}
                className={`shrink-0 font-mono text-[10px] uppercase tracking-widest border px-3 py-1.5 transition-colors ${photo.hidden ? "border-white/20 text-white/40 hover:border-white/40 hover:text-white/70" : "border-white/40 text-white/70 hover:border-red-400/60 hover:text-red-400"}`}>
                {photo.hidden ? "Mostrar" : "Ocultar"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

function AdminPage() {
  const { config, momento, categories, photosWithMeta, newPhotos, journalEntries, newJournalEntries, notasList, sobreTexts } = Route.useLoaderData();
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<TabId>("momento");

  const newJournalSlugs = useMemo(() => new Set(newJournalEntries.map((e) => e.slug)), [newJournalEntries]);

  if (!authed) {
    return <PasswordGate onAuth={(pw) => { setPassword(pw); setAuthed(true); }} />;
  }

  return (
    <div className="min-h-screen bg-[#0e0e0d] text-white">
      <header className="sticky top-0 z-20 bg-[#0e0e0d]/95 backdrop-blur border-b border-white/8">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/30">Rosmaninho Fotografia — Admin</p>
          <a href="/" target="_blank" rel="noopener noreferrer"
            className="font-mono text-[9px] uppercase tracking-widest text-white/20 hover:text-white/50 transition-colors">
            Ver site →
          </a>
        </div>
        <div className="border-t border-white/8 overflow-x-auto">
          <div className="max-w-6xl mx-auto px-6 flex gap-0">
            {TABS.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`font-mono text-[10px] uppercase tracking-widest px-5 py-3 transition-colors whitespace-nowrap border-b-2 ${tab === t.id ? "text-white border-white" : "text-white/40 border-transparent hover:text-white/70"}`}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {tab === "momento" && <MomentoSection password={password} initial={momento} />}
        {tab === "series" && <SeriesSection password={password} initial={categories} />}
        {tab === "fotos" && <FotosSection password={password} initial={photosWithMeta} initialNewPhotos={newPhotos} />}
        {tab === "caderno" && (
          <CadernoSection
            password={password}
            initial={journalEntries}
            initialNewSlugs={newJournalSlugs}
          />
        )}
        {tab === "notas" && <NotasSection password={password} initial={notasList} />}
        {tab === "autora" && <AutoraSection password={password} initial={sobreTexts} />}
        {tab === "ordem" && <OrdemSection password={password} initialConfig={config} />}
      </div>
    </div>
  );
}
