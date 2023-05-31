// 将下面代码转化为普通构造函数的写法
class Example {
  constructor(name) {
    this.name = name;
  }
  func() {
    console.log(this.name);
  }
}

let e = new Example('c37');
new e.func('c37')
