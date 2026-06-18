// Phase 3 · 03 — Nested destructuring of an API-shaped object
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

const response = {
  status: 200,
  data: {
    user: { id: 7, name: "Umut" },
    tags: ["a", "b", "c"],
  },
};

// Reach deep in one pattern, mixing object and array destructuring:
const {
  status,
  data: {
    user: { name },
    tags: [firstTag],
  },
} = response;

console.log(status); // 200
console.log(name); // "Umut"
console.log(firstTag); // "a"

// Important: the intermediate path names (`data`, `user`) are NOT bound —
// only the leaves you actually named become variables.
console.log(typeof data); // "undefined"
