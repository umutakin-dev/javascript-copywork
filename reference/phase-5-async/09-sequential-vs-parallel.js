// Phase 5 · 09 — Sequential vs parallel awaits (timing the difference)
// Awaiting one-at-a-time serializes independent work; starting them all first
// and awaiting together runs them concurrently.
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await

const work = (label, ms) => new Promise((res) => setTimeout(() => res(label), ms));

// SEQUENTIAL: each await waits for the previous — total ≈ 100 + 100 + 100.
let start = Date.now();
await work("a", 100);
await work("b", 100);
await work("c", 100);
console.log("sequential took ~", Date.now() - start, "ms"); // ~300

// PARALLEL: start all three FIRST, then await them together — total ≈ 100.
start = Date.now();
const pending = [work("a", 100), work("b", 100), work("c", 100)]; // already running
await Promise.all(pending);
console.log("parallel took ~", Date.now() - start, "ms"); // ~100
