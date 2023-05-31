let obj = {
  a: 1,
  b: 2
};

// Object.prototype.c = function () {
//   console.log('c');
// }

//要想不能遍历
Object.defineProperty(Object.prototype, 'c', {
  value: function () {
    console.log('c');
  },
  writable: true,
  enumerable: false,
  configurable: true
})

for (let key in obj) {
  console.log(key);
}

// 为什么Object.prototype上其他属性遍历不出来呢

// 属性描述符
const desc = Object.getOwnPropertyDescriptor(Object.prototype, 'c');

const toStringDesc = Object.getOwnPropertyDescriptor(Object.prototype, 'toString');

console.log(desc);

console.log(toStringDesc);
