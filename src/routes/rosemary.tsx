import { createFileRoute, useRouter } from "@tanstack/react-router";
import { motion } from "framer-motion";

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
    heading: "SOBRE O OLHAR",
    body: [
      "Sempre soube que pertenço mais ao mundo das histórias do que ao ritmo apressado que muita gente escolhe.",
      "Sou tímida. Reservada. Observadora.",
      "Sinto devagar. Amo devagar. Confio devagar.",
      "Para algumas pessoas isso parece defeito.\nPara mim é simplesmente o meu ritmo.",
      "O valor de alguém está no que não se vê — na forma como escuta, nos pequenos gestos, nos detalhes que passam despercebidos aos mais distraídos.",
      "Já senti o peso daquele olhar que não vê, mas avalia. Aquela indiferença que dói mais do que um comentário. Aquele desprezo que nem sempre vem em palavras, mas que se sente no silêncio.",
      "A minha estranheza — se assim se quiser chamar — está no meu interior. E isso não cabe numa primeira impressão.",
    ],
  },
  {
    heading: "SOBRE OS LUGARES",
    body: [
      "Há lugares que me falam ao coração sem os ter visto.",
      "A Irlanda — a magia verde.\nA Escócia — um poema escrito em pedra e nevoeiro.\nVerona — onde o romantismo se entranha nas paredes.\nBruges — encantadora demais para ser real.\nA Noruega — o silêncio da neve e a aurora boreal.",
      "Viajar sem sair do lugar foi, durante muito tempo, a minha forma de fugir, de aprender, de viver um pouco mais.",
      "Guardo-os dentro de mim até poder guardá-los numa imagem.",
    ],
  },
  {
    heading: "SOBRE A MÚSICA",
    body: [
      "Tom Walker tem um jeito de cantar que me toca num lugar estranho e bonito. Como se dissesse aquilo que a minha voz ainda não achou coragem para dizer.",
      "Música, para mim, não é som.\nÉ linguagem emocional.",
    ],
  },
  {
    heading: "SOBRE OS LIVROS",
    body: [
      "Desde pequena que encontro nos livros um lugar para respirar.",
      "Guillaume Musso escreve de forma quase cinematográfica — deixo-me envolver como se cada livro fosse uma viagem emocional.",
      "Harry Potter e O Senhor dos Anéis não são apenas ficção. São lições que cresceram comigo. O valor da amizade. O poder da esperança. A coragem de continuar quando tudo parece impossível.",
      "São universos onde encontro conforto — e, curiosamente, respostas.",
    ],
  },
  {
    heading: "SOBRE A FOTOGRAFIA",
    body: [
      "Fotografar é capturar aquilo que passa depressa demais para a memória segurar.",
      "É guardar sensações.\nÉ transformar segundos em algo eterno.",
      "Através da lente compreendo o mundo de uma forma diferente — e talvez até me compreenda a mim.",
    ],
  },
  {
    heading: "SOBRE O FUTURO",
    body: [
      "Quero um caminho mais criativo, ligado à imagem, ao multimédia, à fotografia. Algo que faça sentido com o que sou, não apenas com o que a vida me pôs à frente.",
      "Imagino-me no Porto ou em Aveiro. Uma pela vida vibrante, a outra pela calma e beleza delicada.",
      "Quero construir algo meu.\nQuero sentir orgulho no meu trabalho.\nQuero crescer.",
    ],
  },
  {
    heading: "SOBRE ISTO TUDO",
    body: [
      "Tudo isto faz parte de mim.",
      "As minhas dúvidas, os meus gostos, os meus medos, os meus sonhos.",
      "No fundo sou alguém que quer ser vista sem pressas.\nAlguém que precisa de tempo para sentir e tempo para confiar.\nAlguém que acredita profundamente que a superfície nunca mostra o essencial.",
    ],
  },
];

function RosemaryPage() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "oklch(0.09 0.020 35)", color: "oklch(0.84 0.016 68)" }}
    >
      {/* Close button */}
      <div className="fixed top-0 inset-x-0 z-50 flex justify-between items-center px-8 md:px-16 py-7">
        <span
          className="font-mono-label text-[9px] uppercase tracking-[0.45em]"
          style={{ color: "oklch(0.50 0.030 55)" }}
        >
          § — arquivo interior
        </span>
        <button
          onClick={() => router.history.back()}
          className="font-mono-label text-[9px] uppercase tracking-[0.45em] transition-colors duration-300"
          style={{ color: "oklch(0.50 0.030 55)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.66 0.115 55)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.50 0.030 55)")}
        >
          ← fechar
        </button>
      </div>

      {/* Content */}
      <main className="flex-1 max-w-[680px] mx-auto px-8 md:px-12 pt-36 pb-40 w-full">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="font-mono-label text-[9px] uppercase tracking-[0.5em] mb-10"
            style={{ color: "oklch(0.66 0.115 55)" }}
          >
            reservado · não indexado
          </p>
          <h1
            className="font-display leading-[1.05] mb-12"
            style={{
              fontSize: "clamp(2rem, 6vw, 3.8rem)",
              color: "oklch(0.88 0.018 70)",
            }}
          >
            § — O QUE NÃO<br />CABE NUMA<br />FOTOGRAFIA
          </h1>
          <div
            className="w-12 h-px mb-12"
            style={{ backgroundColor: "oklch(0.66 0.115 55)", opacity: 0.6 }}
          />
          <p
            className="font-italic-serif leading-[1.7] mb-4"
            style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.35rem)", color: "oklch(0.80 0.016 68)" }}
          >
            Há pensamentos que ficam.
          </p>
          <p
            className="font-italic-serif leading-[1.7] mb-20"
            style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.35rem)", color: "oklch(0.80 0.016 68)" }}
          >
            Hóspedes teimosos que se recusam a ir embora.
          </p>
        </motion.div>

        {/* Sections */}
        {SECTIONS.map((section, si) => (
          <motion.section
            key={section.heading}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.15 + si * 0.1, ease: "easeOut" }}
            className="mb-20"
          >
            <p
              className="font-mono-label text-[9px] uppercase tracking-[0.5em] mb-8"
              style={{ color: "oklch(0.66 0.115 55)" }}
            >
              {section.heading}
            </p>
            <div className="flex flex-col gap-6">
              {section.body.map((paragraph, pi) => (
                <p
                  key={pi}
                  className="leading-[1.8]"
                  style={{
                    fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
                    color: "oklch(0.76 0.014 65)",
                    whiteSpace: "pre-line",
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.section>
        ))}

        {/* Footer mark */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="pt-16 border-t"
          style={{ borderColor: "oklch(0.88 0.018 70 / 8%)" }}
        >
          <p
            className="font-italic-serif text-2xl mb-3"
            style={{ color: "oklch(0.66 0.115 55)" }}
          >
            L. Rosmaninho
          </p>
          <p
            className="font-mono-label text-[9px] uppercase tracking-[0.45em]"
            style={{ color: "oklch(0.40 0.020 50)" }}
          >
            Coimbra · Portugal · 40°12'N
          </p>
        </motion.div>
      </main>
    </div>
  );
}
