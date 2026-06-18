// Phase 5 · 10 — retry(fn, {attempts, backoff}) with exponential backoff  :reimplement:
// Re-run a flaky async fn, waiting longer between tries (backoff doubles each time).
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

async function retry(fn, { attempts = 3, backoff = 50 } = {}) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await fn(attempt); // success: return immediately
    } catch (error) {
      lastError = error;
      console.log(`attempt ${attempt} failed: ${error.message}`);
      if (attempt < attempts) await sleep(backoff * 2 ** (attempt - 1)); // 10, 20, 40...
    }
  }
  throw lastError; // every attempt exhausted
}

// A fn that fails twice, then succeeds on the 3rd attempt:
let calls = 0;
const flaky = async () => {
  calls += 1;
  if (calls < 3) throw new Error(`fail #${calls}`);
  return "success";
};

console.log("result:", await retry(flaky, { attempts: 5, backoff: 10 }));
console.log("total calls:", calls); // 3
