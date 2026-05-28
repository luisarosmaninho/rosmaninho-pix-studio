import type { CategorySlug } from "./photos";

export type JournalEntry = {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  body: string[];
  photoSrc: string;
  photoTitle: string;
  relatedCategory: CategorySlug;
};

import mondegoFigura from "@/assets/mondego-figura.jpg";
import telhadosNevoa from "@/assets/telhados-nevoa.jpg";
import cafeMatcha from "@/assets/cafe-matcha.jpg";
import retratoEsplanada from "@/assets/retrato-esplanada.jpg";
import ribeiroMusgo from "@/assets/ribeiro-musgo.jpg";
import barcoDouro from "@/assets/barco-douro.jpg";

export const journal: JournalEntry[] = [
  {
    slug: "figura-no-mondego",
    date: "2026-04-12",
    title: "A figura que o rio não engoliu",
    excerpt: "Havia uma pessoa parada a meio do Mondego. Não estava a nadar, não estava a pescar — estava simplesmente lá, como se o rio fosse um lugar de pensar.",
    body: [
      "Cheguei à margem quando o sol ainda estava baixo e a água tinha aquela cor de chumbo que só existe de manhã cedo. Não esperava encontrar ninguém. É esse o contrato silencioso com os lugares a esta hora — pertences-te a ti.",
      "Mas havia ali uma figura, de costas, com a água pelos joelhos. Imóvel. Não estava a fazer nada que eu conseguisse perceber. Só estava. Levantei a câmara devagar, como quem não quer perturbar um sonho alheio, e disparei uma vez. Uma única vez.",
      "Depois guardei a câmara e fiquei a olhar também. Durante uns minutos, fomos os dois a fazer o mesmo — estar no rio sem razão nenhuma. Às vezes é isso que a fotografia me ensina: que há valor enorme no que não se explica.",
    ],
    photoSrc: mondegoFigura,
    photoTitle: "Figura no Mondego ao amanhecer",
    relatedCategory: "natureza",
  },
  {
    slug: "telhados-com-nevoa",
    date: "2026-02-03",
    title: "A cidade que desapareceu a seguir",
    excerpt: "Coimbra estava coberta de névoa quando acordei. Subi ao ponto mais alto que consegui encontrar e percebi que a cidade tinha desaparecido.",
    body: [
      "É estranho fotografar algo que não se vê. Os telhados emergiam da névoa como ilhas de uma paisagem submersa — vermelhos, laranja queimado, o ponteiro de uma torre aqui e ali. Tudo o que ficava abaixo estava apagado.",
      "Há uma quietude particular neste tipo de manhã. A cidade está acordada lá em baixo — o barulho dos autocarros, os passos apressados, o cheiro do café — mas daqui de cima não chega nada disso. Só silêncio branco.",
      "Fiz várias fotografias mas esta foi a única que ficou. As outras tentavam mostrar demasiado. Esta aceita que há coisas que a névoa tem o direito de guardar para si.",
    ],
    photoSrc: telhadosNevoa,
    photoTitle: "Telhados na névoa, Coimbra",
    relatedCategory: "urbanas",
  },
  {
    slug: "matcha-da-manha",
    date: "2025-11-18",
    title: "Um verde que não há no campo",
    excerpt: "Nunca tinha visto um verde assim numa chávena. Fiquei a olhar para ele mais tempo do que seria razoável antes de o beber.",
    body: [
      "Pedi o matcha por capricho. Não sou particularmente fã, mas a cor — aquele verde opaco, quase pó, com a espuma fina à superfície — era demasiado boa para ignorar. Pus a chávena perto da janela onde batia uma luz de novembro, pálida e lateral.",
      "Há uma categoria de beleza que existe só em coisas quotidianas apanhadas no sítio certo. Uma tosta mal dobrada, um café com a colher ainda dentro, o reflexo de uma janela num prato. Não são imagens de que toda a gente fala, mas são as que eu procuro.",
      "Bebi o matcha. Era amargo. A fotografia ficou melhor do que a bebida.",
    ],
    photoSrc: cafeMatcha,
    photoTitle: "Matcha com espuma, novembro",
    relatedCategory: "iguarias",
  },
  {
    slug: "retrato-na-esplanada",
    date: "2025-09-06",
    title: "Quando ninguém está a ser fotografado",
    excerpt: "As melhores fotografias de pessoas são aquelas em que elas ainda não sabem que vão existir.",
    body: [
      "Estávamos sentadas na esplanada há já algum tempo quando percebi que a luz tinha mudado. Caía de lado, dourada e ligeiramente cansada, a luz das cinco da tarde de setembro. Peguei na câmara sem dizer nada.",
      "Ela estava com o olhar algures à minha esquerda — naquele estado de presença ausente que acontece quando estamos bem com alguém e não há necessidade de encher o silêncio. Foi exatamente aí que disparei.",
      "Há retratos que são sobre a cara. Este é sobre o estado. A cara está lá, claro — mas o que me interessa é aquela qualidade particular do ar à sua volta, que diz: esta pessoa está sossegada, e eu estava a tempo de registar isso.",
    ],
    photoSrc: retratoEsplanada,
    photoTitle: "Retrato na esplanada, setembro",
    relatedCategory: "retratos",
  },
  {
    slug: "ribeiro-e-musgo",
    date: "2025-06-29",
    title: "O sítio onde o tempo não tem pressa",
    excerpt: "Encontrei um ribeiro com pedras tão cobertas de musgo que parecia um lugar inventado. Fiquei ali mais tempo do que devia.",
    body: [
      "Tinha saído cedo para uma caminhada sem destino certo — o melhor tipo. No meio de um bosque que não estava no mapa de ninguém, o ruído da água apareceu antes do ribeiro. Segui-o.",
      "As pedras estavam completamente cobertas de musgo verde-escuro, húmido, quase luminoso na sombra. A água não corria depressa — escorregava, devagar, como se também soubesse que não havia razão para ir mais rápido. Baixei-me e fiquei assim, com a câmara rente às pedras, à escuta.",
      "Passei ali uma hora. Não fiz muitas fotografias — quando um lugar é assim, a câmara às vezes atrapalha. Mas esta ficou, e sempre que a vejo ouço o ribeiro de novo.",
    ],
    photoSrc: ribeiroMusgo,
    photoTitle: "Ribeiro com musgo no bosque",
    relatedCategory: "natureza",
  },
  {
    slug: "barco-no-douro",
    date: "2026-01-17",
    title: "O barco que ninguém conduzia",
    excerpt: "Estava ancorado, sozinho, num canto do Douro onde a luz da manhã chegava com atraso. Parecia esperar por algo que nunca ia chegar.",
    body: [
      "Janeiro no Porto tem uma qualidade de luz que não existe noutros meses nem noutras cidades. É uma luz fria mas não hostil — uma luz que não promete calor mas também não o nega. Fui ao Douro cedo, antes dos turistas e dos rabelos de tour.",
      "O barco estava lá, amarrado a um cais de pedra, pintado de vermelho-escuro que já não era bem vermelho. A água à sua volta refletia o céu branco com aquela perfeição ligeiramente perturbadora dos dias sem vento.",
      "Não há ninguém nesta fotografia — e é exatamente isso que me interessa nela. O barco existe, o cais existe, o rio existe. Mas o tempo parou. Há imagens que são sobre a ausência, e esta é uma delas.",
    ],
    photoSrc: barcoDouro,
    photoTitle: "Barco ancorado no Douro, janeiro",
    relatedCategory: "urbanas",
  },
];

export function getJournalEntry(slug: string) {
  return journal.find((e) => e.slug === slug);
}

export function formatJournalDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-PT", { day: "numeric", month: "long", year: "numeric" });
}
