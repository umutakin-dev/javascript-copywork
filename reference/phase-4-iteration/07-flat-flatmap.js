// Phase 4 · 07 — flat and flatMap
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat

const nested = [1, [2, 3], [4, [5, 6]]];

console.log(nested.flat()); // [1,2,3,4,[5,6]]  — one level by default
console.log(nested.flat(2)); // [1,2,3,4,5,6]    — depth 2
console.log([1, [2, [3, [4]]]].flat(Infinity)); // [1,2,3,4] — fully flat

// flatMap = map then flat(1) — handy for "expand each item into 0..n items":
const phrases = ["hello world", "foo bar"];
console.log(phrases.flatMap((s) => s.split(" "))); // ["hello","world","foo","bar"]

// Return [] to DROP an item — a filter+map in a single pass:
const data = [1, 2, 3, 4];
console.log(data.flatMap((n) => (n % 2 ? [n * 10] : []))); // [10, 30]
