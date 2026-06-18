// Phase 1 · 11 — Template literals: interpolation, multiline, expressions
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals

const name = "Umut";
const items = ["a", "b", "c"];

// Interpolation with ${...} — ANY expression goes inside.
console.log(`Hello, ${name}.`);

// Multiline without \n — the line breaks in the source are literal.
const block = `line one
line two
line three`;
console.log(block);

// Nested expressions: method calls, arithmetic, ternaries, even templates.
console.log(`You have ${items.length} item${items.length === 1 ? "" : "s"}.`);
console.log(`Upper: ${name.toUpperCase()} / sum: ${2 + 3}`);
