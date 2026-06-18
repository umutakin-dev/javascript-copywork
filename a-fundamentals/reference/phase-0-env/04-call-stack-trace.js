// Phase 0 · 04 — The call stack, made visible
// Three nested calls; the deepest one throws. The error's stack trace IS the
// call stack, printed top (where it threw) to bottom (where it started).
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/stack

function first() {
  second();
}

function second() {
  third();
}

function third() {
  throw new Error("boom from third()");
}

try {
  first();
} catch (error) {
  // Read it top-down: third -> second -> first -> (module top level).
  // That order is the stack unwinding back to where the call began.
  console.log(error.stack);
}
