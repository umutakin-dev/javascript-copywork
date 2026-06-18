// Phase 3 · 07 — Rest parameters: a variadic function
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters

function sum(...nums) {
  // `nums` is a REAL array (unlike the old `arguments`), so array methods work.
  return nums.reduce((total, n) => total + n, 0);
}

console.log(sum(1, 2, 3)); // 6
console.log(sum()); // 0
console.log(sum(10, 20, 30, 40)); // 100

// Named params may come before the rest; the rest must be LAST.
function tag(first, ...others) {
  return { first, others };
}
console.log(tag("a", "b", "c")); // { first: "a", others: ["b","c"] }
console.assert(sum(1, 2, 3) === 6, "rest params collected into an array");
