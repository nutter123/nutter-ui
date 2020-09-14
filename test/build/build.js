require('./check-versions')()//检测依赖版本要求

process.env.NODE_ENV = 'production'

var ora = require('ora') //终端加载动画
var rm = require('rimraf') //node中的删除
var path = require('path')
var chalk = require('chalk')//终端字符串样式
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')

var spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err_rm => { //删除dist文件夹，执行回调
  if (err_rm) throw err_rm
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})