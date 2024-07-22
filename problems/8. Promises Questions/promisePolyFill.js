// Polyfill for Promise
function PromisePolyfill(executor) {
  let onResolve;

  this.then = function (callback) {
    onResolve = callback;
    return this;
  };
}

const examplePromise = new PromisePolyfill((resolve, reject) => {
  setTimeout(() => {
    resolve(2);
  }, 1000);
});

examplePromise
  .then(() => {
    console.log(res);
  })
  .catch((err) => console.log(err));
