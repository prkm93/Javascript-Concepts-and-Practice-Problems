// Write a polyfill for compose method which can take multiple functions and execute them (execution starts from right)

function addFive(a) {
  return a + 5;
}

function subtractTwo(a) {
  return a - 2;
}

function multiplyFour(a) {
  return a * 4;
}

const evaluate = compose(addFive, subtractTwo, multiplyFour);
console.log(evaluate(5));

function compose(...functions) {
  return function (args) {
    return functions.reduceRight((arg, func) => func(arg), args);
  };
}
