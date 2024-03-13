import { effect, track, trigger } from './effect.js'
import { TrackOpTypes, TriggerOpTypes } from './operations.js'

// 参数归一化: 常用开发技巧
function normalizeParamter(getterOrOptions) {
  let getter, setter
  // 判断是否是函数
  if (typeof getterOrOptions === 'function') {
    getter = getterOrOptions
    // 函数的情况下没有提供setter函数,提供一个默认函数给出警告
    setter = () => {
      console.warn('没有设置setter函数')
    }
  } else {
    getter = getterOrOptions.getter
    setter = getterOrOptions.setter
  }
  // 判断是否是对象
  return {
    getter,
    setter
  }
}

export function computed(getterOrOptions) {
  const { getter, setter } = normalizeParamter(getterOrOptions)
  let value, dirty = true
  
  const effectFn = effect(getter, {
    lazy: true,
    scheduler: () => {
      // 执行完后将数据变成脏数据
      dirty = true
      trigger(obj, TriggerOpTypes.SET, 'value')
    }
  })
  // 当computed外有读取数据的.value属性的时候才执行
  let obj = {
    get value() {
      // 这里实现了缓存
      track(obj, TrackOpTypes.GET, 'value')
      if (dirty) {
        value = effectFn()
        dirty = false
      }
      return value
    },
    set value(newValue) {
      setter(newValue)
    }
  }
  return obj
}

