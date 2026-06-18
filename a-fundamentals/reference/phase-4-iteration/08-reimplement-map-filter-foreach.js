// Phase 4 · 08 — Reimplement map / filter / forEach  :reimplement:
// Note the callback signature every one of these shares: (value, index, array).
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map

function myMap(arr, fn) {
  const out = [];
  for (let i = 0; i < arr.length; i++) {
    out.push(fn(arr[i], i, arr));
  }
  return out;
}

function myFilter(arr, predicate) {
  const out = [];
  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i], i, arr)) out.push(arr[i]);
  }
  return out;
}

function myForEach(arr, fn) {
  for (let i = 0; i < arr.length; i++) fn(arr[i], i, arr);
  // returns undefined, exactly like the real forEach
}

const nums = [1, 2, 3, 4];
console.log(myMap(nums, (n) => n * 2)); // [2,4,6,8]
console.log(myFilter(nums, (n) => n % 2 === 0)); // [2,4]
let sum = 0;
myForEach(nums, (n) => (sum += n));
console.log(sum); // 10

console.assert(
  JSON.stringify(myMap(nums, (n) => n * 2)) === JSON.stringify(nums.map((n) => n * 2)),
  "myMap matches Array.prototype.map",
);
