// type Method = 'GET' | 'POST' 
type Method = 'GET' | 'POST' // 初始化的时候没有PUT,调试的时候请添加PUT
function request(method: Method, url: string) {
  switch (method) {
    case "GET":
      return '123'
    case "POST":
      return '543'
    default:
      const n: never = method // 这里方便扩展,如果后续method类型修改了,这里会报错,方便查看需要修改
      return n
  }
}


// x不能是日期类型

type BanDate<T> = T extends Date ? never : T
// 万能禁用类型
type BanType<T, E> = T extends E ? never : T
function log<T>(x: BanType<T, Date>) {

}
log(1)
log('12321')
log(new Date())