// Phase 3 · 11 — Logical assignment: ??=  ||=  &&=
// Assign only when the current value passes the operator's test.
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_nullish_assignment

const settings = { theme: "dark", count: 0 };

// ??= : assign ONLY if currently null/undefined (great for filling defaults).
settings.theme ??= "light"; // theme exists -> unchanged
settings.locale ??= "en"; // locale missing -> set to "en"
console.log(settings.theme, settings.locale); // dark en

// ||= : assign if currently falsy — note it WOULD clobber a valid 0.
settings.count ||= 5;
console.log(settings.count); // 5  — beware: 0 was falsy, so it got replaced

// &&= : assign only if currently truthy (transform something already present).
const session = { token: "abc" };
session.token &&= session.token.toUpperCase();
console.log(session.token); // "ABC"
