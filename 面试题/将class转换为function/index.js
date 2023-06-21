// 将下面的代码转为普通构造函数的写法
class Example {
  constructor(name) {
    this.name = name
  }
  func () {
    console.log(this.name)
  }
}

let e = new Example('agv')
for (const key in e) {
  console.log(key) // 打印出来的没有func,所以下面需要考虑不能迭代
}

// 以下是转换代码

'use strict'
function Example(name) {
  // 验证this的指向
  if (!(this instanceof Example)) {
    throw new Error('请通过new创建')
  }
  // 这个和上面一样,是es6的语法
  // if (!new.target) {
  //   throw new Error('请通过new创建')
  // }
  this.name = name
}

Object.defineProperty(Example.prototype, 'func', {
  value: function () {
    // 不可通过new调用
    if (this instanceof Example) {
      throw new Error('不能通过new创建')
    }
    console.log(this.name)
  },
  enumerable: false // 不可迭代(枚举)
})
// Example.prototype.func = function () {
//   console.log(this.name)
// }

let a = new Example('aaaa')
// Example('aaaa').func()
a.func()