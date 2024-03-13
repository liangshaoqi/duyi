import { track, trigger, pauseTracking, resumeTracking } from './effect.js'
import { reactive } from './reactive.js'
import { isObject, hasChanged } from './utils.js'
import { TrackOpTypes, TriggerOpTypes } from './operations.js'
const RAW = Symbol('raw')

const arrayInstrumentations = {
  // includes: () => {},
  // indexOf: () => {},
  // lastIndexOf: () => {},
}
const arr = ['includes', 'indexOf', 'lastIndexOf']
arr.forEach((key) => {
  arrayInstrumentations[key] = function (...args) {
    // this --> proxy
    // 正常找
    const res = Array.prototype[key].apply(this, args) // 相当于运行includes(args)
    // 找不到,从原始对象中重新找一遍
    if (res < 0 || res === false) {
      // console.log('找不到')
      return Array.prototype[key].apply(this[RAW], args)
    }
    return res
  }
});

const arrFn = ['push', 'pop', 'shift', 'unshift', 'splice']
arrFn.forEach((key) => {
  arrayInstrumentations[key] = function(...args) {
    // 暂停收集
    pauseTracking()
    const res = Array.prototype[key].apply(this, args)
    // 恢复收集
    resumeTracking()
    return res
  }
})

function get(target, key, receiver) {
  // 访问特殊属性的时候返回原始对象
  if (key === RAW) return target
  // 依赖收集,建立对应关系
  track(target, TrackOpTypes.GET, key)
  if (arrayInstrumentations.hasOwnProperty(key) && Array.isArray(target)) {
    return arrayInstrumentations[key]
  }
  // target[[GET]](key, target)
  const result = Reflect.get(target, key, receiver) // 返回对应属性
  // 判断是否是对象
  if (isObject(result)) {
    return reactive(result)
  }
  return result
}
function has(target, key) {
  track(target, TrackOpTypes.HAS, key)
  return Reflect.has(target, key)
}

function deleteProperty(target, key) {
  // 是否存在该属性,不能用in,in是在原型链上面查找
  const hadKey = target.hasOwnProperty(key)
  // 判断是否删除成功
  const result = Reflect.deleteProperty(target, key)
  if (result && hadKey) {
    // 派发
    trigger(target, TriggerOpTypes.DELETE, key)
  }
  return result
}

function set(target, key, value, receiver) {
  // 判断操作类型
  const type = target.hasOwnProperty(key) ? TriggerOpTypes.SET : TriggerOpTypes.ADD
  // 在result之前获取到旧的值
  const oldValue = target[key]
  const oldLength = Array.isArray(target) ? target.length : undefined
  const result = Reflect.set(target, key, value, receiver)
  if (!result) {
    return result
  }
  const newLength = Array.isArray(target) ? target.length : undefined
  // 修改值与原值不等或者有新增的时候
  if (hasChanged(oldValue, value) || type === TriggerOpTypes.ADD) {
    trigger(target, type, key)
    // 判断设置的对象是数组&&设置前后的length属性发生变换&&当前设置的不是length属性
    
    if (Array.isArray(target) &&  oldLength !== newLength) {
      if (key !== 'length') {
        trigger(target, TriggerOpTypes.SET, 'length')
      } else {
        for (let i = newLength; i < oldLength; i ++) {
          trigger(target, TriggerOpTypes.DELETE, i.toString())
        }
      }
    }
  }
  // 派发更新
  return result // 设置相应的属性,这行相当于下面两行代码
  // target[key] = value
  // return true
}

function ownKeys(target) {
  track(target, TrackOpTypes.ITERATE)
  return Reflect.ownKeys(target) // 返回对象的所有属性名
}


export const handlers = {
  get,
  set,
  deleteProperty,
  // 这里处理的是key in object这类型的依赖操作
  has,
  // 这里处理的是for in这类型迭代的依赖操作
  ownKeys,
}