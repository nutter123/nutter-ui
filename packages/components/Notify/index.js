/*
 * @Author: nutter
 * @Date: 2020-08-20 16:52:35
 * @LastEditors: nutter
 * @LastEditTime: 2020-08-20 16:52:57
 * @FilePath: \nutter-ui\packages\components\Notify\index.js
 */
import {
  Notification
}
from 'element-ui'

const defaultOptions = {
  title: '系统提示',
  type: 'info'
}

const callNotification = (options = {}) => {
  return Notification(Object.assign({}, defaultOptions, options))
}

const mergeOptions = (toOptions = {}, targetOptions) => {
  if (targetOptions && typeof targetOptions !== 'object') {
    targetOptions = {
      message: String(targetOptions)
    }
  }
  return Object.assign({}, toOptions, targetOptions)
}

const shortcut = {
  'success': {
    type: 'success',
    duration: 5000
  },
  'info': {
    type: 'info',
    duration: 10000
  },
  'warning': {
    type: 'warning',
    duration: 15000
  },
  'warn': {
    type: 'warning',
    duration: 15000
  },
  'danger': {
    type: 'danger',
    duration: 30000
  }
}
let addShortcutsToSomeObj = (someObj) => {
  Object.keys(shortcut).forEach(key => {
    someObj[key] = (options = {}) => {
      return callNotification(mergeOptions(shortcut[key], options))
    }
  })
}

let Notify = {}
addShortcutsToSomeObj(Notify)

let {
  success,
  info,
  warning,
  warn,
  danger
} = Notify

export {
  success,
  info,
  warning,
  warn,
  danger
}

export default {
  install(Vue, options = {}) {
    // 将方法扩展到Vue实例上
    addShortcutsToSomeObj(Vue.prototype)
  }
}