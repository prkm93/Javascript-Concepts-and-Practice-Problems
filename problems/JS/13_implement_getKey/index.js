const obj = {
  a: {
    b: {
      c: [1, 2, 3],
    },
  },
};

const obj1 = {
  a: {
    b: {
      c: {
        d: [9, 8, 7, 6],
      },
    },
  },
};

function getKey(obj, searchParam, newString = "") {
  if (typeof searchParam === "string" || Array.isArray(searchParam)) {
    let finalParams;
    if (typeof searchParam === "string") {
      const params = searchParam.split(".");
      const lastItem = params.pop();
      const lastSplittedItem = lastItem
        .split("")
        .filter((item) => item !== "[" && item !== "]");

      finalParams = [...params, ...lastSplittedItem];
    } else {
      finalParams = searchParam;
    }

    let output;

    function returnObject(innerObj) {
      for (let item of finalParams) {
        if (
          typeof innerObj[item] === "undefined" &&
          !Array.isArray(innerObj[item])
        ) {
          continue;
        }

        if (
          typeof innerObj[item] === "object" &&
          !Array.isArray(innerObj[item])
        ) {
          returnObject(innerObj[item]);
        } else if (Array.isArray(innerObj[item])) {
          const num = Number(item);
          output = innerObj[item];
        }
      }
    }

    returnObject(obj);

    const filterParams = filteredParams(finalParams);

    if (filterParams.length > 0) {
      console.log("output", output[filterParams[0]]);
    } else {
      console.log("output", output);
    }

    if (newString.length > 0) {
      if (!Object.keys(obj).includes(searchParam.split(".")[1])) {
        obj[searchParam.split(".")[1]] = newString;
        console.log("output", obj[searchParam.split(".")[1]]);
      }
    }
  }
}

function filteredParams(params) {
  const filterParams = params
    .map((item) => {
      const formatted = Number(item);
      if (!isNaN(formatted)) {
        if (formatted || formatted === 0) {
          return formatted;
        }
      }
    })
    .filter((item) => item !== undefined);
  return filterParams;
}
/* getKey(obj, "a.b.c"); // [1,2,3,]
    getKey(obj, "a.b.c.0"); // 1
    getKey(obj, "a.b.c[1]"); // 2
    getKey(obj, ["a", "b", "c", "2"]); // 3
    getKey(obj, "a.b.c[3]"); // undefined
    getKey(obj, "a.c", "learnWithChirag"); // learnWithChirag */

getKey(obj1, "a.b.c.d"); // [9,8,7,6]
getKey(obj1, "a.b.c.d.0"); // 9
getKey(obj1, "a.b.c.d[2]"); // 7
getKey(obj1, ["a", "b", "c", "d", "3"]); // 6
getKey(obj1, "a.b.c.d[4]"); // undefined
