import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { photosByCategory } from "@/lib/photos";
import type { Category } from "@/lib/photos";
import { getCategories } from "@/lib/content-fns";
import { getVisitCounts } from "@/lib/visits-fns";
import portoStreet from "@/assets/porto-street.jpg";
import sunsetBeach from "@/assets/sunset-beach.jpg";
import retratoSol from "@/assets/retrato-sol.jpg";
import cafeMatcha from "@/assets/cafe-matcha.jpg";

export const Route = createFileRoute("/portfolio/")({
  head: () => ({
    meta: [
      { title: "Fragmentos — Rosmaninho Fotografia" },
      { name: "description", content: "Algumas imagens ficaram por causa da luz. Outras por causa das pessoas. Outras simplesmente recusaram desaparecer." },
      { property: "og:title", content: "Fragmentos — Rosmaninho Fotografia" },
      { property: "og:description", content: "Quatro séries paralelas. Quatro formas de ver o mundo. Urbanas, natureza, retratos e iguarias." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://rosmaninhofotografia.pt/portfolio" },
      { property: "og:image", content: "https://rosmaninhofotografia.pt/og/portfolio.jpg" },
      { property: "og:image:alt", content: "Fragmentos — arquivo fotográfico de Luísa Rosmaninho" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://rosmaninhofotografia.pt/og/portfolio.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://rosmaninhofotografia.pt/portfolio" }],
  }),
  loader: async () => {
    const [categories, visitCounts] = await Promise.all([
      getCategories(),
      getVisitCounts(),
    ]);
    return { categories, visitCounts };
  },
  component: FragmentosPage,
});

const coverPhotos: Record<string, string> = {
  urbanas: portoStreet,
  natureza: sunsetBeach,
  retratos: retratoSol,
  iguarias: cafeMatcha,
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" as const } },
};

function SeriesBlock({ cat, index, count, visits }: { cat: Category; index: number; count: number; visits: number }) {
  const isEven = index % 2 === 0;
  const cover = coverPhotos[cat.slug];
  const romanIdx = ["I", "II", "III", "IV"][index] ?? String(index + 1);

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      className="border-t border-foreground/12"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <Link
          to="/portfolio/$category"
          params={{ category: cat.slug }}
          className={`block relative overflow-hidden group ${isEven ? "lg:order-1" : "lg:order-2"}`}
        >
          <div className="aspect-[4/3] lg:aspect-auto lg:h-full relative min-h-[400px]">
            <img
              src={cover} alt={cat.title} loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/12 transition-colors duration-700" />
            <div className="absolute top-6 left-6">
              <span className="font-mono-label text-cream/50 text-[9px] uppercase tracking-[0.45em]">
                série {romanIdx} · {count} {count === 1 ? "fotografia" : "fotografias"}
              </span>
            </div>
            {visits > 1 && (
              <div className="absolute bottom-6 right-6">
                <span className="font-mono-label text-cream/35 text-[8px] uppercase tracking-[0.4em]">
                  {visits.toLocaleString("pt-PT")} visitas
                </span>
              </div>
            )}
          </div>
        </Link>

        <div className={`flex flex-col justify-center px-8 md:px-14 lg:px-16 py-16 lg:py-20 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
          <h2 className="font-display text-[clamp(3.5rem,7vw,6rem)] leading-[0.9] tracking-tight">
            {cat.title}<span className="font-italic-serif text-copper">.</span>
          </h2>
          <p className="mt-8 text-foreground/60 leading-relaxed text-lg max-w-md font-italic-serif italic">{cat.excerpt}</p>
          <p className="mt-5 text-foreground/40 leading-relaxed text-sm max-w-md">{cat.introBody[0]}</p>
          {cat.quote && (
            <p className="mt-8 font-italic-serif text-foreground/25 text-sm italic border-l border-copper/20 pl-5 max-w-xs leading-relaxed">
              "{cat.quote}"
            </p>
          )}
          <Link
            to="/portfolio/$category"
            params={{ category: cat.slug }}
            className="mt-12 self-start inline-flex items-center gap-4 group"
          >
            <span className="font-mono-label text-[10px] uppercase tracking-[0.38em] text-foreground group-hover:text-copper transition-colors duration-300">
              Abrir colecção
            </span>
            <span className="block w-8 h-px bg-foreground/40 group-hover:bg-copper group-hover:w-14 transition-all duration-500" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

function FragmentosPage() {
  const { categories, visitCounts } = Route.useLoaderData();
  const seriesData = categories.map((cat) => ({
    cat,
    count: photosByCategory(cat.slug).length,
    visits: visitCounts[cat.slug] ?? 0,
  }));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav variant="solid" />

      <header className="px-6 md:px-16 pt-36 pb-20 md:pt-48 md:pb-28">
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="max-w-5xl">
          <p className="font-mono-label text-copper/70 mb-6 text-[10px] uppercase tracking-[0.48em]">arquivo · quatro séries abertas</p>
          <h1 className="font-display text-[clamp(4.5rem,14vw,10rem)] leading-[0.88] tracking-tight">
            Fragmentos<span className="font-italic-serif text-copper">.</span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.35 }}
            className="mt-10 max-w-xl text-foreground/55 text-xl leading-relaxed font-italic-serif italic"
          >
            "Algumas imagens ficaram por causa da luz. Outras por causa das pessoas. Outras simplesmente recusaram desaparecer."
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.65 }}
            className="mt-8 flex items-center gap-3"
          >
            <span className="block w-10 h-px bg-foreground/20" />
            <span className="font-mono-label text-foreground/25 text-[9px] uppercase tracking-[0.4em]">
              {seriesData.reduce((a, s) => a + s.count, 0)} imagens · Coimbra · Portugal
            </span>
          </motion.div>
        </motion.div>
      </header>

      <main>
        {seriesData.map(({ cat, count, visits }, i) => (
          <SeriesBlock key={cat.slug} cat={cat} index={i} count={count} visits={visits} />
        ))}
      </main>

      <motion.div
        variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
        className="px-6 md:px-16 py-32 md:py-44 text-center max-w-xl mx-auto"
      >
        <p className="font-italic-serif text-foreground/20 text-3xl mb-10">—</p>
        <p className="font-mono-label text-foreground/18 text-[9px] uppercase tracking-[0.48em]">
          fim dos fragmentos · {seriesData.reduce((a, s) => a + s.count, 0)} imagens · {seriesData.length} séries
        </p>
        <p className="font-italic-serif text-[10px] text-foreground/10 mt-8 italic">
          este arquivo tem mais uma camada — chega-se com palavras, não com cliques.
        </p>
      </motion.div>

      <SiteFooter />
    </div>
  );
}
