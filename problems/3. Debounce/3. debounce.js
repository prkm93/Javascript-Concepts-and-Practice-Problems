/**
 * Debouncing is a technique which helps to improve performance of web applications by limiting the frequency of function/API calls.
 * It is a technique which is used to delay the execution of a function until certain amount of time has passed
 * since last time it was called.
 * It helps to prevent repeated function calls that can be expensive or time consuming.
 */

// call func when the difference between 2 keystrokes is greater or equal to delay time
const debounce = (func, delay) => {
  // stores current id/instance of setTimeout
  let timerId = null;

  // args are any arguments passed to function
  return (...args) => {
    // If again keystroke happens, then we should clear the previous function call to prevent execution of func
    if (timerId) clearTimeout(timerId);

    // set timer to execute the func after specified delay
    timerId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

/***
 * ******** USES *******
 * - In searchbox that shows suggestions - If search function is called on every keystroke user inputs, then we would be making too many requests
 *  to server which can slow down the application and waste resources. Debouncing can be used here to to make search only when user stopped typing
 *  for a while before making request.
 */

const inputBox = document.getElementById("search_input");
let counter = 0;

// using without spread and arrow function inside return
const debounced = (fn, delay) => {
  let timer;
  return function () {
    let context = this;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, arguments);
    }, delay);
  };
};

const getData = () => {
  console.log("Data", counter++);
};

const debouncedFunction = debounced(getData, 600);
