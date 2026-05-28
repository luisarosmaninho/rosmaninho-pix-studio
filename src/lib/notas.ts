export type NotaSize = "large" | "medium" | "small" | "fragment";

export type Nota = {
  id: string;
  text: string;
  tag: "luz" | "cidade" | "tempo" | "silêncio" | "água" | "olhar";
  size: NotaSize;
};

export const notas: Nota[] = [
  {
    id: "luz-janela",
    text: "Não sei bem porque parei ali. A luz estava a atravessar o estore de uma forma que não me dava descanso.",
    tag: "luz",
    size: "large",
  },
  {
    id: "cidade-vazia",
    text: "Às sete da manhã a cidade é de outra pessoa. Nunca percebi de quem.",
    tag: "cidade",
    size: "medium",
  },
  {
    id: "camara-pausa",
    text: "Parei. Respirei. Disparei. Não sei qual dos três fez a fotografia.",
    tag: "olhar",
    size: "small",
  },
  {
    id: "rio-espelho",
    text: "A água não estava parada. Parecia.",
    tag: "água",
    size: "fragment",
  },
  {
    id: "silencio-monsanto",
    text: "Sentei-me numa pedra e fiquei quieta até o sítio se esquecer de mim.",
    tag: "silêncio",
    size: "medium",
  },
  {
    id: "sombra-hora",
    text: "Volto ao mesmo sítio a horas diferentes só para ver o que a luz decide fazer.",
    tag: "luz",
    size: "medium",
  },
  {
    id: "tempo-foto",
    text: "Há dias em que não fotografo. Fico só a ver. Não sei se é a mesma coisa.",
    tag: "tempo",
    size: "large",
  },
  {
    id: "rua-molhada",
    text: "Choveu. A rua ficou com dois céus. Fiquei com dois problemas de enquadramento.",
    tag: "cidade",
    size: "small",
  },
  {
    id: "agua-queda",
    text: "A água caía. Não fiz nada. Às vezes é isso.",
    tag: "água",
    size: "fragment",
  },
  {
    id: "olhar-cansaco",
    text: "Quando alguém esquece que existe câmara, aparece. É a única regra que não falha.",
    tag: "olhar",
    size: "medium",
  },
  {
    id: "fim-dia",
    text: "Fiquei até ao fim da luz. Depois fiquei mais um pouco, no escuro, por inércia.",
    tag: "luz",
    size: "large",
  },
  {
    id: "pausa-coimbra",
    text: "Coimbra tem escadas para todo o lado. Eventualmente o coração aceita.",
    tag: "cidade",
    size: "small",
  },
];

export function notasByTag(tag: Nota["tag"]) {
  return notas.filter((n) => n.tag === tag);
}
