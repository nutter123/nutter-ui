/*
 * @Author: nutter
 * @Date: 2020-05-28 10:26:29
 * @LastEditors: nutter
 * @LastEditTime: 2020-08-19 14:20:25
 * @FilePath: \nutter-ui\packages\plugins\src\axios\index.js
 */
import axios from 'axios'
import transformRequestFactory from './src/transformRequest'
import transformResponseFactory from './src/transformResponse'
import interceptorFactory from './src/interceptor'

export default {
    install(Vue, opts = {}) {
        if (!axios) {
            console.warn('Please run npm install --save axios.')
            return
        }
        let {
            defaults,
            transformRequest,
            transformResponse,
            interceptor
        } = Object.assign(opts)

        if (defaults !== false) {
            Object.assign(axios.defaults, defaults)
        }

        if (transformRequest !== false) {
            transformRequestFactory.install(axios.defaults.transformRequest, transformRequest)
        }

        if (transformResponse !== false) {
            transformResponseFactory.install(axios.defaults.transformResponse, transformResponse)
        }

        if (interceptor !== false) {
            interceptorFactory.install(axios.interceptors.request, axios.interceptors.response, interceptor)
        }
    }
}