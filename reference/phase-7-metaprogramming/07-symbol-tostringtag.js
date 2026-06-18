// Phase 7 · 07 — Symbol.toStringTag: customize the [object Tag] name
// Object.prototype.toString.call(x) reads this symbol — it's how you get
// "[object Array]", "[object Map]", etc. You can set your own tag.
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag

class Temperature {
  get [Symbol.toStringTag]() {
    return "Temperature";
  }
}

console.log(Object.prototype.toString.call(new Temperature())); // [object Temperature]

// Compare with the built-ins, which set this symbol internally:
console.log(Object.prototype.toString.call([])); // [object Array]
console.log(Object.prototype.toString.call(new Map())); // [object Map]
console.log(Object.prototype.toString.call(null)); // [object Null]
console.log(Object.prototype.toString.call(42)); // [object Number]

// A plain object literal just reports "Object":
console.log(Object.prototype.toString.call({})); // [object Object]
