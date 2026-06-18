// Phase 4 · 16 — WeakMap for private per-instance data
// Keys are held WEAKLY: when the object key is garbage-collected, its entry
// vanishes too — so this can't leak memory the way a Map keyed by objects can.
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap

const privates = new WeakMap(); // instance -> its private data bag

class Counter {
  constructor() {
    privates.set(this, { count: 0 }); // stash state keyed by the instance itself
  }
  increment() {
    privates.get(this).count += 1;
    return this; // allow chaining
  }
  get value() {
    return privates.get(this).count;
  }
}

const c = new Counter();
c.increment().increment();
console.log(c.value); // 2

// The data is NOT an own property of the instance, so it stays hidden:
console.log(Object.keys(c)); // [] — nothing on the object itself
// (WeakMaps aren't iterable — entries can disappear at any GC, so there's
//  nothing stable to iterate.)
console.assert(c.value === 2, "private count tracked via WeakMap");
