/*
 * @Author: nutter
 * @Date: 2020-08-14 14:26:45
 * @LastEditors: nutter
 * @LastEditTime: 2020-08-14 14:34:17
 * @FilePath: \channel-web\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'
// 去中心化路由加载； routes 内的路由
import routes from "./routes";

Vue.use(Router)
// 开发环境配置菜单页面
let menuRoute = {
	path: '/menu',
	name: 'menu',
	component: r => {
		require(['@/views/menu'],r)
	}
}
let isDev = process.env.NODE_ENV == 'development'
if (isDev) { routes.unshift(menuRoute) }
routes.unshift(menuRoute)
const router = new Router({
	routes
});


export default router;
export {routes};