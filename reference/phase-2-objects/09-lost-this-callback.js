// Phase 2 · 09 — Losing `this`, and two fixes
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind

const user = {
  name: "Umut",
  greet() {
    return `hi, ${this.name}`;
  },
};

console.log(user.greet()); // "hi, Umut" — called with the dot, `this` is user

// Pass the method as a bare value and the dot is gone -> `this` is lost.
const bare = user.greet;
try {
  console.log(bare()); // strict mode: this is undefined -> reading .name throws
} catch (e) {
  console.log("lost this ->", e.constructor.name); // TypeError
}

// Fix 1: bind() locks `this` permanently.
const bound = user.greet.bind(user);
console.log(bound()); // "hi, Umut"

// Fix 2: wrap in an arrow so the ORIGINAL call keeps the dot.
const wrapped = () => user.greet();
console.log(wrapped()); // "hi, Umut"
