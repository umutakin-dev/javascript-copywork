# Modern JavaScript — Copywork

Hand-type your way to fluent modern JavaScript. Web standards only — no
frameworks, no TypeScript. Plain JS + JSDoc.

This is **copywork**: the old K&R / C-primer method. You read a complete,
correct program and retype it *by hand* until the syntax lives in your fingers.
You already know how to program — the goal here is to internalize the *surface*
of JavaScript: its idioms, quirks, runtime, and the web platform.

## Layout

```
javascript-copywork-curriculum.md   the plan: phases, topics, checkboxes
reference/                          the listings you READ and copy FROM
  phase-0-env/  phase-1-values/  ...
practice/                           where YOU type your hand-written copies
  phase-0-env/  phase-1-values/  ...
.vscode/settings.json               "copywork mode" — autocomplete/AI/lint off
```

`reference/` and `practice/` mirror each other file-for-file.

## The loop

1. Open a `reference/` listing. Read it until you understand *why* each line is
   there (the comments explain the quirks — those margin notes are the lesson).
2. Open the matching empty file under `practice/` and **type it by hand**. No
   copy-paste. The typing is the point.
3. Run it (see below) and predict the output before you read it.
4. Self-check **by output, not by source text**. The reference's `// expected`
   notes are your answer key — run your copy and confirm it prints the same:
   ```bash
   bun practice/phase-1-values/01-typeof.js
   ```
   To compare mechanically, diff the *output* (comments don't matter this way):
   ```bash
   diff <(bun practice/phase-1-values/01-typeof.js) \
        <(bun reference/phase-1-values/01-typeof.js)
   ```
   (A byte-exact `diff` of the two *files* is a stricter, optional check — it
   asks "did I transcribe every character," and only then do comments count.)
5. Then **change it**. Break it on purpose. Make 3–5 small variations. Check the
   box in the curriculum only when you can write it again from memory.

**On the comments:** you don't have to type them to "pass" — they don't affect
output. But typing the *why*-notes makes you read them, which is half the lesson.
Recommended: type them anyway, but grade yourself on what the program prints.

For the `:reimplement:` exercises (rebuild `map`, `new`, a tiny `Promise`…),
try writing them from the description *before* peeking at the reference. Those
reward a struggle-first pass.

## Running the code

- **Phases 1–5, 7, 8** are plain `.js` and run in any standalone runtime:
  ```bash
  bun reference/phase-1-values/01-typeof.js
  # or: node <file>   /   deno run <file>
  ```
  Every file ends by `console.log`-ing its result, with a `console.assert`
  where it sharpens the point.

- **Phase 6 and the projects** run in the browser (DOM, Web Components, canvas…).
  Those are `.html` files. **ES modules do not load over `file://`** — serve the
  folder first with the included static server:
  ```bash
  bun serve.js     # prints a URL (auto-rolls to a free port if 8000 is busy)
  ```

  Then open, e.g., `http://localhost:8000/reference/phase-6-platform/17-my-counter.html`
  (or the projects under `/reference/projects/`). `serve.js` serves files plainly
  — no bundling — so the browser loads your modules exactly as you typed them.
  `Ctrl-C` to stop; `PORT=3000 bun serve.js` to choose a starting port.

The *curriculum* code is portable web-standard JS — no `Bun.*` APIs — so anything
in Phases 1–5/7/8 also runs unchanged under Node and Deno. (`serve.js` itself is a
dev tool and does use `Bun.serve` on purpose; it isn't part of the copywork.)

## Notes

- Keep a REPL open for one-liners: `bun repl`, `node`, or the browser console.
- Progress and personal notes: jot them right in the curriculum file under each
  phase, or keep a scratch file here.

## License

[MIT](LICENSE) — free to use, copy, and adapt. If you find it useful for your own
re-learning, go for it.
