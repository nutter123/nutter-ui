/*
 * @Author: nutter
 * @Date: 2020-08-19 14:41:18
 * @LastEditors: nutter
 * @LastEditTime: 2020-08-19 18:31:08
 * @FilePath: \nutter-ui\packages\utils\src\restructureVueCtor.js
 */
// import extend from 'extend'
import Vue from 'vue'
import expandToDefaultProps from './expandToDefaultProps'

// 深度复制对象到构造器上
// 改变原构造器
const restructureVueCtor = (originalCtor, additionalOptions = {}) => Vue.extend(true, originalCtor, additionalOptions)

// 扩展options上的配置为Vue构造器的默认props值
export const restructureDefaultPropsOfVueCtorFromOptions = (originalCtor, options = {}) => restructureVueCtor(originalCtor, {
  props: expandToDefaultProps(options)
})

export {
  restructureVueCtor
}

export default restructureVueCtor