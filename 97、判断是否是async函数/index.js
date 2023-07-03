/**
 * 判断传入的函数是否标记了async
 */
function isAsyncFunction(func) {
  return func[Symbol.toStringTag] === 'AsyncFunction';
}