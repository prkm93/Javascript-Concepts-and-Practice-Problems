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

asyncSequence(tasks, (error, result) => {
  console.log("error", error);
  console.log("result", result);
});

function asyncSequence(tasks, callback) {
  let results = [];
  let errors = [];
  let completed = 0;

  tasks.forEach((promise) => {
    promise
      .then((res) => {
        results.push(res);
        completed++;
      })
      .catch((err) => {
        errors.push(err);
        completed++;
      })
      .finally(() => {
        if (completed === tasks.length) {
          callback(errors, results);
        }
      });
  });
}
