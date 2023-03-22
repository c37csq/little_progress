var START = BigInt(2 ** 53);
var END = START + 100n;

// 不可预测
for (var i = START; i < END; i++) {
  console.log('loop');
}

console.log(Number.MAX_SAFE_INTEGER + 2);
console.log(Number.MAX_SAFE_INTEGER + 3);
// 结果不连续
