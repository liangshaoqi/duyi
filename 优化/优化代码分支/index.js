function speak(name) {
  console.log('初始版')
  if (name === '小牛') {
    console.log('嗷嗷叫')
  } else if (name === '小猫') {
    console.log('喵喵叫')
  } else if (name === '小狗') {
    console.log('旺旺叫')
  } else {
    console.log('不知道')
  }
}
speak('l')

function speak_1(name) {
  console.log('优化版本1')
  const map = {
    小牛: () => console.log('嗷嗷叫'),
    小猫: () => console.log('喵喵叫'),
    小狗: () => console.log('旺旺叫'),
  }
  if (map[name]) {
    map[name]()
  } else {
    console.log('不知道')
  }
}
speak_1('小牛')

function speak_2 (name) {
  console.log('复杂初始版')
  if(name.includes('牛')) {
    console.log('嗷嗷叫')
  } else if (name.endsWith('猫') && name.length <= 3) {
    console.log('喵喵叫')
  } else if (name.includes('小狗') && name !== '小猫') {
    console.log('旺旺叫')
  } else {
    console.log('不知道')
  }
}

function speak_3(name) {
  console.log('最终优化版本')
  const map = [
    [
      () => name.includes('牛'), // 条件
      () => console.log('嗷嗷叫') // 执行
    ],
    [
      () => name.endsWith('猫') && name.length <= 3,
      () => console.log('喵喵叫')
    ],
    [
      () => name.includes('小狗') && name !== '小猫',
      () => console.log('旺旺叫')
    ]
  ]
  const condition = map.find(m => {
    // console.log(m)
    return m[0]() // 执行对应的条件,并返回真值
  })
  if (condition) {
    condition[1]()
  } else {
    console.log('不知道')
  }
}

speak_3('小狗')