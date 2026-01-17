var twoSum = function (nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const compliment = target - nums[i];

    if (map.has(compliment)) {
      return [map.get(compliment), i];
    }
    map.set(nums[i], i);
  }
};

console.log(twoSum([2, 7, 11, 15], 9));
/**
 * i   num[i]   cmp    map
 * 0    3       6-3   (3-> 0)
 * 1.   1       6-1   (1-> 1)
 * 2.   4.      6-4   (4-> 2)
 * 3    3.      6-3.  (3-> 3)
 */

// [3, 1, 4, 3, 2] , target = 6
