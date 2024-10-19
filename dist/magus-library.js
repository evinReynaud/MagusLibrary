function parseMTGCardString(n) {
    const e = /^(?:([0-9]+)\s+)?(.*?)((?:\s-[a-zA-Z]+(?:=\S*)?)*)?$/;
    const s = n.match(e);
    if (s == null) return undefined;
    const a = parseInt(s[1]);
    const c = isNaN(a) ? 1 : a;
    const r = t(s[3]);
    const o = r.get("l");
    r.delete("l");
    return {
        name: s[2],
        quantity: c,
        language: o,
        customFlags: r
    };
}
function t(t) {
    const n = new Map();
    if (!t) return n;
    const e = /\s-([a-zA-Z]+)(?:=(\S*))?/g;
    const s = [
        ...t.matchAll(e)
    ];
    s.forEach((t)=>n.set(t[1], t[2] || 'true'));
    return n;
}
const e = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const n = /^[a-zA-Z0-9]{3,5}\/[^/]+(?:\/(?:[a-zA-Z]{2,3})?)?$/;
const t1 = [
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
    'zht'
];
const a = 'https://api.scryfall.com';
async function r(e) {
    return new Promise((n)=>{
        setTimeout(n, e);
    });
}
async function getCard(s) {
    let r;
    if (e.test(s.name)) r = `${a}/cards/${s.name}`;
    else if (n.test(s.name)) {
        let e = s.name;
        if (s.language != null && t1.includes(s.language)) e = s.name.split('/').slice(0, 2).join('/') + `/${s.language}`;
        r = `${a}/cards/${e}`;
    } else r = `${a}/cards/named/?fuzzy=${encodeURIComponent(s.name)}`;
    const o = fetch(r);
    const u = await o;
    if (u.ok) return await u.json();
    else return Promise.resolve(undefined);
}
async function o(e, n = false, t = true) {
    const a = n ? `${e.prints_search_uri}&include_multilingual=true` : e.prints_search_uri;
    const s = await fetch(a);
    if (s.ok) return await s.json().then((e)=>e.data).then((e)=>t ? e.filter((e)=>e.games.includes('paper')) : e);
    else return Promise.resolve(undefined);
}
async function getCardsBatch(e) {
    return await Promise.all(e.map((e, n)=>r(n * 100).then(()=>getCard(e))));
}
async function getCardsAndDo(e, n) {
    const t = [];
    e.forEach((e, a)=>{
        const o = r(a * 100).then(()=>getCard({
                name: e.name,
                quantity: e.quantity,
                language: e.language,
                customFlags: e.customFlags
            }).then((t)=>n(e, t)));
        t.push(o);
    });
    return Promise.all(t).then();
}
async function getCardPrintsAndDo(e, n, t = false, a = true) {
    const u = [];
    e.forEach((e, i)=>{
        const c = r(i * 100).then(()=>getCard({
                name: e.name,
                quantity: e.quantity,
                language: e.language,
                customFlags: e.customFlags
            })).then((e)=>e !== undefined ? o(e, t, a) : Promise.resolve(undefined)).then((t)=>n(e, t));
        u.push(c);
    });
    return Promise.all(u).then();
}
