// Phase 2 · 02 — Getters and setters in an object literal
// They look like data access but run code, so you can compute / validate.
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get

const temp = {
  _celsius: 0,
  get celsius() {
    return this._celsius;
  },
  set celsius(value) {
    this._celsius = value;
  },
  // A DERIVED property exposed as a getter — reads like data, runs a formula.
  get fahrenheit() {
    return (this._celsius * 9) / 5 + 32;
  },
  set fahrenheit(value) {
    this._celsius = ((value - 32) * 5) / 9;
  },
};

temp.celsius = 25;
console.log(temp.fahrenheit); // 77 — no parentheses; the getter runs
temp.fahrenheit = 212; // the setter runs and converts back
console.log(temp.celsius); // 100
console.assert(temp.celsius === 100, "setter ran and converted F->C");
