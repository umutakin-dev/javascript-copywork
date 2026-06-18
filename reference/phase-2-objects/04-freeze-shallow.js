// Phase 2 · 04 — Object.freeze is SHALLOW
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze

const config = Object.freeze({
  name: "app",
  nested: { debug: false }, // this inner object is NOT frozen
});

console.log(Object.isFrozen(config)); // true

// Top-level mutation fails (throws in strict mode — modules are strict):
try {
  config.name = "changed";
} catch (e) {
  console.log("top-level frozen ->", e.constructor.name); // TypeError
}
console.log(config.name); // "app"

// But the NESTED object is still mutable — freeze only goes one level deep:
config.nested.debug = true;
console.log(config.nested.debug); // true  <-- the shallow gotcha
console.assert(config.nested.debug === true, "freeze did NOT protect nested objects");

// A real deep freeze recurses yourself (or use a library):
function deepFreeze(o) {
  for (const v of Object.values(o)) {
    if (v && typeof v === "object") deepFreeze(v);
  }
  return Object.freeze(o);
}
const locked = deepFreeze({ a: { b: 1 } });
try {
  locked.a.b = 2;
} catch (e) {
  console.log("deep frozen ->", e.constructor.name); // TypeError
}
console.log(locked.a.b); // 1
