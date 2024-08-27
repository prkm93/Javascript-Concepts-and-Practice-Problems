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

console.log(iterate.next().value); // ravi
console.log(iterate.next().value); // anil
console.log(iterate.next().value); // deepak
console.log(iterate.next().value); // ram
console.log(iterate.next().value); // undefined

// Generators

function* numbersGen() {
  let i = 0;

  while (true) {
    yield i++;
  }
}

const gen = numbersGen();
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
