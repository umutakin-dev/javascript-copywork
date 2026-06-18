// Phase 8 · 06 — Import a type from another file's JSDoc
// {import('./05-shared-types.js').CartItem} pulls a type across files WITHOUT a
// runtime import — perfect for sharing shapes between plain .js modules.
//
// Ref: https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#import-types

import { TAX_RATE } from "./05-shared-types.js"; // a normal runtime import

/**
 * @param {import('./05-shared-types.js').CartItem[]} items
 * @returns {number} total in cents, including tax
 */
function total(items) {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  return Math.round(subtotal * (1 + TAX_RATE));
}

const cart = [
  { product: { sku: "A", price: 1000 }, qty: 2 },
  { product: { sku: "B", price: 500 }, qty: 1 },
];

console.log(total(cart)); // 2950  (2500 subtotal + 18% tax)
