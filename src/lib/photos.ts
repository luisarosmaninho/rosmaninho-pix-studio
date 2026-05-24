import portoStreet from "@/assets/porto-street.jpg";
import river from "@/assets/river.jpg";
import coimbra from "@/assets/coimbra.jpg";
import villageAlley from "@/assets/village-alley.jpg";
import stoneVillage from "@/assets/stone-village.jpg";
import portoBridge from "@/assets/porto-bridge.jpg";
import sunsetBeach from "@/assets/sunset-beach.jpg";
import waterfall from "@/assets/waterfall.jpg";
import waterSplash from "@/assets/water-splash.jpg";
import coimbraSkyline from "@/assets/coimbra-skyline.jpg";

export type CategorySlug = "luz-que-cai" | "agua-viva" | "pedra-antiga" | "horizontes";

export type Category = {
  slug: CategorySlug;
  title: string;
  subtitle: string;
  description: string;
};

export const categories: Category[] = [
  {
    slug: "luz-que-cai",
    title: "Luz que cai",
    subtitle: "Cidades ao entardecer",
    description: "Quando o sol se inclina sobre as ruas e tudo se torna ouro por um instante. Lisboa, Porto, Coimbra — vistas no momento exato em que o dia hesita.",
  },
  {
    slug: "agua-viva",
    title: "Água viva",
    subtitle: "Rios, mar e movimento",
    description: "A água como matéria principal. Reflexo, corrente, salpico — o elemento que recusa ficar quieto, fotografado nos seus mil estados.",
  },
  {
    slug: "pedra-antiga",
    title: "Pedra antiga",
    subtitle: "Aldeias e arquitetura vernacular",
    description: "Aldeias de granito, ruas de paralelo, telhados que envelhecem ao sol. A memória que vive nos materiais.",
  },
  {
    slug: "horizontes",
    title: "Horizontes",
    subtitle: "Paisagem e silêncio",
    description: "O lugar onde a terra abre. Praias, serras, vistas largas — fotografias para respirar fundo.",
  },
];

export type Photo = {
  src: string;
  title: string;
  location: string;
  year: string;
  category: CategorySlug;
  orientation: "portrait" | "landscape" | "square";
};

export const photos: Photo[] = [
  { src: portoStreet, title: "Rua da Madrugada", location: "Porto", year: "2026", category: "luz-que-cai", orientation: "portrait" },
  { src: coimbra, title: "Sobre o Mondego", location: "Coimbra", year: "2024", category: "pedra-antiga", orientation: "square" },
  { src: river, title: "À flor da água", location: "Rio Mondego", year: "2024", category: "agua-viva", orientation: "landscape" },
  { src: villageAlley, title: "Pedra e céu", location: "Monsanto", year: "2023", category: "pedra-antiga", orientation: "portrait" },
  { src: portoBridge, title: "Dom Luís I", location: "Porto", year: "2024", category: "luz-que-cai", orientation: "landscape" },
  { src: sunsetBeach, title: "Ocaso atlântico", location: "Costa de Caparica", year: "2022", category: "horizontes", orientation: "landscape" },
  { src: stoneVillage, title: "Aldeia histórica", location: "Monsanto", year: "2023", category: "pedra-antiga", orientation: "portrait" },
  { src: waterfall, title: "Pequena queda", location: "Serra da Lousã", year: "2020", category: "agua-viva", orientation: "landscape" },
  { src: waterSplash, title: "Coroa de água", location: "Estúdio", year: "2023", category: "agua-viva", orientation: "landscape" },
  { src: coimbraSkyline, title: "Telhados de Coimbra", location: "Coimbra", year: "2023", category: "horizontes", orientation: "landscape" },
];

export function photosByCategory(slug: CategorySlug) {
  return photos.filter((p) => p.category === slug);
}

export function getCategory(slug: CategorySlug) {
  return categories.find((c) => c.slug === slug);
}
