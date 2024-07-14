// Question - Write a function for currying sum(1)(2)(3)....(n)

function currying(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

var total = currying(1)(2)(3);
