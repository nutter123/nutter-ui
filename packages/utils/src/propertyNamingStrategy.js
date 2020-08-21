/*
 * @Author: nutter
 * @Date: 2020-08-21 16:14:02
 * @LastEditors: nutter
 * @LastEditTime: 2020-08-21 16:16:38
 * @FilePath: \nutter-ui\packages\utils\src\propertyNamingStrategy.js
 */
import type from './type'
import eachOwn from './eachOwn'

/**
 * 字符串转驼峰
 * @param {*} str
 */
const strToHump = str => {
  return str && typeof str === 'string' ?
    str.replace(/_([a-z])/g, function (all, letter) {
      return letter.toUpperCase();
    }) : String(str)
}

/**
 * 字符串转下划线
 * @param {*} str
 */
const strToUnderline = str => {
  return str && typeof str === 'string' ?
    str.replace(/([A-Z])/g, '_$1').toLowerCase() : String(str)
}

/**
 * 对象key转驼峰
 * @param {*} data
 */
const dataToHump = data => {
  switch (type(data)) {
    case 'object': {
      let newData = {}
      eachOwn(data, (value, name) => {
        newData[strToHump(name)] = dataToHump(value)
      })
      return newData
    }
    case 'array':
      return data.map(v => dataToHump(v))
    default:
      return data
  }
}

/**
 * 对象key转下环线
 * @param {*} data
 */
const dataToUnderline = data => {
  switch (type(data)) {
    case 'object': {
      let newData = []
      eachOwn(data, (value, name) => {
        newData[strToUnderline(name)] = dataToUnderline(value)
      })
      return newData
    }
    case 'array':
      return data.map(v => dataToUnderline(v))
    default:
      return data
  }
}

export {
  strToHump,
  strToUnderline,
  dataToHump,
  dataToUnderline
}