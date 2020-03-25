import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import nutterUi from '../../dist/main.umd.js'
import router from '@/router'
import api from '@/api'
// import config from '@/config'

import 'element-ui/lib/theme-chalk/index.css'
import '../../dist/style.css'
import '../../dist/iconfonts/iconfont.css'
import '@/scss/base.scss'


Vue.use(ElementUI);
Vue.use(nutterUi);

Vue.prototype.$apis = api;

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
