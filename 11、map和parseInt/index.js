console.log(['1', '2', '3'].map(parseInt));
// [1, NaN, NaN]

console.log(['0b11', '0x12', '013'].map(parseInt));
// [0, NaN, 1]