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