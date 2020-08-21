import hump from './src/hump'

export default {
  install(transformResponseInterceptor, opts = {}) {
    if (opts.hump) {
      transformResponseInterceptor.push(hump)
    }
  }
}
