import type { CategorySlug } from "./photos";

export type JournalEntry = {
  slug: string;
  date: string;
  location?: string;
  title: string;
  excerpt: string;
  body: string[];
  photoSrc: string;
  photoTitle: string;
  relatedCategory: CategorySlug;
};

import mondegoFigura from "@/assets/mondego-figura.jpg";
import telhadosNevoa from "@/assets/telhados-nevoa.jpg";
import cafeMatcha from "@/assets/cafe-matcha.jpg";
import retratoEsplanada from "@/assets/retrato-esplanada.jpg";
import ribeiroMusgo from "@/assets/ribeiro-musgo.jpg";
import barcoDouro from "@/assets/barco-douro.jpg";
import ovosMexidos from "@/assets/ovos-mexidos.jpg";

export const journal: JournalEntry[] = [
  {
    slug: "o-cafe-antes-de-tudo",
    date: "2026-05-20",
    title: "Vinte minutos antes de pegar na câmara",
    excerpt: "A câmara fica dentro do saco. Aprendi que funciona melhor assim — esperar. Pedir qualquer coisa quente. Deixar que o lugar se torne lugar antes de eu me tornar fotógrafa.",
    body: [
      "Peço o espresso. Sento-me sem tirar o casaco — ainda não sei se fico. A câmara está dentro do saco e fica ali.",
      "Fico a olhar. A luz encontra o sítio dela sem que eu faça nada. As pessoas instalam-se nas cadeiras com a lentidão de quem não tem pressa de chegar a lado nenhum. A conversa da mesa ao lado ganha textura — não as palavras, mas o ritmo delas. O balcão, que à entrada parecia cenário, começa a parecer lugar. Há uma diferença entre as duas coisas que só se percebe quando acontece.",
      "Só quando isso acontece é que pego na câmara. Há qualquer coisa de quase cerimonial nesse gesto — tirar a máquina do saco depois de ter esperado o suficiente. Como se o lugar me tivesse finalmente dado licença.",
      "Não sei se é superstição ou método. As fotografias de que mais gosto foram todas feitas depois de uma pausa longa. Depois de qualquer coisa quente. Depois de ter ficado quieta tempo suficiente para a adrenalina de chegar a algum sítio novo se dissolver e dar lugar a atenção simples.",
      "Vinte minutos. Às vezes trinta. É o tempo que o lugar precisa para me aceitar. Ou o tempo que eu preciso para aceitar o lugar. Não sei bem.",
    ],
    photoSrc: ovosMexidos,
    photoTitle: "Mesa de manhã, café de letras",
    relatedCategory: "iguarias",
  },
  {
    slug: "figura-no-mondego",
    date: "2026-04-12",
    title: "Uma vez, havia uma figura no rio, em Outense",
    excerpt: "Não estava a fazer nada que eu conseguisse perceber. Só estava. Água pelos joelhos, costas para mim, e uma imobilidade que não parecia humana — parecia escolhida.",
    body: [
      "Cheguei à margem com o sol ainda baixo, colado ao horizonte como se também ele precisasse de tempo para acordar. A água tinha a cor de chumbo de manhã cedo — não escura, mas densa, como se guardasse a noite dentro. Não esperava encontrar ninguém. Essa é sempre a condição implícita dos lugares a esta hora: pertencem a quem não tem razão para estar em mais lado nenhum.",
      "Havia ali uma figura. De costas. Imóvel com a água pelos joelhos. Os braços soltos ao longo do corpo, os ombros descaídos com a qualidade específica de quem não está a esforçar-se por parecer nada. Levantei a câmara devagar, com o cuidado de quem não quer perturbar um sonho alheio. Disparei uma vez. Uma única vez — porque há momentos que não suportam repetição.",
      "Guardei a câmara e fiquei a olhar também. Por uns minutos, fomos os dois a fazer o mesmo: estar no rio sem razão nenhuma que eu soubesse nomear. A água movia-se em volta das pernas dela com aquela indiferença gentil que a água tem para com tudo o que decide parar dentro dela.",
      "Não sei se ela me viu. Nunca olhou para trás. Saí sem fazer barulho — não por educação, mas porque sair sem ser notada parecia a única resposta possível àquele encontro. Algumas imagens pedem que saias tão quietamente quanto entraste.",
    ],
    photoSrc: mondegoFigura,
    photoTitle: "Figura em Outense, abril",
    relatedCategory: "urbanas",
  },
  {
    slug: "telhados-com-nevoa",
    date: "2026-02-03",
    title: "A cidade tinha encolhido durante a noite",
    excerpt: "Fui à janela e Coimbra tinha só a metade de baixo. A outra metade tinha ido algures sem aviso, levada pela névoa com uma eficiência silenciosa.",
    body: [
      "Acordei porque a luz era diferente. Mais branca. Mais quieta. Havia um silêncio que não é habitual nesta rua — não a ausência de som, mas uma qualidade diferente do que restava, como se os sons se tivessem envolto em algodão durante a noite.",
      "Fui à janela. Coimbra tinha encolhido. A metade de cima da cidade tinha desaparecido completamente — os telhados mais altos, as antenas, as cumeeiras que normalmente se vêem da minha janela contra o céu. No seu lugar havia apenas branco espesso e imóvel.",
      "Subi. Há um miradouro perto de casa que normalmente não tem graça nenhuma — dá para estacionamentos e o topo de prédios que nunca foram bonitos. Com a névoa, tudo aquilo ganhou peso. A feiura tem o seu charme quando está meio escondida. O que não se vê completo torna-se misterioso por omissão.",
      "Fiz estas fotografias em silêncio. Sem música, sem ninguém ao telefone, sem a urgência habitual de registar depressa antes que desapareça. A névoa pede quietude em troca de se deixar fotografar. Cumpri — e ela ficou o tempo suficiente para eu perceber que não estava a fotografar a névoa. Estava a fotografar o que a névoa escondia ao escolher o que mostrar.",
    ],
    photoSrc: telhadosNevoa,
    photoTitle: "Telhados de Coimbra na névoa, fevereiro",
    relatedCategory: "urbanas",
  },
  {
    slug: "matcha-da-manha",
    date: "2025-11-18",
    title: "O verde da chávena",
    excerpt: "Nunca tinha visto um verde assim dentro de uma chávena. Fiquei a olhar mais tempo do que seria razoável antes de o beber — como se bebê-lo fosse uma perda irreparável.",
    body: [
      "Era espesso e verde-escuro, com a espuma ainda viva à superfície — aquelas pequenas bolhas que duram exactamente até ao momento em que se decide não esperar mais. Pus-o perto da janela onde batia uma luz de novembro: pálida, lateral, com aquela qualidade fria que a luz tem nos meses que se rendem cedo.",
      "Fiquei a olhá-lo. Há uma categoria de beleza que existe só nas coisas quotidianas apanhadas no ângulo certo. Uma tosta que ainda não arrefeceu. Um café com a colher ainda dentro e o açúcar por dissolver. O reflexo de uma janela num prato branco. Ninguém fala destas imagens porque ninguém as procura — são as que aparecem quando a atenção está noutro sítio.",
      "Peguei na câmara. A luz durou exactamente o tempo que precisava de durar — mais dois minutos e a sombra teria mudado de lado e o verde teria perdido aquela qualidade quase fosforescente. Fotografei. Guardei a câmara.",
      "Bebi-o devagar. Era bom, como quase sempre é quando a chávena está quente e há luz a entrar de lado e não há razão para terminar depressa. A fotografia ficou. O matcha não ficou. Isso também faz parte — algumas coisas belas existem para ser consumidas, não preservadas.",
    ],
    photoSrc: cafeMatcha,
    photoTitle: "Matcha com espuma, novembro",
    relatedCategory: "iguarias",
  },
  {
    slug: "retrato-na-esplanada",
    date: "2025-09-06",
    title: "Cinco da tarde de setembro",
    excerpt: "Ela estava com o olhar algures à minha esquerda — naquele estado de presença ausente que só acontece quando se está bem com alguém e não há necessidade de encher o silêncio.",
    body: [
      "Estávamos na esplanada há já algum tempo. O café tinha esfriado. A conversa tinha chegado àquele ritmo lento que não é o fim da conversa — é a conversa depois da conversa, a que não precisa de frases completas para existir.",
      "A luz mudou. Às cinco da tarde de setembro a luz muda de uma forma que não acontece noutro mês — fica dourada com uma urgência específica, como se soubesse que em outubro já não vai ter autorização para este ângulo. Caía de lado, cansada mas insistente. Peguei na câmara sem dizer nada.",
      "Ela estava com o olhar algures à minha esquerda. Naquele estado de presença ausente que acontece quando se está bem com alguém: o corpo está ali mas a cabeça foi passear um pouco, sem se preocupar em avisar. Não estava a pensar em nada visível. Estava, simplesmente.",
      "Disparei. Há retratos que são sobre a cara. Este é sobre o estado — aquela qualidade específica do estar sossegada que raramente se pede a alguém para imitar. Quando é real, é completamente diferente. Estava real. Eu estava a tempo.",
    ],
    photoSrc: retratoEsplanada,
    photoTitle: "Retrato na esplanada, setembro",
    relatedCategory: "retratos",
  },
  {
    slug: "ribeiro-e-musgo",
    date: "2025-06-29",
    title: "No bosque que não estava no mapa de ninguém",
    excerpt: "O ruído da água apareceu antes do ribeiro. Segui-o durante vinte minutos por entre pinheiros e terra húmida, sem ter a certeza de que havia alguma coisa para encontrar.",
    body: [
      "Tinha saído cedo para uma caminhada que não tinha destino escrito em lado nenhum. O melhor tipo. Num bosque que não estava no mapa de ninguém que eu conhecesse — ou que estava, mas escondido entre curvas de nível que não convidam —, o ruído da água apareceu primeiro. Não o vi: ouvi-o. Segui-o.",
      "As pedras estavam cobertas de musgo verde-escuro, húmido, quase luminoso na sombra fechada dos pinheiros. A água não corria — escorregava. Havia uma diferença qualitativa entre os dois verbos que só percebi quando a vi: escorregar implica uma superfície, uma resistência gentil, uma relação com o que está debaixo. A água conhecia cada pedra pelo nome.",
      "Baixei-me. Fiquei assim, com a câmara rente às pedras, num ângulo que era ligeiramente desconfortável mas que era o único que dava para perceber o que estava ali. Há fotografias que só existem se estiveres disposto a ficar em posições que não são exactamente dignas.",
      "Passei ali uma hora. Não fiz muitas fotografias — quando um lugar é assim, a câmara às vezes atrapalha mais do que ajuda. Mas esta ficou. E sempre que a vejo ouço o ribeiro outra vez, e sinto a humidade nas mãos, e lembro-me de que tinha saído sem destino e encontrado exactamente o que precisava de encontrar.",
    ],
    photoSrc: ribeiroMusgo,
    photoTitle: "Ribeiro com musgo no bosque",
    relatedCategory: "natureza",
  },
  {
    slug: "barco-no-douro",
    date: "2026-02-17",
    title: "Fevereiro no Porto tem uma qualidade de luz",
    excerpt: "Uma luz fria mas não hostil. Que não promete calor mas também não o nega. Que deixa as cores serem o que são sem as dourar nem as esmaecer.",
    body: [
      "Fui ao Douro antes dos turistas. Às oito da manhã de fevereiro o cais é de quem não tem outra razão para estar ali — pescadores que não falam muito, gaivotas com a sua arrogância habitual, e eu com a câmara e o casaco mais pesado que tenho.",
      "O barco estava lá — amarrado a um cais de pedra com a indiferença tranquila das coisas que pertencem a um lugar há tempo suficiente para deixarem de precisar de justificação. Pintado de vermelho-escuro que já não era bem vermelho nem bem escuro — era a cor específica que o sal e os anos fazem às coisas que ficam à beira-rio sem proteção.",
      "A água refletia o céu branco com a perfeição matemática dos dias sem vento. Não havia nenhuma perturbação na superfície. Era como fotografar um espelho com outro espelho dentro.",
      "Não há ninguém nesta fotografia. É exactamente isso que me interessa nela. O barco existe. O cais existe. O rio existe. Mas o tempo parou — ou pelo menos parou o suficiente para eu ter a fotografia antes de voltar a andar. Há imagens que são sobre a ausência. Sobre o que está mas não interfere. Sobre o silêncio das coisas antes de alguém chegar para lhes pedir que sirvam para alguma coisa.",
    ],
    photoSrc: barcoDouro,
    photoTitle: "Barco ancorado no Douro, fevereiro",
    relatedCategory: "urbanas",
  },
];

export function getJournalEntry(slug: string) {
  return journal.find((e) => e.slug === slug);
}

export function formatJournalDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-PT", { day: "numeric", month: "long", year: "numeric" });
}
