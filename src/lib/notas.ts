export type NotaSize = "large" | "medium" | "small" | "fragment";

export type Nota = {
  id: string;
  date: string;
  text: string;
  tag: "luz" | "cidade" | "tempo" | "silêncio" | "água" | "olhar";
  size: NotaSize;
  location?: string;
  time?: string;
};

export const notas: Nota[] = [
  {
    id: "luz-janela",
    date: "2026-04-03",
    text: "A luz de fim de tarde não pede licença. Entra, pousa no chão como quem conhece a casa, e vai-se antes que te lembres de agradecer.",
    tag: "luz",
    size: "large",
    location: "Coimbra",
    time: "18:40",
  },
  {
    id: "cidade-vazia",
    date: "2026-03-22",
    text: "Há uma versão da cidade que só existe antes das oito da manhã. Mais honesta. Menos ensaiada.",
    tag: "cidade",
    size: "medium",
    location: "Porto",
    time: "07:08",
  },
  {
    id: "camara-pausa",
    date: "2026-03-09",
    text: "Antes de disparar, paro. Esse segundo de pausa é metade da fotografia.",
    tag: "olhar",
    size: "small",
  },
  {
    id: "rio-espelho",
    date: "2026-02-18",
    text: "O rio não reflete o céu. Inventa uma versão melhor dele.",
    tag: "água",
    size: "fragment",
    location: "Mondego",
  },
  {
    id: "silencio-monsanto",
    date: "2025-12-14",
    text: "Em Monsanto não há silêncio completo — há granito a respirar. Aprende-se a distinguir.",
    tag: "silêncio",
    size: "medium",
    location: "Monsanto",
    time: "11:15",
  },
  {
    id: "sombra-hora",
    date: "2025-11-30",
    text: "A sombra muda a cada hora. Fotografar o mesmo sítio ao meio-dia e às quatro da tarde é fotografar dois lugares diferentes.",
    tag: "luz",
    size: "medium",
  },
  {
    id: "tempo-foto",
    date: "2025-10-07",
    text: "Uma fotografia não congela o tempo. Faz-lhe uma pergunta que ele não pode responder.",
    tag: "tempo",
    size: "large",
    location: "Coimbra",
    time: "14:22",
  },
  {
    id: "rua-molhada",
    date: "2025-09-19",
    text: "As ruas molhadas dobram a cidade. De repente há duas versões de tudo — e a de baixo é sempre mais suave.",
    tag: "cidade",
    size: "small",
    location: "Lisboa",
    time: "19:10",
  },
  {
    id: "agua-queda",
    date: "2025-08-02",
    text: "A água que cai não pensa. É a única coisa no mundo completamente livre de intenção.",
    tag: "água",
    size: "fragment",
  },
  {
    id: "olhar-cansaco",
    date: "2025-07-14",
    text: "Os melhores olhares são os distraídos. Quando alguém esquece que está a ser fotografado, aparece.",
    tag: "olhar",
    size: "medium",
  },
  {
    id: "fim-dia",
    date: "2025-06-21",
    text: "O solstício de verão. A luz durou tanto que me esqueci de fotografar — fiquei só a ver.",
    tag: "luz",
    size: "large",
    location: "Peniche",
    time: "21:03",
  },
  {
    id: "pausa-coimbra",
    date: "2025-05-08",
    text: "Coimbra desce para o rio como quem não quer. Devagar, de vielas, com pausas para o coração.",
    tag: "cidade",
    size: "small",
    location: "Coimbra",
  },
];

export function notasByTag(tag: Nota["tag"]) {
  return notas.filter((n) => n.tag === tag);
}

export function formatNotaDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-PT", { day: "numeric", month: "long", year: "numeric" });
}
