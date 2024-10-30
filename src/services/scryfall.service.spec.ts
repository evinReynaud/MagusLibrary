import test from 'ava';

import { ScryfallCard, ScryfallError, ScryfallList } from '../types';

import { testScryfallService } from './common.spec';

////////////////////////////////////////////////////////////////////////////////
//                                 cardSearch                                 //
////////////////////////////////////////////////////////////////////////////////

test('cardsSearch - Finding none', (t) => {
  const expected: ScryfallError = {
    object: 'error',
    code: 'not_found',
    status: 404,
    details: 'Your query didn’t match any cards. Adjust your search terms or refer to the syntax guide at https://scryfall.com/docs/reference',
  };

  return testScryfallService
    .cardsSearch('Non-existant magic card')
    .then((actual: ScryfallList<ScryfallCard> | ScryfallError) => {
      return t.deepEqual(actual, expected);
    });
});

test('cardsSearch - Finding one', (t) => {
  const expected: ScryfallList<ScryfallCard> = {
    "object": "list",
    "total_cards": 1,
    "has_more": false,
    "data": [
      {
        "object": "card",
        "id": "a31ffc9e-d21b-4a8f-ac67-695e38e09e3b",
        "oracle_id": "09cc8709-fe10-472a-b05c-e89f3523018d",
        "multiverse_ids": [
          650150
        ],
        "mtgo_id": 122248,
        "tcgplayer_id": 535824,
        "cardmarket_id": 753306,
        "name": "Austere Command",
        "lang": "en",
        "released_at": "2024-02-09",
        "uri": "https://api.scryfall.com/cards/a31ffc9e-d21b-4a8f-ac67-695e38e09e3b",
        "scryfall_uri": "https://scryfall.com/card/mkc/56/austere-command?utm_source=api",
        "layout": "normal",
        "highres_image": true,
        "image_status": "highres_scan",
        "image_uris": {
          "small": "https://cards.scryfall.io/small/front/a/3/a31ffc9e-d21b-4a8f-ac67-695e38e09e3b.jpg?1706240553",
          "normal": "https://cards.scryfall.io/normal/front/a/3/a31ffc9e-d21b-4a8f-ac67-695e38e09e3b.jpg?1706240553",
          "large": "https://cards.scryfall.io/large/front/a/3/a31ffc9e-d21b-4a8f-ac67-695e38e09e3b.jpg?1706240553",
          "png": "https://cards.scryfall.io/png/front/a/3/a31ffc9e-d21b-4a8f-ac67-695e38e09e3b.png?1706240553",
          "art_crop": "https://cards.scryfall.io/art_crop/front/a/3/a31ffc9e-d21b-4a8f-ac67-695e38e09e3b.jpg?1706240553",
          "border_crop": "https://cards.scryfall.io/border_crop/front/a/3/a31ffc9e-d21b-4a8f-ac67-695e38e09e3b.jpg?1706240553"
        },
        "mana_cost": "{4}{W}{W}",
        "cmc": 6,
        "type_line": "Sorcery",
        "oracle_text": "Choose two —\n• Destroy all artifacts.\n• Destroy all enchantments.\n• Destroy all creatures with mana value 3 or less.\n• Destroy all creatures with mana value 4 or greater.",
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
          "historic": "not_legal",
          "timeless": "not_legal",
          "gladiator": "not_legal",
          "pioneer": "not_legal",
          "explorer": "not_legal",
          "modern": "legal",
          "legacy": "legal",
          "pauper": "not_legal",
          "vintage": "legal",
          "penny": "legal",
          "commander": "legal",
          "oathbreaker": "legal",
          "standardbrawl": "not_legal",
          "brawl": "not_legal",
          "alchemy": "not_legal",
          "paupercommander": "not_legal",
          "duel": "legal",
          "oldschool": "not_legal",
          "premodern": "not_legal",
          "predh": "legal"
        },
        "games": [
          "paper",
          "mtgo"
        ],
        "reserved": false,
        "foil": false,
        "nonfoil": true,
        "finishes": [
          "nonfoil"
        ],
        "oversized": false,
        "promo": false,
        "reprint": true,
        "variation": false,
        "set_id": "286c37ca-ba65-4d3e-8c5d-d1878d88fd95",
        "set": "mkc",
        "set_name": "Murders at Karlov Manor Commander",
        "set_type": "commander",
        "set_uri": "https://api.scryfall.com/sets/286c37ca-ba65-4d3e-8c5d-d1878d88fd95",
        "set_search_uri": "https://api.scryfall.com/cards/search?order=set&q=e%3Amkc&unique=prints",
        "scryfall_set_uri": "https://scryfall.com/sets/mkc?utm_source=api",
        "rulings_uri": "https://api.scryfall.com/cards/a31ffc9e-d21b-4a8f-ac67-695e38e09e3b/rulings",
        "prints_search_uri": "https://api.scryfall.com/cards/search?order=released&q=oracleid%3A09cc8709-fe10-472a-b05c-e89f3523018d&unique=prints",
        "collector_number": "56",
        "digital": false,
        "rarity": "rare",
        "card_back_id": "0aeebaf5-8c7d-4636-9e82-8c27447861f7",
        "artist": "Anna Steinbauer",
        "artist_ids": [
          "3516496c-c279-4b56-8239-720683d03ae0"
        ],
        "illustration_id": "7c6a01f8-e1f6-4fe4-b275-b2582be98783",
        "border_color": "black",
        "frame": "2015",
        "security_stamp": "oval",
        "full_art": false,
        "textless": false,
        "booster": false,
        "story_spotlight": false,
        "edhrec_rank": 150,
        "penny_rank": 4421,
        "prices": {
          "usd": "0.46",
          "usd_foil": null,
          "usd_etched": null,
          "eur": "0.55",
          "eur_foil": null,
          "tix": "0.34"
        },
        "related_uris": {
          "gatherer": "https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=650150&printed=false",
          "tcgplayer_infinite_articles": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Darticle%26game%3Dmagic%26partner%3Dscryfall%26q%3DAustere%2BCommand",
          "tcgplayer_infinite_decks": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Ddeck%26game%3Dmagic%26partner%3Dscryfall%26q%3DAustere%2BCommand",
          "edhrec": "https://edhrec.com/route/?cc=Austere+Command"
        },
        "purchase_uris": {
          "tcgplayer": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&u=https%3A%2F%2Fwww.tcgplayer.com%2Fproduct%2F535824%3Fpage%3D1",
          "cardmarket": "https://www.cardmarket.com/en/Magic/Products/Singles/Commander-Murders-at-Karlov-Manor/Austere-Command?referrer=scryfall&utm_campaign=card_prices&utm_medium=text&utm_source=scryfall",
          "cardhoarder": "https://www.cardhoarder.com/cards/122248?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall"
        }
      }
    ]
  };

  return testScryfallService
    .cardsSearch('Austere Command')
    .then((actual: ScryfallList<ScryfallCard> | ScryfallError) => {
      return t.deepEqual(actual, expected);
    });
});

