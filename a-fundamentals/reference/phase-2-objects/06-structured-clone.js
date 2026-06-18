// Phase 2 · 06 — structuredClone vs JSON.parse(JSON.stringify(...))
// structuredClone is the built-in deep copy; the JSON trick is a lossy hack.
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/API/structuredClone

const original = {
  when: new Date("2026-01-01"),
  tags: new Map([["a", 1]]),
  note: undefined,
  count: 3,
  nested: { deep: [1, 2, 3] },
};

// A true deep copy that PRESERVES Date, Map, Set, typed arrays, etc.
const deep = structuredClone(original);
deep.nested.deep.push(4);
console.log(original.nested.deep); // [1,2,3] — original untouched (really deep)
console.log(deep.when instanceof Date); // true — Date survived
console.log(deep.tags instanceof Map); // true — Map survived

// The JSON round-trip is common but LOSES data:
const viaJson = JSON.parse(JSON.stringify(original));
console.log(typeof viaJson.when); // "string"  — Date became a string
console.log(viaJson.tags); // {}        — Map became an empty object
console.log("note" in viaJson); // false     — undefined was dropped entirely
console.assert(deep.tags instanceof Map && !(viaJson.tags instanceof Map), "only structuredClone kept the Map");
