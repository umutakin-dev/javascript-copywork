// Phase 1 · 16 — Symbols are unique, hidden-ish object keys
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol

const id = Symbol("id"); // "id" is just a description, NOT an identity
console.log(Symbol("id") === Symbol("id")); // false — every Symbol is unique

const user = { name: "Umut", [id]: 42 };

// Symbol keys are SKIPPED by the usual enumeration paths:
console.log(Object.keys(user)); // ["name"]
for (const k in user) console.log("for...in:", k); // "name" only
console.log(JSON.stringify(user)); // {"name":"Umut"} — symbol key dropped

// They are reachable only through the symbol itself, or a dedicated method:
console.log(user[id]); // 42
console.log(Object.getOwnPropertySymbols(user)); // [ Symbol(id) ]
