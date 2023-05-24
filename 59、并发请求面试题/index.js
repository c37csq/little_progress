
/**
 * 
 * @param {string[]} urls 待请求的url数组
 * @param {number} maxNum 最大并发数
 */
function concurRequest(urls, maxNum) {
  return new Promise((resolve) => {
    if (urls.length === 0) {
      resolve([]);
      return;
    }
    let results = [];
    let index = 0;
    let count = 0;
    async function request() {
      if (urls.length === index) {
        return;
      }
      const i = index;
      const url = urls[index];
      index ++;
      try {
        const res = await fetch(url);
        results[i] = res;
      } catch (err) {
        results[i] = err;
      } finally {
        count++;
        if (urls.length === count) {
          resolve(results);
        }
        request();
      }
    }
    const times = Math.min(urls.length, maxNum);

    for (let i = 0; i < times; i++) {
      request();
    }
  });
}