// Phase 3 · 02 — Object destructuring: rename and defaults
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

const user = { id: 1, name: "Umut", role: "admin" };

// Pull fields out by name:
const { name, role } = user;
console.log(name, role); // Umut admin

// Rename with {sourceKey: newLocalName}:
const { name: fullName } = user;
console.log(fullName); // Umut

// Defaults for missing keys (here also combined with a rename):
const { theme = "dark", name: who = "anon" } = user;
console.log(theme, who); // dark Umut

// Rest collects the remaining own enumerable props into a NEW object:
const { id, ...rest } = user;
console.log(id); // 1
console.log(rest); // { name: "Umut", role: "admin" }
