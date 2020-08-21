/*
 * @Author: nutter
 * @Date: 2020-03-12 08:25:46
 * @LastEditors: nutter
 * @LastEditTime: 2020-08-21 17:33:24
 * @FilePath: \nutter-ui\build\rollup.config.base.js
 */
import resolve from 'rollup-plugin-node-resolve'; //帮助 Rollup 查找外部模块，然后导入
import commonjs from 'rollup-plugin-commonjs'; //将CommonJS模块转换为 ES2015 供 Rollup 处理
import babel from "rollup-plugin-babel"; //让我们可以使用es6新特性来编写代码
import builtins from 'rollup-plugin-node-builtins'; //插件内置
import {
    terser
} from 'rollup-plugin-terser'; //压缩js代码，包括es6代码压缩
import alias from '@rollup/plugin-alias'; //别名
import {
    eslint
} from 'rollup-plugin-eslint'; //js代码检测
import vue from 'rollup-plugin-vue' //类vue-loader作用
import json from 'rollup-plugin-json';
import sass from 'rollup-plugin-sass';
import CleanCSS from 'clean-css' // 压缩css
import requireContext from 'rollup-plugin-require-context';
import {
    writeFileSync
} from 'fs' // 写文件
var path = require('path')

const isDev = process.env.NODE_ENV !== 'production';

function resolvePath(dir) {
    return path.join(__dirname, '..', dir)
}
// const processSass = function (context, payload) {
//     return new Promise((resolve, reject) => {
//         sass.render({
//             file: context
//         }, function (err, result) {
//             console.log(result);
//             if (!err) {
//                 resolve(result);
//             } else {
//                 console.log(err);
//                 reject(err)
//             }
//         });
//     })
// };

export default {
    input: ['packages/index'],
    external: ['vue', 'axios', 'element-ui', 'extend', 'vue-cookie', 'crypto-js'],
    output: [],
    plugins: [
        builtins(),
        requireContext(), //遍历文件
        eslint({
            throwOnError: true,
            throwOnWarning: false,
            include: ['packages/utils/**'],
            exclude: ['node_modules/**']
        }),
        alias({
            resolve: ['.js', '.vue', '.json'],
            entries: {
                '@': resolvePath('packages'),
                '@components': resolvePath('packages/components')
            }
        }),
        resolve({
            extensions: ['.js', '.vue', '.json']
        }),
        vue({
            css: false
        }),
        sass({
            output(style) {
                // 压缩 css 写入 dist/nutterUi.css
                writeFileSync('dist/style.css', new CleanCSS().minify(style).styles)
            }
        }),
        commonjs({
            include: 'node_modules/**'
        }),
        babel({
            exclude: 'node_modules/**', // 防止打包node_modules下的文件
            runtimeHelpers: true, // 使plugin-transform-runtime生效
        }),
        json(),
        !isDev && terser()
    ]
};