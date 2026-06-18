// Phase 7 · 06 — Symbol.toPrimitive: control coercion (+ and templates)
// When an object is coerced to a primitive, JS calls obj[Symbol.toPrimitive](hint).
// hint is "number", "string", or "default" (e.g. for + and ==).
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive

const money = {
  amount: 1000,
  [Symbol.toPrimitive](hint) {
    if (hint === "number") return this.amount; // Number(x), +x, x * 2
    if (hint === "string") return `$${this.amount}`; // String(x), `${x}`
    return `${this.amount} (default)`; // + and ==
  },
};

console.log(+money); // 1000             — "number" hint
console.log(`${money}`); // "$1000"          — "string" hint
console.log(money + ""); // "1000 (default)" — "default" hint
console.log(money * 2); // 2000             — "number" hint
