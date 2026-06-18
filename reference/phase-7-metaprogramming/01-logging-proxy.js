// Phase 7 · 01 — A logging Proxy (trap get and set)
// A Proxy wraps a target and intercepts operations via "traps".
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy

const target = { name: "Umut", age: 30 };

const logged = new Proxy(target, {
  get(obj, prop, receiver) {
    console.log(`GET ${String(prop)}`);
    return Reflect.get(obj, prop, receiver);
  },
  set(obj, prop, value, receiver) {
    console.log(`SET ${String(prop)} = ${value}`);
    return Reflect.set(obj, prop, value, receiver); // set trap must return a boolean
  },
});

console.log(logged.name); // GET name / Umut
logged.age = 31; // SET age = 31
console.log(logged.age); // GET age / 31

// The underlying target is mutated for real:
console.log("target.age is now", target.age); // 31
