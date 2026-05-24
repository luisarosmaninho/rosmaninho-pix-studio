import type { CategorySlug } from "./photos";

export type JournalEntry = {
  slug: string;
  date: string; // ISO
  title: string;
  excerpt: string;
  body: string[]; // paragraphs
  photoSrc: string; // image asset src
  photoTitle: string;
  relatedCategory: CategorySlug;
};

import portoStreet from "@/assets/porto-street.jpg";
import river from "@/assets/river.jpg";
import villageAlley from "@/assets/village-alley.jpg";
import sunsetBeach from "@/assets/sunset-beach.jpg";
import waterSplash from "@/assets/water-splash.jpg";

export const journal: JournalEntry[] = [
  {
    slug: "rua-da-madrugada",
    date: "2026-03-09",
    title: "A rua que ainda dormia",
    excerpt: "Cheguei ao Porto antes do sol. As esplanadas estavam por abrir e os candeeiros ainda hesitavam entre a noite e o dia.",
    body: [
      "Há manhãs em que a cidade pertence só a quem decide acordar cedo. Saí do hotel às seis, com a câmara ao ombro e os pés ainda meio dormentes. A rua estava molhada — talvez tivesse chovido, talvez fosse só a humidade do rio a subir pelas calçadas.",
      "Parei no meio do passeio e fiquei a olhar. As cadeiras ainda dobradas, o chapéu de sol fechado, os candeeiros amarelos a competir com o azul-rosado que crescia ao fundo. Foi a primeira fotografia do dia e a única que precisei de fazer.",
      "Voltei para o café mais próximo, pedi uma bica e fiquei a pensar em como há lugares que só se mostram a quem os apanha desprevenidos.",
    ],
    photoSrc: portoStreet,
    photoTitle: "Rua da Madrugada",
    relatedCategory: "luz-que-cai",
  },
  {
    slug: "a-flor-da-agua",
    date: "2024-07-22",
    title: "À altura do rio",
    excerpt: "Para fotografar o Mondego, deitei-me. Foi assim, com o queixo a roçar a corrente, que percebi o que o rio queria mostrar.",
    body: [
      "É curioso como mudamos a fotografia só por mudar de altura. Estava na margem e a vista era a do costume — montes, casas brancas, céu. Tirei os ténis, entrei na água até aos joelhos e baixei-me até a câmara quase tocar na superfície.",
      "De repente o rio deixou de ser cenário. Tornou-se primeiro plano, com toda a sua textura — os reflexos, as pedras douradas no fundo, o leve tremor da corrente. As montanhas continuaram lá, mas pequenas, distantes, quase modestas.",
      "Há uma lição nisto que vale para mais do que fotografia: às vezes o assunto principal só aparece quando aceitamos baixar-nos até ele.",
    ],
    photoSrc: river,
    photoTitle: "À flor da água",
    relatedCategory: "agua-viva",
  },
  {
    slug: "pedra-e-ceu",
    date: "2023-05-14",
    title: "Onde o granito encontra o azul",
    excerpt: "Monsanto não se fotografa: contempla-se. O resto acontece sozinho.",
    body: [
      "Subi a aldeia devagar, com pausas para o coração e para os olhos. As casas estão entaladas entre penedos enormes, como se a vila tivesse crescido entre os dedos da serra.",
      "Nesta foto, o que me prendeu foi a relação entre a parede de granito — áspera, antiga, com a cor da terra — e o azul violento do céu naquele dia de Maio. Duas matérias que parecem opostas e que, juntas, fazem Portugal.",
      "Pousei a câmara durante uns minutos só para ouvir. Não havia nada para ouvir. Era exatamente isso o som.",
    ],
    photoSrc: villageAlley,
    photoTitle: "Pedra e céu",
    relatedCategory: "pedra-antiga",
  },
  {
    slug: "ocaso-atlantico",
    date: "2022-01-29",
    title: "Cinco minutos antes do escuro",
    excerpt: "Toda a gente fotografa o pôr do sol. Eu prefiro o instante seguinte, quando o céu fica rosa e ninguém olha.",
    body: [
      "A Costa da Caparica em Janeiro é outra coisa — vazia, fria, generosa. Cheguei perto da hora dourada já cansada, mas há uma luz que obriga a continuar.",
      "Esperei o sol descer e, em vez de guardar a câmara, fiquei mais cinco minutos. Foi nesses minutos que aconteceu: o céu desbotou para um pêssego suave, o mar tornou-se espelho, e duas pessoas apareceram, do nada, a caminhar na areia molhada.",
      "Há uma coisa que aprendi: o melhor da fotografia de paisagem está quase sempre depois do momento óbvio.",
    ],
    photoSrc: sunsetBeach,
    photoTitle: "Ocaso atlântico",
    relatedCategory: "horizontes",
  },
  {
    slug: "coroa-de-agua",
    date: "2023-08-15",
    title: "Uma coroa que dura um milésimo",
    excerpt: "Pedi à minha sobrinha para atirar uma pedra. Foi a melhor assistente que já tive.",
    body: [
      "Esta é uma fotografia simples e absurdamente difícil. Quis registar uma coisa que ninguém vê — a forma que a água faz quando algo cai sobre ela, antes de voltar a ser superfície.",
      "Montei a câmara num pequeno tripé à beira do tanque, pus o disparo em rajada e dei uma pedra à Madalena, com instruções precisas. Ela atirou. Eu disparei. Repetimos umas trinta vezes.",
      "No final, escolhi este enquadramento: a coroa estava perfeita, com os respingos suspensos como se o tempo tivesse parado para posar. É uma fotografia que me lembra que paciência também é luz.",
    ],
    photoSrc: waterSplash,
    photoTitle: "Coroa de água",
    relatedCategory: "agua-viva",
  },
];

export function getJournalEntry(slug: string) {
  return journal.find((e) => e.slug === slug);
}

export function formatJournalDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-PT", { day: "numeric", month: "long", year: "numeric" });
}
