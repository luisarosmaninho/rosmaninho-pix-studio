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

export type CategorySlug = "urbanas" | "natureza" | "retratos" | "comida";

export type Category = {
  slug: CategorySlug;
  title: string;
  description: string;
};

export const categories: Category[] = [
  { slug: "urbanas", title: "Urbanas", description: "Ruas, pontes e telhados — a cidade enquanto matéria viva." },
  { slug: "natureza", title: "Natureza", description: "Água, luz e paisagem — o tempo lento dos lugares." },
  { slug: "retratos", title: "Retratos", description: "Rostos, pedra e silêncio — quem é, e onde está." },
  { slug: "comida", title: "Comida", description: "Mesas, texturas e o instante antes do primeiro garfo." },
];

export type Photo = {
  src: string;
  title: string;
  year: string;
  category: CategorySlug;
  orientation: "portrait" | "landscape" | "square";
};

export const photos: Photo[] = [
  // Urbanas
  { src: portoStreet, title: "Rua da Madrugada", year: "2026", category: "urbanas", orientation: "portrait" },
  { src: coimbra, title: "Sobre o Mondego", year: "2024", category: "urbanas", orientation: "square" },
  { src: portoBridge, title: "Dom Luís I", year: "2024", category: "urbanas", orientation: "landscape" },
  { src: coimbraSkyline, title: "Telhados de Coimbra", year: "2023", category: "urbanas", orientation: "landscape" },
  { src: portoDouro, title: "Janela para o Douro", year: "2023", category: "urbanas", orientation: "portrait" },
  { src: arcoCoimbra, title: "Arco de Almedina", year: "2024", category: "urbanas", orientation: "portrait" },

  // Natureza
  { src: river, title: "À flor da água", year: "2024", category: "natureza", orientation: "landscape" },
  { src: sunsetBeach, title: "Ocaso atlântico", year: "2022", category: "natureza", orientation: "landscape" },
  { src: quedaAgua, title: "Espelho de outono", year: "2020", category: "natureza", orientation: "landscape" },
  { src: ribeiroMusgo, title: "Ao rés do ribeiro", year: "2023", category: "natureza", orientation: "landscape" },
  { src: fioAgua, title: "Fio de água", year: "2023", category: "natureza", orientation: "landscape" },
  { src: waterSplash, title: "Coroa de água", year: "2023", category: "natureza", orientation: "landscape" },

  // Retratos (lugares, matéria, presença)
  { src: villageAlley, title: "Pedra e céu", year: "2023", category: "retratos", orientation: "portrait" },
  { src: stoneVillage, title: "Aldeia histórica", year: "2023", category: "retratos", orientation: "portrait" },

  // Comida
  { src: geladoBolacha, title: "Sorriso de bolacha", year: "2023", category: "comida", orientation: "landscape" },
  { src: risottoCourgette, title: "Risotto de curgete", year: "2022", category: "comida", orientation: "landscape" },
  { src: sandesRibs, title: "Sandes & batatas", year: "2022", category: "comida", orientation: "landscape" },
  { src: waffleOvo, title: "Waffle salgada", year: "2023", category: "comida", orientation: "landscape" },
  { src: ovosMexidos, title: "Mexidos com tomate", year: "2023", category: "comida", orientation: "landscape" },
];

export function photosByCategory(slug: CategorySlug) {
  return photos.filter((p) => p.category === slug);
}

export function getCategory(slug: CategorySlug) {
  return categories.find((c) => c.slug === slug);
}
