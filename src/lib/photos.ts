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
  introBody: string[];
  note: string;
  quote: string;
  quoteSource: string;
};

export type PhotoMeta = {
  description: string;
  conditions?: string;
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
    intro: "As cidades falam em camadas. Há a superfície — o movimento, o ruído, o asfalto molhado. E há o que está por baixo: a memória, o tempo acumulado, a luz que teima em aparecer entre prédios.",
    introBody: [
      "Fotografar uma cidade é um acto de paciência. Não se trata de documentar o que existe — isso faz-se com satélites e drones. Trata-se de encontrar o que a cidade revela apenas quando ela acha que ninguém está a ver: a sombra que entra oblíqua numa esquina às três da tarde de inverno, a janela com cortinas que se movem sem vento aparente, o reflexo de uma fachada numa poça que vai secar daqui a dez minutos.",
      "Portugal tem uma arquitectura do detalhe. Os azulejos, a pedra trabalhada, as grades de ferro, os arcos que nunca se justificam plenamente — são elementos que resistem ao tempo com uma dignidade tranquila. Estas fotografias tentam ser testemunhas dessa resistência.",
      "Foram tiradas em Porto, Coimbra, Peniche e aldeias sem nome na serra. Em dias de névoa, em tardes demasiado quentes, em manhãs que ainda cheiravam a noite.",
    ],
    note: "Série em curso · Portugal · 2022–presente",
    quote: "A cidade é um arquivo de gestos esquecidos.",
    quoteSource: "L.R.",
  },
  {
    slug: "natureza",
    title: "Natureza",
    description: "Água, luz e paisagem — o tempo lento dos lugares.",
    intro: "A natureza não posa. Não espera. Não repete. Estas fotografias são encontros — brevíssimos — com água, luz e tempo, em lugares onde o mundo ainda vai devagar.",
    introBody: [
      "Há uma arrogância subtil em apontar uma câmara à natureza. Como se o acto de fotografar pudesse conter o que é, por definição, incontível. A água que cai, a luz que muda de ângulo a cada segundo, o vento que reorganiza as folhas — tudo isto dura menos do que o tempo de obturação.",
      "O que fica, então? Fica uma aproximação. Um fragmento de um instante que existiu e depois deixou de existir naquela forma exacta. A fotografia de natureza é, no fundo, uma forma de luto suave: guardar o que não vai repetir-se.",
      "Estas imagens foram feitas em ribeiros de montanha, praias de costa atlântica e vales onde o outono chegou antes de hora. A maioria foi tirada sozinha, sem tripé, com a luz que havia.",
    ],
    note: "Série aberta · Norte e Centro de Portugal · 2021–presente",
    quote: "A paisagem não precisa de ser perfeita para ser completa.",
    quoteSource: "caderno de campo",
  },
  {
    slug: "retratos",
    title: "Retratos",
    description: "Rostos, presença e o instante em que alguém se revela.",
    intro: "Um retrato não é apenas um rosto. É uma cumplicidade — breve, às vezes inesperada. Estes retratos são sobre presença: a de quem está, e a do que fica depois de ir.",
    introBody: [
      "Não peço para ninguém sorrir. Sorrir é uma performance e as fotografias de performance envelhecem mal — ficam datadas ao fim de uns anos, reduzidas a um registo de como as pessoas achavam que deviam parecer felizes nessa época.",
      "O que procuro é o momento anterior. A pessoa que ainda não sabe bem o que a câmara vai fazer. O olhar que vai para algum lado que não é a objectiva. A mão no queixo, o desvio de luz, a expressão que não foi ensaiada.",
      "Cada retrato aqui foi feito com permissão, muitas vezes com conversa antes. Às vezes são amigos, às vezes são estranhos que aceitaram ficar parados um momento. Fico-lhes grata a todos.",
    ],
    note: "Série de autor · Portugal · selecção 2023–2025",
    quote: "Fotografar alguém é uma forma de atenção.",
    quoteSource: "L.R.",
  },
  {
    slug: "iguarias",
    title: "Iguarias",
    description: "Mesas, texturas e o instante antes do primeiro garfo.",
    intro: "Antes do primeiro garfo, existe uma brevidade extraordinária. Uma mesa posta, uma luz que bate de lado, o vapor de algo acabado de sair do forno. Estas imagens vivem nesses segundos antes.",
    introBody: [
      "A fotografia de comida tem má reputação. Associada ao registo banal das redes sociais, à obsessão pelo aspecto à custa do sabor. Não é isso que me interessa. O que me interessa é a composição involuntária: a forma como um cozinheiro arruma um prato sem pensar nisso como arranjo visual, e como essa disposição tem uma lógica própria que uma câmara pode revelar.",
      "Há também a questão da luz. A luz da manhã numa esplanada, a luz lateral de fim de tarde numa cozinha, a luz difusa de um restaurante antigo — cada uma delas muda completamente o que um simples prato parece ser.",
      "Estas imagens foram feitas em cafés, restaurantes e cozinhas domésticas. Algumas são encomendas, a maioria são observações espontâneas. Nenhuma foi feita com fome — esse é o segredo.",
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
    meta: { description: "Uma varanda sabe mais da rua do que quem passa nela.", conditions: "névoa leve · manhã cedo · janeiro" },
  },
  {
    id: "porto-luisi",
    src: portoLuisi,
    title: "Do lado de quem fica",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "Há sítios que observam sem julgar. Este é um deles." },
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
    meta: { description: "Estava de costas. Depois voltou-se. Não sei porquê, mas ficou bem." },
  },
  {
    id: "retrato-esplanada",
    src: retratoEsplanada,
    title: "Alguém que não contava o tempo",
    category: "retratos",
    orientation: "landscape",
    meta: { description: "O outono estava lá, bem atrás. Ele não parecia dar conta disso." },
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
    meta: { description: "Estava tudo dentro do pão. Só faltava começar." },
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
    meta: { description: "A forma existe por si mesma. Não precisa de razão." },
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
    meta: { description: "O monte ficou cor de brasa antes do fim do dia. Ninguém pediu para isso acontecer." },
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
    meta: { description: "Os canteiros deixaram pedra sobre pedra até ao topo. As janelas ficaram com o céu." },
  },
  {
    id: "dom-luis-douro",
    src: domLuisDouro,
    title: "O que se atravessa duas vezes",
    category: "urbanas",
    orientation: "landscape",
    meta: { description: "A ponte atravessa-se duas vezes sem se perceber bem porquê. O rio passa por baixo das duas." },
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
    meta: { description: "Ninguém ficou. A pedra ficou quente na mesma." },
  },
];

export function photosByCategory(slug: CategorySlug) {
  return photos.filter((p) => p.category === slug);
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
