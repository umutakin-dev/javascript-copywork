// Phase 5 · 08 — Promise.withResolvers(): a "deferred" (ES2024 — verify support)
// Returns { promise, resolve, reject } so you can settle the promise from
// OUTSIDE its executor — handy when an event/timer elsewhere decides the outcome.
//
// Support: ES2024. Node 22+, Bun 1.x, Deno 1.x, current browsers.
// Older targets: https://caniuse.com/?search=withResolvers
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/withResolvers

const { promise, resolve } = Promise.withResolvers();

// Settle it from elsewhere — e.g. an event handler or a timer:
setTimeout(() => resolve("settled from outside"), 30);

console.log("waiting...");
console.log(await promise); // "settled from outside"

// The old way leaked resolve/reject out of the executor by hand:
function makeDeferredOldWay() {
  let resolve;
  const promise = new Promise((res) => {
    resolve = res;
  });
  return { promise, resolve };
}
const d = makeDeferredOldWay();
d.resolve(42);
console.log(await d.promise); // 42
