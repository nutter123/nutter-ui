/*
 * @Author: nutter
 * @Date: 2020-08-21 16:31:18
 * @LastEditors: nutter
 * @LastEditTime: 2020-08-21 16:34:38
 * @FilePath: \nutter-ui\packages\plugins\axios\src\interceptor\src\applicationForm.js
 */
import {
  isApplicationForm,
  eachOwn,
  type
} from '@/utils'

// 支持post/put/patch 的表单提交方式
export default {
  request: config => {
    // config.contentType || config.ContentType
    if (isApplicationForm(config.contentType || config.ContentType)) {
      config.headers = Object.assign({
        'Content-Type': 'application/x-www-form-urlencoded;chartset=UTF-8'
      }, config.headers)
      if (config.data && type(config.data) === 'object') {
        let params = new URLSearchParams()
        eachOwn(config.data, (value, key) => {
          params.append(key, value)
        })
        config.data = params
      }
    }
    return config
  }
}
