/**
 * 注册事件
 * @param {HTMLElement} ele 元素
 * @param {string} eventName 事件名
 * @param {Function} handler 时间处理函数
 */
function addEvent1(ele, eventName, handler) {
  if (ele.addEventListener) {
    ele.addEventListener(eventName, handler);
  } else if (ele.attachEvent) {
    ele.attachEvent('on' + eventName, handler);
  } else {
    ele['on' + eventName] = handler;
  }
}

var addEvent2 = (function(ele) {
  if (ele && ele.addEventListener) {
    return function (ele, eventName, handler) {
      ele.addEventListener(eventName, handler);
    }
  } else if (ele && ele.attachEvent) {
    return function (ele, eventName, handler) {
      ele.attachEvent('on' + eventName, handler);
    }
  } else {
    return function (ele, eventName, handler) {
      ele['on' + eventName] = handler;
    }
  }
})();

addEvent2(document, 'click', function () {
  console.log('csq');
});


const request = (function() {
  if (typeof window !== 'undefined') {
    // 浏览器环境
    return (options) => {
      console.log(options, 'browser');
    }
  } else {
    // node环境
    return (options) => {
      console.log(options, 'node');
    }
  }
})()

request({ name: 'csq' })

function removeSpace(str) {
  return str.replace(/\s/, '');
}

const createRemoveSpace = () => {
  const reg = /\s/g,
        replacement = '';
  return (str) => str.replace(reg, replacement);
};

let createSpace = createRemoveSpace();

createSpace('sf sd dfs');
createSpace('sf sd dfs');
createSpace('sf sd dfs');
createSpace = null;