// Phase 4 · 02 — The same range as a generator (function*)
// A generator AUTOMATICALLY implements the iterator protocol — far less code.
// `yield` pauses the function, emits a value, and resumes on the next next().
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*

function* range(start, end, step = 1) {
  for (let current = start; current < end; current += step) {
    yield current;
  }
}

for (const n of range(0, 5)) console.log(n); // 0 1 2 3 4
console.log([...range(0, 10, 2)]); // [0,2,4,6,8]

// A generator object is BOTH iterator and iterable; drive it by hand to see it:
const g = range(0, 2);
console.log(g.next()); // { value: 0, done: false }
console.log(g.next()); // { value: 1, done: false }
console.log(g.next()); // { value: undefined, done: true }
