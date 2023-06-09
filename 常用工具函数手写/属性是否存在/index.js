
/**
 * 判断对象中是否存在某个数据
 *
 * @param {Object} obj 对象
 * @param {String} key key名
 * @returns
 */
function hasProperty(obj, key) {
  return key in obj
}

let obj = {
  a: 1,
  b: 2
}
console.log(hasProperty(obj, 'a'))
console.log(hasProperty(obj, 'c'))