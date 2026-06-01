import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { Whisper, WhisperLight } from "@/components/Whisper";
import { photos, categories, photosByCategory } from "@/lib/photos";
import { journal } from "@/lib/journal";
import portoStreet from "@/assets/porto-street.jpg";
import sunsetBeach from "@/assets/sunset-beach.jpg";
import river from "@/assets/river.jpg";
import villageAlley from "@/assets/village-alley.jpg";
import coimbraSkyline from "@/assets/coimbra-skyline.jpg";
import waterSplash from "@/assets/water-splash.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rosmaninho Fotografia — Arquivo lento de imagens" },
      { name: "description", content: "Fotografia de autor: séries urbanas, natureza, retratos e iguarias. Por Luísa Rosmaninho, Coimbra." },
      { property: "og:title", content: "Rosmaninho Fotografia" },
      { property: "og:description", content: "Arquivo lento de imagens — urbanas, natureza, retratos e iguarias." },
    ],
    links: [{ rel: "canonical", href: "https://rosmaninhofotografia.pt/" }],
  }),
  component: HomePage,
});

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: "easeOut" } },
};

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function HomePage() {
  // Selecção masonry — alturas variadas para ritmo
  const masonry = [
    { src: portoStreet, h: "h-[520px]", cat: "Urbanas", title: "Quando ainda havia luz" },
    { src: sunsetBeach, h: "h-[360px]", cat: "Natureza", title: "A solidão que não pesa" },
    { src: villageAlley, h: "h-[440px]", cat: "Retratos", title: "Uma tarde sem sobressaltos" },
    { src: river, h: "h-[380px]", cat: "Natureza", title: "Quando a água ainda é visível" },
    { src: coimbraSkyline, h: "h-[300px]", cat: "Urbanas", title: "O horizonte que não se fecha" },
    { src: waterSplash, h: "h-[420px]", cat: "Natureza", title: "Geometria da queda" },
  ];

  const latestEntry = journal[0];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <SiteNav variant="overlay" />

      {/* ============ HERO — editorial, oversized ============ */}
      <section className="relative min-h-screen w-full overflow-hidden bg-foreground">
        <motion.img
          src={portoStreet}
          alt="Rosmaninho Fotografia"
          className="absolute inset-0 h-full w-full object-cover opacity-80"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3.4, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/40 to-foreground/85" />

        {/* Metadata superior */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute top-24 inset-x-0 px-6 md:px-12 flex justify-between text-cream/70 text-[10px] tracking-[0.4em] uppercase"
        >
          <span>N.º 001 · Vol. I</span>
          <span className="hidden md:inline">40°12'N · 8°25'W</span>
          <span>MMXXVI</span>
        </motion.div>

        {/* Headline */}
        <div className="relative min-h-screen flex flex-col justify-end pb-24 md:pb-28 px-6 md:px-12">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="font-mono-label text-copper mb-6"
          >
            Arquivo lento · Coimbra
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 1.6, ease: "easeOut" }}
            className="font-display text-cream text-[64px] leading-[0.95] md:text-[140px] lg:text-[180px] max-w-6xl tracking-tight"
          >
            Onde o tempo<br />
            <span className="font-italic-serif text-copper">para</span>, e a emoção fica.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.1 }}
            className="mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
          >
            <p className="max-w-md text-cream/75 text-base leading-relaxed">
              Um caderno aberto de imagens — ruas, paisagens, rostos e mesas — feito devagar, com câmara e palavra. Por Luísa Rosmaninho.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/portfolio" className="btn-ghost-light">Ver séries</Link>
              <Link to="/diario" className="btn-copper">Ler diário</Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cream/50 text-[10px] uppercase tracking-[0.5em]"
        >
          desce devagar ↓
        </motion.div>
      </section>

      {/* ============ MANIFESTO breve ============ */}
      <Section className="px-6 md:px-12 py-28 md:py-40 bg-background">
        <div className="max-w-5xl mx-auto relative">
          <p className="font-mono-label text-copper mb-8">§ 01 — Manifesto</p>
          <p className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.08] tracking-tight">
            Não fotografo para mostrar — fotografo para <span className="font-italic-serif text-copper">demorar</span>. Cada imagem é uma forma educada de pedir ao mundo que <span className="font-italic-serif">fique</span> mais um momento.
          </p>
          <div className="mt-12 flex justify-between items-end">
            <Whisper text="arquivo lento · Coimbra · MMXX —" delay={1.4} />
            <Whisper text="40°12′N · 8°25′O" delay={2} />
          </div>
        </div>
      </Section>

      {/* ============ AUTORA — 7/5 asymmetric ============ */}
      <Section className="px-6 md:px-12 py-28 md:py-40 bg-cream">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-end">
          <div className="md:col-span-5 order-2 md:order-1">
            <p className="font-mono-label text-copper mb-6">§ 02 — Autora</p>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.98]">
              Nunca apenas<br />
              <span className="font-italic-serif text-copper">tirar</span><br />
              fotografias.
            </h2>
            <div className="mt-10 space-y-5 text-foreground/75 max-w-md leading-relaxed">
              <p>
                A fotografia tornou-se a minha forma de guardar emoções, ambientes e pequenos momentos que normalmente passam demasiado depressa.
              </p>
              <p>
                Procuro criar fotografias que pareçam verdadeiras. Naturais. Honestamente reais.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6 border-t border-foreground/15 pt-8 max-w-md">
              {[
                { n: "04", l: "Séries" },
                { n: photos.length.toString().padStart(2, "0"), l: "Imagens" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-display text-5xl md:text-6xl text-copper">{s.n}</p>
                  <p className="font-mono-label mt-2">{s.l}</p>
                </div>
              ))}
            </div>

            <Link to="/sobre" className="mt-12 inline-block text-[11px] uppercase tracking-[0.32em] border-b border-foreground pb-1 hover:text-copper hover:border-copper transition-colors">
              Conhecer a autora →
            </Link>
            <Whisper text="observação contínua · quatro séries abertas" delay={1.8} className="mt-8" />
          </div>

          <div className="md:col-span-7 order-1 md:order-2 relative">
            <div className="hover-zoom warm-tone aspect-[4/5] relative">
              <img src={villageAlley} alt="Luísa Rosmaninho" className="absolute inset-0 h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </Section>

      {/* ============ SÉRIES — masonry editorial ============ */}
      <Section className="px-6 md:px-12 py-28 md:py-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
            <div>
              <p className="font-mono-label text-copper mb-6">§ 03 — Séries</p>
              <h2 className="font-display text-5xl md:text-7xl leading-[0.98]">
                Quatro maneiras<br /><span className="font-italic-serif text-copper">de olhar</span>.
              </h2>
            </div>
            <p className="max-w-sm text-foreground/70 text-sm leading-relaxed">
              Urbanas, Natureza, Retratos, Iguarias. Quatro pastas abertas — nenhuma fechada — que se vão tocando ao longo dos anos.
            </p>
          </div>

          {/* Categories list */}
          <ul className="border-t border-foreground/15 mb-20">
            {categories.map((c, i) => {
              const cover = photosByCategory(c.slug)[0];
              const count = photosByCategory(c.slug).length;
              return (
                <li key={c.slug} className="border-b border-foreground/15">
                  <Link
                    to="/portfolio/$category"
                    params={{ category: c.slug }}
                    className="group grid grid-cols-12 gap-6 py-8 md:py-10 items-center"
                  >
                    <div className="col-span-2 md:col-span-1">
                      <p className="font-mono-label text-copper">0{i + 1}</p>
                    </div>
                    <div className="col-span-10 md:col-span-5">
                      <h3 className="font-display text-4xl md:text-6xl group-hover:text-copper transition-colors duration-500 leading-none">
                        {c.title}
                      </h3>
                    </div>
                    <div className="col-span-12 md:col-span-4 text-foreground/65 text-sm leading-relaxed">
                      {c.description}
                    </div>
                    <div className="col-span-12 md:col-span-2 flex items-center justify-between md:justify-end gap-6">
                      <span className="font-mono-label">{count} img</span>
                      {cover && (
                        <div className="hidden md:block w-24 h-16 overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 group-hover:translate-x-0">
                          <img src={cover.src} alt="" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Masonry preview */}
          <div className="masonry">
            {masonry.map((p, i) => (
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 1, delay: (i % 3) * 0.12, ease: "easeOut" }}
                className="hover-zoom warm-tone relative group"
              >
                <div className={`${p.h} w-full relative overflow-hidden`}>
                  <img src={p.src} alt={p.title} className="absolute inset-0 h-full w-full object-cover" />
                </div>
                <figcaption className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <p className="font-mono-label text-copper">[ {p.cat} ]</p>
                  <p className="font-display text-2xl text-cream mt-1">{p.title}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>

          <div className="mt-16 flex items-center justify-between">
            <Whisper text="vão crescendo à medida que ando" delay={1.2} style="italic" />
            <Link to="/portfolio" className="inline-block text-[11px] uppercase tracking-[0.32em] border-b border-foreground pb-1 hover:text-copper hover:border-copper transition-colors">
              Ver o arquivo completo →
            </Link>
          </div>
        </div>
      </Section>

      {/* ============ MARQUEE ============ */}
      <section className="overflow-hidden py-14 border-y border-foreground/10 bg-cream">
        <div className="marquee flex whitespace-nowrap font-display text-[80px] md:text-[140px] text-copper/60 leading-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="mx-10">
              Urbanas <span className="font-italic-serif text-foreground/40">·</span> Natureza <span className="font-italic-serif text-foreground/40">·</span> Retratos <span className="font-italic-serif text-foreground/40">·</span> Iguarias <span className="font-italic-serif text-foreground/40">·</span>
            </span>
          ))}
        </div>
      </section>

      {/* ============ CONTACTOS — film strip ============ */}
      <section className="py-20 md:py-28 bg-[#0e0e0d] overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="px-6 md:px-12 mb-10 flex items-end justify-between max-w-7xl mx-auto"
        >
          <div>
            <p className="font-mono-label text-copper/70 mb-3 uppercase tracking-[0.38em]">§ — Contactos</p>
            <h2 className="font-display text-3xl md:text-5xl text-cream leading-[0.98]">
              O arquivo em<br />
              <span className="font-italic-serif text-copper">tira de filme</span>.
            </h2>
          </div>
          <p className="hidden md:block font-mono-label text-cream/25 text-[10px] uppercase tracking-[0.3em] max-w-[180px] text-right leading-relaxed">
            cada frame,<br />uma decisão
          </p>
        </motion.div>

        {/* Sprocket rail top */}
        <div className="relative w-full">
          <div className="absolute top-0 left-0 right-0 h-8 bg-[#0e0e0d] flex items-center z-10">
            <div className="flex gap-[18px] px-3 w-full">
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className="shrink-0 w-5 h-4 rounded-[3px] border border-white/10 bg-[#1a1a18]" />
              ))}
            </div>
          </div>

          {/* Strip */}
          <motion.div
            initial={{ x: 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="flex gap-2 px-3 overflow-x-auto scrollbar-none pt-9 pb-9"
            style={{ scrollbarWidth: "none" }}
          >
            {[
              { src: portoStreet,    n: "01A", title: "Quando ainda havia luz" },
              { src: sunsetBeach,    n: "02A", title: "A solidão que não pesa" },
              { src: villageAlley,   n: "03A", title: "Uma tarde sem sobressaltos" },
              { src: river,          n: "04A", title: "Quando a água ainda é visível" },
              { src: coimbraSkyline, n: "05A", title: "O horizonte que não se fecha" },
              { src: waterSplash,    n: "06A", title: "Geometria da queda" },
              { src: portoStreet,    n: "07A", title: "Quando ainda havia luz" },
              { src: sunsetBeach,    n: "08A", title: "A solidão que não pesa" },
            ].map((frame, i) => (
              <div key={i} className="shrink-0 group relative" style={{ width: 220 }}>
                <div className="relative overflow-hidden" style={{ height: 300 }}>
                  <img
                    src={frame.src}
                    alt={frame.title}
                    className="w-full h-full object-cover grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <p className="absolute bottom-3 inset-x-3 font-display text-cream text-sm leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {frame.title}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-2 px-1">
                  <span className="font-mono-label text-white/20 text-[9px] tracking-[0.3em]">{frame.n}</span>
                  <span className="font-mono-label text-copper/40 text-[9px]">▲</span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Sprocket rail bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#0e0e0d] flex items-center z-10">
            <div className="flex gap-[18px] px-3 w-full">
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className="shrink-0 w-5 h-4 rounded-[3px] border border-white/10 bg-[#1a1a18]" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ DIÁRIO — última entrada em destaque ============ */}
      <Section className="px-6 md:px-12 py-28 md:py-40 bg-foreground text-cream">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 hover-zoom warm-tone aspect-[4/3] relative">
            <img src={latestEntry.photoSrc} alt={latestEntry.photoTitle} className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="md:col-span-5">
            <p className="font-mono-label text-copper mb-6">§ 04 — Diário · última entrada</p>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-cream leading-[0.98]">
              {latestEntry.title}
            </h2>
            <p className="mt-8 text-cream/70 leading-relaxed">
              {latestEntry.excerpt}
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <Link to="/diario/$slug" params={{ slug: latestEntry.slug }} className="btn-copper">
                Ler entrada
              </Link>
              <Link to="/diario" className="inline-flex items-center gap-3 border border-cream/40 px-7 py-3.5 text-[11px] uppercase tracking-[0.32em] text-cream hover:bg-cream hover:text-foreground transition-all duration-500">
                Todas as entradas
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* ============ DIÁLOGO ============ */}
      <Section className="px-6 md:px-12 py-32 md:py-44 bg-background">
        <div className="max-w-4xl mx-auto text-center relative">
          <Whisper text="escreve devagar · há uma conversa possível" delay={1.6} className="mb-12" />
          <p className="font-mono-label text-copper mb-6">§ 05 — Diálogo</p>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.98]">
            Se quiseres <span className="font-italic-serif text-copper">falar</span>,<br />escreve devagar.
          </h2>
          <p className="mt-10 text-foreground/70 max-w-xl mx-auto leading-relaxed">
            Não há tabelas nem pacotes. Apenas uma conversa, sobre uma imagem, um lugar, uma ideia — ou uma cópia em papel que queiras ter à parede.
          </p>
          <Link to="/contacto" className="mt-12 inline-block btn-copper">
            Iniciar diálogo
          </Link>
        </div>
      </Section>

      {/* ============ NOTA PESSOAL — sem número, sem botão ============ */}
      <Section className="px-6 md:px-12 py-36 md:py-48 bg-cream">
        <div className="max-w-3xl mx-auto text-center relative">
          <p className="font-italic-serif text-5xl md:text-6xl text-foreground/75 leading-[1.2]">
            "Este sítio é o meu<br />caderno aberto —
          </p>
          <p className="font-display text-2xl md:text-3xl text-foreground/50 mt-6 leading-relaxed">
            sem clientes, sem pressa,<br />
            só atenção ao que insiste em ficar."
          </p>
          <p className="font-mono-label text-foreground/30 mt-12 uppercase tracking-[0.4em]">L.R. · Coimbra</p>
        </div>
      </Section>

      <SiteFooter />
    </div>
  );
}
