import portoStreet from "@/assets/porto-street.jpg";
import river from "@/assets/river.jpg";
import coimbra from "@/assets/coimbra.jpg";
import villageAlley from "@/assets/village-alley.jpg";
import stoneVillage from "@/assets/stone-village.jpg";
import portoBridge from "@/assets/porto-bridge.jpg";
import sunsetBeach from "@/assets/sunset-beach.jpg";
import waterSplash from "@/assets/water-splash.jpg";
import coimbraSkyline from "@/assets/coimbra-skyline.jpg";
import quedaAgua from "@/assets/queda-agua.jpg";
import ribeiroMusgo from "@/assets/ribeiro-musgo.jpg";
import portoDouro from "@/assets/porto-douro.jpg";
import geladoBolacha from "@/assets/gelado-bolacha.jpg";
import fioAgua from "@/assets/fio-agua.jpg";
import risottoCourgette from "@/assets/risotto-courgette.jpg";
import sandesRibs from "@/assets/sandes-ribs.jpg";
import waffleOvo from "@/assets/waffle-ovo.jpg";
import ovosMexidos from "@/assets/ovos-mexidos.jpg";
import arcoCoimbra from "@/assets/arco-coimbra.jpg";

export type CategorySlug = "urbanas" | "natureza" | "retratos" | "iguarias";

export type Category = {
  slug: CategorySlug;
  title: string;
  description: string;
  intro: string;
  quote: string;
  quoteSource: string;
};

export type PhotoMeta = {
  date: string;
  time: string;
  coords: string;
  note: string;
};

export type Photo = {
  src: string;
  title: string;
  year: string;
  category: CategorySlug;
  orientation: "portrait" | "landscape" | "square";
  meta: PhotoMeta;
};

export const categories: Category[] = [
  {
    slug: "urbanas",
    title: "Urbanas",
    description: "Ruas, pontes e telhados — a cidade enquanto matéria viva.",
    intro: "As cidades falam em camadas. Há a superfície — o movimento, o ruído, o asfalto molhado. E há o que está por baixo: a memória, o tempo acumulado, a luz que teima em aparecer entre prédios. Estas imagens são essa segunda camada.",
    quote: "A cidade é um arquivo de gestos esquecidos.",
    quoteSource: "L.R.",
  },
  {
    slug: "natureza",
    title: "Natureza",
    description: "Água, luz e paisagem — o tempo lento dos lugares.",
    intro: "A natureza não posa. Não espera. Não repete. Estas fotografias são encontros — brevíssimos — com água, luz e tempo, em lugares onde o mundo ainda vai devagar.",
    quote: "A paisagem não precisa de ser perfeita para ser completa.",
    quoteSource: "caderno de campo",
  },
  {
    slug: "retratos",
    title: "Retratos",
    description: "Rostos, pedra e silêncio — quem é, e onde está.",
    intro: "Um retrato não é apenas um rosto. É um lugar, um momento, uma matéria — pedra, luz, silêncio. Estes retratos são sobre presença: a de quem está, e a do que fica depois de ir.",
    quote: "Fotografar alguém é uma forma de atenção.",
    quoteSource: "L.R.",
  },
  {
    slug: "iguarias",
    title: "Iguarias",
    description: "Mesas, texturas e o instante antes do primeiro garfo.",
    intro: "Antes do primeiro garfo, existe uma brevidade extraordinária. Uma mesa posta, uma luz que bate de lado, o vapor de algo acabado de sair do forno. Estas imagens vivem nesses segundos antes.",
    quote: "A comida é a única arte que desaparece ao ser apreciada.",
    quoteSource: "observação de mesa",
  },
];

