import extend from 'extend'
import VueCookie from 'vue-cookie'
import {
  randRange
} from '@packages/utils/src/randText'
import axios from 'axios'
// import {
//   warn
// } from '@packages/log'

const options = {
  debug: true,
  // 环境配置
  // false不覆盖
  // 详细配置查看 profile/index.js
  profile: {
    // 图片域名
    imgDomain: ''
  },

  // 扩展插件库配置
  // false布覆盖
  // 详细配置查看 libs/index.js
  libs: {
    // CKEDITOR
    ckeditor: null
  },

  // 插件安装配置
  // false不安装
  // 详细配置各插件中查看
  plugins: {},

  // 过滤器安装配置
  // false不安装
  filters: {
    date: true,
    currency: true,
    value: true,
    url: true
  },

  // 组件安装配置
  // false不安装
  // 详细配置各组件中查看
  components: {
    // 富文本编辑器，false则不安装
    editor: {},

    // 图片预览，false则不安装
    messageBox: {},

    // Modal，false则不安装
    modal: {},

    // 扩展Vue实例的提示方法，false则不安装
    notify: {},

    // 文件/图片上传，false则不安装
    // 提供的配置将会替换组件props的默认值
    upload: {
      // 文件上传组件，false则不安装
      upload: {},

      // 图片上传组件，false则不安装
      // 只有安装了upload，才能安装imageUpload
      imageUpload: {}
    },

    // 扩展Vue实例加载中方法，false则不安装
    loader: {}
  },
  axios: {
    defaults: {},
    interceptor: {
      applicationForm: true,
      dataToUnderline: true,
      disableCache: true,
      errorHandle: true,
      loading: true,
      authMac: {
        MAC_ID: '2YotnFZFEjr1zCsicMWpAA',
        MAC_KEY: 'mac_key',
        SESSION_ID: 'session_id',
        decode: true,
        getMacKey() {
          let macKey = VueCookie.get(this.MAC_KEY) || ''
          return this.decode ? decodeURIComponent(macKey) : macKey
        },
        getSessionId() {
          let sessionId = VueCookie.get(this.SESSION_ID) || ''
          return this.decode ? decodeURIComponent(sessionId) : sessionId
        }
      },
      removeEmpty: true,
      returnResponseData: true
    },
    transformResponse: {
      hump: true
    }
  },
  // 第三方安装配置
  // false不安装
  third: {
    qiniu: {
      httpRequest: {
        /**
         * 七牛上传配置URL
         * @param {*} type
         */
        qiniuTokenUrl(type) {
          return `/v1.0/common/${type}/qiniu_token`
        },
        /**
         * 获取七牛上传配置
         * http://192.168.1.135:9001/eam/swagger-ui.html#!/HomeController/getQiniuTokenUsingGET
         * @param {*} type 1-图片
         */
        getServerConfig(type = 1) {
          return axios({
            url: this.qiniuTokenUrl(type),
            method: 'GET',
            responseType: 'json'
          }).then(data => {
            let datas = data;
            return {
              domain: datas.domainUrl,
              zoneUrl: this.getZoneUrl(datas.qiniuZone.upUrls),
              token: datas.token
            }
          })
        },
        /**
         * 取七牛上传地址
         * @param {*} qiniuZone
         */
        getZoneUrl(qiniuZone) {
          if (Array.isArray(qiniuZone)) {
            let len = qiniuZone.length
            return qiniuZone[randRange(0, len - 1)]
          }
          return String(qiniuZone)
        }
      }
    }
  },

  // 工具类配置项
  // false则不覆盖
  utils: {
    fmt: {
      // 日期格式化
      date: {
        format: 'yyyy-MM-dd hh:mm:ss'
      },
      // 货币格式化
      currency: {
        places: 2,
        symbol: '￥',
        thousand: ', ',
        decimal: '.'
      }
    },
    // hmac 认证
    authMac: {
      requestContentSymbol: '\n',
      authMacSymbol: 'MAC',
      nonceLen: 8
    }
  }
}

export const merger = opts => {
  return extend(true, options, opts)
}

export default options