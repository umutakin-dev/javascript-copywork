// Phase 2 · 18 — Reimplement `new` as a plain function  :reimplement:
// `new Ctor(...args)` does four things; myNew does them explicitly.
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new

function myNew(Ctor, ...args) {
  // 1. Make a new object linked to Ctor.prototype.
  const obj = Object.create(Ctor.prototype);
  // 2. Run the constructor with `this` = the new object.
  const result = Ctor.apply(obj, args);
  // 3. If the constructor returned an OBJECT, use that; otherwise use ours.
  return typeof result === "object" && result !== null ? result : obj;
}

function Point(x, y) {
  this.x = x;
  this.y = y;
}
Point.prototype.sum = function () {
  return this.x + this.y;
};

const p = myNew(Point, 3, 4);
console.log(p.x, p.y); // 3 4
console.log(p.sum()); // 7 — prototype method works, so the link is correct
console.log(p instanceof Point); // true
console.assert(p instanceof Point && p.sum() === 7, "myNew matches real new");
