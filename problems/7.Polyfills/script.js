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
