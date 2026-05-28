export type NotaSize = "large" | "medium" | "small" | "fragment";

export type Nota = {
  id: string;
  text: string;
  tag: "luz" | "cidade" | "tempo" | "silêncio" | "água" | "olhar";
  size: NotaSize;
};

export const notas: Nota[] = [
  {
    id: "luz-tarde-lateral",
    text: "A luz das cinco da tarde de setembro não dura mais do que vinte minutos naquele ângulo. Aprendi isso ao fim de três visitas sem fotografia nenhuma.",
    tag: "luz",
    size: "large",
  },
  {
    id: "cidade-domingo",
    text: "A cidade ao domingo de manhã não é a mesma cidade. É um ensaio a sério.",
    tag: "cidade",
    size: "medium",
  },
  {
    id: "olhar-antes",
    text: "Ponho a câmara em baixo e fico a olhar. Só depois decido se vale a pena levantar os braços.",
    tag: "olhar",
    size: "medium",
  },
  {
    id: "agua-fragmento",
    text: "O rio não está quieto. Parece.",
    tag: "água",
    size: "fragment",
  },
  {
    id: "silencio-floresta",
    text: "Há um tipo de silêncio que só existe quando estás sozinha num bosque e perceberes que paraste de pensar. Não é ausência de som — é presença de outra coisa.",
    tag: "silêncio",
    size: "large",
  },
  {
    id: "tempo-espera",
    text: "Às vezes a única coisa que separa uma fotografia boa de uma fotografia má é saber ficar mais cinco minutos.",
    tag: "tempo",
    size: "medium",
  },
  {
    id: "luz-nevoa",
    text: "A névoa não apaga a luz. Redistribui-a.",
    tag: "luz",
    size: "fragment",
  },
  {
    id: "cidade-reflexo",
    text: "Depois da chuva a cidade tem o dobro das janelas. Já não sei qual das duas versões é a real.",
    tag: "cidade",
    size: "small",
  },
  {
    id: "olhar-costas",
    text: "Fotografo muitas costas. Não é descuido — é uma escolha deliberada. As costas mentem menos.",
    tag: "olhar",
    size: "medium",
  },
  {
    id: "tempo-regresso",
    text: "Voltei ao mesmo sítio quatro vezes. Na quarta percebi que não estava à procura da fotografia — estava à procura de qualquer coisa que tinha ficado na primeira vez.",
    tag: "tempo",
    size: "large",
  },
  {
    id: "agua-margem",
    text: "Tirei os ténis. Entrei até aos joelhos. Mudou tudo.",
    tag: "água",
    size: "small",
  },
  {
    id: "silencio-espera",
    text: "Esperar não é não fazer nada. É fazer tudo com menos pressa.",
    tag: "silêncio",
    size: "small",
  },
  {
    id: "luz-fresta",
    text: "Uma fresta de dois centímetros num estore partido iluminou o chão de uma forma que me deixou parada durante minutos. A arquitetura não planeou aquilo. O tempo fez.",
    tag: "luz",
    size: "large",
  },
  {
    id: "cidade-escadas",
    text: "Coimbra é uma cidade de escadas. Eventualmente o coração aceita — e os joelhos resignam-se.",
    tag: "cidade",
    size: "small",
  },
  {
    id: "olhar-sem-camara",
    text: "Há dias em que saio sem câmara de propósito. Para treinar o olho sem a muleta do disparador.",
    tag: "olhar",
    size: "medium",
  },
  {
    id: "agua-espelho",
    text: "A água parada não reflete o que está em cima. Reflete o que está ao lado — e isso é uma coisa completamente diferente.",
    tag: "água",
    size: "medium",
  },
  {
    id: "tempo-fragmento",
    text: "Um segundo. Menos.",
    tag: "tempo",
    size: "fragment",
  },
  {
    id: "silencio-porto",
    text: "Porto às seis da manhã tem um silêncio que a cidade não parece merecer — e que oferece de qualquer forma.",
    tag: "silêncio",
    size: "medium",
  },
  {
    id: "luz-fim",
    text: "Fiquei até a luz acabar. Depois fiquei mais um pouco, no escuro, só para ter a certeza.",
    tag: "luz",
    size: "small",
  },
  {
    id: "olhar-instante",
    text: "Toda a gente viu o pôr do sol. Eu estava a olhar para a pessoa que estava a olhar para o pôr do sol.",
    tag: "olhar",
    size: "large",
  },
  {
    id: "cidade-madrugada",
    text: "Às quatro da manhã a cidade pertence a quem não tem razão nenhuma para estar acordado. É a hora mais honesta.",
    tag: "cidade",
    size: "medium",
  },
  {
    id: "agua-chuva",
    text: "Choveu três dias seguidos. Não saí. No quarto dia a luz era diferente — mais limpa, mais cansada — e valeu a espera.",
    tag: "água",
    size: "medium",
  },
  {
    id: "silencio-fragmento",
    text: "Quieta. De propósito.",
    tag: "silêncio",
    size: "fragment",
  },
  {
    id: "tempo-arquivo",
    text: "Um arquivo não é uma coleção. É uma conversa longa com o tempo — onde às vezes o tempo fala mais do que eu.",
    tag: "tempo",
    size: "large",
  },
];

export function notasByTag(tag: Nota["tag"]) {
  return notas.filter((n) => n.tag === tag);
}
