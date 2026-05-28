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
    title: "Âmbar ao fundo",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "Os candeeiros acendem antes de o sol desaparecer. As cadeiras esperam." },
  },
  {
    id: "coimbra",
    src: coimbra,
    title: "A encosta e as nuvens",
    category: "urbanas",
    orientation: "square",
    meta: { description: "A cidade cresceu de costas para o rio e de frente para o céu." },
  },
  {
    id: "porto-bridge",
    src: portoBridge,
    title: "O arco sobre a barca",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "O ferro dobra-se sobre a água. A barca não precisa de pressa." },
  },
  {
    id: "coimbra-skyline",
    src: coimbraSkyline,
    title: "Mais céu do que cidade",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "Há dias em que o horizonte engole tudo o resto." },
  },
  {
    id: "porto-douro",
    src: portoDouro,
    title: "Entre paredes, o rio",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "O rio aparece no fim de cada rua, como uma promessa." },
  },
  {
    id: "arco-coimbra",
    src: arcoCoimbra,
    title: "A penumbra do arco",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "Há sempre uma sombra fria por baixo das pedras mais velhas." },
  },
  {
    id: "village-alley",
    src: villageAlley,
    title: "Granito e nuvens brancas",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "A pedra aquece ao sol. As varandas guardam flores de cor." },
  },
  {
    id: "stone-village",
    src: stoneVillage,
    title: "A bandeira vermelha",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "Uma bandeira vermelha, uma sombra longa, uma rua de granito." },
  },
  {
    id: "farol-peniche",
    src: farolPeniche,
    title: "A torre vermelha",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "Alguém sentou-se na pedra e ficou a olhar para o que não se vê daqui." },
  },
  {
    id: "arvore-calcada",
    src: arvoreCalcada,
    title: "A árvore mais barulhenta da rua",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "A primavera faz barulho quando uma árvore inteira decide florescer de vez." },
  },
  {
    id: "porto-cupula",
    src: portoCupula,
    title: "O novo não esperou",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "A cúpula manteve-se. A grua apareceu sem pedir licença." },
  },
  {
    id: "porto-azulejos",
    src: portoAzulejos,
    title: "O canto verde-escuro",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "Os azulejos guardam a cor mesmo quando os ramos ficam sem folhas." },
  },
  {
    id: "porto-rua-calcada",
    src: portoRuaCalcada,
    title: "Antes de fechar",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "A calçada molha-se de luz ao fim do dia. A árvore sabe o que vem a seguir." },
  },
  {
    id: "porto-ribeira",
    src: portoRibeira,
    title: "Roupa estendida e ferro forjado",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "As fachadas guardam histórias atrás de cada varanda." },
  },
  {
    id: "porto-luisi",
    src: portoLuisi,
    title: "O que a margem vê",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "O cais não para. A ponte e o convento observam em silêncio." },
  },

  // Natureza
  {
    id: "river",
    src: river,
    title: "À altura da corrente",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "O rio é transparente quando se olha de perto." },
  },
  {
    id: "sunset-beach",
    src: sunsetBeach,
    title: "Quem ficou até ao fim",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "O pôr-do-sol não se partilha bem. Esta pessoa percebeu." },
  },
  {
    id: "queda-agua",
    src: quedaAgua,
    title: "Queda dupla",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "A água cai. O outono reflete-se na poça que ficou." },
  },
  {
    id: "ribeiro-musgo",
    src: ribeiroMusgo,
    title: "Muito perto do chão",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "Há um ribeiro que ninguém vê se não se agachar." },
  },
  {
    id: "fio-agua",
    src: fioAgua,
    title: "Antes de se perder",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "A água existe por um momento em que ainda é forma." },
  },
  {
    id: "water-splash",
    src: waterSplash,
    title: "A coroa",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "Uma fração de segundo com forma de coroa." },
  },
  {
    id: "barco-douro",
    src: barcoDouro,
    title: "Bandeirinhas ao vento",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "O barco está parado. As bandeirinhas não se importam." },
  },
  {
    id: "mar-tetrapodos",
    src: marTetrapodos,
    title: "Os dentes do molhe",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "O betão segura o mar. Ao fundo, a cidade deixa-se ver." },
  },

  // Retratos
  {
    id: "retrato-cidade",
    src: retratoCidade,
    title: "Apanhado a olhar",
    category: "retratos",
    orientation: "landscape",
    meta: { description: "Estava a ir embora quando olhou para trás." },
  },
  {
    id: "retrato-esplanada",
    src: retratoEsplanada,
    title: "Tempo de esplanada",
    category: "retratos",
    orientation: "landscape",
    meta: { description: "O outono ficou atrás dele. Ele não parecia incomodar-se." },
  },
  {
    id: "retrato-sol",
    src: retratoSol,
    title: "Em modo de espera",
    category: "retratos",
    orientation: "landscape",
    meta: { description: "Os óculos escuros e a mão no queixo. Alguém está a pensar em qualquer coisa." },
  },

  // Iguarias
  {
    id: "gelado-bolacha",
    src: geladoBolacha,
    title: "Os dois sorriam",
    category: "iguarias",
    orientation: "landscape",
    meta: { description: "Dois gelados com bolacha de sorriso. Ninguém tinha de escolher." },
  },
  {
    id: "risotto-courgette",
    src: risottoCourgette,
    title: "Amarelo com verde dentro",
    category: "iguarias",
    orientation: "landscape",
    meta: { description: "O arroz cremoso guardou as rodelas de curgete dentro de si." },
  },
  {
    id: "sandes-ribs",
    src: sandesRibs,
    title: "O pão de sementes pretas",
    category: "iguarias",
    orientation: "landscape",
    meta: { description: "Tudo o que cabe num pão, mais batatas fritas do lado." },
  },
  {
    id: "waffle-ovo",
    src: waffleOvo,
    title: "O ovo ganhou",
    category: "iguarias",
    orientation: "landscape",
    meta: { description: "O ovo estrelado encontrou o waffle e o abacate. Ninguém ficou a perder." },
  },
  {
    id: "ovos-mexidos",
    src: ovosMexidos,
    title: "Dois tomates no topo",
    category: "iguarias",
    orientation: "landscape",
    meta: { description: "Os ovos mexidos foram parar à torrada. Os tomates assentiram." },
  },
  {
    id: "cafe-matcha",
    src: cafeMatcha,
    title: "Mesa redonda, duas escolhas",
    category: "iguarias",
    orientation: "landscape",
    meta: { description: "O matcha e o chantilly. A torrada ao meio. Nenhuma escolha foi errada." },
  },

  // Novas urbanas
  {
    id: "rua-descida",
    src: ruaDescida,
    title: "Ainda não chegou ao fim",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "A rua desce e não avisa onde vai acabar." },
  },
  {
    id: "janela-antiga",
    src: janelaAntiga,
    title: "Proibido parar aqui",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "Uma passagem aérea entre dois prédios, sinais que ninguém lê." },
  },
  {
    id: "candeeiro-rua",
    src: candeeiroRua,
    title: "O espiral de ferro",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "O candeeiro não precisa de justificar a sua forma." },
  },
  {
    id: "cidade-nevoa",
    src: cidadeNevoa,
    title: "A névoa ficou entre os montes",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "A cidade acorda antes da névoa se ir embora." },
  },
  {
    id: "telhados-nevoa",
    src: telhadosNevoa,
    title: "O mar de nuvens",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "A névoa fica presa entre os montes. Os telhados ficam de fora." },
  },
  {
    id: "cidade-cores",
    src: cidadeCores,
    title: "Cada um escolheu a sua cor",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "Nenhuma janela combina com a do lado e ainda assim ficou bem." },
  },
  {
    id: "praca-fonte",
    src: pracaFonte,
    title: "Repuxos e pedra",
    category: "urbanas",
    orientation: "square",
    meta: { description: "A água sobe antes de cair. A pedra fica onde sempre esteve." },
  },
  {
    id: "exposicao-rua",
    src: exposicaoRua,
    title: "Uma exposição ao relento",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "As fotografias ficaram na rua. Os passantes param por um segundo." },
  },
  {
    id: "fachada-trepadeira",
    src: fachadaTrepadeira,
    title: "A fachada que virou jardim",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "A trepadeira não pediu autorização para cobrir tudo." },
  },
  {
    id: "coimbra-cima",
    src: coimbraCima,
    title: "Laranja e azul",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "Os telhados laranjas e o céu azul não precisam de mais nada entre eles." },
  },
  {
    id: "edificio-classico",
    src: edificioClassico,
    title: "Os fios e o edifício",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "Os fios elétricos não respeitam a arquitetura. Talvez nem precisem." },
  },
  {
    id: "porto-ribeira-panorama",
    src: portoRibeiraPanorama,
    title: "Laranja sobre o rio",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "Visto de longe, tudo se encaixa: o rio, os telhados, a encosta." },
  },
  {
    id: "metro-porto",
    src: metroPorto,
    title: "O novo e o velho lado a lado",
    category: "urbanas",
    orientation: "square",
    meta: { description: "O metro passa. Atrás dele, a pedra não se mexeu." },
  },

  // Novas natureza
  {
    id: "monte-outono",
    src: monteOutono,
    title: "O monte pegou fogo ao outono",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "O amarelo e o laranja espalharam-se pelo monte antes do fim do dia." },
  },
  {
    id: "areia-onda",
    src: areiaOnda,
    title: "A linha branca",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "A onda chega, deixa um risco branco de espuma e vai-se embora." },
  },
  {
    id: "mondego-figura",
    src: mondegoFigura,
    title: "De pedra em pedra",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "Parou no meio do rio. A cidade ficou para trás, os pássaros à frente." },
  },

  // Novas urbanas (lote 2)
  {
    id: "porto-douro-barca",
    src: portoDouroBarca,
    title: "Da água, a cidade",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "A barca passa. A cidade acumula-se para cima." },
  },
  {
    id: "rua-figura",
    src: ruaFigura,
    title: "Uma figura ao longe",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "No fim da rua há sempre alguém que não tem pressa nenhuma." },
  },
  {
    id: "fachada-ornamentos",
    src: fachadaOrnamentos,
    title: "Pedra lavrada e vidro azul",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "Os ornamentos de pedra multiplicam-se até ao topo. As janelas guardam o céu dentro." },
  },
  {
    id: "dom-luis-douro",
    src: domLuisDouro,
    title: "Dois andares de ferro",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "A ponte tem dois pisos e o rio não escolhe nenhum deles." },
  },
  {
    id: "mural-reflexo",
    src: muralReflexo,
    title: "O mural ao contrário",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "A chuva deixou uma poça. O mural duplicou-se sem avisar." },
  },
  {
    id: "edificio-moderno",
    src: edificioModerno,
    title: "Blocos e sombra",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "O edifício recusa a linha reta. As varandas mergulham na sombra." },
  },
  {
    id: "banco-entardecer",
    src: bancoEntardecer,
    title: "O banco vazio",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "Ninguém ficou. O entardecer aqueceu a pedra de qualquer maneira." },
  },
];

export function photosByCategory(slug: CategorySlug) {
  return photos.filter((p) => p.category === slug);
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
