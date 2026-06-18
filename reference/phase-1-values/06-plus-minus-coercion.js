// Phase 1 · 06 — + is overloaded (concat OR add); -, *, / are always math
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition

console.log(1 + "2"); // "12"  — if EITHER side is a string, + concatenates
console.log(1 - "2"); // -1    — - has no string meaning, so "2" becomes 2
console.log("3" * "4"); // 12    — * coerces both sides to numbers
console.log("5" / "2"); // 2.5

// The infamous chains — read them strictly left to right:
console.log([] + {}); // "[object Object]"  — [] -> "", {} -> "[object Object]"
console.log(1 + 2 + "3"); // "33"  — (1+2)=3, then 3 + "3" concatenates
console.log("1" + 2 + 3); // "123" — string from the start, stays a string
