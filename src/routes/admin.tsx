import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { photos as staticPhotos, categories as staticCategories, type Photo, type CategorySlug } from "@/lib/photos";
import { getPhotoConfig, savePhotoConfig, verifyAdminPassword } from "@/lib/photo-config-fns";
import { getNesteMomento, saveNesteMomento } from "@/lib/momento-fns";
import {
  getCategories, saveCategoryTexts,
  getPhotosWithMeta, savePhotoMeta,
  getJournal, saveJournalEntry,
  getNotas, saveNotas,
  getSobreTexts, saveSobreTexts,
  type SobreConfig,
} from "@/lib/content-fns";
import type { Nota } from "@/lib/notas";
import type { JournalEntry } from "@/lib/journal";
import type { Category } from "@/lib/photos";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Rosmaninho Fotografia" }] }),
  loader: async () => {
    const [config, momento, categories, photosWithMeta, journalEntries, notasList, sobreTexts] = await Promise.all([
      getPhotoConfig(),
      getNesteMomento(),
      getCategories(),
      getPhotosWithMeta(),
      getJournal(),
      getNotas(),
      getSobreTexts(),
    ]);
    return { config, momento, categories, photosWithMeta, journalEntries, notasList, sobreTexts };
  },
  component: AdminPage,
});

type TabId = "momento" | "series" | "fotos" | "caderno" | "notas" | "autora" | "ordem";

