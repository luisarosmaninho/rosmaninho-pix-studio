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

export type Photo = {
  src: string;
  title: string;
  location: string;
  year: string;
  category: "Urbano" | "Paisagem" | "Água" | "Arquitetura";
  orientation: "portrait" | "landscape" | "square";
};

export const photos: Photo[] = [
  { src: portoStreet, title: "Rua da Madrugada", location: "Porto", year: "2026", category: "Urbano", orientation: "portrait" },
  { src: coimbra, title: "Sobre o Mondego", location: "Coimbra", year: "2024", category: "Arquitetura", orientation: "square" },
  { src: river, title: "À flor da água", location: "Rio Mondego", year: "2024", category: "Água", orientation: "landscape" },
  { src: villageAlley, title: "Pedra e céu", location: "Monsanto", year: "2023", category: "Arquitetura", orientation: "portrait" },
  { src: portoBridge, title: "Dom Luís I", location: "Porto", year: "2024", category: "Urbano", orientation: "landscape" },
  { src: sunsetBeach, title: "Ocaso atlântico", location: "Costa de Caparica", year: "2022", category: "Paisagem", orientation: "landscape" },
  { src: stoneVillage, title: "Aldeia histórica", location: "Monsanto", year: "2023", category: "Arquitetura", orientation: "portrait" },
  { src: waterfall, title: "Pequena queda", location: "Serra da Lousã", year: "2020", category: "Água", orientation: "landscape" },
  { src: waterSplash, title: "Coroa de água", location: "Estúdio", year: "2023", category: "Água", orientation: "landscape" },
  { src: coimbraSkyline, title: "Telhados de Coimbra", location: "Coimbra", year: "2023", category: "Paisagem", orientation: "landscape" },
];
