// Phase 2 · 01 — Object literal: shorthand props, computed keys, methods
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer

const x = 10;
const y = 20;
const key = "dynamic";

const obj = {
  x, // shorthand for x: x
  y, // shorthand for y: y
  [key]: true, // computed key -> { dynamic: true }
  [`${key}Count`]: 1, // any expression works -> { dynamicCount: 1 }
  greet(name) {
    // method shorthand (no `function` keyword)
    return `hi ${name}`;
  },
};

console.log(obj);
console.log(obj.greet("Umut")); // "hi Umut"
console.assert(obj.dynamic === true, "computed key set the property");
console.assert(obj.dynamicCount === 1, "template-literal computed key works");
