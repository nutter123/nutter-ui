import resolve from 'rollup-plugin-node-resolve'; //帮助 Rollup 查找外部模块，然后导入
import sass from 'rollup-plugin-sass';
import CleanCSS from 'clean-css' // 压缩css
import {
    writeFileSync
} from 'fs' // 写文件
export default {
    input: ['packages/assets/index'],
    output: [{
        name: 'cjs',
        file: "dist/style.js",
        format: 'cjs'
    }, ],
    plugins: [
        resolve({
            extensions: ['.js', '.vue', '.json', 'css', 'scss']
        }),
        sass({
            output(style) {
                // 压缩 css 写入 dist/nutterUi.css
                writeFileSync('dist/style.css', new CleanCSS().minify(style).styles)
            }
        })
    ]
};