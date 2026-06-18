// Phase 7 · 02 — A Proxy that gives arrays Python-style negative indexing
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/get

function negativeIndexable(array) {
  return new Proxy(array, {
    get(target, prop, receiver) {
      // Only translate integer-like string keys that are negative.
      if (typeof prop === "string") {
        const index = Number(prop);
        if (Number.isInteger(index) && index < 0) {
          prop = String(target.length + index); // -1 -> length-1
        }
      }
      return Reflect.get(target, prop, receiver);
    },
  });
}

const arr = negativeIndexable(["a", "b", "c", "d"]);
console.log(arr[0]); // "a"
console.log(arr[-1]); // "d"  (the magic)
console.log(arr[-2]); // "c"
console.log(arr.length); // 4   — normal properties still pass through
console.log(arr.map((x) => x.toUpperCase())); // ["A","B","C","D"]
