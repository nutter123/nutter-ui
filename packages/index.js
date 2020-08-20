/*
 * @Author: nutter
 * @Date: 2020-03-11 15:46:06
 * @LastEditors: nutter
 * @LastEditTime: 2020-08-20 17:17:17
 * @FilePath: \nutter-ui\packages\index.js
 */
import './assets'

import Components from './components'
// import Plugins from './plugins'
// import Filters from './filters'
import Third from './third'
import * as utils from './utils'
import options, {
    merger as mergeOptions
} from './options'
export * from './components'
export {
    utils,
    options
}
const install = function (Vue, opts = {}) {
    if (install.installed) return;
    opts = mergeOptions(opts);

    if (opts.components !== false) {
        Vue.use(Components, opts.components)
    }

    // if (opts.plugins !== false) {
    //     Vue.use(Plugins, opts.plugins)
    // }

    // if (opts.filters !== false) {
    //     Vue.use(Filters, opts.filters)
    // }

    if (opts.third !== false) {
        Vue.use(Third, opts.third)
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install
}