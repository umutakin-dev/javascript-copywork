// Phase 4 · 12 — Non-mutating array methods (ES2023)
// toSorted / toReversed / with / toSpliced return a NEW array and leave the
// original untouched — safer than the in-place sort/reverse/splice.
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted

const nums = [3, 1, 2];

console.log(nums.toSorted((a, b) => a - b)); // [1,2,3]  (a new array)
console.log(nums); // [3,1,2]  — ORIGINAL unchanged

console.log(nums.toReversed()); // [2,1,3]
console.log([10, 20, 30].with(1, 99)); // [10,99,30] — copy with index 1 replaced
console.log([1, 2, 3, 4].toSpliced(1, 2, "x")); // [1,"x",4] — copy of a splice

// Contrast the MUTATING original (this reorders `m` itself):
const m = [3, 1, 2];
m.sort((a, b) => a - b);
console.log(m); // [1,2,3]
