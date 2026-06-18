// Phase 4 · 01 — The iterator protocol by hand  :reimplement:
// An object is "iterable" if it has a [Symbol.iterator]() method that returns an
// iterator: an object with next() -> { value, done }. for...of uses exactly this.
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols

function range(start, end, step = 1) {
  return {
    [Symbol.iterator]() {
      let current = start;
      return {
        next() {
          if (current < end) {
            const value = current;
            current += step;
            return { value, done: false };
          }
          return { value: undefined, done: true };
        },
      };
    },
  };
}

for (const n of range(0, 5)) console.log(n); // 0 1 2 3 4

// Because it's iterable, every iterable consumer works for free:
console.log([...range(0, 5)]); // [0,1,2,3,4]
console.log(Math.max(...range(1, 4))); // 3
const [a, b] = range(10, 20, 5);
console.log(a, b); // 10 15
