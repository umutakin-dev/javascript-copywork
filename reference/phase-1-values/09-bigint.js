// Phase 1 · 09 — BigInt: integers with no size limit
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt

const big = 2n ** 64n; // the `n` suffix makes a BigInt literal
console.log(big); // 18446744073709551616n  — exact, unlike a Number

console.log(typeof big); // "bigint"
console.log(10n + 20n); // 30n

// You CANNOT mix BigInt and Number in arithmetic — it throws on purpose, so you
// never silently lose precision:
try {
  console.log(10n + 1);
} catch (error) {
  console.log(error.constructor.name + ":", error.message); // TypeError: ...
}

// Convert explicitly when you really mean to cross the boundary:
console.log(10n + BigInt(1)); // 11n  (stay in BigInt)
console.log(Number(10n) + 1); // 11   (drop down to Number)
