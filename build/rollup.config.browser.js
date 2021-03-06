//一个自动执行的功能，适合作为<script>标签。（如果要为应用程序创建一个捆绑包，您可能想要使用它，因为它会使文件大小变小。）
import base from './rollup.config.base'
import uglify from 'rollup-plugin-uglify-es'

const config = Object.assign({}, base, {
    output: {
        exports: 'named',
        name: 'nutterUi',
        file: 'dist/main.min.js',
        format: 'iife'
    }
})

config.plugins.push(uglify());

export default config;