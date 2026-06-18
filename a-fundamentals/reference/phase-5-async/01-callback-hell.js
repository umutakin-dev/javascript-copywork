// Phase 5 · 01 — Callbacks and the "pyramid of doom"
// The pre-promise style: pass a function to be called WHEN the work finishes.
// Nest a few and you get the rightward drift that motivated promises.
//
// Ref: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS/Introducing

// A fake async "read": invoke cb(error, value) later, via setTimeout.
function readThing(name, cb) {
  setTimeout(() => cb(null, `data:${name}`), 50);
}

// Two dependent reads => a callback nested inside another (callback hell):
readThing("a", (err1, a) => {
  if (err1) return console.error(err1);
  readThing("b", (err2, b) => {
    if (err2) return console.error(err2);
    console.log("got", a, "then", b); // got data:a then data:b
  });
});

console.log("started (this prints BEFORE the callbacks)");
