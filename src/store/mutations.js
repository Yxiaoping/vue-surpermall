import {
ADD_COUNTER,
ADD_TO_CART
} from './mutation-types'
export default {
    [ADD_COUNTER](state,payload){
        payload.count++
      },
      [ADD_TO_CART](state,payload){
        payload.checked = true // 购物车中商品是否选中的属性
        state.cartList.push(payload)
      }
}