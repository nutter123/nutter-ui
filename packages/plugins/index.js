import axiosPlugin from './src/axios'

export default {
    install(Vue, opts = {}) {
        // 安装axios，可选
        if (opts.axios !== false) {
            Vue.use(axiosPlugin, opts.axios)
        }
    }
}