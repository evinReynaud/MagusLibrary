function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
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
class Delayer {
    execute(e) {
        let t;
        const s = new Promise((e)=>t = e).then(()=>e());
        this.promiseResolveQueue.push({
            resolveFunc: t,
            promise: s
        });
        this.startQueueExecution();
        return s;
    }
    startQueueExecution() {
        if (this.alreadyExecuting) return;
        this.alreadyExecuting = true;
        this.executeNextInQueue();
    }
    executeNextInQueue() {
        if (this.promiseResolveQueue.length > 0) {
            const e = this.promiseResolveQueue.shift();
            if (e === undefined) throw new Error('no element in promise queue');
            e.promise.then(()=>this.wait(this.delayMs)).then(()=>this.executeNextInQueue());
            e.resolveFunc(null);
        } else this.alreadyExecuting = false;
    }
    wait(e) {
        return new Promise((t)=>setTimeout(t, e));
    }
    constructor(e){
        _define_property(this, "promiseResolveQueue", []);
        _define_property(this, "alreadyExecuting", false);
        _define_property(this, "delayMs", void 0);
        this.delayMs = e;
    }
}
class ScryfallService {
    getCard(e) {
        let t;
        if (this.uuidRegexp.test(e.name)) t = `${this.SCRYFALL_API_URI}/cards/${e.name}`;
        else if (this.codeNumberRegexp.test(e.name)) {
            let a = e.name;
            if (e.language != null && this.validLanguages.includes(e.language)) a = e.name.split('/').slice(0, 2).join('/') + `/${e.language}`;
            t = `${this.SCRYFALL_API_URI}/cards/${a}`;
        } else t = `${this.SCRYFALL_API_URI}/cards/named/?fuzzy=${encodeURIComponent(e.name)}`;
        return this._callApi(t);
    }
    getCardPrintsFromCard(e, t = false, a = true) {
        const r = t ? `${e.prints_search_uri}&include_multilingual=true` : e.prints_search_uri;
        return this._getListFromApi(r, (e)=>a ? e.filter((e)=>e.games.includes('paper')) : e);
    }
    getCardsBatch(e) {
        return Promise.all(e.map((e)=>this.getCard(e)));
    }
    getCardsAndDo(e, t) {
        const a = [];
        e.forEach((e)=>{
            const r = this.getCard({
                name: e.name,
                quantity: e.quantity,
                language: e.language,
                customFlags: e.customFlags
            }).then((a)=>t(e, a));
            a.push(r);
        });
        return Promise.all(a).then();
    }
    getCardPrintsAndDo(e, t, a = false, r = true) {
        const n = [];
        e.forEach((e)=>{
            const s = this.getCard({
                name: e.name,
                quantity: e.quantity,
                language: e.language,
                customFlags: e.customFlags
            }).then((e)=>e !== undefined ? this.getCardPrintsFromCard(e, a, r) : Promise.resolve(undefined)).then((a)=>t(e, a));
            n.push(s);
        });
        return Promise.all(n).then();
    }
    _getListFromApi(e, t) {
        return this._callApi(e, (e)=>{
            const a = e.data;
            if (e.has_more && e.next_page !== undefined) return this._getListFromApi(e.next_page, (t)=>[
                    ...e.data,
                    ...t
                ]).then((e)=>{
                if (e !== undefined) return t(e);
                else return undefined;
            });
            else return t(a);
        });
    }
    async _callApi(e, t = (e)=>e) {
        const a = await this.delayer.execute(()=>fetch(e));
        if (a.ok) return a.json().then(t);
        else return Promise.resolve(undefined);
    }
    constructor(){
        _define_property(this, "SCRYFALL_API_URI", 'https://api.scryfall.com');
        _define_property(this, "API_DELAY_MS", 100);
        _define_property(this, "delayer", new Delayer(this.API_DELAY_MS));
        _define_property(this, "uuidRegexp", /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
        _define_property(this, "codeNumberRegexp", /^[a-zA-Z0-9]{3,5}\/[^/]+(?:\/(?:[a-zA-Z]{2,3})?)?$/);
        _define_property(this, "validLanguages", [
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
        ]);
    }
}
