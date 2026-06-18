// Phase 0 · 03 — The event loop: sync -> microtasks -> macrotasks
// PREDICT the output order BEFORE running. This single exercise explains most
// of the async confusion you'll ever hit.
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide
// Ref: https://html.spec.whatwg.org/multipage/webappapis.html#event-loops

console.log("1: synchronous — runs now");

// MACROTASK: scheduled for a future turn of the event loop, AFTER microtasks —
// even with a 0 ms delay it does not jump the queue.
setTimeout(() => console.log("4: setTimeout (macrotask) — last"), 0);

// MICROTASK: runs after the current synchronous code finishes, but BEFORE any
// macrotask (timer), even a 0 ms one.
Promise.resolve().then(() => console.log("3: promise .then (microtask)"));

console.log("2: synchronous — also runs now");

// Expected order: 1, 2, 3, 4
// Why: all synchronous code runs to completion first (1, 2), THEN the microtask
// queue drains (3), THEN the next macrotask runs (4).
