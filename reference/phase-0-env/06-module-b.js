// Phase 0 · 06 — Importing module A
// Run THIS file:  bun reference/phase-0-env/06-module-b.js
// (it pulls in 05-module-a.js)
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import

import { greeting, shout } from "./05-module-a.js";

console.log(greeting); // "hello from module A"
console.log(shout("modules")); // "MODULES!"

// `secret` from module A is NOT in scope here — modules don't share a global
// namespace. Each module sees only what it explicitly imports.
console.log("typeof secret:", typeof secret); // "undefined"
