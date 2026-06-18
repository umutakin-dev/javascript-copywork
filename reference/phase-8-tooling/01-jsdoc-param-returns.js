// Phase 8 · 01 — JSDoc @param / @returns (types without TypeScript)
// These are just comments — the file runs as plain JS — but the editor's TS
// language server reads them for hovers, autocomplete, and error checks.
// See it: hover `add` in VS Code, or run `npx tsc --noEmit --checkJs <file>`.
//
// Ref: https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html

/**
 * Add two numbers.
 * @param {number} a - the first addend
 * @param {number} b - the second addend
 * @returns {number} their sum
 */
function add(a, b) {
  return a + b;
}

/**
 * Greet someone.
 * @param {string} name
 * @param {{ shout?: boolean }} [options] - optional settings
 * @returns {string}
 */
function greet(name, options = {}) {
  const msg = `hello, ${name}`;
  return options.shout ? msg.toUpperCase() : msg;
}

console.log(add(2, 3)); // 5
console.log(greet("Umut")); // hello, Umut
console.log(greet("Umut", { shout: true })); // HELLO, UMUT

// With // @ts-check on, calling add("2", 3) would be FLAGGED by the editor —
// even though plain JS happily runs it and produces "23".
