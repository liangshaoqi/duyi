import { TrackOpTypes, TriggerOpTypes } from "./operations.js"

let shouldTrack = true // 是否应该收集标志位
const effectStack = [] // 模拟执行栈
const targetMap = new WeakMap()
const ITERATE_TYPE = Symbol('itrate')

let activeEffect = null // 创建全局变量以方便跨函数的通信

export function effect(fn, options = {}) {
  const { lazy = false } = options
  const effectFn = () => {
    try {
      activeEffect = effectFn
      effectStack.push(activeEffect)
      cleanup(effectFn)
      return fn()
    } finally {
      effectStack.pop()
      activeEffect = effectStack[effectStack.length - 1]
    }
  }
  // 记录fn存在那个集合里面
  effectFn.deps = []
  effectFn.options = options
  if (!lazy) {
    effectFn()
  }
  return effectFn
}

// 清空集合中的函数
export function cleanup(effectFn) {
  const { deps } = effectFn
  // 找到deps中存储的集合,并删除该集合中对应的方法
  if (!deps.length) return
  for (const dep of deps) {
    dep.delete(effectFn)
  }
  deps.length = 0
}

// 暂停收集
export function pauseTracking() {
  shouldTrack = false
}

// 恢复收集
export function resumeTracking() {
  shouldTrack = true
}

// 依赖收集
export function track(target, type, key) {
  if (!shouldTrack || !activeEffect) return
  // 建立数据对应关系
  let propMap = targetMap.get(target)
  if (!propMap) {
    propMap = new Map()
    targetMap.set(target, propMap)
  }
  // 判断type是否为迭代
  if (type === TrackOpTypes.ITERATE) {
    key = ITERATE_TYPE
  }
  let typeMap = propMap.get(key)
  if (!typeMap) {
    typeMap = new Map()
    propMap.set(key, typeMap)
  }
  let depSet = typeMap.get(type)
  if (!depSet) {
    depSet = new Set()
    typeMap.set(type, depSet)
  }
  // 判断是否存在
  if (!depSet.has(activeEffect)) {
    depSet.add(activeEffect)
  }
  // 存储属性在哪些集合出现
  activeEffect.deps.push(depSet)
}

// 派发更新
export function trigger(target, type, key) {
  console.log(`%c派发更新[${type}]`, 'color: #00f', key)
  const effectFns = getEffectFns(target, type, key)
  if (!effectFns) return
  for (const effectFn of effectFns) {
    // 判断当前是否正在运行该函数
    if (effectFn === activeEffect) {
      continue
    }
    if (effectFn.options.scheduler) {
      effectFn.options.scheduler(effectFn)
    } else {
      effectFn()
    }
  }
}

function getEffectFns(target, type, key) {
  let propMap = targetMap.get(target)
  if (!propMap) return
  const keys = [key]
  // 判断迭代
  if (type === TriggerOpTypes.ADD || type === TriggerOpTypes.DELETE) {
    keys.push(ITERATE_TYPE)
  }
  const effectFns = new Set()
  // 派发和收集对应的map
  const triggerTypeMap = {
    [TriggerOpTypes.SET]: [TrackOpTypes.GET],
    [TriggerOpTypes.ADD]: [TrackOpTypes.GET, TrackOpTypes.HAS, TrackOpTypes.ITERATE],
    [TriggerOpTypes.ADD]: [TrackOpTypes.GET, TrackOpTypes.HAS, TrackOpTypes.ITERATE],
  }
  for (const item of keys) {
    let typeMap = propMap.get(item)
    if (!typeMap) {
      continue
    }
    const trackTypes = triggerTypeMap[type]
    for (const trackType of trackTypes) {
      const dep = typeMap.get(trackType)
      if (!dep) {
        continue
      }
      for (const effectFn of dep) {
        effectFns.add(effectFn)
      }
    }
  }
  return effectFns
}

