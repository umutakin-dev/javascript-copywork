// Phase 3 · 08 — Spread an iterable into a function's arguments
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax

const nums = [5, 1, 9, 3];

// Math.max takes separate arguments, not an array — spread bridges the gap:
console.log(Math.max(...nums)); // 9
console.log(Math.min(...nums)); // 1

// Spread works on ANY iterable, not just arrays:
console.log(Math.max(...new Set([4, 4, 7, 2]))); // 7
console.log([..."abc"]); // ["a","b","c"] — strings are iterable too

// Pre-ES6 you had to write Math.max.apply(null, nums); spread replaced that.
console.assert(Math.max(...nums) === 9, "spread fed the array as arguments");
