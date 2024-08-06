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
  console.log("id settimeout", id, randomRequestTime);
  setTimeout(() => {
    callback("User" + id);
  }, randomRequestTime);
}

// example:
mapLimit([1, 2, 3, 4, 5, 6, 7, 8], 3, getNameById, (allResults) => {
  console.log("allResults", allResults);
  ["User 1", "User 2", "User 3", "User 4", "User 5"]; // depends on which order batched promises are executed
});

// Solution
async function mapLimit(inputs, limit, iterateeFn, callback) {
  // implement here

  // get chopped array
  const choppedList = partitionedArray(inputs, limit);

  let newList = [];
  for (let batch of choppedList) {
    try {
      let response = await new Promise((resolve, reject) => {
        let temp = [];
        batch.forEach((item) => {
          iterateeFn(item, (result) => {
            temp.push(result);
            if (temp.length === batch.length) {
              resolve(temp);
            }
          });
        });
      });
      console.log("response", response);
      newList = [...newList, ...response];

      callback(newList);
    } catch (err) {
      console.error(err);
    }
  }

  // const response = await Promise.all(finalList);
  // callback(response.flat(1));
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

// another method
function mapLimit2(inputs, limit, iterateeFn, callback) {
  const choppedList = partitionedArray(inputs, limit);

  let finalResult = choppedList.reduce((prev, current) => {
    console.log("prev", prev);
    return prev.then((val) => {
      console.log("val", val);
      const promise = new Promise((resolve, reject) => {
        let temp = [];
        current.forEach((elem) => {
          iterateeFn(elem, (result) => {
            console.log("result", result);
            temp.push(result);
            console.log("temp", temp);
            if (temp.length === current.length) {
              console.log("val temp", [...val, ...temp]);
              resolve([...val, ...temp]);
            }
          });
        });
      });
      console.log("promise", promise);
      return promise;
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
