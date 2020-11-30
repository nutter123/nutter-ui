/*
 * @Author: nutter
 * @Date: 2020-08-17 15:09:42
 * @LastEditors: nutter
 * @LastEditTime: 2020-11-24 10:48:17
 * @FilePath: \nutter-ui\test\src\axios\index.js
 */
import {
    axios
} from '../../../dist/nutterUi.js'
import VueCookie from 'vue-cookie'
import config from '@/config'
import {
    Message
} from 'element-ui'

const defaults = {
    baseURL: config.host,
    headers: {
        'session_id': VueCookie.get('session_id')
    }
}
const interceptor = {
    authMac: false,
    dataToUnderline: false,
    errorHandle: {
        errorHandle(error) {
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
        }
    }
}
const $axios = axios.install({
    defaults,
    interceptor
});
export default $axios;