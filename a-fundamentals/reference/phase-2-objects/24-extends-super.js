// Phase 2 · 24 — extends, super(), and overriding with super.method()
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends

class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return `${this.name} makes a sound`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // MUST call super() before using `this` in a subclass ctor
    this.breed = breed;
  }
  speak() {
    // Override, but REUSE the parent's version via super.speak():
    return `${super.speak()} (a bark from a ${this.breed})`;
  }
}

const d = new Dog("Rex", "lab");
console.log(d.speak()); // "Rex makes a sound (a bark from a lab)"
console.log(d instanceof Dog, d instanceof Animal); // true true
console.assert(d.name === "Rex" && d.breed === "lab", "super() set parent state");
