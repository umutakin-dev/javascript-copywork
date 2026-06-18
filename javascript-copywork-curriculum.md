# Modern JavaScript — Copywork Curriculum

> Web standards only. No frameworks. No TypeScript. Plain JS + JSDoc.

This is a *copywork* curriculum: the old K&R / C-primer method where you
hand-type many small programs until the syntax becomes reflexive. The goal is
not learning to program — you already do — but internalizing the **surface** of
modern JavaScript: its idioms, its quirks, its runtime, and the web platform
APIs you'd otherwise reach for a framework to hide.

## How to use it

1. Type every program **by hand**. Do not copy-paste. The typing is the point.
2. After each program runs, change it. Break it on purpose. Predict the error
   before you read it. Make 3–5 small variations of every exercise.
3. Run little snippets in a REPL/console. Run real files when they get bigger.
4. The recurring drill **`:reimplement:`** (reimplement a stdlib feature from
   scratch) is the highest-value exercise in here. Don't skip it.
5. Check a box only when you can write that program again from memory.

## A note on "done"

Each `- [ ]` is one small program (often 5–20 lines). The lists are seeds, not
limits — when a topic clicks, invent more of the same shape. Aim for volume.

## Conventions

- **`:reimplement:`** = rebuild a built-in. The crown jewels of copywork.
- **`:platform:`** = browser / web-standard API, run it in a served page.
- **"verify support"** = recent feature; confirm on MDN / caniuse first.

---

## Phase 0 — The runtime & your setup `:env:`

You can't internalize a language without internalizing where it runs. Do this
phase once, then keep all three environments handy.

### Three places to run JS
- [ ] Browser devtools console — fastest for one-liners and DOM poking.
- [ ] A served page — save `index.html` with `<script type="module">`, then
      serve it (`bun serve.js`, included at the repo root) and open the printed
      localhost URL. Modules do **not** load over `file://`; this is the #1
      beginner trap.
- [ ] A standalone runtime for non-DOM scripts: `bun <file>` / `bun repl`
      (also `node`, `deno run`). Closest thing to "the browser, on the CLI."

### The mental model you must hold
- [ ] `console.log` before and after a `setTimeout(fn, 0)` and a
      `Promise.resolve().then(fn)`. Predict the order. (Sync → microtasks →
      macrotasks.) This single exercise explains 80% of async confusion.
- [ ] Draw the call stack for a 3-deep function call on paper, then confirm with
      a thrown error's stack trace.
- [ ] Module vs script: one file with `export`, imported by another; observe
      that modules are always strict and have their own scope.

---

## Phase 1 — Values, types & coercion `:core:`

The part of JS that bites experienced devs from other languages. Type these
until the rules are boring.

### The type system surface
- [ ] Print `typeof` for: number, string, boolean, undefined, a function, an
      object, `null`, a symbol, a bigint. Memorize `typeof null === "object"`.
- [ ] Demonstrate `NaN !== NaN`. Then detect it with `Number.isNaN` / `Object.is`.
- [ ] Show `-0` vs `0` using `Object.is(-0, 0)` and `1/-0`.

### Coercion (the famous footguns)
- [ ] A tiny table logging `==` results for tricky pairs: `"" == false`,
      `0 == "0"`, `null == undefined`, `[] == ![]`, `NaN == NaN`.
- [ ] Truthy/falsy: log `Boolean(x)` for the falsy values and a few truthy
      surprises (`[]`, `{}`, `"0"`).
- [ ] String/number coercion in `+` vs `-`: `1 + "2"`, `1 - "2"`, `"3" * "4"`.

### Numbers
- [ ] Print `0.1 + 0.2` and explain it (IEEE 754 binary float).
- [ ] `Number.MAX_SAFE_INTEGER`, then add 2 and watch precision die.
- [ ] The same overflow done correctly with `BigInt` (`10n`, `2n ** 64n`).
- [ ] Round-trip with `toFixed`, `Number.parseFloat`, `parseInt(x, 10)` (always
      pass the radix — write the program that proves why).

### Strings & Unicode
- [ ] Template literals: multiline + interpolation + nested expressions.
- [ ] A *tagged template* function that escapes HTML.
- [ ] `.length` vs actual characters for an emoji; iterate with `[...str]` and
      `for...of` to get code points right.
