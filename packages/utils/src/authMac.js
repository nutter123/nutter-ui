import randText from './randText'
import hmacSHA256 from 'crypto-js/hmac-sha256'
import Base64 from 'crypto-js/enc-base64'
import options from '@packages/options'

class RequestContent {
  constructor(config = {
    nonce: '',
    httpMethod: '',
    requestURI: '',
    host: '',
    symbol: ''
  }) {
    this.nonce = config.nonce
    this.httpMethod = config.httpMethod.toUpperCase()
    this.requestURI = config.requestURI
    this.host = config.host
    this.symbol = config.symbol
  }
  build() {
    return this.nonce + this.symbol +
      this.httpMethod + this.symbol +
      this.requestURI + this.symbol +
      this.host + this.symbol
  }
}

class Mac {
  constructor(config = {
    macKey: '',
    requestContent: null
  }) {
    this.macKey = config.macKey
    this.requestContent = config.requestContent
  }
  build() {
    return Base64.stringify(hmacSHA256(this.requestContent.build(), this.macKey))
  }
}

class AuthMac {
  constructor(config = {
    macId: '',
    timestamp: 0,
    nonce: '',
    mac: null,
    symbol: ''
  }) {
    this.macId = config.macId
    this.timestamp = config.timestamp
    this.nonce = config.nonce
    this.mac = config.mac
    this.symbol = config.symbol
  }
  build() {
    return `${this.symbol} ${[
      `id=${this.macId}`,
      `nonce=${this.nonce}`,
      `mac=${this.mac.build()}`
    ].join(',')}`
  }
}

function makeNonce(len = options.utils.authMac.nonceLen) {
  let timestamp = new Date().getTime()
  let code = randText(len)
  return {
    timestamp,
    code,
    nonce: `${timestamp}:${code}`
  }
}

export {
  RequestContent,
  Mac,
  AuthMac,
  makeNonce
}

/**
 * hmac 认证
 */
export default (config = {
  macId: '',
  macKey: '',
  httpMethod: '',
  requestURI: '',
  host: ''
}) => {
  let {
    macId,
    macKey,
    httpMethod,
    requestURI,
    host
  } = config
  let macNonce = makeNonce()
  let requestContent = new RequestContent({
    nonce: macNonce.nonce,
    httpMethod,
    requestURI,
    host,
    symbol: options.utils.authMac.requestContentSymbol
  })
  let mac = new Mac({
    macKey,
    requestContent
  })
  let authMac = new AuthMac({
    macId,
    timestamp: macNonce.timestamp,
    nonce: macNonce.nonce,
    mac,
    symbol: options.utils.authMac.authMacSymbol
  })
  return authMac.build()
}
