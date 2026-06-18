// Phase 2 · 21 — mixin(target, ...sources): compose behavior from many objects
// "Composition over inheritance" — share capabilities without a class chain.
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

function mixin(target, ...sources) {
  for (const source of sources) {
    // Copy OWN enumerable props (data + methods) from each source onto target.
    Object.assign(target, source);
  }
  return target;
}

const canFly = {
  fly() {
    return `${this.name} flies`;
  },
};
const canSwim = {
  swim() {
    return `${this.name} swims`;
  },
};

const duck = mixin({ name: "duck" }, canFly, canSwim);
console.log(duck.fly()); // "duck flies"
console.log(duck.swim()); // "duck swims"
console.assert(duck.fly() === "duck flies" && duck.swim() === "duck swims", "mixed in both");
