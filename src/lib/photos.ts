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
import retratoCidade from "@/assets/retrato-cidade.jpg";
import retratoEsplanada from "@/assets/retrato-esplanada.jpg";
import retratoSol from "@/assets/retrato-sol.jpg";
import farolPeniche from "@/assets/farol-peniche.jpg";
import arvoreCalcada from "@/assets/arvore-calcada.jpg";
import portoCupula from "@/assets/porto-cupula.jpg";
import portoAzulejos from "@/assets/porto-azulejos.jpg";
import portoRuaCalcada from "@/assets/porto-rua-calcada.jpg";
import cafeMatcha from "@/assets/cafe-matcha.jpg";
import barcoDouro from "@/assets/barco-douro.jpg";
import portoRibeira from "@/assets/porto-ribeira.jpg";
import portoLuisi from "@/assets/porto-luisi.jpg";
import marTetrapodos from "@/assets/mar-tetrapodos.jpg";
import ruaDescida from "@/assets/rua-descida.jpg";
import monteOutono from "@/assets/monte-outono.jpg";
import janelaAntiga from "@/assets/janela-antiga.jpg";
import candeeiroRua from "@/assets/candeeiro-rua.jpg";
import areiaOnda from "@/assets/areia-onda.jpg";
import cidadeNevoa from "@/assets/cidade-nevoa.png";
import telhadosNevoa from "@/assets/telhados-nevoa.jpg";
import cidadeCores from "@/assets/cidade-cores.jpg";
import pracaFonte from "@/assets/praca-fonte.jpg";
import exposicaoRua from "@/assets/exposicao-rua.jpg";
import fachadaTrepadeira from "@/assets/fachada-trepadeira.jpg";
import coimbraCima from "@/assets/coimbra-cima.jpg";
import mondegoFigura from "@/assets/mondego-figura.jpg";
import edificioClassico from "@/assets/edificio-classico.jpg";
import portoRibeiraPanorama from "@/assets/porto-ribeira-panorama.jpg";
import metroPorto from "@/assets/metro-porto.jpg";
import portoDouroBarca from "@/assets/porto-douro-barco.png";
import ruaFigura from "@/assets/rua-figura.png";
import fachadaOrnamentos from "@/assets/fachada-ornamentos.png";
import domLuisDouro from "@/assets/dom-luis-douro.jpg";
import muralReflexo from "@/assets/mural-reflexo.jpg";
import edificioModerno from "@/assets/edificio-moderno.png";
import bancoEntardecer from "@/assets/banco-entardecer.jpg";

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
  description: string;
};

