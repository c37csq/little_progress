const fileDom = document.querySelector("input[type=file]");
const btn = document.querySelector("button");

// 根据选择文件生成图片对象
function loadImage() {
  const file = fileDom.files[0];
  if (!file) {
    return null;
  }
  const objUrl = URL.createObjectURL(file);
  const img = new Image();
  return new Promise((resolve, reject) => {
    img.onload = () => {
      resolve(img);
    };
    img.onerror = () => {
      resolve(null);
    };
    img.src = objUrl;
  });
}

// 下载生成好的html
function download(html) {
  let blob = new Blob([html], { type: "text/html" });
  let url = window.URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.href = url;
  a.style.display = "none";
  a.download = "demo.html";
  a.click();
}

// 创建div的HTML
function createHTML(width, height, bmp) {
  const shadowCSSFragments = []; // 阴影css的片段
  const shadowCSSHover = []; // 鼠标移入的css阴影
  // 读取每个位图的像素点
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      const i = r * width + c;
      const R = bmp[i * 4],
        G = bmp[i * 4 + 1],
        B = bmp[i * 4 + 2],
        A = bmp[i * 4 + 3] / 255;
      shadowCSSFragments.push(`${c + 1}px ${r}px rgba(${R}, ${R}, ${B}, ${A})`);
      shadowCSSHover.push(
        `${c + 1}px ${r}px rgba(${255 - R}, ${255 - G}, ${255 - B}, ${A})`
      );
    }
  }
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
.shadow-img {
  width: ${width}px;
  height: ${height}px;
}
.shadow-img .inner {
  width: 1px;
  height: 1px;
  box-shadow: ${shadowCSSFragments.join(",")};
  transition: 1.5s;
}
.shadow-img:hover .inner {
  box-shadow: ${shadowCSSHover.join(",")};
}
</style>
</head>
<body>
<div class="shadow-img">
<div class="inner"></div>
</div>
</body>
</html>
  `;
}

async function generate() {
  const img = await loadImage(); // 得到图片对象
  if (!img) {
    return;
  }
  // 将图片画到canvas
  const cvs = document.createElement("canvas");
  cvs.width = img.width;
  cvs.height = img.height;
  const ctx = cvs.getContext("2d");
  ctx.drawImage(img, 0, 0);
  // 获取canvas中的位图
  const bmp = ctx.getImageData(0, 0, img.width, img.height).data;
  const html = createHTML(img.width, img.height, bmp);

  // 下载HTML
  download(html);
}

btn.onclick = generate;
