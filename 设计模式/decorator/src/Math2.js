// 装饰器 --- 给方法添加日志
class Math {
  @log(100) // 方法添加日志输出,并且带参数,对add方法进行每个参数都+100的操作
  add(a, b) {
    return a + b
  }
}
function log(num) {
  return function(target, key, descriptor) {
    let _num = num || 0
    let oldValue = descriptor.value // value ==> add
    // 重写
    descriptor.value = function (...args) {
      args[0] += _num
      args[1] += _num
      console.log(`调用${key}参数`,target, args)
      return oldValue.apply(target, args)
    }
    return descriptor
  }
}

let math = new Math()
console.log(math.add(1, 2))