/**
 * 求从1开始的前n个奇数和
 * @param {*} n 
 */
function sum(n) {
  let result = 0;
  for (let i = 0; i < n; i++) {
    result += 2 * i + 1;
  }
  return result;
}


function sum2(n) {
  return n * n;
}