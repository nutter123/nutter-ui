import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context('./components', // 是否查询其子目录 
    false,
    /Base[A-Z]\w+\.(vue|js)$/);

requireComponent.keys().forEach(fileName => { // 获取组件配置  
    const componentConfig = requireComponent(fileName)
    const componentName = upperFirst(camelCase( // 获取和目录深度无关的文件名 
        fileName.split('/').pop().replace(/\.\w+$/, ''))) // 全局注册组件 
    // Vue.component(componentName, componentConfig.default || componentConfig)
})

//文件操作
export const requireContentFolderObj = (r, exinclude) => {
    let contents = {}
    const paths = r.keys().filter((p) => {
        return exinclude.indexOf(p) == -1
    })
    for (let path of paths) {
        let pArray = path.split('/').slice(1),
            l = pArray.length,
            fn = r(path).default || r(path),
            utilObj = contents
        pArray[l - 1] = pArray[l - 1].match(/(\w+-?\w+).js$/)[1]

        for (let i = 0; i < l; i++) {
            let p = pArray[i]
            if (i < l - 1) {
                if (!contents[p]) {
                    contents[p] = {}
                }
                utilObj = contents[p]
            } else if (i == l - 1) {
                utilObj[p] = fn
            }
        }
    }
    return contents
}