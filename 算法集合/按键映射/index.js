const map = [
  ,, 'abc', 'def','ghi','jkl', 'mno','pqrs','tuv','wxyz'
]

/**
 * 根据数字按键返回所有的字母排列组合
 * 用前一个组合好的数组再去组合后面的
 * @param {*} digits 数字按键,例如: '23'
 * @returns {string[]} 按键所有的排列组合
 */
function keyboardMap(digits) {
  let result = []
  for (let i = 0; i < digits.length; i++) {
    // 用组合后的上一次结果和后面一项进行再次组合
    result = _compose(result, map[digits[i]])
  }
  return result
}
function _compose(arr1, arr2) {
  let r = []
  if (arr1.length === 0) return arr2
  if (arr2.length === 0) return arr1
  for (let i = 0; i< arr1.length; i++) {
    for (let j = 0; j< arr2.length; j++) {
      r.push(arr1[i] + arr2[j])
    }
  }
  return r
}
// keyboardMap('2339876')

console.log(keyboardMap('2345'))