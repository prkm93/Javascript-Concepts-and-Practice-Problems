/******************** Exercises on Generators ********************/

/* Exercise - 1. Create a generator function called "countTo10" that will yield the numbers 0-10(inclusive) then stop.Create the generator object by calling the generator function and iterate through generator using for...of loop
 */

function* countTo10() {
  let i = 0;

  while (i <= 10) {
    yield i++;
  }
}

const counter = countTo10();

console.log("****** Geenrate countTo10 ************");

console.log(counter.next()); // {value: 0, done: false }

for (let count of counter) {
  console.log(count); // logs from 1 .. 10 (not starting from 0 since 0 is already pulled out of generator and exhausted)
}

/********************
 * Exercise - 2. Create a generator function called "randomNumber" that will generate random number infinitely. Use loop to generate 10 random nos
 * using generator object
 */

const randomNumber = function* () {
  while (true) {
    const random = Math.round(Math.random() * 100);
    yield random;
  }
};

const generateRandom = randomNumber();

console.log("****** Geenrate randomNumber ************");

let i = 0;

// while (i < 10) {
//   console.log(generateRandom.next());
//   i++;
// }

// for (let i = 0; i < 10; i++) {
//   console.log(generateRandom.next().value);
// }

let index = 0;
for (const item of generateRandom) {
  console.log(item);
  index++;
  if (index === 10) {
    break;
  }
}

/***************
 * Exercise - 3
    1. Create a generator function called "randomAmountFromRange"
       which has 3 parameters: amount, min, and max

    2. ^ This function will generate the amount of random numbers
       provided as an argument, between the min and max (inclusive)
       Eg: randomAmountFromRange(3, 10, 20) => 13, 12, 19

    3. Create a for...of loop that will loop through the following
       generator objects to test it:
       - randomAmountFromRange(3, 10, 20)
       - randomAmountFromRange(5, 100, 200)
       - randomAmountFromRange(10, 1000, 2000)
*/

const randomAmountFromRange = function* (amount, min, max) {
  for (let i = 0; i < amount; i++) {
    const random = Math.round(Math.random() * (max - min + 1) + min);
    yield random;
  }
};

const generateRandomRange = randomAmountFromRange(3, 10, 20);

console.log("****** Geenrate random range ************");
for (let count of generateRandomRange) {
  console.log(count);
}

console.log("************");
const generateRandomRange1 = randomAmountFromRange(5, 100, 200);
for (let count of generateRandomRange1) {
  console.log(count);
}

console.log("************");
const generateRandomRange2 = randomAmountFromRange(10, 1000, 2000);
for (let count of generateRandomRange2) {
  console.log(count);
}

/*************************************************
 * 
    1. Create a generator function called "getRandomNumber"
       that generates a random number between 1-10 (inclusive)
       exactly 5 times

    2. Create another generator function called "groceryList"

       Inside of "groceryList", create an variable called
       "groceries" that points at:
       ["Avocado", "Cookie", "Milk", "Soup", "Soda"]

       The generator will yield a random grocery from "groceries"
       and also remove that grocery item from the list of "groceries"
       Eg: const groceries = groceryList();
           groceries.next() => "Cookie"
           groceries.next() => "Soup"

    3. Create 2 generator Objects by calling each of the 2
       generator functions above ^

    4. Create a regular for loop that will loop 5 times and calls
       .next() on each of the generator Objects ^ to print out a
       random number followed by a random grocery:
       Eg: 5 Avocado
           10 Soup
*/

const getRandomNumber = function* () {
  let i = 0;
  while (i < 5) {
    yield Math.floor(Math.random() * (10 - 1 + 1) + 1);
    i++;
  }
};

const groceryList = function* () {
  const groceries = ["Avocado", "Cookie", "Milk", "Soup", "Soda"];
  while (groceries.length !== 0) {
    console.log(groceries.length);
    let index = Math.floor(Math.random() * groceries.length);
    yield groceries.splice(index, 1)[0];
  }
};

console.log(
  "**************************** generate random grocery count ******************"
);
const popGrocery = groceryList();
const generateRandomNum = getRandomNumber();

// console.log(popGrocery.next().value);
// console.log(generateRandomNum.next().value);
// console.log(generateRandomNum.next().value);

for (let i = 0; i < 5; i++) {
  console.log(`${generateRandomNum.next().value} ${popGrocery.next().value}`);
}
