let obj = {
  a: 1,
  b: 2
}
// Object.prototype.c = function () {
//   console.log('c')
// }
Object.defineProperty(Object.prototype, 'c', {
  value: function () {
    console.log('c')
  },
  enumerable: false
})
for (let key in obj) {
  console.log(key) // 打印出来abc的原因是其他属性的属性描述符不允许遍历,enumerable为false
}
// 属性描述符

// 获取该对象的属性描述
const desc = Object.getOwnPropertyDescriptor(Object.prototype, '__defineGetter__')
const desc_c = Object.getOwnPropertyDescriptor(Object.prototype, 'c')
console.log(desc)
console.log(desc_c)