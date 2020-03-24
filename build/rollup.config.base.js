import resolve from 'rollup-plugin-node-resolve'; //帮助 Rollup 查找外部模块，然后导入
import commonjs from 'rollup-plugin-commonjs'; //将CommonJS模块转换为 ES2015 供 Rollup 处理
import babel from "rollup-plugin-babel"; //让我们可以使用es6新特性来编写代码
// import builtins from 'rollup-plugin-node-builtins'; //插件内置
import {
    terser
} from 'rollup-plugin-terser'; //压缩js代码，包括es6代码压缩
import alias from 'rollup-plugin-alias'; //别名
import {
    eslint
} from 'rollup-plugin-eslint'; //js代码检测
import vue from 'rollup-plugin-vue' //类vue-loader作用
import json from 'rollup-plugin-json';
import css from 'rollup-plugin-css-only' // 提取css，压缩能力不行
// const postcss = require('rollup-plugin-postcss');
// import sass from 'rollup-plugin-sass';
// const sass = require('node-sass');
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
const processSass = function (context, payload) {
    return new Promise((resolve, reject) => {
        sass.render({
            file: context
        }, function (err, result) {
            console.log(result);
            if (!err) {
                resolve(result);
            } else {
                console.log(err);
                reject(err)
            }
        });
    })
};

export default {
    input: ['packages/index'],
    external: ['lodash', 'vue'],
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
        // builtins(),
        requireContext(), //遍历文件
        eslint({
            throwOnError: true,
            throwOnWarning: false,
            include: ['packages/utils/**'],
            exclude: ['node_modules/**']
        }),
        alias({
            resolve: ['.js', '.vue', '.json', 'scss', 'css', 'sass'],
            entries: {
                '@': resolvePath('packages'),
                '@components': resolvePath('packages/components')
            }
        }),
        resolve({
            extensions: ['.js', '.vue', '.json', 'css', 'scss']
        }),
        commonjs(),
        css({
            output(style) {
                // 压缩 css 写入 dist/nutterUi.css
                writeFileSync('dist/nutterUi.css', new CleanCSS().minify(style).styles)
            }
        }),
        vue({
            css: false
        }),
        babel({
            exclude: 'node_modules/**', // 防止打包node_modules下的文件
            runtimeHelpers: true, // 使plugin-transform-runtime生效
        }),
        json(),
        !isDev && terser()
    ]
};