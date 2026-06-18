// Phase 8 · 08 — Testing ASYNC code with the built-in runner
// An async test just returns a promise; assertions work the same. Two helpers,
// assert.rejects / assert.doesNotReject, are made for promise outcomes.
// Run it:  node --test a-fundamentals/reference/phase-8-tooling/08-node-test-async.test.js
//
// Ref: https://nodejs.org/api/test.html#testing-asynchronous-code

import { test } from "node:test";
import assert from "node:assert/strict";

/** Resolve after `ms`, yielding the doubled value. */
function doubleLater(n, ms = 10) {
  return new Promise((resolve) => setTimeout(() => resolve(n * 2), ms));
}

/** Reject if n is negative. */
async function mustBePositive(n) {
  if (n < 0) throw new Error("negative");
  return n;
}

test("awaits a resolved value", async () => {
  const result = await doubleLater(21);
  assert.equal(result, 42);
});

test("an expected rejection passes", async () => {
  await assert.rejects(() => mustBePositive(-1), /negative/);
});

test("a non-rejection passes", async () => {
  await assert.doesNotReject(() => mustBePositive(5));
});
