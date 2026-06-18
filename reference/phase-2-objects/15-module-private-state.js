// Phase 2 · 15 — A "module" with truly private state, via closure only
// No classes, no # fields — just a factory that returns a public interface.
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures

function createBankAccount(initial = 0) {
  let balance = initial; // unreachable from outside — no property exposes it

  return {
    deposit(amount) {
      if (amount <= 0) throw new Error("deposit must be positive");
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      if (amount > balance) throw new Error("insufficient funds");
      balance -= amount;
      return balance;
    },
    get balance() {
      return balance; // a read-only window onto the private variable
    },
  };
}

const acct = createBankAccount(100);
acct.deposit(50);
acct.withdraw(30);
console.log(acct.balance); // 120

// There is no acct._balance to reach or corrupt — the variable is truly hidden.
console.log("can you see a raw balance field?", "_balance" in acct); // false
console.assert(acct.balance === 120, "private balance tracked correctly");
