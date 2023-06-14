/**
 * 从 x 到 y ,数据是否发生变化
 *
 * @param {*} x
 * @param {*} y
 * @returns booolen
 */
function hasChanged(x, y) {
  if (x === y) {
    // 排除+0和-0的情况
    return x === 0 && 1/x !== 1/y
  } else {
    // 排除NaN的情况
    return x === x || y === y
  }
}
let a = {
  a: 1
}
console.log(hasChanged(NaN, NaN))