<template>
    <div class="tab-control">
        <div v-for="(item, index) in titles" :key="index" 
        class="tab-control-item"
        :class="{active:index===currentIndex}" @click="itemClick(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
export default {
  name: 'TabControl',
  props: {
    titles: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick (index) {
      this.currentIndex = index
      this.$emit('tabClick',index) /* 将子组件数据传递到父组件 */
    }
  }
}
</script>

<style>
.tab-control {
    display: flex;
    width: 100%;
    text-align: center;
    vertical-align: middle;
    font-size: 15px;
    background: #fff;
}
.tab-control-item {
    flex: 1;
    line-height: 40px;
}
.tab-control-item span {
    padding: 5px;
}
.active {
    color: var(--color-high-text);
}
.active span {
    border-bottom: 3px solid var(--color-tint);
    font-weight: 600;
}
</style>
