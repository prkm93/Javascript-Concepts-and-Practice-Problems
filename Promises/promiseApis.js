/*************** PROMISE APIs (METHODS) */

/**
 *
 *  ------ Promise.all
 *
 * Promise.all([p1, p2, p3])
 *              3s, 1s, 2s
 *
 * let each promise takes certain time to finish
 *
 * After 3s, [val1, val2, val3]
 *
 * --- Success Case
 * - Promise.all will make all the API calls in parallel but it will wait for all of them to finish.(waits for all)
 * - will wait for all promies to finish and when last promise finishes, then will return aggregated result for all 3 promises
 *
 * --- Failure Case
 * In case p2 fails after 1s , it will immediately throw error and willn't wait for p1 or p3 to finish
 * In case p3 fails first after 2s, then it will throw error after 2s.
 *
 *
 * --- Summary
 *  - in success case, Promise.all will wait for all the 3 promises to finish and then it will give results.
 *  - in failure case, as soon as any of the promise fails, it will fail whole promise chain. willn't wait for other promises to be success or failure.
 */

/**
 *  ------ Promise.allSettled
 *
 * Promise.allSettled([p1, p2, p3])
 *                     3s, 1s, 2s
 *                         X fails
 * --- Success Case
 *  - The result will be given only after 3s when all the promises gets finished.
 *
 * --- Failure Case
 *  - if p2 gets rejected in 1s, it will still wait for p1 and p3 to finish and then only will give the results
 *       After 3 s - ([val 1, err 2, val 3])
 *
 * --- Summary
 *  -  It will return the results together, only after all the promises are settled though it fails or gets success in between.
 */

/**
 * Difference between .all and .allSettled
 *  -- In .all, if any of the promise fails, it will return the result immediately and stop further execution.
 *  -- In .allSettled, even if any of the promise fails, it will wait for all promise to finish and then return result.
 */
/**
 * ------ Promise.race
 *
 * Promise.race([p1, p2, p3])
 *               3s, 1s, 2s
 *
 * -- After 1s, (val2)
 *
 * -- Success Case
 *  - As soon as p2 is resolved, it will give results of p2.
 *
 * -- Failure Case
 *  -  if p2 fails  after 1s, error will thrown immediately. (error p2)
 *
 *  --- Summary
 *  -
 *  - returns first settled promise (ex - response from API came, no matter success or failure , will be returned)
 *  - kind of all promise races, whichever finished first returns results
 *  - whichever settles first, whether the promise is success or failure, it will return the results.
 *  - it willn't wait for other promises to get settled
 *  - whichever promise takes least time to finish (either success or failure), will return the result after finishing.
 */

/**
 *  -------- Promise.any
 *
 * Promise.any([p1, p2, p3])
 *              3s, 1s, 2s
 *
 * After 1s, (val 2)
 *  -- it will wait for first fulfilled promise(success),
 *  -- if p2 is success, it will return the result.
 *  -- if p2 fails, it will wait for next promise to get success.
 *  -- any is first success seeking API
 *
 *  - it keeps on waiting till it finds first settled success promise
 *
 * -- Failure case
 *  - if all of the promise fails, then it will return aggregated error (array of errors) ([err 1, err 2, err 3])
 */

/**
 * Difference between race and any
 * - Race will return first promise irrespective of either success or failure
 * - .any will return only first success(resolved) settled success promise(not rejected promise)
 */

/**
 *  ********* lingos in promise ***********
 *
 *  -- settled  ==> result of promise
 *
 *  ---- resolve, fulfilled, success --> All same
 *  ---- reject, rejected, failure --> All same
 */
