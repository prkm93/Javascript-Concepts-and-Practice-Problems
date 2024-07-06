const cart = ["shirts", "pants", "kurta"];

// createOrder(cart); // orderId

// I

// PASSING CALLBACK FUNC TO ANOThER FUNCTION
// createOrder(cart, function (orderId) {
//   proceedToPayment(orderId);
// });
// passing proceedToPayment function to createOrder api as callback and waiting for its execution blindly. This is inversion of control
// since it doesn't guarantee that callback will run always. It many run /mayn't run or can run multiple times.

// const promise = createOrder(cart);

// ATTACHING CALLBACK FUNCTION TO A PROMISE OBJECT
// control of program is there
// promise guarantees that it will call the callback function once there is data in promise object and will call it only once.
// promise.then(function (orderId) {
//   proceedToPayment(orderId);
// });

/************** fetch function ************/

// const GITHUB_API = "https://api.github.com/users/prkm93";

// const user = fetch(GITHUB_API);

// console.log(user);
/**
 * Promise {<pending>}
[[Prototype]]
: 
Promise
[[PromiseState]]
: 
"fulfilled"
[[PromiseResult]]
: 
Response
 */

// user.then((data) => console.log(data));

// Promise is an object which represents eventual completion or failure of an asynchronous operation.
// Its basically a returned object to which we can attach callbacks, instead of passing callbacks into a function.
// It eliminates the problem of callback hell and inversion of control which occurs in callback functions.

// function createOrder(cart) {
//   return new Promise((resolve, reject) => {
//     if (!validateCart(cart)) {
//       const err = new Error("Cart isn't valid");
//       reject(err);
//     }
//     const orderID = 12334;
//     if (orderID) {
//       setTimeout(() => {
//         resolve(orderID);
//       }, 3000);
//     }
//   });
// }

// function validateCart(cart) {
//   return true;
// }

// function proceedToPayment(orderId) {
//   return new Promise((resolve, reject) => {
//     resolve("payment successful");
//   });
// }

// const promise = createOrder(cart);

// promise
//   .then((orderID) => {
//     console.log(orderID);
//     // return orderID;
//   })
//   .then((orderID) => proceedToPayment(orderID))
//   .then((response) => console.log(response))
//   .catch((error) => console.log(error.message)); // it catches error if any of the above .then chaining fails or all of the promises fail

// To only catch the error in the first promise, move the catch to just below the first promise

// --- Catch doesn't catches error for the promises below it. Any .then defined below catch will definitely execute.
// promise
//   .then((orderID) => {
//     console.log(orderID);
//     // return orderID;
//   })
//   .catch((error) => console.log(error.message))
//   .then((orderID) => proceedToPayment(orderID))
//   .then((response) => console.log(response));

// promise
//   .then((orderID) => console.log(orderID))
//   .catch((error) => console.log(error))
//   .then(() => console.log("i will definitely execute even after catch"));

// Exercise

function createOrder(cart) {
  return new Promise((resolve, reject) => {
    if (!cart) {
      let error = new Error("cart not found");
      reject(error);
    }
    let orderID = "12452";
    resolve(orderID);
  });
}

function proceedToPayment(orderId) {
  return new Promise((resolve, reject) => {
    if (!orderId) {
      let error = new Error("order Id not found");
      reject(error);
    }
    let paymentInfo = "payment completed successfully";
    resolve(paymentInfo);
  });
}

function showOrderSummary(paymentInfo) {
  return new Promise((resolve, reject) => {
    if (!paymentInfo) {
      let error = new Error("payment failed");
      reject(error);
    }
    let orderSummary = "order is created";
    resolve(orderSummary);
  });
}

function updateWalletBalance(orderSummary) {
  return new Promise((resolve, reject) => {
    if (!orderSummary) {
      let error = new Error("Order Summary not created");
      reject(error);
    }
    let newWalletBalance = 405;
    resolve(newWalletBalance);
  });
}

createOrder(cart)
  .then((orderID) => {
    console.log(orderID);
    return orderID;
  })
  .then((orderId) => {
    return proceedToPayment(orderId);
  })
  .then((paymentInfo) => {
    console.log(paymentInfo);
    return showOrderSummary(paymentInfo);
  })
  .then((orderSummary) => {
    console.log(orderSummary);
    return updateWalletBalance(orderSummary);
  })
  .then((newBalance) => {
    console.log(newBalance);
    return newBalance;
  })
  .catch((error) => console.log(error));

//prooceedToPayment
//showOrderSummary
//updateWallerBalance
