/**
 * 可以重试的请求方法
 *
 * @param {*} url
 * @param {*} retryCount 最大重试次数
 */
function request(url, retryCount = 5) {
  let count = 0
  function fn(url) {
    return fetch(url).catch((err) => {
      count++
      if (count === retryCount) {
        // 失败
        return Promise.reject(err)
      } else {
        // 继续
        fn(url)
      }
    })
  }
  return fn(url)
}

function requestBetter(url, retryCount) {
  // return fetch(url).catch((err) => {
  //   if (retryCount <= 0) {
  //     return Promise.reject(err)
  //   } else {
  //     return requestBetter(url, retryCount - 1)
  //   }
  // })
  return fetch(url).catch(() => retryCount <= 0 ? Promise.reject(err) : requestBetter(url, retryCount - 1))
}

request('https://jsonplaceholder_s.typicode.com/todos', 100).then(async (res) => {
  console.log('成功: ', res)
  const json = await res.json()
  
  console.log(json)
}).catch((err) => {
  console.log('失败: ', err)
})