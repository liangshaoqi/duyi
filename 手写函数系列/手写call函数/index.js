/**
  * 手写call函数
  * 不得使用apply,bind 辅助
  * ctx: 上下文
  * args: 参数
**/ 
Function.prototype.myCall = function (ctx, ...args) {
  if (ctx === null || ctx === undefined) {
    ctx = globalThis // 不能直接写window,因为有可能在node环境下运行
  } else {
    ctx = Object(ctx)
  }
  // 这里使用Symbol避免ctx的属性重复
  let key = Symbol('call')
  // 不能直接调用this().如果直接调用this(),相当于直接调用method,method中的this就会指向全局,
  // 以下defineProperty代码是为了解决ctx[key] = this赋值时,会给ctx多添加一个key的问题
  Object.defineProperty(ctx, key, {
    enumerable: false, 
    value: this
  })
  let result = ctx[key](...args) // 这里fn内的this则指向了ctx
  return result
}

function method (a, b) {
  console.log(this, a, b)
  return a + b
}

method.myCall({
  d: 1
}, 1, 2)