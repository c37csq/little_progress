
function processTasks(...tasks) {
  let isRunning = false;
  let i = 0; // 当前任务执行下标
  const result = [];
  let prom = null;
  return {
    start() {
      return new Promise(async (resolve, reject) => {
        if (prom) {
          // 结束了
          prom.then(resolve, reject);
          return;
        }
        if (isRunning) {
          return;
        }
        isRunning = true;
        while (i < tasks.length) {
          try {
            console.log(i, '执行中');
            result.push(await tasks[i]());
            console.log(i, '执行完成');
          } catch(err) {
            isRunning = false;
            reject(err);
            prom = Promise.reject(err);
            return;
          }
          i++;
          if (!isRunning && i < tasks.length - 1) {
            console.log('执行被中断')
            // 中断
            return;
          }
        }
        // 成功
        isRunning = false;
        resolve(result);
        prom = Promise.resolve(result);
      });
    },
    pause() {
      isRunning = false;
    }
  }
}