import test from 'ava';

import {ParsedCard} from "../types";

import {parseMTGCardString} from './parser';

test('parse', (t) => {
    const testCases: Map<string, ParsedCard> = new Map();
    testCases.set("1 Black Lotus", {
        name: "Black Lotus",
        quantity: 1,
        language: undefined,
        customFlags: new Map()
    });
    testCases.set("turn // burn", {
        name: "turn // burn",
        quantity: 1,
        language: undefined,
        customFlags: new Map()
    });
    testCases.set("+2 mace", {
        name: "+2 mace",
        quantity: 1,
        language: undefined,
        customFlags: new Map()
    });
    testCases.set("2 +2 mace", {
        name: "+2 mace",
        quantity: 2,
        language: undefined,
        customFlags: new Map()
    });
    const testMap1: Map<string, string> = new Map()
    testMap1.set('test', 'true');
    testMap1.set('flag', 'value');
    testCases.set("999999999 ヴィトゥ＝ガジーの目覚め -l=en -test -flag=value", {
        name: "ヴィトゥ＝ガジーの目覚め",
        quantity: 999999999,
        language: "en",
        customFlags: testMap1
    });
    const testMap2: Map<string, string> = new Map()
    testMap2.set('sword', '12');
    testCases.set("4 Burn Together // Callous Sell-Sword -sword=12", {
        name: "Burn Together // Callous Sell-Sword",
        quantity: 4,
        language: undefined,
        customFlags: testMap2
    });
    testCases.set("Vault 13: Dweller's Journey", {
        name: "Vault 13: Dweller's Journey",
        quantity: 1,
        language: undefined,
        customFlags: new Map()
    });
    testCases.set("20 leb/233", {
        name: "leb/233",
        quantity: 20,
        language: undefined,
        customFlags: new Map()
    });

    testCases.forEach((expected, input) => {
        t.deepEqual(parseMTGCardString(input), expected)
    });
});
