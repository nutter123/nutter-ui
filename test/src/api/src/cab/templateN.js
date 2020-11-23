import axios from "axios"
import {
    ims
} from "@/api/config"
const _module = `${ims}/cabinet/template`
export default {
    /**
     * 获取模版列表
     *
     * @param {any} data
     * @post
     */
    getList(data) {
        return axios({
            url: `${_module}/list`,
            method: 'GET',
            params: data
        })
    },
    /**
     * 获取模版详情
     *
     * @param {any} data
     * @post
     */
    getDetail(id) {
        return axios({
            url: `${_module}/${id}/detail`,
            method: 'GET'
        })
    },
    /**
     * 删除模版
     *
     * @param {any} params
     * @post
     */
    setStatus(id, data) {
        return axios({
            url: `${_module}/${id}/status`,
            method: 'PUT',
            data
        })
    },
    /**
     * 新增模版
     *
     * @param {any} params
     * @post
     */
    add(data) {
        return axios({
            url: `${_module}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data
        })
    }
}