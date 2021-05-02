<template>
    <div class="cart">
        <!-- 导航 -->
        <nav-bar class="nav-bar">
        <div slot="center">购物车({{cartLength}})</div>
        </nav-bar>
        <!-- 商品列表 -->
        <cart-list></cart-list>
        <!-- 底部汇总 -->
        <cart-bottom-bar></cart-bottom-bar>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'
import {mapGetters} from 'vuex' // 可以将方法解构
export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  data () {
    return {
    //   count: 0
    }
  },
  computed: {
    //   1.普通写法
    // cartLength () {
    // //   return this.$store.state.cartLish.length  将方法封装到getters之前的写法
    //   return this.$store.getters.cartLength   封装到getters之后的写法
    // }
    // 2.利用mapGetters解构 ， 还可用 mapState , mapActions
    ...mapGetters(['cartLength'])
  }
}
</script>

<style>
.nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
}
</style>