- [ ] `Intl.NumberFormat` for TRY and EUR; `Intl.DateTimeFormat` for a date.
- [ ] `String.prototype.replaceAll` and the `/g` alternative.

### Symbols
- [ ] Create a symbol, use it as a unique object key, show it's skipped by
      `for...in` / `Object.keys` / `JSON.stringify`.
- [ ] `Symbol.for` / `Symbol.keyFor` (the global registry).

---

## Phase 2 — Objects, functions, scope `:core:`

The heart of the language. Spend real time here.

### Objects
- [ ] Object literal with shorthand props, computed keys `[k]:`, and methods.
- [ ] Getters/setters in a literal.
- [ ] `Object.defineProperty` with `writable/enumerable/configurable`; prove each
      flag does what it says.
- [ ] `Object.freeze`, then try (and fail) to mutate; show it's shallow.
- [ ] `Object.keys/values/entries` and `Object.fromEntries` round-trip.
- [ ] `structuredClone` a nested object; compare to `JSON.parse(JSON.stringify())`
      and find a case where the JSON trick loses data (Date, undefined, Map).

### Functions & `this`
- [ ] The four binding rules as four tiny programs: default, implicit
      (`obj.method()`), explicit (`call/apply/bind`), `new`.
- [ ] An arrow function ignoring all four and using lexical `this`.
- [ ] The classic bug: pass `obj.method` as a callback, lose `this`, then fix it
      with `.bind` and with an arrow wrapper.

### Closures `:reimplement:`
- [ ] `makeCounter()` returning `increment/decrement/value`.
- [ ] `once(fn)` — runs at most once, caches the result.
- [ ] `memoize(fn)` — caches by argument key.
- [ ] `curry(fn)` and `partial(fn, ...args)`.
- [ ] `debounce(fn, ms)` and `throttle(fn, ms)`.
- [ ] A "module" with truly private state (no `#`, just closure).
- [ ] A minimal `createEventEmitter()` (`on/off/emit`).

### Prototypes (before classes — do it the hard way first) `:reimplement:`
- [ ] Hand-roll inheritance with `Object.create` and a shared prototype.
- [ ] Reimplement `new` as a plain function `myNew(Ctor, ...args)`.
- [ ] Reimplement `instanceof` by walking the prototype chain.
- [ ] Reimplement a small `Object.create`.
- [ ] A `mixin(target, ...sources)` helper.

### Classes (the sugar over the above)
- [ ] A class with constructor, methods, a getter, a static method.
- [ ] Private fields `#balance` and a private method `#validate()`.
- [ ] `extends` + `super()` + overriding a method and calling `super.method()`.
- [ ] Static factory pattern (`static from(...)`).
- [ ] Convert one of your prototype hand-rolls into a class; diff them mentally.

---

## Phase 3 — Modern syntax & operators `:syntax:`

The "quality of life" layer. These compound — once fluent they make everything
shorter.

### Destructuring
- [ ] Array destructuring with skips and a rest element.
- [ ] Object destructuring with rename `({a: x})` and defaults.
- [ ] Nested destructuring of an API-shaped object.
- [ ] Destructuring in params with a default object `({a = 1} = {})`.
- [ ] Swap two variables with destructuring.

### Spread & rest
- [ ] Clone and merge arrays/objects with spread.
- [ ] Variadic `sum(...nums)`.
- [ ] Spread an iterable into `Math.max`.

### The "nullish" family
- [ ] Optional chaining `a?.b?.c`, `a?.()`, `a?.[k]`.
- [ ] `??` vs `||` (the case where they differ: `0 ?? "x"` vs `0 || "x"`).
- [ ] Logical assignment: `??=`, `||=`, `&&=`.

---

## Phase 4 — Iteration & collections `:core:`

### Iterators & generators `:reimplement:`
- [ ] Implement the iterator protocol by hand: an object with
      `[Symbol.iterator]()` returning `{ next() }`. Make a `for...of`-able range.
- [ ] A generator `function*` that yields a range.
- [ ] An infinite generator + `take(n)`.
- [ ] A generator that delegates with `yield*`.
- [ ] `for...of` vs `for...in` on the same array — show why `for...in` on arrays
      is a trap.

### Array methods (type each, then reimplement) `:reimplement:`
- [ ] Use, then reimplement: `map`, `filter`, `reduce`, `forEach`, `find`,
      `some`, `every`, `flat`, `flatMap`. One `my*` version each.
