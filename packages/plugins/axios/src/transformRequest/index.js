import flatArray from './src/flatArray'

export default {
  install(transformRequestInterceptor, opts = {}) {
    if (opts.flatArray) {
      transformRequestInterceptor.push(flatArray)
    }
  }
}
