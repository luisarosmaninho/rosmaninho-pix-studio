import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { photos, categories } from "@/lib/photos";
import portoStreet from "@/assets/porto-street.jpg";
import sunsetBeach from "@/assets/sunset-beach.jpg";
import river from "@/assets/river.jpg";
import villageAlley from "@/assets/village-alley.jpg";
import coimbraSkyline from "@/assets/coimbra-skyline.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rosmaninho Fotografia — Onde o tempo para e a emoção fica" },
      { name: "description", content: "Fotografia cinematográfica de casamentos, retratos, lifestyle e branding. Coimbra, Portugal." },
      { property: "og:title", content: "Rosmaninho Fotografia" },
      { property: "og:description", content: "Capto a poesia dos teus dias mais especiais." },
    ],
  }),
  component: HomePage,
});

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const } },
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
          transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] as const }}
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
            transition={{ duration: 1.4, delay: 1.5, ease: [0.22, 1, 0.36, 1] as const }}
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
            Capturo a poesia dos teus dias mais especiais com um olhar cinematográfico e intemporal.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.4 }}
            className="mt-12 flex flex-col sm:flex-row gap-4"
          >
            <Link to="/portfolio" className="btn-ghost-light">Ver o meu olhar</Link>
            <Link to="/contacto" className="btn-solid-dark bg-cream text-foreground hover:bg-gold hover:text-cream">Vamos criar algo juntos</Link>
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

      {/* SOBRE */}
      <Section className="px-6 md:px-12 py-32 md:py-44 bg-cream">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 relative">
            <div className="hover-zoom aspect-[3/4] relative">
              <img src={villageAlley} alt="Luísa Rosmaninho" className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <p className="font-script text-3xl text-gold absolute -bottom-6 -right-2 md:right-6 bg-cream px-4 py-2">Luísa</p>
          </div>
          <div className="md:col-span-7 md:pl-8">
            <p className="font-mono-label text-gold mb-4">Sobre mim</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
              Muito mais do que uma lente,<br />
              <span className="italic text-gold">uma conexão.</span>
            </h2>
            <p className="mt-8 text-foreground/80 leading-relaxed max-w-xl">
              Olá, sou a Luísa. Acredito que cada detalhe — desde o reflexo da luz num olhar até ao movimento mais subtil num abraço — conta uma história. A minha fotografia não é sobre posar; é sobre <em>sentir</em>. O meu objetivo é que, ao veres as minhas fotografias daqui a 20 anos, sintas exatamente a mesma emoção que sentiste no momento.
            </p>

            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              {[
                { n: "+200", l: "Sessões" },
                { n: "+50", l: "Casamentos" },
                { n: "+5", l: "Anos" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-display text-4xl md:text-5xl text-gold">{s.n}</p>
                  <p className="font-mono-label mt-2">{s.l}</p>
                </div>
              ))}
            </div>

            <Link to="/sobre" className="mt-10 inline-block text-xs uppercase tracking-[0.28em] border-b border-foreground pb-1 hover:text-gold hover:border-gold transition-colors">
              Conhecer a história completa →
            </Link>
          </div>
        </div>
      </Section>

      {/* PORTFOLIO */}
      <Section className="px-6 md:px-12 py-32 md:py-44">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <p className="font-mono-label text-gold mb-4">Portfólio</p>
              <h2 className="font-display text-4xl md:text-6xl">O meu <span className="italic">olhar</span>.</h2>
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
                transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const }}
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

      {/* SERVIÇOS */}
      <Section className="px-6 md:px-12 py-32 md:py-44 bg-foreground text-cream">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="font-mono-label text-gold mb-4">Serviços</p>
            <h2 className="font-display text-4xl md:text-6xl text-cream">
              O que <span className="italic text-gold">crio</span> para ti.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-cream/15">
            {[
              {
                title: "Casamentos",
                icon: "♡",
                desc: "Cobertura discreta, cinematográfica e cheia de alma.",
              },
              {
                title: "Retratos & Lifestyle",
                icon: "✦",
                desc: "Celebra quem és com naturalidade e luz.",
              },
              {
                title: "Branding",
                icon: "◈",
                desc: "Eleva a tua marca com impacto visual e autoridade.",
              },
            ].map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.15 }}
                className="bg-foreground p-10 md:p-14 flex flex-col items-start gap-6 hover:bg-foreground/80 transition-colors group"
              >
                <span className="font-display text-5xl text-gold group-hover:scale-110 transition-transform duration-500">{s.icon}</span>
                <h3 className="font-display text-3xl text-cream">{s.title}</h3>
                <p className="text-cream/70 text-sm leading-relaxed">{s.desc}</p>
                <Link to="/contacto" className="mt-4 text-[11px] uppercase tracking-[0.28em] text-gold border-b border-gold/40 pb-0.5 hover:border-gold">
                  Reservar →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* MARQUEE / QUOTE */}
      <section className="overflow-hidden py-16 border-y border-foreground/10 bg-cream">
        <div className="marquee flex whitespace-nowrap font-display text-6xl md:text-8xl italic text-foreground/30">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="mx-12">Rosmaninho · Fotografia · Coimbra · Portugal · </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <Section className="px-6 md:px-12 py-32 md:py-44">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-script text-4xl md:text-5xl text-gold mb-6">vamos começar</p>
          <h2 className="font-display text-4xl md:text-6xl leading-tight">
            Pronta para guardar<br />o <span className="italic">teu momento</span>?
          </h2>
          <p className="mt-8 text-foreground/70 max-w-xl mx-auto">
            Cada projecto começa com uma conversa. Conta-me o que tens em mente — sessão, casamento, marca — e desenhamos juntos a melhor forma de o registar.
          </p>
          <Link to="/contacto" className="mt-12 inline-block bg-foreground text-cream px-10 py-4 text-xs uppercase tracking-[0.28em] hover:bg-gold transition-colors duration-500">
            Reservar sessão
          </Link>
        </div>
      </Section>

      <SiteFooter />
    </div>
  );
}
