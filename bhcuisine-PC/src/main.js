// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui' // element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'// element-ui的css
import 'element-ui/lib/theme-chalk/display.css'
Vue.use(ElementUI)
Vue.config.productionTip = false
// 设置反向代理
var axios = require('axios')
axios.defaults.baseURL = 'http://192.168.1.107:8090/api'
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios
axios.defaults.withCredentials = true

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
