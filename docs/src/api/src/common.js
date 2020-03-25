import axios from "axios"
import {
    ims
} from "@/api/config"
import config from "@/config";
const _module = `${ims}/operation/group`
export default {
    /**
     * 获取运营组选项列表
     *
     * @param {any} data
     * @post
     */
    getOptionsList(data) {
        return axios({
            baseURL: config.hostNew,
            url: `${_module}/base/list`,
            method: 'GET',
            params: data
        })
    },
}