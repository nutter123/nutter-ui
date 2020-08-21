/*
 * @Author: nutter
 * @Date: 2020-08-21 16:31:18
 * @LastEditors: nutter
 * @LastEditTime: 2020-08-21 16:49:00
 * @FilePath: \nutter-ui\packages\plugins\axios\src\interceptor\src\loading.js
 */
import {
  Loader
} from '@/components/Loader'

let requestCount = 0
let hideLoader = (time = 150) => {
  if (--requestCount <= 0) {
    setTimeout(() => {
      Loader.hide()
    }, time)
  }
}

// ajax开始时显示loading 
// config.loading = false 禁用loading
export default {
  request: config => {
    if (config.loading !== false) {
      requestCount++
      Loader.show()
    }
    return config
  },
  response: {
    success: response => {
      if (response.config.loading !== false) {
        hideLoader()
      }
      return response
    },
    error: error => {
      if (error && error.config && error.config.loading !== false) {
        hideLoader()
      }
      return Promise.reject(error)
    }
  }
}