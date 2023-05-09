Object.prototype[Symbol.iterator] = function() {
  return Object.values(this)[Symbol.iterator]();
}

// 让下面代码成立
var [a, b] = { a: 1, b: 2 };

console.log(a, b);
