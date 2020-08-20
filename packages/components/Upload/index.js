/*
 * @Author: nutter
 * @Date: 2020-08-19 18:47:12
 * @LastEditors: nutter
 * @LastEditTime: 2020-08-20 17:25:05
 * @FilePath: \nutter-ui\packages\components\Upload\index.js
 */
import component from './src/index.vue'
import componentImage from './src/image.vue'

component.install = function (Vue) {
    Vue.component(component.name, component);
    Vue.component(componentImage.name, componentImage);
}
export default component;