// Phase 4 · 05 — for...of vs for...in (and why for...in on arrays is a trap)
// for...of  -> VALUES of an iterable        (use this for arrays)
// for...in  -> KEYS of an object, INCLUDING inherited/added enumerable ones
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in

const arr = ["a", "b", "c"];

for (const value of arr) console.log("of:", value); // "a" "b" "c"  (values)
for (const key in arr) console.log("in:", key); // "0" "1" "2"  (STRING indexes)

// Trap: for...in also walks any extra enumerable property on the array:
arr.extra = "surprise";
for (const key in arr) console.log("in (polluted):", key); // 0, 1, 2, AND "extra"

// for...of ignores non-index properties entirely:
for (const value of arr) console.log("of (clean):", value); // still a, b, c

// Rule of thumb: arrays -> for...of (or forEach); plain objects -> Object.entries.
