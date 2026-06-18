// A1 · gl.js — your WebGL boilerplate, built ONCE and reused in every later file.
//
// WebGL fails SILENTLY: a mistyped shader just draws nothing, no exception. These
// helpers turn those silent failures into thrown errors carrying the driver's
// info log (with line numbers), so you actually see what broke. Every A2–A10
// file imports from here: `import { createProgram } from "../a1-webgl-first/gl.js"`.
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getShaderInfoLog

/**
 * Identity tag for template literals: returns the string unchanged. Its only job
 * is to MARK a literal as GLSL so an editor extension (e.g. "glsl-literal") can
 * syntax-highlight it. Shader source is just a string — this does nothing at runtime.
 * @param {TemplateStringsArray} strings
 * @param {...any} values
 * @returns {string}
 */
export const glsl = (strings, ...values) =>
  strings.reduce((out, s, i) => out + s + (i < values.length ? values[i] : ""), "");

/**
 * Compile one shader; throw with the info log if it fails.
 * @param {WebGL2RenderingContext} gl
 * @param {number} type - gl.VERTEX_SHADER or gl.FRAGMENT_SHADER
 * @param {string} source - GLSL ES 3.00 source
 * @returns {WebGLShader}
 */
export function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    const kind = type === gl.VERTEX_SHADER ? "vertex" : "fragment";
    throw new Error(`${kind} shader failed to compile:\n${log}`);
  }
  return shader;
}

/**
 * Link a vertex + fragment shader into a program; throw with the info log.
 * @param {WebGL2RenderingContext} gl
 * @param {string} vsSource
 * @param {string} fsSource
 * @returns {WebGLProgram}
 */
export function createProgram(gl, vsSource, fsSource) {
  const program = gl.createProgram();
  gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, vsSource));
  gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, fsSource));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(`program failed to link:\n${log}`);
  }
  return program;
}

/**
 * Resize the canvas drawing buffer to its displayed size × devicePixelRatio.
 * Returns true if the size changed. Call it at the top of each frame.
 * @param {HTMLCanvasElement} canvas
 * @returns {boolean}
 */
export function resizeToDisplaySize(canvas) {
  const dpr = window.devicePixelRatio ?? 1;
  const width = Math.round(canvas.clientWidth * dpr);
  const height = Math.round(canvas.clientHeight * dpr);
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    return true;
  }
  return false;
}

/**
 * Throw if the GL error flag is set. Sprinkle after risky calls while learning;
 * `label` tells you where you were.
 * @param {WebGL2RenderingContext} gl
 * @param {string} [label]
 */
export function checkError(gl, label = "") {
  const err = gl.getError();
  if (err !== gl.NO_ERROR) {
    const names = {
      [gl.INVALID_ENUM]: "INVALID_ENUM",
      [gl.INVALID_VALUE]: "INVALID_VALUE",
      [gl.INVALID_OPERATION]: "INVALID_OPERATION",
      [gl.OUT_OF_MEMORY]: "OUT_OF_MEMORY",
      [gl.INVALID_FRAMEBUFFER_OPERATION]: "INVALID_FRAMEBUFFER_OPERATION",
    };
    throw new Error(`GL error ${names[err] ?? err}${label ? ` at ${label}` : ""}`);
  }
}
