import { ParsedCard, ScryfallCard, ScryfallCollectionIdentifier } from '../types';

import { Delayer } from './delayer';

export class ScryfallService {
  private SCRYFALL_API_URI = 'https://api.scryfall.com';
  private API_DELAY_MS = 100;

  private delayer: Delayer = new Delayer(this.API_DELAY_MS);

  private uuidRegexp =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
  private codeNumberRegexp =
    /^[a-zA-Z0-9]{3,5}\/[^/]+(?:\/(?:[a-zA-Z]{2,3})?)?$/;
  private validLanguages = [
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

  /* Calls the Scryfall API to fetch card data for the given ParsedCard.
   */
  public getCard(parsedCard: ParsedCard): Promise<ScryfallCard | undefined> {
    return this._callApi(this._getUri(parsedCard));
  }

  // When updating this function, please consider also updating _toIdentifier
  private _getUri(parsedCard: ParsedCard): string {
    if (this.uuidRegexp.test(parsedCard.name)) {
      // Name is a UUID, so we request the direct endpoint
      return `${this.SCRYFALL_API_URI}/cards/${parsedCard.name}`;
    } else if (this.codeNumberRegexp.test(parsedCard.name)) {
      // Name is a code, so we request the direct endpoint with modifications
      // for the language
      let cardCode = parsedCard.name;
      if (
        parsedCard.language != null &&
        this.validLanguages.includes(parsedCard.language)
      ) {
        cardCode =
          parsedCard.name.split('/').slice(0, 2).join('/') +
          `/${parsedCard.language}`;
      }
      return `${this.SCRYFALL_API_URI}/cards/${cardCode}`;
    } else {
      return `${this.SCRYFALL_API_URI}/cards/named/?fuzzy=${encodeURIComponent(
        parsedCard.name
      )}`;
    }
  }

  // When updating this function, please consider also updating _getUri
  private _toIdentifier(parsedCard: ParsedCard): ScryfallCollectionIdentifier {
    if (this.uuidRegexp.test(parsedCard.name)) {
      // Name is a UUID
      return { id: parsedCard.name };
    } else if (
      parsedCard.language != null &&
      parsedCard.language != 'en' &&
      this.validLanguages.includes(parsedCard.language)
    ) {
      // Scryfall collection endpoint does not support languages other than english,
      // except when getting by id. As such, if a specific language is requested,
      // we forge a purposefully erroneous identifier to trigger manual search.
      return { name: `${parsedCard.name} -l=${parsedCard.language}` };
    } else if (this.codeNumberRegexp.test(parsedCard.name)) {
      // Name is a code, maybe with a language (in which case we fail as above)
      const parts = parsedCard.name.split('/');
      if (
        parts.length > 2 &&
        parts[2] != 'en' &&
        this.validLanguages.includes(parts[2])
      ) {
        // We have a valid language, failing as above
        return { name: `${parsedCard.name} -l=${parts[2]}` };
      } else {
        return { set: parts[0], collector_number: parts[1] };
      }
    } else {
      return { name: parsedCard.name };
    }
  }

  /* Given a ScryfallCard, return all prints of that card.
   * DO NOT call this function repetitively as it is not buffered and could lead
   * you to be blocked by Scryfall.
   * Instead use the dedicated getCardPrintsAndDo() function.
   */
  public getCardPrintsFromCard(
    scryfallCard: ScryfallCard,
    includeMultilingual = false,
    onlyPaper = true
  ): Promise<ScryfallCard[] | undefined> {
    const url = includeMultilingual
      ? `${scryfallCard.prints_search_uri}&include_multilingual=true`
      : scryfallCard.prints_search_uri;

    return this._getListFromApi(url, (cards: ScryfallCard[]) =>
      onlyPaper ? cards.filter((card) => card.games.includes('paper')) : cards
    );
  }

  /* This function calls the Scryfall collection API with delay to fetch
   * cards data for the given `parsedCard` array, and returns an array of the
   * results.
   * If any cards cannot be found, it tries searching them individually.
   * If cards are still not found, undefined is returned.
   */
  public getCardsBatch(
    parsedCards: ParsedCard[]
  ): Promise<(ScryfallCard | undefined)[]> {
    // We map all parsedCards to their corresponding ScryfallCollectionIdentifier
    const identifiers = parsedCards.map((card) => this._toIdentifier(card));

    // We crate a map linking an identifier back to its original position
    // in the parsedCards array.
    // This is to allow us to insert the cards that the collection endpoint could
    // not locate back at their original position (the collection endpoint
    // returns al the ScryfallCollectionIdentifier it could not resolve).
    // We use a map of string as a map of ScryfallCollectionIdentifier would not match correctly on similar objects
    const identifiersReverseMap = new Map<string, number>();
    identifiers.forEach((id, index) => identifiersReverseMap.set(JSON.stringify(id), index));

    // The collection endpoint only accepts up to 75 identifiers per call, so
    // we divide the request and merge the responses later.
    const chunks = chunk(identifiers, 75);

    // We call the collection endpoint for each chunk
    return Promise.all(chunks.map((chunk) => this._getCollection(chunk)))
      // We merge the results (both data and errors)
      .then((chunkedResults) =>
        chunkedResults.reduce(
          (prev, curr) => ({
            data: [...prev.data, ...curr.data],
            not_found: [...prev.not_found, ...curr.not_found]
          }),
          { data: [], not_found: [] }
        )
      )
      .then((results) => {
        if (results.not_found.length === 0) {
          // All cards were found first try!
          return results.data;
        } else {
          // Some cards could not resolve. We retry them individually using
          // the more permissive apis behind getCard
          return this._fallbackNotFound(results.not_found, identifiersReverseMap, parsedCards)
            // We insert the cards that were eventually found (or undefined
            // if they could not be found) into their original position
            .then((scryfallCardsWithId) =>
              scryfallCardsWithId.reduce((
                allCards: (ScryfallCard | undefined)[],
                currentScryfallCard
              ) => {
                if (currentScryfallCard) {
                  // We insert the element at its place
                  allCards.splice(currentScryfallCard.id, 0, currentScryfallCard.card);
                }
                return allCards;
              }, results.data)
            );
        }
      });
  }

  private _getCollection(identifiers: ScryfallCollectionIdentifier[]): Promise<{
    data: ScryfallCard[];
    not_found: ScryfallCollectionIdentifier[];
  }> {
    return this._callApi(
      `${this.SCRYFALL_API_URI}/cards/collection`,
      (json) => json,
      { method: 'POST', body: JSON.stringify({ identifiers: identifiers }), headers: {"Content-Type": "application/json"} }
    );
  }

  private _fallbackNotFound(
    identifiers: ScryfallCollectionIdentifier[],
    identifiersReverseMap: Map<string, number>,
    parsedCards: ParsedCard[]
  ): Promise<({ card: ScryfallCard | undefined, id: number } | undefined)[]> {
    return Promise.all(identifiers
      // We retrieve the identifiers' original parsedCard and position
      .map((identifier) => identifiersReverseMap.get(JSON.stringify(identifier)))
      .map((id) =>
        id !== undefined ? { card: parsedCards[id], id: id } : undefined
      )
      .map((card) => {
        // This should always be the case
        if (card) {
          // We try and get the card from the original parsedCard using the most
          // permissive api getCard
          return this.getCard(card.card)
            .then((scryfallCard) => {
              return { card: scryfallCard, id: card.id };
            });
        } else {
          // This should never happen
          return Promise.resolve(undefined);
        }
      })
    );
  }

  /* This function calls Scryfall with delay to fetch all given `cards` and
   * calls `callback` for each one with the input and the result from Scryfall
   * (undefined if no card was found or an error occurred).
   */
  public getCardsAndDo<T extends ParsedCard>(
    cards: T[],
    callback: (input: T, foundCard: ScryfallCard | undefined) => void
  ): Promise<void> {
    const promises: Promise<void>[] = [];
    cards.forEach((card) => {
      const promise = this.getCard({
        name: card.name,
        quantity: card.quantity,
        language: card.language,
        customFlags: card.customFlags
      }).then((scryfallCard) => callback(card, scryfallCard));
      promises.push(promise);
    });
    return Promise.all(promises).then();
  }

  /* This function calls Scryfall with delay to fetch all prints of
   * the given `cards` and calls `callback` for each one with the input and the
   * result from Scryfall (undefined if no card was found or an error occurred).
   */
  public getCardPrintsAndDo<T extends ParsedCard>(
    cards: T[],
    callback: (input: T, foundCards: ScryfallCard[] | undefined) => void,
    includeMultilingual = false,
    onlyPaper = true
  ): Promise<void> {
    const promises: Promise<void>[] = [];
    cards.forEach((card) => {
      const promise = this.getCard({
        name: card.name,
        quantity: card.quantity,
        language: card.language,
        customFlags: card.customFlags
      })
        .then(
          (scryfallCard): Promise<ScryfallCard[] | undefined> =>
            scryfallCard !== undefined
              ? this.getCardPrintsFromCard(
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

  /* This function fetches a URI expected to return a list, and then fetches all
   * the pages in the list.
   *
   * It is public only for testing and should not be used directly by the consumer
   */
  public _getListFromApi<T, U>(
    uri: string,
    successCallback: (listData: T[]) => U | Promise<U>
  ): Promise<U | undefined> {
    return this._callApi(
      uri,
      (json: {
        data: T[];
        has_more: boolean;
        next_page: string | undefined;
      }) => {
        const data = json.data;
        if (json.has_more && json.next_page !== undefined) {
          return this._getListFromApi(json.next_page, (listData: T[]) => [
            ...json.data,
            ...listData
          ]).then((allData: T[] | undefined) => {
            if (allData !== undefined) {
              return successCallback(allData);
            } else {
              return undefined;
            }
          });
        } else {
          return successCallback(data);
        }
      }
    );
  }

  /* This function factorizes some code for the handling of responses from the api.
   */
  private async _callApi<T>(
    uri: string,
    successCallback: (json: any) => T | Promise<T> = (json) => json,
    requestInit: RequestInit | undefined = undefined
  ): Promise<T | undefined> {
    const res = await this.delayer.execute(() => fetch(uri, requestInit));
    if (res.ok) {
      return res.json().then(successCallback);
    } else {
      return Promise.resolve(undefined);
    }
  }
}

function chunk<T>(array: T[], maxSize: number): T[][] {
  const res = [];
  let start = 0;
  let end = maxSize;
  do {
    res.push(array.slice(start, end));
    start += maxSize;
    end += maxSize;
  } while (end <= array.length);
  return res;
}
