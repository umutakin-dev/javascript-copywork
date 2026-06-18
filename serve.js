// serve.js — a tiny static file server for this folder, using Bun.
//
// This is a DEV TOOL, not copywork — it's the one place we deliberately use a
// Bun.* API. It serves files plainly (no bundling/transpiling), so the browser
// loads your modules EXACTLY as you typed them.
//
//   Run:   bun serve.js
//   Open:  http://localhost:8000/
//          http://localhost:8000/reference/phase-6-platform/01-select-create-remove.html
//   Stop:  Ctrl-C
//
// Set a different port with:  PORT=3000 bun serve.js
//
// Ref: https://bun.sh/docs/api/http

import { join } from "node:path"; // join() fixes Windows vs URL slash mismatch

// Is something already answering on this port? (A plain bind test is unreliable
// on Windows, where two processes can bind the same port; an HTTP probe isn't.)
async function portInUse(port) {
  try {
    await fetch(`http://127.0.0.1:${port}/`, { signal: AbortSignal.timeout(400) });
    return true; // something responded -> taken
  } catch (err) {
    return err?.name === "TimeoutError"; // refused -> free; timeout -> assume taken
  }
}

// Find the first free port at/after `start`, so a busy 8000 just rolls to 8001.
async function findFreePort(start) {
  let p = start;
  while (await portInUse(p)) p++;
  return p;
}

const requested = Number(Bun.env.PORT ?? 8000);
const port = await findFreePort(requested);
if (port !== requested) {
  console.log(`Port ${requested} was busy — rolled to ${port}.`);
}
const root = import.meta.dir; // serve the folder this script lives in

const server = Bun.serve({
  port,
  async fetch(req) {
    const url = new URL(req.url);
    let pathname = decodeURIComponent(url.pathname);

    // Refuse path traversal — this only ever serves files under `root`.
    if (pathname.includes("..")) {
      return new Response("403 Forbidden", { status: 403 });
    }
    if (pathname.endsWith("/")) pathname += "index.html";

    // join() reconciles the URL's forward slashes with the OS path separator.
    const file = Bun.file(join(root, pathname));
    const found = await file.exists();
    console.log(req.method, pathname, "->", found ? 200 : 404);
    if (found) {
      // Bun infers Content-Type from the extension, so .js => text/javascript,
      // which is what lets <script type="module"> load correctly.
      return new Response(file);
    }
    return new Response(`404 Not Found: ${pathname}`, {
      status: 404,
      headers: { "content-type": "text/plain" },
    });
  },
});

console.log(`Serving ${root}`);
console.log(`→ http://localhost:${server.port}/`);
console.log(`  e.g. http://localhost:${server.port}/reference/phase-6-platform/17-my-counter.html`);
console.log("Ctrl-C to stop.");
