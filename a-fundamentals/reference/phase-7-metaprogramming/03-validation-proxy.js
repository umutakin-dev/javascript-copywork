// Phase 7 · 03 — A validation Proxy that rejects bad assignments
// Centralize invariants in the set trap instead of scattering checks everywhere.
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/set

function validated(obj, rules) {
  return new Proxy(obj, {
    set(target, prop, value, receiver) {
      const rule = rules[prop];
      if (rule && !rule(value)) {
        throw new TypeError(`invalid value for "${String(prop)}": ${value}`);
      }
      return Reflect.set(target, prop, value, receiver);
    },
  });
}

const person = validated(
  { name: "Umut", age: 30 },
  {
    age: (v) => Number.isInteger(v) && v >= 0 && v < 150,
    name: (v) => typeof v === "string" && v.length > 0,
  },
);

person.age = 31; // passes the rule
console.log(person.age); // 31

try {
  person.age = -5; // breaks the rule
} catch (e) {
  console.log("rejected:", e.message); // rejected: invalid value for "age": -5
}
console.log(person.age); // still 31 — the bad write never landed
