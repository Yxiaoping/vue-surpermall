<template>
        <swiper class="detail-swiper" >
            <swiper-item
            v-for="(item,index) in topImages" :key="index">
                <img :src="item" alt="">
            </swiper-item>
        </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
  name: 'DetailSwiper',
  components: {
      Swiper,
      SwiperItem
  },
  props: {
      topImages: {
        type: Array,
        default () {
          return []
        }
      }
  },
  // methods: {
  //   detailImageLoad () {
  //     this.$bus.$emit('detailImageLoad')
  //   }
  // }
}
</script>

<style scoped>
.detail-swiper {
    height: 300px;
    overflow: hidden;
}
</style>
