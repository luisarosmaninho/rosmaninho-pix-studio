import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { getJournalEntry, journal } from "@/lib/journal";
import { photos } from "@/lib/photos";

export const Route = createFileRoute("/diario/$slug")({
  beforeLoad: ({ params }) => {
    if (!getJournalEntry(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const e = getJournalEntry(params.slug);
    return {
      meta: [
        { title: `${e?.title ?? "Journal"} — Rosmaninho` },
        { name: "description", content: e?.excerpt ?? "" },
        { property: "og:image", content: e?.photoSrc ?? "" },
      ],
    };
  },
  component: EntryPage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <p className="font-mono-label">Entrada não encontrada</p>
    </div>
  ),
});

function stamp(date: string) {
  const d = new Date(date);
  return `${d.getFullYear()} / ${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function EntryPage() {
  const { slug } = Route.useParams();
  const entry = getJournalEntry(slug)!;
  // duas imagens secundárias da mesma categoria — sem fallback para outras categorias
  const extras = photos
    .filter((p) => p.src !== entry.photoSrc && p.category === entry.relatedCategory)
    .slice(0, 2);

  return (
    <div className="bg-background text-foreground">
      <SiteNav variant="solid" />

      <article>
        {/* Cabeçalho editorial */}
        <header className="px-6 md:px-12 pt-32 md:pt-40 pb-16">
          <div className="grid grid-cols-12 gap-6 items-baseline max-w-6xl mx-auto">
            <div className="col-span-12 md:col-span-3">
              <Link to="/diario" className="font-mono-label hover:text-accent transition-colors">
                &larr; Journal
              </Link>
              <p className="font-mono-label mt-10">[ {stamp(entry.date)} ]</p>
            </div>
            <div className="col-span-12 md:col-span-9">
              <h1 className="font-display italic text-4xl md:text-7xl leading-[1.05]">
                {entry.title}
              </h1>
            </div>
          </div>
        </header>

        {/* Corpo — coluna central estreita, max 650px */}
        <div className="px-6 md:px-12 pb-20">
          <div className="mx-auto" style={{ maxWidth: "650px" }}>
            <p className="font-display italic text-2xl md:text-3xl leading-[1.5] mb-16">
              “{entry.excerpt}”
            </p>

            {entry.body.slice(0, 1).map((p, i) => (
              <p key={i} className="body-text text-base mb-8" style={{ textAlign: "justify" }}>{p}</p>
            ))}
          </div>

          {/* Sequência assimétrica: 1 grande + 2 verticais lado-a-lado */}
          <div className="my-24 max-w-6xl mx-auto">
            <figure className="w-full aspect-[16/10] overflow-hidden">
              <img src={entry.photoSrc} alt={entry.photoTitle} className="w-full h-full object-cover" />
            </figure>
            <figcaption className="font-mono-label mt-4">
              [ {entry.photoTitle.toUpperCase()} ]
            </figcaption>
          </div>

          {entry.body.slice(1, 2).map((p, i) => (
            <div key={i} className="mx-auto mb-20" style={{ maxWidth: "650px" }}>
              <p className="body-text text-base" style={{ textAlign: "justify" }}>{p}</p>
            </div>
          ))}

          {extras.length === 2 && (
            <div className="grid grid-cols-2 gap-6 my-24 max-w-6xl mx-auto">
              {extras.map((p, i) => (
                <figure key={i} className="aspect-[3/4] overflow-hidden">
                  <img src={p.src} alt={p.title} className="w-full h-full object-cover" />
                </figure>
              ))}
            </div>
          )}

          <div className="mx-auto" style={{ maxWidth: "650px" }}>
            {entry.body.slice(2).map((p, i) => (
              <p key={i} className="body-text text-base mb-8" style={{ textAlign: "justify" }}>{p}</p>
            ))}
            <div className="mt-16 hairline" />
            <p className="font-mono-label mt-6">[ L.R. // FIM ]</p>
          </div>
        </div>

        {/* Continuar */}
        <section className="px-6 md:px-12 py-24 border-t border-border">
          <p className="font-mono-label mb-12">[ CONTINUAR A LER ]</p>
          <div className="grid md:grid-cols-2 gap-12">
            {journal.filter((e) => e.slug !== slug).slice(0, 2).map((e) => (
              <Link key={e.slug} to="/diario/$slug" params={{ slug: e.slug }} className="group block">
                <p className="font-mono-label">[ {stamp(e.date)} ]</p>
                <h3 className="font-display italic text-3xl md:text-4xl mt-3 leading-tight group-hover:text-accent transition-colors">
                  {e.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      </article>

      <SiteFooter />
    </div>
  );
}
