// 统计下面字符串中每个字符出现的频率
let str = 'sdhgsuighudyfkkjghnfkdjhgiuwaaaaa'


let obj = {}
function hasProperty (key, obj) {
  return key in obj
}
// 传统方式
function fn1() {
  for (let i=0;i<str.length;i++) {
    if (hasProperty(str[i], obj)) {
      obj[str[i]] ++
    } else {
      obj[str[i]] = 1
    }
  }
}
// fn1()
// reduce方式
function fn2() {
  let arr = str.split('').reduce((accumulator, current) => {
    console.log('返回的值: ', accumulator)
    console.log('当前值: ', current)
    if (accumulator[current]) {
      accumulator[current] ++
    } else {
      accumulator[current] = 1
    }
    return accumulator
  }, {
    // 初始return的值
  })
  console.log('arr:', arr)
}
fn2()
// console.log(obj)