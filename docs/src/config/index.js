/*
 * @Descripttion:
 * @version:
 * @Author: nut
 * @Date: 2019-09-03 11:08:27
 * @LastEditors  : nut
 * @LastEditTime : 2020-01-21 14:54:42
 */
const env = process.env.NODE_ENV
const devHost = "https://test-api.tengzone.com/"
const devHostNew = "https://test-api.tengzone.com/"
// const devHost = 'https://api.tengzone.com/'
// const devHostNew = "https://api.tengzone.com/"
// const devHost = 'http://eqe7m6.natappfree.cc/'
// const devHostNew = "http://7b6esm.natappfree.cc/"
// const devHost = 'http://47.107.111.82:14101/'
// const devHostNew = 'http://47.107.111.82:14101/'
const testHost = "https://test-api.tengzone.com/"
const testHostNew = "https://test-api.tengzone.com/"
// const prodHost = 'http://47.107.33.35:13188/'
// const prodHostNew = "http://47.107.111.82:14101/"
const prodHost = "https://test-api.tengzone.com/"
const prodHostNew = "https://test-api.tengzone.com/"

// 开发环境： npm run dev
const development = {
  host: devHost,
  qiniuUrl: devHostNew,
  newHost: devHostNew
}

// 打包开发环境： npm run build dev
const dev = {
  host: devHost,
  qiniuUrl: devHost,
  newHost: devHostNew
}

// 打包测试环境： npm run build test
const test = {
  host: testHost,
  qiniuUrl: testHost,
  newHost: testHostNew
}

// 打包正式环境： npm run build
const production = {
  host: prodHost,
  qiniuUrl: prodHostNew,
  newHost: prodHostNew
}

const CONFIG = {
  development,
  dev,
  test,
  production
}
export default CONFIG[env]
