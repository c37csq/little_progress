// 数组去重

/**
 * 数组去重
 * 原始值使用严格相等比较
 * 对象值递归比较所有属性，属性数量和属性名称必须一致
 * 数组中的对象均为plain object
 * @param {Array} arr
 * @return {Array} 
 */
// 完全手写去重过程
function uniqueArray(arr) {
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    var isFind = false;
    for (var j = 0; j < result.length; j++) {
      if (equals(result[j], arr[i])) {
        isFind = true;
        break;
      }
    }
    if (!isFind) {
      result.push(arr[j]);
    }
  }
  return result;
}

function equals(v1, v2) {
  
}