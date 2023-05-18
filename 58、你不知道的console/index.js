// 1.打印调试信息 需要开启浏览器调试Verbose
console.debug('God bless me!');

// 谷歌浏览器和log差不多 其他浏览器只是消息展示样式不一样
console.info('night gathers');

// 表格
console.table([
  {
    first: 'sss'
  },
  {
    first: 'ccc',
    birthday: '1999'
  },
  {
    first: 'Henri',
    last: 'Matisse'
  }
])

// 分组
// console.group('Package');
console.groupCollapsed('Package');

console.log('Open box');
console.log('Put elephant in');

console.groupEnd('Package');

// 打印对象结构
console.dir(document.body);

// 计时
// console.time('loop');
// const start = Date.now();
// while (Date.now() - start < 2000) {}
// console.timeEnd('loop');

// 计数
const start = Date.now();
while (Date.now() - start < 20) {
  console.count('loop');
}
console.countReset('loop');

// 堆栈
function b() {
  console.trace();
}
function a() {
  b();
}

a();

// 断言
function sum(a, b) {
  return a + b;
}
console.assert(sum(1, 2) === 3);

// 打印警告
console.warn('ssss');

// 打印错误
console.error('ccc')

// 清空消息
console.clear();

// 给消息添加样式
const styles = `
padding: 5px;
background-color: #90442e;
color: white;
font-style: italic;
border: 5px solid #e06e3c;
font-size: 2em;
`;
console.log('%cVariety is the spice of life', styles);