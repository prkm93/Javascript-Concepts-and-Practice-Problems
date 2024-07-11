// await can only be used inside async function
// async function getData() {
//   return "hello";
// }

// const p = getData();
// console.log(p); // logs promise

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise resolved value 1");
  }, 20000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise resolved value 2");
  }, 30000);
});

async function getData() {
  // JS engine willn't wait for promise to be resolved and will execute next line
  p1.then((res) => console.log(res));
  console.log("I will be executed");
}

getData();

async function handlePromise() {
  console.log("Hello Promises");
  // JS engine was waiting for promise to be resolved
  const val = await p1;
  console.log("async await promise");
  console.log(val);

  const val2 = await p2;
  console.log("async await promise 2");
  console.log(val2);
}

handlePromise();

//*****  How execution works for async await ? ********/
/*  When handlePromise() function is encountered, it begins execution line by line.
 *  JS is synchronous single threaded language
 *
 *  When handlePromise function comes into call stack, it sees there are 2 promises to be resolved.
 *
 *  line 30 , since synchronous, so it will be immediately executed in call stack and popped off. // Hello Promises
 *  line 32, it encounters await p1. So, here handlePromise execution will suspend and move out of call stack. So, it willn't block the main thread.
 *  It will wait for p1 to be resolved which resolves in 5 sec.
 *  After 5 sec, handlePromise function will again come in call stack and start executing where it left at line 33.
 *  line 33, executed immediately.
 *  line 34, promise resolved value will be printed.
 *
 *  line 36, again execution will be suspended and handlePromise will move out of call stack. After promise is resolved after 10 sec, it will come
 *  into call stack again.
 *  line 37, will be executed
 *  line 38, will be executed
 *
 *
 *  NOTE - When the execution will be suspended after encountering promise, it looks like program is waiting.
 *  JS program execution isn't blocked. If there have been other handlers, click events, those willn't be blocked because of this.
 *  Call stack willn't be blocked because of this.
 */

const API_URL = "https://api.github.com/users/prkm93";

async function handleDetail() {
  const data = await fetch(API_URL);
  console.log(await data.json());
}

handleDetail();

/**
 *  Async/await is just syntactical sugar over promises. Behind the scenes, it runs same as promise. JS will treat the program exactly like how
 *  it runs the older way of writing code ie promises. It makes code more easier to read as we don't need to attach then methods and make look
 *  the like synchronous.
 */
