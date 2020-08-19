/*
 * @Author: nutter
 * @Date: 2020-08-17 15:09:42
 * @LastEditors: nutter
 * @LastEditTime: 2020-08-17 15:57:58
 * @FilePath: \channel-web\src\axios\index.js
 */
import axios from 'axios'
import VueCookie from 'vue-cookie'
import {
    Message
} from 'element-ui'
import config from '@/config'

const defaults = {
    baseURL: config.host,
    headers: {
        'session_id': VueCookie.get('session_id')
    }
}
Object.assign(axios.defaults, defaults);

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    console.log(response);
    return response.data;
}, function (error) {
    if (error.response.status == 400 || error.response.status == 500) {
        if (error.response.data && error.response.data.msg) {
            let msg = error.response.data.msg.split('，')[0];
            Message({
                message: msg,
                type: 'error',
                duration: 2000,
                showClose: true
            })
        }
    }
    // 对响应错误做点什么
    return Promise.reject(error);
});