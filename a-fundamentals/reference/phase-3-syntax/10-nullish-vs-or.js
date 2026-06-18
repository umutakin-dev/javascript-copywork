// Phase 3 · 10 — ?? (nullish) vs || (falsy): the difference that bites
// || falls back on ANY falsy value; ?? falls back ONLY on null / undefined.
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing

// The classic bug: a legitimate 0 or "" gets wrongly replaced by ||.
const count = 0;
console.log(count || 10); // 10  — WRONG if 0 is a valid count
console.log(count ?? 10); // 0   — correct: 0 is not null/undefined

const label = "";
console.log(label || "default"); // "default" — || treats "" as missing
console.log(label ?? "default"); // ""        — ?? keeps the empty string

// ?? only triggers for null / undefined:
console.log(null ?? "x"); // "x"
console.log(undefined ?? "x"); // "x"
console.log(false ?? "x"); // false — false is NOT nullish
