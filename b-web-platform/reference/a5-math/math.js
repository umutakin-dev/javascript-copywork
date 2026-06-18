// A5 · math.js — a tiny 3D math library, reimplemented by hand. Shared module:
// A6–A10 import { perspective, lookAt, multiply, ... } from "../a5-math/math.js".
//
// CONVENTION: 4×4 matrices are stored COLUMN-MAJOR in a 16-element array — the
// layout WebGL/GLSL expect, so you can pass one straight to
// gl.uniformMatrix4fv(loc, false, m). Column-major means the element at
// (row, col) lives at index col*4 + row:
//
//     index   0  4  8 12       (so the 4th COLUMN — indices 12..15 — holds the
//             1  5  9 13         translation of an affine transform)
//             2  6 10 14
//             3  7 11 15
//
// Unlike the rest of Track A these are pure functions with no DOM, so this file
// runs under `bun`/`node` and is checked by math.test.js.
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Matrix_math_for_the_web

// ---------- vec3 (represented as [x, y, z]) ----------

export const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
export const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
export const scale = (a, s) => [a[0] * s, a[1] * s, a[2] * s];
export const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
export const length = (a) => Math.hypot(a[0], a[1], a[2]);

export const cross = (a, b) => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];

export function normalize(a) {
  const len = length(a);
  return len === 0 ? [0, 0, 0] : scale(a, 1 / len);
}

// ---------- mat4 (16 elements, column-major) ----------

export const identity = () => [
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1,
];

/** Matrix product A·B (both column-major). out(row,col) = Σ_k A(row,k)·B(k,col). */
export function multiply(a, b) {
  const out = new Array(16);
  for (let col = 0; col < 4; col++) {
    for (let row = 0; row < 4; row++) {
      let sum = 0;
      for (let k = 0; k < 4; k++) {
        sum += a[k * 4 + row] * b[col * 4 + k];
      }
      out[col * 4 + row] = sum;
    }
  }
  return out;
}

export function transpose(m) {
  const out = new Array(16);
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      out[c * 4 + r] = m[r * 4 + c];
    }
  }
  return out;
}

export const translation = (tx, ty, tz) => [
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  tx, ty, tz, 1, // translation lives in the last column
];

export const scaling = (sx, sy, sz) => [
  sx, 0, 0, 0,
  0, sy, 0, 0,
  0, 0, sz, 0,
  0, 0, 0, 1,
];

export function rotationX(rad) {
  const c = Math.cos(rad);
  const s = Math.sin(rad);
  return [
    1, 0, 0, 0,
    0, c, s, 0,
    0, -s, c, 0,
    0, 0, 0, 1,
  ];
}

export function rotationY(rad) {
  const c = Math.cos(rad);
  const s = Math.sin(rad);
  return [
    c, 0, -s, 0,
    0, 1, 0, 0,
    s, 0, c, 0,
    0, 0, 0, 1,
  ];
}

export function rotationZ(rad) {
  const c = Math.cos(rad);
  const s = Math.sin(rad);
  return [
    c, s, 0, 0,
    -s, c, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
  ];
}

/**
 * Perspective projection. fovY in RADIANS, aspect = width / height.
 * Maps the view frustum into clip space; the GPU does the perspective divide.
 */
export function perspective(fovY, aspect, near, far) {
  const f = 1 / Math.tan(fovY / 2); // focal length from the vertical field of view
  const nf = 1 / (near - far);
  return [
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (far + near) * nf, -1, // -1 in m[11] feeds the perspective divide
    0, 0, 2 * far * near * nf, 0,
  ];
}

/** A view matrix: camera at `eye`, looking at `center`, with world `up`. */
export function lookAt(eye, center, up) {
  const z = normalize(sub(eye, center)); // forward (points from target back to the eye)
  const x = normalize(cross(up, z)); // right
  const y = cross(z, x); // true up (already unit since z ⟂ x)
  return [
    x[0], y[0], z[0], 0,
    x[1], y[1], z[1], 0,
    x[2], y[2], z[2], 0,
    -dot(x, eye), -dot(y, eye), -dot(z, eye), 1,
  ];
}

/** Apply a column-major mat4 to a 4-vector [x, y, z, w]. */
export function transformVec4(m, v) {
  const [x, y, z, w] = v;
  return [
    m[0] * x + m[4] * y + m[8] * z + m[12] * w,
    m[1] * x + m[5] * y + m[9] * z + m[13] * w,
    m[2] * x + m[6] * y + m[10] * z + m[14] * w,
    m[3] * x + m[7] * y + m[11] * z + m[15] * w,
  ];
}

/**
 * The NORMAL MATRIX: the inverse-transpose of a model matrix's upper-left 3×3,
 * returned as a column-major mat3 (9 elements) for `uniform mat3 u_normalMatrix`.
 * Normals must be transformed by THIS, not the model matrix, so non-uniform
 * scaling doesn't tilt them off the surface. For a pure rotation it equals the
 * rotation's 3×3; for scale(2,1,1) it is scale(0.5,1,1) — the inverse scale.
 * (Introduced in A7 · lighting.)
 * @param {number[]} m - a column-major mat4
 * @returns {number[]} a column-major mat3
 */
export function normalMatrix(m) {
  // Upper-left 3×3 entries; for a column-major mat4, M[row][col] = m[col*4 + row].
  const m00 = m[0];
  const m10 = m[1];
  const m20 = m[2];
  const m01 = m[4];
  const m11 = m[5];
  const m21 = m[6];
  const m02 = m[8];
  const m12 = m[9];
  const m22 = m[10];

  // Cofactors of the 3×3.
  const c00 = m11 * m22 - m12 * m21;
  const c01 = -(m10 * m22 - m12 * m20);
  const c02 = m10 * m21 - m11 * m20;
  const c10 = -(m01 * m22 - m02 * m21);
  const c11 = m00 * m22 - m02 * m20;
  const c12 = -(m00 * m21 - m01 * m20);
  const c20 = m01 * m12 - m02 * m11;
  const c21 = -(m00 * m12 - m02 * m10);
  const c22 = m00 * m11 - m01 * m10;

  const det = m00 * c00 + m01 * c01 + m02 * c02;
  const inv = det === 0 ? 0 : 1 / det;

  // (M^-1)^T equals the cofactor matrix / det. Stored column-major.
  return [
    c00 * inv, c10 * inv, c20 * inv,
    c01 * inv, c11 * inv, c21 * inv,
    c02 * inv, c12 * inv, c22 * inv,
  ];
}

export const toRadians = (deg) => (deg * Math.PI) / 180;
