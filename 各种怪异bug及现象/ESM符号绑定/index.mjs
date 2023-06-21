import {count, increase} from './main.mjs'
console.log(count)
increase()
console.log(count)
// 这里的count和main.mjs的count公用一块内存空间,注意是公用一块,而不是两个内存空间指向同一个内存地址
const a = {}
const b = a
// 以上代码就是a和b是两块内存空间,都指向了同一个地址
// 要解决这个问题需要在抛出的时候使用const