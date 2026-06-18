// Phase 4 · 14 — Map: keys of ANY type, including objects
// A plain object only allows string/symbol keys (and stringifies anything else).
// A Map keeps keys by identity and preserves insertion order.
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

const alice = { id: 1 };
const bob = { id: 2 };

const lastSeen = new Map();
lastSeen.set(alice, "2026-06-01");
lastSeen.set(bob, "2026-06-15");

console.log(lastSeen.get(alice)); // "2026-06-01" — keyed by the actual object
console.log(lastSeen.size); // 2
console.log(lastSeen.has(bob)); // true

// A plain object would stringify BOTH keys to "[object Object]" — a collision:
const broken = {};
broken[alice] = "x";
broken[bob] = "y";
console.log(Object.keys(broken)); // ["[object Object]"] — bob overwrote alice

// Map is iterable in insertion order, yielding [key, value] pairs:
for (const [user, date] of lastSeen) console.log(user.id, date); // 1 ..., 2 ...
