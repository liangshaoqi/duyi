function require(modulePath) {
  //1. 根据传递的模块路径,得到模块完整的绝对路径
  let moduleId = getModuleId(modulePath)
  //2. 判断缓存
  if (cache[moduleId]) {
    return cache[moduleId]
  }
  //3. 真正运行模块代码的辅助函数
  function _require(exports, require, module, __filename, __dirname) {
    // 目标模块的代码在这里运行,这里就是1.js
    // this.a = 1
    // exports.b = 2
    // exports = {
    //   c: 3
    // }
    // module.exports = {
    //   d: 4
    // }
    // exports.e = 5
    // this.f = 6
  }
  //4. 准备并运行辅助函数
  let module = {
    exports: {}
  }
  let exports = module.exports
  // 得到模块文件的绝对路径
  let __filename = moduleId
  // 得到模块所在目录的绝对路径
  let __dirname = getDirname(__filename)
  _require.call(exports, exports, require, module, __filename, __dirname)
  //5. 缓存module.exports
  cache[moduleId] = module.exports
  //6. module.exports
  return module.exports 
}