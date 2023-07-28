const imgs = [
  '../../公用images/25.jpg',
  '../../公用images/26.jpg',
  '../../公用images/27.jpg',
  '../../公用images/28.jpg',
  '../../公用images/29.jpg',
]

const scrollContainer = document.querySelector('.scroll-container')
let currentIndex = 0 // 当前图片的下标

function createItem(index) {
  const imgUrl = imgs[index]
  const item = document.createElement('div')
  item.classList.add('item')
  item.innerHTML = `<img src="${imgUrl}" alt="" />`
  scrollContainer.appendChild(item)
  return item
}
function resetElement() {
  scrollContainer.innerHTML = ''
  const prevIndex = currentIndex - 1 < 0 ? imgs.length - 1 : currentIndex - 1
  const nextIndex = currentIndex + 1 > imgs.length - 1 ? 0 : currentIndex + 1
  createItem(prevIndex).classList.add('prev')
  createItem(currentIndex).classList.add('cur')
  createItem(nextIndex).classList.add('next')
}
resetElement()
let isAnimating = false
scrollContainer.addEventListener('wheel', e => {
  console.log(e.deltaY)
  if (e.deltaY === 0) return
  if (isAnimating) return
  isAnimating = true
  if (e.deltaY > 0) { // 向下滚动
    scrollContainer.classList.add('scroll-down')
    currentIndex = currentIndex + 1 > imgs.length - 1 ? 0 : currentIndex + 1
  }
  else {
    scrollContainer.classList.add('scroll-up')
    currentIndex = currentIndex - 1 < 0 ? imgs.length - 1 : currentIndex - 1
  }
})

// 过渡结束
scrollContainer.addEventListener('transitionend', e => {
  isAnimating = false
  scrollContainer.classList.remove('scroll-down')
  scrollContainer.classList.remove('scroll-up')
  resetElement()
})
