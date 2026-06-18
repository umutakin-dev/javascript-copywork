// Phase 8 · 10 — Read a stack trace and map it back to a source line
// An Error's .stack lists call frames top (where it threw) to bottom (entry).
// Each frame carries the function name, file, LINE, and COLUMN — your map back
// to the exact source location.
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/stack

function parseConfig(raw) {
  return JSON.parse(raw); // throws on bad JSON, deep in the call stack
}

function loadSettings(input) {
  return parseConfig(input);
}

try {
  loadSettings("{ not valid json }");
} catch (error) {
  console.log("name:", error.name); // SyntaxError
  console.log("message:", error.message);
  console.log("--- stack (top frame = where it threw) ---");
  console.log(error.stack);
  // Walk down the frames: the throw is inside JSON.parse, called by
  // parseConfig, called by loadSettings — pinpointing the bad input's origin.
}
