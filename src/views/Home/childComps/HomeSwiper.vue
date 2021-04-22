<template>
    <div>
      <swiper>
            <swiper-item v-for="(item, index) in banners" :key="index">
                <a :href="item.link">
                    <img :src="item.image" alt="" @load="imageLoad">
                </a>
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'
export default {
  name: 'HomeSwiper',
  props: {
    banners: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      isLoad:false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imageLoad () {
      if(!this.isLoad){
        this.$emit('imageLoad')
        this.isLoad = true // 只加载一张图片就可以了，提高性能
      }
    }
  }
}
</script>

<style>

</style>
