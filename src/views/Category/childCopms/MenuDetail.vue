<template>
    <div>
        <grid-view 
      :cols='3' 
      :lineSpace='15' 
      :v-margin='20'
      v-if="subcategories.list"
      class="grid">
        <div v-for="(item,index) in subcategories.list"
        :key="index"
        class="menu-detail">
            <a :href="item.link"></a>
            <img :src="item.image" alt="" class="image">
            <div class="text">{{item.title}}</div>
        </div>
      </grid-view>
    </div>
</template>

<script>
import GridView from 'components/common/gridView/GridView'
export default {
  name: 'MenuDetail',
  props: {
    subcategories: Object
  },
  components: {
    GridView
  },
}
</script>

<style scoped>
.menu-detail {
    /* width: 275px; */
    text-align: center;
    font-size: 12px;
    /* position: relative; */
}
.grid {
    width: 275px;
    float: right;
}
.image {
    width: 80%
}
.text {
    margin-top: 15px;
}
</style>
