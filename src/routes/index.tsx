import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { photos, categories, photosByCategory } from "@/lib/photos";
import portoStreet from "@/assets/porto-street.jpg";
import sunsetBeach from "@/assets/sunset-beach.jpg";
import river from "@/assets/river.jpg";
import villageAlley from "@/assets/village-alley.jpg";
import coimbraSkyline from "@/assets/coimbra-skyline.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rosmaninho Fotografia — Arquivo lento de imagens" },
      { name: "description", content: "Fotografia de autor: séries urbanas, natureza, retratos e comida. Por Luísa Rosmaninho, Coimbra." },
      { property: "og:title", content: "Rosmaninho Fotografia" },
      { property: "og:description", content: "Arquivo lento de imagens — urbanas, natureza, retratos e comida." },
    ],
  }),
  component: HomePage,
});

import type { Variants } from "framer-motion";
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: "easeOut" } },
};

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function HomePage() {
  const portfolioCover = [
    { src: portoStreet, span: "row-span-2" },
    { src: sunsetBeach, span: "" },
    { src: river, span: "" },
    { src: villageAlley, span: "row-span-2" },
    { src: coimbraSkyline, span: "" },
    { src: photos[2].src, span: "" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <SiteNav variant="overlay" />

      {/* HERO */}
      <section className="relative h-screen w-full overflow-hidden">
        <motion.img
          src={portoStreet}
          alt="Rosmaninho Fotografia"
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="font-script text-3xl md:text-5xl text-gold mb-6"
          >
            Rosmaninho Fotografia
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 1.5, ease: "easeOut" }}
            className="font-display text-cream text-4xl md:text-7xl lg:text-8xl max-w-5xl leading-[1.05]"
          >
            Onde o Tempo Para<br />e a Emoção Fica.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.1 }}
            className="mt-8 max-w-2xl text-cream/80 text-base md:text-lg font-light"
          >
            Um arquivo lento de imagens — ruas, paisagens, rostos e mesas — feito devagar, com câmara e caderno.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.4 }}
            className="mt-12 flex flex-col sm:flex-row gap-4"
          >
            <Link to="/portfolio" className="btn-ghost-light">Ver as séries</Link>
            <Link to="/diario" className="btn-solid-dark bg-cream text-foreground hover:bg-gold hover:text-cream">Ler o diário</Link>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-cream/60 text-[10px] uppercase tracking-[0.4em]"
        >
          ↓ Descer
        </motion.div>
      </section>

      {/* AUTORA */}
      <Section className="px-6 md:px-12 py-32 md:py-44 bg-cream">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 relative">
            <div className="hover-zoom aspect-[3/4] relative">
              <img src={villageAlley} alt="Luísa Rosmaninho" className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <p className="font-script text-3xl text-gold absolute -bottom-6 -right-2 md:right-6 bg-cream px-4 py-2">Luísa</p>
          </div>
          <div className="md:col-span-7 md:pl-8">
            <p className="font-mono-label text-gold mb-4">A autora</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
              Fotografo o que <span className="italic text-gold">me obriga a parar.</span>
            </h2>
            <p className="mt-8 text-foreground/80 leading-relaxed max-w-xl">
              Sou a Luísa Rosmaninho. Vivo em Coimbra, ando muito a pé e tenho sempre uma câmara comigo. Esta página é o meu caderno aberto — uma coleção de imagens que vou fazendo entre cidades, serras, mesas e rostos. Sem clientes, sem pressa, só atenção.
            </p>

            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              {[
                { n: "04", l: "Séries" },
                { n: photos.length.toString().padStart(2, "0"), l: "Imagens" },
                { n: "+5", l: "Anos" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-display text-4xl md:text-5xl text-gold">{s.n}</p>
                  <p className="font-mono-label mt-2">{s.l}</p>
                </div>
              ))}
            </div>

            <Link to="/sobre" className="mt-10 inline-block text-xs uppercase tracking-[0.28em] border-b border-foreground pb-1 hover:text-gold hover:border-gold transition-colors">
              Conhecer a autora →
            </Link>
          </div>
        </div>
      </Section>

      {/* SÉRIES PRÉVIA (grid) */}
      <Section className="px-6 md:px-12 py-32 md:py-44">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <p className="font-mono-label text-gold mb-4">Arquivo</p>
              <h2 className="font-display text-4xl md:text-6xl">As <span className="italic">séries</span>.</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  to="/portfolio/$category"
                  params={{ category: c.slug }}
                  className="text-[11px] uppercase tracking-[0.28em] border border-foreground/20 px-4 py-2 hover:bg-foreground hover:text-background transition-colors"
                >
                  {c.title}
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[240px]">
            {portfolioCover.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                className={`hover-zoom relative ${p.span}`}
              >
                <img src={p.src} alt="" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link to="/portfolio" className="inline-block text-xs uppercase tracking-[0.28em] border-b border-foreground pb-1 hover:text-gold hover:border-gold transition-colors">
              Ver o arquivo completo →
            </Link>
          </div>
        </div>
      </Section>

      {/* SÉRIES VISUAIS — lista editorial em vez de "Serviços" */}
      <Section className="px-6 md:px-12 py-32 md:py-44 bg-foreground text-cream">
        <div className="max-w-6xl mx-auto">
          <div className="md:flex md:items-end md:justify-between gap-12 mb-20">
            <div>
              <p className="font-mono-label text-gold mb-4">Séries visuais</p>
              <h2 className="font-display text-4xl md:text-6xl text-cream">
                Quatro maneiras de <span className="italic text-gold">olhar</span>.
              </h2>
            </div>
            <p className="mt-6 md:mt-0 max-w-sm text-cream/70 text-sm leading-relaxed">
              O arquivo organiza-se em quatro séries abertas. Nenhuma está fechada — vão crescendo à medida que ando, observo e disparo.
            </p>
          </div>

          <ul className="flex flex-col">
            {categories.map((c, i) => {
              const cover = photosByCategory(c.slug)[0];
              const count = photosByCategory(c.slug).length;
              return (
                <li key={c.slug} className={i === 0 ? "border-y border-cream/15" : "border-b border-cream/15"}>
                  <Link
                    to="/portfolio/$category"
                    params={{ category: c.slug }}
                    className="group grid grid-cols-12 gap-6 py-10 md:py-14 items-center"
                  >
                    <div className="col-span-2 md:col-span-1">
                      <p className="font-mono-label text-gold">0{i + 1}</p>
                    </div>
                    <div className="col-span-10 md:col-span-5">
                      <h3 className="font-display text-3xl md:text-5xl text-cream group-hover:text-gold transition-colors">
                        {c.title}
                      </h3>
                    </div>
                    <div className="col-span-12 md:col-span-4 text-cream/70 text-sm leading-relaxed">
                      {c.description}
                    </div>
                    <div className="col-span-12 md:col-span-2 flex items-center justify-between md:justify-end gap-6">
                      <span className="font-mono-label text-cream/50">{count} img</span>
                      {cover && (
                        <div className="hidden md:block w-24 h-16 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <img src={cover.src} alt="" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </Section>

      {/* MARQUEE */}
      <section className="overflow-hidden py-16 border-y border-foreground/10 bg-cream">
        <div className="marquee flex whitespace-nowrap font-display text-6xl md:text-8xl italic text-foreground/30">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="mx-12">Urbanas · Natureza · Retratos · Comida · </span>
          ))}
        </div>
      </section>

      {/* DIÁRIO TEASER */}
      <Section className="px-6 md:px-12 py-32 md:py-44">
        <div className="max-w-5xl mx-auto text-center">
          <p className="font-mono-label text-gold mb-4">Diário</p>
          <h2 className="font-display text-4xl md:text-6xl leading-tight">
            Notas curtas sobre <span className="italic">algumas fotos</span>.
          </h2>
          <p className="mt-8 text-foreground/70 max-w-xl mx-auto">
            Um caderno em aberto. Escrevo devagar, sobre o que estava a acontecer antes, durante e depois de uma imagem.
          </p>
          <Link to="/diario" className="mt-12 inline-block bg-foreground text-cream px-10 py-4 text-xs uppercase tracking-[0.28em] hover:bg-gold transition-colors duration-500">
            Abrir diário
          </Link>
        </div>
      </Section>

      {/* DIÁLOGO */}
      <Section className="px-6 md:px-12 py-32 md:py-44 bg-cream">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-script text-4xl md:text-5xl text-gold mb-6">diálogo</p>
          <h2 className="font-display text-4xl md:text-6xl leading-tight">
            Se quiseres <span className="italic">falar</span>, escreve.
          </h2>
          <p className="mt-8 text-foreground/70 max-w-xl mx-auto">
            Não há sessões nem tabelas. Apenas uma conversa, se quiseres trocar impressões sobre uma imagem, um lugar ou uma ideia.
          </p>
          <Link to="/contacto" className="mt-12 inline-block bg-foreground text-cream px-10 py-4 text-xs uppercase tracking-[0.28em] hover:bg-gold transition-colors duration-500">
            Iniciar diálogo
          </Link>
        </div>
      </Section>

      <SiteFooter />
    </div>
  );
}
