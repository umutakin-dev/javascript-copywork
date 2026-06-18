// B0 · chat-server.js — a Bun WebSocket broadcast chat server  :reimplement:
//
// Run it:   bun b-web-platform/reference/b0-websockets/chat-server.js
// Then open 02-chat-client.html in TWO browser tabs to chat between them.
//
// Uses Bun's topic pub/sub: each client subscribes to "chat", and messages are
// published to every subscriber. Per-connection data (the username) rides on ws.data.
// Ref: https://bun.sh/docs/api/websockets#pub-sub-with-topics

const PORT = 3002;

const server = Bun.serve({
  port: PORT,
  fetch(req, server) {
    const user = new URL(req.url).searchParams.get("user") || "anon";
    if (server.upgrade(req, { data: { user } })) return; // stash the username on the socket
    return new Response("chat server");
  },
  websocket: {
    open(ws) {
      ws.subscribe("chat");
      ws.publish("chat", JSON.stringify({ type: "join", user: ws.data.user })); // tell others
      ws.send(JSON.stringify({ type: "system", text: `you joined as ${ws.data.user}` }));
    },
    message(ws, message) {
      const payload = JSON.stringify({ type: "msg", user: ws.data.user, text: String(message) });
      ws.publish("chat", payload); // to everyone else…
      ws.send(payload); // …and back to the sender
    },
    close(ws) {
      ws.publish("chat", JSON.stringify({ type: "leave", user: ws.data.user }));
    },
  },
});

console.log(`chat server listening on ws://localhost:${server.port}`);
