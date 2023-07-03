type BanType<T, E> = T extends E ? never : T;
type BanDate<T> = T extends Date ? never : T;
// x可以是任何类型，但不能是日期
function log<T>(x: BanType<T, Date>) {
  console.log(x);
}
log(new Date());
log(1);
log('asdfasd');