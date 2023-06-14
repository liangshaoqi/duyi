// 语义版本规范: X.Y.Z[-P] 12.2.3   2.6.8  5.43.1-beta
/**
 * 
 *
 * @param {*} str
 */
function* walk(str) {
  let part = ''
  let terminals = ['.', '-']
  for (let i = 0; i < str.length; i++) {
    // 判断是否是终结符
    if (terminals.includes(str[i])) {
      yield part
      part = ''
    } else {
      part += str[i]
    }
  }
  if (part) {
    yield part
  }
}
const iterator = walk('1.9.9-beta')
for (const item of iterator) {
  console.log(item)
}