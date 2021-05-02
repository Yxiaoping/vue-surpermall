<template>
    <div class="bottom-bar">
        <div class="button">
            <check-button :is-check='isSelectAll' class="check-button" @click.native="checkAll"></check-button>
            <span>全选</span>
        </div>
        <div class="total-price">
            合计：{{totalPrice}}
        </div>
        <div class="calculate" @click="calcClick">
            去计算({{counted}})
        </div>
    </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import {mapGetters} from 'vuex'
export default {
  name: 'CartBottomBar',
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice () {
    //   return '￥' + this.$store.state.cartList.filter(item => {
      return '￥' + this.cartList.filter(item => {  // mapGetters结构之后这样写
          return item.checked}).reduce((preValue,item) => {
              return preValue + item.price * item.count
          },0).toFixed(2) // toFixed(2) 计算结果保留2位小数
    },
    counted () {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll () {
        // 1. filter会将数组全部遍历完
        // if(this.cartList.length === 0) return false
    //   return !(this.cartList.filter(item => !item.checked).length) // 对未被选中的商品长度进行取反，0取反为true
    // 2. find只找到一个就不找了，性能会高一点
      if(this.cartList.length === 0) return false  // 购物车中没有商品时，默认不选中
      return !(this.cartList.find(item => !item.checked)) // (括号里面有值的情况下再取反，结果就为false)
    // 3.简单遍历，也会全部遍历完
    // for(let item of this.cartList){
    //     if(!item.checked){ // 没有选中的情况为真
    //             return false
    //         }
    //     }
    //         return true
    }
  },
  methods: {
    checkAll () {
      if(this.isSelectAll){ // 全部选中时
        this.cartList.forEach(item => item.checked = false)
      }else {
        this.cartList.forEach(item => item.checked = true)
      }
    //   上述代码可以做一个简化
    // this.cartList.forEach(item => item.checked = !this.isSelectAll)  平常的代码可以这样做简化，但此时不行，因为isSelectAll又会影响其他的地方，相互影响
    },
    calcClick () {
      if(!this.isSelectAll){
        this.$toast.show('请选择购买的商品',1000)
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar {
    height: 40px;
    line-height: 40px;
    background-color: #eee;
    position: relative;
    z-index: 99;
    display: flex;
    text-align: center;
    font-size: 14px;
}
.button {
    display: flex;
    align-items: center;
    margin-left: 8px;
    width: 60px;
}
.check-button {
    width: 18px;
    height: 18px;
    line-height: 20px;
    margin-right: 5px;
}
.total-price {
    margin-left: 20px;
    flex: 1;
}
.calculate {
    width: 100px;
    background-color: pink;
}
</style>
