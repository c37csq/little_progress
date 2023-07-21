/**
 * 数字转中文
 * @param {number} num 万亿以下的正整数
 */
function toChineseNumber(num) {
  const strs = num
    .toString()
    .replace(/(?=(\d{4})+$)/g, ",")
    .split(",")
    .filter(Boolean);
  const chars = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  const units = ["", "十", "百", "千"];
  const bigUnits = ["", "万", "亿"];
  function _transform(numStr) {
    let result = "";
    for (let i = 0; i < numStr.length; i++) {
      const digit = +numStr[i];
      const c = chars[digit];
      const u = units[numStr.length - 1 - i];
      if (digit === 0) {
        if (result[result.length - 1] !== chars[0]) {
          result += c;
        }
      } else {
        result += c + u;
      }
    }
    if (result[result.length - 1] === chars[0]) {
      result = result.slice(0, -1);
    }
    return result;
  }
  let result = "";
  for (let i = 0; i < strs.length; i++) {
    const part = strs[i];
    const c = _transform(part);
    const u = c ? bigUnits[strs.length - i - 1] : "";
    result += c + u;
  }
  return result;
}

function toChineseBigNumber(num) {
  const str = toChineseNumber(num);
  const map = {
    零: "零",
    一: "壹",
    二: "贰",
    三: "叁",
    四: "肆",
    五: "伍",
    六: "陆",
    七: "柒",
    八: "捌",
    九: "玖",
    十: "拾",
    百: "佰",
    千: "仟",
    万: "萬",
    亿: "亿",
  };
  return str
    .split("")
    .map((s) => map[s])
    .join("");
}

console.log(toChineseNumber(1234001234));

