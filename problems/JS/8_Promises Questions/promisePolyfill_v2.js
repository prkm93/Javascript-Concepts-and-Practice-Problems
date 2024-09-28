const STATE = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};

class MyPromise {
  #state = STATE.PENDING;
  #value;
  #thenCallbacks = []; // handles Case 2
  #catchCallbacks = []; // handles Case 4
  #onSuccessBind = this.#onSuccess.bind(this);
  #onFailBind = this.#onFail.bind(this);

  constructor(cb) {
    try {
      // handles Case 0
      cb(this.#onSuccessBind, this.#onFailBind);
    } catch (err) {
      this.#onFail(err);
    }
  }

  #runCallbacks() {
    if (this.#state === STATE.FULFILLED) {
      this.#thenCallbacks.forEach((cb) => {
        cb(this.#value);
      });

      // set to empty since in future when #thenCallbacks called again,
      //it will rerun previous callbacks
      this.#thenCallbacks = [];
    }

    if (this.#state === STATE.REJECTED) {
      this.#catchCallbacks.forEach((cb) => {
        cb(this.#value);
      });

      // set to empty since in future when #catchCallbacks called again,
      //it will rerun previous callbacks
      this.#catchCallbacks = [];
    }
  }

  // resolve
  #onSuccess(val) {
    queueMicrotask(() => {
      // means promise already resolved
      // handles Case 3 (resolves only first resolve statement)
      if (this.#state !== STATE.PENDING) return;

      // case when .then() block of one promise returns another promise
      if (val instanceof MyPromise) {
        val.then(this.#onSuccessBind, this.#onFailBind);
        return;
      }

      this.#value = val;
      this.#state = STATE.FULFILLED;

      this.#runCallbacks();
    });
  }

  // reject
  #onFail(val) {
    // to make it asynchronous, queueMicroTask is used. This ensures straight synchronous code
    // runs first and promise runs after that thus making it asynchronous but still fast.
    // Whenever code successes or fails, it delays execution of code a bit.

    queueMicrotask(() => {
      if (this.#state !== STATE.PENDING) return;

      // case when .then() block of one promise returns another promise
      if (val instanceof MyPromise) {
        val.then(this.#onSuccessBind, this.#onFailBind);
        return;
      }

      // if no catch statement provided but there is reject value in promise
      if (this.#catchCallbacks.length === 0) {
        throw new UncaughtPromiseError(val);
      }

      this.#value = val;
      this.#state = STATE.REJECTED;

      this.#runCallbacks();
    });
  }

  //handles Case 1 and Case 5 (arguments- catchCb and thenCb)
  then(thenCb, catchCb) {
    // handles Case 6(allows chaning of promises)

    return new MyPromise((resolve, reject) => {
      // handles Case 2
      // everytime cb pushed in array, later called in onSuccess
      this.#thenCallbacks.push((result) => {
        // handles Case 7 (if catch block encounters, then resolve immediately with result value)
        if (thenCb == null) {
          // use == here
          resolve(result);
          return;
        }

        try {
          // resolve new promise with returned result of previous promise we called
          resolve(thenCb(result));
        } catch (err) {
          // if error, will go to .catch() with below reject()
          reject(err);
        }
      });

      this.#catchCallbacks.push((result) => {
        if (catchCb == null) {
          reject(result);
          return;
        }

        try {
          resolve(catchCb(result));
        } catch (err) {
          reject(err);
        }
      });

      // sometimes when we call .then on promise, by that time, promise has already finished
      // resolving. So, we immediately need to run callbacks.
      this.#runCallbacks();
    });
  }

  // handles Case 1
  catch(cb) {
    // handles Case 4 (pass catch callback and push to #catchCallbacks)
    return this.then(undefined, cb);
  }

  // handles Case 9
  // finally block returns a promise which fails or succeeds with previous promise value
  finally(cb) {
    return this.then(
      (result) => {
        // finally only executes cb passed to it and not consumes value from previous .thens(),
        // hence pass the result directly to next chained statement
        cb();
        return result;
      },
      (result) => {
        cb();
        throw result;
      }
    );
  }

  static resolve(value) {
    return new MyPromise((resolve) => {
      resolve(value);
    });
  }

  static reject(value) {
    return new MyPromise((resolve, reject) => {
      reject(value);
    });
  }

  //************ Promise.all **************/
  static all(promises) {
    const results = [];
    let resolvedPromises = 0;

    return new MyPromise((resolve, reject) => {
      promises.forEach((promise, idx) => {
        promise
          .then((value) => {
            results[idx] = value;
            resolvedPromises++;

            // we resolve promise only if all promises finished executing
            if (resolvedPromises === promises.length) {
              resolve(results);
            }
          })
          .catch(reject);
      });
    });
  }

  //*************** Promise.allSettled ***************/
  static allSettled(promises) {
    let results = [];
    let settledPromises = 0;

    return new MyPromise((resolve, reject) => {
      promises.forEach((promise, idx) => {
        promise
          .then((val) => {
            results[idx] = { status: STATE.FULFILLED, value: val };
          })
          .catch((err) => {
            results[idx] = { status: STATE.REJECTED, reason: err };
          })
          .finally(() => {
            settledPromises++;
            if (settledPromises === promises.length) {
              resolve(results);
              // we aren't reject method since allSettled never rejects, it will always be resolved
            }
          });
      });
    });
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise) => {
        promise.then(resolve).catch(reject);
      });
    });
  }

  static any(promises) {
    let results = [];
    let rejectedPromises = 0;

    return new MyPromise((resolve, reject) => {
      promises.forEach((promise, idx) => {
        promise.then(resolve).catch((err) => {
          rejectedPromises++;
          results[idx] = err;

          if (rejectedPromises === promises.length) {
            reject(new AggregateError(results, 'All promises were rejected'));
          }
        });
      });
    });
  }
}

