// Phase 2 · 25 — Static factory methods (named alternatives to `new`)
// A static method that can validate / parse before constructing.
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static

class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }

  static fromFahrenheit(f) {
    return new Temperature(((f - 32) * 5) / 9); // build and return an instance
  }

  static fromString(text) {
    const n = Number.parseFloat(text);
    if (Number.isNaN(n)) throw new Error(`bad temperature: ${text}`);
    return new Temperature(n);
  }
}

const boiling = Temperature.fromFahrenheit(212);
console.log(boiling.celsius); // 100
const parsed = Temperature.fromString("36.6°C");
console.log(parsed.celsius); // 36.6
console.assert(boiling.celsius === 100, "factory built the instance");
