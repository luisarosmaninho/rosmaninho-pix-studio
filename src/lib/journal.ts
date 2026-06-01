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
import ovosMexidos from "@/assets/ovos-mexidos.jpg";

export const journal: JournalEntry[] = [
  {
    slug: "o-cafe-antes-de-tudo",
    date: "2026-05-20",
    title: "Antes da câmara, qualquer coisa quente",
    excerpt: "Há um ritual que precede qualquer fotografia: sentar, pedir qualquer coisa quente — café, matcha, o que houver — e ficar quieta o tempo suficiente para perceber o que está a acontecer à volta.",
    body: [
      "Não começo a fotografar assim que chego. Há sempre uma pausa antes. A câmara fica dentro do saco — às vezes durante vinte minutos, às vezes mais. Peço um espresso se for cedo, um matcha se a manhã pedir mais calma. Sento-me sem tirar o casaco e fico a olhar.",
      "É nessa pausa que as coisas se organizam. A luz encontra o sítio dela. As pessoas instalam-se nas mesas como se fossem sempre ter estado ali. A conversa da mesa ao lado ganha textura. O balcão, que à entrada parecia um cenário, começa a parecer um lugar. Só quando isso acontece é que pego na câmara.",
      "Não sei se é superstição ou método. Provavelmente é as duas coisas ao mesmo tempo, que é a descrição exacta da maior parte do que faço. O que sei é que as fotografias de que mais gosto foram sempre feitas depois de uma pausa longa e de qualquer coisa quente a meio do caminho.",
    ],
    photoSrc: ovosMexidos,
    photoTitle: "Mesa de manhã, café de letras",
    relatedCategory: "iguarias",
  },
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
    photoTitle: "Figura no Mondego, abril",
    relatedCategory: "urbanas",
  },
  {
    slug: "telhados-com-nevoa",
    date: "2026-02-03",
    title: "A cidade que desaparece de cima para baixo",
    excerpt: "A névoa entrou pela madrugada e ficou. De manhã, Coimbra tinha só a metade de baixo — a outra metade tinha ido algures, sem aviso.",
    body: [
      "Acordei cedo porque a luz era diferente — mais branca, mais quieta, com uma qualidade de silêncio que não é habitual nesta rua. Fui à janela e a cidade tinha encolhido. Os telhados estavam lá, mas o que estava por cima dos telhados tinha desaparecido.",
      "Peguei na câmara e subi. Há um miradouro perto de casa que normalmente não tem graça nenhuma — dá para estacionamentos e para o topo de prédios que nunca foram bonitos. Mas com a névoa, tudo aquilo ficou misterioso. A feiura tem o seu charme quando está meio escondida.",
      "Fiz estas fotografias em silêncio, sem falar com ninguém, sem ouvir música. Era esse o contrato — a névoa pede quietude em troca de se deixar fotografar. Cumpri.",
    ],
    photoSrc: telhadosNevoa,
    photoTitle: "Telhados de Coimbra na névoa, fevereiro",
    relatedCategory: "urbanas",
  },
  {
    slug: "matcha-da-manha",
    date: "2025-11-18",
    title: "Um verde que não há no campo",
    excerpt: "Nunca tinha visto um verde assim numa chávena. Fiquei a olhar para ele mais tempo do que seria razoável antes de o beber.",
    body: [
      "Pedi o matcha. É raro haver uma manhã em que não haja um — em alguma versão: latte, iced, ou simplesmente batido à moda antiga numa chávena pequena. Aquele era espesso e verde-escuro, com a espuma ainda fresca. Pus-o perto da janela onde batia uma luz de novembro, pálida e lateral, e fiquei a olhá-lo antes de fazer fosse o que fosse.",
      "Há uma categoria de beleza que existe só em coisas quotidianas apanhadas no sítio certo. Uma tosta mal dobrada, um café com a colher ainda dentro, o reflexo de uma janela num prato. Não são imagens de que toda a gente fala, mas são as que eu procuro — as que existem só durante trinta segundos e que ninguém se dá ao trabalho de registar.",
      "Bebi o matcha devagar. Era bom — como quase sempre é quando a chávena está quente e há luz a entrar de lado. A fotografia também ficou.",
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
