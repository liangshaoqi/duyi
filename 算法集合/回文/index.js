/**
 * 验证回文串
 * 回文串: 一个字符串,忽略大小写和非字母数字,等着读和反着读都是一样的
 * 例如: A man,a plan, a canal: Panana
 * 
 * **/
const isPalindrome = function (s) {
  let i = 0;
  let j = s.length - 1 
  while (i <= j) {
    const left = s[i].toLowerCase()
    const right = s[j].toLowerCase()
    if (!isValid(left)) {
      i ++
    } else if (!isValid(right)) {
      j --
    } else if (left === right) {
      i ++
      j --
    } else {
      return false
    }
  }
  return true
}
// 验证是否是字母或者数字
const isValid = (c) => (c >= 'a' && c <= 'z') || (c >= '0' && c <= '9')
console.log(isPalindrome('A nana'))