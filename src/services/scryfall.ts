import { ParsedCard, ScryfallCard } from '../types';

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
    let requestURI: string;

    if (this.uuidRegexp.test(parsedCard.name)) {
      // Name is a UUID, so we request the direct endpoint
      requestURI = `${this.SCRYFALL_API_URI}/cards/${parsedCard.name}`;
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
      requestURI = `${this.SCRYFALL_API_URI}/cards/${cardCode}`;
    } else {
      requestURI = `${
        this.SCRYFALL_API_URI
      }/cards/named/?fuzzy=${encodeURIComponent(parsedCard.name)}`;
    }

    return this.delayer
      .execute(() => fetch(requestURI))
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.resolve(undefined);
        }
      });
  }

  /* Given a ScryfallCard, return all prints of tha card.
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
    return this.delayer
      .execute(() => fetch(url))
      .then((res) => {
        if (res.ok) {
          return res
            .json()
            .then((json) => json.data)
            .then((cards: ScryfallCard[]) =>
              onlyPaper
                ? cards.filter((card) => card.games.includes('paper'))
                : cards
            );
        } else {
          return Promise.resolve(undefined);
        }
      });
  }

  /* Calls the Scryfall API with delay to fetch cards data for the given
   * `ParsedCard` array.
   */
  public getCardsBatch(
    parsedCard: ParsedCard[]
  ): Promise<(ScryfallCard | undefined)[]> {
    return Promise.all(
      parsedCard.map(
        (card: ParsedCard): Promise<ScryfallCard | undefined> =>
          this.getCard(card)
      )
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
        customFlags: card.customFlags,
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
        customFlags: card.customFlags,
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
}
