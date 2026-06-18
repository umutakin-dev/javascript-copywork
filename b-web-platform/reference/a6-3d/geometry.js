// A6 · geometry.js — a unit cube, built generatively (shared by A6's cube files).
//
// 6 faces × 4 corners = 24 vertices (each face gets its own flat color, so colors
// don't bleed between faces). Each face is defined by an in-plane basis (u, v)
// chosen so u × v points OUTWARD; listing the corners as (-u-v, +u-v, +u+v, -u+v)
// then winds them counter-clockwise from outside — which is what backface culling
// (default CCW = front) expects.
//
// Returns interleaved [x,y,z, r,g,b] vertices + a Uint16 index buffer.
// Ref: https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Creating_3D_objects_using_WebGL

export function makeCube() {
  const faces = [
    { color: [1.0, 0.30, 0.25], n: [1, 0, 0], u: [0, 1, 0], v: [0, 0, 1] }, // +X red
    { color: [0.2, 0.80, 0.90], n: [-1, 0, 0], u: [0, 0, 1], v: [0, 1, 0] }, // -X cyan
    { color: [0.3, 0.90, 0.35], n: [0, 1, 0], u: [0, 0, 1], v: [1, 0, 0] }, // +Y green
    { color: [1.0, 0.85, 0.20], n: [0, -1, 0], u: [1, 0, 0], v: [0, 0, 1] }, // -Y yellow
    { color: [0.25, 0.45, 1.0], n: [0, 0, 1], u: [1, 0, 0], v: [0, 1, 0] }, // +Z blue
    { color: [1.0, 0.30, 0.80], n: [0, 0, -1], u: [0, 1, 0], v: [1, 0, 0] }, // -Z magenta
  ];
  const cornerSigns = [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ];

  const vertices = [];
  const indices = [];
  faces.forEach((f, i) => {
    const center = f.n.map((k) => k * 0.5);
    for (const [su, sv] of cornerSigns) {
      const p = [0, 1, 2].map((d) => center[d] + 0.5 * (su * f.u[d] + sv * f.v[d]));
      vertices.push(p[0], p[1], p[2], f.color[0], f.color[1], f.color[2]);
    }
    const base = i * 4;
    indices.push(base, base + 1, base + 2, base, base + 2, base + 3); // two triangles
  });

  return {
    vertices: new Float32Array(vertices),
    indices: new Uint16Array(indices),
    indexCount: indices.length,
  };
}
