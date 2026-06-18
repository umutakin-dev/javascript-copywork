// Phase 2 · 10 — makeCounter: state that lives in a closure  :reimplement:
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures

function makeCounter(start = 0) {
  let count = start; // private — only the returned functions can see it
  return {
    increment: () => ++count,
    decrement: () => --count,
    value: () => count,
  };
}

const c = makeCounter(10);
c.increment();
c.increment();
c.decrement();
console.log(c.value()); // 11
console.assert(c.value() === 11, "closure kept count across calls");

// Each call to makeCounter creates a FRESH, independent `count`:
const other = makeCounter();
other.increment();
console.log(other.value(), c.value()); // 1 11 — separate, non-shared states
