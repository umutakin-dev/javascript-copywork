// Phase 1 · 10 — Always pass the radix to parseInt
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt

// Why the radix matters — same digits, different base, different number:
console.log(parseInt("11", 2)); // 3  — binary
console.log(parseInt("11", 8)); // 9  — octal
console.log(parseInt("11", 10)); // 11 — decimal
console.log(parseInt("11", 16)); // 17 — hex

// Without a radix, a leading "0x" is auto-detected as hex — surprising:
console.log(parseInt("0x1F")); // 31  (auto hex)
console.log(parseInt("0x1F", 10)); // 0   (decimal parse stops at the 'x')

// parseInt also stops at the first non-digit, whereas Number() does not:
console.log(parseInt("42px", 10)); // 42
console.log(Number("42px")); // NaN

// Number.parseFloat / Number.parseInt are the same functions, namespaced:
console.log(Number.parseFloat("3.14abc")); // 3.14
console.log((255).toString(16)); // "ff"  — the reverse trip
