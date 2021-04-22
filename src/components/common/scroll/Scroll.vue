<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot> <!-- 插槽就是将主页里<sroll>的内容替换过来 -->
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      scroll: null
    }
  },
  mounted () {
      // setTimeout(() => { 图片加载完成后再滚动就不用定时器了
        // 1.创建BScroll对象
        this.scroll = new BScroll(this.$refs.wrapper,{
          click: true, /* div等元素想要被点击，必须设置click */
          probeType: this.probeType,
          pullUpLoad: this.pullUpLoad
        })
        // 2.监听滚动的位置
        if(this.probeType===2 || this.probeType===3){
          this.scroll.on('scroll', position => {
          // console.log(position)
          this.$emit('scroll',position)
        })
        }
      // 3.监听scroll是否滚动到底部
      if(this.pullUpLoad){ // pullUpLoad为true时，到达底部，为false的组件不用监听此事件，提升效率
        this.scroll.on('pullingUp',()=>{
          // console.log('bottom'); 到达底部时才触发函数
          this.$emit('pullingUp')
      })
      }
      // },1000)
  },
  methods: {
    scrollTo(x,y,time=1000){
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    refresh () {
      console.log('----'); // 检测到刷新的次数
      this.scroll && this.scroll.refresh()
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    getScrollY () {
      // 得到滚动的y轴的位置
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style>

</style>
