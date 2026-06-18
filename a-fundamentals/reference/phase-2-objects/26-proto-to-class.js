// Phase 2 · 26 — The SAME type written two ways: prototype vs class
// Proof that `class` is sugar — both produce identical objects and chains.
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes

// --- The old prototype way (like 17–18) ---
function PointProto(x, y) {
  this.x = x;
  this.y = y;
}
PointProto.prototype.norm = function () {
  return Math.hypot(this.x, this.y);
};

// --- The class way ---
class PointClass {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  norm() {
    return Math.hypot(this.x, this.y);
  }
}

const a = new PointProto(3, 4);
const b = new PointClass(3, 4);
console.log(a.norm(), b.norm()); // 5 5 — identical behavior

// In BOTH cases the method lives on the prototype, not the instance:
console.log(Object.hasOwn(a, "norm"), Object.hasOwn(b, "norm")); // false false
console.log(typeof PointProto.prototype.norm, typeof PointClass.prototype.norm); // function function
