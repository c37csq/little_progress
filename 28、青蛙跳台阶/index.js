// 循环方式
function fn(n) {
  if (n <= 0) {
    throw new Error('台阶数量必须大于0');
  }
  if (n <= 2) {
    return n;
  }
  var last1 = 2, last2 = 1;
  for (var i = 3; i <= n; i++) {
    last1 = last1 + (last2 = last1);
  }
  return last1;
}

console.log(fn(5));