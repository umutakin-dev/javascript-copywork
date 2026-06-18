// A10 · gpu.js — WebGPU init + helpers (shared by the A10 files).
//
// WebGPU is async and verbose; this centralizes adapter → device → context setup.
// :verify-support: WebGPU needs a recent browser (Chrome/Edge today; Firefox and
// Safari are rolling it out). navigator.gpu is undefined where it's unavailable.
// Ref: https://developer.mozilla.org/en-US/docs/Web/API/GPU/requestAdapter

export async function initWebGPU(canvas) {
  if (!navigator.gpu) {
    throw new Error("WebGPU not available — try Chrome/Edge, or a recent Firefox/Safari.");
  }
  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) throw new Error("no suitable GPU adapter found");
  const device = await adapter.requestDevice();
  const context = canvas.getContext("webgpu");
  const format = navigator.gpu.getPreferredCanvasFormat(); // "bgra8unorm" usually
  context.configure({ device, format, alphaMode: "opaque" });
  return { adapter, device, context, format };
}

/**
 * Run GPU work inside a validation error scope; throw if the GPU reports a problem.
 * WebGPU errors are otherwise async and easy to miss — this surfaces them.
 */
export async function withErrorScope(device, label, fn) {
  device.pushErrorScope("validation");
  const result = await fn();
  const error = await device.popErrorScope();
  if (error) throw new Error(`WebGPU validation (${label}): ${error.message}`);
  return result;
}

/** Identity tag marking a literal as WGSL (for editor highlighting), like glsl in gl.js. */
export const wgsl = (strings, ...values) =>
  strings.reduce((out, s, i) => out + s + (i < values.length ? values[i] : ""), "");
