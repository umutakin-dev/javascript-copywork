// Phase 2 · 20 — A tiny Object.create, built from `new`  :reimplement:
// Object.create(proto) returns a fresh object whose [[Prototype]] is `proto`.
// The classic pre-ES5 trick: an empty constructor whose prototype we swap.
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create

function myCreate(proto) {
  function F() {} // throwaway constructor
  F.prototype = proto; // its instances will inherit from `proto`
  return new F(); // a new object linked to `proto`
}

const proto = {
  hi() {
    return "hi from proto";
  },
};

const obj = myCreate(proto);
console.log(obj.hi()); // "hi from proto"
console.log(Object.getPrototypeOf(obj) === proto); // true
console.log(Object.keys(obj)); // [] — nothing own; all behavior is inherited
console.assert(Object.getPrototypeOf(obj) === proto, "linked to proto");
