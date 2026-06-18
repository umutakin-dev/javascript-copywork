// Phase 4 · 11 — sort: comparators and the default-sort gotcha
// Array.prototype.sort sorts IN PLACE and, by default, compares items as STRINGS.
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

// The trap: default sort is lexicographic, so numbers come out wrong:
console.log([10, 1, 21, 2].sort()); // [1, 10, 2, 21]  — "10" < "2" as strings

// Fix: a comparator. Negative => a first, positive => b first, 0 => keep order.
console.log([10, 1, 21, 2].sort((a, b) => a - b)); // [1, 2, 10, 21] ascending
console.log([10, 1, 21, 2].sort((a, b) => b - a)); // [21, 10, 2, 1] descending

// Sort objects by a field, with a tie-breaker:
const people = [
  { name: "Carol", age: 30 },
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
];
people.sort((a, b) => a.age - b.age || a.name.localeCompare(b.name));
console.log(people.map((p) => `${p.name}:${p.age}`)); // ["Alice:25","Bob:30","Carol:30"]

// sort MUTATES — the original array is reordered too:
const orig = [3, 1, 2];
const sorted = orig.sort((a, b) => a - b);
console.log(orig === sorted); // true — same array (use toSorted to avoid this)
