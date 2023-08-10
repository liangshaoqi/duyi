const obj = {
  a: 1,
  b: 2,
  c: {
    a: 1,
    b: 2
  }
}

let v = obj.a
Object.defineProperty(obj, 'a', {
  get() {},
  set() {}
})

obj.a = 2
// 使用defineProperty是对每个属性进行递归遍历添加get和set方法来进行监听,无法监听之后添加的数据的改动,因为之后添加的数据没有添加get和set

// Proxy不需要遍历,是产生了新的代理对象,我们操作的是新的对象不是原始对象,所以每次修改都是直接操作新对象,所有修改都能监听到
const proxy = new Proxy(obj, {
  get(target, k) {
    let v = target[k]
    console.log(k, '读取')
    return v
  },
  set(target, k, val) {
    if (target[k] !== val) {
      target[k] = val
      console.log(k, '更改')
    }
  },
})
proxy.a = 2
proxy.a
proxy.aaaaa
