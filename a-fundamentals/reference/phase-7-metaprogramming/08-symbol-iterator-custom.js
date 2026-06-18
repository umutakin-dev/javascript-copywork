// Phase 7 · 08 — Symbol.iterator: make any object work with for...of / spread
// (Revisits Phase 4 · 01 from the "well-known symbols" angle.)
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator

class Deck {
  #cards = ["A", "K", "Q", "J"];

  // A generator method is the shortest way to satisfy the iterator protocol.
  *[Symbol.iterator]() {
    for (const card of this.#cards) yield card;
  }
}

const deck = new Deck();

for (const card of deck) console.log(card); // A K Q J
console.log([...deck]); // ["A","K","Q","J"]  — spread uses Symbol.iterator
const [first, second] = deck; // destructuring uses it too
console.log(first, second); // A K
console.log(Array.from(deck)); // ["A","K","Q","J"]
