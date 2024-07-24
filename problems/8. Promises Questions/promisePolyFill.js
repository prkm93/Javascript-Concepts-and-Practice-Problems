// Polyfill for Promise

/**
 *
 * There are 2 cases need to handle in promise execution
 * 1) synchronous
 * 2) asynchronous
 */

function PromisePolyfill(executor) {
  let onResolve,
    onReject,
    isFulfilled = false,
    isRejected = false,
    isCalled = false,
    value;

  function resolve(val) {
    isFulfilled = true;
    value = val;
    console.log("onResolve", onResolve);
    if (typeof onResolve === "function") {
      onResolve(val); // this executes when asynchronous code is there in executor ie setTimeout,setInterval, etx
      isCalled = true;
    }
  }

  function reject(val) {
    isRejected = true;
    value = val;

    if (typeof onReject === "function") {
      onReject(val);
      isCalled = true;
    }
  }

  this.then = function (callback) {
    onResolve = callback; // onResolve converts to function after assigning callback
    console.log("then", onResolve);

    if (isFulfilled && !isCalled) {
      // this is for synchronous code execution
      isCalled = true;
      onResolve(value);
    }
    return this;
  };

  this.catch = function (callback) {
    onReject = callback; // onReject converts to function after assigning callback

    if (isRejected && !isCalled) {
      isCalled = true;
      onReject(value);
    }
    return this;
  };

  try {
    executor(resolve, reject);
  } catch (err) {
    reject(err);
  }
}

const examplePromise = new PromisePolyfill((resolve, reject) => {
  setTimeout(() => {
    resolve(2);
  }, 1000);
});

examplePromise
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.error(err));

/* 1) Synchronous execution
*  resolve(2) in PromisePolyfill instance gets executed first and .then after it.

   2) Asynchronous execution
   .then() gets executed first and then resolve(2) after setTimeout expires
 */

PromisePolyfill.resolve = (val) => {
  return new PromisePolyfill((resolve, reject) => {
    resolve(val);
  });
};

PromisePolyfill.reject = (val) => {
  return new PromisePolyfill((resolve, reject) => {
    reject(val);
  });
};

// Polyfill for Promise.all

function PromisePolyfillAll(executor) {
  let onResolve,
    onReject,
    isFulfilled = false,
    isRejected = false,
    isCalled = false,
    value;

  function resolve(val) {
    isFulfilled = true;
    value = val;
    console.log("onResolve", onResolve);
    if (typeof onResolve === "function") {
      onResolve(val); // this executes when asynchronous code is there in executor ie setTimeout,setInterval, etx
      isCalled = true;
    }
  }

  function reject(val) {
    isRejected = true;
    value = val;

    if (typeof onReject === "function") {
      onReject(val);
      isCalled = true;
    }
  }

  this.all = function (promiseList) {
    if (!Array.isArray(promiseList)) {
      throw new Error(`${promiseList} isn't array`);
    }

    promiseList.forEach((item) => {});
    return this;
  };

  this.then = function (callback) {
    onResolve = callback; // onResolve converts to function after assigning callback
    console.log("then", onResolve);

    if (isFulfilled && !isCalled) {
      // this is for synchronous code execution
      isCalled = true;
      onResolve(value);
    }
    return this;
  };

  this.catch = function (callback) {
    onReject = callback; // onReject converts to function after assigning callback

    if (isRejected && !isCalled) {
      isCalled = true;
      onReject(value);
    }
    return this;
  };

  try {
    executor(resolve, reject);
  } catch (err) {
    reject(err);
  }
}
