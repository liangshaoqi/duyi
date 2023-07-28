const serial = ['red', 'yellow', 'green']
function delay(duration = 1000) {
  return new Promise(resvole => {
    setTimeout(resvole, duration)
  })
}
/**
 *
 *
 * @class Signal
 */
class Signal {
  constructor(options) {
    this.sig = options.init
    this.times = options.times
    this.eventMap = new Map()
    this.eventMap.set('change', new Set())
    this.eventMap.set('tick', new Set())
    this.#setTime()
    this.exchange()
  }
  on(event, handler) {
    this.eventMap.get(event).add(handler)
  }
  off(event, handler) {
    this.eventMap.get(event).delete(handler)
  }
  emit(event) {
    this.eventMap.get(event).forEach((handler) => {
      handler.call(this, this)
    })
  }
  // 获取下一个信号灯
  get next() {
    return serial[(serial.indexOf(this.sig) + 1)%serial.length]
  }
  // 剩余的时间
  get remain() {
    let diff = this.end - Date.now()
    if (diff < 0) {
      diff = 0
    }
    return diff / 1000
  }
  async exchange() {
    await 1
    if (this.remain > 0) {
      // 不需要切换
      this.emit('tick')
      // console.log(this.remain)
      // 
      await delay(1000) // 等待1s
    } else {
      // 切换
      this.sig = this.next
      // 重新记录时间
      this.#setTime()
      this.emit('change')
      console.log('切换了', this.sig)
    }
    this.exchange()
  }
  // 计时
  #setTime() {
    this.start = Date.now()
    const time = this.times[serial.indexOf(this.sig)]
    this.end = this.start + time * 1000
  }
}

const s = new Signal({
  init: serial[0],
  times: [10, 3, 8] // 信号灯间隔
})
s.on('tick', (e) => {
  console.log(e.sig, Math.round(e.remain))
})
