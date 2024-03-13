export function isObject (target) {
  return target !== null && typeof target === 'object'
}

// Object.is区分console.log(Object.is(0, -0)); // false
  // console.log(Object.is(NaN, NaN)); // true
export function hasChanged(oldValue, newValue) {
  return !Object.is(oldValue, newValue)
}