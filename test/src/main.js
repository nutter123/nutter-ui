/*
 * @Author: nutter
 * @Date: 2020-03-11 20:30:00
 * @LastEditors: nutter
 * @LastEditTime: 2020-08-19 14:21:09
 * @FilePath: \nutter-ui\test\src\main.js
 */
import Vue from 'vue'
import App from '@/common/App'
import ElementUI from 'element-ui'
import nutterUi from '../../dist/main.umd.js'
import router from '@/router'
import api from '@/api'
import './axios';
import 'element-ui/lib/theme-chalk/index.css'
import '../../dist/style.css'
import '../../dist/iconfonts/iconfont.css'
// import '@/scss/base.scss'

import {
  Base64
} from 'js-base64'
import BaiduMap from 'vue-baidu-map'
import VueClipboard from 'vue-clipboard2';
import authButton from '@/components/authButton'

import {
  browserCheck,
  browserCheckNotice
} from '@/utils/util'
//
if (!browserCheck()) {
  browserCheckNotice()
}
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'jyFGZNv9j8EBtSGa351HMIGKp7MxZPPW'
})
Vue.use(Base64);
Vue.use(VueClipboard)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(nutterUi);
// Vue.use(VueAsset, {
//     // plugins: {
//     //     axios: {
//     //         defaults: {
//     //             baseURL: config.host,
//     //             headers: {
//     //                 'session_id': VueCookie.get('session_id')
//     //             }
//     //         },
//     //         interceptor: {
//     //             authMac: false,
//     //             dataToUnderline: false,
//     //             errorHandle: {
//     //                 errorHandle(error) {
//     //                     if (error.response.status == 400 || error.response.status == 500) {
//     //                         if (error.response.data && error.response.data.msg) {
//     //                             let msg = error.response.data.msg.split('，')[0];
//     //                             Message({
//     //                                 message: msg,
//     //                                 type: 'error',
//     //                                 duration: 2000,
//     //                                 showClose: true
//     //                             })
//     //                         }
//     //                     }
//     //                 }
//     //             }
//     //         }
//     //     }
//     // },
//     third: {
//         qiniu: {
//             httpRequest: {
//                 qiniuTokenUrl(type) {
//                     // return `${config.qiniuUrl}common/${type}/qiniu_token`
//                     return `${config.qiniuUrl}basics/v1.0/qiniu/token?type=${type}`;
//                 }
//             }
//         }
//     }
// })

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

Vue.prototype.$apis = api
Vue.prototype.$token = 'MzJkaVl6Z3pNVEZpTlRRd05tSmtaVGd4TW1JelkyRTFOVEUxT1RkbFlqa3hUUWJjODMxMWI1NDA2YmRlODEyYjNjYTU1MTU5N2ViOTFN.mhvrtm8ev7bpaoso7az65uioxxhtdpet.2cdb0713541670bba23f95a5a303e39f'
// vue-AMap vue高德地图组件
//https://github.com/ElemeFE/vue-amap
/* eslint-disable no-new */
Vue.component('authButton', authButton);
const appVue = new Vue({
  el: '#app',
  router,
  template: '<App></App>',
  components: {
    App
  },
  methods: {},
  created() {

  },
  mounted() {},
})



export default appVue;