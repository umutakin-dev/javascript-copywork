// Phase 5 · 11 — timeout(promise, ms): reject if the work is too slow  :reimplement:
// Race the real work against a timer that rejects — whichever settles first wins.
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race

function timeout(promise, ms) {
  const timer = new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`timed out after ${ms}ms`)), ms),
  );
  return Promise.race([promise, timer]);
}

const slow = new Promise((res) => setTimeout(() => res("done"), 100));
const fast = new Promise((res) => setTimeout(() => res("done"), 10));

console.log(await timeout(fast, 50)); // "done" — beat the timeout

try {
  await timeout(slow, 50); // loses the race to the 50ms timer
} catch (e) {
  console.log("caught:", e.message); // caught: timed out after 50ms
}
