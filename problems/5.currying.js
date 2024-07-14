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
