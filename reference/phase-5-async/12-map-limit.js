// Phase 5 · 12 — mapLimit(items, n, asyncFn): concurrency-limited map  :reimplement:
// Run at most `n` async tasks at once — e.g. fetch 100 URLs, 3 at a time.
//
// Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

async function mapLimit(items, limit, asyncFn) {
  const results = new Array(items.length);
  let nextIndex = 0;

  // A worker keeps grabbing the next index until the queue is empty.
  async function worker() {
    while (nextIndex < items.length) {
      const i = nextIndex++;
      results[i] = await asyncFn(items[i], i);
    }
  }

  // Launch `limit` workers and wait for all of them to drain the queue.
  const workers = Array.from({ length: Math.min(limit, items.length) }, worker);
  await Promise.all(workers);
  return results;
}

let active = 0;
let maxActive = 0;
const task = async (n) => {
  active++;
  maxActive = Math.max(maxActive, active);
  await sleep(20);
  active--;
  return n * 2;
};

const out = await mapLimit([1, 2, 3, 4, 5, 6, 7, 8], 3, task);
console.log("results:", out); // [2,4,6,8,10,12,14,16] — original order preserved
console.log("max concurrent:", maxActive); // 3 — never exceeded the limit
