// 复制文本
const copyToClipboard = (text) => navigator.clipboard.writeText(text);

// test
copyToClipboard('hELLO wORLD');

// 获取第几天
const dayOfYear = (date) => 
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

// test
console.log(dayOfYear(new Date(2022, 10, 27)));

// 灰度算法

// 将rgb颜色灰度化（基于光感加权平均）
const gray = (r, g, b) =>
  0.2126 * r + 0.7152 * g + 0.0722 * b;


// 解析URL参数
const parseQuery = (url) => {
  q = {};
  url.replace(
    /([^?&=]+)=([^&]+)/g,
    (_, k, v) => (q[k] = v)
  );
  return q;
}

// 对象属性筛选
const pick = (obj, ...props) => 
  Object.fromEntries(
    Object.entries(obj)
            .filter(([k]) => props.includes(k))
  );


// 随机颜色
const randomColor = () => 
    '#' + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0');

// 随机字符串
const randomString = () =>
    Math.random().toString(36).slice(2);

// 去掉字符串中的元素标记
const removeTag = (fragment) =>
    new DOMParser().parseFromString(fragment, 'text/html')
                  .body.textContent || '';

removeTag('<div>Hello World</div>');
