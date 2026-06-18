// Phase 5 · 14 — AbortController / AbortSignal: cancel async work
// The standard cancellation primitive. fetch() accepts a signal; here we build a
// cancellable sleep that rejects when the signal aborts.
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/API/AbortController

function sleep(ms, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) return reject(signal.reason); // already aborted
    const timer = setTimeout(resolve, ms);
    signal?.addEventListener("abort", () => {
      clearTimeout(timer); // stop the pending work
      reject(signal.reason); // reject with the abort reason
    });
  });
}

const controller = new AbortController();

// Cancel after 30ms, long before the 1000ms sleep would finish.
setTimeout(() => controller.abort(new Error("cancelled by user")), 30);

try {
  await sleep(1000, controller.signal);
  console.log("slept fully"); // not reached
} catch (e) {
  console.log("aborted:", e.message); // aborted: cancelled by user
}
