import {
  isAbsoluteUrl
} from '@/utils'

// mock 支持
// config.mock = true 启用该拦截器
export default {
  options: {
    baseURL: ''
  },
  install(requestInterceptor, responseInterceptor, opts = {}) {
    let {
      baseURL
    } = Object.assign({}, this.options, opts)

    if (baseURL) {
      requestInterceptor.use(config => {
        if (config.mock === true) {
          if (isAbsoluteUrl(config.url)) {
            if (config.baseURL && config.url.indexOf(config.baseURL) === 0) {
              config.url = config.url.replace(config.baseURL, '')
              config.baseURL = baseURL
            }
          } else {
            config.baseURL = baseURL
          }
        }
        return config
      })
    }
  }
}
