/**
 Write a polyfill for Object.create
*/

const obj1 = {
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
