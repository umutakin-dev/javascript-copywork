// Phase 4 · 10 — Reimplement find / some / every  :reimplement:
// Watch the short-circuits: some stops at the first true, every at the first
// false. find returns the VALUE (findIndex would return the position).
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find

function myFind(arr, predicate) {
  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i], i, arr)) return arr[i]; // stop at first match
  }
  return undefined;
}

function mySome(arr, predicate) {
  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i], i, arr)) return true; // short-circuit on first true
  }
  return false;
}

function myEvery(arr, predicate) {
  for (let i = 0; i < arr.length; i++) {
    if (!predicate(arr[i], i, arr)) return false; // short-circuit on first false
  }
  return true; // vacuously true for an empty array
}

const nums = [1, 2, 3, 4];
console.log(myFind(nums, (n) => n > 2)); // 3
console.log(mySome(nums, (n) => n > 3)); // true
console.log(myEvery(nums, (n) => n > 0)); // true
console.log(myEvery([], () => false)); // true (empty -> vacuously true)
