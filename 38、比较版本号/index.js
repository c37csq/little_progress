function* walk(str) {
  let part = '';
  let terminals = ['.', '-'];
  for (var i = 0; i < str.length; i++) {
    if (terminals.includes(str[i])) {
      // 终结符
      yield part;
      part = '';
    } else {
      part += str[i];
    }
  }
  if (part) {
    yield part;
  }
}
const iterator = walk('1.5.6-alpha.1');
for (const item of iterator) {
  console.log(item);
}