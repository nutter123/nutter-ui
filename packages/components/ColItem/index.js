/*
 * @Author: nutter
 * @Date: 2020-08-19 11:23:01
 * @LastEditors: nutter
 * @LastEditTime: 2020-08-19 11:23:17
 * @FilePath: \nutter-ui\packages\components\ColItem\index.js
 */
import component from './src/index.vue'

component.install = function (Vue) {
    Vue.component(component.name, component)
}
export default component;