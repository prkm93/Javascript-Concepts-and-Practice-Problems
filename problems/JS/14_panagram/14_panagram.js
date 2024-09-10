const str = "The quick brown fox jumps over a lazy dog";

function checkPanagram(params) {
  const strToCheck = "abcdefghijklmnopqrstuvwxyz";
  const paramsObj = {};

  for (let char of params.toLowerCase()) {
    if (paramsObj[char]) {
      paramsObj[char] += 1;
    } else {
      paramsObj[char] = 1;
    }
  }

  const list = Object.keys(paramsObj).sort().join("").trim();
  console.log("list", list);
  if (list.includes(strToCheck)) {
    return "String is panagram";
  } else {
    return "String isn't panagram";
  }
}

console.log(
  checkPanagram("Watch “Jeopardy!”, Alex Trebek’s fun TV quiz game.")
);
console.log(checkPanagram("The quick brown fox jumps over a lazy dog"));
