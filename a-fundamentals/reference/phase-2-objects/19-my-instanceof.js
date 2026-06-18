// Phase 2 · 19 — Reimplement `instanceof` by walking the prototype chain
// `x instanceof C` is true when C.prototype appears anywhere in x's chain.
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof

function myInstanceof(obj, Ctor) {
  // Primitives are instances of nothing.
  if (obj === null || (typeof obj !== "object" && typeof obj !== "function")) {
    return false;
  }
  const target = Ctor.prototype;
  let proto = Object.getPrototypeOf(obj);
  while (proto !== null) {
    if (proto === target) return true; // found it in the chain
    proto = Object.getPrototypeOf(proto); // step one link up
  }
  return false;
}

class Animal {}
class Dog extends Animal {}
const d = new Dog();

console.log(myInstanceof(d, Dog)); // true
console.log(myInstanceof(d, Animal)); // true — inherited up the chain
console.log(myInstanceof(d, Array)); // false
console.log(myInstanceof([], Array)); // true
console.assert(myInstanceof(d, Animal) === d instanceof Animal, "matches native");
