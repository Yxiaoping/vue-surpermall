<template>
    <div>
        <nav-bar>
            <div slot="left" class="left" @click="leftClick">
                <img src="~assets/img/common/back.svg" alt="">
            </div>
            <div slot="center" class="title">
                <div v-for='(title,index) in titles' 
                :key="index" :class="{active:index===currentIndex}"
                @click="clickTitle(index)">{{title}}</div>
            </div>
        </nav-bar>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name: 'DetailNavBar',
  components: {
    NavBar
  },
  data () {
    return {
      titles: ['商品','参数','评论','推荐'],
      currentIndex: 0
    }
  },
  methods: {
    clickTitle (index) {
      this.currentIndex = index
      this.$emit('clickTitle', index)
    },
    leftClick () {
      this.$router.back()
    }
  }
}
</script>

<style>
.title {
    display: flex;
    font-size: 13px;
}
.title div {
    flex:1;
}
.active {
    color: var(--color-high-text);
}
.left img {
    margin-top: 10px;
    /* 为svg图片改变颜色 */
    position: relative;
    left: -80px;
    filter: drop-shadow(red 80px 0);  
}
</style>
