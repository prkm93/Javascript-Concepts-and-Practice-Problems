/**
 *  Throttling - It is a technique that limits how often a function can be called in given period of time.
 * When a function is called after fixed interval of time, no matter how many keystrokes user perform.
 *
 *
 * ********** USE CASE ***********
 * useful for improving performance and responsiveness of webpage that have event listeners that trigger heavery or expensive operations like
 * animation , resizing, scrolling, mousemove, fetching data
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

const optimisedFunction = throttle(getData, 2000);

window.addEventListener("resize", optimisedFunction);
