# Web Platform — Deep Dive (Copywork, Part II)

> Real-time 3D graphics and real-time communication, the standard way.
> WebGL2 → WebGPU, WebRTC, Web Audio. Web standards only. No frameworks. No
> TypeScript. Plain JS + JSDoc. The sequel to the `a-fundamentals/` curriculum.

## How this part differs

These APIs are **verbose, stateful, and browser-only**, and WebRTC normally needs
two machines plus a server. So the copywork unit changes:

1. **Layered build-ups, not one-offs.** Each program is a complete runnable page
   that adds *exactly one concept* over the previous one (clear → triangle →
   colored verts → uniforms → textures → 3D → lighting). You retype each stage;
   the pipeline burns into your fingers through repetition. The *diff* between
   consecutive files is the lesson.
2. **Reimplement still rules.** You build your own `mat4` math, your own
   shader-compile/link helper, your own GL boilerplate — understand the ceremony
   before abstracting it.
3. **WebRTC starts as loopback.** Two `RTCPeerConnection`s in ONE page talk to
   each other — you learn the whole offer/answer/ICE handshake with zero server.
   Only later do we add a tiny Bun signaling server for real two-device calls.
4. **See your failures.** WebGL fails silently, so every GL file uses a helper
   that reads `getShaderInfoLog`/`getProgramInfoLog` and a `checkError()` after
   risky calls. WebGPU uses error scopes.

## Three verification tiers

- **bun-run** — the pure `mat4`/`vec3` math (Track A5) and the Bun servers
  (Track B) have no DOM, so they run under `bun`/`node --test` like Part I.
- **syntax-check** — the WebGL/WebGPU/WebRTC/audio `.html` pages (browser-only).
- **your eyes** — open the page with `bun serve.js` and confirm it renders/works.

## Conventions

- `:reimplement:` rebuild something from scratch (math, helpers, a server).
- `:platform:` browser API — run it in a served page.
- `:verify-support:` recent/uneven feature — check MDN/caniuse first.
- `:stretch:` optional depth.

## Layout (extends the existing repo)

```
b-web-platform/
  curriculum.md                   this plan
  reference/                      the listings you copy FROM
    a0-canvas-deep/ a1-webgl-first/ … a10-webgpu/
    b0-websockets/ … b6-recording/
    capstones/
  practice/                       empty mirror — your hand-typed copies
  servers/                        Bun WS echo / chat / signaling (server side)
  assets/                         one sample image + one sound clip
```

Serve it with the existing root `bun serve.js`; run the servers with
`bun b-web-platform/servers/<name>.js`.

--------------------------------------------------------------------------------

# Track A — Real-time 3D graphics

## A0 — Canvas 2D, deeper (bridge from Part I · Phase 6)
- [ ] `ImageData`: read/write raw pixels; invert an image's colors.
- [ ] A per-pixel effect by hand: grayscale, then threshold.
- [ ] A 3×3 convolution (box blur / edge detect) over `ImageData`.
- [ ] Transforms: `translate/rotate/scale`, the `save/restore` stack — draw a clock.
- [ ] Compositing: `globalAlpha`, `globalCompositeOperation`.
- [ ] Curves & clipping: bezier/quadratic paths, a `clip()` region.
- [ ] `OffscreenCanvas` rendered in a Worker. :verify-support:

## A1 — WebGL2, first light :platform:
- [ ] Get a `webgl2` context; `clearColor` + `clear`; size to `devicePixelRatio`.
- [ ] Comment-diagram the pipeline: vertex shader → rasterizer → fragment shader.
- [ ] :reimplement: `createShader(gl,type,src)` + `createProgram(gl,vs,fs)` that
      THROW with the info log on failure. Use them in every file afterward.
- [ ] :reimplement: a `checkError(gl)` helper around `gl.getError()`.
- [ ] First triangle: one VBO, one attribute, clip-space verts, a solid color.
- [ ] Break it on purpose (typo a shader) and read the thrown info log.

