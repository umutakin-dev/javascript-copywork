// Phase 5 · 07 — Promise.all vs allSettled vs race vs any
// One deliberately-rejecting promise reveals how each combinator reacts.
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all

const ok = (value, ms) => new Promise((res) => setTimeout(() => res(value), ms));
const fail = (msg, ms) => new Promise((_, rej) => setTimeout(() => rej(new Error(msg)), ms));

// all: resolves with ALL values, but REJECTS the moment any one rejects.
try {
  await Promise.all([ok("a", 10), fail("boom", 20)]);
} catch (e) {
  console.log("all rejected:", e.message); // all rejected: boom
}

// allSettled: NEVER rejects — a status report for every promise.
const settled = await Promise.allSettled([ok("a", 10), fail("boom", 20)]);
console.log(
  "allSettled:",
  settled.map((s) => s.status),
); // ["fulfilled","rejected"]

// race: settles with the FIRST to finish — win OR lose.
console.log("race:", await Promise.race([ok("fast", 10), ok("slow", 50)])); // "fast"

// any: first to FULFILL; ignores rejections unless they ALL reject.
console.log("any:", await Promise.any([fail("x", 10), ok("winner", 20)])); // "winner"
