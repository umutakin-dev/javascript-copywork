// Phase 4 · 15 — Set: dedup, plus intersection / union / difference by hand
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set

// Dedup an array in one line — Set keeps unique values, then spread it back:
console.log([...new Set([1, 1, 2, 3, 3, 3])]); // [1,2,3]

const a = new Set([1, 2, 3, 4]);
const b = new Set([3, 4, 5, 6]);

// Intersection: a's items that are also in b.
const intersection = new Set([...a].filter((x) => b.has(x)));
console.log([...intersection]); // [3,4]

// Union: everything from both (dups removed automatically).
const union = new Set([...a, ...b]);
console.log([...union]); // [1,2,3,4,5,6]

// Difference: in a but not b.
const difference = new Set([...a].filter((x) => !b.has(x)));
console.log([...difference]); // [1,2]

// (Modern engines also ship native a.intersection(b) / a.union(b) / a.difference(b),
//  ES2024/2025. Doing it by hand here shows exactly what they compute.)
