// api 文件以统一格式 export function xxx 输出
import { requireContentFolderObj } from "@/utils";
const api = requireContentFolderObj(require.context('./src', true, /^\.\/[\s\S]+\/*\.js$/), ['./index.js'])
// console.log(api)
export default api