import { ParsedCard, ScryfallCard } from '../types';

const uuidRegexp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
const codeNumberRegexp = /^[a-zA-Z0-9]{3,5}\/[^/]+(?:\/(?:[a-zA-Z]{2,3})?)?$/
const validLanguages = ['en','es','fr','de','it','pt','ja','ko','ru','zhs','zht'];

const SCRYFALL_API_URI = 'https://api.scryfall.com';
const API_DELAY_MS = 100;

/* Returns a promise that completes after delayMs milliseconds and returns nothing
 */
function _later(delayMs: number): Promise<void> {
  return new Promise((resolve: (value: void) => void) => {
    setTimeout(resolve, delayMs);
  });
}

/* Calls the Scryfall API to fetch card data for the given ParsedCard.
 * DO NOT call this function repetitively as it is not buffered and could lead
 * you to be blocked by Scryfall.
 * Instead use the dedicated getCardsBatch() function.
 */
export async function getCard(parsedCard: ParsedCard): Promise<ScryfallCard | undefined> {
  let requestURI: string;

  if (uuidRegexp.test(parsedCard.name)) {
    // Name is a UUID, so we request the direct endpoint
    requestURI = `https://api.scryfall.com/cards/${parsedCard.name}`;
  } else if (codeNumberRegexp.test(parsedCard.name)) {
    // Name is a code, so we request the direct endpoint with modifications for the language
    let cardCode = parsedCard.name;
    if (parsedCard.language != undefined && validLanguages.includes(parsedCard.language)) {
      cardCode = parsedCard.name.split('/').slice(0, 2).join('/') + `/${parsedCard.language}`;
    }
    requestURI = `${SCRYFALL_API_URI}/cards/${cardCode}`;
  } else {
    requestURI = `${SCRYFALL_API_URI}/cards/named/?fuzzy=${encodeURIComponent(parsedCard.name)}`;
  }

  const httpFetch = fetch(requestURI);

  const res: Response = await httpFetch;
  if (res.ok) {
    return await res.json();
  } else {
    return undefined;
  }
}

/* Calls the Scryfall API with delay to fetch cards data for the given ParsedCard array.
 */
export async function getCardsBatch(parsedCard: ParsedCard[]): Promise<(ScryfallCard | undefined)[]> {
  return await Promise.all(
    parsedCard.map((card: ParsedCard, i: number): Promise<ScryfallCard | undefined> =>
      _later(i * API_DELAY_MS).then((): Promise<ScryfallCard | undefined> => getCard(card))
    )
  )
}
