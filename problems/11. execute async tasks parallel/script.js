/**
 * Execute async tasks in sequence
 * Complete asyncSequence function . Error will have count of failed promises and result will have count of passed promises.
 * Both should give output of failed and passed promises as well.
 */

function createAsyncTask() {
  const value = Math.floor(Math.random() * 10);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value < 5) {
        reject(`Error ${value}`);
      } else {
        resolve(value * 1000);
      }
    }, value * 1000);
  });
}

let tasks = [
  createAsyncTask(),
  createAsyncTask(),
  createAsyncTask(),
  createAsyncTask(),
  createAsyncTask(),
  createAsyncTask(),
];

asyncParallel(tasks, (error, result) => {
  console.log("error", error);
  console.log("result", result);
});

// Solution
async function asyncParallel(tasks, callback) {
  const response = await Promise.allSettled(tasks);

  let errors = response
    .filter((outcome) => outcome.status === "rejected")
    .map((outcome) => outcome.reason);

  let results = response
    .filter((outcome) => outcome.status === "fulfilled")
    .map((outcome) => outcome.value);

  callback(errors, results);
}

// when running in parallel, it will output the tasks only after the longest promise finished execution but all promises were started simultaneously.
