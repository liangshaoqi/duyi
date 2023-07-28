/**
 *  判断传入的函数是否标记了async
 *
 * @param {*} func
 * @returns
 */
function isAsyncFunction (func) {
  console.dir(func)
  return func[Symbol.toStringTag] === 'AsyncFunction'
}
function a() {}
console.log(isAsyncFunction(a))