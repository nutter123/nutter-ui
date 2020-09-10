import {
  authMac,
  decomposeUrl
} from '@packages/utils'

let authorization = ({
  url,
  method,
  macId,
  macKey
}) => {
  let urlDecomposion = decomposeUrl(url)
  return authMac({
    macId,
    macKey,
    httpMethod: method,
    requestURI: urlDecomposion.uri,
    host: urlDecomposion.host
  })
}

let isDomain = (function () {
  return !/^\d+$/.test(location.hostname.replace(/\./g, ''))
}())

// hmac 认证
// https://coding.net/u/chenzuopeng/p/wm-uc/git
export default {
  install(requestInterceptor, responseInterceptor, opts = {}) {

    requestInterceptor.use(config => {
      // mac = false 接口不做hmac认证
      if (config.mac !== false && config.headers.Authorization == null) {
        if (!isDomain && console && console.log) {
          console.log('Cookie is used in non-domain, confirm that in your expectation.')
        }
        Object.assign(config.headers, {
          Authorization: authorization(Object.assign({
            macId: opts.MAC_ID,
            macKey: opts.getMacKey()
          }, config)),
          [opts.SESSION_ID]: opts.getSessionId()
        })
      }
      return config
    })
  }
}
