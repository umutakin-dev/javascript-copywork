// Phase 3 · 09 — Optional chaining: ?.  ?.()  ?.[]
// Short-circuits to `undefined` instead of throwing when a link is null/undefined.
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining

const data = { user: { name: "Umut", getId: () => 7 } };
const empty = {};

console.log(data.user?.name); // "Umut"
console.log(empty.user?.name); // undefined — does NOT throw
// Without ?. the next line would throw "Cannot read properties of undefined":
console.log(empty.user?.profile?.avatar); // undefined (stops at the first gap)

// Optional CALL — invoke only if the method exists:
console.log(data.user.getId?.()); // 7
console.log(data.user.getXyz?.()); // undefined — missing method, no crash

// Optional DYNAMIC index:
const key = "name";
console.log(data.user?.[key]); // "Umut"

// Combine with ?? to supply a fallback value:
console.log(empty.user?.name ?? "guest"); // "guest"
