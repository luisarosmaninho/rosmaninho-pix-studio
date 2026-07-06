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
    text: "A luz das cinco da tarde de setembro não dura mais do que vinte minutos naquele ângulo exacto. Aprendi isso ao fim de três visitas sem fotografia nenhuma — três vezes a chegar tarde, a perceber o que perdi, a prometer que da próxima não chegava tarde. Na quarta vez estava lá às quatro e meia.",
    tag: "luz",
    size: "large",
  },
  {
    id: "cidade-domingo",
    text: "A cidade ao domingo de manhã não é a mesma cidade de segunda. É uma versão que se recusa a ter pressa — e nessa recusa revela coisas que o resto da semana esconde.",
    tag: "cidade",
    size: "medium",
  },
  {
    id: "olhar-antes",
    text: "Ponho a câmara em baixo e fico a olhar. Só depois decido se vale a pena levantar os braços. Na maior parte das vezes não vale — e isso é um progresso.",
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
    text: "Há um tipo de silêncio que só existe quando estás sozinha num bosque e percebes que paraste de pensar. Não é ausência de som — a floresta tem os seus sons. É a ausência de palavras internas. Como se a cabeça tivesse percebido que não era precisa ali.",
    tag: "silêncio",
    size: "large",
  },
  {
    id: "tempo-espera",
    text: "Às vezes a única coisa que separa uma fotografia boa de uma fotografia que não existe é saber ficar mais cinco minutos quando toda a razão diz que já chega.",
    tag: "tempo",
    size: "medium",
  },
  {
    id: "luz-nevoa",
    text: "A névoa não apaga a luz. Redistribui-a de forma que nenhuma janela teria imaginado.",
    tag: "luz",
    size: "fragment",
  },
  {
    id: "cidade-reflexo",
    text: "Depois da chuva a cidade tem o dobro das janelas. Uma no prédio, outra na poça. Às vezes a da poça é mais verdadeira — está invertida, ligeiramente deformada, e por isso mais honesta.",
    tag: "cidade",
    size: "small",
  },
  {
    id: "olhar-costas",
    text: "Fotografo muitas costas. Não é descuido — é uma escolha que levei tempo a perceber. As costas não sabem que estão a ser fotografadas. As costas não posam. As costas mentem menos do que qualquer outra parte do corpo.",
    tag: "olhar",
    size: "medium",
  },
  {
    id: "tempo-regresso",
    text: "Voltei ao mesmo sítio quatro vezes em quatro meses. Na quarta percebi que já não estava à procura da fotografia — estava à procura de qualquer coisa que tinha deixado lá na primeira vez e não conseguia nomear.",
    tag: "tempo",
    size: "large",
  },
  {
    id: "agua-margem",
    text: "Tirei os ténis. Entrei até aos joelhos. A água estava mais fria do que esperava e o chão estava mais suave. Mudou tudo, como sempre muda quando se atravessa uma fronteira física em vez de apenas a olhar.",
    tag: "água",
    size: "small",
  },
  {
    id: "silencio-espera",
    text: "Esperar não é não fazer nada. É fazer tudo com uma velocidade que o mundo não reconhece como trabalho.",
    tag: "silêncio",
    size: "small",
  },
  {
    id: "luz-fresta",
    text: "Uma fresta de dois centímetros num estore partido iluminou o chão de uma forma que me deixou parada durante minutos. Era uma faixa de luz perfeita — com bordas nítidas, ângulo preciso, poeira visível dentro dela. A arquitectura não planeou aquilo. O tempo e o descuido fizeram.",
    tag: "luz",
    size: "large",
  },
  {
    id: "cidade-escadas",
    text: "Coimbra é uma cidade de escadas. Eventualmente o coração aceita-o como parte do percurso, os joelhos resignam-se, e começas a perceber que as melhores vistas não estão no destino — estão a meio caminho, quando tens de parar para respirar.",
    tag: "cidade",
    size: "small",
  },
  {
    id: "olhar-sem-camara",
    text: "Há dias em que saio sem câmara de propósito. Para treinar o olho sem a muleta do disparador — para ver sem a tentação imediata de capturar, e perceber o que fica quando não há forma de guardar.",
    tag: "olhar",
    size: "medium",
  },
  {
    id: "agua-espelho",
    text: "A água parada não reflete o que está em cima. Reflete o que está ao lado — ligeiramente inclinado, com as cores saturadas de outra forma. Isso é uma coisa completamente diferente que quase toda a gente ignora.",
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
    text: "Porto às seis da manhã tem um silêncio que a cidade não parece merecer — e que oferece de qualquer forma, sem condições, a quem tiver o trabalho de aparecer a essa hora.",
    tag: "silêncio",
    size: "medium",
  },
  {
    id: "luz-fim",
    text: "Fiquei até a luz acabar. Depois fiquei mais um pouco, no escuro, só para ter a certeza de que tinha visto o fim e não apenas um momento antes do fim.",
    tag: "luz",
    size: "small",
  },
  {
    id: "olhar-instante",
    text: "Toda a gente estava a olhar para o pôr do sol. Eu estava a olhar para a pessoa que estava a olhar para o pôr do sol — e nela via uma coisa que o sol nunca me ia mostrar.",
    tag: "olhar",
    size: "large",
  },
  {
    id: "cidade-madrugada",
    text: "Às quatro da manhã a cidade pertence a quem não tem razão nenhuma para estar acordado. É a hora mais honesta — quando a cidade para de representar e fica simplesmente a ser.",
    tag: "cidade",
    size: "medium",
  },
  {
    id: "agua-chuva",
    text: "Choveu três dias seguidos. Não saí. Olhei pela janela e esperei. No quarto dia a luz era diferente — mais limpa, mais cansada, com aquela qualidade de coisa lavada que só a chuva prolongada consegue. Valeu a espera. Sempre vale.",
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
    text: "Um arquivo não é uma coleção. Uma coleção acumula — um arquivo conversa. É uma conversa longa com o tempo, onde às vezes o tempo fala mais do que eu, e às vezes eu falo sem ter nada para dizer, e isso também fica registado.",
    tag: "tempo",
    size: "large",
  },
  {
    id: "olhar-janela",
    text: "Passei uma tarde inteira a olhar pela janela sem fotografar nada. Não foi tempo perdido. Foi o tipo de pesquisa que não tem resultado imediato mas que muda a forma como o olho funciona depois.",
    tag: "olhar",
    size: "small",
  },
  {
    id: "luz-manha-lenta",
    text: "Há uma luz de manhã que só existe se não tiveres pressa nenhuma. Começa devagar do lado errado da janela, entra de lado sem pedir licença, aquece as coisas na ordem errada. Já a perdi muitas vezes por ter algum sítio onde estar às nove.",
    tag: "luz",
    size: "medium",
  },
  {
    id: "cidade-gato",
    text: "Vi um gato preto sentado num estore de cortiço aberto, completamente imóvel, olhando para um ponto que eu não conseguia localizar. Havia na sua postura uma concentração que envergonhava qualquer coisa que eu tivesse feito naquele dia. Não tirei fotografia — teria perturbado algo que não me pertencia.",
    tag: "cidade",
    size: "medium",
  },
  {
    id: "silencio-matcha",
    text: "Com o matcha quente nas mãos, tudo fica mais lento. A conversa abranda. O pensamento desfaz-se. Acho que é esse o ponto — não o sabor, mas o que o sabor autoriza.",
    tag: "silêncio",
    size: "fragment",
  },
  {
    id: "tempo-livros",
    text: "Tenho uma pilha de livros na mesa-de-cabeceira que cresce mais depressa do que os leio. Às vezes olho para eles antes de dormir com uma mistura de culpa e antecipação. São também um arquivo — dos sítios que ainda quero ir, das ideias que ainda não tive, das versões de mim que ainda não existem.",
    tag: "tempo",
    size: "medium",
  },
  {
    id: "agua-chuva-janela",
    text: "A chuva na janela reescreve o que está lá fora. O mundo fica impressionista — as arestas perdem-se, as cores sangram umas para as outras, o que era definido torna-se sugestão. Às vezes, mais verdadeiro assim.",
    tag: "água",
    size: "small",
  },
  {
    id: "olhar-cansaco",
    text: "Há dias em que o olho não quer trabalhar. Recusa-se a ver com interesse, trata tudo como equivalente, não distingue o que vale da pena do que não vale. Respeito isso. O cansaço do olhar é tão real como qualquer outro.",
    tag: "olhar",
    size: "small",
  },
  {
    id: "luz-nuvem",
    text: "A nuvem que passou na frente do sol mudou tudo naquela tarde — e não foi o escurecer. Foi o momento exacto antes, quando a luz ficou com uma qualidade dourada e urgente que durou menos de um minuto.",
    tag: "luz",
    size: "fragment",
  },
  {
    id: "cidade-barulho",
    text: "Aprendi a fotografar com barulho à volta. Não é prática que escolhi — é necessidade. As cidades não constroem silêncio à volta das tuas fotografias. Tens de aprender a isolar o que vês do que ouves, que é mais difícil do que parece.",
    tag: "cidade",
    size: "small",
  },
  {
    id: "silencio-ler-fotografar",
    text: "Ler e fotografar exigem a mesma coisa: atenção ao que não é imediatamente óbvio, paciência com o que ainda não está claro, e a generosidade de deixar o tempo trabalhar sem interferência. É por isso que nunca consigo fazer nenhuma das duas com pressa.",
    tag: "silêncio",
    size: "large",
  },
  {
    id: "tempo-quatro-da-manha",
    text: "Acordei às quatro e não consegui dormir. Em vez de lutar, fui escrever. Há uma qualidade de pensamento que só existe naquelas horas — menos policiado, mais honesto, menos preocupado com o que alguém vai achar.",
    tag: "tempo",
    size: "medium",
  },
  {
    id: "agua-rio-duplo",
    text: "O rio de manhã com névoa não é o mesmo rio de tarde com sol. Tenho fotografias dos dois e às vezes mostro-as juntas — e as pessoas ficam sem perceber que é o mesmo lugar. É o mesmo lugar. Completamente diferente.",
    tag: "água",
    size: "medium",
  },
  {
    id: "olhar-textura",
    text: "A textura de uma parede descascada pode conter mais camadas de tempo do que a fachada inteira tratada. O descasque não é falha — é memória visível, estratigrafia da cidade.",
    tag: "olhar",
    size: "small",
  },
  {
    id: "silencio-caminhar",
    text: "Caminhei durante três horas sem destino definido. A câmara ficou nas costas quase todo o tempo. O olho foi sozinho, a aprender o terreno sem a pressão de ter de trazer alguma coisa para mostrar.",
    tag: "silêncio",
    size: "medium",
  },
  {
    id: "luz-antes-do-clique",
    text: "O momento antes do clique tem uma qualidade própria — suspensão, atenção total, consciência de que este segundo específico não vai repetir-se. É o único momento em que estou completamente presente.",
    tag: "luz",
    size: "medium",
  },
  {
    id: "tempo-espera-certa",
    text: "Aprendi que esperar não é passivo. É uma forma de trabalho que o mundo não reconhece como trabalho — e por isso quem espera parece sempre que não está a fazer nada importante.",
    tag: "tempo",
    size: "fragment",
  },
];

export function notasByTag(tag: Nota["tag"]) {
  return notas.filter((n) => n.tag === tag);
}