- [ ] `sort` with a comparator; the gotcha of default lexicographic sort.
- [ ] Copying methods (ES2023): `toSorted`, `toReversed`, `with`, `toSpliced` —
      contrast with the mutating originals.
- [ ] `at(-1)`, `findLast`, `findLastIndex`.

### Map / Set / Weak collections
- [ ] `Map` with object keys (something a plain object can't do well); iterate it.
- [ ] `Set` for dedup; intersection/union by hand.
- [ ] `WeakMap` for private per-instance data; explain why it doesn't leak.
- [ ] `Object.groupBy` / `Map.groupBy` (recent — verify support) to group records.

---

## Phase 5 — Asynchrony `:async:`

Re-derive the whole history so the abstractions aren't magic.

### From callbacks to promises `:reimplement:`
- [ ] A callback-style `readThing(cb)` with `setTimeout`; nest two → callback hell.
- [ ] `promisify(fnTakingCallback)`.
- [ ] `sleep(ms)` returning a promise.
- [ ] A *tiny* thenable: `MyPromise` supporting `resolve` and one `.then`.
      (Not spec-compliance; understanding.)

### async/await fluency
- [ ] Rewrite the callback-hell example with `async/await`.
- [ ] `try/catch/finally` around an awaited call.
- [ ] `Promise.all` vs `allSettled` vs `race` vs `any` — one program each, with a
      deliberately-rejecting promise to see the difference.
- [ ] `Promise.withResolvers()` (recent — verify support) to build a deferred.
- [ ] Sequential vs parallel awaits — write both and time them.

### Real async patterns `:reimplement:`
- [ ] `retry(fn, {attempts, backoff})` with exponential backoff.
- [ ] `timeout(promise, ms)` that rejects if too slow.
- [ ] `mapLimit(items, n, asyncFn)` — concurrency-limited map.
- [ ] An async generator + `for await...of` over it.
- [ ] `AbortController` / `AbortSignal`: cancel a `fetch`; cancel a `sleep`.

---

## Phase 6 — The web platform (your framework-free toolkit) `:platform:`

This is where "no frameworks" stops being a constraint and starts being a
superpower. Everything here runs in a served page.

### DOM without a library
- [ ] Select elements (`querySelector`/`All`); create, append, remove nodes.
- [ ] Build a list from an array of data (no innerHTML concat — `createElement`
      + `textContent`).
- [ ] Then do it with a `<template>` element + `cloneNode(true)`.
- [ ] `classList` add/remove/toggle; data attributes via `dataset`.

### Events
- [ ] `addEventListener` with `click`, `input`, `submit` (`preventDefault`).
- [ ] **Event delegation**: one listener on a parent handling many children.
- [ ] A custom event with `new CustomEvent` + `dispatchEvent` + `detail`.
- [ ] Combine your `debounce` from Phase 2 with an `input` handler (live search).

### Built-in components you didn't know you had
- [ ] A modal with the native `<dialog>` element (`showModal`, `close`).
- [ ] Form handling with `FormData` and `new URLSearchParams`.
- [ ] Native form validation (`required`, `pattern`, `setCustomValidity`).
- [ ] Tabs / accordion using `<details>/<summary>` where possible.

### Web Components — the standard "component" model `:reimplement:`
- [ ] A `class extends HTMLElement` custom element (`customElements.define`).
- [ ] Lifecycle: `connectedCallback`, `attributeChangedCallback` +
      `observedAttributes`.
- [ ] Shadow DOM with encapsulated styles.
- [ ] Slots (`<slot>`) to project content.
- [ ] Build `<my-counter>`, `<my-tabs>`, and a `<my-tooltip>`.

### Networking & data
- [ ] `fetch` GET + JSON; handle a non-2xx (`res.ok`) and a network error.
- [ ] `fetch` POST with a JSON body and headers.
- [ ] `URL` / `URLSearchParams` manipulation.
- [ ] `localStorage` read/write (serialize with JSON).
- [ ] `IndexedDB`: open a DB, store and read records (verbose but pure standard).
- [ ] A `ReadableStream` from `fetch` — read a response in chunks.

### Observers & timing
- [ ] `IntersectionObserver` for lazy-loading / "is it on screen".
- [ ] `MutationObserver` reacting to DOM changes.
- [ ] `ResizeObserver` on an element.
- [ ] `requestAnimationFrame` loop (a bouncing box on `<canvas>`).

### Heavier standards (pick per interest)
- [ ] A Web Worker doing a slow computation off the main thread (`postMessage`).
- [ ] `<canvas>` 2D: draw shapes, then animate with `rAF`.
- [ ] History API: a tiny client-side router (`pushState` + `popstate`) — a
      "SPA" in ~40 lines, no framework.
- [ ] (Stretch) a hello-triangle in WebGPU once the above are comfortable.

---

## Phase 7 — Metaprogramming `:advanced:`

Optional, but where JS gets genuinely interesting and you stop fearing any
codebase.

### Proxy & Reflect `:reimplement:`
- [ ] A logging `Proxy` that traps `get`/`set`.
- [ ] A `Proxy` giving arrays negative indexing (`arr[-1]`).
- [ ] A validation `Proxy` that rejects bad assignments.
- [ ] A tiny observable: `Proxy` + a subscriber list (poor man's reactivity).
- [ ] Use `Reflect` inside the traps instead of direct operations; explain why.

### Well-known symbols
- [ ] Customize `Symbol.iterator` (revisit from Phase 4).
- [ ] `Symbol.toPrimitive` on an object; control its `+` and template behavior.
- [ ] `Symbol.toStringTag` to change `Object.prototype.toString.call(obj)`.

---

## Phase 8 — Types-without-TypeScript, testing, tooling `:tooling:`

You asked for JSDoc — this is where it pays off. You get most of TypeScript's
editor experience while shipping plain `.js`.

### JSDoc as your type system
- [ ] Annotate a function with `@param`/`@returns` and hover it.
- [ ] `@typedef` a shape; reuse it across functions.
- [ ] `@template` for a generic identity/map function.
- [ ] `// @ts-check` at the top of a file; let the TS language server flag real
      bugs — *without any TS compiler in your build*.
- [ ] Import a type from another file's JSDoc with `{import('./x.js').Foo}`.

### Testing with the standard runner
- [ ] Tests with the built-in runner: `node --test` (or `bun test`), using
      `node:test` + `node:assert`. No Jest, no config.
- [ ] Test one pure function and one async function.
- [ ] Test one Web Component in a browser (or with a DOM shim) — optional.

### Hygiene
- [ ] ESLint with a flat config; fix what it flags on an old exercise file.
- [ ] Prettier once, to feel the diff; then forget about formatting forever.
- [ ] Read one error's full stack trace and map it back to a source line.

---

## Consolidation projects (vanilla, no framework) `:projects:`

Each pulls together several phases. Web standards only.

- [ ] **Todo / tracker app** — DOM + events + `localStorage` or `IndexedDB`.
- [ ] **Live-search UI** — `fetch` + `debounce` + `AbortController` + delegation.
- [ ] **Component library** — 4–5 Web Components with shadow DOM and slots.
- [ ] **Mini client-side router** — History API, no dependencies.
- [ ] **Canvas data viz** — read a CSV/JSON, draw it, animate transitions.
- [ ] **A "reactive" micro-lib** — your Proxy observable from Phase 7, wired to
      the DOM. ~100 lines that demystify every framework you'll ever use.

---

## Reference shelf

- **MDN Web Docs** — the canonical reference. Live in it.
- **javascript.info** — best modern tutorial-reference.
- **Eloquent JavaScript** (Haverbeke) — rigorous, free, exercise-heavy.
- **Exercism** JavaScript track — small problems with feedback.
- **JavaScript30** (Wes Bos) — 30 framework-free browser builds.
- **caniuse.com** — check support for anything tagged "verify support".

### Normative sources (the reference code matches these)
- MDN <https://developer.mozilla.org>
- ECMA-262 <https://tc39.es/ecma262/>
- WHATWG: DOM/HTML/Fetch/Streams/URL living standards (Phase 6)

## Emerging features to revisit later

Confirm current support before depending on them, then add copywork:

- Iterator helpers (`.map`/`.filter`/`.take` directly on iterators).
- `Temporal` (the long-awaited replacement for `Date`).
- Explicit resource management: `using` / `await using` + `Symbol.dispose`.
- `Array.fromAsync`.
- The RegExp `/v` flag (set notation & properties of strings).
