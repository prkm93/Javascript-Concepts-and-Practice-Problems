// Question - Write a function for currying sum(1)(2)(3)....(n)

function currying(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

// with ES6
const sum = (a) => (b) => b ? sum(a + b) : a;

// without ES5
function sum(a) {
  return function (b) {
    return b ? sum(a + b) : a;
  };
}

sum(1)(2)(3)();

// Another method of implementation

const curry = (mainFunc) => {
  return function curried(...args) {
    // mainFunc.length tells the total number of arguments it will receive as in function declaration
    if (args.length >= mainFunc.length) {
      // will wait until all arguments are collected
      return mainFunc(...args);
    } else {
      // return new function with currently received arguments
      return curried.bind(null, ...args);
    }
  };
};

const totalSum = (a, b, c) => {
  return a + b + c;
};

const curriedTotal = curry(totalSum);
console.log(curriedTotal(1)(2)(3));
