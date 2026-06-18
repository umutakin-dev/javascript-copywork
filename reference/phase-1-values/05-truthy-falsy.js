// Phase 1 · 05 — The falsy values (everything else is truthy)
// There are exactly these, and no more — memorize the list:
//   false, 0, -0, 0n, "", null, undefined, NaN
//
// Ref: https://developer.mozilla.org/en-US/docs/Glossary/Falsy

// Labelled so the empty string and the two zeros are still readable in output.
const falsy = [
  ["false", false],
  ["0", 0],
  ["-0", -0],
  ["0n", 0n],
  ['""', ""],
  ["null", null],
  ["undefined", undefined],
  ["NaN", NaN],
];

for (const [label, value] of falsy) {
  console.log(label.padEnd(10), "->", Boolean(value)); // all false
}

console.log("---");

// Common truthy SURPRISES — these are objects or non-empty strings, so truthy:
console.log(Boolean([])); // true  — an empty array is still an object
console.log(Boolean({})); // true  — an empty object too
console.log(Boolean("0")); // true  — a non-empty string, despite "looking" false
console.log(Boolean("false")); // true  — same: a non-empty string
