import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { photos, categories, type Photo, type CategorySlug } from "@/lib/photos";
import { getPhotoConfig, savePhotoConfig } from "@/lib/photo-config-fns";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Rosmaninho Fotografia" }] }),
  loader: async () => {
    const config = await getPhotoConfig();
    return { config };
  },
  component: AdminPage,
});

type AdminPhoto = Photo & { hidden: boolean };

function applyInitialOrder(allPhotos: Photo[], config: { order: string[]; hidden: string[] }): AdminPhoto[] {
  const withState: AdminPhoto[] = allPhotos.map((p) => ({
    ...p,
    hidden: config.hidden.includes(p.id),
  }));

  if (config.order.length === 0) return withState;

  return [...withState].sort((a, b) => {
    const ai = config.order.indexOf(a.id);
    const bi = config.order.indexOf(b.id);
    if (ai === -1 && bi === -1) return 0;
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
}

function AdminPage() {
  const { config } = Route.useLoaderData();

  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [list, setList] = useState<AdminPhoto[]>(() => applyInitialOrder(photos, config));
  const [filter, setFilter] = useState<CategorySlug | "all">("all");
  const [saving, setSaving] = useState(false);
  const [savedOk, setSavedOk] = useState(false);
  const [saveError, setSaveError] = useState("");

  const visible = useMemo(
    () => (filter === "all" ? list : list.filter((p) => p.category === filter)),
    [list, filter]
  );

  function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    if (password.length > 0) {
      setAuthed(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  }

  function toggleHidden(id: string) {
    setList((prev) => prev.map((p) => (p.id === id ? { ...p, hidden: !p.hidden } : p)));
    setSavedOk(false);
  }

  function moveUp(id: string) {
    const idx = list.findIndex((p) => p.id === id);
    if (idx <= 0) return;
    const next = [...list];
    [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
    setList(next);
    setSavedOk(false);
  }

  function moveDown(id: string) {
    const idx = list.findIndex((p) => p.id === id);
    if (idx < 0 || idx >= list.length - 1) return;
    const next = [...list];
    [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
    setList(next);
    setSavedOk(false);
  }

  async function handleSave() {
    setSaving(true);
    setSaveError("");
    setSavedOk(false);
    try {
      await savePhotoConfig({
        data: {
          password,
          hidden: list.filter((p) => p.hidden).map((p) => p.id),
          order: list.map((p) => p.id),
        },
      });
      setSavedOk(true);
    } catch (err: unknown) {
      if (err instanceof Error) setSaveError(err.message);
      else setSaveError("Erro ao guardar.");
    } finally {
      setSaving(false);
    }
  }

  const categoryLabel: Record<CategorySlug, string> = {
    urbanas: "Urbanas",
    natureza: "Natureza",
    retratos: "Retratos",
    iguarias: "Iguarias",
  };

  const categoryColour: Record<CategorySlug, string> = {
    urbanas: "bg-stone-700",
    natureza: "bg-emerald-800",
    retratos: "bg-rose-900",
    iguarias: "bg-amber-800",
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0e0e0d] flex items-center justify-center px-6">
        <form onSubmit={handleAuth} className="w-full max-w-sm space-y-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/30 mb-2">
              Rosmaninho Fotografia
            </p>
            <h1 className="text-white text-3xl font-light tracking-tight">Área reservada</h1>
          </div>
          <div className="space-y-3">
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setAuthError(false); }}
              placeholder="Password"
              autoFocus
              className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm outline-none focus:border-white/30 transition-colors placeholder:text-white/20"
            />
            {authError && (
              <p className="text-red-400 text-xs tracking-wide">Preenche a password.</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-white text-black text-[11px] uppercase tracking-[0.28em] py-3 hover:bg-white/90 transition-colors"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0e0e0d] text-white">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-[#0e0e0d]/95 backdrop-blur border-b border-white/8">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/30">
              Rosmaninho Fotografia
            </p>
            <h1 className="text-white text-xl font-light mt-0.5">Gestão de fotos</h1>
          </div>
          <div className="flex items-center gap-4">
            {savedOk && (
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-emerald-400">
                Guardado ✓
              </span>
            )}
            {saveError && (
              <span className="font-mono text-[10px] text-red-400">{saveError}</span>
            )}
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-white text-black text-[11px] uppercase tracking-[0.28em] px-5 py-2 hover:bg-white/90 transition-colors disabled:opacity-50"
            >
              {saving ? "A guardar…" : "Guardar"}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/8 mb-10">
          {categories.map((c) => {
            const total = list.filter((p) => p.category === c.slug).length;
            const hidden = list.filter((p) => p.category === c.slug && p.hidden).length;
            return (
              <div key={c.slug} className="bg-[#0e0e0d] px-5 py-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/30">{c.title}</p>
                <p className="text-white text-2xl font-light mt-1">{total - hidden}</p>
                {hidden > 0 && (
                  <p className="font-mono text-[10px] text-white/25 mt-0.5">{hidden} oculta{hidden > 1 ? "s" : ""}</p>
                )}
              </div>
            );
          })}
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setFilter("all")}
            className={`font-mono text-[10px] uppercase tracking-[0.28em] border px-4 py-1.5 transition-colors ${
              filter === "all" ? "bg-white text-black border-white" : "border-white/20 text-white/50 hover:border-white/40 hover:text-white/80"
            }`}
          >
            Todas ({list.length})
          </button>
          {categories.map((c) => {
            const count = list.filter((p) => p.category === c.slug).length;
            return (
              <button
                key={c.slug}
                onClick={() => setFilter(c.slug)}
                className={`font-mono text-[10px] uppercase tracking-[0.28em] border px-4 py-1.5 transition-colors ${
                  filter === c.slug ? "bg-white text-black border-white" : "border-white/20 text-white/50 hover:border-white/40 hover:text-white/80"
                }`}
              >
                {c.title} ({count})
              </button>
            );
          })}
        </div>

        {/* Hint */}
        <p className="font-mono text-[10px] text-white/25 uppercase tracking-[0.25em] mb-6">
          {filter === "all"
            ? "A ordem aqui é a ordem no portfólio geral. Usa ↑↓ para reordenar."
            : "A ordem e visibilidade aplicam-se ao portfólio geral. Usa ↑↓ para reordenar."}
        </p>

        {/* Photo list */}
        <div className="space-y-1">
          {visible.map((photo) => {
            const globalIdx = list.findIndex((p) => p.id === photo.id);
            const isFirst = globalIdx === 0;
            const isLast = globalIdx === list.length - 1;

            return (
              <div
                key={photo.id}
                className={`flex items-center gap-4 bg-white/4 hover:bg-white/6 transition-colors px-4 py-3 ${
                  photo.hidden ? "opacity-40" : ""
                }`}
              >
                {/* Thumbnail */}
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-16 h-12 object-cover shrink-0 grayscale"
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-light truncate">{photo.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`font-mono text-[9px] uppercase tracking-[0.2em] px-1.5 py-0.5 ${categoryColour[photo.category]} text-white/70`}>
                      {categoryLabel[photo.category]}
                    </span>
                    <span className="font-mono text-[10px] text-white/25">{photo.year}</span>
                  </div>
                </div>

                {/* Order position */}
                <span className="font-mono text-[10px] text-white/20 w-6 text-right shrink-0">
                  {String(globalIdx + 1).padStart(2, "0")}
                </span>

                {/* Reorder buttons */}
                <div className="flex flex-col gap-0.5 shrink-0">
                  <button
                    onClick={() => moveUp(photo.id)}
                    disabled={isFirst}
                    title="Mover para cima"
                    className="text-white/30 hover:text-white disabled:opacity-10 disabled:cursor-not-allowed text-xs leading-none px-1"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveDown(photo.id)}
                    disabled={isLast}
                    title="Mover para baixo"
                    className="text-white/30 hover:text-white disabled:opacity-10 disabled:cursor-not-allowed text-xs leading-none px-1"
                  >
                    ↓
                  </button>
                </div>

                {/* Visibility toggle */}
                <button
                  onClick={() => toggleHidden(photo.id)}
                  title={photo.hidden ? "Mostrar foto" : "Ocultar foto"}
                  className={`shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] border px-3 py-1.5 transition-colors ${
                    photo.hidden
                      ? "border-white/20 text-white/40 hover:border-white/40 hover:text-white/70"
                      : "border-white/40 text-white/70 hover:border-red-400/60 hover:text-red-400"
                  }`}
                >
                  {photo.hidden ? "Mostrar" : "Ocultar"}
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-12 pt-8 border-t border-white/8">
          <p className="font-mono text-[10px] text-white/20 uppercase tracking-[0.3em] text-center">
            As alterações só ficam activas depois de guardar
          </p>
        </div>
      </div>
    </div>
  );
}