test('cardsSearch - Finding many', (t) => {
  const expected: ScryfallList<ScryfallCard> = {
    "object": "list",
    "total_cards": 18,
    "has_more": false,
    "data": [
      {
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
      {
        "object": "card",
        "id": "bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd",
        "oracle_id": "5089ec1a-f881-4d55-af14-5d996171203b",
        "multiverse_ids": [
          382866
        ],
        "mtgo_id": 53155,
        "mtgo_foil_id": 53156,
        "name": "Black Lotus",
        "lang": "en",
        "released_at": "2014-06-16",
        "uri": "https://api.scryfall.com/cards/bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd",
        "scryfall_uri": "https://scryfall.com/card/vma/4/black-lotus?utm_source=api",
        "layout": "normal",
        "highres_image": true,
        "image_status": "highres_scan",
        "image_uris": {
          "small": "https://cards.scryfall.io/small/front/b/d/bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd.jpg?1614638838",
          "normal": "https://cards.scryfall.io/normal/front/b/d/bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd.jpg?1614638838",
          "large": "https://cards.scryfall.io/large/front/b/d/bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd.jpg?1614638838",
          "png": "https://cards.scryfall.io/png/front/b/d/bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd.png?1614638838",
          "art_crop": "https://cards.scryfall.io/art_crop/front/b/d/bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd.jpg?1614638838",
          "border_crop": "https://cards.scryfall.io/border_crop/front/b/d/bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd.jpg?1614638838"
        },
        "mana_cost": "{0}",
        "cmc": 0,
        "type_line": "Artifact",
        "oracle_text": "{T}, Sacrifice Black Lotus: Add three mana of any one color.",
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
          "legacy": "banned",
          "pauper": "not_legal",
          "vintage": "restricted",
          "penny": "not_legal",
          "commander": "banned",
          "oathbreaker": "banned",
          "standardbrawl": "not_legal",
          "brawl": "not_legal",
          "alchemy": "not_legal",
          "paupercommander": "not_legal",
          "duel": "banned",
          "oldschool": "not_legal",
          "premodern": "not_legal",
          "predh": "banned"
        },
        "games": [
          "mtgo"
        ],
        "reserved": true,
        "foil": true,
        "nonfoil": true,
        "finishes": [
          "nonfoil",
          "foil"
        ],
        "oversized": false,
        "promo": false,
        "reprint": true,
        "variation": false,
        "set_id": "a944551a-73fa-41cd-9159-e8d0e4674403",
        "set": "vma",
        "set_name": "Vintage Masters",
        "set_type": "masters",
        "set_uri": "https://api.scryfall.com/sets/a944551a-73fa-41cd-9159-e8d0e4674403",
        "set_search_uri": "https://api.scryfall.com/cards/search?order=set&q=e%3Avma&unique=prints",
        "scryfall_set_uri": "https://scryfall.com/sets/vma?utm_source=api",
        "rulings_uri": "https://api.scryfall.com/cards/bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd/rulings",
        "prints_search_uri": "https://api.scryfall.com/cards/search?order=released&q=oracleid%3A5089ec1a-f881-4d55-af14-5d996171203b&unique=prints",
        "collector_number": "4",
        "digital": true,
        "rarity": "bonus",
        "card_back_id": "0aeebaf5-8c7d-4636-9e82-8c27447861f7",
        "artist": "Chris Rahn",
        "artist_ids": [
          "7742047e-0f80-4c0f-a530-d07460165e86"
        ],
        "illustration_id": "da62ded1-bedd-44c6-8950-ca56e691a899",
        "border_color": "black",
        "frame": "2015",
        "security_stamp": "oval",
        "full_art": false,
        "textless": false,
        "booster": true,
        "story_spotlight": false,
        "prices": {
          "usd": null,
          "usd_foil": null,
          "usd_etched": null,
          "eur": null,
          "eur_foil": null,
          "tix": "28.09"
        },
        "related_uris": {
          "gatherer": "https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=382866&printed=false",
          "tcgplayer_infinite_articles": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Darticle%26game%3Dmagic%26partner%3Dscryfall%26q%3DBlack%2BLotus",
          "tcgplayer_infinite_decks": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Ddeck%26game%3Dmagic%26partner%3Dscryfall%26q%3DBlack%2BLotus",
          "edhrec": "https://edhrec.com/route/?cc=Black+Lotus"
        },
        "purchase_uris": {
          "tcgplayer": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&u=https%3A%2F%2Fwww.tcgplayer.com%2Fsearch%2Fmagic%2Fproduct%3FproductLineName%3Dmagic%26q%3DBlack%2BLotus%26view%3Dgrid",
          "cardmarket": "https://www.cardmarket.com/en/Magic/Products/Search?referrer=scryfall&searchString=Black+Lotus&utm_campaign=card_prices&utm_medium=text&utm_source=scryfall",
          "cardhoarder": "https://www.cardhoarder.com/cards/53155?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall"
        }
      },
      {
        "object": "card",
        "id": "992af90e-5ab9-46e1-af1d-c741be2605c3",
        "oracle_id": "c0a448ee-e5f9-4e57-85b0-f6d401018170",
        "multiverse_ids": [
          583569
        ],
        "tcgplayer_id": 288207,
        "cardmarket_id": 677553,
        "name": "Geek Lotus Warrior",
        "lang": "en",
        "released_at": "2022-10-07",
        "uri": "https://api.scryfall.com/cards/992af90e-5ab9-46e1-af1d-c741be2605c3",
        "scryfall_uri": "https://scryfall.com/card/sunf/32/geek-lotus-warrior?utm_source=api",
        "layout": "normal",
        "highres_image": true,
        "image_status": "highres_scan",
        "image_uris": {
          "small": "https://cards.scryfall.io/small/front/9/9/992af90e-5ab9-46e1-af1d-c741be2605c3.jpg?1675457283",
          "normal": "https://cards.scryfall.io/normal/front/9/9/992af90e-5ab9-46e1-af1d-c741be2605c3.jpg?1675457283",
          "large": "https://cards.scryfall.io/large/front/9/9/992af90e-5ab9-46e1-af1d-c741be2605c3.jpg?1675457283",
          "png": "https://cards.scryfall.io/png/front/9/9/992af90e-5ab9-46e1-af1d-c741be2605c3.png?1675457283",
          "art_crop": "https://cards.scryfall.io/art_crop/front/9/9/992af90e-5ab9-46e1-af1d-c741be2605c3.jpg?1675457283",
          "border_crop": "https://cards.scryfall.io/border_crop/front/9/9/992af90e-5ab9-46e1-af1d-c741be2605c3.jpg?1675457283"
        },
        "mana_cost": "",
        "cmc": 0,
        "type_line": "Stickers",
        "oracle_text": "{TK}{TK} — {2}: This creature gets +2/+0 until end of turn.\n{TK}{TK}{TK}{TK} — Whenever a creature enters under your control, this permanent deals 2 damage to target player.\n{TK}{TK} — 4/1\n{TK}{TK}{TK} — 3/6",
        "colors": [],
        "color_identity": [],
        "keywords": [],
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
          "commander": "legal",
          "oathbreaker": "banned",
          "standardbrawl": "not_legal",
          "brawl": "not_legal",
          "alchemy": "not_legal",
          "paupercommander": "legal",
          "duel": "banned",
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
        "set_id": "565e3302-2fed-487e-a0f7-7f8037d25030",
        "set": "sunf",
        "set_name": "Unfinity Sticker Sheets",
        "set_type": "funny",
        "set_uri": "https://api.scryfall.com/sets/565e3302-2fed-487e-a0f7-7f8037d25030",
        "set_search_uri": "https://api.scryfall.com/cards/search?order=set&q=e%3Asunf&unique=prints",
        "scryfall_set_uri": "https://scryfall.com/sets/sunf?utm_source=api",
        "rulings_uri": "https://api.scryfall.com/cards/992af90e-5ab9-46e1-af1d-c741be2605c3/rulings",
        "prints_search_uri": "https://api.scryfall.com/cards/search?order=released&q=oracleid%3Ac0a448ee-e5f9-4e57-85b0-f6d401018170&unique=prints",
        "collector_number": "32",
        "digital": false,
        "rarity": "common",
        "card_back_id": "36ba7259-f9d7-48bc-9cfd-11d5fd0f544b",
        "artist": "Larissa Hasenheit & Mina Jeon",
        "artist_ids": [
          "3de12ff8-3701-4154-8407-f102f44670dd",
          "d58fedc9-b2a8-4a12-a942-fd1efceacb9c"
        ],
        "illustration_id": "6289cc06-bc89-4d99-b3fe-0da49961860a",
        "border_color": "black",
        "frame": "2015",
        "full_art": false,
        "textless": false,
        "booster": false,
        "story_spotlight": false,
        "prices": {
          "usd": "0.14",
          "usd_foil": null,
          "usd_etched": null,
          "eur": "0.19",
          "eur_foil": null,
          "tix": null
        },
        "related_uris": {
          "gatherer": "https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=583569&printed=false",
          "tcgplayer_infinite_articles": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Darticle%26game%3Dmagic%26partner%3Dscryfall%26q%3DGeek%2BLotus%2BWarrior",
          "tcgplayer_infinite_decks": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Ddeck%26game%3Dmagic%26partner%3Dscryfall%26q%3DGeek%2BLotus%2BWarrior",
          "edhrec": "https://edhrec.com/route/?cc=Geek+Lotus+Warrior"
        },
        "purchase_uris": {
          "tcgplayer": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&u=https%3A%2F%2Fwww.tcgplayer.com%2Fproduct%2F288207%3Fpage%3D1",
          "cardmarket": "https://www.cardmarket.com/en/Magic/Products/Singles/Unfinity-Extras/Geek-Lotus-Warrior-Sticker?referrer=scryfall&utm_campaign=card_prices&utm_medium=text&utm_source=scryfall",
          "cardhoarder": "https://www.cardhoarder.com/cards?affiliate_id=scryfall&data%5Bsearch%5D=Geek+Lotus+Warrior&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall"
        }
      },
      {
        "object": "card",
        "id": "aa5e88f1-0ddf-45d7-bbd0-baa88d121867",
        "oracle_id": "9a02a9a7-39d9-4763-85d3-747a0540b60b",
        "multiverse_ids": [],
        "tcgplayer_id": 589341,
        "name": "Gilded Lotus",
        "lang": "en",
        "released_at": "2024-11-15",
        "uri": "https://api.scryfall.com/cards/aa5e88f1-0ddf-45d7-bbd0-baa88d121867",
        "scryfall_uri": "https://scryfall.com/card/fdn/725/gilded-lotus?utm_source=api",
        "layout": "normal",
        "highres_image": true,
        "image_status": "highres_scan",
        "image_uris": {
          "small": "https://cards.scryfall.io/small/front/a/a/aa5e88f1-0ddf-45d7-bbd0-baa88d121867.jpg?1729888103",
          "normal": "https://cards.scryfall.io/normal/front/a/a/aa5e88f1-0ddf-45d7-bbd0-baa88d121867.jpg?1729888103",
          "large": "https://cards.scryfall.io/large/front/a/a/aa5e88f1-0ddf-45d7-bbd0-baa88d121867.jpg?1729888103",
          "png": "https://cards.scryfall.io/png/front/a/a/aa5e88f1-0ddf-45d7-bbd0-baa88d121867.png?1729888103",
          "art_crop": "https://cards.scryfall.io/art_crop/front/a/a/aa5e88f1-0ddf-45d7-bbd0-baa88d121867.jpg?1729888103",
          "border_crop": "https://cards.scryfall.io/border_crop/front/a/a/aa5e88f1-0ddf-45d7-bbd0-baa88d121867.jpg?1729888103"
        },
        "mana_cost": "{5}",
        "cmc": 5,
        "type_line": "Artifact",
        "oracle_text": "{T}: Add three mana of any one color.",
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
          "future": "legal",
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
          "predh": "legal"
        },
        "games": [
          "paper",
          "arena",
          "mtgo"
        ],
        "reserved": false,
        "foil": true,
        "nonfoil": true,
        "finishes": [
          "nonfoil",
          "foil"
        ],
        "oversized": false,
        "promo": false,
        "reprint": true,
        "variation": false,
        "set_id": "a7ecb771-d1b6-4dec-8cf5-8d45179f21e0",
        "set": "fdn",
        "set_name": "Foundations",
        "set_type": "core",
        "set_uri": "https://api.scryfall.com/sets/a7ecb771-d1b6-4dec-8cf5-8d45179f21e0",
        "set_search_uri": "https://api.scryfall.com/cards/search?order=set&q=e%3Afdn&unique=prints",
        "scryfall_set_uri": "https://scryfall.com/sets/fdn?utm_source=api",
        "rulings_uri": "https://api.scryfall.com/cards/aa5e88f1-0ddf-45d7-bbd0-baa88d121867/rulings",
        "prints_search_uri": "https://api.scryfall.com/cards/search?order=released&q=oracleid%3A9a02a9a7-39d9-4763-85d3-747a0540b60b&unique=prints",
        "collector_number": "725",
        "digital": false,
        "rarity": "rare",
        "flavor_text": "Over such beauty, wars are fought. With such power, wars are won.",
        "card_back_id": "0aeebaf5-8c7d-4636-9e82-8c27447861f7",
        "artist": "Volkan Baǵa",
        "artist_ids": [
          "93bec3c0-0260-4d31-8064-5d01efb4153f"
        ],
        "illustration_id": "3b66138e-2f52-42d8-bfc3-6376e996c8e7",
        "border_color": "black",
        "frame": "2015",
        "security_stamp": "oval",
        "full_art": false,
        "textless": false,
        "booster": false,
        "story_spotlight": false,
        "edhrec_rank": 334,
        "penny_rank": 2378,
        "prices": {
          "usd": null,
          "usd_foil": null,
          "usd_etched": null,
          "eur": null,
          "eur_foil": null,
          "tix": null
        },
        "related_uris": {
          "tcgplayer_infinite_articles": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Darticle%26game%3Dmagic%26partner%3Dscryfall%26q%3DGilded%2BLotus",
          "tcgplayer_infinite_decks": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Ddeck%26game%3Dmagic%26partner%3Dscryfall%26q%3DGilded%2BLotus",
          "edhrec": "https://edhrec.com/route/?cc=Gilded+Lotus"
        },
        "purchase_uris": {
          "tcgplayer": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&u=https%3A%2F%2Fwww.tcgplayer.com%2Fproduct%2F589341%3Fpage%3D1",
          "cardmarket": "https://www.cardmarket.com/en/Magic/Products/Search?referrer=scryfall&searchString=Gilded+Lotus&utm_campaign=card_prices&utm_medium=text&utm_source=scryfall",
          "cardhoarder": "https://www.cardhoarder.com/cards?affiliate_id=scryfall&data%5Bsearch%5D=Gilded+Lotus&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall"
        }
      },
      {
        "object": "card",
        "id": "d7183700-6941-4a3d-a581-4f33bea795e9",
        "oracle_id": "23216e59-f147-4bb7-a698-12777c2f8584",
        "multiverse_ids": [
          627860
        ],
        "mtgo_id": 115021,
        "tcgplayer_id": 484938,
        "cardmarket_id": 721716,
        "name": "Jeweled Lotus",
        "lang": "en",
        "released_at": "2023-08-04",
        "uri": "https://api.scryfall.com/cards/d7183700-6941-4a3d-a581-4f33bea795e9",
        "scryfall_uri": "https://scryfall.com/card/cmm/396/jeweled-lotus?utm_source=api",
        "layout": "normal",
        "highres_image": true,
        "image_status": "highres_scan",
        "image_uris": {
          "small": "https://cards.scryfall.io/small/front/d/7/d7183700-6941-4a3d-a581-4f33bea795e9.jpg?1727093687",
          "normal": "https://cards.scryfall.io/normal/front/d/7/d7183700-6941-4a3d-a581-4f33bea795e9.jpg?1727093687",
          "large": "https://cards.scryfall.io/large/front/d/7/d7183700-6941-4a3d-a581-4f33bea795e9.jpg?1727093687",
          "png": "https://cards.scryfall.io/png/front/d/7/d7183700-6941-4a3d-a581-4f33bea795e9.png?1727093687",
          "art_crop": "https://cards.scryfall.io/art_crop/front/d/7/d7183700-6941-4a3d-a581-4f33bea795e9.jpg?1727093687",
          "border_crop": "https://cards.scryfall.io/border_crop/front/d/7/d7183700-6941-4a3d-a581-4f33bea795e9.jpg?1727093687"
        },
        "mana_cost": "{0}",
        "cmc": 0,
        "type_line": "Artifact",
        "oracle_text": "{T}, Sacrifice Jeweled Lotus: Add three mana of any one color. Spend this mana only to cast your commander.",
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
          "legacy": "legal",
          "pauper": "not_legal",
          "vintage": "legal",
          "penny": "not_legal",
          "commander": "banned",
          "oathbreaker": "banned",
          "standardbrawl": "not_legal",
          "brawl": "not_legal",
          "alchemy": "not_legal",
          "paupercommander": "not_legal",
          "duel": "banned",
          "oldschool": "not_legal",
          "premodern": "not_legal",
          "predh": "not_legal"
        },
        "games": [
          "paper",
          "mtgo"
        ],
        "reserved": false,
        "foil": true,
        "nonfoil": true,
        "finishes": [
          "nonfoil",
          "foil"
        ],
        "oversized": false,
        "promo": false,
        "reprint": true,
        "variation": false,
        "set_id": "cd05036f-2698-43e6-a48e-5c8d82f0a551",
        "set": "cmm",
        "set_name": "Commander Masters",
        "set_type": "masters",
        "set_uri": "https://api.scryfall.com/sets/cd05036f-2698-43e6-a48e-5c8d82f0a551",
        "set_search_uri": "https://api.scryfall.com/cards/search?order=set&q=e%3Acmm&unique=prints",
        "scryfall_set_uri": "https://scryfall.com/sets/cmm?utm_source=api",
        "rulings_uri": "https://api.scryfall.com/cards/d7183700-6941-4a3d-a581-4f33bea795e9/rulings",
        "prints_search_uri": "https://api.scryfall.com/cards/search?order=released&q=oracleid%3A23216e59-f147-4bb7-a698-12777c2f8584&unique=prints",
        "collector_number": "396",
        "digital": false,
        "rarity": "mythic",
        "flavor_text": "\"I've seen my share of baubles, minister. Whatever ostentatious bit of glitter you have there won't convince me to ... Oh my.\"\n—Emperor Ayrelion",
        "card_back_id": "0aeebaf5-8c7d-4636-9e82-8c27447861f7",
        "artist": "Alayna Danner",
        "artist_ids": [
          "bb677b1a-ce51-4888-83d6-5a94de461ff9"
        ],
        "illustration_id": "a015019f-1a7d-4d07-8788-9b32b003f720",
        "border_color": "black",
        "frame": "2015",
        "security_stamp": "oval",
        "full_art": false,
        "textless": false,
        "booster": true,
        "story_spotlight": false,
        "edhrec_rank": 129,
        "preview": {
          "source": "Wizards of the Coast",
          "source_uri": "https://magic.wizards.com/en/news/announcements/commander-masters-arrives-august-4-2023",
          "previewed_at": "2023-02-21"
        },
        "prices": {
          "usd": "51.41",
          "usd_foil": "73.82",
          "usd_etched": null,
          "eur": "40.98",
          "eur_foil": "62.72",
          "tix": "12.16"
        },
        "related_uris": {
          "gatherer": "https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=627860&printed=false",
          "tcgplayer_infinite_articles": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Darticle%26game%3Dmagic%26partner%3Dscryfall%26q%3DJeweled%2BLotus",
          "tcgplayer_infinite_decks": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Ddeck%26game%3Dmagic%26partner%3Dscryfall%26q%3DJeweled%2BLotus",
          "edhrec": "https://edhrec.com/route/?cc=Jeweled+Lotus"
        },
        "purchase_uris": {
          "tcgplayer": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&u=https%3A%2F%2Fwww.tcgplayer.com%2Fproduct%2F484938%3Fpage%3D1",
          "cardmarket": "https://www.cardmarket.com/en/Magic/Products/Singles/Commander-Masters/Jeweled-Lotus?referrer=scryfall&utm_campaign=card_prices&utm_medium=text&utm_source=scryfall",
          "cardhoarder": "https://www.cardhoarder.com/cards/115021?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall"
        }
      },
      {
        "object": "card",
        "id": "db89ae4d-1cc2-41d8-a4de-a54b958c4429",
        "oracle_id": "04cf02dc-f053-414e-87d8-1537f25bcbf4",
        "multiverse_ids": [
          509635
        ],
        "mtgo_id": 86915,
        "tcgplayer_id": 234341,
        "cardmarket_id": 542701,
        "name": "Lotus Bloom",
        "lang": "en",
        "released_at": "2021-03-19",
        "uri": "https://api.scryfall.com/cards/db89ae4d-1cc2-41d8-a4de-a54b958c4429",
        "scryfall_uri": "https://scryfall.com/card/tsr/270/lotus-bloom?utm_source=api",
        "layout": "normal",
        "highres_image": true,
        "image_status": "highres_scan",
        "image_uris": {
          "small": "https://cards.scryfall.io/small/front/d/b/db89ae4d-1cc2-41d8-a4de-a54b958c4429.jpg?1619398986",
          "normal": "https://cards.scryfall.io/normal/front/d/b/db89ae4d-1cc2-41d8-a4de-a54b958c4429.jpg?1619398986",
          "large": "https://cards.scryfall.io/large/front/d/b/db89ae4d-1cc2-41d8-a4de-a54b958c4429.jpg?1619398986",
          "png": "https://cards.scryfall.io/png/front/d/b/db89ae4d-1cc2-41d8-a4de-a54b958c4429.png?1619398986",
          "art_crop": "https://cards.scryfall.io/art_crop/front/d/b/db89ae4d-1cc2-41d8-a4de-a54b958c4429.jpg?1619398986",
          "border_crop": "https://cards.scryfall.io/border_crop/front/d/b/db89ae4d-1cc2-41d8-a4de-a54b958c4429.jpg?1619398986"
        },
        "mana_cost": "",
        "cmc": 0,
        "type_line": "Artifact",
        "oracle_text": "Suspend 3—{0} (Rather than cast this card from your hand, pay {0} and exile it with three time counters on it. At the beginning of your upkeep, remove a time counter. When the last is removed, you may cast it without paying its mana cost.)\n{T}, Sacrifice Lotus Bloom: Add three mana of any one color.",
        "colors": [],
        "color_identity": [],
        "keywords": [
          "Suspend"
        ],
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
          "modern": "legal",
          "legacy": "legal",
          "pauper": "not_legal",
          "vintage": "legal",
          "penny": "not_legal",
          "commander": "legal",
          "oathbreaker": "legal",
          "standardbrawl": "not_legal",
          "brawl": "not_legal",
          "alchemy": "not_legal",
          "paupercommander": "not_legal",
          "duel": "legal",
          "oldschool": "not_legal",
          "premodern": "not_legal",
          "predh": "legal"
        },
        "games": [
          "paper",
          "mtgo"
        ],
        "reserved": false,
        "foil": true,
        "nonfoil": true,
        "finishes": [
          "nonfoil",
          "foil"
        ],
        "oversized": false,
        "promo": false,
        "reprint": true,
        "variation": false,
        "set_id": "11e90d1b-0502-43e6-b056-e24836523c13",
        "set": "tsr",
        "set_name": "Time Spiral Remastered",
        "set_type": "masters",
        "set_uri": "https://api.scryfall.com/sets/11e90d1b-0502-43e6-b056-e24836523c13",
        "set_search_uri": "https://api.scryfall.com/cards/search?order=set&q=e%3Atsr&unique=prints",
        "scryfall_set_uri": "https://scryfall.com/sets/tsr?utm_source=api",
        "rulings_uri": "https://api.scryfall.com/cards/db89ae4d-1cc2-41d8-a4de-a54b958c4429/rulings",
        "prints_search_uri": "https://api.scryfall.com/cards/search?order=released&q=oracleid%3A04cf02dc-f053-414e-87d8-1537f25bcbf4&unique=prints",
        "collector_number": "270",
        "digital": false,
        "rarity": "rare",
        "card_back_id": "0aeebaf5-8c7d-4636-9e82-8c27447861f7",
        "artist": "Mark Zug",
        "artist_ids": [
          "48e2b98c-5467-4671-bd42-4c3746115117"
        ],
        "illustration_id": "2cc790c6-7d15-439a-b604-be95c23e0d81",
        "border_color": "black",
        "frame": "2015",
        "security_stamp": "oval",
        "full_art": false,
        "textless": false,
        "booster": true,
        "story_spotlight": false,
        "edhrec_rank": 3265,
        "penny_rank": 162,
        "preview": {
          "source": "Wizards of the Coast",
          "source_uri": "https://magic.wizards.com/en/articles/archive/card-image-gallery/time-spiral-remastered",
          "previewed_at": "2021-02-25"
        },
        "prices": {
          "usd": "8.18",
          "usd_foil": "4.45",
          "usd_etched": null,
          "eur": "2.05",
          "eur_foil": "2.72",
          "tix": "0.41"
        },
        "related_uris": {
          "gatherer": "https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=509635&printed=false",
          "tcgplayer_infinite_articles": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Darticle%26game%3Dmagic%26partner%3Dscryfall%26q%3DLotus%2BBloom",
          "tcgplayer_infinite_decks": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Ddeck%26game%3Dmagic%26partner%3Dscryfall%26q%3DLotus%2BBloom",
          "edhrec": "https://edhrec.com/route/?cc=Lotus+Bloom"
        },
        "purchase_uris": {
          "tcgplayer": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&u=https%3A%2F%2Fwww.tcgplayer.com%2Fproduct%2F234341%3Fpage%3D1",
          "cardmarket": "https://www.cardmarket.com/en/Magic/Products/Singles/Time-Spiral-Remastered/Lotus-Bloom?referrer=scryfall&utm_campaign=card_prices&utm_medium=text&utm_source=scryfall",
          "cardhoarder": "https://www.cardhoarder.com/cards/86915?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall"
        }
      },
      {
        "object": "card",
        "id": "c5b92fd6-e3a7-4d50-b94f-1508a830b799",
        "oracle_id": "32e66ea0-5f35-4df8-8d00-580403c51bb5",
        "multiverse_ids": [
          599104
        ],
        "mtgo_id": 107989,
        "tcgplayer_id": 457273,
        "cardmarket_id": 688454,
        "name": "Lotus Blossom",
        "lang": "en",
        "released_at": "2023-01-13",
        "uri": "https://api.scryfall.com/cards/c5b92fd6-e3a7-4d50-b94f-1508a830b799",
        "scryfall_uri": "https://scryfall.com/card/dmr/230/lotus-blossom?utm_source=api",
        "layout": "normal",
        "highres_image": true,
        "image_status": "highres_scan",
        "image_uris": {
          "small": "https://cards.scryfall.io/small/front/c/5/c5b92fd6-e3a7-4d50-b94f-1508a830b799.jpg?1675201056",
          "normal": "https://cards.scryfall.io/normal/front/c/5/c5b92fd6-e3a7-4d50-b94f-1508a830b799.jpg?1675201056",
          "large": "https://cards.scryfall.io/large/front/c/5/c5b92fd6-e3a7-4d50-b94f-1508a830b799.jpg?1675201056",
          "png": "https://cards.scryfall.io/png/front/c/5/c5b92fd6-e3a7-4d50-b94f-1508a830b799.png?1675201056",
          "art_crop": "https://cards.scryfall.io/art_crop/front/c/5/c5b92fd6-e3a7-4d50-b94f-1508a830b799.jpg?1675201056",
          "border_crop": "https://cards.scryfall.io/border_crop/front/c/5/c5b92fd6-e3a7-4d50-b94f-1508a830b799.jpg?1675201056"
        },
        "mana_cost": "{2}",
        "cmc": 2,
        "type_line": "Artifact",
        "oracle_text": "At the beginning of your upkeep, you may put a petal counter on Lotus Blossom.\n{T}, Sacrifice Lotus Blossom: Add X mana of any one color, where X is the number of petal counters on Lotus Blossom.",
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
          "legacy": "legal",
          "pauper": "not_legal",
          "vintage": "legal",
          "penny": "not_legal",
          "commander": "legal",
          "oathbreaker": "legal",
          "standardbrawl": "not_legal",
          "brawl": "not_legal",
          "alchemy": "not_legal",
          "paupercommander": "not_legal",
          "duel": "legal",
          "oldschool": "not_legal",
          "premodern": "legal",
          "predh": "legal"
        },
        "games": [
          "paper",
          "mtgo"
        ],
        "reserved": false,
        "foil": true,
        "nonfoil": true,
        "finishes": [
          "nonfoil",
          "foil"
        ],
        "oversized": false,
        "promo": false,
        "reprint": true,
        "variation": false,
        "set_id": "ca4c2884-e539-4b7f-980d-5d6a50220f2a",
        "set": "dmr",
        "set_name": "Dominaria Remastered",
        "set_type": "masters",
        "set_uri": "https://api.scryfall.com/sets/ca4c2884-e539-4b7f-980d-5d6a50220f2a",
        "set_search_uri": "https://api.scryfall.com/cards/search?order=set&q=e%3Admr&unique=prints",
        "scryfall_set_uri": "https://scryfall.com/sets/dmr?utm_source=api",
        "rulings_uri": "https://api.scryfall.com/cards/c5b92fd6-e3a7-4d50-b94f-1508a830b799/rulings",
        "prints_search_uri": "https://api.scryfall.com/cards/search?order=released&q=oracleid%3A32e66ea0-5f35-4df8-8d00-580403c51bb5&unique=prints",
        "collector_number": "230",
        "digital": false,
        "rarity": "rare",
        "card_back_id": "0aeebaf5-8c7d-4636-9e82-8c27447861f7",
        "artist": "Randy Gallegos",
        "artist_ids": [
          "a5048cc7-438a-4378-98e4-da99b78e1db0"
        ],
        "illustration_id": "341f716c-3bf4-4c52-a50c-d0e370a96883",
        "border_color": "black",
        "frame": "2015",
        "security_stamp": "oval",
        "full_art": false,
        "textless": false,
        "booster": true,
        "story_spotlight": false,
        "edhrec_rank": 9684,
        "penny_rank": 7323,
        "prices": {
          "usd": "0.37",
          "usd_foil": "0.28",
          "usd_etched": null,
          "eur": "0.41",
          "eur_foil": "0.50",
          "tix": "0.14"
        },
        "related_uris": {
          "gatherer": "https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=599104&printed=false",
          "tcgplayer_infinite_articles": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Darticle%26game%3Dmagic%26partner%3Dscryfall%26q%3DLotus%2BBlossom",
          "tcgplayer_infinite_decks": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Ddeck%26game%3Dmagic%26partner%3Dscryfall%26q%3DLotus%2BBlossom",
          "edhrec": "https://edhrec.com/route/?cc=Lotus+Blossom"
        },
        "purchase_uris": {
          "tcgplayer": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&u=https%3A%2F%2Fwww.tcgplayer.com%2Fproduct%2F457273%3Fpage%3D1",
          "cardmarket": "https://www.cardmarket.com/en/Magic/Products/Singles/Dominaria-Remastered/Lotus-Blossom?referrer=scryfall&utm_campaign=card_prices&utm_medium=text&utm_source=scryfall",
          "cardhoarder": "https://www.cardhoarder.com/cards/107989?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall"
        }
      },
      {
        "object": "card",
        "id": "a4b759f0-901f-4be3-93fa-224609b08d48",
        "oracle_id": "8ad91f64-ccab-4edc-bd54-b2ee9267d614",
        "multiverse_ids": [
          491841
        ],
        "mtgo_id": 83375,
        "arena_id": 73402,
        "tcgplayer_id": 221778,
        "cardmarket_id": 494579,
        "name": "Lotus Cobra",
        "lang": "en",
        "released_at": "2020-09-25",
        "uri": "https://api.scryfall.com/cards/a4b759f0-901f-4be3-93fa-224609b08d48",
        "scryfall_uri": "https://scryfall.com/card/znr/193/lotus-cobra?utm_source=api",
        "layout": "normal",
        "highres_image": true,
        "image_status": "highres_scan",
        "image_uris": {
          "small": "https://cards.scryfall.io/small/front/a/4/a4b759f0-901f-4be3-93fa-224609b08d48.jpg?1604199124",
          "normal": "https://cards.scryfall.io/normal/front/a/4/a4b759f0-901f-4be3-93fa-224609b08d48.jpg?1604199124",
          "large": "https://cards.scryfall.io/large/front/a/4/a4b759f0-901f-4be3-93fa-224609b08d48.jpg?1604199124",
          "png": "https://cards.scryfall.io/png/front/a/4/a4b759f0-901f-4be3-93fa-224609b08d48.png?1604199124",
          "art_crop": "https://cards.scryfall.io/art_crop/front/a/4/a4b759f0-901f-4be3-93fa-224609b08d48.jpg?1604199124",
          "border_crop": "https://cards.scryfall.io/border_crop/front/a/4/a4b759f0-901f-4be3-93fa-224609b08d48.jpg?1604199124"
        },
        "mana_cost": "{1}{G}",
        "cmc": 2,
        "type_line": "Creature — Snake",
        "oracle_text": "Landfall — Whenever a land you control enters, add one mana of any color.",
        "power": "2",
        "toughness": "1",
        "colors": [
          "G"
        ],
        "color_identity": [
          "G"
        ],
        "keywords": [
          "Landfall"
        ],
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
          "predh": "legal"
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
          "foil"
        ],
        "oversized": false,
        "promo": false,
        "reprint": true,
        "variation": false,
        "set_id": "f4e01fa7-b254-42dd-849f-69b58027a8c4",
        "set": "znr",
        "set_name": "Zendikar Rising",
        "set_type": "expansion",
        "set_uri": "https://api.scryfall.com/sets/f4e01fa7-b254-42dd-849f-69b58027a8c4",
        "set_search_uri": "https://api.scryfall.com/cards/search?order=set&q=e%3Aznr&unique=prints",
        "scryfall_set_uri": "https://scryfall.com/sets/znr?utm_source=api",
        "rulings_uri": "https://api.scryfall.com/cards/a4b759f0-901f-4be3-93fa-224609b08d48/rulings",
        "prints_search_uri": "https://api.scryfall.com/cards/search?order=released&q=oracleid%3A8ad91f64-ccab-4edc-bd54-b2ee9267d614&unique=prints",
        "collector_number": "193",
        "digital": false,
        "rarity": "rare",
        "flavor_text": "Its hood blossoms as a warning: receive your gift, but stray no closer.",
        "card_back_id": "0aeebaf5-8c7d-4636-9e82-8c27447861f7",
        "artist": "Sam Rowan",
        "artist_ids": [
          "22dbb488-6195-43cc-9927-73bfd239fe30"
        ],
        "illustration_id": "35a54fcf-e2e6-4e7e-97a8-140b890d06dd",
        "border_color": "black",
        "frame": "2015",
        "security_stamp": "oval",
        "full_art": false,
        "textless": false,
        "booster": true,
        "story_spotlight": false,
        "edhrec_rank": 333,
        "penny_rank": 1752,
        "preview": {
          "source": "Wizards of the Coast",
          "source_uri": "http://twitch.tv/videos/728086792",
          "previewed_at": "2020-09-01"
        },
        "prices": {
          "usd": "4.42",
          "usd_foil": "4.45",
          "usd_etched": null,
          "eur": "2.90",
          "eur_foil": "3.43",
          "tix": "0.02"
        },
        "related_uris": {
          "gatherer": "https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=491841&printed=false",
          "tcgplayer_infinite_articles": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Darticle%26game%3Dmagic%26partner%3Dscryfall%26q%3DLotus%2BCobra",
          "tcgplayer_infinite_decks": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Ddeck%26game%3Dmagic%26partner%3Dscryfall%26q%3DLotus%2BCobra",
          "edhrec": "https://edhrec.com/route/?cc=Lotus+Cobra"
        },
        "purchase_uris": {
          "tcgplayer": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&u=https%3A%2F%2Fwww.tcgplayer.com%2Fproduct%2F221778%3Fpage%3D1",
          "cardmarket": "https://www.cardmarket.com/en/Magic/Products/Singles/Zendikar-Rising/Lotus-Cobra?referrer=scryfall&utm_campaign=card_prices&utm_medium=text&utm_source=scryfall",
          "cardhoarder": "https://www.cardhoarder.com/cards/83375?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall"
        }
      },
      {
        "object": "card",
        "id": "c3170852-60a9-46bc-8183-b1a65fc3b82b",
        "oracle_id": "efb11270-4b5a-4c52-862f-1d24c6b95d73",
        "multiverse_ids": [
          456619
        ],
        "mtgo_id": 70119,
        "mtgo_foil_id": 70120,
        "tcgplayer_id": 180863,
        "cardmarket_id": 366913,
        "name": "Lotus-Eye Mystics",
        "lang": "en",
        "released_at": "2018-12-07",
        "uri": "https://api.scryfall.com/cards/c3170852-60a9-46bc-8183-b1a65fc3b82b",
        "scryfall_uri": "https://scryfall.com/card/uma/23/lotus-eye-mystics?utm_source=api",
        "layout": "normal",
        "highres_image": true,
        "image_status": "highres_scan",
        "image_uris": {
          "small": "https://cards.scryfall.io/small/front/c/3/c3170852-60a9-46bc-8183-b1a65fc3b82b.jpg?1547515647",
          "normal": "https://cards.scryfall.io/normal/front/c/3/c3170852-60a9-46bc-8183-b1a65fc3b82b.jpg?1547515647",
          "large": "https://cards.scryfall.io/large/front/c/3/c3170852-60a9-46bc-8183-b1a65fc3b82b.jpg?1547515647",
          "png": "https://cards.scryfall.io/png/front/c/3/c3170852-60a9-46bc-8183-b1a65fc3b82b.png?1547515647",
          "art_crop": "https://cards.scryfall.io/art_crop/front/c/3/c3170852-60a9-46bc-8183-b1a65fc3b82b.jpg?1547515647",
          "border_crop": "https://cards.scryfall.io/border_crop/front/c/3/c3170852-60a9-46bc-8183-b1a65fc3b82b.jpg?1547515647"
        },
        "mana_cost": "{3}{W}",
        "cmc": 4,
        "type_line": "Creature — Human Monk",
        "oracle_text": "Prowess (Whenever you cast a noncreature spell, this creature gets +1/+1 until end of turn.)\nWhen Lotus-Eye Mystics enters, return target enchantment card from your graveyard to your hand.",
        "power": "3",
        "toughness": "2",
        "colors": [
          "W"
        ],
        "color_identity": [
          "W"
        ],
        "keywords": [
          "Prowess"
        ],
        "legalities": {
          "standard": "not_legal",
          "future": "not_legal",
          "historic": "not_legal",
          "timeless": "not_legal",
          "gladiator": "not_legal",
          "pioneer": "legal",
          "explorer": "not_legal",
          "modern": "legal",
          "legacy": "legal",
          "pauper": "legal",
          "vintage": "legal",
          "penny": "legal",
          "commander": "legal",
          "oathbreaker": "legal",
          "standardbrawl": "not_legal",
          "brawl": "not_legal",
          "alchemy": "not_legal",
          "paupercommander": "legal",
          "duel": "legal",
          "oldschool": "not_legal",
          "premodern": "not_legal",
          "predh": "not_legal"
        },
        "games": [
          "paper",
          "mtgo"
        ],
        "reserved": false,
        "foil": true,
        "nonfoil": true,
        "finishes": [
          "nonfoil",
          "foil"
        ],
        "oversized": false,
        "promo": false,
        "reprint": true,
        "variation": false,
        "set_id": "2ec77b94-6d47-4891-a480-5d0b4e5c9372",
        "set": "uma",
        "set_name": "Ultimate Masters",
        "set_type": "masters",
        "set_uri": "https://api.scryfall.com/sets/2ec77b94-6d47-4891-a480-5d0b4e5c9372",
        "set_search_uri": "https://api.scryfall.com/cards/search?order=set&q=e%3Auma&unique=prints",
        "scryfall_set_uri": "https://scryfall.com/sets/uma?utm_source=api",
        "rulings_uri": "https://api.scryfall.com/cards/c3170852-60a9-46bc-8183-b1a65fc3b82b/rulings",
        "prints_search_uri": "https://api.scryfall.com/cards/search?order=released&q=oracleid%3Aefb11270-4b5a-4c52-862f-1d24c6b95d73&unique=prints",
        "collector_number": "23",
        "digital": false,
        "rarity": "common",
        "flavor_text": "Every action has a foreseen purpose.",
        "card_back_id": "0aeebaf5-8c7d-4636-9e82-8c27447861f7",
        "artist": "Dan Murayama Scott",
        "artist_ids": [
          "f852fa13-137e-40f2-bbc1-0f01df09c0e0"
        ],
        "illustration_id": "9541af44-ea5a-485c-9c14-c9235bf743fd",
        "border_color": "black",
        "frame": "2015",
        "full_art": false,
        "textless": false,
        "booster": true,
        "story_spotlight": false,
        "edhrec_rank": 19534,
        "penny_rank": 12700,
        "prices": {
          "usd": "0.04",
          "usd_foil": "0.26",
          "usd_etched": null,
          "eur": "0.03",
          "eur_foil": "0.38",
          "tix": "0.06"
        },
        "related_uris": {
          "gatherer": "https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=456619&printed=false",
          "tcgplayer_infinite_articles": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Darticle%26game%3Dmagic%26partner%3Dscryfall%26q%3DLotus-Eye%2BMystics",
          "tcgplayer_infinite_decks": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Ddeck%26game%3Dmagic%26partner%3Dscryfall%26q%3DLotus-Eye%2BMystics",
          "edhrec": "https://edhrec.com/route/?cc=Lotus-Eye+Mystics"
        },
        "purchase_uris": {
          "tcgplayer": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&u=https%3A%2F%2Fwww.tcgplayer.com%2Fproduct%2F180863%3Fpage%3D1",
          "cardmarket": "https://www.cardmarket.com/en/Magic/Products/Singles/Ultimate-Masters/Lotus-Eye-Mystics?referrer=scryfall&utm_campaign=card_prices&utm_medium=text&utm_source=scryfall",
          "cardhoarder": "https://www.cardhoarder.com/cards/70119?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall"
        }
      },
      {
        "object": "card",
        "id": "0e013033-3995-4ba8-b0c3-0614c79aaaab",
        "oracle_id": "134d5b82-7940-4b33-a922-7f9d1f403e50",
        "multiverse_ids": [
          467003
        ],
        "mtgo_id": 73397,
        "arena_id": 70034,
        "tcgplayer_id": 192640,
        "cardmarket_id": 378789,
        "name": "Lotus Field",
        "lang": "en",
        "released_at": "2019-07-12",
        "uri": "https://api.scryfall.com/cards/0e013033-3995-4ba8-b0c3-0614c79aaaab",
        "scryfall_uri": "https://scryfall.com/card/m20/249/lotus-field?utm_source=api",
        "layout": "normal",
        "highres_image": true,
        "image_status": "highres_scan",
        "image_uris": {
          "small": "https://cards.scryfall.io/small/front/0/e/0e013033-3995-4ba8-b0c3-0614c79aaaab.jpg?1592517825",
          "normal": "https://cards.scryfall.io/normal/front/0/e/0e013033-3995-4ba8-b0c3-0614c79aaaab.jpg?1592517825",
          "large": "https://cards.scryfall.io/large/front/0/e/0e013033-3995-4ba8-b0c3-0614c79aaaab.jpg?1592517825",
          "png": "https://cards.scryfall.io/png/front/0/e/0e013033-3995-4ba8-b0c3-0614c79aaaab.png?1592517825",
          "art_crop": "https://cards.scryfall.io/art_crop/front/0/e/0e013033-3995-4ba8-b0c3-0614c79aaaab.jpg?1592517825",
          "border_crop": "https://cards.scryfall.io/border_crop/front/0/e/0e013033-3995-4ba8-b0c3-0614c79aaaab.jpg?1592517825"
        },
        "mana_cost": "",
        "cmc": 0,
        "type_line": "Land",
        "oracle_text": "Hexproof\nLotus Field enters tapped.\nWhen Lotus Field enters, sacrifice two lands.\n{T}: Add three mana of any one color.",
        "colors": [],
        "color_identity": [],
        "keywords": [
          "Hexproof"
        ],
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
          "historic": "legal",
          "timeless": "legal",
          "gladiator": "legal",
          "pioneer": "legal",
          "explorer": "legal",
          "modern": "legal",
          "legacy": "legal",
          "pauper": "not_legal",
          "vintage": "legal",
          "penny": "not_legal",
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
          "foil"
        ],
        "oversized": false,
        "promo": false,
        "reprint": false,
        "variation": false,
        "set_id": "4a787360-9767-4f44-80b1-2405dc5e39c7",
        "set": "m20",
        "set_name": "Core Set 2020",
        "set_type": "core",
        "set_uri": "https://api.scryfall.com/sets/4a787360-9767-4f44-80b1-2405dc5e39c7",
        "set_search_uri": "https://api.scryfall.com/cards/search?order=set&q=e%3Am20&unique=prints",
        "scryfall_set_uri": "https://scryfall.com/sets/m20?utm_source=api",
        "rulings_uri": "https://api.scryfall.com/cards/0e013033-3995-4ba8-b0c3-0614c79aaaab/rulings",
        "prints_search_uri": "https://api.scryfall.com/cards/search?order=released&q=oracleid%3A134d5b82-7940-4b33-a922-7f9d1f403e50&unique=prints",
        "collector_number": "249",
        "digital": false,
        "rarity": "rare",
        "card_back_id": "0aeebaf5-8c7d-4636-9e82-8c27447861f7",
        "artist": "John Avon",
        "artist_ids": [
          "798f3932-30e0-4420-aa3f-db4d613f89ca"
        ],
        "illustration_id": "39412403-df1f-4535-a617-0481a3a83fb7",
        "border_color": "black",
        "frame": "2015",
        "security_stamp": "oval",
        "full_art": false,
        "textless": false,
        "booster": true,
        "story_spotlight": false,
        "edhrec_rank": 1162,
        "preview": {
          "source": "Wizards of the Coast",
          "source_uri": "",
          "previewed_at": "2019-06-20"
        },
        "prices": {
          "usd": "6.46",
          "usd_foil": "10.97",
          "usd_etched": null,
          "eur": "4.74",
          "eur_foil": "11.22",
          "tix": "3.21"
        },
        "related_uris": {
          "gatherer": "https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=467003&printed=false",
          "tcgplayer_infinite_articles": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Darticle%26game%3Dmagic%26partner%3Dscryfall%26q%3DLotus%2BField",
          "tcgplayer_infinite_decks": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Ddeck%26game%3Dmagic%26partner%3Dscryfall%26q%3DLotus%2BField",
          "edhrec": "https://edhrec.com/route/?cc=Lotus+Field"
        },
        "purchase_uris": {
          "tcgplayer": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&u=https%3A%2F%2Fwww.tcgplayer.com%2Fproduct%2F192640%3Fpage%3D1",
          "cardmarket": "https://www.cardmarket.com/en/Magic/Products/Singles/Core-2020/Lotus-Field?referrer=scryfall&utm_campaign=card_prices&utm_medium=text&utm_source=scryfall",
          "cardhoarder": "https://www.cardhoarder.com/cards/73397?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall"
        }
      },
      {
        "object": "card",
        "id": "ddfc6396-5377-4ab3-9c10-8abcdeae2aa1",
        "oracle_id": "143d7a32-c15d-4a1f-ad81-cf1e6aa92bf3",
        "multiverse_ids": [
          23233
        ],
        "mtgo_id": 14943,
        "mtgo_foil_id": 14944,
        "tcgplayer_id": 7549,
        "cardmarket_id": 3545,
        "name": "Lotus Guardian",
        "lang": "en",
        "released_at": "2000-10-02",
        "uri": "https://api.scryfall.com/cards/ddfc6396-5377-4ab3-9c10-8abcdeae2aa1",
        "scryfall_uri": "https://scryfall.com/card/inv/305/lotus-guardian?utm_source=api",
        "layout": "normal",
        "highres_image": true,
        "image_status": "highres_scan",
        "image_uris": {
          "small": "https://cards.scryfall.io/small/front/d/d/ddfc6396-5377-4ab3-9c10-8abcdeae2aa1.jpg?1562939672",
          "normal": "https://cards.scryfall.io/normal/front/d/d/ddfc6396-5377-4ab3-9c10-8abcdeae2aa1.jpg?1562939672",
          "large": "https://cards.scryfall.io/large/front/d/d/ddfc6396-5377-4ab3-9c10-8abcdeae2aa1.jpg?1562939672",
          "png": "https://cards.scryfall.io/png/front/d/d/ddfc6396-5377-4ab3-9c10-8abcdeae2aa1.png?1562939672",
          "art_crop": "https://cards.scryfall.io/art_crop/front/d/d/ddfc6396-5377-4ab3-9c10-8abcdeae2aa1.jpg?1562939672",
          "border_crop": "https://cards.scryfall.io/border_crop/front/d/d/ddfc6396-5377-4ab3-9c10-8abcdeae2aa1.jpg?1562939672"
        },
        "mana_cost": "{7}",
        "cmc": 7,
        "type_line": "Artifact Creature — Dragon",
        "oracle_text": "Flying\n{T}: Add one mana of any color.",
        "power": "4",
        "toughness": "4",
        "colors": [],
        "color_identity": [],
        "keywords": [
          "Flying"
        ],
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
          "legacy": "legal",
          "pauper": "not_legal",
          "vintage": "legal",
          "penny": "legal",
          "commander": "legal",
          "oathbreaker": "legal",
          "standardbrawl": "not_legal",
          "brawl": "not_legal",
          "alchemy": "not_legal",
          "paupercommander": "not_legal",
          "duel": "legal",
          "oldschool": "not_legal",
          "premodern": "legal",
          "predh": "legal"
        },
        "games": [
          "paper",
          "mtgo"
        ],
        "reserved": false,
        "foil": true,
        "nonfoil": true,
        "finishes": [
          "nonfoil",
          "foil"
        ],
        "oversized": false,
        "promo": false,
        "reprint": false,
        "variation": false,
        "set_id": "b9ae5e02-7726-47ca-b5e4-5ec402b41cd1",
        "set": "inv",
        "set_name": "Invasion",
        "set_type": "expansion",
        "set_uri": "https://api.scryfall.com/sets/b9ae5e02-7726-47ca-b5e4-5ec402b41cd1",
        "set_search_uri": "https://api.scryfall.com/cards/search?order=set&q=e%3Ainv&unique=prints",
        "scryfall_set_uri": "https://scryfall.com/sets/inv?utm_source=api",
        "rulings_uri": "https://api.scryfall.com/cards/ddfc6396-5377-4ab3-9c10-8abcdeae2aa1/rulings",
        "prints_search_uri": "https://api.scryfall.com/cards/search?order=released&q=oracleid%3A143d7a32-c15d-4a1f-ad81-cf1e6aa92bf3&unique=prints",
        "collector_number": "305",
        "digital": false,
        "rarity": "rare",
        "flavor_text": "Lotus fields are too valuable to leave undefended.",
        "card_back_id": "0aeebaf5-8c7d-4636-9e82-8c27447861f7",
        "artist": "Dana Knutson",
        "artist_ids": [
          "4eac683c-8c96-4f57-b8a4-ad7f7b7c44c7"
        ],
        "illustration_id": "3a9342d6-1863-4975-9831-1cb907249bf9",
        "border_color": "black",
        "frame": "1997",
        "full_art": false,
        "textless": false,
        "booster": true,
        "story_spotlight": false,
        "edhrec_rank": 22213,
        "prices": {
          "usd": "0.53",
          "usd_foil": "30.77",
          "usd_etched": null,
          "eur": "0.38",
          "eur_foil": "17.65",
          "tix": "0.02"
        },
        "related_uris": {
          "gatherer": "https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=23233&printed=false",
          "tcgplayer_infinite_articles": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Darticle%26game%3Dmagic%26partner%3Dscryfall%26q%3DLotus%2BGuardian",
          "tcgplayer_infinite_decks": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Ddeck%26game%3Dmagic%26partner%3Dscryfall%26q%3DLotus%2BGuardian",
          "edhrec": "https://edhrec.com/route/?cc=Lotus+Guardian"
        },
        "purchase_uris": {
          "tcgplayer": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&u=https%3A%2F%2Fwww.tcgplayer.com%2Fproduct%2F7549%3Fpage%3D1",
          "cardmarket": "https://www.cardmarket.com/en/Magic/Products/Singles/Invasion/Lotus-Guardian?referrer=scryfall&utm_campaign=card_prices&utm_medium=text&utm_source=scryfall",
          "cardhoarder": "https://www.cardhoarder.com/cards/14943?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall"
        }
      },
      {
        "object": "card",
        "id": "197ec248-70d9-47f4-a53b-99b23f021116",
        "oracle_id": "84dc0aae-029b-48dc-b8d0-e93c227e32e5",
        "multiverse_ids": [
          391869
        ],
        "mtgo_id": 55502,
        "mtgo_foil_id": 55503,
        "tcgplayer_id": 95389,
        "cardmarket_id": 271657,
        "name": "Lotus Path Djinn",
        "lang": "en",
        "released_at": "2015-01-23",
        "uri": "https://api.scryfall.com/cards/197ec248-70d9-47f4-a53b-99b23f021116",
        "scryfall_uri": "https://scryfall.com/card/frf/39/lotus-path-djinn?utm_source=api",
        "layout": "normal",
        "highres_image": true,
        "image_status": "highres_scan",
        "image_uris": {
          "small": "https://cards.scryfall.io/small/front/1/9/197ec248-70d9-47f4-a53b-99b23f021116.jpg?1562822856",
          "normal": "https://cards.scryfall.io/normal/front/1/9/197ec248-70d9-47f4-a53b-99b23f021116.jpg?1562822856",
          "large": "https://cards.scryfall.io/large/front/1/9/197ec248-70d9-47f4-a53b-99b23f021116.jpg?1562822856",
          "png": "https://cards.scryfall.io/png/front/1/9/197ec248-70d9-47f4-a53b-99b23f021116.png?1562822856",
          "art_crop": "https://cards.scryfall.io/art_crop/front/1/9/197ec248-70d9-47f4-a53b-99b23f021116.jpg?1562822856",
          "border_crop": "https://cards.scryfall.io/border_crop/front/1/9/197ec248-70d9-47f4-a53b-99b23f021116.jpg?1562822856"
        },
        "mana_cost": "{3}{U}",
        "cmc": 4,
        "type_line": "Creature — Djinn Monk",
        "oracle_text": "Flying\nProwess (Whenever you cast a noncreature spell, this creature gets +1/+1 until end of turn.)",
        "power": "2",
        "toughness": "3",
        "colors": [
          "U"
        ],
        "color_identity": [
          "U"
        ],
        "keywords": [
          "Flying",
          "Prowess"
        ],
        "legalities": {
          "standard": "not_legal",
          "future": "not_legal",
          "historic": "not_legal",
          "timeless": "not_legal",
          "gladiator": "not_legal",
          "pioneer": "legal",
          "explorer": "not_legal",
          "modern": "legal",
          "legacy": "legal",
          "pauper": "legal",
          "vintage": "legal",
          "penny": "legal",
          "commander": "legal",
          "oathbreaker": "legal",
          "standardbrawl": "not_legal",
          "brawl": "not_legal",
          "alchemy": "not_legal",
          "paupercommander": "legal",
          "duel": "legal",
          "oldschool": "not_legal",
          "premodern": "not_legal",
          "predh": "not_legal"
        },
        "games": [
          "paper",
          "mtgo"
        ],
        "reserved": false,
        "foil": true,
        "nonfoil": true,
        "finishes": [
          "nonfoil",
          "foil"
        ],
        "oversized": false,
        "promo": false,
        "reprint": false,
        "variation": false,
        "set_id": "7bb5cb2b-081a-4c8c-b7e1-494046e6baa1",
        "set": "frf",
        "set_name": "Fate Reforged",
        "set_type": "expansion",
        "set_uri": "https://api.scryfall.com/sets/7bb5cb2b-081a-4c8c-b7e1-494046e6baa1",
        "set_search_uri": "https://api.scryfall.com/cards/search?order=set&q=e%3Afrf&unique=prints",
        "scryfall_set_uri": "https://scryfall.com/sets/frf?utm_source=api",
        "rulings_uri": "https://api.scryfall.com/cards/197ec248-70d9-47f4-a53b-99b23f021116/rulings",
        "prints_search_uri": "https://api.scryfall.com/cards/search?order=released&q=oracleid%3A84dc0aae-029b-48dc-b8d0-e93c227e32e5&unique=prints",
        "collector_number": "39",
        "digital": false,
        "rarity": "common",
        "watermark": "jeskai",
        "flavor_text": "\"The lotus takes root where body and mind intersect. It blooms when body and mind become one.\"",
        "card_back_id": "0aeebaf5-8c7d-4636-9e82-8c27447861f7",
        "artist": "Steve Argyle",
        "artist_ids": [
          "a44ddda4-5331-4f83-aac9-3e00ed36bd7b"
        ],
        "illustration_id": "f37d1fbb-e359-4620-bb9e-8cc91352a0ee",
        "border_color": "black",
        "frame": "2015",
        "full_art": false,
        "textless": false,
        "booster": true,
        "story_spotlight": false,
        "edhrec_rank": 21478,
        "penny_rank": 15763,
        "prices": {
          "usd": "0.04",
          "usd_foil": "0.49",
          "usd_etched": null,
          "eur": "0.06",
          "eur_foil": "0.19",
          "tix": "0.03"
        },
        "related_uris": {
          "gatherer": "https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=391869&printed=false",
          "tcgplayer_infinite_articles": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Darticle%26game%3Dmagic%26partner%3Dscryfall%26q%3DLotus%2BPath%2BDjinn",
          "tcgplayer_infinite_decks": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Ddeck%26game%3Dmagic%26partner%3Dscryfall%26q%3DLotus%2BPath%2BDjinn",
          "edhrec": "https://edhrec.com/route/?cc=Lotus+Path+Djinn"
        },
        "purchase_uris": {
          "tcgplayer": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&u=https%3A%2F%2Fwww.tcgplayer.com%2Fproduct%2F95389%3Fpage%3D1",
          "cardmarket": "https://www.cardmarket.com/en/Magic/Products/Singles/Fate-Reforged/Lotus-Path-Djinn?referrer=scryfall&utm_campaign=card_prices&utm_medium=text&utm_source=scryfall",
          "cardhoarder": "https://www.cardhoarder.com/cards/55502?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall"
        }
      },
      {
        "object": "card",
        "id": "f85ab5f9-508e-45de-8fa1-ce1f16552ffc",
        "oracle_id": "32e5339e-9e4f-46f8-b305-f9d6d3ba8bb5",
        "multiverse_ids": [
          397468
        ],
        "mtgo_id": 56432,
        "mtgo_foil_id": 56433,
        "name": "Lotus Petal",
        "lang": "en",
        "released_at": "2015-05-06",
        "uri": "https://api.scryfall.com/cards/f85ab5f9-508e-45de-8fa1-ce1f16552ffc",
        "scryfall_uri": "https://scryfall.com/card/tpr/225/lotus-petal?utm_source=api",
        "layout": "normal",
        "highres_image": true,
        "image_status": "highres_scan",
        "image_uris": {
          "small": "https://cards.scryfall.io/small/front/f/8/f85ab5f9-508e-45de-8fa1-ce1f16552ffc.jpg?1701537448",
          "normal": "https://cards.scryfall.io/normal/front/f/8/f85ab5f9-508e-45de-8fa1-ce1f16552ffc.jpg?1701537448",
          "large": "https://cards.scryfall.io/large/front/f/8/f85ab5f9-508e-45de-8fa1-ce1f16552ffc.jpg?1701537448",
          "png": "https://cards.scryfall.io/png/front/f/8/f85ab5f9-508e-45de-8fa1-ce1f16552ffc.png?1701537448",
          "art_crop": "https://cards.scryfall.io/art_crop/front/f/8/f85ab5f9-508e-45de-8fa1-ce1f16552ffc.jpg?1701537448",
          "border_crop": "https://cards.scryfall.io/border_crop/front/f/8/f85ab5f9-508e-45de-8fa1-ce1f16552ffc.jpg?1701537448"
        },
        "mana_cost": "{0}",
        "cmc": 0,
        "type_line": "Artifact",
        "oracle_text": "{T}, Sacrifice Lotus Petal: Add one mana of any color.",
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
          "legacy": "legal",
          "pauper": "legal",
          "vintage": "restricted",
          "penny": "not_legal",
          "commander": "legal",
          "oathbreaker": "legal",
          "standardbrawl": "not_legal",
          "brawl": "not_legal",
          "alchemy": "not_legal",
          "paupercommander": "legal",
          "duel": "banned",
          "oldschool": "not_legal",
          "premodern": "legal",
          "predh": "legal"
        },
        "games": [
          "mtgo"
        ],
        "reserved": false,
        "foil": true,
        "nonfoil": true,
        "finishes": [
          "nonfoil",
          "foil"
        ],
        "oversized": false,
        "promo": false,
        "reprint": true,
        "variation": false,
        "set_id": "41b3e002-ab58-46a0-8024-056ee843e267",
        "set": "tpr",
        "set_name": "Tempest Remastered",
        "set_type": "masters",
        "set_uri": "https://api.scryfall.com/sets/41b3e002-ab58-46a0-8024-056ee843e267",
        "set_search_uri": "https://api.scryfall.com/cards/search?order=set&q=e%3Atpr&unique=prints",
        "scryfall_set_uri": "https://scryfall.com/sets/tpr?utm_source=api",
        "rulings_uri": "https://api.scryfall.com/cards/f85ab5f9-508e-45de-8fa1-ce1f16552ffc/rulings",
        "prints_search_uri": "https://api.scryfall.com/cards/search?order=released&q=oracleid%3A32e5339e-9e4f-46f8-b305-f9d6d3ba8bb5&unique=prints",
        "collector_number": "225",
        "digital": true,
        "rarity": "uncommon",
        "flavor_text": "\"Hard to imagine,\" mused Hanna, stroking the petal, \"such a lovely flower inspiring such greed.\"",
        "card_back_id": "0aeebaf5-8c7d-4636-9e82-8c27447861f7",
        "artist": "April Lee",
        "artist_ids": [
          "0a286cc8-963b-4d89-89be-9609a08620ca"
        ],
        "illustration_id": "38487fd0-7791-4926-9b77-4d0d7675832c",
        "border_color": "black",
        "frame": "2015",
        "full_art": false,
        "textless": false,
        "booster": true,
        "story_spotlight": false,
        "edhrec_rank": 116,
        "prices": {
          "usd": null,
          "usd_foil": null,
          "usd_etched": null,
          "eur": null,
          "eur_foil": null,
          "tix": "12.10"
        },
        "related_uris": {
          "gatherer": "https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=397468&printed=false",
          "tcgplayer_infinite_articles": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Darticle%26game%3Dmagic%26partner%3Dscryfall%26q%3DLotus%2BPetal",
          "tcgplayer_infinite_decks": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Ddeck%26game%3Dmagic%26partner%3Dscryfall%26q%3DLotus%2BPetal",
          "edhrec": "https://edhrec.com/route/?cc=Lotus+Petal"
        },
        "purchase_uris": {
          "tcgplayer": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&u=https%3A%2F%2Fwww.tcgplayer.com%2Fsearch%2Fmagic%2Fproduct%3FproductLineName%3Dmagic%26q%3DLotus%2BPetal%26view%3Dgrid",
          "cardmarket": "https://www.cardmarket.com/en/Magic/Products/Search?referrer=scryfall&searchString=Lotus+Petal&utm_campaign=card_prices&utm_medium=text&utm_source=scryfall",
          "cardhoarder": "https://www.cardhoarder.com/cards/56432?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall"
        }
      },
      {
        "object": "card",
        "id": "02267717-66e0-41f7-8009-75586a4aa4be",
        "oracle_id": "ca4d3d27-ea3a-44ac-96e9-b52b563129f8",
        "multiverse_ids": [
          660320
        ],
        "mtgo_id": 125409,
        "arena_id": 90685,
        "tcgplayer_id": 544934,
        "name": "Lotus Ring",
        "lang": "en",
        "released_at": "2024-04-19",
        "uri": "https://api.scryfall.com/cards/02267717-66e0-41f7-8009-75586a4aa4be",
        "scryfall_uri": "https://scryfall.com/card/big/24/lotus-ring?utm_source=api",
        "layout": "normal",
        "highres_image": true,
        "image_status": "highres_scan",
        "image_uris": {
          "small": "https://cards.scryfall.io/small/front/0/2/02267717-66e0-41f7-8009-75586a4aa4be.jpg?1712352932",
          "normal": "https://cards.scryfall.io/normal/front/0/2/02267717-66e0-41f7-8009-75586a4aa4be.jpg?1712352932",
          "large": "https://cards.scryfall.io/large/front/0/2/02267717-66e0-41f7-8009-75586a4aa4be.jpg?1712352932",
          "png": "https://cards.scryfall.io/png/front/0/2/02267717-66e0-41f7-8009-75586a4aa4be.png?1712352932",
          "art_crop": "https://cards.scryfall.io/art_crop/front/0/2/02267717-66e0-41f7-8009-75586a4aa4be.jpg?1712352932",
          "border_crop": "https://cards.scryfall.io/border_crop/front/0/2/02267717-66e0-41f7-8009-75586a4aa4be.jpg?1712352932"
        },
        "mana_cost": "{3}",
        "cmc": 3,
        "type_line": "Artifact — Equipment",
        "oracle_text": "Indestructible\nEquipped creature gets +3/+3 and has vigilance and \"{T}, Sacrifice this creature: Add three mana of any one color.\"\nEquip {3}",
        "colors": [],
        "color_identity": [],
        "keywords": [
          "Indestructible",
          "Equip"
        ],
        "produced_mana": [
          "B",
          "G",
          "R",
          "U",
          "W"
        ],
        "legalities": {
          "standard": "legal",
          "future": "legal",
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
          "standardbrawl": "legal",
          "brawl": "legal",
          "alchemy": "legal",
          "paupercommander": "not_legal",
          "duel": "legal",
          "oldschool": "not_legal",
          "premodern": "not_legal",
          "predh": "not_legal"
        },
        "games": [
          "paper",
          "arena",
          "mtgo"
        ],
        "reserved": false,
        "foil": true,
        "nonfoil": true,
        "finishes": [
          "nonfoil",
          "foil"
        ],
        "oversized": false,
        "promo": false,
        "reprint": false,
        "variation": false,
        "set_id": "14332d2c-ba93-4498-bf3f-9d601f88f783",
        "set": "big",
        "set_name": "The Big Score",
        "set_type": "expansion",
        "set_uri": "https://api.scryfall.com/sets/14332d2c-ba93-4498-bf3f-9d601f88f783",
        "set_search_uri": "https://api.scryfall.com/cards/search?order=set&q=e%3Abig&unique=prints",
        "scryfall_set_uri": "https://scryfall.com/sets/big?utm_source=api",
        "rulings_uri": "https://api.scryfall.com/cards/02267717-66e0-41f7-8009-75586a4aa4be/rulings",
        "prints_search_uri": "https://api.scryfall.com/cards/search?order=released&q=oracleid%3Aca4d3d27-ea3a-44ac-96e9-b52b563129f8&unique=prints",
        "collector_number": "24",
        "digital": false,
        "rarity": "mythic",
        "card_back_id": "0aeebaf5-8c7d-4636-9e82-8c27447861f7",
        "artist": "Alayna Danner",
        "artist_ids": [
          "bb677b1a-ce51-4888-83d6-5a94de461ff9"
        ],
        "illustration_id": "063fc453-1316-43a9-a078-b9a6391564c0",
        "border_color": "black",
        "frame": "2015",
        "security_stamp": "oval",
        "full_art": false,
        "textless": false,
        "booster": false,
        "story_spotlight": false,
        "promo_types": [
          "boosterfun"
        ],
        "edhrec_rank": 13242,
        "preview": {
          "source": "Rebell",
          "source_uri": "https://www.youtube.com/watch?v=ufgrZI7Df4A",
          "previewed_at": "2024-04-02"
        },
        "prices": {
          "usd": "1.70",
          "usd_foil": "2.26",
          "usd_etched": null,
          "eur": null,
          "eur_foil": null,
          "tix": "0.02"
        },
        "related_uris": {
          "gatherer": "https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=660320&printed=false",
          "tcgplayer_infinite_articles": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Darticle%26game%3Dmagic%26partner%3Dscryfall%26q%3DLotus%2BRing",
          "tcgplayer_infinite_decks": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Ddeck%26game%3Dmagic%26partner%3Dscryfall%26q%3DLotus%2BRing",
          "edhrec": "https://edhrec.com/route/?cc=Lotus+Ring"
        },
        "purchase_uris": {
          "tcgplayer": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&u=https%3A%2F%2Fwww.tcgplayer.com%2Fproduct%2F544934%3Fpage%3D1",
          "cardmarket": "https://www.cardmarket.com/en/Magic/Products/Search?referrer=scryfall&searchString=Lotus+Ring&utm_campaign=card_prices&utm_medium=text&utm_source=scryfall",
          "cardhoarder": "https://www.cardhoarder.com/cards/125409?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall"
        }
      },
      {
        "object": "card",
        "id": "2e5cd12a-2a07-44a8-8eac-de00d26fe9e3",
        "oracle_id": "01fc5bb3-ebd7-4ab4-8aef-2ece1e1d9b7c",
        "multiverse_ids": [
          4593
        ],
        "mtgo_id": 9307,
        "tcgplayer_id": 6060,
        "cardmarket_id": 8733,
        "name": "Lotus Vale",
        "lang": "en",
        "released_at": "1997-06-09",
        "uri": "https://api.scryfall.com/cards/2e5cd12a-2a07-44a8-8eac-de00d26fe9e3",
        "scryfall_uri": "https://scryfall.com/card/wth/165/lotus-vale?utm_source=api",
        "layout": "normal",
        "highres_image": true,
        "image_status": "highres_scan",
        "image_uris": {
          "small": "https://cards.scryfall.io/small/front/2/e/2e5cd12a-2a07-44a8-8eac-de00d26fe9e3.jpg?1562800046",
          "normal": "https://cards.scryfall.io/normal/front/2/e/2e5cd12a-2a07-44a8-8eac-de00d26fe9e3.jpg?1562800046",
          "large": "https://cards.scryfall.io/large/front/2/e/2e5cd12a-2a07-44a8-8eac-de00d26fe9e3.jpg?1562800046",
          "png": "https://cards.scryfall.io/png/front/2/e/2e5cd12a-2a07-44a8-8eac-de00d26fe9e3.png?1562800046",
          "art_crop": "https://cards.scryfall.io/art_crop/front/2/e/2e5cd12a-2a07-44a8-8eac-de00d26fe9e3.jpg?1562800046",
          "border_crop": "https://cards.scryfall.io/border_crop/front/2/e/2e5cd12a-2a07-44a8-8eac-de00d26fe9e3.jpg?1562800046"
        },
        "mana_cost": "",
        "cmc": 0,
        "type_line": "Land",
        "oracle_text": "If Lotus Vale would enter, sacrifice two untapped lands instead. If you do, put Lotus Vale onto the battlefield. If you don't, put it into its owner's graveyard.\n{T}: Add three mana of any one color.",
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
          "legacy": "legal",
          "pauper": "not_legal",
          "vintage": "legal",
          "penny": "not_legal",
          "commander": "legal",
          "oathbreaker": "legal",
          "standardbrawl": "not_legal",
          "brawl": "not_legal",
          "alchemy": "not_legal",
          "paupercommander": "not_legal",
          "duel": "legal",
          "oldschool": "not_legal",
          "premodern": "legal",
          "predh": "legal"
        },
        "games": [
          "paper",
          "mtgo"
        ],
        "reserved": true,
        "foil": false,
        "nonfoil": true,
        "finishes": [
          "nonfoil"
        ],
        "oversized": false,
        "promo": false,
        "reprint": false,
        "variation": false,
        "set_id": "700997ac-add2-4ce2-992e-5efa0fdfc0e9",
        "set": "wth",
        "set_name": "Weatherlight",
        "set_type": "expansion",
        "set_uri": "https://api.scryfall.com/sets/700997ac-add2-4ce2-992e-5efa0fdfc0e9",
        "set_search_uri": "https://api.scryfall.com/cards/search?order=set&q=e%3Awth&unique=prints",
        "scryfall_set_uri": "https://scryfall.com/sets/wth?utm_source=api",
        "rulings_uri": "https://api.scryfall.com/cards/2e5cd12a-2a07-44a8-8eac-de00d26fe9e3/rulings",
        "prints_search_uri": "https://api.scryfall.com/cards/search?order=released&q=oracleid%3A01fc5bb3-ebd7-4ab4-8aef-2ece1e1d9b7c&unique=prints",
        "collector_number": "165",
        "digital": false,
        "rarity": "rare",
        "flavor_text": "At what price beauty?",
        "card_back_id": "0aeebaf5-8c7d-4636-9e82-8c27447861f7",
        "artist": "John Avon",
        "artist_ids": [
          "798f3932-30e0-4420-aa3f-db4d613f89ca"
        ],
        "illustration_id": "289205d3-b95c-4906-ac30-f42c0cc4de9c",
        "border_color": "black",
        "frame": "1997",
        "full_art": false,
        "textless": false,
        "booster": true,
        "story_spotlight": false,
        "edhrec_rank": 7410,
        "prices": {
          "usd": "36.24",
          "usd_foil": null,
          "usd_etched": null,
          "eur": "14.68",
          "eur_foil": null,
          "tix": "2.50"
        },
        "related_uris": {
          "gatherer": "https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=4593&printed=false",
          "tcgplayer_infinite_articles": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Darticle%26game%3Dmagic%26partner%3Dscryfall%26q%3DLotus%2BVale",
          "tcgplayer_infinite_decks": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Ddeck%26game%3Dmagic%26partner%3Dscryfall%26q%3DLotus%2BVale",
          "edhrec": "https://edhrec.com/route/?cc=Lotus+Vale"
        },
        "purchase_uris": {
          "tcgplayer": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&u=https%3A%2F%2Fwww.tcgplayer.com%2Fproduct%2F6060%3Fpage%3D1",
          "cardmarket": "https://www.cardmarket.com/en/Magic/Products/Singles/Weatherlight/Lotus-Vale?referrer=scryfall&utm_campaign=card_prices&utm_medium=text&utm_source=scryfall",
          "cardhoarder": "https://www.cardhoarder.com/cards/9307?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall"
        }
      },
      {
        "object": "card",
        "id": "e8241a53-8b88-474e-a46c-44b3d1f3b0df",
        "oracle_id": "6b3d54a0-278a-4785-a508-8ed928425356",
        "multiverse_ids": [
          74323
        ],
        "tcgplayer_id": 37898,
        "cardmarket_id": 14887,
        "name": "Mox Lotus",
        "lang": "en",
        "released_at": "2004-11-19",
        "uri": "https://api.scryfall.com/cards/e8241a53-8b88-474e-a46c-44b3d1f3b0df",
        "scryfall_uri": "https://scryfall.com/card/unh/124/mox-lotus?utm_source=api",
        "layout": "normal",
        "highres_image": true,
        "image_status": "highres_scan",
        "image_uris": {
          "small": "https://cards.scryfall.io/small/front/e/8/e8241a53-8b88-474e-a46c-44b3d1f3b0df.jpg?1720467988",
          "normal": "https://cards.scryfall.io/normal/front/e/8/e8241a53-8b88-474e-a46c-44b3d1f3b0df.jpg?1720467988",
          "large": "https://cards.scryfall.io/large/front/e/8/e8241a53-8b88-474e-a46c-44b3d1f3b0df.jpg?1720467988",
          "png": "https://cards.scryfall.io/png/front/e/8/e8241a53-8b88-474e-a46c-44b3d1f3b0df.png?1720467988",
          "art_crop": "https://cards.scryfall.io/art_crop/front/e/8/e8241a53-8b88-474e-a46c-44b3d1f3b0df.jpg?1720467988",
          "border_crop": "https://cards.scryfall.io/border_crop/front/e/8/e8241a53-8b88-474e-a46c-44b3d1f3b0df.jpg?1720467988"
        },
        "mana_cost": "{15}",
        "cmc": 15,
        "type_line": "Artifact",
        "oracle_text": "{T}: Add {∞}.\n{100}: Add one mana of any color.",
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
        "set_id": "4c8bc76a-05a5-43db-aaf0-34deb347b871",
        "set": "unh",
        "set_name": "Unhinged",
        "set_type": "funny",
        "set_uri": "https://api.scryfall.com/sets/4c8bc76a-05a5-43db-aaf0-34deb347b871",
        "set_search_uri": "https://api.scryfall.com/cards/search?order=set&q=e%3Aunh&unique=prints",
        "scryfall_set_uri": "https://scryfall.com/sets/unh?utm_source=api",
        "rulings_uri": "https://api.scryfall.com/cards/e8241a53-8b88-474e-a46c-44b3d1f3b0df/rulings",
        "prints_search_uri": "https://api.scryfall.com/cards/search?order=released&q=oracleid%3A6b3d54a0-278a-4785-a508-8ed928425356&unique=prints",
        "collector_number": "124",
        "digital": false,
        "rarity": "rare",
        "card_back_id": "0aeebaf5-8c7d-4636-9e82-8c27447861f7",
        "artist": "Kevin Dobler",
        "artist_ids": [
          "cb0c7f55-a2ff-44dd-8e78-3a1d1b55b209"
        ],
        "illustration_id": "c5b6e460-6b16-4216-aaa9-9ca8c1a76172",
        "border_color": "silver",
        "frame": "2003",
        "full_art": false,
        "textless": false,
        "booster": true,
        "story_spotlight": false,
        "prices": {
          "usd": "20.89",
          "usd_foil": null,
          "usd_etched": null,
          "eur": "10.16",
          "eur_foil": null,
          "tix": null
        },
        "related_uris": {
          "gatherer": "https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=74323&printed=false",
          "tcgplayer_infinite_articles": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Darticle%26game%3Dmagic%26partner%3Dscryfall%26q%3DMox%2BLotus",
          "tcgplayer_infinite_decks": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Ddeck%26game%3Dmagic%26partner%3Dscryfall%26q%3DMox%2BLotus",
          "edhrec": "https://edhrec.com/route/?cc=Mox+Lotus"
        },
        "purchase_uris": {
          "tcgplayer": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&u=https%3A%2F%2Fwww.tcgplayer.com%2Fproduct%2F37898%3Fpage%3D1",
          "cardmarket": "https://www.cardmarket.com/en/Magic/Products/Singles/Unhinged/Mox-Lotus?referrer=scryfall&utm_campaign=card_prices&utm_medium=text&utm_source=scryfall",
          "cardhoarder": "https://www.cardhoarder.com/cards?affiliate_id=scryfall&data%5Bsearch%5D=Mox+Lotus&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall"
        }
      },
      {
        "object": "card",
        "id": "5bd6353f-d119-40e6-895c-030a11a7a2fe",
        "oracle_id": "cfb8cdde-11f6-441a-942b-32d8c191fc90",
        "multiverse_ids": [
          476486
        ],
        "mtgo_id": 79594,
        "arena_id": 70746,
        "tcgplayer_id": 206648,
        "cardmarket_id": 430194,
        "name": "Nyx Lotus",
        "lang": "en",
        "released_at": "2020-01-24",
        "uri": "https://api.scryfall.com/cards/5bd6353f-d119-40e6-895c-030a11a7a2fe",
        "scryfall_uri": "https://scryfall.com/card/thb/235/nyx-lotus?utm_source=api",
        "layout": "normal",
        "highres_image": true,
        "image_status": "highres_scan",
        "image_uris": {
          "small": "https://cards.scryfall.io/small/front/5/b/5bd6353f-d119-40e6-895c-030a11a7a2fe.jpg?1594077250",
          "normal": "https://cards.scryfall.io/normal/front/5/b/5bd6353f-d119-40e6-895c-030a11a7a2fe.jpg?1594077250",
          "large": "https://cards.scryfall.io/large/front/5/b/5bd6353f-d119-40e6-895c-030a11a7a2fe.jpg?1594077250",
          "png": "https://cards.scryfall.io/png/front/5/b/5bd6353f-d119-40e6-895c-030a11a7a2fe.png?1594077250",
          "art_crop": "https://cards.scryfall.io/art_crop/front/5/b/5bd6353f-d119-40e6-895c-030a11a7a2fe.jpg?1594077250",
          "border_crop": "https://cards.scryfall.io/border_crop/front/5/b/5bd6353f-d119-40e6-895c-030a11a7a2fe.jpg?1594077250"
        },
        "mana_cost": "{4}",
        "cmc": 4,
        "type_line": "Legendary Artifact",
        "oracle_text": "Nyx Lotus enters tapped.\n{T}: Choose a color. Add an amount of mana of that color equal to your devotion to that color. (Your devotion to a color is the number of mana symbols of that color in the mana costs of permanents you control.)",
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
          "foil"
        ],
        "oversized": false,
        "promo": false,
        "reprint": false,
        "variation": false,
        "set_id": "5f23a78d-cda1-462a-8be3-a62b40c34913",
        "set": "thb",
        "set_name": "Theros Beyond Death",
        "set_type": "expansion",
        "set_uri": "https://api.scryfall.com/sets/5f23a78d-cda1-462a-8be3-a62b40c34913",
        "set_search_uri": "https://api.scryfall.com/cards/search?order=set&q=e%3Athb&unique=prints",
        "scryfall_set_uri": "https://scryfall.com/sets/thb?utm_source=api",
        "rulings_uri": "https://api.scryfall.com/cards/5bd6353f-d119-40e6-895c-030a11a7a2fe/rulings",
        "prints_search_uri": "https://api.scryfall.com/cards/search?order=released&q=oracleid%3Acfb8cdde-11f6-441a-942b-32d8c191fc90&unique=prints",
        "collector_number": "235",
        "digital": false,
        "rarity": "rare",
        "card_back_id": "0aeebaf5-8c7d-4636-9e82-8c27447861f7",
        "artist": "Raoul Vitale",
        "artist_ids": [
          "c7c15d49-f84b-4d98-9a34-e80e8347b756"
        ],
        "illustration_id": "1f1ddcb3-6e8e-4165-9c32-f31362ea90d9",
        "border_color": "black",
        "frame": "2015",
        "frame_effects": [
          "legendary"
        ],
        "security_stamp": "oval",
        "full_art": false,
        "textless": false,
        "booster": true,
        "story_spotlight": false,
        "edhrec_rank": 1041,
        "penny_rank": 6921,
        "preview": {
          "source": "Gaby Spartz",
          "source_uri": "https://www.youtube.com/watch?v=-4l_rn8nPls",
          "previewed_at": "2019-12-30"
        },
        "prices": {
          "usd": "4.81",
          "usd_foil": "4.41",
          "usd_etched": null,
          "eur": "2.70",
          "eur_foil": "3.68",
          "tix": "0.02"
        },
        "related_uris": {
          "gatherer": "https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=476486&printed=false",
          "tcgplayer_infinite_articles": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Darticle%26game%3Dmagic%26partner%3Dscryfall%26q%3DNyx%2BLotus",
          "tcgplayer_infinite_decks": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Ddeck%26game%3Dmagic%26partner%3Dscryfall%26q%3DNyx%2BLotus",
          "edhrec": "https://edhrec.com/route/?cc=Nyx+Lotus"
        },
        "purchase_uris": {
          "tcgplayer": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&u=https%3A%2F%2Fwww.tcgplayer.com%2Fproduct%2F206648%3Fpage%3D1",
          "cardmarket": "https://www.cardmarket.com/en/Magic/Products/Singles/Theros-Beyond-Death/Nyx-Lotus?referrer=scryfall&utm_campaign=card_prices&utm_medium=text&utm_source=scryfall",
          "cardhoarder": "https://www.cardhoarder.com/cards/79594?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall"
        }
      },
      {
        "object": "card",
        "id": "6f566387-3342-4325-ba4c-eee7626072ac",
        "oracle_id": "fec77e0a-433e-4d32-9260-e26a37f6ad23",
        "multiverse_ids": [
          574719
        ],
        "mtgo_id": 102954,
        "arena_id": 82291,
        "tcgplayer_id": 283192,
        "cardmarket_id": 671937,
        "name": "Timeless Lotus",
        "lang": "en",
        "released_at": "2022-09-09",
        "uri": "https://api.scryfall.com/cards/6f566387-3342-4325-ba4c-eee7626072ac",
        "scryfall_uri": "https://scryfall.com/card/dmu/239/timeless-lotus?utm_source=api",
        "layout": "normal",
        "highres_image": true,
        "image_status": "highres_scan",
        "image_uris": {
          "small": "https://cards.scryfall.io/small/front/6/f/6f566387-3342-4325-ba4c-eee7626072ac.jpg?1673308246",
          "normal": "https://cards.scryfall.io/normal/front/6/f/6f566387-3342-4325-ba4c-eee7626072ac.jpg?1673308246",
          "large": "https://cards.scryfall.io/large/front/6/f/6f566387-3342-4325-ba4c-eee7626072ac.jpg?1673308246",
          "png": "https://cards.scryfall.io/png/front/6/f/6f566387-3342-4325-ba4c-eee7626072ac.png?1673308246",
          "art_crop": "https://cards.scryfall.io/art_crop/front/6/f/6f566387-3342-4325-ba4c-eee7626072ac.jpg?1673308246",
          "border_crop": "https://cards.scryfall.io/border_crop/front/6/f/6f566387-3342-4325-ba4c-eee7626072ac.jpg?1673308246"
        },
        "mana_cost": "{5}",
        "cmc": 5,
        "type_line": "Legendary Artifact",
        "oracle_text": "Timeless Lotus enters tapped.\n{T}: Add {W}{U}{B}{R}{G}.",
        "colors": [],
        "color_identity": [
          "B",
          "G",
          "R",
          "U",
          "W"
        ],
        "keywords": [],
        "produced_mana": [
          "B",
          "G",
          "R",
          "U",
          "W"
        ],
        "legalities": {
          "standard": "legal",
          "future": "legal",
          "historic": "legal",
          "timeless": "legal",
          "gladiator": "legal",
          "pioneer": "legal",
          "explorer": "legal",
          "modern": "legal",
          "legacy": "legal",
          "pauper": "not_legal",
          "vintage": "legal",
          "penny": "not_legal",
          "commander": "legal",
          "oathbreaker": "legal",
          "standardbrawl": "legal",
          "brawl": "legal",
          "alchemy": "not_legal",
          "paupercommander": "not_legal",
          "duel": "legal",
          "oldschool": "not_legal",
          "premodern": "not_legal",
          "predh": "not_legal"
        },
        "games": [
          "paper",
          "arena",
          "mtgo"
        ],
        "reserved": false,
        "foil": true,
        "nonfoil": true,
        "finishes": [
          "nonfoil",
          "foil"
        ],
        "oversized": false,
        "promo": false,
        "reprint": false,
        "variation": false,
        "set_id": "4e47a6cd-cdeb-4b0f-8f24-cfe1a0127cb3",
        "set": "dmu",
        "set_name": "Dominaria United",
        "set_type": "expansion",
        "set_uri": "https://api.scryfall.com/sets/4e47a6cd-cdeb-4b0f-8f24-cfe1a0127cb3",
        "set_search_uri": "https://api.scryfall.com/cards/search?order=set&q=e%3Admu&unique=prints",
        "scryfall_set_uri": "https://scryfall.com/sets/dmu?utm_source=api",
        "rulings_uri": "https://api.scryfall.com/cards/6f566387-3342-4325-ba4c-eee7626072ac/rulings",
        "prints_search_uri": "https://api.scryfall.com/cards/search?order=released&q=oracleid%3Afec77e0a-433e-4d32-9260-e26a37f6ad23&unique=prints",
        "collector_number": "239",
        "digital": false,
        "rarity": "mythic",
        "flavor_text": "Urza exploited nature to power his war machines; in time, nature exploited his war machines to renew itself.",
        "card_back_id": "0aeebaf5-8c7d-4636-9e82-8c27447861f7",
        "artist": "Lindsey Look",
        "artist_ids": [
          "95bc132d-37aa-4063-8ed8-04d489e826cd"
        ],
        "illustration_id": "cbed4a6b-59a5-4b45-8a5b-3169257f5f79",
        "border_color": "black",
        "frame": "2015",
        "frame_effects": [
          "legendary"
        ],
        "security_stamp": "oval",
        "full_art": false,
        "textless": false,
        "booster": true,
        "story_spotlight": false,
        "edhrec_rank": 1912,
        "preview": {
          "source": "IGN",
          "source_uri": "https://www.ign.com/articles/magic-the-gathering-dominaria-united-spoilers-timeless-lotus-merfolk",
          "previewed_at": "2022-08-23"
        },
        "prices": {
          "usd": "16.46",
          "usd_foil": "17.49",
          "usd_etched": null,
          "eur": "7.63",
          "eur_foil": "9.94",
          "tix": "0.31"
        },
        "related_uris": {
          "gatherer": "https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=574719&printed=false",
          "tcgplayer_infinite_articles": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Darticle%26game%3Dmagic%26partner%3Dscryfall%26q%3DTimeless%2BLotus",
          "tcgplayer_infinite_decks": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Ddeck%26game%3Dmagic%26partner%3Dscryfall%26q%3DTimeless%2BLotus",
          "edhrec": "https://edhrec.com/route/?cc=Timeless+Lotus"
        },
        "purchase_uris": {
          "tcgplayer": "https://tcgplayer.pxf.io/c/4931599/1830156/21018?subId1=api&u=https%3A%2F%2Fwww.tcgplayer.com%2Fproduct%2F283192%3Fpage%3D1",
          "cardmarket": "https://www.cardmarket.com/en/Magic/Products/Singles/Dominaria-United/Timeless-Lotus?referrer=scryfall&utm_campaign=card_prices&utm_medium=text&utm_source=scryfall",
          "cardhoarder": "https://www.cardhoarder.com/cards/102954?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall"
        }
      }
    ]
  };

  return testScryfallService
    .cardsSearch('lotus')
    .then((actual: ScryfallList<ScryfallCard> | ScryfallError) => {
      return t.deepEqual(actual, expected);
    });
});

test('cardsSearch - Error', (t) => {
  const expected: ScryfallError = {
    object: 'error',
    code: 'bad_request',
    status: 400,
    details: 'You didn‘t enter anything to search for.',
    warnings: null
  };

  return testScryfallService
    .cardsSearch('')
    .then((actual: ScryfallList<ScryfallCard> | ScryfallError) => {
      return t.deepEqual(actual, expected);
    });
});

////////////////////////////////////////////////////////////////////////////////
//                             getAllListElements                             //
////////////////////////////////////////////////////////////////////////////////

test('getAllListElements', (t) => {
  const expectedLength = 366;
  return testScryfallService
    .getAllListElements(() => testScryfallService.cardsSearch('year=1993'))
    .then((list) => {
      if (list.object === 'list') {
        return t.is(list.data.length, expectedLength);
      } else {
        return t.fail(`Got error ${list}`)
      }
    });
});

