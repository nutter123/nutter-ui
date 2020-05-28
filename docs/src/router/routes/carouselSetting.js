import { lazyComponent } from '@/utils';
export default [
    {
        path: '/carouselSetting',
        name: 'carouselSetting',
        icon: 'menu-system',
        title: '轮播图管理',
        component: lazyComponent('carouselSetting', true)
    }
];