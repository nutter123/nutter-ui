/*
 * @Author: nutter
 * @Date: 2020-08-21 16:12:02
 * @LastEditors: nutter
 * @LastEditTime: 2020-09-24 15:26:34
 * @FilePath: \nutter-ui\packages\plugins\axios\src\transformRequest\src\flatArray.js
 */
// 对请求参数进行格式转化,将对象中的数组类型属性转化为字符串
export default data => {
  for (let key in data) {
    if (data.hasOwnProperty(key) && data[key] instanceof Array) {
      data[key] = data[key].join(',')
    }
  }
  return data
}