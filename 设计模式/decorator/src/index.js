// 装饰器的实现

// 定义一个圆
class Circle {
  draw() { // 行为
    console.log('画圆')
  }
}

// 使用装饰器额外给圆添加一个边框
class Decorator {
  constructor(circle) {
    this.circle = circle
  }
  draw() { // 自己的绘制方法
    this.circle.draw()
    this.addBorder(this.circle)
  }
  addBorder(circle) {
    // console.log('当前圆信息:', circle)
    console.log('添加一个边框')
  }
}

let circle = new Circle()
let decorator = new Decorator(circle)
decorator.draw()

// 装饰器--注解模式
class Girl {
  @run
  speak() {
    console.log('我会唱歌')
  }
}
// 装饰器 参数
function run (target, key, descriptor) {
  // target ==>Girl对象 key===>被装饰的方法名称(speak) descriptor属性描述符
  console.log('装饰器参数:', target, key, descriptor)
  console.log('我会跑了哦')
}
let girl = new Girl()
girl.speak()
