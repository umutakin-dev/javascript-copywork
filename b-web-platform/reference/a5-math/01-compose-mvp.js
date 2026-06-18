// A5 · 01 — Compose Model·View·Projection and map a known point
// Pure JS — run it:  bun b-web-platform/reference/a5-math/01-compose-mvp.js
// We build an MVP matrix, push the model-space origin and a corner through it, do
// the perspective divide by w, and check where they land in NDC (-1..1). The
// origin sits on the camera axis, so it must land dead-center (0, 0).
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Matrix_math_for_the_web

import { perspective, lookAt, multiply, rotationY, transformVec4, toRadians } from "./math.js";

const model = rotationY(toRadians(30)); // spin the model a little
const view = lookAt([0, 0, 5], [0, 0, 0], [0, 1, 0]); // camera 5 units back, looking at origin
const proj = perspective(toRadians(45), 1, 0.1, 100); // square aspect

// MVP = proj · view · model (applied right-to-left to a column vector).
const mvp = multiply(multiply(proj, view), model);

function project(point) {
  const clip = transformVec4(mvp, [...point, 1]); // [x, y, z, w]
  const w = clip[3];
  return [clip[0] / w, clip[1] / w, clip[2] / w]; // perspective divide → NDC
}

const originNdc = project([0, 0, 0]);
const cornerNdc = project([1, 1, 0]);

console.log("origin → NDC", originNdc.map((n) => n.toFixed(3)));
console.log("corner → NDC", cornerNdc.map((n) => n.toFixed(3)));

// The model-space origin is on the camera's axis, so it projects to the center.
console.assert(
  Math.abs(originNdc[0]) < 1e-6 && Math.abs(originNdc[1]) < 1e-6,
  "origin should map to the screen center",
);
console.log("origin maps to screen center ✓");