export type Photo = {
  id: string;
  src: string;
  title: string;
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
    description: "Rostos, presença e o instante em que alguém se revela.",
    intro: "Um retrato não é apenas um rosto. É uma cumplicidade — breve, às vezes inesperada. Estes retratos são sobre presença: a de quem está, e a do que fica depois de ir.",
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
    id: "porto-street",
    src: portoStreet,
    title: "Silêncio emprestado",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "As quatro da manhã têm um silêncio que a cidade empresta." },
  },
  {
    id: "coimbra",
    src: coimbra,
    title: "Dois tempos",
    category: "urbanas",
    orientation: "square",
    meta: { description: "Aqui, o tempo corre em dois sentidos ao mesmo tempo." },
  },
  {
    id: "porto-bridge",
    src: portoBridge,
    title: "A resposta",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "Ferro dobrado sobre o vazio como uma resposta sem pergunta." },
  },
  {
    id: "coimbra-skyline",
    src: coimbraSkyline,
    title: "Visto de cima",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "Daqui, a desordem faz sentido." },
  },
  {
    id: "porto-douro",
    src: portoDouro,
    title: "O enquadramento",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "A moldura escolheu uma boa vista e ficou." },
  },
  {
    id: "arco-coimbra",
    src: arcoCoimbra,
    title: "Oito séculos",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "O arco não é passagem — é uma pergunta com oito séculos." },
  },
  {
    id: "village-alley",
    src: villageAlley,
    title: "Esta largura",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "Entre duas paredes, o céu tem exatamente esta largura." },
  },
  {
    id: "stone-village",
    src: stoneVillage,
    title: "Para durar",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "Construíram para durar. Não sabiam quanto." },
  },
  {
    id: "farol-peniche",
    src: farolPeniche,
    title: "Apenas apontar",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "Há coisas que existem apenas para que outras não se percam." },
  },
  {
    id: "arvore-calcada",
    src: arvoreCalcada,
    title: "Apesar da calçada",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "A calçada suportou tudo. A árvore, floresceu na mesma." },
  },
  {
    id: "porto-cupula",
    src: portoCupula,
    title: "Sem se entenderem",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "O guindaste e a cúpula partilham o mesmo céu sem se entenderem." },
  },
  {
    id: "porto-azulejos",
    src: portoAzulejos,
    title: "Mão diferente",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "Cada padrão repetido foi pintado por uma mão diferente." },
  },
  {
    id: "porto-rua-calcada",
    src: portoRuaCalcada,
    title: "Cinco minutos antes",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "Cinco minutos antes de acontecer tudo." },
  },
  {
    id: "porto-ribeira",
    src: portoRibeira,
    title: "Vinte e tal janelas",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "Sete andares, vinte e tal janelas, e nenhuma igual à de baixo." },
  },
  {
    id: "porto-luisi",
    src: portoLuisi,
    title: "A que sabe",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "O rio não sabe que existe. A ponte, sabe." },
  },

  // Natureza
  {
    id: "river",
    src: river,
    title: "Por baixo",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "Debaixo da superfície, tudo continua na mesma." },
  },
  {
    id: "sunset-beach",
    src: sunsetBeach,
    title: "O peso do dia",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "O horizonte aguentou o peso do dia até ao fim." },
  },
  {
    id: "queda-agua",
    src: quedaAgua,
    title: "Sem barulho",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "A queda de água não faz barulho na fotografia." },
  },
  {
    id: "ribeiro-musgo",
    src: ribeiroMusgo,
    title: "Muito antes",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "Havia musgo aqui muito antes de haver mais alguma coisa." },
  },
  {
    id: "fio-agua",
    src: fioAgua,
    title: "A duvidar",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "Tão fina que parece duvidar de si própria." },
  },
  {
    id: "water-splash",
    src: waterSplash,
    title: "Um segundo",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "Um segundo de geometria perfeita antes do caos." },
  },
  {
    id: "barco-douro",
    src: barcoDouro,
    title: "O que ficou",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "O barco parou. O rio não." },
  },
  {
    id: "mar-tetrapodos",
    src: marTetrapodos,
    title: "A fronteira",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "O mar testou a fronteira. A fronteira segurou." },
  },

  // Retratos
  {
    id: "retrato-cidade",
    src: retratoCidade,
    title: "Não era para mim",
    category: "retratos",
    orientation: "landscape",
    meta: { description: "Não estava a olhar para mim. Ainda bem." },
  },
  {
    id: "retrato-esplanada",
    src: retratoEsplanada,
    title: "Já pertencia",
    category: "retratos",
    orientation: "landscape",
    meta: { description: "Pertencia àquele lugar muito antes de eu chegar." },
  },
  {
    id: "retrato-sol",
    src: retratoSol,
    title: "Bem-vinda",
    category: "retratos",
    orientation: "landscape",
    meta: { description: "A luz entrou sem pedir. Foi bem-vinda." },
  },

  // Iguarias
  {
    id: "gelado-bolacha",
    src: geladoBolacha,
    title: "Não consegui",
    category: "iguarias",
    orientation: "landscape",
    meta: { description: "Devia ter comido mais devagar. Não consegui." },
  },
  {
    id: "risotto-courgette",
    src: risottoCourgette,
    title: "Com tempo",
    category: "iguarias",
    orientation: "landscape",
    meta: { description: "Feito com o tempo que a maioria das pessoas não tem." },
  },
  {
    id: "sandes-ribs",
    src: sandesRibs,
    title: "Anos a aprender",
    category: "iguarias",
    orientation: "landscape",
    meta: { description: "A simplicidade desta mesa custou anos a aprender." },
  },
  {
    id: "waffle-ovo",
    src: waffleOvo,
    title: "Nem almoço nem",
    category: "iguarias",
    orientation: "landscape",
    meta: { description: "Não é almoço. Não é pequeno-almoço. É outra coisa." },
  },
  {
    id: "ovos-mexidos",
    src: ovosMexidos,
    title: "Às onze",
    category: "iguarias",
    orientation: "landscape",
    meta: { description: "Às onze da manhã, o mundo ainda é solucionável." },
  },
  {
    id: "cafe-matcha",
    src: cafeMatcha,
    title: "Só um ficou",
    category: "iguarias",
    orientation: "landscape",
    meta: { description: "Dois copos. Só um ficou cheio de conversa." },
  },

  // Novas urbanas
  {
    id: "rua-descida",
    src: ruaDescida,
    title: "A inclinação",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "Não se escolhe o destino. Escolhe-se a inclinação." },
  },
  {
    id: "janela-antiga",
    src: janelaAntiga,
    title: "Frase interrompida",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "A janela atravessa a rua como uma frase interrompida." },
  },
  {
    id: "candeeiro-rua",
    src: candeeiroRua,
    title: "Séculos a iluminar",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "Iluminou séculos de diferentes pessoas a passar." },
  },
  {
    id: "cidade-nevoa",
    src: cidadeNevoa,
    title: "Como quem não quer",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "A névoa entrou pela cidade como quem não quer ser visto." },
  },
  {
    id: "telhados-nevoa",
    src: telhadosNevoa,
    title: "Por resolver",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "Com névoa suficiente, tudo fica por resolver." },
  },
  {
    id: "cidade-cores",
    src: cidadeCores,
    title: "Opinião muito firme",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "Cada cor foi escolhida por alguém com uma opinião muito firme." },
  },
  {
    id: "praca-fonte",
    src: pracaFonte,
    title: "Independentemente",
    category: "urbanas",
    orientation: "square",
    meta: { description: "A fonte funciona independentemente de haver alguém a ver." },
  },
  {
    id: "exposicao-rua",
    src: exposicaoRua,
    title: "Sem autorização",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "Pintaram a rua sem pedir autorização à rua." },
  },
  {
    id: "fachada-trepadeira",
    src: fachadaTrepadeira,
    title: "Até ser tarde",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "A planta invadiu devagar. Ninguém reparou até ser tarde." },
  },
  {
    id: "coimbra-cima",
    src: coimbraCima,
    title: "Parece planeada",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "A desordem vista de cima parece planeada." },
  },
  {
    id: "edificio-classico",
    src: edificioClassico,
    title: "Ainda funciona",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "Construído para impressionar. Ainda funciona." },
  },
  {
    id: "porto-ribeira-panorama",
    src: portoRibeiraPanorama,
    title: "Sem se aproximar",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "Duas margens a olhar uma para a outra sem se aproximar." },
  },
  {
    id: "metro-porto",
    src: metroPorto,
    title: "Um segundo depois",
    category: "urbanas",
    orientation: "square",
    meta: { description: "Estava ali um segundo. Depois não estava." },
  },

  // Novas natureza
  {
    id: "monte-outono",
    src: monteOutono,
    title: "Sem avisar ninguém",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "Em novembro, a montanha troca de cor sem avisar ninguém." },
  },
  {
    id: "areia-onda",
    src: areiaOnda,
    title: "Era suficiente",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "A onda chegou até aqui. Decidiu que era suficiente." },
  },
  {
    id: "mondego-figura",
    src: mondegoFigura,
    title: "Na dúvida",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "Não sei se estava a chegar ou a partir. Fotografei na dúvida." },
  },

  // Novas urbanas (lote 2)
  {
    id: "porto-douro-barca",
    src: portoDouroBarca,
    title: "Debruçada",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "A cidade debruçou-se sobre o rio e ficou assim." },
  },
  {
    id: "rua-figura",
    src: ruaFigura,
    title: "Agora não há",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "Havia alguém ao fundo da rua. Agora não há." },
  },
  {
    id: "fachada-ornamentos",
    src: fachadaOrnamentos,
    title: "Sem pressa",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "Quem esculpiu isto não estava com pressa." },
  },
  {
    id: "dom-luis-douro",
    src: domLuisDouro,
    title: "Ferro e rio",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "Travessia em ferro. O rio continuou na mesma." },
  },
  {
    id: "mural-reflexo",
    src: muralReflexo,
    title: "A melhor versão",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "A versão refletida é melhor." },
  },
  {
    id: "edificio-moderno",
    src: edificioModerno,
    title: "Tudo o que precisava",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "Betão e ângulo. Tudo o que precisava de ser." },
  },
  {
    id: "banco-entardecer",
    src: bancoEntardecer,
    title: "Toda a hora",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "Ninguém se sentou durante toda a hora que aqui estive." },
  },
];

export function photosByCategory(slug: CategorySlug) {
  return photos.filter((p) => p.category === slug);
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
