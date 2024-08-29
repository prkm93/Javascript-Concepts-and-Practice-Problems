const mySymbol = Symbol();
const namedSymbol = Symbol("monkey");
console.log(mySymbol);
console.log(namedSymbol);

console.log(mySymbol === Symbol()); // false . both are different locations in memory

console.log(mySymbol.description); // undefined
console.log(namedSymbol.description); // monkey
