import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
// 1.安装插件
Vue.use(Vuex)
// 2.创建store对象
const state = {
    cartList: []
}
const store = new Vuex.Store({
  state,
//   封装、抽取后
//     cartList: []
//   },
  mutations,
  getters,
      /* mutations的目的是修改state的状态，方法尽量单一，devtools才能更好地查看state的变化 */
    // addCart(state,payload) { // 固定的参数，state和传的额外参数payload，state. 可获取到state中的变量，再对其操作
        // 此处payload参数为新添加的商品，如果商品一致，不用重复增加数组元素，只增加个数就行
    //   state.cartList.push(payload)
    // 1.查找原数组中是否有该商品
    // let oldProduct = null
    // for(let item of state.cartList){ // 遍历数组中的元素
    //   if(item.iid === payload.iid){
    //     oldProduct = item // 将此时传入的元素暂时等于oldProduct，方便后面的比较
    //   }
    // }
    // 2.判断oldProduct
    // if(oldProduct){
    //   oldProduct.count += 1 // oldProduct表示现目前的已有商品
    // }else{
    //   payload.count = 1
    //   state.cartList.push(payload)
    //   被添加的商品元素为payload，如果payload的iid与已有商品的iid一致，则已有商品的数量加1
    // }
    // 第2种方法
    // let index = state.cartList.indexOf(payload)
    // if(index == -1) {
    //   let oldProduct = state.cartList[index]  取到原数组中对应的元素
    //   oldProduct.count += 1
    // }else{
    //   payload.count = 1
    //   state.cartList.push(payload)
    // }
    // 第3种方法
    // let oldProduct = state.cartList.find(item => item.iid === payload.iid)
    // if(oldProduct){
    //     oldProduct.count += 1
    // }else{
    //     payload.count =1
    //     state.cartList.push(payload)
    // }
    // }
    // 将各个对象封装起来，再导入
    // addCounter(state,payload){
    //   payload.count++
    // },
    // addToCart(state,payload){
    //   state.cartList.push(payload)
    // }
//   },
  actions
    // addCart({state,commit},payload)
//     addCart(context,payload){
//         let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
//         if(oldProduct){
//             // oldProduct.count += 1 这样写也可以，但是无法在devtools中监视到状态变化
//             // 将数量加1的情况分发到一个特定的方法中
//             context.commit('addCounter',oldProduct) // commit 提交到store中mutations里的方法addCounter中去
//         }else{
//             payload.count =1
//             // context.state.cartList.push(payload)
//             // 将添加商品的情况分发到另一个特定的方法中，使得mutations中的方法只对应一种改变
//             context.commit('addToCart',payload)
//         }
//     }
//   }
})
// 3.挂载到Vue实例上
export default store