// Phase 2 · 14 — debounce and throttle (timing closures)  :reimplement:
// debounce: run only AFTER calls stop for `ms`   (search-as-you-type)
// throttle: run at most once per `ms` window       (scroll / resize handlers)
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout

function debounce(fn, ms) {
  let timer;
  return function (...args) {
    clearTimeout(timer); // each new call cancels the previous pending run
    timer = setTimeout(() => fn.apply(this, args), ms);
  };
}

function throttle(fn, ms) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= ms) {
      last = now;
      fn.apply(this, args);
    }
  };
}

// Debounced: fire rapidly; only the LAST call survives (~50ms later).
const log = debounce((label) => console.log("debounced:", label), 50);
log("a");
log("b");
log("c");

// Throttled: only the first call in the window runs.
const t = throttle((n) => console.log("throttled:", n), 50);
t(1); // runs immediately
t(2); // ignored (still within the 50ms window)

console.log("(now wait for the debounced 'c' to print)");
