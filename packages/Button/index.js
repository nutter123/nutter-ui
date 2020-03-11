import XButton from './src/index.vue'

XButton.install = function (Vue) {
    Vue.component(XButton.name, XButton)
}
export default XButton;