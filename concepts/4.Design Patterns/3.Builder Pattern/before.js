/**
 * Definition - Useful when object have many interlinking parts or many optional and required fields
 *
 * https://github.com/WebDevSimplified/Design-Patterns/tree/master/Builder%20Pattern
 */

class Address {
  constructor(zip, street) {
    this.zip = zip;
    this.street = street;
  }
}

class User {
  constructor(name, age, phone, address) {
    this.name = name;
    this.age = age;
    this.phone = phone;
    this.address = address;
  }
}

const user = new User(
  "Bob",
  undefined,
  undefined,
  new Address("12345", "Main St.")
);

// Here we have to pass undefined for age , phone if they are optional parameters. This is cumbersome and not feasible for object having too many properties.
// To solve this, we can use builder pattern.
