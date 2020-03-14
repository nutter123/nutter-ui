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