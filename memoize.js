/* Write a generic memoization function in javascript for below
  ex - const add = (a, b) => a + b
       const multiplyBy10 = n => n * 10;
       const multipleAdd = (a, b , c) => a + b + c;
*/

const memoize = (fn) => {
  const cache = {};

  return (...args) => {
     if (args.toString() in cache) {
      return cache[args.toString()];
    } 

    const result = fn(...args);
    return cache[args.toString()] = result;
  }
}

const memoizedAdd = memoize(add);
console.log(memoizedAdd(2,3));
console.log(memoizedAdd(2,3));
console.log(memoizedAdd(2,3));
console.log(memoizedAdd(3,4));

const memoizedMultiply = memoize(multiplyBy10);
console.log(memoizedMultiply(2));
console.log(memoizedMultiply(2));
console.log(memoizedMultiply(2));
console.log(memoizedMultiply(4));
console.log(memoizedMultiply(4));
console.log(memoizedMultiply(2));

const memoizedMultipleAdd = memoize(multipleAdd);
console.log(memoizedMultipleAdd(2,3,4));
console.log(memoizedMultipleAdd(2,3,4));
console.log(memoizedMultipleAdd(2,3,4));
console.log(memoizedMultipleAdd(5,3,4));
console.log(memoizedMultipleAdd(6,3,4));
console.log(memoizedMultipleAdd(5,3,4));
console.log(memoizedMultipleAdd(2,3,4));
