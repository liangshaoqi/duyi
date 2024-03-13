import { reactive } from './reactive.js'
import { effect } from './effect.js'
import { ref } from './ref.js'
import { computed } from './computed.js'
const obj = {
  a: 0,
  b: '2',
  g: NaN,
  get c() {
    return this.a + this.b
  },
  d: {
    f: 3
  }
}

const arr = [
  0,1, 2, 3, obj, 4
]
const state1 = reactive(obj)
// function fn() {
// state1.d.f
// 'in' in state1
// for (const key in state1) {

// }
// }
// fn()
// state1.b = '2'
// state1.g = NaN
// state1.lll = NaN
// delete state1.b

const state = reactive(arr)

function fn2() {
  // for (let i = 0; i < state.length; i++) {
  //   state[i]
  // }
  // for (const item of state) {}
  // let i = state.indexOf(obj)
  // console.log(i)
  state.pop(99)
  console.log(arr)
}
// console.log(state[3], arr[3])
// fn2()

// const object = {
//   a: 1,
//   b: 2,
//   c: 3
// }

// const state_1 = reactive(object)
// function fn_1 () {
//   if(state_1.a == 1) {
//     state_1.b = 3
//   } else {
//     state_1.c
//   }
// }
// 运行函数fn_1,运行期间用到的所有响应式的数据,都会收集为对应关系
// effect(fn_1)
// fn_1()

// function fn_2 () {
//   console.log('fn')
//   state_1.a ++ 
// }
// const effectFn = effect(fn_2, {
//   lazy: true,
//   // 自定义,添加了就可以自己运行回调
//   scheduler: (eff) => {
//     console.log('scheduler')
//   }
// })
// effectFn()

// const stat = ref(1)
// effect(() => {
//   console.log(stat.value)
// })
// stat.value ++ 


const stat = reactive({
  a: 1,
  b: 2
})
const sum = computed(() => {
  console.log('computed')
  return stat.a + stat.b
})
effect(() => {
  console.log('render', sum.value)
})
stat.a ++ 
