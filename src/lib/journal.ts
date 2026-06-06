import type { CategorySlug } from "./photos";

export type JournalEntry = {
  slug: string;
  date: string;
  location?: string;
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
    title: "Vinte minutos antes de pegar na câmara",
    excerpt: "A câmara fica dentro do saco. Aprendi que funciona melhor assim — esperar. Pedir qualquer coisa quente. Deixar o lugar tornar-se lugar.",
    body: [
      "Peço o espresso. Sento-me sem tirar o casaco — ainda não sei se fico. A câmara está dentro do saco.",
      "Fico a olhar. A luz encontra o sítio dela sem que eu faça nada. As pessoas instalam-se. A conversa da mesa ao lado ganha textura. O balcão, que à entrada parecia cenário, começa a parecer lugar. Só quando isso acontece é que pego na câmara.",
      "Não sei se é superstição ou método. As fotografias de que mais gosto foram todas feitas depois de uma pausa longa. Depois de qualquer coisa quente.",
    ],
    photoSrc: ovosMexidos,
    photoTitle: "Mesa de manhã, café de letras",
    relatedCategory: "iguarias",
  },
  {
    slug: "figura-no-mondego",
    date: "2026-04-12",
    title: "Uma vez, havia uma figura no rio, em Outense",
    excerpt: "Não estava a fazer nada que eu conseguisse perceber. Só estava. Água pelos joelhos, costas para mim.",
    body: [
      "Cheguei à margem com o sol ainda baixo. A água tinha a cor de chumbo de manhã cedo. Não esperava encontrar ninguém — essa é sempre a condição implícita dos lugares a esta hora.",
      "Havia ali uma figura. De costas. Imóvel com a água pelos joelhos. Levantei a câmara devagar, como quem não quer perturbar um sonho alheio. Disparei uma vez. Uma única vez.",
      "Depois guardei a câmara e fiquei a olhar também. Por uns minutos, fomos os dois a fazer o mesmo — estar no rio sem razão nenhuma. Não sei se ela me viu. Nunca olhou para trás.",
    ],
    photoSrc: mondegoFigura,
    photoTitle: "Figura em Outense, abril",
    relatedCategory: "urbanas",
  },
  {
    slug: "telhados-com-nevoa",
    date: "2026-02-03",
    title: "A cidade tinha encolhido durante a noite",
    excerpt: "Fui à janela e Coimbra tinha só a metade de baixo. A outra metade tinha ido algures, sem aviso.",
    body: [
      "Acordei porque a luz era diferente. Mais branca. Mais quieta. Havia um silêncio que não é habitual nesta rua.",
      "Subi. Há um miradouro perto de casa que normalmente não tem graça nenhuma — dá para estacionamentos e o topo de prédios que nunca foram bonitos. Com a névoa, tudo aquilo ganhou peso. A feiura tem o seu charme quando está meio escondida.",
      "Fiz estas fotografias em silêncio. Sem música, sem ninguém. A névoa pede quietude em troca de se deixar fotografar. Cumpri.",
    ],
    photoSrc: telhadosNevoa,
    photoTitle: "Telhados de Coimbra na névoa, fevereiro",
    relatedCategory: "urbanas",
  },
  {
    slug: "matcha-da-manha",
    date: "2025-11-18",
    title: "O verde da chávena",
    excerpt: "Nunca tinha visto um verde assim dentro de uma chávena. Fiquei a olhar mais tempo do que seria razoável antes de o beber.",
    body: [
      "Era espesso e verde-escuro, com a espuma ainda fresca. Pus-o perto da janela onde batia uma luz de novembro — pálida, lateral. E fiquei a olhá-lo.",
      "Há uma categoria de beleza que existe só nas coisas quotidianas apanhadas no sítio certo. Uma tosta mal dobrada. Um café com a colher ainda dentro. O reflexo de uma janela num prato. Ninguém fala destas imagens. São as que eu procuro.",
      "Bebi-o devagar. Era bom — como quase sempre é quando a chávena está quente e há luz a entrar de lado. A fotografia ficou.",
    ],
    photoSrc: cafeMatcha,
    photoTitle: "Matcha com espuma, novembro",
    relatedCategory: "iguarias",
  },
  {
    slug: "retrato-na-esplanada",
    date: "2025-09-06",
    title: "Cinco da tarde de setembro",
    excerpt: "Ela estava com o olhar algures à minha esquerda. Naquele estado de presença ausente que só acontece quando estamos bem com alguém.",
    body: [
      "Estávamos na esplanada há já algum tempo quando a luz mudou. Caía de lado, dourada e ligeiramente cansada — a luz exacta das cinco da tarde de setembro. Peguei na câmara sem dizer nada.",
      "Ela estava com o olhar algures à minha esquerda. Naquele estado de presença ausente que acontece quando estamos bem com alguém e não há necessidade de encher o silêncio. Disparei.",
      "Há retratos que são sobre a cara. Este é sobre o estado. A cara está lá — mas o que me interessa é aquela qualidade do ar à sua volta. Esta pessoa está sossegada. Eu estava a tempo.",
    ],
    photoSrc: retratoEsplanada,
    photoTitle: "Retrato na esplanada, setembro",
    relatedCategory: "retratos",
  },
  {
    slug: "ribeiro-e-musgo",
    date: "2025-06-29",
    title: "No bosque que não estava no mapa de ninguém",
    excerpt: "O ruído da água apareceu antes do ribeiro. Segui-o.",
    body: [
      "Tinha saído cedo para uma caminhada sem destino. No meio de um bosque que não estava no mapa de ninguém, o ruído da água apareceu primeiro. Segui-o.",
      "As pedras estavam cobertas de musgo verde-escuro, húmido, quase luminoso na sombra. A água não corria — escorregava. Como se também soubesse que não havia razão para ir mais rápido. Baixei-me e fiquei assim, a câmara rente às pedras.",
      "Passei ali uma hora. Não fiz muitas fotografias — quando um lugar é assim, a câmara às vezes atrapalha. Mas esta ficou. E sempre que a vejo ouço o ribeiro outra vez.",
    ],
    photoSrc: ribeiroMusgo,
    photoTitle: "Ribeiro com musgo no bosque",
    relatedCategory: "natureza",
  },
  {
    slug: "barco-no-douro",
    date: "2026-02-17",
    title: "Fevereiro no Porto tem uma qualidade de luz",
    excerpt: "Uma luz fria mas não hostil. Que não promete calor mas também não o nega.",
    body: [
      "Fui ao Douro cedo, antes dos turistas. O barco estava lá — amarrado a um cais de pedra, pintado de vermelho-escuro que já não era bem vermelho. A água refletia o céu branco com a perfeição dos dias sem vento.",
      "Não há ninguém nesta fotografia. É exactamente isso que me interessa nela. O barco existe. O cais existe. O rio existe. Mas o tempo parou.",
      "Há imagens que são sobre a ausência. Fiquei ali sem saber bem o que estava à espera — até perceber que não estava à espera de nada. Só a olhar.",
    ],
    photoSrc: barcoDouro,
    photoTitle: "Barco ancorado no Douro, fevereiro",
    relatedCategory: "urbanas",
  },
];

export function getJournalEntry(slug: string) {
  return journal.find((e) => e.slug === slug);
}

export function formatJournalDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-PT", { day: "numeric", month: "long", year: "numeric" });
}
