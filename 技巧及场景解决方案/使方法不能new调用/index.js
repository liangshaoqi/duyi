function a () {
  if (new.target) {
    throw new Error('不能通过new调用')
  }
  console.log(1)
}
a()
new a()