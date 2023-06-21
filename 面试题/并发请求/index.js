/**
 * 并发请求
 *
 * @param {string[]} urls 待请求的url数组
 * @param {number} maxNum 最大并发数
 */
function concurRequest(urls, maxNum) {
  return new Promise(resolve => {
    if (urls.length === 0) {
      resolve([])
      return
    }
    const results = []
    let nextIndex = 0 // 下一个请求的下标
    let count = 0 // 已经完成的请求数量
    async function request() {
      if (nextIndex === urls.length) return
      const url = urls[nextIndex] // 现将url保存下来,后续如要再通过nextIndex取的话是下一个的值了
      let current = nextIndex // 当前下标
      nextIndex ++
      try {
        const res = await fetch(url)
        results[current] = res
      } catch(err) {
        results[current] = err
      } finally{
        // 完成后调用下一个请求
        console.log(results)
        // 判断是否所有的请求都完成
        count++
        if (count === urls.length) {
          console.log('请求结束')
          resolve(results)
        }
        request()
        // 
      }
    }
    // 判断最大并发数是否超过urls数组的长度
    let length = maxNum > urls.length ? urls.length : maxNum
    for (let index = 0; index < length; index++) {
      request()
    }
  })
}