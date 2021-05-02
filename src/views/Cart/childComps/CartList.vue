<template>
    <div class="cart-list">
        <scroll class="content"
        ref="scroll">
            <cart-list-item  v-for="(item,index) in cartList" 
            :key="index" 
            :item-info='item'>
            </cart-list-item>
        </scroll>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'
export default {
  name: 'CartList',
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated () {
    // console.log('0000');
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.cart-list {
    /* 因为这里是cart组件中的内容滚动区，而非整个cart组件，所以这里就是滚动区的内容高度 */
    height: calc(100vh - 44px - 49px - 40px);
}
.content {
    /* height: calc(100% - 44px - 49px -40px - 40px); */
    height:100%;
    overflow: hidden;
}
</style>
