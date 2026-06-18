// Phase 8 · 03 — @template: generics in JSDoc
// Ref: https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#template

/**
 * Identity — returns its argument, preserving its type.
 * @template T
 * @param {T} value
 * @returns {T}
 */
function identity(value) {
  return value;
}

/**
 * Map over an array with a typed callback.
 * @template T, U
 * @param {T[]} array
 * @param {(item: T, index: number) => U} fn
 * @returns {U[]}
 */
function mapArray(array, fn) {
  return array.map(fn);
}

console.log(identity(42)); // 42   (editor infers: number)
console.log(identity("hi")); // "hi" (editor infers: string)
console.log(mapArray([1, 2, 3], (n) => n * 2)); // [2,4,6]
console.log(mapArray(["a", "bb"], (s) => s.length)); // [1,2]
