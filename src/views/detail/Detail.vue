<template>
    <div id="detail">
        <detail-nav-bar ref="nav" @clickTitle='clickTitle'></detail-nav-bar>
        <!-- <div>{{$store.state.cartList.length}}</div> 检测是否成功加入购物车 -->
        <!-- <ul>
          <li v-for="(item,index) in $store.state.cartList" :key="index">
            {{item}}
          </li>
        </ul> -->
        <scroll class="content"
        ref='scroll'
        @scroll='contentScroll'
        :probe-type='3'>
        <!-- 虽然属性名是用的驼峰，但传属性时，用的-分隔，
        因为html标签中不区分大小写，用驼峰topImg命名就相当于topimg，就会找不到
        事件不用，能区分 -->
          <detail-swiper :top-images='topImages'></detail-swiper>
          <detail-base-info :goods='goods'></detail-base-info>
          <detail-shop-info :shop='shop'></detail-shop-info>
          <detail-goods-info :detail-info='detailInfo' @imgLoad='imgLoad'></detail-goods-info>
          <detail-param-info ref="params" :param-info='paramInfo'></detail-param-info>
          <detail-comment-info ref="comment" :comment-info='commentInfo'></detail-comment-info>
          <goods-list ref="recommend" :goods='recommends'></goods-list>
        </scroll>
        <detail-bottom-bar @addCart='addToCart'></detail-bottom-bar>
        <back-top v-show='showTop' @click.native="backTop"></back-top>
        <!-- <toast :message='message' :isShow='isShow'/> -->
    </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
