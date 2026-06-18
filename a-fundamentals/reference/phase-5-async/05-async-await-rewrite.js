// Phase 5 · 05 — The callback-hell example, rewritten with async/await
// Same behavior as 01, but flat and readable. `await` unwraps a promise's value.
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

function readThing(name) {
  return new Promise((resolve) => setTimeout(() => resolve(`data:${name}`), 50));
}

async function main() {
  const a = await readThing("a"); // pause until this promise resolves
  const b = await readThing("b"); // then do the next read
  console.log("got", a, "then", b); // got data:a then data:b
  return [a, b];
}

main();
console.log("started (prints before the awaited results)");
