<template>
    <div v-if="Object.keys(detailInfo).length !== 0 && detailInfo.detailImage[0].list !== null">
        <div class="info-desc" clear-fix>
            <div class="start"></div>
        <div class="desc">{{detailInfo.desc}}</div>
        <div class="end"></div>
        </div>
        <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
        <div class="info-list">
            <img v-for="(item,index) in detailInfo.detailImage[0].list" 
            :key="index"
             :src="item" @load="imgLoad">
        </div>
    </div>
</template>

<script>
export default {
  name: 'DetailGoodsInfo',
  props: {
    detailInfo: Object
  },
  data () {
    return {
      counter: 0,
      imagesLengeth: 0
    }
  },
  methods: {
    imgLoad () {
    //   this.counter +=1
    //   判断，等所有的图片都加载完后，只用进行一次的事件发送
    // 类似于防抖函数，防抖函数在detail组件中接收时应用，
    // 但由于detail组件已经做了混入，混入中也有防抖函数，所以可以将防抖函数保存在data中，就可以在detail组件中任意位置都可用了
      if(++this.counter === this.imagesLengeth){
          this.$emit('imgLoad')
      }
    }
  },
  watch: {
    detailInfo () {
      this.imagesLengeth = this.detailInfo.detailImage[0].list.length
    }
  }
}
</script>

<style scoped>
.goods-info {
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
}

.info-desc {
  padding: 0 15px;
}

.info-desc .start,
.info-desc .end {
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
  position: relative;
}

.info-desc .start {
  float: left;
}

.info-desc .end {
  float: right;
}

.info-desc .start::before,
.info-desc .end::after {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #333;
  bottom: 0;
}

.info-desc .end::after {
  right: 0;
}

.info-desc .desc {
  padding: 15px 0;
  font-size: 14px;
}

.info-key {
  margin: 10px 0 10px 15px;
  color: #333;
  font-size: 15px;
}

.info-list img {
  width: 100%;
  /* height: 400px; */
}
</style>
