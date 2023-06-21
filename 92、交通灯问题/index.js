const serial = ['Red', 'Yellow', 'Green'];

function delay(duration = 1000) {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  })
}

class Signal {
  get next() {
    return serial[(serial.indexOf(this.sig) + 1) % serial.length];
  }

  get remain() {
    let diff = this.end - Date.now();
    if (diff < 0) {
      diff = 0;
    }
    return diff / 1000;
  }

  constructor(options) {
    this.sig = options.init;
    this.times = options.times;
    this.eventMap = new Map();
    this.eventMap.set('change', new Set());
    this.eventMap.set('tick', new Set());
    this.setTime();
    this.exchange();
  }

  on(event, handler) {
    this.eventMap.get(event).add(handler);
  }

  off(event, handler) {
    this.eventMap.get(event).delete(handler);
  }

  emit(event) {
    this.eventMap.get(event).forEach(i => {
      i.call(this, this);
    })
  }

  async exchange() {
    await 1;
    if (this.remain > 0) {
      // 不需要切换
      this.emit('tick');
      await delay(1000);
    } else {
      this.sig = this.next;
      this.setTime();
      this.emit('change');
    }
    this.exchange();
  }

  setTime() {
    this.start = Date.now();
    const time = this.times[serial.indexOf(this.sig)];
    this.end = this.start + time * 1000;
  }
}



const s = new Signal({
  init: 'Red',
  times: [10, 3, 5]
});
s.on('tick', (e) => {
  console.log(e.sig, Math.round(e.remain));
})