const generator = function* () {
  yield new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(3);
    }, 3000);
  });

  yield new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2);
    }, 2000);
  });

  yield new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });
};

const generatorObj = generator();

// const value = generatorObj.next().value;
// console.log(value);

// for (let promise of generatorObj) {
//   promise.then((res) => console.log(res)).catch((err) => console.log(err)); // logs value in parallel
// }

const getObjectsAsync = async () => {
  for (const promise of generatorObj) {
    const result = await promise;
    console.log(result); // logs value in series
  }
};

// getObjectsAsync();

/****************** Async Generator function ************************/

const asyncGenerator = async function* () {
  yield new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });

  yield new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2);
    }, 2000);
  });
};

const asyncGeneratorObject = asyncGenerator();

console.log(asyncGenerator);
console.log(asyncGeneratorObject); // [[Prototype]]: AsyncGenerator ( not usual generator)

// await can only be used inside async function always

const asyncGeneratorExecuter = async () => {
  for await (const promise of asyncGeneratorObject) {
    const resp = await promise;
    console.log(resp);
  }
};

// asyncGeneratorExecuter();

const asyncCounter = async function* () {
  let i = 0;

  while (true) {
    yield new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(i);
      }, 1000);
    });
    i++;

    // Case 1 - can be terminated by return
    // if (i === 6) {
    //   return;
    // }

    // Case 2 -
    // yield* [2,3,4]
  }
};

const asyncCounterObject = asyncCounter();

const asyncCounterExecuter = async function () {
  for await (let result of asyncCounterObject) {
    console.log("resp", result);
  }
};

asyncCounterExecuter();
