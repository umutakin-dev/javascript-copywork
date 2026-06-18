// Phase 8 · 05 — A module that EXPORTS types via JSDoc (no runtime cost)
// Other files import these shapes with {import('./05-shared-types.js').Name}.
// The typedefs are pure annotation; the only real export is TAX_RATE.
//
// Ref: https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#import-types

/**
 * @typedef {object} Product
 * @property {string} sku
 * @property {number} price - in cents
 */

/**
 * @typedef {object} CartItem
 * @property {Product} product
 * @property {number} qty
 */

export const TAX_RATE = 0.18; // a real runtime export, used by 06-import-type.js
