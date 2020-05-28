import axios from "axios"
import {
  cab,
  ims
} from "@/api/config"
import config from "@/config";
const _module = `${cab}/cabinetBoss`
const _moduleNew = `${ims}`
export default {
  /**
   * 获取老板列表选项
   *
   * @param {any} data
   * @post
   */
  bossList(data) {
    return axios({
      baseURL: config.newHost,
      url: `${_moduleNew}/merchant/list`,
      method: 'GET',
      params: data
    })
  },
  /**
   * 获取柜老板列表
   *
   * @param {any} data
   * @post
   */
  list(data) {
    return axios({
      url: `${_module}/list`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      data
    })
  },
  /**
   * 获取柜老板信息
   *
   * @param {any} data
   * @post
   */
  getInfo(data) {
    return axios({
      url: `${_module}/get`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      data
    })
  },
  /**
   * 绑定柜机
   *
   * @param {any} data
   * @post
   */
  bindCab(data) {
    return axios({
      url: `${_module}/bind`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      data
    })
  },
  /**
   * 解绑柜机
   *
   * @param {any} data
   * @post
   */
  unbindCab(data) {
    return axios({
      url: `${_module}/unbind`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      data
    })
  },
  /**
   * 获取柜机列表
   *
   * @param {any} data
   * @post
   */
  getCabList(data) {
    return axios({
      url: `${_module}/cabinetList`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      data
    })
  }
}
