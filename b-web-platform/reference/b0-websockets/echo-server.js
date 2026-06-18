// B0 · echo-server.js — a Bun WebSocket echo server  :reimplement:
//
// Run it:   bun b-web-platform/reference/b0-websockets/echo-server.js
// Then open 01-echo-client.html (served via `bun serve.js`) in a browser.
//
// This is SERVER-side code — the one place Track B leaves the browser, so it uses
// Bun.serve on purpose. It echoes back whatever a client sends (text OR binary).
// Ref: https://bun.sh/docs/api/websockets

const PORT = 3001;

const server = Bun.serve({
  port: PORT,
  fetch(req, server) {
    // Try to upgrade HTTP → WebSocket; if it isn't an upgrade, send a plain page.
    if (server.upgrade(req)) return;
    return new Response(`WebSocket echo server — connect with ws://localhost:${PORT}`);
  },
  websocket: {
    open(ws) {
      console.log("client connected");
      ws.send("welcome to the echo server");
    },
    message(ws, message) {
      ws.send(message); // echo it straight back (string or Uint8Array)
    },
    close() {
      console.log("client disconnected");
    },
  },
});

console.log(`echo server listening on ws://localhost:${server.port}`);
