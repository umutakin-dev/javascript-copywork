// Phase 2 · 03 — Object.defineProperty: the hidden property flags
// Every property has three flags. Object-literal props default them all to
// true; defineProperty is how you get the non-default behavior.
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty

const obj = {};

Object.defineProperty(obj, "id", {
  value: 42,
  writable: false, // can't be reassigned
  enumerable: false, // skipped by for...in / Object.keys / JSON
  configurable: false, // can't be deleted or re-defined
});

console.log(obj.id); // 42

// In strict mode (every ES module is strict), violating a flag THROWS rather
// than failing silently — so we catch to keep the demo running.
try {
  obj.id = 99;
} catch (e) {
  console.log("writable:false ->", e.constructor.name); // TypeError
}
console.log(obj.id); // still 42

console.log(Object.keys(obj)); // [] — enumerable:false hid it
console.log(JSON.stringify(obj)); // {}

try {
  delete obj.id;
} catch (e) {
  console.log("configurable:false ->", e.constructor.name); // TypeError
}
console.log(obj.id); // still 42

// Inspect the flags directly:
console.log(Object.getOwnPropertyDescriptor(obj, "id"));
