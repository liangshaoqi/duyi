// 装饰器 --- 给方法添加日志
class Math {
  @log
  add(a, b) {
    return a + b
  }
}
function log(target, key, descriptor) {
  let oldValue = descriptor.value // value ==> add
  // 重写
  descriptor.value = function () {
    console.log(`调用${key}参数`,target, arguments)
    return oldValue.apply(target, arguments)
  }
  return descriptor
}
let math = new Math()
math.add(1, 2)