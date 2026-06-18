// Phase 0 · 01 — Your standalone runtime
// Goal: prove you can run a plain .js file outside any browser.
// Run it:  bun a-fundamentals/reference/phase-0-env/01-hello-runtime.js
//          (or: node <file> / deno run <file>)
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Introduction

// There is no DOM here — `document` and `window` don't exist in a CLI runtime.
// `console.log` is the one thing that works EVERYWHERE (browser and CLI),
// because the Console API is a web standard the runtimes implement too.
console.log("Hello from a standalone JavaScript runtime.");

// `globalThis` is the standard name for the global object in every environment
// (it's `window` in a browser, `global` in Node). Use it for portable code.
console.log("typeof globalThis:", typeof globalThis); // "object"

// `typeof` on an undeclared name is SAFE (it never throws) — handy for asking
// "does this environment have a DOM?" without crashing on the CLI.
console.log("typeof document:", typeof document); // "undefined" on the CLI
