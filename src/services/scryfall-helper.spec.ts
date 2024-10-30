import test from 'ava';

import { ParsedCard, ScryfallCard } from '../types';

import { testScryfallService } from './common.spec';
import { ScryfallHelper } from './scryfall-helper';

const scryfallHelper = new ScryfallHelper(testScryfallService);

////////////////////////////////////////////////////////////////////////////////
//                                  getCard                                   //
////////////////////////////////////////////////////////////////////////////////

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

    return scryfallHelper
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

  return scryfallHelper
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

  return scryfallHelper.getCard(card).then((res) => t.is(res, undefined));
});

////////////////////////////////////////////////////////////////////////////////
//                           getCard - Done better                            //
////////////////////////////////////////////////////////////////////////////////

const newTestCases: {
  title: string,
  input: ParsedCard,
  expected: ScryfallCard | undefined
}[] = [
  {
    title: 'getCard - UUID - OK',
    input: {
      name: '4c85d097-e87b-41ee-93c6-0e54ec41b174',
      quantity: 1,
      customFlags: new Map(),
    },
    expected: {
      "object": "card",
      "id": "4c85d097-e87b-41ee-93c6-0e54ec41b174",
      "oracle_id": "41dd29b9-f08d-4ccc-8dc0-da11d2d456e9",
      "multiverse_ids": [
        9764
      ],
      "tcgplayer_id": 830,
      "cardmarket_id": 11870,
      "name": "Blacker Lotus",
      "lang": "en",
      "released_at": "1998-08-11",
      "uri": "https://api.scryfall.com/cards/4c85d097-e87b-41ee-93c6-0e54ec41b174",
      "scryfall_uri": "https://scryfall.com/card/ugl/70/blacker-lotus?utm_source=api",
      "layout": "normal",
      "highres_image": true,
      "image_status": "highres_scan",
      "image_uris": {
        "small": "https://cards.scryfall.io/small/front/4/c/4c85d097-e87b-41ee-93c6-0e54ec41b174.jpg?1562799094",
        "normal": "https://cards.scryfall.io/normal/front/4/c/4c85d097-e87b-41ee-93c6-0e54ec41b174.jpg?1562799094",
        "large": "https://cards.scryfall.io/large/front/4/c/4c85d097-e87b-41ee-93c6-0e54ec41b174.jpg?1562799094",
        "png": "https://cards.scryfall.io/png/front/4/c/4c85d097-e87b-41ee-93c6-0e54ec41b174.png?1562799094",
        "art_crop": "https://cards.scryfall.io/art_crop/front/4/c/4c85d097-e87b-41ee-93c6-0e54ec41b174.jpg?1562799094",
        "border_crop": "https://cards.scryfall.io/border_crop/front/4/c/4c85d097-e87b-41ee-93c6-0e54ec41b174.jpg?1562799094"
      },
      "mana_cost": "{0}",
      "cmc": 0,
      "type_line": "Artifact",
      "oracle_text": "{T}: Tear Blacker Lotus into pieces. Add four mana of any one color. Remove the pieces from the game.",
      "colors": [],
      "color_identity": [],
      "keywords": [],
      "produced_mana": [
        "B",
        "G",
        "R",
        "U",
        "W"
      ],
      "legalities": {
        "standard": "not_legal",
        "future": "not_legal",
        "historic": "not_legal",
        "timeless": "not_legal",
        "gladiator": "not_legal",
        "pioneer": "not_legal",
        "explorer": "not_legal",
        "modern": "not_legal",
        "legacy": "not_legal",
        "pauper": "not_legal",
        "vintage": "not_legal",
        "penny": "not_legal",
        "commander": "not_legal",
        "oathbreaker": "not_legal",
        "standardbrawl": "not_legal",
        "brawl": "not_legal",
        "alchemy": "not_legal",
        "paupercommander": "not_legal",
        "duel": "not_legal",
        "oldschool": "not_legal",
        "premodern": "not_legal",
        "predh": "not_legal"
      },
      "games": [
        "paper"
      ],
      "reserved": false,
      "foil": false,
      "nonfoil": true,
      "finishes": [
        "nonfoil"
      ],
      "oversized": false,
      "promo": false,
      "reprint": false,
      "variation": false,
      "set_id": "3404fc78-6678-4cf4-bd39-4c0be3bb7baf",
      "set": "ugl",
      "set_name": "Unglued",
      "set_type": "funny",
      "set_uri": "https://api.scryfall.com/sets/3404fc78-6678-4cf4-bd39-4c0be3bb7baf",
      "set_search_uri": "https://api.scryfall.com/cards/search?order=set&q=e%3Augl&unique=prints",
      "scryfall_set_uri": "https://scryfall.com/sets/ugl?utm_source=api",
      "rulings_uri": "https://api.scryfall.com/cards/4c85d097-e87b-41ee-93c6-0e54ec41b174/rulings",
      "prints_search_uri": "https://api.scryfall.com/cards/search?order=released&q=oracleid%3A41dd29b9-f08d-4ccc-8dc0-da11d2d456e9&unique=prints",
      "collector_number": "70",
      "digital": false,
      "rarity": "rare",
      "card_back_id": "0aeebaf5-8c7d-4636-9e82-8c27447861f7",
      "artist": "Christopher Rush",
      "artist_ids": [
        "c96773f0-346c-4f7d-9271-2d98cc5d86e1"
      ],
      "illustration_id": "3dc53f76-6a4f-45ee-8e08-5ac4dfa9fc79",
      "border_color": "silver",
      "frame": "1997",
      "full_art": false,
      "textless": false,
      "booster": true,
      "story_spotlight": false,
      "prices": {
        "usd": "17.38",
        "usd_foil": null,
        "usd_etched": null,
        "eur": "19.17",
        "eur_foil": null,
        "tix": null
      },
      "related_uris": {
        "gatherer": "https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=9764&printed=false",
        "tcgplayer_infinite_articles": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Darticle%26game%3Dmagic%26partner%3Dscryfall%26q%3DBlacker%2BLotus",
        "tcgplayer_infinite_decks": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Ddeck%26game%3Dmagic%26partner%3Dscryfall%26q%3DBlacker%2BLotus",
        "edhrec": "https://edhrec.com/route/?cc=Blacker+Lotus"
      },
      "purchase_uris": {
        "tcgplayer": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&u=https%3A%2F%2Fwww.tcgplayer.com%2Fproduct%2F830%3Fpage%3D1",
        "cardmarket": "https://www.cardmarket.com/en/Magic/Products/Singles/Unglued/Blacker-Lotus?referrer=scryfall&utm_campaign=card_prices&utm_medium=text&utm_source=scryfall",
        "cardhoarder": "https://www.cardhoarder.com/cards?affiliate_id=scryfall&data%5Bsearch%5D=Blacker+Lotus&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall"
      }
    },
  },
  {
    title: 'getCard - UUID - Ignore language',
    input: {
      name: '6a058a72-ebfe-4957-a7dd-ee7471db2498',
      quantity: 1,
      language: 'es',
      customFlags: new Map(),
    },
    expected: {
      "object": "card",
      "id": "6a058a72-ebfe-4957-a7dd-ee7471db2498",
      "oracle_id": "e4125377-34c0-4b54-bdf8-4e88f5d24565",
      "multiverse_ids": [],
      "mtgo_id": 99527,
      "arena_id": 77543,
      "tcgplayer_id": 235469,
      "tcgplayer_etched_id": 235468,
      "cardmarket_id": 557078,
      "name": "Approach of the Second Sun",
      "printed_name": "副陽の接近",
      "lang": "ja",
      "released_at": "2021-04-23",
      "uri": "https://api.scryfall.com/cards/6a058a72-ebfe-4957-a7dd-ee7471db2498",
      "scryfall_uri": "https://scryfall.com/card/sta/64/ja/%E5%89%AF%E9%99%BD%E3%81%AE%E6%8E%A5%E8%BF%91?utm_source=api",
      "layout": "normal",
      "highres_image": true,
      "image_status": "highres_scan",
      "image_uris": {
        "small": "https://cards.scryfall.io/small/front/6/a/6a058a72-ebfe-4957-a7dd-ee7471db2498.jpg?1652688734",
        "normal": "https://cards.scryfall.io/normal/front/6/a/6a058a72-ebfe-4957-a7dd-ee7471db2498.jpg?1652688734",
        "large": "https://cards.scryfall.io/large/front/6/a/6a058a72-ebfe-4957-a7dd-ee7471db2498.jpg?1652688734",
        "png": "https://cards.scryfall.io/png/front/6/a/6a058a72-ebfe-4957-a7dd-ee7471db2498.png?1652688734",
        "art_crop": "https://cards.scryfall.io/art_crop/front/6/a/6a058a72-ebfe-4957-a7dd-ee7471db2498.jpg?1652688734",
        "border_crop": "https://cards.scryfall.io/border_crop/front/6/a/6a058a72-ebfe-4957-a7dd-ee7471db2498.jpg?1652688734"
      },
      "mana_cost": "{6}{W}",
      "cmc": 7,
      "type_line": "Sorcery",
      "printed_type_line": "ソーサリー",
      "oracle_text": "If this spell was cast from your hand and you've cast another spell named Approach of the Second Sun this game, you win the game. Otherwise, put Approach of the Second Sun into its owner's library seventh from the top and you gain 7 life.",
      "printed_text": "このゲーム中にあなたがこれ以外の「副陽の接近」という名前の呪文を唱えていて、かつ、この呪文があなたの手札から唱えられたなら、あなたはこのゲームに勝利する。そうでないなら、副陽の接近をオーナーのライブラリーの一番上から７枚目に置き、あなたは７点のライフを得る。",
      "colors": [
        "W"
      ],
      "color_identity": [
        "W"
      ],
      "keywords": [],
      "legalities": {
        "standard": "not_legal",
        "future": "not_legal",
        "historic": "legal",
        "timeless": "legal",
        "gladiator": "legal",
        "pioneer": "legal",
        "explorer": "legal",
        "modern": "legal",
        "legacy": "legal",
        "pauper": "not_legal",
        "vintage": "legal",
        "penny": "legal",
        "commander": "legal",
        "oathbreaker": "legal",
        "standardbrawl": "not_legal",
        "brawl": "legal",
        "alchemy": "not_legal",
        "paupercommander": "not_legal",
        "duel": "legal",
        "oldschool": "not_legal",
        "premodern": "not_legal",
        "predh": "not_legal"
      },
      "games": [
        "arena",
        "paper",
        "mtgo"
      ],
      "reserved": false,
      "foil": true,
      "nonfoil": true,
      "finishes": [
        "nonfoil",
        "foil",
        "etched"
      ],
      "oversized": false,
      "promo": false,
      "reprint": true,
      "variation": false,
      "set_id": "5064a720-907f-4cb6-a425-766dc1dd7374",
      "set": "sta",
      "set_name": "Strixhaven Mystical Archive",
      "set_type": "masterpiece",
      "set_uri": "https://api.scryfall.com/sets/5064a720-907f-4cb6-a425-766dc1dd7374",
      "set_search_uri": "https://api.scryfall.com/cards/search?order=set&q=e%3Asta&unique=prints",
      "scryfall_set_uri": "https://scryfall.com/sets/sta?utm_source=api",
      "rulings_uri": "https://api.scryfall.com/cards/6a058a72-ebfe-4957-a7dd-ee7471db2498/rulings",
      "prints_search_uri": "https://api.scryfall.com/cards/search?order=released&q=oracleid%3Ae4125377-34c0-4b54-bdf8-4e88f5d24565&unique=prints",
      "collector_number": "64",
      "digital": false,
      "rarity": "mythic",
      "card_back_id": "0aeebaf5-8c7d-4636-9e82-8c27447861f7",
      "artist": "Nagano",
      "artist_ids": [
        "ef08f1af-27cb-4543-b718-8d582b46dafd"
      ],
      "illustration_id": "a9bfdeb9-751c-40b3-b6e3-baa6e230fae1",
      "border_color": "borderless",
      "frame": "2015",
      "security_stamp": "oval",
      "full_art": false,
      "textless": false,
      "booster": false,
      "story_spotlight": false,
      "edhrec_rank": 873,
      "penny_rank": 1129,
      "prices": {
        "usd": "9.16",
        "usd_foil": "17.68",
        "usd_etched": "10.73",
        "eur": "15.16",
        "eur_foil": "20.51",
        "tix": "1.96"
      },
      "related_uris": {
        "tcgplayer_infinite_articles": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Darticle%26game%3Dmagic%26partner%3Dscryfall%26q%3DApproach%2Bof%2Bthe%2BSecond%2BSun",
        "tcgplayer_infinite_decks": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Ddeck%26game%3Dmagic%26partner%3Dscryfall%26q%3DApproach%2Bof%2Bthe%2BSecond%2BSun",
        "edhrec": "https://edhrec.com/route/?cc=Approach+of+the+Second+Sun"
      },
      "purchase_uris": {
        "tcgplayer": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&u=https%3A%2F%2Fwww.tcgplayer.com%2Fproduct%2F235469%3Fpage%3D1",
        "cardmarket": "https://www.cardmarket.com/en/Magic/Products/Singles/Mystical-Archive/Approach-of-the-Second-Sun-V2?referrer=scryfall&utm_campaign=card_prices&utm_medium=text&utm_source=scryfall",
        "cardhoarder": "https://www.cardhoarder.com/cards/99527?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall"
      }
    },
  },
  {
    title: 'getCard - UUID - KO',
    input: {
      name: '4c85d097-e87b-41ee-93c6-0e54ec41b175',
        quantity: 1,
        customFlags: new Map(),
    },
    expected: undefined,
  },
  // TODO Add tests
];

newTestCases.forEach((testCase) => {
  test(testCase.title, (t) => {
    return scryfallHelper.getCard(testCase.input)
      .then((res) => t.deepEqual(res, testCase.expected));
  });
});

////////////////////////////////////////////////////////////////////////////////
//                               getCardsBatch                                //
////////////////////////////////////////////////////////////////////////////////

test('batch fetch', (t) => {
  const cards: ParsedCard[] = [
    {
      name: 'm3c/331',
      quantity: 0,
      language: undefined,
      customFlags: new Map(),
    },
    {
      name: 'm3c/331/de',
      quantity: 0,
      language: 'fr',
      customFlags: new Map(),
    },
    {
      name: 'This should not resolve as it is not a valid card',
      quantity: 0,
      language: undefined,
      customFlags: new Map(),
    },
    {
      name: 'Black Lotus',
      quantity: 0,
      language: undefined,
      customFlags: new Map(),
    },
  ];
  const expectedNames = ['Command Tower', 'Tour de commandement', undefined, 'Black Lotus'];
  return scryfallHelper.getCardsBatch(cards).then((res) => {
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
  return scryfallHelper
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
  return scryfallHelper
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
  return scryfallHelper
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
