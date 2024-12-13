// Polyfill for forEach
// Array.forEach(item, index, array)
let list = [1, 2, 3, 4, 5, 6, 7, 8];

Array.prototype.myForEach = function (cb) {
  for (let index = 0; index < this.length; index++) {
    cb(this[index], index, this);
  }
};

list.myForEach((item, index, array) => console.log("myForEach", item));

// Polyfill for map
// map - returns new array from existing array
// Array.map((num, index, array))

Array.prototype.mymap = function (cb) {
  let temp = [];
  for (let index = 0; index < this.length; index++) {
    temp.push(cb(this[index], index, this));
  }
  return temp;
};

var newArray = list.mymap(function (item, index, array) {
  return item + 5;
});
console.log("myMap", newArray);

// Polyfill for filter
// Filter - Array.filter((item, index, array) => num > 4)

Array.prototype.myFilter = function (cb) {
  let temp = [];
  for (let index = 0; index < this.length; index++) {
    if (cb(this[index], index, this)) {
      temp.push(this[index]);
    }
  }
  return temp;
};

var newList = list.myFilter((item) => item > 4);
console.log("myFilter", newList);

// Polyfill for reduce
// Array.reduce((acc, item, index, array) => {}, initialVal)
// if we dont pass initialVal, then initialVal will be the first element of array

Array.prototype.myReduce = function (cb, initialVal) {
  let accumulator = initialVal;

  for (let index = 0; index < this.length; index++) {
    accumulator = accumulator
      ? cb(accumulator, this[index], index, this)
      : this[index];
  }
  return accumulator;
};

let newVal = list.reduce((acc, item) => acc + item, 0);
console.log("myReduce", newVal);

// Polyfill for call , apply and bind

// Polyfill for call
// call(this, arg1, arg2, arg3....., argN)
// call method calls a function with given this value and arguments provided individually. executes the function immediately as soon as it is called.

let car = {
  name: "Maruti",
  getName: function (color) {
    console.log(`Car name is ${this.name} and car color is ${color}`);
  },
};

let anotherCar = {
  name: "Honda",
};
// car.getName.call(anotherCar, "red");

function getYear(year, color) {
  console.log(
    `Year of manufacture of ${this.name} is ${year} and color is ${color}`
  );
}
// getYear.call(anotherCar, 2005, "red");
// getYear.apply(anotherCar, [2005, 'blue'])
const boundFunc = getYear.bind(anotherCar, 2007, "green");
console.log(boundFunc);

// Polyfill

Function.prototype.myCall = function (context = {}, ...args) {
  if (typeof this !== "function") {
    throw new Error(this + "Its not callable");
  }
  console.log(...args);
  // this - points to function getYear
  context.fn = this; // we are attaching function to object's property
  context.fn(...args); // calling the attached function with arguments
};

getYear.myCall(anotherCar, 1980, "red");

// Polyfill for apply
// apply(this, [arg1, arg2,... argN])
// apply method also calls a function with given this value but it accepts an array of arguments. executes the function immediately as soon as it is called.

Function.prototype.myApply = function (context = {}, args = []) {
  if (typeof this !== "function") {
    throw new Error(this + "Its not callable");
  }

  if (!Array.isArray(args)) {
    throw new Error(args + " is not an array");
  }

  context.fn = this;
  context.fn(...args);
};

// getYear.apply(anotherCar, [1980, "red"]);

getYear.myApply(anotherCar, [2004, "blue"]);

// Polyfill for bind
// bind(this, arg1, arg2, ... , argN)
// bind method creates a new bound function and when it's called it sets this value of the object as 1st argument on which it is called upon and accepts normal arguments
// if additional parameters are passed.

Function.prototype.myBind = function (context = {}, ...args) {
  if (typeof this !== "function") {
    throw new Error(this + "Can't be bound as its not callable");
  }

  context.fn = this;
  return function (...otherArgs) {
    // otherArgs is applicable when arguments are passed in the myBoundFunc after creation and not with context.
    return context.fn(...args, ...otherArgs);
  };
};

const myBoundFunc = getYear.myBind(anotherCar, 2010, "green");
console.log(myBoundFunc);
myBoundFunc();
