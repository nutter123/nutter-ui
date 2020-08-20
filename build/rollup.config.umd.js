/*
 * @Author: nutter
 * @Date: 2020-03-12 08:29:24
 * @LastEditors: nutter
 * @LastEditTime: 2020-08-20 15:18:21
 * @FilePath: \nutter-ui\build\rollup.config.umd.js
 */
//通用模块定义，以amd，cjs 和 iife 为一体
import base from './rollup.config.base'

const config = Object.assign({}, base, {
    output: {
        exports: 'named',
        name: 'nutterUi',
        file: 'dist/main.umd.js',
        format: 'umd'
    }
})


export default config;