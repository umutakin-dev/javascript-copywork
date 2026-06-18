// Phase 2 · 17 — Hand-rolled inheritance with Object.create (the OLD way)
// Do this before classes so you SEE the prototype chain that classes hide.
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create

// A shared prototype object holding the behavior.
const animalProto = {
  describe() {
    return `${this.name} says ${this.sound}`;
  },
};

function makeAnimal(name, sound) {
  // Create an object whose [[Prototype]] IS animalProto.
  const animal = Object.create(animalProto);
  animal.name = name; // own data
  animal.sound = sound; // own data
  return animal;
}

const dog = makeAnimal("Rex", "woof");
console.log(dog.describe()); // "Rex says woof" — method found on the prototype
console.log(Object.getPrototypeOf(dog) === animalProto); // true
console.log(Object.hasOwn(dog, "describe")); // false — inherited, not own
console.log(Object.hasOwn(dog, "name")); // true  — own data property
