// Phase 2 · 07 — The four `this` binding rules, one per block
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this

function whoAmI() {
  return this;
}

// 1. DEFAULT — a plain call. In a module (strict mode) `this` is undefined.
console.log(whoAmI()); // undefined  (would be globalThis in sloppy mode)

// 2. IMPLICIT — called as a method; `this` is the object left of the dot.
const obj = { name: "obj", whoAmI };
console.log(obj.whoAmI().name); // "obj"

// 3. EXPLICIT — call / apply / bind set `this` by hand.
const forced = { name: "forced" };
console.log(whoAmI.call(forced).name); // "forced"
const bound = whoAmI.bind(forced); // bind returns a NEW, permanently-bound fn
console.log(bound().name); // "forced"

// 4. NEW — `this` is a brand-new object linked to the constructor's prototype.
function Person(name) {
  this.name = name; // `this` is the fresh instance
}
console.log(new Person("Umut").name); // "Umut"
