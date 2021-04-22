import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue() // 将vue实例作为事件总线，监听不同组件间事件变化，使得组件间通信

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
