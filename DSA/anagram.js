((s = 'anagram'), (t = 'nagaram'));

var isAnagram = function (s, t) {
  if (s.length !== t.length) return false;

  const freq = {};

  // convert string to object having frequency count of each character
  for (let char of s) {
    freq[char] = (freq[char] || 0) + 1;
  }
  // check if char is available in t,
  for (let char of t) {
    if (!freq[char]) return false;
    freq[char]--;
  }
  return true;
  // if available decrement freq count
  // if not available , return false (not anagram)
};

/**
 * obj = {
 * a: 3,
 * n: 1,
 * g: 1:
 * r: 1,
 * m: 1
 * }
 */
