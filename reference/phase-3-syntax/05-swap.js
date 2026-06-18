// Phase 3 · 05 — Swap variables with destructuring (no temp variable)
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

let a = 1;
let b = 2;

[a, b] = [b, a]; // the right side builds [2, 1], then unpacks into a, b
console.log(a, b); // 2 1

// Rotating three works the same way:
let x = "x";
let y = "y";
let z = "z";
[x, y, z] = [z, x, y];
console.log(x, y, z); // z x y
console.assert(a === 2 && b === 1, "swapped without a temporary");
