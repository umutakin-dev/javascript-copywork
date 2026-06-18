// Phase 3 · 01 — Array destructuring: skips and a rest element
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

const nums = [10, 20, 30, 40, 50];

const [first, second] = nums;
console.log(first, second); // 10 20

// Skip positions with empty commas:
const [, , third] = nums;
console.log(third); // 30

// Collect "the rest" into a new array (must be the LAST element):
const [head, ...tail] = nums;
console.log(head); // 10
console.log(tail); // [20, 30, 40, 50]

// Defaults fill in when a slot is undefined:
const [a, b, c = 99] = [1, 2];
console.log(a, b, c); // 1 2 99
