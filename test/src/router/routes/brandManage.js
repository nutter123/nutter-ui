/*
 * @Author: nutter
 * @Date: 2020-08-03 11:32:16
 * @LastEditors: nutter
 * @LastEditTime: 2020-11-06 16:53:04
 * @FilePath: \nutter-ui\test\src\router\routes\brandManage.js
 */
import {
	lazyComponent
} from "@/utils";
export default [{
	path: "/brandManage",
	name: "brandManage",
	icon: "menu-system",
	title: "快递品牌管理",
	component: lazyComponent("BrandManage", true)
}, {
	path: "/practice",
	name: "practice",
	icon: "menu-system",
	title: "驿站业务构造",
	component: lazyComponent("Practice", true)
}];