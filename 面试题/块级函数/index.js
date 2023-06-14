var a;
if (true) {
  console.log(a)
  a = 5
  function a() {}
  function b() {}
  a = 0
  console.log(a)
}
console.log(a)
console.log(b) // undefined
// 智障代码,别这么写