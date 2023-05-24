let str = 'fgasdfadfdasd';

let result = str.split('').reduce((a, b) => (a[b]++ || (a[b] = 1), a), {});

console.log(result);