function _runTask(task, callback) {
  let start = Date.now();
  requestAnimationFrame(() => {
    if (Date.now() - start < 16.6) {
      task();
      callback();
    } else {
      _runTask(task, callback);
    }
  })
}


function runTask(task) {
  return new Promise((resolve) => {
    _runTask(task, resolve);
  });
}