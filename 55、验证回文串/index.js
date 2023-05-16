/**
 * 验证回文串
 * 回文串：一个字符串，忽略大小写和非字母数字，正着读和反着读是一样的
 * @param {*} s 
 */
let isPalindrome = function (s) {
  // 判断字符是否是有效字符
  function isValid(c) {
    return (c >= 'a' && c <= 'z') || (c >= '0' && c <= '9');
  }

  let i = 0, j = s.length - 1;
  while (j >= i) {
    const left = s[i].toLowerCase(), 
          right = s[j].toLowerCase();
    if (!isValid(left)) {
      i++;
    } else if (!isValid(right)) {
      j--;
    } else if (left === right) {
      i++;
      j--;
    } else {
      return false;
    }
  }
  return true;
}

const str = 'A man, a plan, a canal: Panama';

console.log(isPalindrome(str));