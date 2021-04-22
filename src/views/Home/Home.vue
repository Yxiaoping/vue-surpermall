<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
    <tab-control class="tab-control" 
          @tabClick='tabClick'
          :titles='["流行","新款","精选"]'
          v-show="isTabFixed"
          ref="tabControl1"></tab-control>
    <scroll class="content" 
          ref="scroll" :probe-type='3' 
          @scroll='contentScroll'
          :pull-up-load='true'
          @pullingUp='loadMore'>
        <home-swiper :banners='banners' @imageLoad='swiperImageLoad'></home-swiper>
        <home-recommend-view :recommends='recommends'></home-recommend-view>
        <feature-view></feature-view>
    <tab-control 
            @tabClick='tabClick'
            :titles='["流行","新款","精选"]'
            ref="tabControl2"></tab-control>
        <goods-list :goods='showGoods'></goods-list>
        </scroll>
        <back-top @click.native="backTop" v-show="showTop"></back-top>
    </div>
</template>

<script>
// 分块放置，优雅，方便管理、维护
import HomeSwiper from './childComps/HomeSwiper' // 导入的组件放一起
import HomeRecommendView from './childComps/HomeRecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import { 
  getHomeMultidata,
  getHomeGoods
} from 'network/home.js'
import {debounce} from 'common/utils.js'
export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data () {
    return {
        // result: null
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list:[]},
          'new': {page: 0, list:[]},
          'sell': {page: 0, list:[]}
        },
        currentType: 'pop',
        showTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
    }
  },
  computed: { // 页面展示处的代码太复杂，可放在计算属性中封装，使上面的代码简化
    showGoods () {
      return this.goods[this.currentType].list
    }
  },
  // destroyed () {
  //   console.log('home destroyed');
  // },
  activated () {
    // 进入时滚动到离开时的位置this.saveY
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh() // 进入时再刷新，避免出现小问题
  },
  deactivated () {
    // 保存离开时的位置信息到this.saveY
    this.saveY = this.$refs.scroll.getScrollY()
    // console.log(this.saveY);
  },
  created () {
    // 将created钩子中的代码简化，处理主要逻辑，具体的方法实现交给methods
    // 1.请求多个数据
    this.getHomeMultidata()
    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted () {
    // 1.监听item中图片加载完成，刷新防抖函数放到了utils.js中，工具库
    const refresh = debounce(this.$refs.scroll.refresh,50)
    this.$bus.$on('itemImageLoad',() => {
      // this.$refs.scroll.refresh()
      refresh() // 此处是闭包，局部变量不会被销毁
    })
  },
  methods: {
    // 事件监听相关方法
    // debounce(func,delay){ 封装
    //   let timer = null // 此处也是局部变量，但下面形成了闭包，此局部变量就不会被销毁
    //   return function(...args){ // 可让func函数传多个参数
    //     if(timer) clearTimeout(timer) // 如果上一个定时器未执行完直接取消执行，减少对服务器的请求
    //     timer = setTimeout(()=>{
    //       func.apply(this,args) // 调用func函数，接收args作为参数
    //     },delay)
    //   }
    // },
    tabClick (index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType= 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    backTop () {
      // this.$refs.scroll 可拿到scroll组件中的所有数据
      // this.$refs.scroll.scroll.scrollTo(0,0,1000)
      this.$refs.scroll.scrollTo(0,0) /* 封装之后 */
    },
    contentScroll(position) {
      // console.log(position.y)
        // this.showTop = (-position.y) > 1000  绝对值Math.abs
        this.showTop = Math.abs(position.y) > 1000
        // 2.设置吸顶效果
        this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
      // this.$refs.scroll.finishPullUp() 在这里完成上拉加载更多的话，以后每次再请求数据都还要再写
    },
    swiperImageLoad () {
      // 2.获取tabOffsetTop的offsetTop
    // console.log(this.$refs.tabControl.$el.offsetTop); 
    this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    // 网络请求相关方法
    getHomeMultidata () {
      getHomeMultidata().then(res => {
    //   console.log(res)
    // this.result = res
    this.banners = res.data.banner.list
    this.recommends = res.data.recommend.list
    })
    },
    getHomeGoods (type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
      this.goods[type].list.push(...res.data.list)
      this.goods[type].page += 1  /* 更新data中的页码 */
      this.$refs.scroll.finishPullUp() // 调用方法，多次上拉加载更多
    })
    }
  }
}
</script>

<style scoped>
/* 加上scoped，表示当前的样式只作用于当前组件 */
#home{
  /* padding: 44px 0 64px; */
  /* vh viewport height 视口高度，100vh就是整个视口高度，50vh是50%的高度 */
  height: 100vh;
  position: relative;
}
.home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /* position: fixed;
    right: 0;
    left: 0;
    top: 0;
    z-index: 9; */
    /* position: relative; 下面加了overflow，这里就不用设置了
    z-index: 9; */
}
/* .tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
} */
.content {
  /* 方法一：计算
  height: calc(100% - 98px); 
  overflow:hidden;
  margin-top:44px*/
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control {
  position: relative;
  z-index: 9;
}
</style>
