// Phase 1 · 15 — replaceAll vs replace(/g)
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll

const csv = "a,b,c,d";

// replace() with a STRING replaces only the FIRST match:
console.log(csv.replace(",", " | ")); // "a | b,c,d"

// replaceAll() with a string replaces every match — clearer than a global regex:
console.log(csv.replaceAll(",", " | ")); // "a | b | c | d"

// The older equivalent: a regex with the /g (global) flag.
console.log(csv.replace(/,/g, " | ")); // "a | b | c | d"

// Gotcha: if you pass a REGEX to replaceAll it MUST have /g, else it throws —
// which keeps your "replace everything" intent explicit.
console.log("aAaA".replaceAll(/a/gi, "x")); // "xxxx"