const TABS: { id: TabId; label: string }[] = [
  { id: "momento", label: "Neste Momento" },
  { id: "series", label: "Séries" },
  { id: "fotos", label: "Fotos" },
  { id: "caderno", label: "Caderno" },
  { id: "notas", label: "Notas" },
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

function Field({ label, value, onChange, rows = 1, mono = false }: {
  label: string; value: string; onChange: (v: string) => void; rows?: number; mono?: boolean;
}) {
  const cls = `w-full bg-white/5 border border-white/10 text-white px-3 py-2 text-sm outline-none focus:border-white/30 transition-colors placeholder:text-white/20 ${mono ? "font-mono" : ""} resize-none`;
  return (
    <div className="space-y-1">
      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30">{label}</p>
      {rows > 1
        ? <textarea className={cls} rows={rows} value={value} onChange={(e) => onChange(e.target.value)} />
        : <input className={cls} value={value} onChange={(e) => onChange(e.target.value)} />
      }
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

// ── Momento section ──────────────────────────────────────────────────────────

function MomentoSection({ password, initial }: {
  password: string;
  initial: { aLer: string; aEscutar: string; aFotografar: string; aPensarEm: string };
}) {
  const router = useRouter();
  const [aLer, setALer] = useState(initial.aLer);
  const [aEscutar, setAEscutar] = useState(initial.aEscutar);
  const [aFotografar, setAFotografar] = useState(initial.aFotografar);
  const [aPensarEm, setAPensarEm] = useState(initial.aPensarEm);
  const [saving, setSaving] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setErr(""); setOk(false);
    try {
      await saveNesteMomento({ data: { password, aLer, aEscutar, aFotografar, aPensarEm } });
      setOk(true); router.invalidate();
    } catch { setErr("Erro ao guardar."); }
    finally { setSaving(false); }
  }

  return (
    <form onSubmit={handleSave} className="max-w-2xl space-y-6">
      <SectionHeader label="Neste momento">
        <div className="flex items-center gap-4">
          {ok && <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest">Guardado ✓</span>}
          {err && <span className="text-red-400 text-xs">{err}</span>}
          <SaveBtn saving={saving} />
        </div>
      </SectionHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="A ler" value={aLer} onChange={setALer} rows={3} />
        <Field label="À escuta" value={aEscutar} onChange={setAEscutar} rows={3} />
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
          {ok && <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest">Guardado ✓</span>}
          {err && <span className="text-red-400 text-xs">{err}</span>}
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

function FotosSection({ password, initial }: { password: string; initial: Photo[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState<CategorySlug | "all">("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [edits, setEdits] = useState<Record<string, { title: string; description: string; conditions: string }>>(() => {
    const d: Record<string, { title: string; description: string; conditions: string }> = {};
    initial.forEach((p) => { d[p.id] = { title: p.title, description: p.meta.description, conditions: p.meta.conditions ?? "" }; });
    return d;
  });
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  const visible = filter === "all" ? initial : initial.filter((p) => p.category === filter);
  const catLabel: Record<CategorySlug, string> = { urbanas: "Urbanas", natureza: "Natureza", retratos: "Retratos", iguarias: "Iguarias" };

  async function save(photoId: string) {
    const e = edits[photoId];
    setSaving(photoId); setSaved(null);
    try {
      await savePhotoMeta({ data: { password, photoId, ...e } });
      setSaved(photoId); router.invalidate();
    } catch { alert("Erro ao guardar."); }
    finally { setSaving(null); }
  }

  return (
    <div className="max-w-4xl">
      <SectionHeader label="Fotos — títulos e descrições" />
      <div className="flex gap-2 mb-8 flex-wrap">
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
          return (
            <div key={photo.id} className="bg-white/4 border border-white/6">
              <button type="button" onClick={() => setExpanded(isOpen ? null : photo.id)}
                className="w-full flex items-center gap-4 px-4 py-3 text-left hover:bg-white/6 transition-colors">
                <img src={photo.src} alt="" className="w-14 h-10 object-cover shrink-0 grayscale" />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-light truncate">{e.title}</p>
                  <p className="font-mono text-[9px] text-white/30 uppercase tracking-widest">{catLabel[photo.category]} · {photo.id}</p>
                </div>
                <span className="text-white/30 text-xs">{isOpen ? "▲" : "▼"}</span>
              </button>
              {isOpen && (
                <div className="px-4 pb-4 space-y-3 border-t border-white/8">
                  <div className="pt-3 space-y-3">
                    <Field label="Título" value={e.title} onChange={(v) => { setEdits((prev) => ({ ...prev, [photo.id]: { ...prev[photo.id], title: v } })); setSaved(null); }} />
                    <Field label="Descrição (texto revelado no hover)" value={e.description} onChange={(v) => { setEdits((prev) => ({ ...prev, [photo.id]: { ...prev[photo.id], description: v } })); setSaved(null); }} rows={2} />
                    <Field label="Condições (opcional, ex: entardecer · luz rasante · inverno)" value={e.conditions} onChange={(v) => { setEdits((prev) => ({ ...prev, [photo.id]: { ...prev[photo.id], conditions: v } })); setSaved(null); }} />
                  </div>
                  <div className="flex items-center justify-end gap-3 pt-1">
                    {isSaved && <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest">Guardado ✓</span>}
                    <button onClick={() => save(photo.id)} disabled={isSaving}
                      className="bg-white text-black text-[11px] uppercase tracking-widest px-4 py-1.5 hover:bg-white/90 transition-colors disabled:opacity-50">
                      {isSaving ? "A guardar…" : "Guardar foto"}
                    </button>
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

function CadernoSection({ password, initial }: { password: string; initial: JournalEntry[] }) {
  const router = useRouter();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [edits, setEdits] = useState<Record<string, { date: string; title: string; excerpt: string; body: string; photoTitle: string }>>(() => {
    const d: Record<string, { date: string; title: string; excerpt: string; body: string; photoTitle: string }> = {};
    initial.forEach((e) => { d[e.slug] = { date: e.date, title: e.title, excerpt: e.excerpt, body: e.body.join("\n\n"), photoTitle: e.photoTitle }; });
    return d;
  });
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

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

  return (
    <div className="max-w-3xl">
      <SectionHeader label="Caderno de Matcha — entradas">
        <p className="font-mono text-[9px] text-white/25 uppercase tracking-widest">{initial.length} entradas</p>
      </SectionHeader>

      <div className="space-y-1">
        {sorted.map((entry) => {
          const isOpen = expanded === entry.slug;
          const e = edits[entry.slug];
          const isSaving = saving === entry.slug;
          const isSaved = saved === entry.slug;
          return (
            <div key={entry.slug} className="bg-white/4 border border-white/6">
              <button type="button" onClick={() => setExpanded(isOpen ? null : entry.slug)}
                className="w-full flex items-center gap-4 px-4 py-4 text-left hover:bg-white/6 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-light truncate">{e.title}</p>
                  <p className="font-mono text-[9px] text-white/30 uppercase tracking-widest mt-0.5">{e.date} · {entry.slug}</p>
                </div>
                <span className="text-white/30 text-xs">{isOpen ? "▲" : "▼"}</span>
              </button>
              {isOpen && (
                <div className="px-4 pb-5 space-y-3 border-t border-white/8 pt-4">
                  <Field label="Data (AAAA-MM-DD)" value={e.date} onChange={(v) => setEdits((p) => ({ ...p, [entry.slug]: { ...p[entry.slug], date: v } }))} mono />
                  <Field label="Título" value={e.title} onChange={(v) => setEdits((p) => ({ ...p, [entry.slug]: { ...p[entry.slug], title: v } }))} rows={2} />
                  <Field label="Excerto (resumo)" value={e.excerpt} onChange={(v) => setEdits((p) => ({ ...p, [entry.slug]: { ...p[entry.slug], excerpt: v } }))} rows={3} />
                  <Field label="Corpo (parágrafos separados por linha em branco)" value={e.body} onChange={(v) => setEdits((p) => ({ ...p, [entry.slug]: { ...p[entry.slug], body: v } }))} rows={12} />
                  <Field label="Legenda da foto" value={e.photoTitle} onChange={(v) => setEdits((p) => ({ ...p, [entry.slug]: { ...p[entry.slug], photoTitle: v } }))} />
                  <div className="flex items-center justify-end gap-3 pt-1">
                    {isSaved && <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest">Guardado ✓</span>}
                    <button onClick={() => save(entry.slug)} disabled={isSaving}
                      className="bg-white text-black text-[11px] uppercase tracking-widest px-4 py-1.5 hover:bg-white/90 transition-colors disabled:opacity-50">
                      {isSaving ? "A guardar…" : "Guardar entrada"}
                    </button>
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

// ── Notas section ─────────────────────────────────────────────────────────────

const NOTA_TAGS = ["luz", "cidade", "tempo", "silêncio", "água", "olhar"] as const;
const NOTA_SIZES = ["large", "medium", "small", "fragment"] as const;

function NotasSection({ password, initial }: { password: string; initial: Nota[] }) {
  const router = useRouter();
  const [list, setList] = useState<Nota[]>(initial);
  const [saving, setSaving] = useState(false);
  const [ok, setOk] = useState(false);

  function update(id: string, field: keyof Nota, value: string) {
    setList((prev) => prev.map((n) => n.id === id ? { ...n, [field]: value } : n));
    setOk(false);
  }

  function moveUp(id: string) {
    const i = list.findIndex((n) => n.id === id);
    if (i <= 0) return;
    const next = [...list];
    [next[i - 1], next[i]] = [next[i], next[i - 1]];
    setList(next); setOk(false);
  }

  function moveDown(id: string) {
    const i = list.findIndex((n) => n.id === id);
    if (i < 0 || i >= list.length - 1) return;
    const next = [...list];
    [next[i], next[i + 1]] = [next[i + 1], next[i]];
    setList(next); setOk(false);
  }

  function addNota() {
    const id = `nota-${Date.now()}`;
    setList((prev) => [...prev, { id, text: "Nova nota.", tag: "luz", size: "medium" }]);
    setOk(false);
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

  return (
    <div className="max-w-4xl">
      <SectionHeader label="Notas de Campo">
        <div className="flex items-center gap-4">
          {ok && <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest">Guardado ✓</span>}
          <button onClick={handleSave} disabled={saving}
            className="bg-white text-black text-[11px] uppercase tracking-widest px-5 py-2 hover:bg-white/90 transition-colors disabled:opacity-50">
            {saving ? "A guardar…" : "Guardar tudo"}
          </button>
        </div>
      </SectionHeader>

      <div className="space-y-2">
        {list.map((nota, idx) => (
          <div key={nota.id} className="bg-white/4 border border-white/6 p-4 space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex flex-col gap-0.5 shrink-0 mt-1">
                <button onClick={() => moveUp(nota.id)} disabled={idx === 0} className="text-white/30 hover:text-white disabled:opacity-10 text-xs px-1">↑</button>
                <button onClick={() => moveDown(nota.id)} disabled={idx === list.length - 1} className="text-white/30 hover:text-white disabled:opacity-10 text-xs px-1">↓</button>
              </div>
              <div className="flex-1 space-y-2">
                <textarea
                  value={nota.text} rows={3}
                  onChange={(e) => update(nota.id, "text", e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white px-3 py-2 text-sm outline-none focus:border-white/30 resize-none"
                />
                <div className="flex gap-3">
                  <div className="space-y-1">
                    <p className="font-mono text-[9px] uppercase tracking-widest text-white/30">Tag</p>
                    <select value={nota.tag} onChange={(e) => update(nota.id, "tag", e.target.value)}
                      className="bg-white/5 border border-white/10 text-white text-xs px-2 py-1.5 outline-none focus:border-white/30">
                      {NOTA_TAGS.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <p className="font-mono text-[9px] uppercase tracking-widest text-white/30">Tamanho</p>
                    <select value={nota.size} onChange={(e) => update(nota.id, "size", e.target.value)}
                      className="bg-white/5 border border-white/10 text-white text-xs px-2 py-1.5 outline-none focus:border-white/30">
                      {NOTA_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
              </div>
              <button onClick={() => remove(nota.id)} className="shrink-0 text-white/20 hover:text-red-400 transition-colors text-lg leading-none mt-1">×</button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={addNota} className="mt-4 w-full border border-dashed border-white/15 text-white/30 hover:text-white hover:border-white/30 py-3 text-[11px] uppercase tracking-widest transition-colors">
        + Adicionar nota
      </button>
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

  return (
    <div className="max-w-3xl space-y-10">
      <SectionHeader label="Página da Autora" />

      {/* Intro paragraphs */}
      <div className="bg-white/4 border border-white/6 p-6 space-y-3">
        <p className="font-mono text-[10px] uppercase tracking-widest text-copper">Parágrafos de abertura</p>
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
        <p className="font-mono text-[10px] uppercase tracking-widest text-copper">Citação de abertura</p>
        <Field label="Texto da citação" value={d.introQuote} onChange={(v) => upd("introQuote", v)} rows={3} />
        <SubSave id="quote" payload={{ introQuote: d.introQuote }} />
      </div>

      {/* §01 Guardar */}
      <div className="bg-white/4 border border-white/6 p-6 space-y-3">
        <p className="font-mono text-[10px] uppercase tracking-widest text-copper">§ 01 — Guardar</p>
        <Field label="Título da secção" value={d.secaoGuardarTitulo} onChange={(v) => upd("secaoGuardarTitulo", v)} rows={2} />
        <Field label="Texto principal" value={d.secaoGuardarTexto} onChange={(v) => upd("secaoGuardarTexto", v)} rows={5} />
        <Field label="Citação em destaque" value={d.secaoGuardarCitacao} onChange={(v) => upd("secaoGuardarCitacao", v)} rows={3} />
        <SubSave id="guardar" payload={{ secaoGuardarTitulo: d.secaoGuardarTitulo, secaoGuardarTexto: d.secaoGuardarTexto, secaoGuardarCitacao: d.secaoGuardarCitacao }} />
      </div>

      {/* §02 Verdadeiras */}
      <div className="bg-white/4 border border-white/6 p-6 space-y-3">
        <p className="font-mono text-[10px] uppercase tracking-widest text-copper">§ 02 — Verdadeiras</p>
        <Field label="Parágrafo 1" value={d.secaoVerdadeirasTexto1} onChange={(v) => upd("secaoVerdadeirasTexto1", v)} rows={4} />
        <Field label="Parágrafo 2" value={d.secaoVerdadeirasTexto2} onChange={(v) => upd("secaoVerdadeirasTexto2", v)} rows={4} />
        <SubSave id="verdadeiras" payload={{ secaoVerdadeirasTexto1: d.secaoVerdadeirasTexto1, secaoVerdadeirasTexto2: d.secaoVerdadeirasTexto2 }} />
      </div>

      {/* §03 O detalhe */}
      <div className="bg-white/4 border border-white/6 p-6 space-y-3">
        <p className="font-mono text-[10px] uppercase tracking-widest text-copper">§ 03 — O detalhe</p>
        <Field label="Parágrafo 1" value={d.secaoDetalheTexto1} onChange={(v) => upd("secaoDetalheTexto1", v)} rows={4} />
        <Field label="Parágrafo 2" value={d.secaoDetalheTexto2} onChange={(v) => upd("secaoDetalheTexto2", v)} rows={3} />
        <SubSave id="detalhe" payload={{ secaoDetalheTexto1: d.secaoDetalheTexto1, secaoDetalheTexto2: d.secaoDetalheTexto2 }} />
      </div>

      {/* §04 Percurso */}
      <div className="bg-white/4 border border-white/6 p-6 space-y-4">
        <p className="font-mono text-[10px] uppercase tracking-widest text-copper">§ 04 — Percurso</p>
        {d.percurso.map((item, i) => (
          <div key={i} className="border-t border-white/8 pt-4 space-y-2">
            <p className="font-mono text-[9px] text-white/30">Entrada {i + 1}</p>
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
        <p className="font-mono text-[10px] uppercase tracking-widest text-copper">§ 07 — Pequenas constâncias</p>
        {d.pequenasConstancias.map((item, i) => (
          <div key={i} className="border-t border-white/8 pt-4 space-y-2">
            <Field label={`Título ${i + 1}`} value={item.titulo} onChange={(v) => { const arr = [...d.pequenasConstancias]; arr[i] = { ...arr[i], titulo: v }; upd("pequenasConstancias", arr); }} />
            <Field label="Texto" value={item.texto} onChange={(v) => { const arr = [...d.pequenasConstancias]; arr[i] = { ...arr[i], texto: v }; upd("pequenasConstancias", arr); }} rows={3} />
          </div>
        ))}
        <SubSave id="constancias" payload={{ pequenasConstancias: d.pequenasConstancias }} />
      </div>

      {/* §08 Ritmos */}
      <div className="bg-white/4 border border-white/6 p-6 space-y-3">
        <p className="font-mono text-[10px] uppercase tracking-widest text-copper">§ 08 — Ritmos</p>
        {d.ritmos.map((item, i) => (
          <div key={i} className="grid grid-cols-2 gap-2 border-t border-white/8 pt-3">
            <Field label="Quando" value={item.quando} onChange={(v) => { const arr = [...d.ritmos]; arr[i] = { ...arr[i], quando: v }; upd("ritmos", arr); }} />
            <Field label="Recurso" value={item.recurso} onChange={(v) => { const arr = [...d.ritmos]; arr[i] = { ...arr[i], recurso: v }; upd("ritmos", arr); }} />
          </div>
        ))}
        <SubSave id="ritmos" payload={{ ritmos: d.ritmos }} />
      </div>

      {/* §09 Cartografia */}
      <div className="bg-white/4 border border-white/6 p-6 space-y-4">
        <p className="font-mono text-[10px] uppercase tracking-widest text-copper">§ 09 — Cartografia pessoal</p>
        <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest">Visitadas</p>
        {d.cartografiaVisitadas.map((item, i) => (
          <div key={i} className="border-t border-white/8 pt-3 space-y-2">
            <div className="grid grid-cols-3 gap-2">
              <Field label="Cidade" value={item.cidade} onChange={(v) => { const arr = [...d.cartografiaVisitadas]; arr[i] = { ...arr[i], cidade: v }; upd("cartografiaVisitadas", arr); }} />
              <div className="col-span-2"><Field label="Nota" value={item.nota} onChange={(v) => { const arr = [...d.cartografiaVisitadas]; arr[i] = { ...arr[i], nota: v }; upd("cartografiaVisitadas", arr); }} rows={2} /></div>
            </div>
          </div>
        ))}
        <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest pt-2">Sonhadas</p>
        {d.cartografiaSonhadas.map((item, i) => (
          <div key={i} className="border-t border-white/8 pt-3 space-y-2">
            <div className="grid grid-cols-3 gap-2">
              <Field label="Cidade" value={item.cidade} onChange={(v) => { const arr = [...d.cartografiaSonhadas]; arr[i] = { ...arr[i], cidade: v }; upd("cartografiaSonhadas", arr); }} />
              <div className="col-span-2"><Field label="Nota" value={item.nota} onChange={(v) => { const arr = [...d.cartografiaSonhadas]; arr[i] = { ...arr[i], nota: v }; upd("cartografiaSonhadas", arr); }} rows={2} /></div>
            </div>
          </div>
        ))}
        <SubSave id="cartografia" payload={{ cartografiaVisitadas: d.cartografiaVisitadas, cartografiaSonhadas: d.cartografiaSonhadas }} />
      </div>
    </div>
  );
}

// ── Ordem section (existing photo ordering) ──────────────────────────────────

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
          {ok && <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest">Guardado ✓</span>}
          {err && <span className="text-red-400 text-xs">{err}</span>}
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
  const { config, momento, categories, photosWithMeta, journalEntries, notasList, sobreTexts } = Route.useLoaderData();
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<TabId>("momento");

  if (!authed) {
    return <PasswordGate onAuth={(pw) => { setPassword(pw); setAuthed(true); }} />;
  }

  return (
    <div className="min-h-screen bg-[#0e0e0d] text-white">
      <header className="sticky top-0 z-20 bg-[#0e0e0d]/95 backdrop-blur border-b border-white/8">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/30">Rosmaninho Fotografia — Admin</p>
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
        {tab === "fotos" && <FotosSection password={password} initial={photosWithMeta} />}
        {tab === "caderno" && <CadernoSection password={password} initial={journalEntries} />}
        {tab === "notas" && <NotasSection password={password} initial={notasList} />}
        {tab === "autora" && <AutoraSection password={password} initial={sobreTexts} />}
        {tab === "ordem" && <OrdemSection password={password} initialConfig={config} />}
      </div>
    </div>
  );
}
