// 让以下代码成立
// let [a, b] = {a: 1, b: 2}


// 主要考察让后面的对象可以迭代
// 可迭代协议 [a, b] = [1, 2, 3]
// {
//   [Symbol.iterator]: function () {
//     return 迭代器
//   }
// }
Object.prototype[Symbol.iterator] = function () {
  // 拿到对象的所有属性值,然后通过Symbol.iterator拿到数组的迭代器,并执行返回
  // console.log(Object.values(this)[Symbol.iterator]())
  // 注意这里需要的是将1赋值给a,所有需要的是Object.values,而不是keys,如果写成了keys,则会把字符串a赋值给变量a
  return Object.values(this)[Symbol.iterator]()
}
let [a, b] = {a: 1, b: 2}
console.log(a, b)