export const photos: Photo[] = [
  // Urbanas
  {
    src: portoStreet,
    title: "Rua da Madrugada",
    year: "2026",
    category: "urbanas",
    orientation: "portrait",
    meta: { date: "Jan 2026", time: "05:47", coords: "41°08'N 8°36'O", note: "Há ruas que se lembram das pessoas que já não estão." },
  },
  {
    src: coimbra,
    title: "Sobre o Mondego",
    year: "2024",
    category: "urbanas",
    orientation: "square",
    meta: { date: "Mar 2024", time: "18:23", coords: "40°12'N 8°25'O", note: "O rio sabia onde estava mesmo quando eu não sabia." },
  },
  {
    src: portoBridge,
    title: "Dom Luís I",
    year: "2024",
    category: "urbanas",
    orientation: "landscape",
    meta: { date: "Nov 2024", time: "17:01", coords: "41°08'N 8°36'O", note: "Cada ponte é uma decisão de atravessar." },
  },
  {
    src: coimbraSkyline,
    title: "Telhados de Coimbra",
    year: "2023",
    category: "urbanas",
    orientation: "landscape",
    meta: { date: "Set 2023", time: "19:44", coords: "40°12'N 8°25'O", note: "Coimbra vista de cima parece uma promessa cumprida." },
  },
  {
    src: portoDouro,
    title: "Janela para o Douro",
    year: "2023",
    category: "urbanas",
    orientation: "portrait",
    meta: { date: "Out 2023", time: "16:55", coords: "41°09'N 8°36'O", note: "A cidade abriu-se como um livro pela metade." },
  },
  {
    src: arcoCoimbra,
    title: "Arco de Almedina",
    year: "2024",
    category: "urbanas",
    orientation: "portrait",
    meta: { date: "Abr 2024", time: "11:30", coords: "40°12'N 8°25'O", note: "Entrar pela pedra antiga é entrar noutro tempo." },
  },

  // Natureza
  {
    src: river,
    title: "À flor da água",
    year: "2024",
    category: "natureza",
    orientation: "landscape",
    meta: { date: "Abr 2024", time: "09:12", coords: "40°18'N 8°28'O", note: "A água guarda tudo o que cai nela." },
  },
  {
    src: sunsetBeach,
    title: "Ocaso atlântico",
    year: "2022",
    category: "natureza",
    orientation: "landscape",
    meta: { date: "Jul 2022", time: "21:03", coords: "38°42'N 9°24'O", note: "O sol demora mais a ir do que parece." },
  },
  {
    src: quedaAgua,
    title: "Espelho de outono",
    year: "2020",
    category: "natureza",
    orientation: "landscape",
    meta: { date: "Out 2020", time: "14:37", coords: "40°21'N 8°17'O", note: "O outono tem uma luz que pede silêncio." },
  },
  {
    src: ribeiroMusgo,
    title: "Ao rés do ribeiro",
    year: "2023",
    category: "natureza",
    orientation: "landscape",
    meta: { date: "Mai 2023", time: "08:50", coords: "40°19'N 8°20'O", note: "Há uma velocidade que só a água conhece." },
  },
  {
    src: fioAgua,
    title: "Fio de água",
    year: "2023",
    category: "natureza",
    orientation: "landscape",
    meta: { date: "Jun 2023", time: "10:05", coords: "40°22'N 8°18'O", note: "Devagar também é uma forma de chegar." },
  },
  {
    src: waterSplash,
    title: "Coroa de água",
    year: "2023",
    category: "natureza",
    orientation: "landscape",
    meta: { date: "Ago 2023", time: "13:22", coords: "40°20'N 8°19'O", note: "O momento antes de cair é o mais livre." },
  },

  // Retratos
  {
    src: villageAlley,
    title: "Pedra e céu",
    year: "2023",
    category: "retratos",
    orientation: "portrait",
    meta: { date: "Set 2023", time: "16:10", coords: "40°26'N 7°14'O", note: "O granito guarda o calor do dia para a noite." },
  },
  {
    src: stoneVillage,
    title: "Aldeia histórica",
    year: "2023",
    category: "retratos",
    orientation: "portrait",
    meta: { date: "Set 2023", time: "17:45", coords: "40°25'N 7°15'O", note: "As pedras recordam tudo. Só nós esquecemos." },
  },

  // Comida
  {
    src: geladoBolacha,
    title: "Sorriso de bolacha",
    year: "2023",
    category: "iguarias",
    orientation: "landscape",
    meta: { date: "Jul 2023", time: "15:30", coords: "Coimbra", note: "Comer devagar é também uma forma de atenção." },
  },
  {
    src: risottoCourgette,
    title: "Risotto de curgete",
    year: "2022",
    category: "iguarias",
    orientation: "landscape",
    meta: { date: "Mar 2022", time: "13:05", coords: "Porto", note: "Há refeições que são um intervalo no tempo." },
  },
  {
    src: sandesRibs,
    title: "Sandes & batatas",
    year: "2022",
    category: "iguarias",
    orientation: "landscape",
    meta: { date: "Jun 2022", time: "12:48", coords: "Lisboa", note: "Comida simples, feita com cuidado, é luxo suficiente." },
  },
  {
    src: waffleOvo,
    title: "Panqueca salgada",
    year: "2023",
    category: "iguarias",
    orientation: "landscape",
    meta: { date: "Fev 2023", time: "10:17", coords: "Coimbra", note: "O pequeno-almoço tardio tem a sua própria filosofia." },
  },
  {
    src: ovosMexidos,
    title: "Mexidos com tomate",
    year: "2023",
    category: "iguarias",
    orientation: "landscape",
    meta: { date: "Abr 2023", time: "11:03", coords: "Coimbra", note: "Ovos mexidos às onze da manhã. A vida tem outro ritmo." },
  },
];

export function photosByCategory(slug: CategorySlug) {
  return photos.filter((p) => p.category === slug);
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
