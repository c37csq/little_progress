function raf() {
  requestAnimationFrame(function () {
    // 设置动画，例如改变位置
    raf(); // 继续设置下一帧
  });
}