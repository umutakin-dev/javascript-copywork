// Phase 6 · 30 (worker) — runs in a SEPARATE thread; there is NO DOM here.
// `self` is the worker's global scope. Loaded by 30-web-worker.html.
// Ref: https://developer.mozilla.org/en-US/docs/Web/API/Worker

self.addEventListener("message", (event) => {
  const { limit } = event.data;
  let sum = 0;
  for (let n = 2; n < limit; n++) {
    if (isPrime(n)) sum += n; // a deliberately slow loop, off the main thread
  }
  self.postMessage({ limit, result: sum }); // send the answer back to the page
});

function isPrime(n) {
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}
