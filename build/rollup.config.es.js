/*
 * @Author: nutter
 * @Date: 2020-03-12 08:26:21
 * @LastEditors: nutter
 * @LastEditTime: 2020-08-20 15:20:49
 * @FilePath: \nutter-ui\build\rollup.config.es.js
 */
//将软件包保存为 ES 模块文件，在现代浏览器中可以通过 <script type=module> 标签引入
import base from './rollup.config.base'
import uglify from 'rollup-plugin-uglify-es'

const config = Object.assign({}, base, {
    output: {
        exports: 'named',
        name: 'nutterUi',
        file: 'dist/main.esm.js',
        format: 'esm'
    }
})

config.plugins.push(uglify());

export default config;