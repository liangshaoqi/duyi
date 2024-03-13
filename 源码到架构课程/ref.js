import { TrackOpTypes, TriggerOpTypes} from './operations.js'
import { track, trigger } from './effect.js'
export function ref(value) {
  return {
    // 相当于obj.value的时候会执行下面的方法
    get value() {
      // 收集依赖
      track(this, TrackOpTypes.GET, 'value')
      return value
    },
    set value(newValue) {
      // todo: 判断是否和之前的value相同
      value = newValue
      // 派发更新
      trigger(this, TriggerOpTypes.SET, 'value')
    }
  }
}