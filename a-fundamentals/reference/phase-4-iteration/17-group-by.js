// Phase 4 · 17 — Object.groupBy / Map.groupBy  (ES2024 — verify support)
// Group an array of records by a computed key.
//   Object.groupBy -> a plain object (string keys)
//   Map.groupBy    -> a Map (keys of any type, by identity)
//
// Support: ES2024. Node 21+, Bun 1.x, Deno 1.39+, current browsers.
// If you target older runtimes, check https://caniuse.com/?search=groupBy
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy

const people = [
  { name: "Alice", dept: "eng" },
  { name: "Bob", dept: "sales" },
  { name: "Carol", dept: "eng" },
];

const byDept = Object.groupBy(people, (p) => p.dept);
console.log(byDept.eng.map((p) => p.name)); // ["Alice","Carol"]
console.log(byDept.sales.map((p) => p.name)); // ["Bob"]

// Map.groupBy lets the key be a non-string (here, a boolean):
const byParity = Map.groupBy([1, 2, 3, 4, 5], (n) => n % 2 === 0);
console.log(byParity.get(true)); // [2,4]
console.log(byParity.get(false)); // [1,3,5]
