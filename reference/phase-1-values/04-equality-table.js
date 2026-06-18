// Phase 1 · 04 — == (loose) vs === (strict) on the classic gotcha pairs
// Rule of thumb: ALWAYS use ===. This file exists so the surprises of == are
// boring to you — not so you start using it.
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Equality
// Ref: https://tc39.es/ecma262/#sec-abstract-equality-comparison

const pairs = [
  ['"" == false', "" == false], // true  — both coerce to 0
  ['0 == "0"', 0 == "0"], // true  — "0" coerces to 0
  ["null == undefined", null == undefined], // true  — special-cased to each other
  ["null == 0", null == 0], // false — null is loosely-equal ONLY to undefined
  ["[] == ![]", [] == ![]], // true  — ![] is false->0, [] is ""->0
  ["NaN == NaN", NaN == NaN], // false — NaN equals nothing
];

for (const [label, result] of pairs) {
  console.log(label.padEnd(20), "=>", result);
}
