<template>
        <grid-view>
            <goods-list-item v-for="(content,index) in contentDetail" 
            :key="index"
            :goodsItem='content'/>
        </grid-view>
</template>

<script>
import GridView from '@/components/common/gridView/GridView'
import GoodsListItem from '@/components/content/goods/GoodsListItem'
export default {
  name: 'ContentDetail',
  components: {
      GridView,
      GoodsListItem
  },
  props: {
      contentDetail: Array
  }
}
</script>

<style>

</style>
