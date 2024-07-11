"use strict";
/*************8 this in global space *************/

this; // defined here will be global scoped
console.log(this); // this in global scope will always have value of window object

// value of this depeneds on JRE (Java Runtime environment) also.
// In nodeJs,value of this will be global.

// Q - What is value of this inside global space.
// A - In client side, it will be window. In nodeJS, it will be global. Basically, it depends on where that piece of code is running.

/***********  this inside a function ************/

function x() {
  // anything defined here will be function scoped
  console.log(this); // window in non strict mode and undefined in strict mode
}

/*********** this in strict mode ************/

// Q - what is value of this inside function ?
// A - value of this keyword is undefined but there is this substition in JS due to which in non strict mode its value
//     will be pointing to global object (window) . So value depends on strict or non strict mode.

/********* this in non strict mode ************/
// this substitution - hence window object

/********** this keyword value also depends on how the function is called (runtime binding) **********/

x(); // undefined (in strict mode)
window.x(); // window object (in strict mode)

// this inside object's method

const obj = {
  a: 10,
  x: function () {
    // x is a method  on obj
    console.log(this);
    console.log(this.a);
  },
};

obj.x();
// logs obj
// logs 10 since this points to the object itself, so this = obj , hence this.a = 10

// Q - What is difference between function and method ?
// A - when function defined is associated with an object then its called method. Methods are functions that are called on objects.
//     Functions can take input arguments and return output values and also called independently.

/************ call, apply, bind methods (sharing methods) ***************/

// Ex -1
const student = {
  name: "pradeep",
  printName: function () {
    console.log(this.name);
  },
};

student.printName();

const student2 = {
  name: "ravi",
};

// call - a method that belongs to Function object. used to invoke a function with specific this value and arguments or method of an object
student.printName.call(student2); // ravi - value of this - student2

//Ex -2
const address = {
  city: "Mumbai",
};

function getAddress(state) {
  console.log(`${this.city} is in ${state}`);
}

const address2 = {
  city: "Kolkata",
};

getAddress.call(address2, "West Bengal"); // Delhi -  call can also be used on function which isn't attached to object

// apply -- used to invoke a function with specified this value and arguments provided as array
function getFullAddress(state, country) {
  console.log(`${this.city} is in ${state}, ${country}`);
}

getFullAddress.apply(address2, ["West Bengal", "India"]);

var numbers = [4, 6, 1, 27, 9, 3, 8, 23, 10];
console.log(Math.max.apply(null, numbers));

// bind - works similar to call with one difference. bind method of function instance creates new instance of
//        function when called on specified this value and the new function need to be invoked. Advantage is we can invoke the
//        newly created function whenever and wherever required. It can take arguments also.

const person = {
  firstName: "John",
  lastName: "Doe",
  getFullName: function () {
    return this.firstName + " " + this.lastName;
  },
};

const member = {
  firstName: "Jane",
  lastName: "Smith",
};

// Borrow the getFullName method from person and bind it to member
const getMemberFullName = person.getFullName.bind(member);

console.log(getMemberFullName()); // Outputs "Jane Smith"

// value of this can be modified by using call, apply and bind. These methods are used to set the value of this in different context.

/***************** this inside arrow function ************/

// this inside nested arrow function

// this inside DOM
