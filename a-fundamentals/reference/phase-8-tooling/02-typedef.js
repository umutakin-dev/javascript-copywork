// Phase 8 · 02 — @typedef: name a shape once, reuse it everywhere
// Ref: https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#typedef-callback-and-param

/**
 * @typedef {object} User
 * @property {number} id
 * @property {string} name
 * @property {"admin" | "user"} role - a string-literal union
 */

/**
 * @param {User} user
 * @returns {string}
 */
function describe(user) {
  return `#${user.id} ${user.name} (${user.role})`;
}

/** @type {User} */
const umut = { id: 1, name: "Umut", role: "admin" };

console.log(describe(umut)); // #1 Umut (admin)

// With // @ts-check, a wrong role (e.g. role: "superuser") would be flagged,
// and so would a missing property.
