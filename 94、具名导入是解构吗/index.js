const obj = {
  n: 1,
  increase() {
    this.n++;
  }
};

const { n, increase } = obj;

console.log(n);
increase();
console.log(n);