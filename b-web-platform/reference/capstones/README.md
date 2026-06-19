# Capstones — closing out Part II

The curriculum lists five cross-track capstones. Two are genuinely new
combinations and are built here; the other three are already realized by a single
module from Tracks A/B, so they're cross-referenced rather than duplicated.

| # | Capstone | Where |
|---|----------|-------|
| 1 | **Audio-reactive WebGL visualizer** (Web Audio × WebGL) | [`01-audio-reactive-visualizer.html`](01-audio-reactive-visualizer.html) — **new** |
| 2 | **3D scene viewer** (textures × 3D × lighting × camera) | [`02-3d-scene-viewer.html`](02-3d-scene-viewer.html) — **new** |
| 3 | P2P video call | already built: [`../b5-signaling/01-call.html`](../b5-signaling/01-call.html) |
| 4 | WebGPU particle system | already built: [`../a10-webgpu/07-compute-particles.html`](../a10-webgpu/07-compute-particles.html) |
| 5 | Record-the-canvas | already built: [`../b6-recording/02-record-canvas.html`](../b6-recording/02-record-canvas.html) |

## The two new builds

- **Audio-reactive visualizer** — copies the `AnalyserNode`'s 256 frequency bins
  into a 256×1 texture each frame; a fragment shader samples it by angle to draw a
  circular spectrum that pulses, with a bass-driven center glow. Click *Start* and
  make noise.
- **3D scene viewer** — a textured, Blinn-Phong-lit cube with an orbiting light and
  a mouse-driven orbit camera (drag to rotate, wheel to zoom). Combines A4 (texture),
  A6 (3D + camera), and A7 (lighting), with matrices from `math.js`.

Run them through `bun serve.js` like every other browser page.

That's the end of **Part II (b-web-platform)** — real-time 3D graphics and
real-time communication, the standard way.
