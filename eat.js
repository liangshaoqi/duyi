const eatArray = [
  '兰州牛肉面',
  '新疆炒米粉',
  '猪肝面',
  '鸡排饭',
  '秀儿',
  '爱尔眼科食堂',
  '三楼食堂',
  '鸡公煲',
  '冒菜',
  '兵哥豌豆面',
  '豆花饭',
  '羊肉粉',
  '新疆拌面',
  '方便面',
  '云南米线',
  '乌鸡米线',
  '芋儿鸡',
  '肯德基'
]
console.log(eatArray[Math.floor(Math.random() * eatArray.length)])


class EventEmitter {
  constructor() {
    this.eventEmitter = {
      // 'name': [callback1, callback2]
    }
  }
  on(name, callback) {
    if (this.eventEmitter[name]?.length > 0) {
      this.eventEmitter[name].push(callback)
    } else {
      this.eventEmitter[name] = [callback]
    }
  }
  off(name, callback) {
    const callbacks = this.eventEmitter[name]
    // 判断callbacks是否存在callback

    if (callbacks && callbacks.length > 0) {
      callbacks.map((item, i) => {
        if (item === callback) {
          console.log(i)
          callbacks.splice(i, 1)
        }
      })
    }
  }
  emit(name, ...args) {
    this.eventEmitter[name]?.map((callback) => {
      callback(...args)
    })
  }
}

// 创建一个新的 EventEmitter 实例
const emitter = new EventEmitter();

// 添加事件监听器
emitter.on('event1', () => {
  console.log('事件1被触发了！');
});

emitter.on('event2', () => {
  console.log('事件2被触发了！');
});

// 触发事件1
console.log('触发事件1：');
emitter.emit('event1');

// 触发事件2
console.log('触发事件2：');
emitter.emit('event2');

// 删除事件监听器
const callback = () => {
  console.log('我是一个自定义的回调函数！');
};

console.log('添加自定义回调函数：');
emitter.on('event3', callback);

console.log('触发事件3：');
emitter.emit('event3');

console.log('删除自定义回调函数后，再次触发事件3：');
emitter.off('event3', callback);
emitter.emit('event3');