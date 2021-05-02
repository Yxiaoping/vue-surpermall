// 公共方法
// 防抖操作
export function debounce(func,delay=100){
    let timer = null // 此处也是局部变量，但下面形成了闭包，此局部变量就不会被销毁
    return function(...args){ // 可让func函数传多个参数
      if(timer) clearTimeout(timer) // 如果上一个定时器未执行完直接取消执行，减少对服务器的请求
      timer = setTimeout(()=>{
        func.apply(this,args) // 调用func函数，接收args作为参数
      },delay)
    }
  }

  // 时间戳转化
  // new Date(value * 1000).toLocaleString()  // 返回值的格式为 yyyy/MM/dd 下午 hh:mm:ss
export function formatDate(date, fmt) {
  // 1.获取年份 y+ 一个或多个y，正则表达式：匹配字符串
  if(/(y+)/.test(fmt)) {
    // RegExp.$1 即匹配到的/(y+)/字符串，将其替换为逗号后的(date.getFullYear() + '')...
    // (date.getFullYear() + '')是将时间加上一个空串，将数值转化为字符串
    // substr截取字符串，截取的个数为 4-匹配的字符串的长度，如果匹配的字符串为2019，则不截取，显示2019
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}
// 不足两位则要补齐两位： 01：02
// 如果传入的str为 04，则执行 0004.substr(2) -> 04
// if str = 4  -> 004.sbustr(1)  ->  04
function padLeftZero (str) {
  return ('00' + str).substr(str.length);
}