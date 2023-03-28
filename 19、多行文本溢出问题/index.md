### 单行文本溢出
width: 200px;
white-space: nowrap;// 文本不换行
overflow: hidden;// 溢出隐藏
text-overflow: ellipsis;// 溢出打省略号

### 多行文本溢出
width: 200px;
height: 150px;
line-height: 30px;
overflow: hidden;
// 显示省略号
display: -webkit-box;
-webkit-line-clamp: 5;
-webkit-box-orient: vertical;

