import axios from "axios"
import {
    version
} from "@/api/config"
import config from "@/config";
const _module = `${version}/banner`
export default {
    /**
     * 添加
     *
     * @param {any} data
     * @post
     */
    add(data) {
        return axios({
            baseURL: config.host,
            url: `${_module}/add`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            params: data
        })
    },
    /**
     * 添加
     *
     * @param {any} data
     * @post
     */
    delete(data) {
        return axios({
            baseURL: config.host,
            url: `${_module}/delete`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'session_id': '2a8e1fe4-e72f-46a6-b673-4a005b3896b7'
            },
            params: data
        })
    },
    /**
     * 获取详情
     *
     * @param {any} data
     * @post
     */
    getDetail(data) {
        return axios({
            baseURL: config.host,
            url: `${_module}/detail`,
            method: 'GET',
            params: data
        })
    },
    /**
     * 获取列表
     *
     * @param {any} data
     * @post
     */
    getList(data) {
        return axios({
            baseURL: config.host,
            url: `${_module}/list`,
            method: 'GET',
            params: data
        })
    },
    /**
     * 修改
     *
     * @param {any} data
     * @post
     */
    update(data) {
        return axios({
            baseURL: config.host,
            url: `${_module}/update`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            params: data
        })
    },
    /**
     * 移动
     *
     * @param {any} data
     * @post
     */
    shift(data) {
        return axios({
            baseURL: config.host,
            url: `${_module}/shift`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data
        })
    },
}