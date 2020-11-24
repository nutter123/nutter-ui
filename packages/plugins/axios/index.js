/*
 * @Author: nutter
 * @Date: 2020-08-21 16:10:24
 * @LastEditors: nutter
 * @LastEditTime: 2020-11-24 10:26:44
 * @FilePath: \nutter-ui\packages\plugins\axios\index.js
 */
import axios from 'axios'
import transformRequestFactory from './src/transformRequest'
import transformResponseFactory from './src/transformResponse'
import interceptorFactory from './src/interceptor'
import {
    axiosOptions
} from '@packages/options'
import extend from 'extend'
// axios config https://github.com/mzabriskie/axios
export default {
    install(opts = {}) {
        if (!axios) {
            console.warn('Please run npm install --save axios.')
            return
        }
        let options = extend(true, axiosOptions, opts)
        let {
            defaults,
            transformRequest,
            transformResponse,
            interceptor
        } = Object.assign(options)
        let $axios = {};
        if (defaults !== false) {
            // Object.assign(axios.defaults, defaults)
            $axios = axios.create(defaults);
        }

        if (transformRequest !== false) {
            transformRequestFactory.install($axios.defaults.transformRequest, transformRequest)
        }

        if (transformResponse !== false) {
            transformResponseFactory.install($axios.defaults.transformResponse, transformResponse)
        }

        if (interceptor !== false) {
            interceptorFactory.install($axios.interceptors.request, $axios.interceptors.response, interceptor)
        }
        return $axios;
    }
}