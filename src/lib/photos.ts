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

export type CategorySlug = "casamentos" | "retratos" | "lifestyle" | "branding";

export type Category = {
  slug: CategorySlug;
  title: string;
  description: string;
};

export const categories: Category[] = [
  { slug: "casamentos", title: "Casamentos", description: "Cobertura discreta, cinematográfica e cheia de alma." },
  { slug: "retratos", title: "Retratos", description: "Celebra quem és com naturalidade e luz." },
  { slug: "lifestyle", title: "Lifestyle", description: "Histórias autênticas, capturadas com leveza." },
  { slug: "branding", title: "Branding", description: "Eleva a tua marca com impacto visual e autoridade." },
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
  { src: portoStreet, title: "Rua da Madrugada", location: "Porto", year: "2026", category: "lifestyle", orientation: "portrait" },
  { src: coimbra, title: "Sobre o Mondego", location: "Coimbra", year: "2024", category: "branding", orientation: "square" },
  { src: river, title: "À flor da água", location: "Mondego", year: "2024", category: "lifestyle", orientation: "landscape" },
  { src: villageAlley, title: "Pedra e céu", location: "Monsanto", year: "2023", category: "casamentos", orientation: "portrait" },
  { src: portoBridge, title: "Dom Luís I", location: "Porto", year: "2024", category: "branding", orientation: "landscape" },
  { src: sunsetBeach, title: "Ocaso atlântico", location: "Caparica", year: "2022", category: "casamentos", orientation: "landscape" },
  { src: stoneVillage, title: "Aldeia histórica", location: "Monsanto", year: "2023", category: "retratos", orientation: "portrait" },
  { src: waterfall, title: "Pequena queda", location: "Lousã", year: "2020", category: "lifestyle", orientation: "landscape" },
  { src: waterSplash, title: "Coroa de água", location: "Estúdio", year: "2023", category: "branding", orientation: "landscape" },
  { src: coimbraSkyline, title: "Telhados de Coimbra", location: "Coimbra", year: "2023", category: "retratos", orientation: "landscape" },
];

export function photosByCategory(slug: CategorySlug) {
  return photos.filter((p) => p.category === slug);
}

export function getCategory(slug: CategorySlug) {
  return categories.find((c) => c.slug === slug);
}
