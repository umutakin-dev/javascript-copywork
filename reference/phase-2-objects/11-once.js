// Phase 2 · 11 — once(fn): run at most once, cache the result  :reimplement:
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures

function once(fn) {
  let called = false;
  let result;
  return function (...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args); // forward `this` and all args
    }
    return result;
  };
}

let runs = 0;
const init = once(() => {
  runs += 1;
  return "initialized";
});

console.log(init()); // "initialized" (runs the inner fn)
console.log(init()); // "initialized" (cached — does NOT run again)
console.log("times actually run:", runs); // 1
console.assert(runs === 1, "once() ran the inner fn a single time");
