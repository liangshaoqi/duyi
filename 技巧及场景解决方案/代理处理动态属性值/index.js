const add = new Proxy(
  {
    _store: 0
  }, {
  get(target, propertype, receiver) {
    console.log(target, propertype, receiver)
    // 在 JavaScript 中，toPrimitive 是一个内置函数，它是用来将对象转换为原始值的方法。当对一个对象进行操作时，JavaScript 引擎会尝试将对象转换为原始值，以便进行相应的操作。
    if (propertype === Symbol.toPrimitive) {
      return () => target._store
    }
    target._store += parseInt(propertype)
    return receiver
  }
})
console.log(add[2][3][10] + 100)