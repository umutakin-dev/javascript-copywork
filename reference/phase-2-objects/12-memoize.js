// Phase 2 · 12 — memoize(fn): cache results by argument key  :reimplement:
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures

function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args); // simple key — fine for primitive args
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

let calls = 0;
const square = memoize((n) => {
  calls += 1;
  return n * n;
});

console.log(square(9)); // 81 (computed)
console.log(square(9)); // 81 (served from cache)
console.log(square(4)); // 16 (computed)
console.log("actual computations:", calls); // 2
console.assert(calls === 2, "memoize skipped the repeated call");
