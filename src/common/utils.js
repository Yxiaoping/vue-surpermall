export function debounce(func,delay){
    let timer = null // 此处也是局部变量，但下面形成了闭包，此局部变量就不会被销毁
    return function(...args){ // 可让func函数传多个参数
      if(timer) clearTimeout(timer) // 如果上一个定时器未执行完直接取消执行，减少对服务器的请求
      timer = setTimeout(()=>{
        func.apply(this,args) // 调用func函数，接收args作为参数
      },delay)
    }
  }