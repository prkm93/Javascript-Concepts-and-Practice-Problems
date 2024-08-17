/**
Create a function fetchWithAutoRetry(fetcher, count) which automatically fetch again when error happens, until the maximum count is met.
sample API - https://jsonplaceholder.typicode.com/todos/1
*/

function fetchWithAutoRetry(fetcher, maxRetryCount) {
  return new Promise((resolve, reject) => {
    let retryCount = 0;
    const caller = () =>
      fetcher()
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          if (retryCount < maxRetryCount) {
            retryCount++;
            caller();
          } else {
            reject(error);
          }
        });
    retryCount = 1;
    caller();
  });
}

const fetchData = async () => {
  console.log("retrying");
  const response = await fetch("https://api.gihub.com/users/prkm93", {
    headers: { "Content-Type": "application/json" },
  });
  const jsonResp = await response.json();
  console.log("jsonResp", jsonResp);
  return jsonResp;
};

fetchWithAutoRetry(fetchData, 5);
