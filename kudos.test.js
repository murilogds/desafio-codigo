const kudos = require('./kudos');

test('test getKudosForUser', () => {
  expect(kudos.getKudosForUser(30)).toEqual(['GOOD', 'NICE']);
  expect(kudos.getKudosForUser(40)).toEqual(['GOOD', 'GOOD']);
  expect(kudos.getKudosForUser(100)).toEqual(['SUPER']);
  expect(kudos.getKudosForUser(135)).toEqual(['SUPER', 'GOOD', 'NICE', 'OK'])
});

test('test getKudosValueMessageForUser', () => {
  expect(kudos.getKudosValueMessageForUser(kudos.getKudosForUser(30)))
    .toEqual('Você recebeu treze reais em retorno aos kudos GOOD, NICE!');
  expect(kudos.getKudosValueMessageForUser(kudos.getKudosForUser(40)))
    .toEqual('Você recebeu dezesseis reais em retorno aos kudos GOOD, GOOD!');
  expect(kudos.getKudosValueMessageForUser(kudos.getKudosForUser(100)))
    .toEqual('Você recebeu vinte e cinco reais em retorno aos kudos SUPER!');
  expect(kudos.getKudosValueMessageForUser(kudos.getKudosForUser(135)))
    .toEqual('Você recebeu quarenta reais em retorno aos kudos SUPER, GOOD, NICE, OK!');
});
