import NtButton from './src/index.vue'

NtButton.install = function (Vue) {
    Vue.component(NtButton.name, NtButton)
}
export default NtButton;