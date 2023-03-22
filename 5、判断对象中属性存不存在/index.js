/**
 * 判断对象中是否存在某个属性
 * @param {Object} obj 对象
 * @param {String} key 属性名
 */
function hasProperty(obj, key) {
  return key in obj;
}
// 不用in可以使用hasPrototypeProperty

// 错误写法一
function hasProperty1(obj, key) {
  return obj[key] !== undefined;
}
// var obj = { a: undefined };
// console.log(hasProperty1(obj)); // false

// 错误写法二
function hasProperty2(obj, key) {
  return Object.keys(obj).includes(key);
}
// var obj = { a: undefined, b: 1 };
// Object.defineProperty(obj, 'c', {
//   enumerable: false,
//   value: 1
// });
// console.log(hasProperty2(obj, 'c')); // false

// 错误写法三
function hasProperty3(obj, key) {
  return obj.hasOwnProperty(key);
}
var obj = { a: undefined, b: 1 };
Object.defineProperty(obj, 'c', {
  enumerable: false,
  value: 1
});
// 原型上的属性判断不出来
console.log(hasProperty3(obj, 'toString')); // false
console.log(hasProperty(obj, 'toString')); // true