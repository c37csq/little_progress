// 获取一个随机颜色
function randomColor() {
  var r = Math.floor(Math.random() * 256),
  g = Math.floor(Math.random() * 256),
  b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function randomColor2() {
  return '#' + Math.random().toString(16).substring(2, 8);
}

// rgb(x, x, x)
// #xxxxxx
console.log(randomColor());
console.log(randomColor2());