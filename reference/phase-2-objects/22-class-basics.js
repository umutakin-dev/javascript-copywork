// Phase 2 · 22 — A class: constructor, method, getter, static method
// Classes are SUGAR over the prototype work from 17–21.
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes

class Circle {
  constructor(radius) {
    this.radius = radius; // own instance field
  }

  area() {
    // lives on Circle.prototype, shared by every instance
    return Math.PI * this.radius ** 2;
  }

  get diameter() {
    // accessed as circle.diameter — no parentheses
    return this.radius * 2;
  }

  static unit() {
    // called on the class itself: Circle.unit()
    return new Circle(1);
  }
}

const c = new Circle(2);
console.log(c.area().toFixed(2)); // "12.57"
console.log(c.diameter); // 4
console.log(Circle.unit().radius); // 1
// Same chain mechanics as the hand-rolled version:
console.log(Object.getPrototypeOf(c) === Circle.prototype); // true
console.log(Object.hasOwn(c, "area")); // false — method is on the prototype
