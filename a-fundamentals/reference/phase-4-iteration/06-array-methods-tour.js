// Phase 4 · 06 — The core array methods, used
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

const nums = [1, 2, 3, 4, 5, 6];

console.log(nums.map((n) => n * n)); // [1,4,9,16,25,36]
console.log(nums.filter((n) => n % 2 === 0)); // [2,4,6]
console.log(nums.reduce((sum, n) => sum + n, 0)); // 21

// forEach is for SIDE EFFECTS and returns undefined (build a string to show it):
let acc = "";
nums.forEach((n) => {
  acc += n + " ";
});
console.log(acc.trim()); // "1 2 3 4 5 6"

console.log(nums.find((n) => n > 3)); // 4   (first match, the value)
console.log(nums.findIndex((n) => n === 4)); // 3   (its index)
console.log(nums.some((n) => n > 5)); // true (at least one)
console.log(nums.every((n) => n > 0)); // true (all)
