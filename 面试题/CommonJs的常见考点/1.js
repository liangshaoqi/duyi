this.a = 1 // => this == exports: {a: 1}
exports.b = 2 // => exports == this: {a: 1,b: 2}
exports = {
  c: 3
} // => exports: {c: 3}
module.exports = {
  d: 4
} // =>module.exports: {d: 4}
exports.e = 5 // => exports: {c: 3, e:5}
this.f = 6 // => this: {a: 1,b: 2, f: 6}

// 初始的时候都是同一个{}
console.log(this, exports, module.exports)
