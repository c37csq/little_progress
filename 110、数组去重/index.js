const arr = [
  { a: 1, b: 2 },
  { b: 2, a: 1 },
  { a: 1, b: 2, c: { a: 1, b: 2 } },
  { b: 2, a: 1, c: { b: 2, a: 1 } },
];

const isObject = val => typeof val === 'object' && val !== null;

// 对象数组去重
const newArr = [...arr];

for (let i = 0; i < newArr.length; i++) {
  // 去掉i+1开始后续的值
  for (let j = i + 1; j < newArr.length; j++) {
    if (equals(newArr[j], newArr[i])) {
      // 去掉该值
      newArr.splice(j, 1);
      j--;
    }
  }
}


function equals(val1, val2) {
  if (isObject(val1) && isObject(val2)) {
    const keys1 = Object.keys(val1),
          keys2 = Object.keys(val2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (const k of keys1) {
      if (!keys2.includes(k)) {
        return false;
      }
      if (!equals(val1[k], val2[k])) {
        return false;
      }
    }
    return true;
  } else {
    return val1 === val2;
  }
}

console.log(newArr);