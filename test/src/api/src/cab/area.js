import axios from "axios";
import { bascBase } from "@/api/config";
const _module = `${bascBase}/area`;

export default {
  /**
   * 省列表
   * * @param {any} data
   * @returns
   */
  getProvinceList() {
    return axios({
      url: `${_module}/province/list`
    });
  },
  /**
   * 城市列表
   * * @param {any} data
   * @returns
   */
  getCityList(params) {
    return axios({
      url: `${_module}/city/${params.provinceId}/list`
    });
  },
  /**
   * 区列表
   * * @param {any} data
   * @returns
   */
  getAreaList(params) {
    return axios({
      url: `${_module}/area/${params.cityId}/list`
    });
  }
};
