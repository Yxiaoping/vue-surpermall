<template>
    <div class="toast" v-show="isShow">
        <div>
            {{message}}
        </div>
    </div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    // message:String,
    // isShow: {
    //   type: Boolean,
    //   default () {
    //     return false
    //   }
    // }
  },
  data () {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show(message='添加至购物车',duration=1000) {
    //   duration = duration || 2000
      this.message = message
      this.isShow = true
      setTimeout(() => {
        this.message = ''
        this.isShow =false
      },duration)
    }
  }
}
</script>

<style>
.toast {
    position: fixed;
    top: 50%;
    left: 50%;
    background: rgba(0,0,0,.6);
    color: #fff;
    padding: 5px 8px;
    transform: translate(-50%,-50%);
    z-index: 99;
}
</style>