class UncaughtPromiseError extends Error {
  constructor(error) {
    super(error);

    this.stack = `(in promise) ${error.stack}`;
  }
}

// Case 0
// const promise12 = new MyPromise((resolve, reject) => {
//   // Code
//   let a = 2;

//   // Case 3 (even if multiple resolve called, once and only 1st will be executed)
//   if (a === 2) {
//     resolve('hi');
//   } else {
//     reject('error');
//   }
// });

// promise12.then((res) => console.log(res)).catch((err) => console.error(err));

// const promise13 = new Promise((resolve, reject) => {

// })

// Case 1
// promise12.then(() => {})
// promise12.catch(() => {})

// Case 2
// promise12.then()
// promise12.then()

// Case 4
// promise12.catch()
// promise12.catch()

// Case 5
// promise12.then(() => {},() => {})

// Case 6 (handles chaining of promises)
// promise12.then().then()

// Case 7 (catch in between then in chaining)
// promise12.then().catch().then()

// Case 8 Asynchronous (Promise always execute asynchronously,
// even it gets executed immediately but before setTimeouts, ie webapi)

// Case 9 finally (finally never takes resolved value of previous promise and hence not passes down
// also the computed value of promise, only passes promise next to it. In this case, .then())
// promise12.then().finally().then()

// Examples - 1
// const fetchProducts = (url) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (url === 'http://www.shoppingproducts.com/products') {
//         resolve({
//           status: 200,
//           statusText: 'OK',
//           data: [
//             {
//               category: "men's clothing",
//               description:
//                 'Your perfect pack for everyday use and walks in the forest.',
//               id: 1,
//               image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
//             },
//           ],
//         });
//       } else {
//         reject({
//           status: 500,
//           data: 'Something went wrong!',
//         });
//       }
//     }, 1500);
//   });
// };

// fetchProducts('http://www.shoppingproducts.com/products')
//   .then((res) => console.log(res))
//   .catch((err) => console.er);

/********** EXAMPLE - 2 ********/

// const asyncPromise = (a) => {
//   return new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//       if (a === 2) {
//         resolve(a * a);
//       } else {
//         reject('a not equal to 2');
//       }
//     }, 2000);
//   });
// };

// asyncPromise(3)
//   .then((res) => console.log(res))
//   .catch((err) => console.error(err));

// asyncPromise(2)
//   .then((res) => {
//     console.log(res);
//     return res;
//   })
//   .then((res) => {
//     console.log(res * res);
//     return res * res;
//   })
//   .then((res) => {
//     throw new Error('Erro in 3rd then');
//   })
//   .catch((err) => {
//     console.error(err);
//   })
//   .finally(() => {
//     console.log('in finally');
//   });

// asyncPromise(4)
//   .then(
//     (res) => {
//       console.log(res);
//       return res;
//     },
//     (err) => console.error(err)
//   )
//   .then((res) => {
//     console.log(res * res);
//   });

// ********** EXAMPLES 3 ***********/

// const promise1 = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     let a = 3;
//     if (a === 2) {
//       resolve(a + a);
//     } else {
//       reject('a not equal to 2');
//     }
//   }, 2000);
// });

// promise1
//   .then((res) => {
//     console.log(res);
//     return res * res;
//   })
//   // .catch(err => console.error(err))
//   .then((res) => {
//     return new MyPromise((resolve, _) => {
//       setTimeout(() => {
//         console.log('res * res 1', res);
//         resolve(res * res);
//       }, 2000);
//     });
//   })
//   .then((res) => {
//     return new MyPromise((resolve, _) => {
//       setTimeout(() => {
//         console.log('res * res 2', res);
//         resolve(res * res);
//       }, 2000);
//     });
//   })
//   .catch((err) => {
//     console.error(err);
//   })
//   .then((res) => {
//     // console.log('res final', res);
//     setTimeout(() => {
//       console.log('res final', res);
//     }, 2000);
//   })
//   .finally(() => console.log('finally'));

// ******** Promise all/allSettled/race/any example ***********

const promiseAll1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    // resolve('all 1 success');
    reject('all 1 failed');
  }, 1000);
});

const promiseAll2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    // resolve('all 2 success');
    reject('all 2 failed');
  }, 2000);
});

const promiseAll3 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    // resolve('all 3 success');
    reject('all 3 failed');
  }, 3000);
});

// MyPromise.all([promiseAll1, promiseAll2, promiseAll3])
//   .then((value) => console.log(value))
//   .catch((err) => console.error(err));

// MyPromise.allSettled([promiseAll1, promiseAll2, promiseAll3])
//   .then((res) => console.log(res))
//   .catch((err) => console.error(err));

// MyPromise.race([promiseAll1, promiseAll2, promiseAll3])
//   .then((res) => console.log(res))
//   .catch((err) => console.error(err));

MyPromise.any([promiseAll1, promiseAll2, promiseAll3])
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
