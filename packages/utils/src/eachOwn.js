/*
 * @Author: nutter
 * @Date: 2020-05-28 11:19:27
 * @LastEditors: nutter
 * @LastEditTime: 2020-08-19 11:14:13
 * @FilePath: \nutter-ui\packages\utils\src\eachOwn.js
 */
/**
 * 遍历对象的自有属性
 * @param obj 对象
 * @param fn 回调函数，fn(obj[key], key, obj)
 */
export default (obj, fn) => {
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      fn(obj[key], key, obj)
    }
  }
}