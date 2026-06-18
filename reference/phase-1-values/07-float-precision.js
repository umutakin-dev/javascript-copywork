// Phase 1 · 07 — Floats are binary (IEEE 754), so decimals are approximate
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number

console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false

// 0.1 and 0.2 have no exact binary representation, just as 1/3 has no exact
// decimal one. The tiny rounding error survives the addition.

// The standard fix: compare within a small tolerance (epsilon), never with ===.
const close = Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON;
console.log(close); // true
console.assert(close, "compare floats with a tolerance, not ===");
