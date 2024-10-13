export function parseFlags(flags: string | undefined): Map<string, string> {
    const flagsMap: Map<string, string> = new Map();
    if (!flags) {
        return flagsMap;
    }
    const regexp = /\s-([a-zA-Z]+)(?:=(\S*))?/g;
    const matchAll = [...flags.matchAll(regexp)];

    matchAll.forEach(match => flagsMap.set(match[1], match[2] || 'true'));

    return flagsMap;
}
