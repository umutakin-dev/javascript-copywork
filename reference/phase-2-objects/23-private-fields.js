// Phase 2 · 23 — Private fields (#) and a private method
// `#`-members are truly private: a hard syntax-level guarantee, unlike a
// `_name` convention. Invisible and inaccessible outside the class body.
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties

class BankAccount {
  #balance = 0; // private field

  constructor(initial) {
    this.#validate(initial);
    this.#balance = initial;
  }

  #validate(amount) {
    // private method
    if (amount < 0) throw new Error("amount cannot be negative");
  }

  deposit(amount) {
    this.#validate(amount);
    this.#balance += amount;
    return this.#balance;
  }

  get balance() {
    return this.#balance;
  }
}

const acct = new BankAccount(100);
acct.deposit(50);
console.log(acct.balance); // 150

// Reaching a private field from OUTSIDE is a SyntaxError, not a runtime error:
//   acct.#balance        // <-- uncommenting this line won't even parse
console.log("#balance" in acct); // false — it isn't a normal string property
console.assert(acct.balance === 150, "private balance updated via method");
