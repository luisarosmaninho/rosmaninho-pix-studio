import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { getJournalEntry, journal, formatJournalDate } from "@/lib/journal";
import { getCategory } from "@/lib/photos";

export const Route = createFileRoute("/diario/$slug")({
  beforeLoad: ({ params }) => {
    if (!getJournalEntry(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const e = getJournalEntry(params.slug);
    return {
      meta: [
        { title: `${e?.title ?? "Diário"} — Rosmaninho` },
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

function EntryPage() {
  const { slug } = Route.useParams();
  const entry = getJournalEntry(slug)!;
  const cat = getCategory(entry.relatedCategory);
  const others = journal.filter((e) => e.slug !== slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav variant="solid" />

      <article>
        <header className="px-6 md:px-12 pt-32 md:pt-40 pb-12 max-w-3xl">
          <Link to="/diario" className="font-mono-label text-muted-foreground hover:text-accent">
            ← Diário
          </Link>
          <p className="font-mono-label text-accent mt-8">{formatJournalDate(entry.date)}</p>
          <h1 className="font-display text-5xl md:text-7xl mt-4 leading-[1.02]">{entry.title}</h1>
          <p className="mt-6 text-xl text-muted-foreground italic leading-relaxed">{entry.excerpt}</p>
        </header>

        <figure className="px-6 md:px-12 pb-12">
          <img src={entry.photoSrc} alt={entry.photoTitle} className="w-full max-h-[80vh] object-cover" />
          <figcaption className="font-mono-label text-muted-foreground mt-4">
            {entry.photoTitle}
          </figcaption>
        </figure>

        <div className="px-6 md:px-12 pb-24 max-w-2xl mx-auto">
          {entry.body.map((p, i) => (
            <p key={i} className="text-lg leading-[1.8] mb-6">{p}</p>
          ))}

          {cat && (
            <div className="mt-12 pt-8 border-t border-border">
              <p className="font-mono-label text-muted-foreground">Ver mais da colecção</p>
              <Link
                to="/portfolio/$category"
                params={{ category: cat.slug }}
                className="font-display text-3xl mt-2 inline-block hover:text-accent transition-colors"
              >
                {cat.title} →
              </Link>
            </div>
          )}
        </div>
      </article>

      {others.length > 0 && (
        <section className="px-6 md:px-12 pb-24 border-t border-border pt-16">
          <p className="font-mono-label text-muted-foreground mb-8">Continuar a ler</p>
          <div className="grid md:grid-cols-2 gap-8">
            {others.map((e) => (
              <Link key={e.slug} to="/diario/$slug" params={{ slug: e.slug }} className="group block">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={e.photoSrc} alt={e.photoTitle} className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                </div>
                <p className="font-mono-label text-muted-foreground mt-4">{formatJournalDate(e.date)}</p>
                <h3 className="font-display text-2xl mt-2 group-hover:text-accent transition-colors">{e.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      <SiteFooter />
    </div>
  );
}
