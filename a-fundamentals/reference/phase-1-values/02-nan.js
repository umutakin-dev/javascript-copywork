// Phase 1 · 02 — NaN is the only value not equal to itself
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN

const nan = 0 / 0; // NaN

console.log(nan === nan); // false — IEEE 754 says NaN != NaN
console.assert(nan !== nan, "NaN is never === to itself");

// Two correct ways to detect it:
console.log(Number.isNaN(nan)); // true — strict, no coercion
console.log(Object.is(nan, NaN)); // true — Object.is treats NaN as equal to NaN

// Avoid the GLOBAL isNaN(): it coerces its argument first, so it lies about
// values that merely fail to become a number.
console.log(isNaN("hello")); // true  (because Number("hello") is NaN)
console.log(Number.isNaN("hello")); // false (correct: a string is not NaN)
