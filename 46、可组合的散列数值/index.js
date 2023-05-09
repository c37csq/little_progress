// 可新增
const CREATE = 0b0001; // 1
// 可删除
const DELETE = 0b0010; // 2
// 可修改
const UPDATE = 0b0100; // 4
//可浏览详情
const DETAIL = 0b1000; // 8

// 赋予权限 或运算
const result = CREATE | DETAIL;

// 判断权限 与运算
console.log((result & DETAIL) === DETAIL);

// 删除权限 异或
console.log(result ^ CREATE);