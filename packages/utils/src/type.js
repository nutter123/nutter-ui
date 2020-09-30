/*
 * @Author: nutter
 * @Date: 2020-08-21 16:14:12
 * @LastEditors: nutter
 * @LastEditTime: 2020-09-24 15:59:57
 * @FilePath: \nutter-ui\packages\utils\src\type.js
 */
const toString = Object.prototype.toString

const class2type = (() => {
  let types = {}
  'Boolean Number String Function Array Date RegExp Object Error Symbol'.split(' ').forEach(name => {
    types[`[object ${name}]`] = name.toLowerCase()
  })
  return types
})();

/**
 * 取得obj的数据类型， boolean/number/string/function/array/date/regexp/object/error/symbol
 * @param obj
 */
export default obj => {
  if (obj == null) {
    return String(obj)
  }
  return typeof obj === 'object' || typeof obj === 'function' ?
    class2type[toString.call(obj)] || 'object' :
    typeof obj
}