// A7 · geometry.js — meshes carrying NORMALS (shared by the lighting demos).
// Lighting needs a surface direction at every vertex, so these interleave
// [x,y,z, nx,ny,nz] (stride 6 floats). A6's geometry carried colors instead.
// Ref: https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Lighting_in_WebGL

/** A unit cube with a flat normal per face (24 verts / 36 indices). */
export function makeCube() {
  const faces = [
    { n: [1, 0, 0], u: [0, 1, 0], v: [0, 0, 1] },
    { n: [-1, 0, 0], u: [0, 0, 1], v: [0, 1, 0] },
    { n: [0, 1, 0], u: [0, 0, 1], v: [1, 0, 0] },
    { n: [0, -1, 0], u: [1, 0, 0], v: [0, 0, 1] },
    { n: [0, 0, 1], u: [1, 0, 0], v: [0, 1, 0] },
    { n: [0, 0, -1], u: [0, 1, 0], v: [1, 0, 0] },
  ];
  const signs = [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ];
  const vertices = [];
  const indices = [];
  faces.forEach((f, i) => {
    const center = f.n.map((k) => k * 0.5);
    for (const [su, sv] of signs) {
      const p = [0, 1, 2].map((d) => center[d] + 0.5 * (su * f.u[d] + sv * f.v[d]));
      vertices.push(p[0], p[1], p[2], f.n[0], f.n[1], f.n[2]); // position + face normal
    }
    const base = i * 4;
    indices.push(base, base + 1, base + 2, base, base + 2, base + 3);
  });
  return {
    vertices: new Float32Array(vertices),
    indices: new Uint16Array(indices),
    indexCount: indices.length,
  };
}

/**
 * A UV sphere of radius 1 centered at the origin. For a unit sphere at the
 * origin the surface normal at a point IS that point's position, so normal == xyz.
 */
export function makeSphere(latBands = 24, lonBands = 32) {
  const vertices = [];
  const indices = [];
  for (let lat = 0; lat <= latBands; lat++) {
    const theta = (lat * Math.PI) / latBands; // 0..π (pole to pole)
    const sinT = Math.sin(theta);
    const cosT = Math.cos(theta);
    for (let lon = 0; lon <= lonBands; lon++) {
      const phi = (lon * 2 * Math.PI) / lonBands; // 0..2π (around)
      const x = Math.cos(phi) * sinT;
      const y = cosT;
      const z = Math.sin(phi) * sinT;
      vertices.push(x, y, z, x, y, z); // position == normal on a unit sphere
    }
  }
  for (let lat = 0; lat < latBands; lat++) {
    for (let lon = 0; lon < lonBands; lon++) {
      const a = lat * (lonBands + 1) + lon;
      const b = a + lonBands + 1;
      indices.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }
  return {
    vertices: new Float32Array(vertices),
    indices: new Uint16Array(indices),
    indexCount: indices.length,
  };
}
