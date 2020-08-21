/*
 * @Author: nutter
 * @Date: 2020-08-21 16:12:02
 * @LastEditors: nutter
 * @LastEditTime: 2020-08-21 16:24:29
 * @FilePath: \nutter-ui\packages\plugins\axios\src\transformResponse\src\hump.js
 */
import {
  dataToHump
} from '@/utils'

// 数据转驼峰
export default function (data) {
  if (data && typeof data === 'object' && !(data instanceof Blob)) {
    return dataToHump(data)
  }
  return data
}
