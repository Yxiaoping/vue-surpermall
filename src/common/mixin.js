import {debounce} from './utils'
import BackTop from 'components/content/backTop/BackTop'
// mixin 混入，此mounted函数将与组件内的mounted函数合并，不冲突
// 混入时写的哪个函数，导入后就能实现相应函数的功能
export const itemListenerMixin = {
  data () {
    return {
      itemImgListener: null
      // refresh: null 还可将防抖函数保存在data中，这样引入mixin的组件就可在任意位置使用防抖函数了
    }
  },
  mounted () {
    const refresh = debounce(this.$refs.scroll.refresh, 100)
    this.itemImgListener = () => { refresh() }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
    console.log('I am in mixins');
  }
}
// 封装回到顶部按钮
export const backTopMixin = {
  data () {
    return {
      showTop: false
    }
  },
  components: {
    BackTop
  },
  methods: {
    backTop () {
      this.$refs.scroll.scrollTo(0,0)
    }
  }
}