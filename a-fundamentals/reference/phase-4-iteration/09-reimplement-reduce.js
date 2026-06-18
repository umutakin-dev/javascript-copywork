// Phase 4 · 09 — Reimplement reduce (the subtle one: the initial value)  :reimplement:
// With an initial value: start there and fold in every element.
// Without one: the FIRST element is the seed and folding starts at index 1.
// Empty array + no initial value -> TypeError (matches the real reduce).
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce

function myReduce(arr, reducer, ...initial) {
  let acc;
  let startIndex;
  if (initial.length > 0) {
    // The rest-arg distinguishes "no initial value" from "initial value === undefined".
    acc = initial[0];
    startIndex = 0;
  } else {
    if (arr.length === 0) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
    acc = arr[0];
    startIndex = 1;
  }
  for (let i = startIndex; i < arr.length; i++) {
    acc = reducer(acc, arr[i], i, arr);
  }
  return acc;
}

const nums = [1, 2, 3, 4];
console.log(myReduce(nums, (a, b) => a + b, 0)); // 10 (with seed)
console.log(myReduce(nums, (a, b) => a + b)); // 10 (first element is the seed)
console.log(myReduce(nums, (a, b) => Math.max(a, b))); // 4
console.log(myReduce([], (a, b) => a + b, 100)); // 100 (empty + seed is fine)
