export type ScryfallCard = {
  object: 'card';
  // Core Cards Fields
  arena_id?: number;
  id: UUID;
  lang: string;
  mtgo_id?: number;
  mtgo_foil_id?: number;
  multiverse_ids?: number[];
  tcgplayer_id?: number;
  tcgplayer_etched_id?: number;
  cardmarket_id?: number;
  layout: string;
  oracle_id?: UUID;
  prints_search_uri: URI;
  rulings_uri: URI;
  scryfall_uri: URI;
  uri: URI;

  // Gameplay Fields
  all_parts?: ScryfallRelatedCard[];
  card_faces?: ScryfallCardFace[];
  cmc: number;
  color_identity: Colors;
  color_indicator?: Colors;
  colors?: Colors;
  defense?: string;
  edhrec_rank?: number;
  hand_modifier?: string;
  keywords: string[];
  legalities: object;
  life_modifier?: string;
  loyalty?: string;
  mana_cost?: string;
  name: string;
  oracle_text?: string;
  penny_rank?: number;
  power?: string;
  produced_mana?: Colors;
  reserved: boolean;
  toughness?: string;
  type_line: string;

  // Print Field
  artist?: string;
  artist_ids?: string[];
  attraction_lights?: string[];
  booster: boolean;
  border_color: string;
  card_back_id: UUID;
  collector_number: string;
  content_warning?: boolean;
  digital: boolean;
  foil?: boolean;
  nonfoil?: boolean;
  finishes: ('foil' | 'nonfoil' | 'etched')[];
  flavor_name?: string;
  flavor_text?: string;
  frame_effects?: string[];
  frame: string;
  full_art: boolean;
  games: string[];
  highres_image: boolean;
  illustration_id?: UUID;
  image_status: string;
  image_uris?: ScryfallImageUris;
  oversized: boolean;
  prices: object;
  printed_name?: string;
  printed_text?: string;
  printed_type_line?: string;
  promo: boolean;
  promo_types?: string[];
  purchase_uris?: object;
  rarity: string;
  related_uris: object;
  released_at: string;
  reprint: boolean;
  scryfall_set_uri: URI;
  set_name: string;
  set_search_uri: URI;
  set_type: string;
  set_uri: URI;
  set: string;
  set_id: UUID;
  story_spotlight: boolean;
  textless: boolean;
  variation: boolean;
  variation_of?: UUID;
  security_stamp?: string;
  watermark?: string;
  preview?: {
    previewed_at?: string;
    source_uri?: URI;
    source?: string;
  };
};

export type ScryfallRelatedCard = {
  id: UUID;
  object: string;
  component: string;
  name: string;
  type_line: string;
  uri: URI;
};

export type ScryfallCardFace = {
  artist?: string;
  artist_id?: UUID;
  cmc?: number;
  color_indicator?: Colors;
  colors?: Colors;
  defense?: string;
  flavor_text?: string;
  illustration_id?: UUID;
  image_uris?: ScryfallImageUris;
  layout?: string;
  loyalty?: string;
  mana_cost: string;
  name: string;
  object: string;
  oracle_id?: UUID;
  oracle_text?: string;
  power?: string;
  printed_name?: string;
  printed_text?: string;
  printed_type_line?: string;
  toughness?: string;
  type_line?: string;
  watermark?: string;
};

export type ScryfallImageUris = {
  small?: URI;
  normal?: URI;
  large?: URI;
  png?: URI;
  art_crop?: URI;
  border_crop?: URI;
};

export type ScryfallCollectionIdentifier = {
  id: UUID
} | {
  mtgo_id: number
} | {
  multiverse_id: number
} | {
  oracle_id: UUID
} | {
  illustration_id: UUID
} | {
  name: string
} | {
  name: string
  set: string
} | {
  set: string,
  collector_number: string
};

export type UUID = string;
export type URI = string;
export type Colors = Color[];
export type Color = 'W' | 'U' | 'B' | 'R' | 'G';

export type ScryfallError = {
  object: 'error';
  status: number;
  code: string;
  details: string;
  type?: string;
  warnings?: string[] | null;
};

export type ScryfallList<T> = {
  object: 'list';
  data: T[];
  has_more: boolean;
  next_page?: URI;
  total_cards?: number; // Only if this is a list of cards
  warnings?: string[];
};

export type ScryfallResultList = ScryfallList<ScryfallCard> & {
  not_found: ScryfallCollectionIdentifier[]
}
