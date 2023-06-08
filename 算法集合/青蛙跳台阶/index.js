function fibonacci(n) {
  if (n <= 2) {
    return n
  }
  let last1 = 2
  let last2 = 1
  for (let i = 3; i <= n; i++) {
    last1 = last1 + last2
    last2 = last1 - last2 // 这里其实就是将last1的初始值赋值给last2
  }
  return last1
}

console.log(fibonacci(20))