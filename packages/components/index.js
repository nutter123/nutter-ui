import Button from './Button'
import Icon from './Icon'

export * from './Button'
export * from './Icon'

export default {
    install(Vue, opts = {}) {
        Vue.use(Button, opts.button);
        Vue.use(Icon, opts.icon);
    }
}
// let components = []
// const requireComponent = require.context('./', // 是否查询其子目录 
//     true,
//     /index.js$/);

// requireComponent.keys().forEach(fileName => { // 获取组件配置  
//     const componentConfig = requireComponent(fileName)
//     // const componentName = upperFirst(camelCase( // 获取和目录深度无关的文件名 
//     //     fileName.split('/').pop().replace(/\.\w+$/, ''))) // 全局注册组件 
//     components.push(componentConfig.default || componentConfig)
//     // Vue.component(componentName, componentConfig.default || componentConfig)
// })