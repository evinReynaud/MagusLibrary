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
const a = [
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
const t1 = 'https://api.scryfall.com';
async function o(e) {
    return new Promise((n)=>{
        setTimeout(n, e);
    });
}
async function getCard(s) {
    let o;
    if (e.test(s.name)) o = `https://api.scryfall.com/cards/${s.name}`;
    else if (n.test(s.name)) {
        let e = s.name;
        if (s.language != undefined && a.includes(s.language)) e = s.name.split('/').slice(0, 2).join('/') + `/${s.language}`;
        o = `${t1}/cards/${e}`;
    } else o = `${t1}/cards/named/?fuzzy=${encodeURIComponent(s.name)}`;
    const c = fetch(o);
    const r = await c;
    if (r.ok) return await r.json();
    else return undefined;
}
async function getCardsBatch(e) {
    return await Promise.all(e.map((e, n)=>o(n * 100).then(()=>getCard(e))));
}
async function getCardsAndDo(e, n) {
    const a = [];
    e.forEach((e, t)=>{
        const c = o(t * 100).then(()=>getCard({
                name: e.name,
                quantity: e.quantity,
                language: e.language,
                customFlags: e.customFlags
            }).then((a)=>n(e, a)));
        a.push(c);
    });
    return Promise.all(a).then();
}
