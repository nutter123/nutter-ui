/*
 * @Author: nutter
 * @Date: 2020-08-19 14:03:01
 * @LastEditors: nutter
 * @LastEditTime: 2020-11-24 09:54:41
 * @FilePath: \nutter-ui\test\src\api\index.js
 */
// api 文件以统一格式 export function xxx 输出
import { requireContentFolderObj } from "@/utils";
const api = requireContentFolderObj(require.context('./src', true, /^\.\/[\s\S]+\/*\.js$/), ['./index.js'])
console.log(api)
export default api