const flatten = (arr) => {
  let result = [];
  if (Array.isArray(arr)) {
    arr.forEach(item => {
    	result = result.concat(flatten(item));
    })
  } else {
  	return arr;
  }
  return result;
}

const arr = [1,2,3,[4,[5,6]],7,8];

let arr1 = [
[1,2],
[3,4],
[5,6,[7,[20, 21],8],9],
[10,11,12], 13, 14
];

/********* Another way ***********/

const flattened = (arr) => {
  return arr.toString().split(",").map(item => Number(item));
}

console.log(flatten(arr));
console.log(flattened(arr1));
