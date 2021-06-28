// Conversão de kudos para pontos
const KUDOS_TO_POINTS = [
  { name: 'OK', value: 5 },
  { name: 'NICE', value: 10 },
  { name: 'GOOD', value: 20 },
  { name: 'GREAT', value: 50 },
  { name: 'SUPER', value: 100 },
];

// Conversão de kudos para reais
const KUDOS_TO_REAL = [
  { name: 'OK', value: 2 },
  { name: 'NICE', value: 5 },
  { name: 'GOOD', value: 8 },
  { name: 'GREAT', value: 15 },
  { name: 'SUPER', value: 25 },
];

// Descrição dos Valores por Extenso
const CENTENAS = [
  "cento", "duzentos", "trezentos",
  "quatrocentos", "quinhentos", "seiscentos",
  "setecentos", "oitocentos", "novecentos"
];

const DEZENAS = [
  "vinte", "trinta", "quarenta", "cinquenta",
  "sessenta", "setenta", "oitenta", "noventa"
];

const UM_A_DEZENOVE = [
  "um", "dois", "três", "quatro", "cinco",
  "seis", "sete", "oito", "nove", "dez",
  "onze", "doze", "treze", "quatorze", "quinze",
  "dezesseis", "dezessete", "dezoito", "dezenove"
];


/*
  Recebe: Um número inteiro representando um valor a ser convertido pra extenso(menor que um milhão). Ex.: 25, 13
  Retorna: Uma string com o número escrito por extenso. Ex.: vinte e cinco, treze
*/
function getNumberInFull(value) {
  let message = '';
  
  if (value >= 1000) {
    message += getNumberInFull(parseInt(value / 1000));
    message += ' mil';
    value = value % 1000;
  }

  let number;
  
  while (value > 0) {
    if (value > 100) {
      number = CENTENAS[parseInt(value / 100) - 1];
      value = value % 100;
    } else if (value === 100) {
      number = 'cem';
      value = 0;
    } else if (value >= 20) {
      number = DEZENAS[parseInt(value / 10) - 2];
      value = value % 10;
    } else {
      number = UM_A_DEZENOVE[parseInt(value) - 1];
      value = 0;
    }
    if (message === '') message += `${number}`;
    else message += ` e ${number}`;
  }
  
  return message;
}

/* 
  Recebe: um int representando o número de pontos do usuário
  Retorna: um array contendo os kudos. Ex.: ['OK', 'GOOD'] 
*/
function getKudosForUser(points) {
  const answer = [];
  let position = KUDOS_TO_POINTS.length - 1;
  while (points > 0) {
    if (points < KUDOS_TO_POINTS[position].value) {
      position -= 1;
    }
    else {
      points -= KUDOS_TO_POINTS[position].value;
      answer.push(KUDOS_TO_POINTS[position].name);
    }
  }
  return answer;
}

/* 
  Recebe: Recebe um array contendo os nomes dos kudos de um usuário. Ex.: ['OK', 'GOOD']
  Retorna: a mensagem padrão com o valor em reais dos kudos por extenso. Ex.: Parabéns, você ganhou vinte e cinco reais
*/
function getKudosValueMessageForUser(kudos) {
  let value = 0;
  kudos.forEach((kudo) => {
    value += KUDOS_TO_REAL.find((obj) => obj.name === kudo).value;
  })

  const numberInFull = getNumberInFull(value);

  let message = `Você recebeu ${numberInFull} reais em retorno aos kudos `;
  
  for (let index = 0; index < kudos.length - 1; index++) {
    message += `${kudos[index]}, `;
  }
  message += `${kudos[kudos.length - 1]}!`;
  return message;
}


module.exports = {
  getKudosForUser,
  getKudosValueMessageForUser,
};
