// Phase 4 · 13 — at(), findLast(), findLastIndex()
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at

const arr = [10, 20, 30, 40];

// at() accepts NEGATIVE indexes — cleaner than arr[arr.length - 1]:
console.log(arr.at(-1)); // 40 (last)
console.log(arr.at(-2)); // 30
console.log(arr.at(0)); // 10
console.log("end".at(-1)); // "d" — strings have at() too

// Search from the END of the array:
const nums = [1, 2, 3, 4, 5, 6];
console.log(nums.findLast((n) => n % 2 === 0)); // 6 (last even value)
console.log(nums.findLastIndex((n) => n % 2 === 0)); // 5 (its index)
