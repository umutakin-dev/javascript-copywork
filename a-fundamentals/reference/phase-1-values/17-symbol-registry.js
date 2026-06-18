// Phase 1 · 17 — Symbol.for / Symbol.keyFor: the GLOBAL symbol registry
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/for

// Symbol() always makes a fresh, unique symbol.
// Symbol.for(key) returns the SAME symbol for the same key, process-wide —
// a shared registry keyed by string.
const a = Symbol.for("app.token");
const b = Symbol.for("app.token");
console.log(a === b); // true — same registered symbol

// Contrast with plain Symbol(), which is never shared:
console.log(Symbol("app.token") === Symbol("app.token")); // false

// keyFor() recovers the registry key — but only for REGISTERED symbols:
console.log(Symbol.keyFor(a)); // "app.token"
console.log(Symbol.keyFor(Symbol("x"))); // undefined — not in the registry
