/*
 * @Author: nutter
 * @Date: 2020-08-21 16:48:16
 * @LastEditors: nutter
 * @LastEditTime: 2020-08-21 16:48:38
 * @FilePath: \nutter-ui\packages\components\Loader\src\loader.js
 */
import {
  Loading
} from 'element-ui'

let instance = null
let options = {
  fullscreen: true,
  lock: true,
  text: '拼命加载中...'
}

let getInstance = () => {
  // 有可能会出现多实例情况？
  let mask = document.querySelector('.el-loading-mask')
  if (mask && mask.parentNode) {
    mask.parentNode.removeChild(mask)
  }
  return instance = Loading.service(options)
}

const Loader = {
  show() {
    getInstance()
  },
  hide() {
    if (instance) {
      instance.close()
      instance = null
    }
  }
}

// export to window
if (window) {
  window.__$Loader__ = Loader
}

export default {
  mergeOptions(opts = {}) {
    return options = Object.assign(options, opts)
  },
  hassGlobalLoader() {
    // return window && window.parent && window.parent.__$Loader__
    return false
  },
  show() {
    if (this.hassGlobalLoader()) {
      window.parent.__$Loader__.show()
    } else {
      Loader.show()
    }
  },
  hide() {
    if (this.hassGlobalLoader()) {
      window.parent.__$Loader__.hide()
    } else {
      Loader.hide()
    }
  }
}