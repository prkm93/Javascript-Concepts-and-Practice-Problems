/**
 *  Throttling - It is a technique that limits how often a function can be called in given period of time.
 *  When a function is called after fixed interval of time, no matter how many actions user perform.
 *
 *
 * ********** USE CASE ***********
 * useful for improving performance and responsiveness of webpage that have event listeners that trigger heavery or expensive operations like
 * animation , resizing, scrolling, mousemove, fetching data, etc.
 */

function throttle(func, delay) {
  let flag = true;
  return (...args) => {
    if (flag) {
      func(...args);
      flag = false;

      setTimeout(() => {
        flag = true;
      }, delay);
    }
  };
}

let i = 0;
const getData = () => {
  console.log("data", i++);
};

const optimisedFunction = throttle(getData, 1000);

window.addEventListener("resize", optimisedFunction);

// Using debouncing on resize

// const debounced = (fn, delay) => {
//   let timer;
//   return function () {
//     let context = this;
//     clearTimeout(timer);
//     timer = setTimeout(function () {
//       fn.apply(context, arguments);
//     }, delay);
//   };
// };

// const optimisedFunction1 = debounced(getData, 1000);

// window.addEventListener("resize", optimisedFunction1);

/***
 *  DIFFERENCE BETWEEN DEBOUNCING AND THROTTLING
 *  - Debouncing - make api call only if difference between keystrokes is greater than the delayed time
 *  - Throttling - make api call only if difference between two function call is greater than delayed time. No matter how many events triggered by users.
 *
 * - ex let user is searching in search input, ex-  user searches realme, then
 *  - In debouncing - the api call will only occur after user stops typing at any keyword. let user types real and stops typing further, then call api after mentioned delay time.
 *  - In throttling - As long as user keeps on triggering events, first api call will occur immediately and subsequent api calls after the mentioned delayed time only and doesn't depend on if user stops typing or triggerring events at any interval of time. if user is typing 20 letters, and api call is supposed to happen every 300 ms , if it takes 2 seconds to type 20 letters, then first api call will occur immediately but subsequent api calls after every 300 ms till 2 second finishes(or user keeps typing)
 *
 *
 * USECASES -
 *  -ex resize -
 *  ---   on resizing, multiple function calls will be made on every resize. To rate limit this, here throttling can be used. function call will be made at fixed interval of time.
 *  --- if debouncing is used in resizing, it will be called only after user slows down resizing or if the difference between two events id greater than the mentioned delay
 *
 *  It depends on usecase what need to be used ? Debouncing or throttlong.
 */

// function currying(a) {
//   return function (b) {
//     return b ? currying(a + b) : b;
//   };
// }

const currying = (a) => (b) => b ? currying(a + b) : a;

var total = currying(1)(2)(3)(4)();
console.log(total);
