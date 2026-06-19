// B5 · signaling-server.js — a minimal Bun WebSocket signaling relay  :reimplement:
//
// Run:  bun b-web-platform/reference/b5-signaling/signaling-server.js
// Then open 01-call.html in two tabs (same ?room=…) for a real peer-to-peer call.
//
// Signaling is just message-passing: the server relays SDP offers/answers and ICE
// candidates between the (up to two) peers in a "room" — it never looks inside.
// It also tells the SECOND peer to join that it should be "polite" (for the perfect-
// negotiation collision handling on the client).
// Ref: https://bun.sh/docs/api/websockets#pub-sub-with-topics

const PORT = 3003;
const counts = new Map(); // room -> number of peers

const server = Bun.serve({
  port: PORT,
  fetch(req, server) {
    const room = new URL(req.url).searchParams.get("room") || "default";
    if (server.upgrade(req, { data: { room } })) return;
    return new Response("signaling server");
  },
  websocket: {
    open(ws) {
      const room = ws.data.room;
      const n = counts.get(room) ?? 0;
      ws.data.polite = n > 0; // first peer = impolite, second = polite
      counts.set(room, n + 1);
      ws.subscribe(`room:${room}`);
      ws.send(JSON.stringify({ type: "ready", polite: ws.data.polite }));
      console.log(`peer joined room "${room}" (polite=${ws.data.polite}, peers=${n + 1})`);
    },
    message(ws, message) {
      ws.publish(`room:${ws.data.room}`, message); // relay verbatim to the other peer
    },
    close(ws) {
      counts.set(ws.data.room, Math.max(0, (counts.get(ws.data.room) ?? 1) - 1));
      ws.publish(`room:${ws.data.room}`, JSON.stringify({ type: "bye" }));
    },
  },
});

console.log(`signaling server on ws://localhost:${server.port}`);
