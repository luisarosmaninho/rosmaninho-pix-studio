import { createFileRoute, useRouter } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BotanicalMark } from "@/components/BotanicalMark";

export const Route = createFileRoute("/rosemary")({
  head: () => ({
    meta: [
      { title: "Rosmaninho Fotografia" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: RosemaryPage,
});

const SECTIONS = [
  {
    heading: "I — O QUE FICOU POR DIZER",
    body: [
      "Encontraste isto. Isso já diz algo de ti.",
      "Há pessoas que passam pelo arquivo inteiro e não param para escutar o silêncio entre as imagens. Tu ficaste. Procuraste. Escreveste.",
      "Por isso mereces o que está aqui dentro.",
    ],
  },
  {
    heading: "II — SOBRE O RITMO",
    body: [
      "Não sou rápida. Nunca fui.",
      "Sinto devagar, como quem deixa a fotografia revelar em câmara escura — sem pressa, sem certezas, esperando que a imagem apareça quando estiver pronta.",
      "Durante muito tempo achei que isso era uma falha. Agora sei que é a única forma que conheço de fazer as coisas com verdade.",
      "O mundo apressado não sabe o que perde por não esperar.",
    ],
  },
  {
    heading: "III — SOBRE OS LUGARES QUE AINDA NÃO VI",
    body: [
      "A Irlanda existe dentro de mim em verde e chuva fina.\nA Escócia em pedra e nevoeiro que não se dissipa.\nVerona em varandas e cartas não enviadas.\nBruges em canais que reflectem uma luz que imagino dourada.",
      "Já percorri estas cidades nas fotografias de outras pessoas, nas páginas de livros que ficaram dobrados em lugares errados, nas músicas que soam a chegada.",
      "Quando for — e vou — vai parecer um regresso.",
      "Guardar um lugar dentro de mim antes de o visitar é a coisa mais estranha e mais minha que faço.",
    ],
  },
  {
    heading: "IV — SOBRE O QUE A LENTE NÃO ALCANÇA",
    body: [
      "Há uma tensão antes do clique que não cabe em nenhuma imagem.",
      "É a respiração suspensa. A decisão de ficar quieta mais um segundo. A consciência de que este momento específico — esta luz, esta sombra, este ar — nunca vai voltar exactamente assim.",
      "Fotografo porque não confio na memória. Ela romanticiza, apaga, reescreve sem avisar.",
      "A imagem não deixa. Fica onde a pus.",
    ],
  },
  {
    heading: "V — SOBRE OS LIVROS E A MÚSICA",
    body: [
      "Tom Walker canta como se soubesse de algo que eu ainda não disse em voz alta. Há artistas assim — que chegam antes das palavras.",
      "Os livros são o sítio onde me escondo quando o mundo fica barulhento demais. Guillaume Musso, Tolkien, Rowling — não são apenas histórias. São arquitecturas onde aprendi que o invisível importa, que a amizade salva, que a coragem não é a ausência do medo.",
      "Algumas noites o silêncio só é suportável com música a baixo volume e um livro que ainda não acabei.",
      "Isso é o suficiente. Mais do que o suficiente.",
    ],
  },
  {
    heading: "VI — SOBRE AQUILO QUE AINDA QUERO",
    body: [
      "Quero trabalho que faça sentido com o que sou — não apenas com o que aprendi.",
      "Quero fotografar sem justificar porquê. Quero construir algo que seja completamente meu, feito com as mãos e com a atenção e com o tempo que as coisas precisam.",
      "Imagino-me algures entre o Porto e o mar. Talvez Aveiro. Talvez um sítio que ainda não existe no meu mapa.",
      "Não sei o caminho exacto. Sei a direcção.",
    ],
  },
  {
    heading: "VII — PARA QUEM CHEGOU ATÉ AQUI",
    body: [
      "Este é o arquivo dentro do arquivo.",
      "Não há fotografias aqui. Há apenas palavras — a matéria-prima antes da imagem, o que existe antes de eu pegar na câmara.",
      "Se chegaste até aqui foi porque prestas atenção. E eu aprendi, devagar, que a atenção é a forma mais rara e mais generosa de amar alguma coisa.",
      "Obrigada por isso.",
      "Obrigada por escreveres.",
    ],
  },
];

function RosemaryPage() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "oklch(0.08 0.018 30)", color: "oklch(0.84 0.016 68)" }}
    >
      {/* Top bar */}
      <div className="fixed top-0 inset-x-0 z-50 flex justify-between items-center px-8 md:px-16 py-7">
        <span
          className="font-mono-label text-[9px] uppercase tracking-[0.45em]"
          style={{ color: "oklch(0.45 0.025 50)" }}
        >
          § — interior
        </span>
        <button
          onClick={() => router.history.back()}
          className="font-mono-label text-[9px] uppercase tracking-[0.45em] transition-colors duration-300"
          style={{ color: "oklch(0.45 0.025 50)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.66 0.115 55)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.45 0.025 50)")}
        >
          ← fechar
        </button>
      </div>

      {/* Content */}
      <main className="flex-1 max-w-[660px] mx-auto px-8 md:px-12 pt-36 pb-48 w-full">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="font-mono-label text-[9px] uppercase tracking-[0.55em] mb-12"
            style={{ color: "oklch(0.66 0.115 55)" }}
          >
            reservado · não indexado · encontrado
          </p>
          <h1
            className="font-display leading-[1.02] mb-14"
            style={{
              fontSize: "clamp(2.4rem, 7vw, 4.5rem)",
              color: "oklch(0.90 0.018 72)",
              letterSpacing: "-0.02em",
            }}
          >
            O QUE NÃO<br />
            CABE NUMA<br />
            <span style={{ color: "oklch(0.66 0.115 55)", fontStyle: "italic" }}>FOTOGRAFIA.</span>
          </h1>
          <div
            className="w-10 h-px mb-14"
            style={{ backgroundColor: "oklch(0.66 0.115 55)", opacity: 0.5 }}
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.2, delay: 0.6 }}
            className="font-italic-serif leading-[1.75] mb-4"
            style={{ fontSize: "clamp(1.15rem, 2.8vw, 1.42rem)", color: "oklch(0.78 0.015 65)" }}
          >
            Há lugares que só existem em palavras.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.2, delay: 1.1 }}
            className="font-italic-serif leading-[1.75] mb-24"
            style={{ fontSize: "clamp(1.15rem, 2.8vw, 1.42rem)", color: "oklch(0.78 0.015 65)" }}
          >
            Este é um deles.
          </motion.p>
        </motion.div>

        {/* Sections */}
        {SECTIONS.map((section, si) => (
          <motion.section
            key={section.heading}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.8 + si * 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="mb-24"
          >
            <p
              className="font-mono-label text-[8px] uppercase tracking-[0.55em] mb-8"
              style={{ color: "oklch(0.66 0.115 55)" }}
            >
              {section.heading}
            </p>
            <div className="flex flex-col gap-7">
              {section.body.map((paragraph, pi) => (
                <p
                  key={pi}
                  className="leading-[1.9]"
                  style={{
                    fontSize: "clamp(0.96rem, 2vw, 1.08rem)",
                    color: pi === 0 && si === 0
                      ? "oklch(0.88 0.018 70)"
                      : "oklch(0.70 0.013 62)",
                    whiteSpace: "pre-line",
                    fontWeight: pi === 0 && si === 0 ? "500" : "normal",
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.section>
        ))}

        {/* Closing mark */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2.2 }}
          className="pt-20 border-t"
          style={{ borderColor: "oklch(0.88 0.018 70 / 6%)" }}
        >
          <p
            className="font-italic-serif text-2xl md:text-3xl mb-4"
            style={{ color: "oklch(0.66 0.115 55)" }}
          >
            L. Rosmaninho
          </p>
          <p
            className="font-mono-label text-[9px] uppercase tracking-[0.45em]"
            style={{ color: "oklch(0.35 0.015 45)" }}
          >
            Coimbra · 40°12′N · 8°25′O
          </p>
          <p
            className="font-italic-serif text-[11px] mt-8 italic"
            style={{ color: "oklch(0.30 0.012 45)" }}
          >
            rosmarinus officinalis — persistência, memória, retorno.
          </p>
          <div className="mt-10 flex justify-center">
            <BotanicalMark size={22} className="opacity-65" style={{ color: "oklch(0.66 0.115 55)" }} />
          </div>
        </motion.div>
      </main>
    </div>
  );
}
