function getUser() {
  return fetch(
    'https://my-json-server'
  );
}

function m1() {
  // other works
  return getUser();
}

function m2() {
  // other works
  return m1();
}

function m3() {
  // other works
  return m2();
}

function main() {
  const user = m3();
  console.log(user)
}

function run(func) {
  let cache = [];
  let i = 0;
  const _originFetch = window.fetch;
  window.fetch = (...args) => {
    // 有缓存 交付缓存结果
    if (cache[i]) {
      // 交付缓存结果
      if (cache[i].status === 'fulfilled') {
        return cache[i].data;
      } else if (cache[i].status === 'rejected') {
        throw cache[i].err;
      }
    }
    const result = {
      status: 'pending',
      data: null,
      err: null
    };
    cache[i++] = result;
    // 发送请求
    const prom = _originFetch(...args).then(resp => resp.json()).then(
      resp => {
        result.status = 'fullfilled';
        result.data = resp;
    }, err => {
      result.status = 'rejected';
      result.err = err;
    });
    // 报错
    throw prom;
  }
  try {
    func();
  } catch(err) {
    if (err instanceof Promise) {
      const reRun = () => {
        i = 0;
        func();
      };
      err.then(reRun, reRun);
    }
  }
}

run(main);