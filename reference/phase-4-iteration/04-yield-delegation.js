// Phase 4 · 04 — yield* delegates to another iterable
// `yield* other` yields every value from `other` inline — great for composing
// generators or flattening recursively.
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield*

function* letters() {
  yield "a";
  yield "b";
}

function* both() {
  yield* letters(); // delegate: emit a, b
  yield* [1, 2, 3]; // works on ANY iterable, including arrays
  yield "done";
}

console.log([...both()]); // ["a","b",1,2,3,"done"]

// Recursive flatten reads naturally with yield*:
function* flatten(arr) {
  for (const item of arr) {
    if (Array.isArray(item)) yield* flatten(item);
    else yield item;
  }
}
console.log([...flatten([1, [2, [3, [4]]], 5])]); // [1,2,3,4,5]
