// Phase 2 · 16 — A minimal event emitter (on / off / emit)  :reimplement:
// The pattern behind DOM events, Node's EventEmitter, and most pub/sub systems.
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures

function createEventEmitter() {
  const listeners = new Map(); // event name -> Set of handler functions

  return {
    on(event, handler) {
      if (!listeners.has(event)) listeners.set(event, new Set());
      listeners.get(event).add(handler);
    },
    off(event, handler) {
      listeners.get(event)?.delete(handler);
    },
    emit(event, ...args) {
      for (const handler of listeners.get(event) ?? []) handler(...args);
    },
  };
}

const bus = createEventEmitter();
const greet = (name) => console.log(`hello ${name}`);

bus.on("greet", greet);
bus.emit("greet", "Umut"); // hello Umut
bus.off("greet", greet);
bus.emit("greet", "nobody"); // (nothing — the handler was removed)
console.log("done");
