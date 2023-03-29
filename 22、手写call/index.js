/**
 * 手写call函数
 * 不能使用apply、bind
 */

function method(a, b) {
  console.log(this, a, b);
  return a + b;
}

method.call({}, 2, 3);

Function.prototype.myCall = function (ctx, ...args) {
  // 处理ctx特殊情况
  ctx = (ctx === null || ctx === undefined) ? globalThis : Object(ctx);
  var key = Symbol('temp');
  Object.defineProperty(ctx, key, {
    enumerable: false,
    value: this
  });
  var result = ctx[key](...args);
  delete ctx[key];
  return result;
}

method.myCall({}, 2, 3);