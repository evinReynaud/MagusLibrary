function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
function parseFlags(r) {
    var a = new Map();
    if (!r) return a;
    var t = /\s-([a-zA-Z]+)(?:=(\S*))?/g;
    var e = _to_consumable_array(r.matchAll(t));
    e.forEach(function(r) {
        return a.set(r[1], r[2] || 'true');
    });
    return a;
}
function parseString(a) {
    var e = /^(?:([0-9]+)\s+)?(.*?)((?:\s-[a-zA-Z]+(?:=\S*)?)*)?$/;
    var t = a.match(e);
    if (t == null) return undefined;
    var n = parseInt(t[1]);
    var s = isNaN(n) ? 1 : n;
    var u = parseFlags(t[3]);
    var i = u.get("l");
    u.delete("l");
    return {
        name: t[2],
        quantity: s,
        language: i,
        customFlags: u
    };
}
