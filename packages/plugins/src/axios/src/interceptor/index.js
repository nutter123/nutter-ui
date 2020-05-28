import {
  eachOwn,
  requireContextToObj
} from '@packages/utils'

let interceptors = requireContextToObj(require.context('./src', false, /\.js$/))

export default {
  install(requestInterceptor, responseInterceptor, opts = {}) {
    eachOwn(opts, (value, name) => {
      if (value !== false && interceptors[name]) {
        let interceptor = interceptors[name]

        // 支持install模式
        // 完全自定义处理
        if (typeof interceptor.install === 'function') {
          interceptor.install(requestInterceptor, responseInterceptor, value)
        }
        // {
        //    request: Function, 
        //    response: Function(success)
        //  } 
        //  or
        // {
        //    request: Function, 
        //    response: {
        //      success: Function,
        //      error: Function
        //    }
        //  }
        else {
          if (interceptor.request) {
            requestInterceptor.use(interceptor.request)
          }
          if (interceptor.response) {
            if (typeof interceptor.response === 'function') {
              responseInterceptor.use(interceptor.response)
            } else {
              responseInterceptor.use(interceptor.response.success, interceptor.response.error)
            }
          }
        }
      }
    })
  }
}
