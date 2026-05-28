import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { journal } from "@/lib/journal";

export const Route = createFileRoute("/diario/")({
  head: () => ({
    meta: [
      { title: "Journal — Rosmaninho" },
      { name: "description", content: "Journal editorial: ensaios e notas de Luísa Rosmaninho sobre fotografia, luz e lugar." },
    ],
  }),
  component: JournalIndex,
});

function stamp(date: string) {
  const d = new Date(date);
  return `${d.getFullYear()} / ${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function JournalIndex() {
  const sorted = [...journal].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="bg-background text-foreground">
      <SiteNav variant="solid" />

      {/* Header */}
      <section className="px-6 md:px-12 pt-32 md:pt-40 pb-24 max-w-5xl">
        <p className="font-mono-label">[ JOURNAL EDITORIAL // ED. 2026 ]</p>
        <h1 className="font-display uppercase text-6xl md:text-9xl leading-[0.9] mt-6 tracking-wide">
          Journal
        </h1>
        <p className="mt-10 max-w-xl body-text text-foreground">
          Ensaios curtos sobre fotografias. Caderno em aberto, escrito devagar.
        </p>
      </section>

      <div className="hairline mx-6 md:mx-12" />

      {/* Lista editorial */}
      <section className="px-6 md:px-12 py-20">
        <ul className="flex flex-col">
          {sorted.map((entry, i) => (
            <li key={entry.slug} className={i === 0 ? "" : "border-t border-border"}>
              <Link
                to="/diario/$slug"
                params={{ slug: entry.slug }}
                className="group grid grid-cols-12 gap-6 py-12 md:py-16 items-baseline"
              >
                {/* Data — micro mono à esquerda */}
                <div className="col-span-12 md:col-span-3">
                  <p className="font-mono-label">[ {stamp(entry.date)} ]</p>
                </div>

                {/* Título — serifa itálica à direita */}
                <div className="col-span-12 md:col-span-9">
                  <h2 className="font-display italic text-3xl md:text-5xl leading-[1.1] group-hover:text-accent transition-colors">
                    {entry.title}
                  </h2>
                  <p className="mt-4 body-text max-w-2xl text-foreground/80">
                    {entry.excerpt}
                  </p>
                  <p className="font-mono-label mt-6 group-hover:text-accent transition-colors">
                    Ler ensaio &rarr;
                  </p>
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
