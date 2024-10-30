import test from 'ava';

import { ScryfallService } from './scryfall.service';

export const testScryfallService = new ScryfallService();

test('empty test', (t) => {
  t.pass();
})
