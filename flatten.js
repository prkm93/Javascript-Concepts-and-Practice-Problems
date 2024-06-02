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

console.log(flatten(arr));
