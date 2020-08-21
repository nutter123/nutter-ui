import Loader from './src/loader'

export {
  Loader
}

export default {
  install(Vue) {
    Vue.prototype.showLoading = () => Loader.show()
    Vue.prototype.hideLoading = () => Loader.hide()
  }
}
