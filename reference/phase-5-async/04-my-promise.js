// Phase 5 · 04 — A TINY thenable (understand promises, not spec-comply)  :reimplement:
// Real promises are intricate (states, chaining, microtask timing). This toy
// captures the core idea: stash callbacks, run them when resolve() fires.
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

class MyPromise {
  #callbacks = [];
  #value = undefined;
  #settled = false;

  constructor(executor) {
    const resolve = (value) => {
      if (this.#settled) return; // resolve at most once
      this.#settled = true;
      this.#value = value;
      // Defer to a microtask, like the real thing, so a .then() registered
      // synchronously right after construction still runs.
      queueMicrotask(() => {
        for (const cb of this.#callbacks) cb(value);
      });
    };
    executor(resolve);
  }

  then(onResolved) {
    if (this.#settled) queueMicrotask(() => onResolved(this.#value));
    else this.#callbacks.push(onResolved);
    return this; // toy chaining — real promises return a NEW promise here
  }
}

new MyPromise((resolve) => setTimeout(() => resolve(42), 20))
  .then((v) => console.log("then 1:", v)) // then 1: 42
  .then((v) => console.log("then 2:", v)); // then 2: 42 (toy passes the same value)

console.log("registered then() handlers");
