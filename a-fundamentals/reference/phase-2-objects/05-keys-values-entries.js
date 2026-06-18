// Phase 2 · 05 — keys / values / entries and the fromEntries round-trip
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries

const scores = { alice: 90, bob: 75, carol: 88 };

console.log(Object.keys(scores)); // ["alice","bob","carol"]
console.log(Object.values(scores)); // [90, 75, 88]
console.log(Object.entries(scores)); // [["alice",90],["bob",75],["carol",88]]

// entries -> transform -> fromEntries is the idiomatic "map over an object":
const curved = Object.fromEntries(
  Object.entries(scores).map(([name, score]) => [name, score + 5]),
);
console.log(curved); // { alice: 95, bob: 80, carol: 93 }

// fromEntries also converts a Map (or any [key,value] iterable) to an object:
const fromMap = Object.fromEntries(
  new Map([
    ["a", 1],
    ["b", 2],
  ]),
);
console.log(fromMap); // { a: 1, b: 2 }
console.assert(curved.alice === 95, "round-trip transformed values");
