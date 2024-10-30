import {
  ScryfallCard,
  ScryfallCollectionIdentifier,
  ScryfallError,
  ScryfallList,
  ScryfallResultList,
} from '../types';

import { Delayer } from './delayer';

type CardSearchOrder =
  | 'name'
  | 'set'
  | 'released'
  | 'rarity'
  | 'color'
  | 'usd'
  | 'tix'
  | 'eur'
  | 'cmc'
  | 'power'
  | 'toughness'
  | 'edhrec'
  | 'penny'
  | 'artist'
  | 'review';

export class ScryfallService {
  private SCRYFALL_API_URI = 'https://api.scryfall.com';
  private API_DELAY_MS = 100;

  private delayer: Delayer = new Delayer(this.API_DELAY_MS);

  public cardsSearch(
    request: string,
    unique: 'cards' | 'art' | 'print' = 'cards',
    order: CardSearchOrder = 'name',
    dir: 'auto' | 'asc' | 'desc' = 'auto',
    include_extras = false,
    include_multilingual = false,
    include_variations = false,
    page = 1,
    format: 'json' | 'csv' = 'json',
    pretty = false
  ): Promise<ScryfallList<ScryfallCard> | ScryfallError> {
    const uri = `${this.SCRYFALL_API_URI}/cards/search/`;
    const queryParams = new URLSearchParams({
      q: request,
      unique: unique,
      order: order,
      dir: dir,
      include_extras: include_extras ? 'true' : 'false',
      include_multilingual: include_multilingual ? 'true' : 'false',
      include_variations: include_variations ? 'true' : 'false',
      page: page.toString(),
      format: format,
      pretty: pretty ? 'true' : 'false',
    });
    return this.delayer
      .execute(() => fetch(`${uri}?${queryParams}`))
      .then((res) => res.json());
  }

  public cardsNamed(
    fuzzy: string | undefined,
    exact: string | undefined = undefined,
    set: string | undefined = undefined,
    format: 'json' | 'text' | 'image' = 'json',
    face: 'back' | undefined = undefined,
    version:
      | 'small'
      | 'normal'
      | 'large'
      | 'png'
      | 'art_crop'
      | 'border_crop'
      | undefined = undefined,
    pretty = false
  ): Promise<ScryfallCard | ScryfallError> {
    const uri = `${this.SCRYFALL_API_URI}/cards/named/`;
    const queryParams = new URLSearchParams({
      format: format,
      pretty: pretty ? 'true' : 'false',
    });
    if (fuzzy) queryParams.set('fuzzy', fuzzy);
    if (exact) queryParams.set('exact', exact);
    if (set) queryParams.set('set', set);
    if (face) queryParams.set('face', face);
    if (version) queryParams.set('version', version);
    return this.delayer
      .execute(() => fetch(`${uri}?${queryParams}`))
      .then((res) => res.json());
  }

  public cardsCollection(
    identifiers: ScryfallCollectionIdentifier[],
    pretty = false
  ): Promise<ScryfallResultList | ScryfallError> {
    const uri = `${this.SCRYFALL_API_URI}/cards/collection`;
    const queryParams = new URLSearchParams({
      pretty: pretty ? 'true' : 'false',
    });
    return this.delayer
      .execute(() =>
        fetch(`${uri}?${queryParams}`, {
          method: 'POST',
          body: JSON.stringify({ identifiers: identifiers }),
          headers: { 'Content-Type': 'application/json' },
        })
      )
      .then((res) => res.json());
  }

  public cardsCollectorNumber(
    code: string,
    number: string,
    lang: string | undefined = undefined,
    format: 'json' | 'text' | 'image' = 'json',
    face: 'back' | undefined = undefined,
    version:
      | 'small'
      | 'normal'
      | 'large'
      | 'png'
      | 'art_crop'
      | 'border_crop'
      | undefined = undefined,
    pretty = false
  ): Promise<ScryfallCard | ScryfallError> {
    const uri = lang
      ? `${this.SCRYFALL_API_URI}/cards/${code}/${number}/${lang}`
      : `${this.SCRYFALL_API_URI}/cards/${code}/${number}`;
    const queryParams = new URLSearchParams({
      format: format,
      pretty: pretty ? 'true' : 'false',
    });
    if (face) queryParams.set('face', face);
    if (version) queryParams.set('version', version);
    return this.delayer
      .execute(() => fetch(`${uri}?${queryParams}`))
      .then((res) => res.json());
  }

  public cardsId(
    id: string,
    format: 'json' | 'text' | 'image' = 'json',
    face: 'back' | undefined = undefined,
    version:
      | 'small'
      | 'normal'
      | 'large'
      | 'png'
      | 'art_crop'
      | 'border_crop'
      | undefined = undefined,
    pretty = false
  ): Promise<ScryfallCard | ScryfallError> {
    const uri = `${this.SCRYFALL_API_URI}/cards/${id}`;
    const queryParams = new URLSearchParams({
      format: format,
      pretty: pretty ? 'true' : 'false',
    });
    if (face) queryParams.set('face', face);
    if (version) queryParams.set('version', version);
    return this.delayer
      .execute(() => fetch(`${uri}?${queryParams}`))
      .then((res) => res.json());
  }

  public getURI<T>(uri: string): Promise<T> {
    return this.delayer.execute(() => fetch(uri))
      .then((res) => res.json());
  }

  // This functions fetches recursively all pages of a ScryfallList
  public getAllListElements<T, U extends ScryfallList<T>>(
    listGetter: () => Promise<U | ScryfallError>
  ): Promise<U | ScryfallError> {
    return listGetter()
      .then((result) => {
        if (result.object === 'error' || !result.has_more || result.next_page === undefined) {
          // We either got an error, or no next page, so we return this result as is
          return Promise.resolve(result);
        } else {
          return this.getAllListElements(
            () => this.getURI<U | ScryfallError>(result.next_page || '')
          ).then((innerResult: U | ScryfallError): Promise<U | ScryfallError> => {
            if (innerResult.object !== 'error') {
              // We have a data field, so we  fill it with all data fetched
              innerResult.data = [...result.data, ...innerResult.data];
            }
            return Promise.resolve(innerResult);
          })
        }
      });
  }
}
