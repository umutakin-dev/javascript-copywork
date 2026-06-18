// Phase 8 · 07 — Testing a pure function with the BUILT-IN runner
// No Jest, no config. Run it:
//   node --test a-fundamentals/reference/phase-8-tooling/07-node-test-pure.test.js
//   bun test  a-fundamentals/reference/phase-8-tooling/07-node-test-pure.test.js
//
// Ref: https://nodejs.org/api/test.html

import { test } from "node:test";
import assert from "node:assert/strict";

/** Turn "Hello World!" into "hello-world". */
function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-") // runs of non-alphanumerics -> one hyphen
    .replace(/^-+|-+$/g, ""); // trim leading / trailing hyphens
}

test("lowercases and hyphenates", () => {
  assert.equal(slugify("Hello World"), "hello-world");
});

test("strips punctuation and trims", () => {
  assert.equal(slugify("  Cafe & Bar!! "), "cafe-bar");
});

test("collapses runs of separators", () => {
  assert.equal(slugify("a---b   c"), "a-b-c");
});
