// Phase 1 · 01 — typeof every kind of value
// Memorize the one historical wart: typeof null === "object" (a 1995 bug that
// can never be fixed without breaking the web).
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof

console.log(typeof 42); // "number"
console.log(typeof "hi"); // "string"
console.log(typeof true); // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof function () {}); // "function" (the only non-"object" callable)
console.log(typeof {}); // "object"
console.log(typeof null); // "object"  <-- the famous bug
console.log(typeof Symbol()); // "symbol"
console.log(typeof 10n); // "bigint"

// The reliable null check is a strict comparison, NOT typeof:
console.assert(null === null, "use === null to detect null");