## A2 — Geometry & data flow
- [ ] Attributes + VBOs: `vertexAttribPointer`, `enableVertexAttribArray`.
- [ ] VAOs (WebGL2): capture attribute state once, bind to draw.
- [ ] Varyings: per-vertex color → interpolated fragment color (rainbow triangle).
- [ ] Two attributes (position + color): interleaved vs separate buffers.
- [ ] Index buffer (`ELEMENT_ARRAY_BUFFER`): a quad from 4 verts / 6 indices.
- [ ] A generated grid mesh.

## A3 — Uniforms & animation
- [ ] A `uniform` color you change each frame.
- [ ] `u_resolution` + `gl_FragCoord`: a fragment-shader gradient.
- [ ] A `requestAnimationFrame` loop with a `u_time` uniform; pulsing color.
- [ ] Move a triangle via a translation uniform, driven by keyboard/pointer.
- [ ] Full-screen quad + fragment shader playground (procedural patterns).

## A4 — Textures
- [ ] Load an image into a texture; a UV attribute; sample it in the shader.
- [ ] `texParameteri`: NEAREST vs LINEAR, wrap modes, mipmaps.
- [ ] Two texture units; blend two textures in the shader.
- [ ] The `UNPACK_FLIP_Y_WEBGL` gotcha.
- [ ] A data texture from a `Uint8Array` (procedural).

## A5 — 3D math, by hand :reimplement:
- [ ] `vec3`: add, sub, scale, dot, cross, length, normalize.
- [ ] `mat4`: identity, multiply (the core operation), transpose.
- [ ] Transforms: translation, scale, rotateX/Y/Z matrices.
- [ ] `perspective(fovY, aspect, near, far)` — derive it from the frustum.
- [ ] `lookAt(eye, center, up)`.
- [ ] Compose Model·View·Projection; map a known point and check it.
- [ ] A `node --test` file asserting `multiply`, `perspective`, `lookAt` against
      hand-computed values. (These are pure JS — they run headless!)

## A6 — Into 3D
- [ ] Pass an MVP uniform; a triangle in perspective.
- [ ] Depth testing (`enable(DEPTH_TEST)`, `clear(DEPTH_BUFFER_BIT)`).
- [ ] The spinning cube: 24 verts + indices, per-face color, rotating.
- [ ] Backface culling.
- [ ] Several objects (different model matrices) in one scene.
- [ ] Orbit camera from mouse drag.

## A7 — Lighting
- [ ] A normals attribute; transform by the normal matrix.
- [ ] Ambient + diffuse (Lambert) in the fragment shader; a lit cube/sphere.
- [ ] Specular (Blinn-Phong); a movable light.
- [ ] Gouraud (per-vertex) vs Phong (per-fragment) — build both, compare.
- [ ] Multiple lights + simple attenuation.

## A8 — Framebuffers & post-processing
- [ ] Render the scene to a texture (FBO), then draw that texture to the screen.
- [ ] A post pass: invert / grayscale / vignette on the rendered texture.
- [ ] Two-pass Gaussian blur (ping-pong FBOs).
- [ ] A minimal shadow map. :stretch:
- [ ] Multiple render targets / a tiny deferred setup. :stretch:

## A9 — WebGL2 extras
- [ ] Instanced drawing (`drawArraysInstanced`): 10k cubes in one call.
- [ ] Transform feedback: GPU particle update. :stretch:
- [ ] Uniform buffer objects (UBOs).

## A10 — WebGPU (WGSL) :verify-support:
- [ ] Adapter → device → context → format; clear the canvas.
- [ ] :reimplement: a device-init + error-scope helper.
- [ ] A WGSL triangle (vertex + fragment in one module); vertex buffers + layout.
- [ ] Bind groups + a uniform buffer: animated/colored triangle.
- [ ] Textures + samplers in WGSL; a textured quad.
- [ ] Reuse your `mat4` lib → a WebGPU spinning cube with depth.
- [ ] **Compute shader**: double a buffer on the GPU (GPGPU hello-world).
- [ ] A compute-driven particle system, rendered with a render pass. (Capstone-tier.)

--------------------------------------------------------------------------------

# Track B — Real-time communication & media

## B0 — WebSockets (the simple realtime primitive)
- [ ] :reimplement: a Bun WebSocket echo server (~15 lines) + a browser client.
- [ ] A multi-client chat: broadcast, join/leave, usernames.
- [ ] Binary frames (`ArrayBuffer`); a ping/pong heartbeat.
- [ ] Reconnect with backoff (reuse your Part I `retry`); `bufferedAmount`.

