/**
 * 从x到y，数据是否发生了变化
 */
function hasChanged(x, y) {
  // x和y相等 还需要排除+0和-0的情况
  if (x === y) {
    return x === 0 && 1 / x !== 1 / y;
  } else {
    // 排除NaN
    return x === x || y === y;
  }
}