// Phase 2 · 08 — Arrow functions ignore the four rules
// An arrow has NO `this` of its own; it captures `this` lexically — from where
// it is DEFINED, not from how it is called.
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions

const counter = {
  count: 0,
  // Regular method: `this` is `counter` when called as counter.tickAll(...).
  tickAll(amounts) {
    // The arrow inherits THIS method's `this`, so `this.count` is counter.count.
    amounts.forEach((n) => {
      this.count += n; // works — arrow has no own `this` to get in the way
    });
  },
};

counter.tickAll([1, 2, 3]);
console.log(counter.count); // 6
console.assert(counter.count === 6, "arrow kept this === counter inside forEach");

// Contrast: a regular function callback would get its OWN (undefined) `this`
// and throw on this.count. That historical pain is exactly why arrows exist.
