// @ts-check
// Phase 8 · 04 — // @ts-check: real type checking, zero build step
// The first-line directive tells the TS language server to TYPE-CHECK this plain
// .js file. You get TypeScript's safety while still shipping JavaScript, and the
// file still RUNS as-is (to the runtime, the directive is just a comment).
//
// Ref: https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html

/**
 * @param {number} cents
 * @returns {string}
 */
function formatPrice(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}

console.log(formatPrice(1999)); // "$19.99"

// Each line below is a REAL bug the editor underlines once // @ts-check is on.
// Uncomment one and watch the squiggle appear (the runtime wouldn't complain):
// formatPrice("1999");           // Argument of type 'string' is not assignable to 'number'
// formatPrice();                 // Expected 1 argument, but got 0
// formatPrice(10).toFixed(2);    // 'toFixed' does not exist on type 'string'

console.log("runs fine — type errors are caught by the editor, not the runtime");
