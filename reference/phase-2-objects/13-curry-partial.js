// Phase 2 · 13 — curry and partial application  :reimplement:
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures

// curry: keep collecting args until there are enough (fn.length), then call.
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn.apply(this, args);
    return (...more) => curried.apply(this, [...args, ...more]);
  };
}

const add3 = (a, b, c) => a + b + c; // fn.length is 3
const curried = curry(add3);
console.log(curried(1)(2)(3)); // 6
console.log(curried(1, 2)(3)); // 6
console.log(curried(1)(2, 3)); // 6

// partial: pre-fill the LEADING args, leave the rest for the later call.
function partial(fn, ...fixed) {
  return (...rest) => fn(...fixed, ...rest);
}

const add10 = partial(add3, 10);
console.log(add10(2, 3)); // 15
console.assert(curried(1)(2)(3) === 6 && add10(2, 3) === 15, "curry + partial");
