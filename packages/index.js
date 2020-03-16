// import XButton from './components/Button/index'
// import './assets/iconfonts/iconfont.css'
let components = []

const requireComponent = require.context('./components', // 是否查询其子目录 
    true,
    /index.js$/);

requireComponent.keys().forEach(fileName => { // 获取组件配置  
    const componentConfig = requireComponent(fileName)
    // const componentName = upperFirst(camelCase( // 获取和目录深度无关的文件名 
    //     fileName.split('/').pop().replace(/\.\w+$/, ''))) // 全局注册组件 
    components.push(componentConfig.default || componentConfig)
    // Vue.component(componentName, componentConfig.default || componentConfig)
})
const install = function (Vue) {
    if (install.installed) return;
    components.map(component => Vue.component(component.name, component))
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install,
    ...components
}