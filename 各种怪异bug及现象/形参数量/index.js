function A (a, b) {}
function B (a, b = 1) {}
function C (a = 1, b = 1) {}
function D (a = 1, b = 1, c) {}
console.log(A.length) // 2
console.log(B.length) // 1
console.log(C.length) // 0
console.log(D.length) // 0

// 这个的A.length代表期望的形参数量,如果第一个参数如果有默认值,后面的都不算