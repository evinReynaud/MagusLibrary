import { ParsedCard, ScryfallCard } from '../types';

const uuidRegexp =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const codeNumberRegexp = /^[a-zA-Z0-9]{3,5}\/[^/]+(?:\/(?:[a-zA-Z]{2,3})?)?$/;
const validLanguages = [
  'en',
  'es',
  'fr',
  'de',
  'it',
  'pt',
  'ja',
  'ko',
  'ru',
  'zhs',
  'zht',
];

const SCRYFALL_API_URI = 'https://api.scryfall.com';
const API_DELAY_MS = 100;

/* Returns a promise that completes after delayMs milliseconds and returns nothing
 */
async function _later(delayMs: number): Promise<void> {
  return new Promise((resolve: (value: void) => void) => {
    setTimeout(resolve, delayMs);
  });
}

/* Calls the Scryfall API to fetch card data for the given ParsedCard.
 * DO NOT call this function repetitively as it is not buffered and could lead
 * you to be blocked by Scryfall.
 * Instead use the dedicated getCardsBatch() function.
 */
export async function getCard(
  parsedCard: ParsedCard
): Promise<ScryfallCard | undefined> {
  let requestURI: string;

  if (uuidRegexp.test(parsedCard.name)) {
    // Name is a UUID, so we request the direct endpoint
    requestURI = `${SCRYFALL_API_URI}/cards/${parsedCard.name}`;
  } else if (codeNumberRegexp.test(parsedCard.name)) {
    // Name is a code, so we request the direct endpoint with modifications
    // for the language
    let cardCode = parsedCard.name;
    if (
      parsedCard.language != null &&
      validLanguages.includes(parsedCard.language)
    ) {
      cardCode =
        parsedCard.name.split('/').slice(0, 2).join('/') +
        `/${parsedCard.language}`;
    }
    requestURI = `${SCRYFALL_API_URI}/cards/${cardCode}`;
  } else {
    requestURI = `${SCRYFALL_API_URI}/cards/named/?fuzzy=${encodeURIComponent(
      parsedCard.name
    )}`;
  }

  const httpFetch = fetch(requestURI);

  const res: Response = await httpFetch;
  if (res.ok) {
    return await res.json();
  } else {
    return Promise.resolve(undefined);
  }
}

/* Given a ScryfallCard, return all prints of tha card.
 * DO NOT call this function repetitively as it is not buffered and could lead
 * you to be blocked by Scryfall.
 * Instead use the dedicated getCardPrintsAndDo() function.
 */
async function getCardPrintsFromCard(
  scryfallCard: ScryfallCard,
  includeMultilingual = false,
  onlyPaper = true
): Promise<ScryfallCard[] | undefined> {
  const url = includeMultilingual
    ? `${scryfallCard.prints_search_uri}&include_multilingual=true`
    : scryfallCard.prints_search_uri;
  const res: Response = await fetch(url);
  if (res.ok) {
    return await res
      .json()
      .then((json) => json.data)
      .then((cards: ScryfallCard[]) =>
        onlyPaper ? cards.filter((card) => card.games.includes('paper')) : cards
      );
  } else {
    return Promise.resolve(undefined);
  }
}

/* Calls the Scryfall API with delay to fetch cards data for the given
 * `ParsedCard` array.
 */
export async function getCardsBatch(
  parsedCard: ParsedCard[]
): Promise<(ScryfallCard | undefined)[]> {
  return await Promise.all(
    parsedCard.map(
      (card: ParsedCard, i: number): Promise<ScryfallCard | undefined> =>
        _later(i * API_DELAY_MS).then(
          (): Promise<ScryfallCard | undefined> => getCard(card)
        )
    )
  );
}

/* This function calls Scryfall with delay to fetch all given `cards` and
 * calls `callback` for each one with the input and the result from Scryfall
 * (undefined if no card was found or an error occurred).
 */
export async function getCardsAndDo<T extends ParsedCard>(
  cards: T[],
  callback: (input: T, foundCard: ScryfallCard | undefined) => void
): Promise<void> {
  const promises: Promise<void>[] = [];
  cards.forEach((card, index) => {
    const promise = _later(index * API_DELAY_MS).then(() =>
      getCard({
        name: card.name,
        quantity: card.quantity,
        language: card.language,
        customFlags: card.customFlags,
      }).then((scryfallCard) => callback(card, scryfallCard))
    );
    promises.push(promise);
  });
  return Promise.all(promises).then();
}

/* This function calls Scryfall with delay to fetch all prints of
 * the given `cards` and calls `callback` for each one with the input and the
 * result from Scryfall (undefined if no card was found or an error occurred).
 */

export async function getCardPrintsAndDo<T extends ParsedCard>(
  cards: T[],
  callback: (input: T, foundCards: ScryfallCard[] | undefined) => void,
  includeMultilingual = false,
  onlyPaper = true
): Promise<void> {
  const promises: Promise<void>[] = [];
  cards.forEach((card, index) => {
    const promise = _later(index * API_DELAY_MS)
      .then(() =>
        getCard({
          name: card.name,
          quantity: card.quantity,
          language: card.language,
          customFlags: card.customFlags,
        })
      )
      .then(
        (scryfallCard): Promise<ScryfallCard[] | undefined> =>
          scryfallCard !== undefined
            ? getCardPrintsFromCard(
                scryfallCard,
                includeMultilingual,
                onlyPaper
              )
            : Promise.resolve(undefined)
      )
      .then((scryfallPrints) => callback(card, scryfallPrints));
    promises.push(promise);
  });
  return Promise.all(promises).then();
}
