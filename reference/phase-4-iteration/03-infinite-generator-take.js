// Phase 4 · 03 — An infinite generator + take(n)
// Generators are LAZY — values are computed on demand, so "infinite" is fine as
// long as you only pull a finite number out.
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator

function* naturals() {
  let n = 0;
  while (true) yield n++; // never ends on its own
}

function* take(iterable, count) {
  let i = 0;
  for (const value of iterable) {
    if (i++ >= count) return;
    yield value;
  }
}

console.log([...take(naturals(), 5)]); // [0,1,2,3,4]

// Compose lazy generators: the first 5 even numbers, computed on demand.
function* map(iterable, fn) {
  for (const v of iterable) yield fn(v);
}
console.log([...take(map(naturals(), (n) => n * 2), 5)]); // [0,2,4,6,8]
