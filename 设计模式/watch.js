// 观察者设计模式

class Events {
  constructor() {
    this.events = {
      // "商品1": [fn1, fn2],
      // "商品2": [fn1, fn2],
    }
  }
  // 添加订阅
  subscribe(name, fn) {
    // 如果没有
    if (!this.events[name]) {
      this.events[name] = new Set()
    }
    this.events[name].add(fn)
  }
  publish(name) {
    // console.log('发布', name)
    // 拿到对应的name中的fn集合
    const fns = this.events[name]
    for (const fn of fns) {
      fn.apply(this, arguments)
    }
  }
}

const events = new Events()
// 订阅
events.subscribe('商品1', () => {
  console.log('我是订阅商品1的消息回调')
})
events.subscribe('商品2', function(...args) {
  console.log('我是订阅商品2的消息回调', '接收到的数据', args)
})
events.subscribe('商品2', function(...args) {
  console.log('我是订阅商品2的第二个消息回调', '接收到的数据', arguments)
})
// 发布
events.publish('商品2', '价格', '降低1000块')