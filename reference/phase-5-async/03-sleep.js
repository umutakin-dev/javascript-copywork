// Phase 5 · 03 — sleep(ms): a promise that resolves after a delay  :reimplement:
// The async building block you'll reuse everywhere (retry, polling, demos).
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log("before");
  await sleep(100); // pause this function WITHOUT blocking the event loop
  console.log("after ~100ms");
}

main();
console.log("main() returned immediately (it's async)");
