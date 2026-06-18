// Phase 7 · 05 — Why use Reflect inside traps (correct forwarding)
// Reflect.* mirrors each trap 1:1 and performs the DEFAULT operation correctly,
// including honoring `receiver` so getters/setters up the prototype chain see the
// right `this`. Hand-rolling (e.g. target[prop]) gets this subtly wrong.
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect

const base = {
  _value: 10,
  get value() {
    return this._value; // `this` matters — it must resolve through the proxy
  },
};

const reads = [];
const tracked = new Proxy(base, {
  get(target, prop, receiver) {
    reads.push(prop);
    // Passing `receiver` makes the getter's `this` the proxy, so the nested
    // read of `_value` is ALSO tracked. Returning target[prop] would skip that.
    return Reflect.get(target, prop, receiver);
  },
});

console.log(tracked.value); // 10
console.log("reads:", reads); // ["value","_value"] — the getter read _value too

// Reflect also gives a clean return value where the raw operator is awkward:
console.log(Reflect.has(base, "value")); // true  — the `in` operator, as a function
console.log(Reflect.ownKeys(base)); // ["_value","value"]
