// A0 · 07 (worker) — renders into an OffscreenCanvas, off the main thread.
// There is no `document` here; the canvas arrives by postMessage transfer.
// requestAnimationFrame IS available in a worker for OffscreenCanvas animation.
// Ref: https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas

self.addEventListener("message", (event) => {
  const canvas = event.data.canvas;
  const ctx = canvas.getContext("2d");
  let angle = 0;

  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(angle);
    ctx.fillStyle = "tomato";
    ctx.fillRect(-30, -30, 60, 60);
    ctx.restore();
    angle += 0.05;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
});
