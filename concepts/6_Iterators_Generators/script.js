// Iterators

const names = ["ravi", "anil", "deepak", "ram"];

function namesIterator(values) {
  let nextIndex = 0;
  return {
    next: function () {
      if (nextIndex < values.length) {
        return {
          value: values[nextIndex++],
          done: false,
        };
      } else {
        return {
          done: true,
        };
      }
    },
  };
}

const iterate = namesIterator(names);

// console.log(iterate.next().value); // ravi
// console.log(iterate.next().value); // anil
// console.log(iterate.next().value); // deepak
// console.log(iterate.next().value); // ram
// console.log(iterate.next().value); // undefined

/*** Generators */

// * converts regular function into generator function
function* numbersGen() {
  // pause here and return the generator
  //   console.log("This is first log");
  yield 1;
  //   console.log("this is after yield 1");
  yield 2;
  yield 3;
  yield 4;
}

const counterGenerator = numbersGen(); //create the generator object

// console.log("counterGenerator", counterGenerator); // it doesn't execute the code for yield and stops at first line

// console.log(counterGenerator.next());
// console.log(counterGenerator.next()); // #38 executes after this
// console.log(gen.next());
// console.log(gen.next());

let counterObject = counterGenerator.next();

while (!counterObject.done) {
  console.log(counterObject.value);
  counterObject = counterGenerator.next();
}

// In generators, code pauses on line until next() isn't called. Javascript pauses the function, keeping its state in memory for it to be executed in future with future.next()
// REgular functions never pause inside block, but generators does.
// Once a generator is exhausted or complete , it only ruturns {value: undefined, done: true }

/***************    ************/
// Printing generator values using loop

for (const count of counterGenerator) {
  console.log(count);
}

console.log("All done"); // this runs synchronously after for loop

// Generators only run once if its exhausted. Ex if we write both while and for loop, the for loop doesn't run as its exhausted after running by while loop.

/****************************** */
const counter = function* () {
  yield 9;
  yield* [8, 7, 6];
  yield 5;
};

const generateObject = counter();

for (const value of generateObject) {
  console.log(value);
}
