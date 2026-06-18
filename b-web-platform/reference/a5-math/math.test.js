// A5 · math.test.js — verify the math library against hand-computed values.
// Run:  node --test b-web-platform/reference/a5-math/math.test.js
//   or: bun test  b-web-platform/reference/a5-math/math.test.js
//
// This is the payoff of "math by hand": the functions are pure, so they get a
// real test suite — exactly like Part I · Phase 8.
// Ref: https://nodejs.org/api/test.html

import { test } from "node:test";
import assert from "node:assert/strict";
import {
  add,
  sub,
  scale,
  dot,
  cross,
  length,
  normalize,
  identity,
  multiply,
  transpose,
  translation,
  scaling,
  rotationZ,
  perspective,
  lookAt,
  transformVec4,
  toRadians,
} from "./math.js";

const EPS = 1e-6;
const close = (a, b) => Math.abs(a - b) < EPS;

/** Assert two number arrays are elementwise close. */
function arrClose(actual, expected, msg) {
  assert.equal(actual.length, expected.length, `${msg}: length`);
  for (let i = 0; i < expected.length; i++) {
    assert.ok(close(actual[i], expected[i]), `${msg} [${i}]: ${actual[i]} != ${expected[i]}`);
  }
}

test("vec3 ops", () => {
  assert.equal(dot([1, 2, 3], [4, 5, 6]), 32);
  arrClose(cross([1, 0, 0], [0, 1, 0]), [0, 0, 1], "x × y = z");
  assert.equal(length([3, 4, 0]), 5);
  arrClose(normalize([3, 0, 0]), [1, 0, 0], "normalize");
  arrClose(add([1, 2, 3], [1, 1, 1]), [2, 3, 4], "add");
  arrClose(sub([1, 2, 3], [1, 1, 1]), [0, 1, 2], "sub");
  arrClose(scale([1, 2, 3], 2), [2, 4, 6], "scale");
});

test("identity is the multiply unit", () => {
  const m = translation(1, 2, 3);
  arrClose(multiply(identity(), m), m, "I·M = M");
  arrClose(multiply(m, identity()), m, "M·I = M");
});

test("multiply composes translations", () => {
  const combined = multiply(translation(1, 2, 3), translation(4, 5, 6));
  arrClose(combined, translation(5, 7, 9), "T1·T2 sums the offsets");
});

test("transpose is an involution", () => {
  const m = perspective(toRadians(60), 1.5, 0.1, 50);
  arrClose(transpose(transpose(m)), m, "transpose twice = original");
});

test("scaling sits on the diagonal", () => {
  arrClose(scaling(2, 3, 4), [2, 0, 0, 0, 0, 3, 0, 0, 0, 0, 4, 0, 0, 0, 0, 1], "scaling");
});

test("rotationZ(90°) sends x to y", () => {
  const r = rotationZ(toRadians(90));
  arrClose(transformVec4(r, [1, 0, 0, 1]), [0, 1, 0, 1], "rotate x → y");
});

test("perspective matches the derived entries", () => {
  const fovY = toRadians(90);
  const aspect = 2;
  const near = 1;
  const far = 3;
  const f = 1 / Math.tan(fovY / 2); // 1 for a 90° field of view
  const p = perspective(fovY, aspect, near, far);
  assert.ok(close(p[0], f / aspect), "m[0] = f/aspect");
  assert.ok(close(p[5], f), "m[5] = f");
  assert.ok(close(p[10], (far + near) / (near - far)), "m[10]");
  assert.ok(close(p[11], -1), "m[11] = -1");
  assert.ok(close(p[14], (2 * far * near) / (near - far)), "m[14]");
});

test("lookAt from (0,0,5) is a -5 z translation", () => {
  const v = lookAt([0, 0, 5], [0, 0, 0], [0, 1, 0]);
  arrClose(v, translation(0, 0, -5), "view = identity rotation + translate z by -5");
});
