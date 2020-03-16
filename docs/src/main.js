import Vue from 'vue'
import App from './App.vue'
import '../../dist/nutterUi.css'
import nutterUi from '../../dist/main.umd.js'

Vue.use(nutterUi)
new Vue({
  el: '#app',
  render: h => h(App)
})
