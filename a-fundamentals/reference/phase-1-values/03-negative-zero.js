// Phase 1 · 03 — Negative zero is a real, distinct value
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is

console.log(-0 === 0); // true  — === cannot tell them apart
console.log(Object.is(-0, 0)); // false — Object.is can

// The practical way to detect -0: divide and check the sign of the Infinity.
console.log(1 / 0); // Infinity
console.log(1 / -0); // -Infinity
console.assert(1 / -0 === -Infinity, "-0 reveals itself through division");
