const list = document.querySelector('.list')
let sourceNode // 当前正在拖动的是哪个元素
list.ondragstart = (e) => {
  setTimeout(() => {
    e.target.classList.add('moving')
  }, 0)
  sourceNode = e.target
  e.dataTransfer.effectAllowed = 'move'
}

list.ondragend = e => {
  e.target.classList.remove('moving')
}
list.ondragover = e => {
  e.preventDefault()
}

// 拖拽进入
list.ondragenter = e => {
  e.preventDefault()
  // 排除自身和父元素
  if (e.target === list || e.target === sourceNode) {
    return
  }
  // 获取当前移动的元素的索引
  const children = Array.from(list.children)
  const sourceIndex = children.indexOf(sourceNode)
  // 获取目标元素的索引
  const targetIndex = children.indexOf(e.target)
  if (sourceIndex > targetIndex) {
    // 上移
    console.log('向上')
    // 在目标元素之前插入sourceNode
    list.insertBefore(sourceNode, e.target)
  } else {
    // 下移
    console.log('向下')
    // 在目标元素之后插入sourceNode
    list.insertBefore(sourceNode, e.target.nextSibling)

  }
}