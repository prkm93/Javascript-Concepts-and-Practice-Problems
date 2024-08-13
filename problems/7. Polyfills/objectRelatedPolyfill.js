/**
 Write a polyfill for Object.create
*/

var obj1 = {
  a: 10,
  value(){
    console.log("Value is ", this.a);
  }
}

/**
Original syntax - var newObj = Object.create(obj1);
Syntax  - Object.create (proto, propertiesObject)
*/

Object.customCreate = function(proto, propertiesObject) {
  if (typeof proto !== 'object' && typeof proto !== 'function') {
    throw new TypeError('Object prototype may only be an Object or null: 10');
  }

  function Func() {}
  Func.prototype = proto;
  const obj = new Func();

  if (propertiesObject !== 'undefined') {
    Object.defineProperties(obj, propertiesObject);
  }
  return obj;
}

var newObj = Object.customCreate(obj1);
console.log("newObj",newObj);

/**
 Write a polyfill for Object.assign
*/

var obj1 = {
 a: 10,
};

var obj2 = {
 b: 20
};

var obj3 = {
b: 60,
d: 40,
e: 50
}

Object.customAssign = function(target, ...sources) {
	if (target === null || target === 'undefined') {
  	throw new TypeError('Cannot convert undefined or null to object');
  }
  const assignedObj = Object(target);

  sources.forEach(source => {
   if (source !== null && source !== 'undefined') {
   	 for (let key in source) {
     	assignedObj[key] = source[key];
     }
   }
  });
  
  return assignedObj;
}

var newResult = Object.customAssign(obj1, obj2, obj3);
console.log("newResult", newResult);
