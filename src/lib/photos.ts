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
import marPanorama from "@/assets/mar-panorama.jpg";
import marNuvens from "@/assets/mar-nuvens.jpg";
import marVasto from "@/assets/mar-vasto.jpg";
import marCalmo from "@/assets/mar-calmo.jpg";
import marEdificio from "@/assets/mar-edificio.jpg";
import fabricaCabo from "@/assets/fabrica-cabo.jpg";
import praiaLonga from "@/assets/praia-longa.jpg";
import farolEntrada from "@/assets/farol-entrada.jpg";
import costaVila from "@/assets/costa-vila.jpg";
import costaFloresta from "@/assets/costa-floresta.jpg";
import farolFrente from "@/assets/farol-frente.jpg";
import hamburquerTabua from "@/assets/hamburguer-tabua.jpg";
import cocktailFrasco from "@/assets/cocktail-frasco.jpg";

export type CategorySlug = "urbanas" | "natureza" | "retratos" | "iguarias";

export type Category = {
  slug: CategorySlug;
  title: string;
  description: string;
  cover: string;
  excerpt: string;
  intro: string;
  introBody: string[];
  note: string;
  quote: string;
  quoteSource: string;
};

export type PhotoMeta = {
  description: string;
  conditions?: string;
  date?: string;
  location?: string;
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
    description: "A cidade como coisa viva. Ruas, pontes, telhados — e tudo o que insiste em ficar.",
    cover: "porto-street",
    excerpt: "Observar a cidade é deixar que as ruas me mostrem o que os olhos distraídos já não veem.",
    intro: "Há dias em que saio de casa sem qualquer plano. Levo a máquina fotográfica porque já aprendi que as melhores imagens raramente aparecem quando as procuramos diretamente.",
    introBody: [
      "Durante muito tempo pensei que fotografava ruas. Hoje percebo que fotografo pausas. Fotografo a luz que fica presa numa fachada durante alguns minutos. Fotografo cadeiras vazias à espera de alguém. Fotografo montras ainda apagadas antes da cidade acordar. Fotografo sombras que aparecem e desaparecem sem pedir licença.",
      "Gosto das cidades quando ainda estão distraídas. Quando não sentem necessidade de impressionar ninguém. Quando existem apenas porque existem.",
      "Muitas destas fotografias nasceram em caminhadas longas por Coimbra, Porto e outros lugares que fui aprendendo a observar devagar. Algumas surgiram depois de um café. Outras apareceram enquanto esperava por nada em particular.",
      "Com o tempo percebi que as cidades têm memória. Guardam histórias nas paredes, nos passeios, nas janelas e nos detalhes que quase ninguém repara.",
      "Esta coleção é uma tentativa de guardar essas pequenas permanências. Não a cidade dos postais. Mas a cidade vivida. A cidade que continua a existir quando ninguém está a olhar.",
    ],
    note: "Série em curso · Portugal · 2022–presente",
    quote: "A cidade é um arquivo de gestos esquecidos.",
    quoteSource: "L.R.",
  },
  {
    slug: "natureza",
    title: "Natureza",
    description: "Água, luz, paisagem. O tempo lento dos lugares que não têm pressa de nada.",
    cover: "sunset-beach",
    excerpt: "Nem sempre procuro a natureza. Muitas vezes é ela que me encontra.",
    intro: "Nem sempre procuro a natureza. Muitas vezes é ela que me encontra. Acontece quando decido parar junto ao rio durante mais alguns minutos. Quando a névoa demora a desaparecer.",
    introBody: [
      "Talvez por isso nunca tenha sentido necessidade de procurar paisagens perfeitas. O que me interessa é a mudança. A água nunca é a mesma. O céu nunca regressa igual. As estações continuam o seu trabalho sem pedir autorização a ninguém.",
      "Há qualquer coisa de profundamente tranquilizadora em observar algo que não precisa de nós para existir. Quando fotografo natureza sinto-me mais observadora do que autora. Estou apenas presente. Estou apenas ali.",
      "Estas imagens nasceram dessa relação silenciosa com lugares onde o tempo parece andar mais devagar. Não procuram explicar a paisagem. Procuram permanecer junto dela durante mais alguns instantes.",
    ],
    note: "Série aberta · Norte e Centro de Portugal · 2021–presente",
    quote: "A paisagem não precisa de ser perfeita para ser completa.",
    quoteSource: "caderno de campo",
  },
  {
    slug: "retratos",
    title: "Retratos",
    description: "Rostos, presença. O instante antes de alguém voltar a estar em guarda.",
    cover: "retrato-sol",
    excerpt: "Durante muito tempo tive receio de fotografar pessoas. As ruas não ficam nervosas. As árvores não se preocupam com a sua aparência.",
    intro: "Durante muito tempo tive receio de fotografar pessoas. As ruas não ficam nervosas. As árvores não se preocupam com a sua aparência. Os edifícios não perguntam se ficaram bem na fotografia.",
    introBody: [
      "Mas foi precisamente isso que me fez gostar cada vez mais de retratos. O momento que mais me interessa não é a pose. Nem o sorriso. Nem a expressão ensaiada. É aquele segundo raro em que alguém se esquece da câmara.",
      "O instante em que deixa de representar uma versão de si próprio e regressa simplesmente a quem é. É aí que encontro as fotografias de que mais gosto.",
      "Cada retrato é um encontro. Uma conversa silenciosa. Uma troca de atenção entre quem fotografa e quem é fotografado. Talvez seja por isso que nenhum retrato é apenas sobre a outra pessoa. Há sempre um pouco de mim dentro da fotografia também.",
      "Esta coleção reúne precisamente esses encontros. Pequenos momentos de presença guardados no tempo.",
    ],
    note: "Série de autor · Portugal · selecção 2023–2025",
    quote: "Fotografar alguém é uma forma de atenção.",
    quoteSource: "L.R.",
  },
  {
    slug: "iguarias",
    title: "Iguarias",
    description: "Mesas, texturas. O instante antes do primeiro garfo.",
    cover: "cafe-matcha",
    excerpt: "Sempre gostei de lugares onde as pessoas ficam mais tempo do que era necessário. Talvez seja por isso que gosto tanto de cafés. Talvez seja por isso que gosto tanto de matcha.",
    intro: "Sempre gostei de lugares onde as pessoas ficam mais tempo do que era necessário. Talvez seja por isso que gosto tanto de cafés. Talvez seja por isso que muitas das minhas fotografias nascem à volta de mesas.",
    introBody: [
      "Um café nunca é apenas um café. Um matcha nunca é apenas um matcha. Uma refeição nunca é apenas comida. São pausas. São conversas. São momentos onde o relógio abranda sem que ninguém repare.",
      "Grande parte das memórias que guardo estão associadas a uma mesa, uma janela, uma chávena ou uma conversa que durou mais do que o previsto. Quando fotografo estes momentos não estou a fotografar apenas sabores. Estou a fotografar permanência.",
      "Estou a fotografar os pequenos rituais que dão forma aos dias. O vapor que desaparece. A luz que entra pela janela. As cadeiras vazias depois de todos terem ido embora. As mãos pousadas sobre a mesa.",
      "No fundo, esta coleção fala da mesma coisa que todas as outras. Do tempo. E da tentativa de guardar alguns dos seus momentos antes que desapareçam.",
    ],
    note: "Série de gastronomia · trabalho comercial e pessoal · 2022–presente",
    quote: "A comida é a única arte que desaparece ao ser apreciada.",
    quoteSource: "observação de mesa",
  },
];

