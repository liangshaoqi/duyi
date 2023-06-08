let divContainer = document.getElementById('container')
let imgWidth = 220 // 每张图片的固定宽度

function createImgs () {
  for (let i = 0; i < 30; i++) {
    let src = 'imgs/' + (i + 1) + '.jpg'
    let img  = document.createElement('img')
    img.onload = setOptions // 每次图片加载成功就重新布局
    img.src = src
    divContainer.appendChild(img)
  }
}

createImgs()

function col () {
  let divWidth = divContainer.clientWidth // 容器宽度
  let columns = Math.floor(divWidth / imgWidth)
  let totalSpace = divWidth - columns * imgWidth
  let space = totalSpace / (columns - 1)
  return {
    space,
    columns
  }
}

col()

function setOptions () {
  let imgs = document.getElementsByTagName('img')
  // 创建一个列数组
  let colArray = new Array(col().columns).fill(0)
  for (let i = 0; i < imgs.length; i++) {
    let height = imgs[i].height
    // colArray中的最短的高度
    let minTop = Math.min(...colArray)
    // 设置top
    imgs[i].style.top = minTop + 'px'
    let index = colArray.indexOf(minTop)
    imgs[i].style.left = (imgWidth + col().space) * index + 'px'
    colArray[index] += height + col().space // 这里就是最高的高度了
    divContainer.style.height = colArray[index] + 'px'
  }
}
window.onload = () => {

  setOptions()
}
let timer = null
window.addEventListener('resize', () => {
  clearTimeout(timer)

  timer = setTimeout(() => {
    setOptions()
  }, 500)
 
})