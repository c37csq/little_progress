/**
 * 判断一个数是否是奇数
 * @param {number} n 
 */
function isOdd(n) {
  if (typeof n !== 'number') {
    throw new TypeError(`${n} is not a number`);
  }
  return n % 2 === 1 || n % 2 === -1;
}

// a % b 和 a mod b 不一样 在负数情况下不一样
a % b = a - b * (a / b的整数部分)

// a mod b
a mod b = a - b * (a / b 向下取整)