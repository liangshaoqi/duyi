// 代理设计模式

// 声明女孩对象
const Girl = function(name, address) {
  this.name = name // 名字
  this.address = address // 地址
}

// 用户(真实对象)
const User = function(girl) {
  // 女孩
  this.girl = girl
  // 赠送方法send,属于行为
  this.send = (gift) => {
    console.log(`去${this.girl.address}给${this.girl.name}送${gift}`)
  }
}

// 代理对象 花店员工
const ProxyObj = function (girl) {
  this.girl = girl
  this.send = (gitf) => {
    (new User(girl)).send(gitf)
  }
}
// 代理模式特点: 代理对象与真实对象拥有相同行为
let girl = new Girl('lili', '成都')
let proxyObj = new ProxyObj(girl)
proxyObj.send('玫瑰花')