export type ScryfallCard = {
  // Core Cards Fields
  arena_id: number | undefined;
  id: UUID;
  lang: string;
  mtgo_id: number | undefined;
  mtgo_foil_id: number | undefined;
  multiverse_ids: number[] | undefined;
  tcgplayer_id: number | undefined;
  tcgplayer_etched_id: number | undefined;
  cardmarket_id: number | undefined;
  object: string;
  layout: string;
  oracle_id: UUID | undefined;
  prints_search_uri: URI;
  rulings_uri: URI;
  scryfall_uri: URI;
  uri: URI;

  // Gameplay Fields
  all_parts: ScryfallRelatedCard[] | undefined;
  card_faces: ScryfallCardFace[] | undefined;
  cmc: number;
  color_identity: Colors;
  color_indicator: Colors | undefined;
  colors: Colors | undefined;
  defense: string | undefined;
  edhrec_rank: number | undefined;
  hand_modifier: string | undefined;
  keywords: string[];
  legalities: object;
  life_modifier: string | undefined;
  loyalty: string | undefined;
  mana_cost: string | undefined;
  name: string;
  oracle_text: string | undefined;
  penny_rank: number | undefined;
  power: string | undefined;
  produced_mana: Colors | undefined;
  reserved: boolean;
  toughness: string | undefined;
  type_line: string;

  // Print Field
  artist: string | undefined;
  artist_ids: string[] | undefined;
  attraction_lights: string[] | undefined;
  booster: boolean;
  border_color: string;
  card_back_id: UUID;
  collector_number: string;
  content_warning: boolean | undefined;
  digital: boolean;
  finishes: string[];
  flavor_name: string | undefined;
  flavor_text: string | undefined;
  frame_effects: string[] | undefined;
  frame: string;
  full_art: boolean;
  games: string[];
  highres_image: boolean;
  illustration_id: UUID | undefined;
  image_status: string;
  image_uris: ScryfallImageUris | undefined;
  oversized: boolean;
  prices: object;
  printed_name: string | undefined;
  printed_text: string | undefined;
  printed_type_line: string | undefined;
  promo: boolean;
  promo_types: string[] | undefined;
  purchase_uris: object | undefined;
  rarity: string;
  related_uris: object;
  released_at: Date;
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
  variation_of: UUID | undefined;
  security_stamp: string | undefined;
  watermark: string | undefined;
  preview: {
    previewed_at: Date | undefined;
    source_uri: URI | undefined;
    source: string | undefined;
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
  artist: string | undefined;
  artist_id: UUID | undefined;
  cmc: number | undefined;
  color_indicator: Colors | undefined;
  colors: Colors | undefined;
  defense: string | undefined;
  flavor_text: string | undefined;
  illustration_id: UUID | undefined;
  image_uris: ScryfallImageUris | undefined;
  layout: string | undefined;
  loyalty: string | undefined;
  mana_cost: string;
  name: string;
  object: string;
  oracle_id: UUID | undefined;
  oracle_text: string | undefined;
  power: string | undefined;
  printed_name: string | undefined;
  printed_text: string | undefined;
  printed_type_line: string | undefined;
  toughness: string | undefined;
  type_line: string | undefined;
  watermark: string | undefined;
};

export type ScryfallImageUris = {
  small: URI | undefined;
  normal: URI | undefined;
  large: URI | undefined;
  png: URI | undefined;
  art_crop: URI | undefined;
  border_crop: URI | undefined;
};

export type UUID = string;
export type URI = string;
export type Colors = Color[];
export type Color = 'W' | 'U' | 'B' | 'R' | 'G';
