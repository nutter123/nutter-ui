import resolve from 'rollup-plugin-node-resolve'; //帮助 Rollup 查找外部模块，然后导入
import commonjs from 'rollup-plugin-commonjs'; //将CommonJS模块转换为 ES2015 供 Rollup 处理
import babel from "rollup-plugin-babel"; //让我们可以使用es6新特性来编写代码
import sass from 'rollup-plugin-sass';
import {
    terser
} from 'rollup-plugin-terser'; //压缩js代码，包括es6代码压缩
import {
    eslint
} from 'rollup-plugin-eslint'; //js代码检测
import vue from 'rollup-plugin-vue' //类vue-loader作用
import json from 'rollup-plugin-json';
import css from 'rollup-plugin-css-only' // 提取css，压缩能力不行
import CleanCSS from 'clean-css' // 压缩css
import {
    writeFileSync
} from 'fs' // 写文件

const inputList = require('../packages/lib-list')
const isDev = process.env.NODE_ENV !== 'production';

export default {
    input: ['packages/index', 'packages/Css/util'],
    external: ['lodash', 'ms', 'vue'],
    output: [
        // {
        //   name: 'cjs',
        //   file: "dist/main.js",
        //   format: 'cjs',
        //   globals: {
        //     vue: 'Vue'
        //   },
        // },
        // {
        //   name: 'es',
        //   file: "dist/main.esm.js",
        //   format: 'es',
        // },
        // {
        //     name: 'nutterUi',
        //     file: "dist/main.umd.js",
        //     format: 'umd',
        //     globals: {
        //         vue: 'Vue'
        //     },
        // }
    ],
    plugins: [
        resolve({
            extensions: ['.js', '.vue', '.json', 'css', 'scss']
        }),
        sass({
            output(style) {
                // 压缩 css 写入 dist/nutterUi.css
                writeFileSync('dist/nutterUi.css', new CleanCSS().minify(style).styles)
            }
        }),
        commonjs(),
        vue({
            css: false
        }),
        babel({
            exclude: 'node_modules/**', // 防止打包node_modules下的文件
            runtimeHelpers: true, // 使plugin-transform-runtime生效
        }),
        // css({
        //     output(style) {
        //         // 压缩 css 写入 dist/nutterUi.css
        //         writeFileSync('dist/nutterUi.css', new CleanCSS().minify(style).styles)
        //     }
        // }),
        eslint({
            throwOnError: true,
            throwOnWarning: false,
            include: ['packages/**'],
            exclude: ['node_modules/**']
        }),
        json(),
        !isDev && terser()
    ]
};