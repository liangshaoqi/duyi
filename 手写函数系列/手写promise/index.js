Promise.myAll = function (proms) {
  let res, rej;
  const p = new Promise((resolve, reject) => {
    res = resolve
    rej = reject
  })
  // 设置p的状态
  let result = []
  let count = 0 // 传进来的迭代器的数量
  let fullFilledCount = 0 // 完成的数量
  for (const prom of proms) {
    const i = count
    count ++
    // 将每一项通过Promise.resolve转成promise
    Promise.resolve(prom).then((data) => {
      // 将成功的数据汇总到result中
      result[i] = data // 使用下标赋值
      // 判断是否全部完成
      fullFilledCount ++ 
      if (fullFilledCount === count) {
        res(result)
      }
    }, rej) // 这里执行reject失败
  }
  if (count === 0) {
    res(result)
  }
  return p
}
// 示例Promise
const p1 = Promise.reject(999);
const p2 = new Promise((resolve) => setTimeout(() => resolve(2), 1000));
const p3 = new Promise((resolve) => setTimeout(() => resolve(3), 500));
Promise.myAll([p1, p2, p3]).then((datas) => {
  console.log(datas)
}).catch((err) => {
  console.log('错误', err)
})