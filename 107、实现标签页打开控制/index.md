### 跨页面通信
// 创建频道 不同的标签页使用同一个频道 就能相互通信
const channel = new BroadcastChannel('music');

// 发送消息
channel.postMessage({});

// 接收消息
channel.addEventListener('message', () => {
  console.log(e.data);
});

function createId(name) {
  const key = `channel-${name}`;
  const id = +localStorage.getItem(key);
  if (!id) {
    id = 0;
  }
  id++;
  localStorage.setItem(key, id.toString());
  return id;
}

function sendMsg(msg, channel) {
  channel.postMessage({
    id: channel.id,
    msg
  });
}

function createChannel(name) {
  const channel = new BroadcastChannel(name);
  channel.id = createId(name);
  channel.listeners = new Set();
  sendMsg('hi', channel);
  // 卸载
  window.addEventListener('unload', () => {
    sendMsg('unmounted', channel);
  });
  channel.addEventListener('message',e (e) => {
    if (e.data.msg === 'hi') {
      sendMsg('ha', channel);
      channel.listeners.add(e.data.id);
    } else if (e.data.msg === 'ha') {
      channel.listeners.add(e.data.id);
    } else if (e.data.msg === 'unmounted') {
      channel.listeners.delete(e.data.id);
    }
  })
  return channel;
}