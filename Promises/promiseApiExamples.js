const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve("p1 success");
    reject("p1 fail");
  }, 3000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve("p2 success");
    reject("p2 fail");
  }, 1000);
});

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve("p3 success");
    reject("p3 fail");
  }, 2000);
});

/******** Promise.all  ********/
// Promise.all([p1, p2, p3])
//   .then((result) => {
//     console.log(result); // After 3s, [p1 success, p2 success, p3 success] , when all promise resolves
//   })
//   .catch((error) => {
//     console.error(error); // when p2 rejects, p2 fail after 1s
//   });

/******* Promise.allSettled *******/
// Promise.allSettled([p1, p2, p3])
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => console.error(error));

// -- success
//   [ waited for all the promises to settle first, and then returned array with all the results
//     {
//         "status": "fulfilled",
//         "value": "p1 success"
//     },
//     {
//         "status": "fulfilled",
//         "value": "p2 success"
//     },
//     {
//         "status": "fulfilled",
//         "value": "p3 success"
//     }
// ]

// -- failure
//   [
//     {
//         "status": "fulfilled",
//         "value": "p1 success"
//     },
//     {
//         "status": "fulfilled",
//         "value": "p2 success"
//     },
//     {
//         "status": "rejected",
//         "reason": "p3 fail"
//     }
// ]

/******* Promise.race *******/

// Promise.race([p1, p2, p3])
//   .then((result) => {
//     console.log(result); // p2 success
//   })
//   .catch((error) => console.error(error));

/******** Promise.any *******/

Promise.any([p1, p2, p3])
  .then((result) => console.log(result)) // returns first resolved/success promise
  .catch((error) => {
    console.error(error);
    console.error(error.errors); //gives below array of consolidated errors
    // [
    //     "p1 fail",
    //     "p2 fail",
    //     "p3 fail"
    // ]
  });
// when all promises fail
// --  AggregateError: All promises were rejected
