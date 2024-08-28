/* Exercise - 2
    1. Create an async Generator function that will yield
       a Promise that resolves after 1 second with a random
       number between 0-9 (integer and inclusive)

    2. Create the generator object by calling the function ^

    3. Use a for-await-of loop to loop through the generator
       indefinitely (ctrl-c to force exit the program)
*/

const asyncGenerator = async function* () {
  while (true) {
    yield new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Math.floor(Math.random() * (9 - 0 + 1)) + 0);
      }, 1000);
    });
  }
};

const asyncGeneratorObj = asyncGenerator();

const asyncGeneratorExecuter = async () => {
  for await (let result of asyncGeneratorObj) {
    console.log(result);
  }
};

// asyncGeneratorExecuter();

/* Exercise - 2
    1. Create an async Generator function that has a 50%
       chance of yielding either of the following Promises:
       - Resolve after 500ms with the value "Fast!"
       - Resolve after 3000ms with the value "Slow!"

    2. Create the generator object by calling the function ^

    3. Use a for-await-of loop to loop through the generator
       indefinitely (ctrl-c to force exit the program)

    *HINT: Math.random() is your friend
*/

const asyncGenerator50 = async function* () {
  while (true) {
    const randomNumber = Math.floor(Math.random() * 10);

    if (randomNumber > 5) {
      yield new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("Fast!");
        }, 500);
      });
    } else {
      yield new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("Slow!");
        }, 3000);
      });
    }
  }
};

const asyncGenObj50 = asyncGenerator50();

const asyncGenExecuter50 = async () => {
  for await (let result of asyncGenObj50) {
    console.log(result);
  }
};

// asyncGenExecuter50();

/* Exercise - 3
    1. Create an async Generator function that has a single
       parameter called "sentence". The function will loop through
       "sentence" letter by letter, and for each letter it will
       yield a Promise that resolves after 100ms that:
       - If the letter is a vowel (aeiou) then resolve with a "*"
       - Otherwise resolve with the letter, but uppercased

    2. Create the generator object by calling the function ^
       with a value of "Monkeys are the coolest animal!"

    3. Use a for-await-of loop to loop through the generator

    *There are MANY ways to check if a string has any of several letters
*/

const sentenceGen = async function* (sentence) {
  const vowels = "aeiou";
  for (let letter of sentence) {
    yield new Promise((resolve, reject) => {
      setTimeout(() => {
        if (vowels.includes(letter)) {
          resolve("*");
        } else {
          resolve(letter.toUpperCase());
        }
      }, 100);
    });
  }
};

const sentenceGenObj = sentenceGen("Monkeys are the coolest animal!");

const asyncSentenceExecuter = async () => {
  let str = "";
  for await (let result of sentenceGenObj) {
    console.log(result);
  }
};

// asyncSentenceExecuter();

/*
    1. Create an async Generator function that has a single
       parameter called "time". This function will yield a
       Promise that resolves with the time taken after that
       many milliseconds. The time for each subsequent Promise
       will take TWICE as long.

    2. Create the generator object by calling the function ^
       with the value 100 to start.

    3. Use a for-await-of loop to loop through the generator
       indefinitely (ctrl-c to force exit the program)

    4. Example output if we started with:
       const timeGeneratorObject = timeGenerator(100)
       for await (const time of timeGeneratorObject)
          - ^ If we logged "time" each loop we'd get:
          - 100, 200, 400, 800, 1600, 3200 ... etc
*/

const promiseTimeGenerator = async function* (time) {
  let i = 1;
  while (true) {
    yield new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(time);
      }, time);
    });
    i = i * 2;
  }
};

const asyncTimerObj = promiseTimeGenerator(100);

const asyncTimerExecuter = async () => {
  for await (let result of asyncTimerObj) {
    console.log(result);
  }
};

// asyncTimerExecuter();
