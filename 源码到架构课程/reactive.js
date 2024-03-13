
import { handlers } from './handlers.js'
import { isObject } from './utils.js'


const targetMap = new WeakMap() // WeakMap弱引用,外部不在引用的时候会进行垃圾回收

// 响应式
export function reactive(target) {
  // todo: 判断是否是代理,待完成
  if (!isObject(target)) {
    return target
  }
  // 判断缓存
  if (targetMap.has(target)) {
    return targetMap.get(target)
  }
  const proxy = new Proxy(target, handlers)
  targetMap.set(target, proxy)
  return proxy
}

function debounce(fn, time = 1000) {
  let timer
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, time)
  }
}
