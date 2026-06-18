// Phase 1 · 08 — Integers are "safe" only up to 2**53 - 1
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER

const max = Number.MAX_SAFE_INTEGER;
console.log(max); // 9007199254740991  (that's 2**53 - 1)

// Past this point, doubles can't represent every integer, so values collide:
console.log(max + 1); // 9007199254740992  (still exact: that's 2**53)
console.log(max + 2); // 9007199254740992  (WRONG — should be ...993)
console.log(max + 1 === max + 2); // true — precision has died
console.assert(max + 1 === max + 2, "beyond MAX_SAFE_INTEGER, +1 and +2 collide");

// (Phase 1 · 09 shows how BigInt does this correctly.)
