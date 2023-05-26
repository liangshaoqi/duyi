window.onresize = () => {
  console.log('resize')
  func('参数一', '参数二')
}



const func = debounce((param1, param2) => {
  console.log('防抖后重新绘制', param1, param2)
}, 1000)

function debounce(fn, delay) {
  let timer = null
  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}