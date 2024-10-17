import {ParsedCard} from '../types';

/*
 * Parses a string to extract requested card data
 * Format:
 *   [number] <name/code> [-l=<language>] [<custom flags>]
 *
 * Custom flags format is a single dash followed by letters, except the lone letter `l` (reserved).
 * It can be followed directly by an equals sign and any string following will be returned, ended by any whitespace character.
 * If a same flag is defined multiple times, the latest overwrites the previous instances.
 * Examples: -flag -string=data
 */
export function parseMTGCardString(input: string): ParsedCard | undefined {

    const regexp = /^(?:([0-9]+)\s+)?(.*?)((?:\s-[a-zA-Z]+(?:=\S*)?)*)?$/;
    const match = input.match(regexp);

    if (match == null) {
        return undefined;
    }

    const parsedQuantity = parseInt(match[1]);

    const quantity = isNaN(parsedQuantity) ? 1 : parsedQuantity;

    const flags = parseFlags(match[3]);

    const language = flags.get("l");
    flags.delete("l");

    return {
        name: match[2],
        quantity: quantity,
        language: language,
        customFlags: flags
    };
}

function parseFlags(flags: string | undefined): Map<string, string> {
    const flagsMap: Map<string, string> = new Map();
    if (!flags) {
        return flagsMap;
    }
    const regexp = /\s-([a-zA-Z]+)(?:=(\S*))?/g;
    const matchAll = [...flags.matchAll(regexp)];

    matchAll.forEach(match => flagsMap.set(match[1], match[2] || 'true'));

    return flagsMap;
}
