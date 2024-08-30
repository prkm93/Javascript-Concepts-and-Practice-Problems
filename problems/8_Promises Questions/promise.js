function importantAction(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Subscribe to ${username}`);
    }, 1000);
  });
}

function likeTheVideo(video) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Like the ${video} videos`);
    }, 1000);
  });
}

function subscribeTheVideo(video) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Subscribe the ${video} video`);
    }, 1000);
  });
}

// imp
console.log("start");

importantAction("Coder")
  .then((res) => {
    console.log(res);
    return likeTheVideo("JS Lover");
  })
  .then((res) => {
    console.log(res);
    return subscribeTheVideo("JS Lover");
  })
  .then((res) => {
    console.log(res);
    return res;
  })
  .catch((err) => console.log(err));

console.log("stop");

/**
 * Output
 *   start
 *   stop
 *   Subscribe to JS Lover   , prints after 1 sec each
 *   Like the JS Lover videos
 *   Subscribe the JS Lover video
 * */

Promise.all([
  importantAction("JS Lover"),
  likeTheVideo("JS Questions"),
  subscribeTheVideo("JS Questions"),
])
  .then((res) => console.log(res))
  .catch((err) => console.error(err));

/**
 *  ************* Interview Questions *****************
 */

// Q1

console.log("start");

const promise1 = new Promise((resolve, reject) => {
  console.log(1);
  resolve(2);
});

promise1.then((res) => {
  console.log(res);
});

console.log("stop");

// Q2

console.log("start 2");

const promise2 = new Promise((resolve, reject) => {
  console.log(1);
  console.log(2);
});

promise1.then((res) => {
  console.log(res);
});

console.log("stop 2");

// Prints all the results synchronously. Since no asynchronous code ie resolve/reject, hence it wouldn't go in .then block.

//Q3

console.log("start 3");

const fn = () => {
  return new Promise((resolve, reject) => {
    console.log(1);
    resolve("success");
  });
};

console.log("middle");

fn().then((res) => {
  console.log(res);
});

console.log("stop 3");

// Output

//Q4

function job() {
  return new Promise((resolve, reject) => {
    reject();
  });
}

const promise = job();

promise
  .then(() => console.log(" Success 1"))
  .then(() => console.log(" Success 2"))
  .then(() => console.log(" Success 3"))
  .catch(() => console.log("Error 1"))
  .then(() => console.log(" Success 4"));

// Output
// Any .then after, .catch will execute

// Q5

function job(state) {
  return new Promise(function (resolve, reject) {
    if (state) {
      resolve("Success");
    } else {
      reject("Error");
    }
  });
}

const promise3 = job(true);

promise3
  .then(function (data) {
    console.log(data);

    return job(false);
  })
  .catch(function (error) {
    console.log(error);
    return "Error Caught";
  })
  .then(function (data) {
    console.log(data);
    return job(true);
  })
  .catch(function (error) {
    console.log(error);
  });

// Success, Error, Error caught

// Q6

function job(state) {
  return new Promise(function (resolve, reject) {
    if (state) {
      resolve("Success");
    } else {
      reject("Error");
    }
  });
}

const promise4 = job(true);

promise4
  .then(function (data) {
    console.log(data);
    return job(true);
  })
  .then(function (data) {
    if (data !== "Victory") {
      throw "Defeat";
    }
    return job(true);
  })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (error) {
    console.log(error);
    return job(false);
  })
  .then(function (data) {
    console.log(data);
    return job(true);
  })
  .catch(function (error) {
    console.log(error);
    return "Error Caught";
  })
  .then(function (data) {
    console.log(data);
    return new Error("test"); // not promise
  })
  .then(function (data) {
    console.log("Success: ", data.message);
  })
  .catch(function (data) {
    console.log("Error: ", data.message);
  });
// Success, Defeat, Error, Error Caught,Success: test
