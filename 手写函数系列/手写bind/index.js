Function.prototype.myBind = function (ctx) {
  const fn = this
  // 在函数中谁调用了bind,this就是谁,这里this代表fn
  return function() {
    return fn.apply(ctx, arguments) // 修改this指向ctx
  }
}
function fn (a, b) {
  console.log(this, a, b)
}

// bind第一个参数是this的上下文
let newFn = fn.myBind({})
newFn(1111,22222)