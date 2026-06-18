// Phase 3 · 06 — Spread to clone and merge arrays/objects (shallow)
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax

const a = [1, 2];
const b = [3, 4];

console.log([...a, ...b]); // [1,2,3,4] — concatenate
const arrCopy = [...a]; // shallow clone
console.log(arrCopy, arrCopy === a); // [1,2] false  (a brand-new array)

const base = { theme: "dark", size: "md" };
const override = { size: "lg" };

// Later keys WIN — the idiomatic "defaults then overrides" merge:
const merged = { ...base, ...override };
console.log(merged); // { theme: "dark", size: "lg" }

// Shallow caveat: nested objects are SHARED, not deep-copied.
const orig = { nested: { n: 1 } };
const clone = { ...orig };
clone.nested.n = 99;
console.log(orig.nested.n); // 99 — both point at the same inner object
