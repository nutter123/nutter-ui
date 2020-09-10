/*
 * @Author: nutter
 * @Date: 2020-08-19 14:29:53
 * @LastEditors: nutter
 * @LastEditTime: 2020-08-20 16:11:23
 * @FilePath: \nutter-ui\packages\third\qiniu\index.js
 */
import httpRequest from '@packages/components/Upload/src/ajax'
import options from '@packages/options'

export default opts => {
    options.third.qiniu.httpRequest.getServerConfig().then(data => {
        opts.action = data.zoneUrl
        Object.assign(opts.data, {
            token: data.token
        })

        let onSuccess = opts.onSuccess
        opts.onSuccess = function (res) {
            onSuccess(Object.assign({}, data, res))
        }

        return httpRequest(opts)
    })
}