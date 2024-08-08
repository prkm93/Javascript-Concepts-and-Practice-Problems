/**
 * proxied object can be used to prevent the unwanted/invalid update to object properties
 */

const obj = {
  name: "pradeep",
  age: 30,
  gender: "male",
};

const proxiedObj = new Proxy(obj, {
  get(obj, prop) {
    return Reflect.get(obj, prop);
    return obj[prop];
  },
  set(obj, prop, val) {
    if (prop === "gender") {
      if (typeof val !== "string") {
        console.log(`The value for ${[prop]} should be a string`);
      } else {
        Reflect.set(obj, prop, val);
      }
    }
    return true;
  },
});

proxiedObj.gender = 3;
console.log(proxiedObj);

/**
 *  output:-
 * 
 * "The value for gender should be a string"
{
  age: 30,
  gender: "male",
  name: "pradeep"
}
  */
