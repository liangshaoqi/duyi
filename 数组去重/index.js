/**
 * 数组去重
 * 原始值使用严格相等的比较
 * 对象值递归比较所有属性,属性数量和属性名称必须相等
 * @param {*} arr
 * @returns
 */
function uniqueArray (arr) {
  let result = []
  for (let i = 0; i < arr.length; i++) {
    let isFind = false
    for (let j = 0; j < result.length; j++) {
      // 比较条件
      if (equals(result[j], arr[i])) {
        isFind = true
        break
      }
      
    }
    if (!isFind) {
      result.push(arr[i])
    }
  }
  return result
}


// 判断两个对象是否相等
function equals (obj1, obj2) {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false
  }
  for (key in obj1) {
    // 两个都有key
    if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
      // 如果两个的值不同
      if (obj1[key] !== obj2[key]) {
        return false
      }
    }
    else {
      return false
    }
  }
  return true
}

let a = [
  {
    id: 1,
    value: 1,
  },
  {
    id: 2,
    value: 2,
  },
  {
    id: 3,
    value: 3,
  },
  {
    id: 1,
    value: 1,
  },
]
console.log(uniqueArray(a))
