// Phase 3 · 04 — Destructuring in function parameters (the "options object")
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters

// Destructure an options object right in the signature, with per-field defaults.
function createButton({ label = "OK", size = "md", disabled = false } = {}) {
  return `<button class="${size}"${disabled ? " disabled" : ""}>${label}</button>`;
}

console.log(createButton({ label: "Save" })); // size/disabled use defaults
console.log(createButton({ size: "lg", disabled: true }));

// The `= {}` at the end is the key trick: it lets you call with NO argument,
// instead of crashing while trying to destructure `undefined`.
console.log(createButton()); // <button class="md">OK</button>
