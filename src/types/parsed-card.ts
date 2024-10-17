export type ParsedCard = {
  readonly name: string
  readonly quantity: number
  readonly language: string | undefined
  readonly customFlags: ReadonlyMap<string, string> // Found flags are mapped to their data, or 'true' for dataless flags
};
