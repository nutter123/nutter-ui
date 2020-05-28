import { lazyComponent } from '@/utils';
export default [
    {
        path: '/websiteManage',
        name: 'websiteManage',
        icon: 'menu-system',
        title: '网点管理',
        component: lazyComponent('websiteManage', true)
    }
];