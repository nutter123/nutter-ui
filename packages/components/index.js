import Button from './Button'
import Icon from './Icon'
import Title from './Title'
import Dialog from './Dialog'

export * from './Button'
export * from './Icon'
export * from './Title'
export * from './Dialog'

export default {
    install(Vue, opts = {}) {
        Vue.use(Button, opts.button);
        Vue.use(Icon, opts.icon);
        Vue.use(Title, opts.title);
        Vue.use(Dialog, opts.dialog);
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