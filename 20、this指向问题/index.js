function fn1() {
  console.log(this);
}

fn1(); // global全局对象

var obj2 = {
  fn1: fn1
}
obj2.fn1();// obj2这个对象

new fn1();// 新的对象

var obj = {
  fn2: function () {
    console.log(this);
  }
}