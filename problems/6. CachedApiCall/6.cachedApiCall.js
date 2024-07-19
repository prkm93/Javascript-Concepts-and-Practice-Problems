/**
 * Atlassian FrontEnd Interview Question
 *
 * Write a cachedApiCall function which should return cached result if time is less than time passed or fetches fresh data if time is expired.
 */

const call = cachedApiCall(1500);

call("https://jsonplaceholder.typicode.com/todos/1", {}).then((a) =>
  console.log("1", a)
);

setTimeout(() => {
  call("https://jsonplaceholder.typicode.com/todos/1", {}).then((a) =>
    console.log("2", a)
  );
}, 800);

setTimeout(() => {
  call("https://jsonplaceholder.typicode.com/todos/1", {}).then((a) =>
    console.log("3", a)
  );
}, 1700);

const cachedApiCall = (duration) => {
  const cache = {};

  return async (url, config = {}) => {
    const key = `${url}${JSON.stringify(config)}`;

    const entry = cache[key];

    if (!entry || Date.now() > entry.expiry) {
      console.log("making fresh api call");

      try {
        const response = await fetch(url, config);
        const data = await response.json();
        cache[key] = {
          value: data,
          expiry: Date.now() + duration,
        };
      } catch (err) {
        console.error("error while making api call", err);
      }
    }

    return cache[key].value;
  };
};