export const photos: Photo[] = [
  // Urbanas
  {
    id: "porto-street",
    src: portoStreet,
    title: "Quando ainda havia luz",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "Havia luz suficiente para uma última fotografia. Depois os candeeiros tomaram conta.", conditions: "entardecer · luz rasante · inverno" },
  },
  {
    id: "coimbra",
    src: coimbra,
    title: "O que a cidade não controla",
    category: "urbanas",
    orientation: "square",
    meta: { description: "Há cidades que crescem para cima porque o chão não chega. Esta é uma delas." },
  },
  {
    id: "porto-bridge",
    src: portoBridge,
    title: "O ferro que ficou",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "O ferro não pede desculpa pela sua presença. Simplesmente fica." },
  },
  {
    id: "coimbra-skyline",
    src: coimbraSkyline,
    title: "O horizonte que não se fecha",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "Neste dia, o céu era mais cidade do que a cidade.", conditions: "nuvens altas · vento fraco · outono" },
  },
  {
    id: "porto-douro",
    src: portoDouro,
    title: "A promessa no fim da rua",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "Virar a esquina e encontrar o rio foi sempre a melhor parte." },
  },
  {
    id: "arco-coimbra",
    src: arcoCoimbra,
    title: "O frio da pedra antiga",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "A pedra guarda o frio mesmo no verão. É a sua forma de memória.", conditions: "manhã · pedra molhada · inverno" },
  },
  {
    id: "village-alley",
    src: villageAlley,
    title: "Uma tarde sem sobressaltos",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "Nada acontecia. Era exatamente o que precisava de acontecer." },
  },
  {
    id: "stone-village",
    src: stoneVillage,
    title: "A única cor na rua",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "No granito cinzento, uma cor decidiu ficar." },
  },
  {
    id: "farol-peniche",
    src: farolPeniche,
    title: "Sentinela",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "Não se sabe o que estava a ver. Mas ficou muito tempo a ver.", conditions: "vento forte · mar agitado · maio" },
  },
  {
    id: "arvore-calcada",
    src: arvoreCalcada,
    title: "A primavera não avisou",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "Não houve aviso. De um dia para o outro, a rua estava branca." },
  },
  {
    id: "porto-cupula",
    src: portoCupula,
    title: "Enquanto ninguém olhava",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "A cúpula resistiu a tudo menos ao tempo. A grua não resistiu ao orgulho." },
  },
  {
    id: "porto-azulejos",
    src: portoAzulejos,
    title: "O azulejo que não esqueceu",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "O inverno tirou as folhas. Os azulejos ficaram com a mesma cor de sempre." },
  },
  {
    id: "porto-rua-calcada",
    src: portoRuaCalcada,
    title: "A hora em que a rua respira",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "Há uma hora em que a rua deixa de ser de toda a gente e passa a ser de ninguém." },
  },
  {
    id: "porto-ribeira",
    src: portoRibeira,
    title: "Antes do vento",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "Uma varanda sabe mais da rua do que quem passa nela.", conditions: "névoa leve · manhã cedo · fevereiro" },
  },
  {
    id: "porto-luisi",
    src: portoLuisi,
    title: "Do lado de quem fica",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "A Ribeira ao entardecer tem uma cor que o Porto não exporta para os postais. Fica-se ali a guardar." },
  },

  // Natureza
  {
    id: "river",
    src: river,
    title: "Quando a água ainda é visível",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "A água era tão limpa que parecia não existir. Só se via o fundo." },
  },
  {
    id: "sunset-beach",
    src: sunsetBeach,
    title: "A solidão que não pesa",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "Havia alguém. Ficou até ao fim. Não precisava de mais ninguém ali.", conditions: "pôr do sol · vento calmo · outubro" },
  },
  {
    id: "queda-agua",
    src: quedaAgua,
    title: "O que o outono guarda",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "A água caiu e o outono estava lá dentro, à espera." },
  },
  {
    id: "ribeiro-musgo",
    src: ribeiroMusgo,
    title: "O que existe só para quem se agacha",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "É preciso descer até ao chão para perceber que existe.", conditions: "sombra fechada · humidade · ribeiro" },
  },
  {
    id: "fio-agua",
    src: fioAgua,
    title: "Forma antes de cair",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "Durou menos de um segundo com aquela forma. Foi suficiente." },
  },
  {
    id: "water-splash",
    src: waterSplash,
    title: "Geometria da queda",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "Há uma geometria na queda que só dura um instante. Aqui ficou." },
  },
  {
    id: "barco-douro",
    src: barcoDouro,
    title: "Festa sem data",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "O barco não saiu. As bandeirinhas comportaram-se como se fosse festa na mesma." },
  },
  {
    id: "mar-tetrapodos",
    src: marTetrapodos,
    title: "A fronteira de betão",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "Havia betão e havia mar. Entre os dois, uma negociação antiga." },
  },

  // Retratos
  {
    id: "retrato-cidade",
    src: retratoCidade,
    title: "Estava quase a ir embora",
    category: "retratos",
    orientation: "landscape",
    meta: { description: "Estava de costas para o mundo. Quando se voltou, trazia ainda o olhar de quem estava noutro sítio. Disparei antes de ele chegar completamente." },
  },
  {
    id: "retrato-esplanada",
    src: retratoEsplanada,
    title: "Alguém que não contava o tempo",
    category: "retratos",
    orientation: "landscape",
    meta: { description: "O outono estava a acontecer mesmo atrás dele. Ele tinha o olhar noutro sítio — naquele estado de presença ausente que só os sossegados conseguem." },
  },
  {
    id: "retrato-sol",
    src: retratoSol,
    title: "Um pensamento por terminar",
    category: "retratos",
    orientation: "landscape",
    meta: { description: "A mão no queixo. Os óculos escuros. Um pensamento que ainda não acabou." },
  },

  // Iguarias
  {
    id: "gelado-bolacha",
    src: geladoBolacha,
    title: "O que não precisava de ser escolhido",
    category: "iguarias",
    orientation: "landscape",
    meta: { description: "Duas bolachas com sorriso. Não havia nada a decidir." },
  },
  {
    id: "risotto-courgette",
    src: risottoCourgette,
    title: "O que sobrou do verão",
    category: "iguarias",
    orientation: "landscape",
    meta: { description: "O verão entrou no arroz e ficou por lá sem avisar." },
  },
  {
    id: "sandes-ribs",
    src: sandesRibs,
    title: "Antes de ser tocado",
    category: "iguarias",
    orientation: "landscape",
    meta: { description: "Havia demasiado dentro do pão para se comer com qualquer tipo de compostura. Era exactamente esse o ponto." },
  },
  {
    id: "waffle-ovo",
    src: waffleOvo,
    title: "O encontro que ninguém esperava",
    category: "iguarias",
    orientation: "landscape",
    meta: { description: "Ninguém os juntaria. E no entanto ficou tudo certo." },
  },
  {
    id: "ovos-mexidos",
    src: ovosMexidos,
    title: "Uma manhã que ficou na mesa",
    category: "iguarias",
    orientation: "landscape",
    meta: { description: "Uma manhã que não tinha pressa. A torrada esperou, os ovos também." },
  },
  {
    id: "cafe-matcha",
    src: cafeMatcha,
    title: "Não havia escolha errada",
    category: "iguarias",
    orientation: "landscape",
    meta: { description: "Dois copos, uma torrada ao meio. O momento anterior à primeira colher." },
  },

  // Novas urbanas
  {
    id: "rua-descida",
    src: ruaDescida,
    title: "Descer sem saber onde acaba",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "A rua desce e o fim não se vê. Há uma certa liberdade nisso." },
  },
  {
    id: "janela-antiga",
    src: janelaAntiga,
    title: "Entre dois silêncios",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "Uma passagem entre dois edifícios. Os sinais estão lá, mas ninguém os lê." },
  },
  {
    id: "candeeiro-rua",
    src: candeeiroRua,
    title: "Antes do escuro",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "Às cinco da tarde o candeeiro já estava aceso. A rua não tinha decidido ainda se era de dia ou de noite, mas a luz já tinha feito a escolha por ela." },
  },
  {
    id: "cidade-nevoa",
    src: cidadeNevoa,
    title: "Essa hora sem nome",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "A névoa chegou antes de a cidade acordar. Ficou a ver quem saía primeiro." },
  },
  {
    id: "telhados-nevoa",
    src: telhadosNevoa,
    title: "O que os telhados sabem",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "A névoa cobriu tudo menos o que estava mais alto. Os telhados ficaram sozinhos no branco." },
  },
  {
    id: "cidade-cores",
    src: cidadeCores,
    title: "Nenhuma janela pediu autorização",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "Cada janela escolheu uma cor e ninguém combinou com ninguém. Ficou bem na mesma." },
  },
  {
    id: "praca-fonte",
    src: pracaFonte,
    title: "Enquanto a água sobe",
    category: "urbanas",
    orientation: "square",
    meta: { description: "A água sobe com uma urgência que a pedra nunca vai ter." },
  },
  {
    id: "exposicao-rua",
    src: exposicaoRua,
    title: "Pausas involuntárias",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "As fotografias estavam ali, ao relento. Algumas pessoas paravam um segundo. Poucos ficavam mais." },
  },
  {
    id: "fachada-trepadeira",
    src: fachadaTrepadeira,
    title: "O que cresceu sem convite",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "A trepadeira cobriu tudo sem pedir licença. Ficou melhor assim." },
  },
  {
    id: "coimbra-cima",
    src: coimbraCima,
    title: "Calor de outubro",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "O laranja dos telhados e o azul do céu não precisavam de mais nada entre eles." },
  },
  {
    id: "edificio-classico",
    src: edificioClassico,
    title: "Desenho involuntário",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "Os fios elétricos atravessaram a fachada como se ela não fosse nada. Talvez não fosse." },
  },
  {
    id: "porto-ribeira-panorama",
    src: portoRibeiraPanorama,
    title: "Vista de quem se afastou",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "De longe, a cidade organiza-se sozinha. O rio também." },
  },
  {
    id: "metro-porto",
    src: metroPorto,
    title: "A pedra não se importou",
    category: "urbanas",
    orientation: "square",
    meta: { description: "O metro passou. A pedra ficou onde estava. Nem se notou." },
  },

  // Novas natureza
  {
    id: "monte-outono",
    src: monteOutono,
    title: "O outono que foi longe demais",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "Há dez minutos antes de escurecer em que o monte parece arder sem fogo. É a única hora em que a cor existe desta forma. Esperei-a." },
  },
  {
    id: "areia-onda",
    src: areiaOnda,
    title: "Escrita de espuma",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "A onda escreveu qualquer coisa na areia e foi-se embora antes de acabar." },
  },
  {
    id: "mondego-figura",
    src: mondegoFigura,
    title: "Parado no meio de tudo",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "Parou no meio do rio e ficou ali. O mundo continuou de ambos os lados." },
  },

  // Novas urbanas (lote 2)
  {
    id: "porto-douro-barca",
    src: portoDouroBarca,
    title: "O que se vê do outro lado",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "Da água, a cidade parece ter crescido toda para o mesmo lado." },
  },
  {
    id: "rua-figura",
    src: ruaFigura,
    title: "O fim tem sempre alguém",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "No fim da rua havia alguém. Não tinha pressa. Talvez estivesse à espera de nada." },
  },
  {
    id: "fachada-ornamentos",
    src: fachadaOrnamentos,
    title: "Ornamento e memória",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "Cada moldura é uma obsessão diferente. O tempo fez o que os canteiros não previram: tornou o ornamento indistinguível da ruína." },
  },
  {
    id: "dom-luis-douro",
    src: domLuisDouro,
    title: "O que se atravessa duas vezes",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "O Luís I tem dois tabuleiros porque uma travessia nunca é suficiente. O Douro passa por baixo das duas com a indiferença calma de quem não precisa de autorização para continuar." },
  },
  {
    id: "mural-reflexo",
    src: muralReflexo,
    title: "O reflexo que não pediu permissão",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "A chuva fez o que o mural não esperava. Duplicou-o, invertido, na poça." },
  },
  {
    id: "edificio-moderno",
    src: edificioModerno,
    title: "O ângulo que foge",
    category: "urbanas",
    orientation: "portrait",
    meta: { description: "O edifício não quis a linha reta. As varandas desapareceram na sombra." },
  },
  {
    id: "banco-entardecer",
    src: bancoEntardecer,
    title: "Ficou calor onde alguém esteve",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "Alguém esteve aqui tempo suficiente para a pedra guardar o calor. A pedra é mais leal do que a maior parte das coisas." },
  },

  // Natureza · costa atlântica
  {
    id: "mar-panorama",
    src: marPanorama,
    title: "O azul que não tinha fim",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "O mar não precisava de limite para ser completo." },
  },
  {
    id: "mar-nuvens",
    src: marNuvens,
    title: "A luz que dividiu o mar",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "De um lado, prata. Do outro, esmeralda. As nuvens fizeram isso sem pedir." },
  },
  {
    id: "mar-vasto",
    src: marVasto,
    title: "Antes da próxima vaga",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "Há um silêncio entre vagas que ninguém costuma ouvir." },
  },
  {
    id: "mar-calmo",
    src: marCalmo,
    title: "O horizonte que recusa limite",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "O mar foi até onde a vista deixou e continuou para lá disso." },
  },
  {
    id: "mar-edificio",
    src: marEdificio,
    title: "Entre o que ficou e o que continua",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "O mar não ligou ao que construíram na margem. Continuou a entrar." },
  },
  {
    id: "praia-longa",
    src: praiaLonga,
    title: "A linha que não se fecha",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "A linha entre a areia e o mar prolongou-se até ao limite do que o olho aceita como definido. Depois tornou-se apenas sugestão." },
  },
  {
    id: "costa-vila",
    src: costaVila,
    title: "Vista de quem chegou de longe",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "Vista do alto, a vila parece ter crescido como crescem as coisas que não precisam de aprovação — devagar, sem plano, encostada à costa como quem ficou depois de toda a gente ir embora." },
  },
  {
    id: "costa-floresta",
    src: costaFloresta,
    title: "Onde a terra ainda resiste",
    category: "natureza",
    orientation: "landscape",
    meta: { description: "A floresta negociou com o mar durante séculos. Esta linha de árvores é o resultado actual dessa negociação — provisório, tenso, vivo." },
  },

  // Urbanas · costa
  {
    id: "fabrica-cabo",
    src: fabricaCabo,
    title: "A fábrica que o mar não engoliu",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "Existe desde antes de a costa precisar de um nome para se vender. O sal tratou-lhe a cor. O vento tratou do resto." },
  },
  {
    id: "farol-entrada",
    src: farolEntrada,
    title: "O portão que ninguém abre",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "O portão estava fechado. Lá dentro, o farol aguardava a noite como sempre aguardou — sem agitação, sem urgência, com a certeza calma de quem sabe que vai ser necessário." },
  },
  {
    id: "farol-frente",
    src: farolFrente,
    title: "A vigília",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "Não sabe quando vai ser preciso. Continua de pé à mesma." },
  },

  // Iguarias
  {
    id: "hamburguer-tabua",
    src: hamburquerTabua,
    title: "A ordem antes do caos",
    category: "iguarias",
    orientation: "landscape",
    meta: { description: "Estava tudo arrumado na tábua. Durou exactamente até o primeiro levantar o hambúrguer." },
  },
  {
    id: "cocktail-frasco",
    src: cocktailFrasco,
    title: "A hortelã não era necessária",
    category: "iguarias",
    orientation: "portrait",
    meta: { description: "Ficou bem na mesma. Às vezes o desnecessário é o que faz sentido." },
  },
];

export function photosByCategory(slug: CategorySlug) {
  return photos.filter((p) => p.category === slug);
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