## B1 — Media capture
- [ ] `getUserMedia`: camera → `<video>`; handle permission denial gracefully.
- [ ] `enumerateDevices`; switch camera/mic; constraints (resolution, `facingMode`).
- [ ] `getDisplayMedia`: screen share into a `<video>`.
- [ ] Snapshot a video frame into a canvas; apply a 2D filter.
- [ ] A mic level meter (sets up Web Audio next).

## B2 — Web Audio API
- [ ] `AudioContext`: oscillator → gain → destination (a beep); resume-on-gesture.
- [ ] An amplitude envelope (attack/release); play a short melody.
- [ ] `BiquadFilter` lowpass; sweep the cutoff.
- [ ] `decodeAudioData`: load & play a clip; loop, `playbackRate`, `detune`.
- [ ] `AnalyserNode` → `getByteFrequencyData` → draw a spectrum on canvas.
- [ ] Mic → `AnalyserNode` (live input visualizer).
- [ ] An `AudioWorklet` processor (noise / gain). :verify-support:

## B3 — WebRTC core (loopback, no server)
- [ ] Comment-diagram the handshake: offer/answer (SDP) + ICE candidates.
- [ ] Two `RTCPeerConnection`s in ONE page: exchange SDP directly, wire
      `onicecandidate` to the other peer. The full handshake, zero server.
- [ ] Add a `getUserMedia` track; watch your camera loop back through the PC.
- [ ] Log `connectionState` / `iceConnectionState` transitions.

## B4 — Data channels (still loopback)
- [ ] `RTCDataChannel`: send text peer-to-peer.
- [ ] Send a file in chunks with a progress bar.
- [ ] Ordered/reliable vs unordered/`maxRetransmits`.
- [ ] A tiny P2P chat or shared counter over the channel.

## B5 — Real signaling (two tabs / two devices)
- [ ] :reimplement: a minimal Bun WebSocket **signaling server** (~40 lines):
      relay offer/answer/candidates between two clients in a room.
- [ ] A real call page: two tabs (or two LAN devices) exchange SDP/ICE via the
      server, then stream camera peer-to-peer.
- [ ] A public STUN server for NAT traversal; note when TURN is required.
- [ ] Renegotiation: add/remove a track mid-call; mute/unmute.
- [ ] `getStats()`: show live bitrate / packet loss.

## B6 — Recording & codecs
- [ ] `MediaRecorder`: record a stream to a Blob; download the clip.
- [ ] `canvas.captureStream()` → record your WebGL animation.
- [ ] WebCodecs: low-level encode/decode of frames. :verify-support: :stretch:

--------------------------------------------------------------------------------

# Capstones (combine the tracks)

- [ ] **Audio-reactive WebGL visualizer** — mic/file → `AnalyserNode` → uniforms
      driving a fragment shader.
- [ ] **P2P video call** — `getUserMedia` + WebRTC + your Bun signaling server,
      with mute and screen-share.
- [ ] **3D scene viewer** — lit, textured, orbit/pointer-lock camera, a loaded mesh.
- [ ] **WebGPU particle system** — compute shader updates + a render pass.
- [ ] **Record-the-canvas** — capture a Track-A animation with `MediaRecorder`.

--------------------------------------------------------------------------------

# Reference shelf (Part II)

- **MDN** — WebGL, WebGL2, WebGPU, WebRTC, Web Audio, Media Capture (normative).
- **WebGL2 Fundamentals** — webgl2fundamentals.org (the canonical WebGL course).
- **WebGPU Fundamentals** — webgpufundamentals.org.
- **WebRTC for the Curious** — webrtcforthecurious.com (free, excellent).
- **web.dev** — media & WebRTC best practices.
- Specs: Khronos (WebGL), W3C (WebGPU, WebRTC, Web Audio), WHATWG.

# Emerging / uneven support — verify before depending on

- WebGPU, especially **compute** (broadly shipping ~2025–2026; confirm per browser).
- `AudioWorklet`, `OffscreenCanvas`-in-worker (good but check targets).
- WebCodecs, WebTransport (maturing).
