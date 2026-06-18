// Phase 5 · 02 — promisify: wrap a callback API in a promise  :reimplement:
// Node convention: the callback's first arg is an error (or null), second the value.
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise

function readThing(name, cb) {
  setTimeout(() => {
    if (name === "bad") cb(new Error("could not read"));
    else cb(null, `data:${name}`);
  }, 30);
}

function promisify(fn) {
  return (...args) =>
    new Promise((resolve, reject) => {
      fn(...args, (err, value) => {
        if (err) reject(err);
        else resolve(value);
      });
    });
}

const readAsync = promisify(readThing);

readAsync("a").then((v) => console.log("resolved:", v)); // resolved: data:a
readAsync("bad").catch((e) => console.log("rejected:", e.message)); // rejected: could not read
