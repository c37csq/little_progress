// 了解bind
function fn(a, b) {
  console.log(this, a, b);
}

var newFn = fn.bind({});
newFn(2, 3); // {} 2 3

// 手写bind
Function.prototype.myBind = function (ctx) {
  var fn = this;
  return function() {
    return fn.apply(ctx, arguments);
  }
}

var newFn1 = fn.myBind({});
newFn1(2, 3);