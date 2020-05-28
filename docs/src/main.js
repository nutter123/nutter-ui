import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import nutterUi from '../../dist/main.umd.js'
import router from '@/router'
import api from '@/api'
import config from '@/config'

import 'element-ui/lib/theme-chalk/index.css'
import '../../dist/style.css'
import '../../dist/iconfonts/iconfont.css'
import '@/scss/base.scss'
import VueCookie from 'vue-cookie'

Vue.use(ElementUI);
console.log(config)
Vue.use(nutterUi, {
  plugins: {
    axios: {
      defaults: {
        baseURL: config.host,
        headers: {
          'session_id': VueCookie.get('session_id')
        }
      },
      interceptor: {
        authMac: false,
        dataToUnderline: false,
        errorHandle: {
          errorHandle(error) {
            if (error.response.status == 400) {
              if (error.response.data && error.response.data.msg) {
                let msg = error.response.data.msg.split('，')[0];
                Message({
                  message: msg,
                  type: 'error',
                  duration: 2000,
                  showClose: true
                })
              }
            }
          }
        }
      }
    }
  },
  third: {
    qiniu: {
      httpRequest: {
        qiniuTokenUrl(type) {
          // return `${config.qiniuUrl}common/${type}/qiniu_token`
          return `${config.qiniuUrl}basics/v1.0/qiniu/token?type=${type}`;
        }
      }
    }
  }
});

Vue.prototype.$apis = api;

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
