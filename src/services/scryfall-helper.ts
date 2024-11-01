import {
  ParsedCard,
  ScryfallCard,
  ScryfallCollectionIdentifier,
  ScryfallError,
  ScryfallList,
  ScryfallResultList
} from '../types';

import { ScryfallService } from './scryfall.service';

type DataAndNotFound = {data: ScryfallCard[], not_found: ScryfallCollectionIdentifier[] };

export class ScryfallHelper {

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
    'any'
  ];

  private service: ScryfallService;

  constructor(service: ScryfallService = new ScryfallService()) {
    this.service = service;
  }

  /* Calls the Scryfall API to fetch card data for the given ParsedCard.
   * If `firstTry` is false (default), will try many increasingly probable but
   * less accurate searches.
   * Otherwise, will only try the most accurate search.
   */
  public getCard(parsedCard: ParsedCard, firstTry = true): Promise<ScryfallCard | undefined> {
    if (firstTry) {
      return this._callApi(this._getCardFetch(parsedCard));
    } else {
      const possibleSearches = this._getPossibleCardsFetches(parsedCard);
      return this._callApiUntilFound(possibleSearches);
    }
  }

  // When updating this function, please consider also updating
  // _getPossibleCardsFetches and _toIdentifier
  private _getCardFetch(parsedCard: ParsedCard): () => Promise<ScryfallCard | ScryfallError> {
    if (this.uuidRegexp.test(parsedCard.name)) {
      // Name is a UUID, so we request the direct endpoint
      return () => this.service.cardsId(parsedCard.name);
    } else if (this.codeNumberRegexp.test(parsedCard.name)) {
      // Name is a code, so we request the collector number endpoint with
      // modifications for the language
      const setAndCollectorNumber = parsedCard.name.split('/');
      if (
        parsedCard.language != null &&
        this.validLanguages.includes(parsedCard.language)
      ) {
        return () => this.service.cardsCollectorNumber(
          setAndCollectorNumber[0],
          setAndCollectorNumber[1],
          parsedCard.language
        );
      }
      if (setAndCollectorNumber.length > 2) {
        return () => this.service.cardsCollectorNumber(
          setAndCollectorNumber[0],
          setAndCollectorNumber[1],
          setAndCollectorNumber[2]
        );
      }
      return () => this.service.cardsCollectorNumber(
        setAndCollectorNumber[0],
        setAndCollectorNumber[1],
      );
    } else {
      if (parsedCard.language) {
        const queryWithExtras = `${parsedCard.name} include:extras lang:${parsedCard.language || 'any'}`;
        return () => this._getFirstCard(this.service.cardsSearch(queryWithExtras));
      } else {
        // This endpoint uses a clever algorithm to match the intended card
        // For instance, "Black Lotus" matches cards named "Black Lotus", but not "Blacker Lotus"
        return () => this.service.cardsNamed(parsedCard.name);
      }
    }
  }

  /* This function returns an array of possible search queries for a given card,
   * ranging from most specific and most likely to fail, to least specific and
   * least likely to fail
   *
   * When updating this function, please consider also updating _getCardFetch and
   * _toIdentifier
   */
  private _getPossibleCardsFetches(parsedCard: ParsedCard): (() => Promise<ScryfallCard | ScryfallError>)[] {
    const fetches = [];
    if (this.uuidRegexp.test(parsedCard.name)) {
      // Name is a UUID, so we request the direct endpoint
      fetches.push(() => this.service.cardsId(parsedCard.name));
    }
    if (this.codeNumberRegexp.test(parsedCard.name)) {
      // Name is a code, so we request the direct endpoint with modifications
      // for the language
      const setAndCollectorNumber = parsedCard.name.split('/');
      if (
        parsedCard.language != null &&
        this.validLanguages.includes(parsedCard.language)
      ) {
        fetches.push(() => this.service.cardsCollectorNumber(
          setAndCollectorNumber[0],
          setAndCollectorNumber[1],
          parsedCard.language
        ));
      }
      if (setAndCollectorNumber.length > 2) {
        fetches.push(() => this.service.cardsCollectorNumber(
          setAndCollectorNumber[0],
          setAndCollectorNumber[1],
          setAndCollectorNumber[2]
        ));
      }
      fetches.push(() => this.service.cardsCollectorNumber(
        setAndCollectorNumber[0],
        setAndCollectorNumber[1],
      ));
    }

    if (parsedCard.language) {
      const query = `${parsedCard.name} lang:${parsedCard.language}`;
      fetches.push(() => this._getFirstCard(this.service.cardsSearch(query)));
      fetches.push(() => this._getFirstCard(this.service.cardsSearch(`${query} include:extras`)));
    } else {
      fetches.push(() => this._getFirstCard(this.service.cardsSearch(parsedCard.name)));
      fetches.push(() => this._getFirstCard(this.service.cardsSearch(`${parsedCard.name} include:extras`)));
    }

    // This endpoint uses a clever algorithm to match the intended card
    // For instance, "Black Lotus" matches cards named "Black Lotus", but not "Blacker Lotus"
    fetches.push(() => this.service.cardsNamed(parsedCard.name));

    const lastChanceQuery = `${parsedCard.name} include:extras lang:any`;
    fetches.push(() => this._getFirstCard(this.service.cardsSearch(lastChanceQuery)));

    return fetches;
  }

  private _getFirstCard(cardsResolver: Promise<ScryfallList<ScryfallCard> | ScryfallError>): Promise<ScryfallCard | ScryfallError> {
    return cardsResolver.then((result): Promise<ScryfallCard | ScryfallError> => {
      if (result.object === 'error') {
        return Promise.resolve(result);
      } else if(result.data.length > 0) {
        return Promise.resolve(result.data[0]);
      } else {
        return Promise.resolve({
          object: 'error',
          status: 404,
          code: 'No cards found',
          details: 'No cards found'
        });
      }
    })
  }

  // When updating this function, please consider also updating _getCardFetch
  // and _getPossibleCardsFetches
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

    return this.service.getAllListElements(
      () => this.service.getURI<ScryfallList<ScryfallCard> | ScryfallError>(url)
    ).then((result: ScryfallList<ScryfallCard> | ScryfallError): (ScryfallCard[] | undefined) => {
      if (result.object === 'error') {
        return undefined;
      } else if(onlyPaper) {
        return result.data.filter((card) => card.games.includes('paper'));
      } else {
        return result.data;
      }
    });
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
    return Promise.all(chunks.map((chunk) => this.service.cardsCollection(chunk)))
      .then((results) => {
        if (results.some((res) => res.object === 'error')) {
          throw new Error();
        }
        return results as ScryfallResultList[];
      })
      // We merge the results (both data and errors)
      .then((chunkedResults) =>
        chunkedResults.reduce(
          (prev: DataAndNotFound, curr: ScryfallResultList): DataAndNotFound => ({
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

  /* This function factorizes some code for the handling of responses from the api.
   */
  private async _callApi(
    apiCall: () => Promise<ScryfallCard | ScryfallError>
  ): Promise<ScryfallCard | undefined> {
    const res = await apiCall();
    if (res.object !== 'error') {
      return Promise.resolve(res);
    } else {
      return Promise.resolve(undefined);
    }
  }

  /* Calls the given uris in order until one returns a non-undefined result
   */
  private async _callApiUntilFound(
    apiCalls: (() => Promise<ScryfallCard | ScryfallError>)[]
  ): Promise<ScryfallCard | undefined> {
    if (apiCalls.length < 1) {
      return Promise.resolve(undefined);
    }
    let res = undefined;
    let i = 0;
    do {
      res = await this._callApi(apiCalls[i]);
      i += 1;
    } while (res === undefined && i < apiCalls.length);
    return res;
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
