function debounce(fn, delay) {
  var timeId;
  return function (...arg) {
    if (timeId) clearTimeout(timeId);
    timerId = setTimeout(() => {
      fn.apply(this, arg);
    }, delay);
  }
}