// Phase 0 · 05 — A module with exports (imported by 06-module-b.js)
// Modules are ALWAYS strict mode and have their OWN top-level scope:
// `secret` below is NOT global — 06 cannot see it unless it's exported.
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export

const secret = "only visible inside this module";

export const greeting = "hello from module A";

export function shout(text) {
  return text.toUpperCase() + "!";
}

// Proof of strict mode: assigning to an UNDECLARED variable throws here,
// whereas in a classic <script> it would silently create a global.
// Uncomment to see the ReferenceError:
// oops = 123;

// `secret` is referenced so linters don't complain; the point is that it
// stays private to this module.
console.log(`(module A loaded; ${secret.length}-char secret stays here)`);
