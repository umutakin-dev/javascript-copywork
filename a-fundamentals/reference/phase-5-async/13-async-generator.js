// Phase 5 · 13 — Async generators + for await...of
// `async function*` yields values that arrive over time; `for await...of`
// consumes them, awaiting each. The streaming cousin of a normal generator.
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

async function* ticker(count, ms) {
  for (let i = 1; i <= count; i++) {
    await sleep(ms); // wait between values (like polling or reading a stream)
    yield i;
  }
}

for await (const tick of ticker(3, 30)) {
  console.log("tick", tick); // tick 1, tick 2, tick 3  (each ~30ms apart)
}
console.log("stream done");
