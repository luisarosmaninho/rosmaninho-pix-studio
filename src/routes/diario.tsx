import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { journal, formatJournalDate } from "@/lib/journal";

export const Route = createFileRoute("/diario")({
  head: () => ({
    meta: [
      { title: "Diário — Rosmaninho Fotografia" },
      { name: "description", content: "Diário de fotografia: notas de Luísa Rosmaninho sobre imagens, lugares e o gesto de fotografar." },
    ],
  }),
  component: DiarioIndex,
});

function DiarioIndex() {
  const sorted = [...journal].sort((a, b) => b.date.localeCompare(a.date));
  const [latest, ...rest] = sorted;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav variant="solid" />

      <section className="px-6 md:px-12 pt-32 md:pt-40 pb-16 max-w-5xl">
        <p className="font-mono-label text-muted-foreground">Diário</p>
        <h1 className="font-display text-6xl md:text-8xl mt-3 leading-[0.95]">
          Notas <em className="text-accent not-italic">de campo</em>.
        </h1>
        <p className="mt-8 text-lg text-muted-foreground max-w-2xl leading-relaxed">
          O que penso enquanto fotografo, ou pouco depois. Pequenos textos sobre
          uma ou outra imagem — porque às vezes a fotografia precisa de uma
          legenda mais longa do que cabe debaixo dela.
        </p>
      </section>

      {/* Latest entry — featured */}
      {latest && (
        <Link
          to="/diario/$slug"
          params={{ slug: latest.slug }}
          className="group block px-6 md:px-12 pb-16"
        >
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 aspect-[4/3] overflow-hidden">
              <img src={latest.photoSrc} alt={latest.photoTitle} className="w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-105" />
            </div>
            <div className="md:col-span-5">
              <p className="font-mono-label text-accent">Última entrada · {formatJournalDate(latest.date)}</p>
              <h2 className="font-display text-4xl md:text-5xl mt-4 leading-tight group-hover:text-accent transition-colors">
                {latest.title}
              </h2>
              <p className="mt-6 text-muted-foreground leading-relaxed">{latest.excerpt}</p>
              <span className="font-mono-label inline-block mt-8 border-b border-foreground pb-1 group-hover:text-accent group-hover:border-accent transition-colors">
                Ler →
              </span>
            </div>
          </div>
        </Link>
      )}

      {/* Older entries */}
      <section className="px-6 md:px-12 pb-24 border-t border-border pt-16">
        <p className="font-mono-label text-muted-foreground mb-10">Anteriores</p>
        <ul className="divide-y divide-border">
          {rest.map((entry) => (
            <li key={entry.slug}>
              <Link
                to="/diario/$slug"
                params={{ slug: entry.slug }}
                className="group grid md:grid-cols-12 gap-6 py-8 items-center"
              >
                <div className="md:col-span-2 font-mono-label text-muted-foreground">
                  {formatJournalDate(entry.date)}
                </div>
                <div className="md:col-span-7">
                  <h3 className="font-display text-2xl md:text-3xl group-hover:text-accent transition-colors">{entry.title}</h3>
                  <p className="text-muted-foreground mt-2 line-clamp-2">{entry.excerpt}</p>
                </div>
                <div className="md:col-span-3 aspect-[4/3] overflow-hidden">
                  <img src={entry.photoSrc} alt={entry.photoTitle} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <SiteFooter />
    </div>
  );
}
