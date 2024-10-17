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
const a = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const e = /^[a-zA-Z0-9]{3,5}\/[^/]+(?:\/(?:[a-zA-Z]{2,3})?)?$/;
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
function s(a) {
    return new Promise((e)=>{
        setTimeout(e, a);
    });
}
async function getCard(n) {
    let s;
    if (a.test(n.name)) s = `https://api.scryfall.com/cards/${n.name}`;
    else if (e.test(n.name)) {
        let a = n.name;
        if (n.language != undefined && t1.includes(n.language)) a = n.name.split('/').slice(0, 2).join('/') + `/${n.language}`;
        s = `https://api.scryfall.com/cards/${a}`;
    } else s = `https://api.scryfall.com/cards/named/?fuzzy=${encodeURIComponent(n.name)}`;
    const c = fetch(s);
    const o = await c;
    return await o.json();
}
async function getCardsBatch(a) {
    return await Promise.all(a.map((a, e)=>s(e * 100).then(()=>getCard(a)))).then((a)=>a.flat());
}
