// 获取canvas元素
const cvs = document.getElementById('bg');

// 获取窗口尺寸
const width = window.innerWidth,
      height = window.innerHeight;

// 设置canvas尺寸为窗口尺寸
cvs.width = width;
cvs.height = height;

// 获取绘制上下文
const ctx = cvs.getContext('2d');

// 列宽
const columnWidth = 20;

// 列数
const columnCount = Math.floor(window.innerWidth / columnWidth);

// 记录每列写到了第几个文字
const columnNextIndexes = new Array(columnCount);
columnNextIndexes.fill(1);

// 绘制函数
function draw() {
  ctx.fillStyle = 'rgba(240, 240, 240, 0.1)';
  ctx.fillRect(0, 0, width, height);
  const fz = 20;
  ctx.fillStyle = getRandomColor();
  ctx.font = `${fz}px "Roboto Mono"`;
  for (let i = 0; i < columnCount; i++) {
    const x = i * columnWidth;
    const y = fz * columnNextIndexes[i];
    ctx.fillText(getRandomChar(), x, y);
    if (y > height && Math.random() > 0.99) {
      columnNextIndexes[i] = 0;
    } else {
      columnNextIndexes[i]++;
    }
  }
}

// 随机颜色
function getRandomColor() {
  const fontColors = [
    '#33b5e5',
    '#0099cc',
    '#aa66cc',
    '#9933cc',
    '#99cc00',
    '#669900',
    '#ffbb33',
    '#ff8800',
    '#ff4444',
    '#cc0000'
  ];
  return fontColors[Math.floor(Math.random() * fontColors.length)];
}

// 随机文字
function getRandomChar() {
  const str = 'console.log("hello world")';
  return str[Math.floor(Math.random() * str.length)];
}

draw();
setInterval(draw, 40);