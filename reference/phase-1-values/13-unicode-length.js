// Phase 1 · 13 — .length counts UTF-16 code units, not characters
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter

const emoji = "👍"; // one emoji, but stored as a surrogate PAIR

console.log(emoji.length); // 2  — two UTF-16 code units
console.log([...emoji].length); // 1  — spread iterates by CODE POINT

// for...of and [...str] both iterate code points (correct for most emoji):
for (const ch of "a👍b") console.log(ch); // a, 👍, b  (not 4 broken halves)

// But "code point" still isn't "what a human sees". A family emoji is several
// code points glued with zero-width joiners. The truly correct unit is a
// GRAPHEME, via Intl.Segmenter:
const family = "👨‍👩‍👧"; // one perceived character, many code points
console.log([...family].length); // 5 (code points) — not what you'd call it
const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
console.log([...segmenter.segment(family)].length); // 1 — the human answer
