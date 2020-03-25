/*
 * @Descripttion:
 * @version:
 * @Author: nut
 * @Date: 2019-10-23 16:39:39
 * @LastEditors  : nut
 * @LastEditTime : 2019-12-18 11:02:11
 */
// import devConfig from '../../config/dev.env.js'
// import prodConfig from '../../config/prod.env.js'
const env = process.env.NODE_ENV

const host = 'https://api.tengzone.com/'
const devHost = 'https://api.tengzone.com/'
// const devHost = 'http://ra7tet.natappfree.cc/'
const testHost = 'http://api.timi91.com/'
const prodHost = 'https://api.tengzone.com/'

// 开发环境： npm run dev
const development = {
    host: devHost,
    hostNew: host,
    qiniuUrl: host,
    orderDetailIframe: 'http://home.tengzone.com/',
}

// 打包开发环境： npm run build dev
const dev = {
    host: devHost,
    hostNew: host,
    qiniuUrl: host,
    orderDetailIframe: 'http://iform-web.dev.timi91.com/#/',
}

// 打包测试环境： npm run build test
const test = {
    host: testHost,
    hostNew: host,
    qiniuUrl: host,
    orderDetailIframe: 'http://iform-web.test.timi91.com/#/',
}

// 打包正式环境： npm run build
const production = {
    host: prodHost,
    hostNew: prodHost,
    qiniuUrl: host,
    orderDetailIframe: 'http://home.tengzone.com/',
}

const CONFIG = {
    development,
    dev,
    test,
    production
}
export default CONFIG[env]