import test from 'ava';

import { ParsedCard } from '../types';

import { ScryfallService } from './scryfall';

const scryfallService = new ScryfallService();

const testCases: Map<string, string> = new Map();
testCases.set('Black Lotus', 'Black Lotus');
testCases.set('bLAc lOTus', 'Black Lotus');
testCases.set('leb/233', 'Black Lotus');
testCases.set('Tour de commande', 'Tour de commandement');
testCases.set('m3c/331/', 'Command Tower');
testCases.set('m3c/331/de', 'Befehlsturm');
testCases.set('56ebc372-aabd-4174-a943-c7bf59e5028d', 'Phantom Nishoba');

testCases.forEach((expected, input) => {
  test(`getCard ${input}`, (t) => {
    const card: ParsedCard = {
      name: input,
      quantity: 0,
      language: undefined,
      customFlags: new Map(),
    };

    return scryfallService
      .getCard(card)
      .then((res) => t.is(res?.printed_name || res?.name, expected));
  });
});

test('language override', (t) => {
  const card: ParsedCard = {
    name: 'm3c/331/de',
    quantity: 0,
    language: 'fr',
    customFlags: new Map(),
  };

  return scryfallService
    .getCard(card)
    .then((res) => t.is(res?.printed_name, 'Tour de commandement'));
});

test('Unknown card', (t) => {
  const card: ParsedCard = {
    name: "Ceci n'est pas une carte.",
    quantity: 0,
    language: undefined,
    customFlags: new Map(),
  };

  return scryfallService.getCard(card).then((res) => t.is(res, undefined));
});

test('batch fetch', (t) => {
  const cards: ParsedCard[] = [
    {
      name: 'm3c/331/de',
      quantity: 0,
      language: 'fr',
      customFlags: new Map(),
    },
    {
      name: 'Black Lotus',
      quantity: 0,
      language: undefined,
      customFlags: new Map(),
    },
  ];
  const expectedNames = ['Tour de commandement', 'Black Lotus'];
  return scryfallService.getCardsBatch(cards).then((res) => {
    const fetchedNames = res.map((card) => card?.printed_name || card?.name);
    return t.deepEqual(fetchedNames, expectedNames);
  });
});

////////////////////////////////////////////////////////////////////////////////
//                               getCardsAndDo                                //
////////////////////////////////////////////////////////////////////////////////

test('getCardsAndDo', (t) => {
  const input = [
    {
      name: 'Black Lotus',
      quantity: 0,
      language: undefined,
      customFlags: new Map(),
      customData: 'This is a Black Lotus',
    },
    {
      name: 'Tour de commande',
      quantity: 0,
      language: undefined,
      customFlags: new Map(),
      customData: 'This is a Tour de commandement',
    },
    {
      name: 'm3c/331/de',
      quantity: 0,
      language: undefined,
      customFlags: new Map(),
      customData: 'This is a Befehlsturm',
    },
  ];

  const results: { name: string; ok: boolean }[] = [];
  return scryfallService
    .getCardsAndDo(input, (data, card) => {
      if (
        data.customData &&
        data.customData === `This is a ${card?.printed_name || card?.name}`
      ) {
        results.push({ name: data.name, ok: true });
      } else {
        results.push({ name: data.name, ok: false });
      }
    })
    .then(() => {
      if (results.length !== input.length) {
        return t.fail();
      }
      const inputNames = input.map((i) => i.name);
      const resultNames = results.map((r) => r.name);

      if (!inputNames.every((name) => resultNames.includes(name))) {
        t.fail();
      }
      if (!results.every((r) => r.ok)) {
        t.fail();
      }
      return t.pass();
    });
});

test('getCardsAndDoError', (t) => {
  let outcome: string;
  return scryfallService
    .getCardsAndDo(
      [
        {
          name: "Ceci n'est pas une carte.",
          quantity: 0,
          language: undefined,
          customFlags: new Map(),
          customData: 'This is a not a card',
        },
      ],
      (input, foundCards) => {
        if (input.customData !== 'This is a not a card') {
          outcome = 'No custom data';
        } else if (foundCards !== undefined) {
          outcome = 'card is defined';
        } else {
          outcome = 'success';
        }
      }
    )
    .then(() => {
      return t.is(outcome, 'success');
    });
});

////////////////////////////////////////////////////////////////////////////////
//                             getCardPrintsAndDo                             //
////////////////////////////////////////////////////////////////////////////////

test('getCardPrintsAndDoError', (t) => {
  let outcome: string;
  return scryfallService
    .getCardPrintsAndDo(
      [
        {
          name: "Ceci n'est pas une carte.",
          quantity: 0,
          language: undefined,
          customFlags: new Map(),
          customData: 'This is a not a card',
        },
      ],
      (input, foundCards) => {
        if (input.customData !== 'This is a not a card') {
          outcome = 'No custom data';
        } else if (foundCards !== undefined) {
          outcome = 'card is defined';
        } else {
          outcome = 'success';
        }
      }
    )
    .then(() => {
      return t.is(outcome, 'success');
    });
});
