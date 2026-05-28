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
    title: "Rua da Madrugada",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "Há ruas que se lembram das pessoas que já não estão." },
  },
  {
    id: "coimbra",
    src: coimbra,
    title: "Sobre o Mondego",
    category: "urbanas",
    orientation: "square",
    meta: { description: "O rio sabia onde estava mesmo quando eu não sabia." },
  },
  {
    id: "porto-bridge",
    src: portoBridge,
    title: "Dom Luís I",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "Cada ponte é uma decisão de atravessar." },
  },
  {
    id: "coimbra-skyline",
    src: coimbraSkyline,
    title: "Telhados de Coimbra",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "Vista de cima, a cidade parece uma promessa cumprida." },
  },
  {
    id: "porto-douro",
    src: portoDouro,
    title: "Janela para o Douro",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "A cidade abriu-se como um livro pela metade." },
  },
  {
    id: "arco-coimbra",
    src: arcoCoimbra,
    title: "Arco de Almedina",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "Entrar pela pedra antiga é entrar noutro tempo." },
  },
  {
    id: "village-alley",
    src: villageAlley,
    title: "Pedra e céu",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "O granito guarda o calor do dia para a noite." },
  },
  {
    id: "stone-village",
    src: stoneVillage,
    title: "Aldeia histórica",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "As pedras recordam tudo. Só nós esquecemos." },
  },
  {
    id: "farol-peniche",
    src: farolPeniche,
    title: "Farol da fortaleza",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "O farol não sabe o que guia. Sabe apenas apontar." },
  },
  {
    id: "arvore-calcada",
    src: arvoreCalcada,
    title: "Floração de maio",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "Há árvores que recusam passar despercebidas." },
  },
  {
    id: "porto-cupula",
    src: portoCupula,
    title: "Cúpula e guindaste",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "A cidade constrói-se sobre si própria, camada a camada." },
  },
  {
    id: "porto-azulejos",
    src: portoAzulejos,
    title: "Esquina de azulejo",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "O azulejo é a pele da cidade." },
  },
  {
    id: "porto-rua-calcada",
    src: portoRuaCalcada,
    title: "Rua ao entardecer",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "As ruas vazias são as mais cheias de coisas a dizer." },
  },
  {
    id: "porto-ribeira",
    src: portoRibeira,
    title: "Fachadas do Cais",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "Cada janela é uma história que não se conta." },
  },
  {
    id: "porto-luisi",
    src: portoLuisi,
    title: "Cais da Ribeira",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "A ponte pertence à cidade como o rio pertence ao mar." },
  },

  // Natureza
  {
    id: "river",
    src: river,
    title: "À flor da água",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "A água guarda tudo o que cai nela." },
  },
  {
    id: "sunset-beach",
    src: sunsetBeach,
    title: "Ocaso atlântico",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "O sol demora mais a ir do que parece." },
  },
  {
    id: "queda-agua",
    src: quedaAgua,
    title: "Espelho de outono",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "O outono tem uma luz que pede silêncio." },
  },
  {
    id: "ribeiro-musgo",
    src: ribeiroMusgo,
    title: "Ao rés do ribeiro",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "Há uma velocidade que só a água conhece." },
  },
  {
    id: "fio-agua",
    src: fioAgua,
    title: "Fio de água",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "Devagar também é uma forma de chegar." },
  },
  {
    id: "water-splash",
    src: waterSplash,
    title: "Coroa de água",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "O momento antes de cair é o mais livre." },
  },
  {
    id: "barco-douro",
    src: barcoDouro,
    title: "Barco no Douro",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "O rio é paciente. Os barcos é que chegam e partem." },
  },
  {
    id: "mar-tetrapodos",
    src: marTetrapodos,
    title: "Linha de costa",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "O mar e o betão chegaram a um acordo que nenhum dos dois recorda." },
  },

  // Retratos
  {
    id: "retrato-cidade",
    src: retratoCidade,
    title: "Olhar de relance",
    category: "retratos",
    orientation: "landscape",
    meta: { description: "Há pessoas que carregam a cidade nos olhos." },
  },
  {
    id: "retrato-esplanada",
    src: retratoEsplanada,
    title: "À beira do rio",
    category: "retratos",
    orientation: "landscape",
    meta: { description: "Estar num sítio é também uma forma de pertencer." },
  },
  {
    id: "retrato-sol",
    src: retratoSol,
    title: "Luz de fim de tarde",
    category: "retratos",
    orientation: "landscape",
    meta: { description: "O sol da tarde tem cumplicidade com quem o deixa entrar." },
  },

  // Iguarias
  {
    id: "gelado-bolacha",
    src: geladoBolacha,
    title: "Sorriso de bolacha",
    category: "iguarias",
    orientation: "landscape",
    meta: { description: "Comer devagar é também uma forma de atenção." },
  },
  {
    id: "risotto-courgette",
    src: risottoCourgette,
    title: "Risotto de curgete",
    category: "iguarias",
    orientation: "landscape",
    meta: { description: "Há refeições que são um intervalo no tempo." },
  },
  {
    id: "sandes-ribs",
    src: sandesRibs,
    title: "Sandes & batatas",
    category: "iguarias",
    orientation: "landscape",
    meta: { description: "Comida simples, feita com cuidado, é luxo suficiente." },
  },
  {
    id: "waffle-ovo",
    src: waffleOvo,
    title: "Panqueca salgada",
    category: "iguarias",
    orientation: "landscape",
    meta: { description: "O pequeno-almoço tardio tem a sua própria filosofia." },
  },
  {
    id: "ovos-mexidos",
    src: ovosMexidos,
    title: "Mexidos com tomate",
    category: "iguarias",
    orientation: "landscape",
    meta: { description: "Ovos mexidos às onze da manhã. A vida tem outro ritmo." },
  },
  {
    id: "cafe-matcha",
    src: cafeMatcha,
    title: "Mesa de dois cafés",
    category: "iguarias",
    orientation: "landscape",
    meta: { description: "Dois cafés numa mesa redonda é uma promessa de conversa." },
  },

  // Novas urbanas
  {
    id: "rua-descida",
    src: ruaDescida,
    title: "Rua em descida",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "As ruas em descida levam sempre a algum sítio melhor." },
  },
  {
    id: "janela-antiga",
    src: janelaAntiga,
    title: "Passagem suspensa",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "Entre paredes, uma janela que ainda guarda o que viu." },
  },
  {
    id: "candeeiro-rua",
    src: candeeiroRua,
    title: "Candeeiro de ferro",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "Há ornamentos que resistem ao tempo por pura teimosia." },
  },
  {
    id: "cidade-nevoa",
    src: cidadeNevoa,
    title: "Névoa da madrugada",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "A cidade acorda devagar, ainda envolta em nuvens." },
  },
  {
    id: "telhados-nevoa",
    src: telhadosNevoa,
    title: "Telhados e névoa",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "A névoa faz da cidade uma coisa à parte do mundo." },
  },
  {
    id: "cidade-cores",
    src: cidadeCores,
    title: "Casas coloridas",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "As casas pintadas são uma forma de teimar em existir." },
  },
  {
    id: "praca-fonte",
    src: pracaFonte,
    title: "Praça e fontes",
    category: "urbanas",
    orientation: "square",
    meta: { description: "A praça pertence a quem a atravessa devagar." },
  },
  {
    id: "exposicao-rua",
    src: exposicaoRua,
    title: "Corredor de luz",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "A arte ao ar livre transforma a cidade num museu sem paredes." },
  },
  {
    id: "fachada-trepadeira",
    src: fachadaTrepadeira,
    title: "Fachada viva",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "A trepadeira não pede licença — simplesmente fica." },
  },
  {
    id: "coimbra-cima",
    src: coimbraCima,
    title: "Coimbra ao sol",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "Vista de cima, a cidade é um puzzle que faz sentido." },
  },
  {
    id: "edificio-classico",
    src: edificioClassico,
    title: "Edifício clássico",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "Há edifícios que existem para lembrar o que a cidade já foi." },
  },
  {
    id: "porto-ribeira-panorama",
    src: portoRibeiraPanorama,
    title: "Gaia vista do Porto",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "O rio divide, mas também une as duas margens." },
  },
  {
    id: "metro-porto",
    src: metroPorto,
    title: "Metro do Porto",
    category: "urbanas",
    orientation: "square",
    meta: { description: "A cidade em movimento tem a sua própria cadência." },
  },

  // Novas natureza
  {
    id: "monte-outono",
    src: monteOutono,
    title: "Monte de outono",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "O outono pinta a montanha antes de a deixar nua." },
  },
  {
    id: "areia-onda",
    src: areiaOnda,
    title: "Limite da onda",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "A água avança, recua, e a areia fica como estava." },
  },
  {
    id: "mondego-figura",
    src: mondegoFigura,
    title: "Figura à beira do rio",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "Estar à beira do rio é já uma forma de regressar." },
  },

  // Novas urbanas (lote 2)
  {
    id: "porto-douro-barca",
    src: portoDouroBarca,
    title: "Cidade sobre o rio",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "A cidade acumula-se sobre a margem como quem não quer cair." },
  },
  {
    id: "rua-figura",
    src: ruaFigura,
    title: "Figura ao fundo",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "Uma silhueta transforma qualquer rua em cenário." },
  },
  {
    id: "fachada-ornamentos",
    src: fachadaOrnamentos,
    title: "Ornamentos e reflexos",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "Os ornamentos falam uma língua que ainda percebemos." },
  },
  {
    id: "dom-luis-douro",
    src: domLuisDouro,
    title: "Arco sobre o rio",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "A estrutura suspensa sobre a água — ferro e paciência." },
  },
  {
    id: "mural-reflexo",
    src: muralReflexo,
    title: "Mural duplicado",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "A poça de água decidiu guardar o mural para si." },
  },
  {
    id: "edificio-moderno",
    src: edificioModerno,
    title: "Arquitectura nova",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "A arquitectura nova não pede desculpa por existir." },
  },
  {
    id: "banco-entardecer",
    src: bancoEntardecer,
    title: "Banco vazio",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "O banco vazio guarda a forma de quem já foi." },
  },
];

export function photosByCategory(slug: CategorySlug) {
  return photos.filter((p) => p.category === slug);
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
