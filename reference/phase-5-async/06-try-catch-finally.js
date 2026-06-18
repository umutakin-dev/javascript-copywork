// Phase 5 · 06 — try / catch / finally around awaited code
// await turns a REJECTED promise into a THROWN error, so ordinary try/catch works.
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch

function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) resolve({ id, name: "Umut" });
      else reject(new Error(`invalid id: ${id}`));
    }, 20);
  });
}

async function load(id) {
  try {
    const user = await fetchUser(id);
    console.log("ok:", user.name);
    return user;
  } catch (error) {
    console.log("caught:", error.message); // a rejection arrives here as a throw
  } finally {
    console.log(`finished attempt for id=${id}`); // always runs
  }
}

await load(1); // ok: Umut  /  finished attempt for id=1
await load(-5); // caught: invalid id: -5  /  finished attempt for id=-5