// import BackTop from 'components/content/backTop/BackTop' 封装进mixin
// import Toast from 'components/common/toast/Toast'

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail.js'
import {debounce} from 'common/utils.js'
import {itemListenerMixin, backTopMixin} from 'common/mixin.js'
export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    // Toast
  },
  // 利用混合导入了图片加载事件监听，可代替下面mounted中的代码
  // 还可将防抖函数保存在data中，就可使得组件中任意位置都能使用防抖函数
  mixins: [itemListenerMixin, backTopMixin],
  data () {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      // itemImgListener: null 通过混入导入
      topYs: [],
      getTopYs: null,
      currentIndex: 0,
      // showTop: false 封装进混入mixin里
      // message: '',
      // isShow: false
    }
  },
  created () {
    // 1.保存传入的id
    this.iid = this.$route.params.iid
    // 2.根据id请求数据
    getDetail(this.iid).then(res => {
      const data = res.result
      // console.log(data);
      // 1.获取顶图的轮播图
      this.topImages = data.itemInfo.topImages
      // 2.获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      // 3.获取店铺信息
      this.shop = new Shop(data.shopInfo)
      // 4. 获取商品的详细信息
      this.detailInfo = data.detailInfo
      // 5. 获取商品参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      // 6. 获取评论信息
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }
    })
    // 3. 请求推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list
    })
    // this.$nextTick(() => { // 下一帧，此函数会等到组件dom渲染完后再调用，但组件中的图片并不一定加载完全
    //   this.topYs = []  // 得到的offsetTop值不准确，大多数都是因为图片未加载的问题
    //   this.topYs.push(0)
    //   this.topYs.push(this.$refs.params.$el.offsetTop)
    //   this.topYs.push(this.$refs.comment.$el.offsetTop)
    //   this.topYs.push(this.$refs.recommend.$el.offsetTop)
    // })
    // 4. 为topYs设置防抖
    this.getTopYs = debounce(() => {
      this.topYs = []
      this.topYs.push(0)
      this.topYs.push(this.$refs.params.$el.offsetTop)
      this.topYs.push(this.$refs.comment.$el.offsetTop)
      this.topYs.push(this.$refs.recommend.$el.offsetTop)
      this.topYs.push(Number.MAX_VALUE) // 在数组末尾增加一个无限大的值，为了之后对数组做遍历
      console.log(this.topYs)
    },100)
  },
  mounted () {
    // 利用mixin混入后，代替了下面的代码
      // const refresh = debounce(this.$refs.scroll.refresh,50)
      // this.itemImgListener = () => { refresh() }
      // // 在此组件中监听itemImageLoad图片加载事件
      // this.$bus.$on('itemImageLoad', this.itemImgListener)
      // this.topYs = []  // 刷新，否则会重复添加进入
      // this.topYs.push(0)
      // this.topYs.push(this.$refs.params.$el.offsetTop) // 获取到参数组件元素$el的offsetTop
      // this.topYs.push(this.$refs.comment.$el.offsetTop)
      // this.topYs.push(this.$refs.recommend.$el.offsetTop)
      // console.log(this.topYs);  // mounted()中未得到数据
    },
    updated () {
      // 在得到数据后会执行updated，对页面进行更新，只要数据变化就会更新
      // 获得的offsetTop值也不准确
      // this.topYs = []  // 刷新，否则会重复添加进入
      // this.topYs.push(0)
      // this.topYs.push(this.$refs.params.$el.offsetTop) // 获取到参数组件元素$el的offsetTop
      // this.topYs.push(this.$refs.comment.$el.offsetTop)
      // this.topYs.push(this.$refs.recommend.$el.offsetTop)
      // console.log(this.topYs);
    },
  destroyed () {
    // 离开组件时取消图片加载监听事件
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  methods: {
    imgLoad () {
      // console.log('/////'); 老师这里会刷新多次，但我这里只刷新一次
      this.$refs.scroll.refresh()
      this.getTopYs()
      // this.topYs = []
      // this.topYs.push(0)
      // this.topYs.push(this.$refs.params.$el.offsetTop)
      // this.topYs.push(this.$refs.comment.$el.offsetTop)
      // this.topYs.push(this.$refs.recommend.$el.offsetTop)
      // console.log('=====') //老师这里会刷新多次，但我这里只刷新一次
    },
    clickTitle (index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0,-this.topYs[index],1000)
    },
    contentScroll (position) { // 根据scroll组件发出的scroll事件，获取到position值
    // 1.获取y值
      const positionY = - position.y
      // 2.将y值与组件内容高度做对比
      // console.log(this.topYs[0]); // 这里是undefined，得不到它的值，并且即使得到了也应该为负值，
      // console.log(positionY);
      let length = this.topYs.length
      // for(let i in this.topYs)  此方法获取的 i为字符串 要用parseInt(i) 或者 i*1 的方法将其转为数值
      // for(let i=0;i<length;i++){
        // if(this.topYs[i].positionY >=0 && this.topYs[i].positionY < this.topYs[i+1].positionY)
      //   console.log(this.topYs[i]);
      // console.log(this.topYs.length);
      // 1.普通做法
        // if(this.currentIndex !== i && ((i < length -1 && positionY >= this.topYs[i] && positionY < this.topYs[i+1]) || (i === length -1 && positionY >= this.topYs[i]))){
        // 2.hack做法，在数组后面加一个无限大的值，并且遍历时只遍历到 i<length-1
        for(let i=0;i<length-1;i++){
          if(this.currentIndex !== i && (i<length-1 && positionY >= this.topYs[i] && positionY < this.topYs[i+1])){
            this.currentIndex = i
          console.log(i); // 因为此时打印非常频繁，所以将当前index保存为一个变量，在两个不等的情况下才打印，就不会很频繁
          console.log(this.topYs[i]); // 此处的值是正值
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      // 是否显示回到底部按钮的判断
      this.showTop = positionY > 1000
    },
    // 封装到混入mixin里
      // backTop () {
      //   this.$refs.scroll.scrollTo(0,0)
      // }
    addToCart () {
      // 1.获取购物车需要展示的信息，因为有多个信息，所以可以放在一个对象里
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid // id一定要传，因为id是商品的唯一标识，是将id传给服务器获取到对应的商品

      // 2.将商品添加到购物车里
      // this.$store.commit('addCart',product) commit是将product提交到store中mutations里的方法addCart
      this.$store.dispatch('addCart',product)  // dispatch是提交到actions里去，再由actions分发commit到mutations里不同的方法中去
      // 3.如果添加购物车成功（用promise监视成功与否）
      .then(res => {
        // console.log(res);
        // this.isShow = true
        // this.message = res
        // setTimeout(() => {
        //   this.isShow = false
        // },1000)
        this.$toast.show(res,1000)
      })
    }
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background: #fff;
  height: 100vh;
}
.content {
  height: calc(100% - 44px - 44px);
  overflow: hidden;
}
</style>
