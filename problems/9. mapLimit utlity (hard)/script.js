/**
 * Implement mapLimit, which is a utility function that produces list of outputs by mapping each input through an asynchronous iteratee function.  The  provided limit dictates how many operations can occur at once.
 *
 * Inputs
 * inputs: array of objects
 * limit: maximum number of operations at any one time
 * iterateeFn: The async function that should be called with each input to generate the corresponding output. It will have two arguments:
 *      input: The input being processed
 *      callback: A function that will be called when input is finished processing. It will be provided one argument, the processed output
 * callback: A function that should be called with array of outputs, once all the inputs have been processed.
 */

function getNameById(id, callback) {
  // simulating async request
  const randomRequestTime = Math.floor(Math.random() * 1000) + 2000;

  setTimeout(() => {
    callback("User" + id);
  }, randomRequestTime);
}

// example:
mapLimit([1, 2, 3, 4, 5], 2, getNameById, (allResults) => {
  console.log("allResults", allResults);
  ["User 1", "User 2", "User 3", "User 4", "User 5"];
});

// Solution

async function mapLimit(inputs, limit, iterateeFn, callback) {
  // implement here

  // get chopped array
  const choppedList = partitionedArray(inputs, limit);

  // creating promise and iterating over array
  var newList = choppedList.map((batch) => {
    return new Promise((resolve, reject) => {
      let temp = [];

      // iterating of batched elements
      batch.forEach((item) => {
        iterateeFn(item, (result) => {
          temp = [...temp, result];
          console.log("temp", temp);
          // resolve the promise only once all the batch elements are iterated through async function
          if (temp.length === batch.length) {
            resolve(temp);
          }
        });
      });
    });
  });

  const response = await Promise.all(newList);
  callback(response.flat(1));
}

// create partioned array based on limit
function partitionedArray(inputs, limit) {
  let i = 0;
  let results = [];

  while (i < inputs.length) {
    results.push(inputs.slice(i, i + limit));
    i = i + limit;
  }
  return results;
}

// mapLimit2([1, 2, 3, 4, 5], 2, getNameById, (allResults) => {
//   console.log("allResults", allResults);
//   // ["User 1", "User 2", "User 3", "User 4", "User 5"];
// });

function mapLimit2(inputs, limit, iterateeFn, callback) {
  const choppedList = partitionedArray(inputs, limit);

  let finalResult = choppedList.reduce((prev, current) => {
    return prev.then((val) => {
      return new Promise((resolve, reject) => {
        let temp = [];
        current.forEach((elem) => {
          iterateeFn(elem, (result) => {
            temp.push(result);
            console.log("temp", temp);
            if (temp.length === current.length) {
              resolve([...val, ...temp]);
            }
          });
        });
      });
    });
  }, Promise.resolve([]));
  console.log("finalResult", finalResult);

  finalResult.then((res) => callback(res));
}

// here limit means [[1,2], [3,4], [5]] at a time, 2 elements can be processed.
// means inputs in a single batch can be processed concurrently / parallely -> handle async operation in parallel
// each batch will be processed sequentially -> handle async operation in sequence

/**
 * index ,  calc          , elements
 *  0    , (0+1)%2 => 1   ,
 *  1    , (1+1)%2 ==> 0  ,
 *
 *
 * limit 2,
 * index, elements at index
 * 1    , 0, 1    , 1-2+1 = from 0
 * 3    , 2, 3    , 3-2+1 = from 2
 * 5    , 4, 5    , 5-2+1 = from 4
 *
 * limit 3
 * index, elements at index
 * 2    , 0,1,2
 * 5    , 3,4,5
 * 8    , 6,7,8
 *
 * limit 4
 * index, elements at index
 * 3    , 0,1,2,3
 * 7    , 4,5,6,7
 * 11   , 8,9,10,11
 */
