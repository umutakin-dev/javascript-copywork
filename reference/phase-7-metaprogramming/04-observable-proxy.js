// Phase 7 · 04 — A tiny observable: Proxy + subscribers (poor man's reactivity)
// Every framework's "reactive state" is a more elaborate version of this.
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy

function observable(initial) {
  const subscribers = new Set();
  const state = new Proxy(initial, {
    set(target, prop, value, receiver) {
      const ok = Reflect.set(target, prop, value, receiver);
      for (const fn of subscribers) fn(prop, value); // notify AFTER setting
      return ok;
    },
  });
  return {
    state,
    subscribe(fn) {
      subscribers.add(fn);
      return () => subscribers.delete(fn); // returns an unsubscribe handle
    },
  };
}

const { state, subscribe } = observable({ count: 0 });

const unsubscribe = subscribe((prop, value) => console.log(`${prop} -> ${value}`));

state.count = 1; // count -> 1
state.count = 2; // count -> 2
unsubscribe();
state.count = 3; // (silent — we unsubscribed)
console.log("final:", state.count); // 3
