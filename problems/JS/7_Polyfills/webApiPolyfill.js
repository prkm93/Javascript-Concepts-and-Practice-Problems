/**
 * Polyfill for setTimeout
 *
 *  setTimeout(callback, delay, params)
 */

function createSetTimeOut(callback, delay) {
  const currentTime = Date.now();
  const currentDelay = Date.now() + delay;

  console.log("currentTime", currentTime);
  console.log("currentDelay", currentDelay);
}

createSetTimeOut("", 2000);
