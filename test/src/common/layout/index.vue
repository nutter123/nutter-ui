<template>
    <div class="layout df" id="layout">
        <!-- layoutheader -->
        <layoutheader @logout="logout"></layoutheader>
        <!-- layout-menu -->
        <div class="layout-menu">
            <layoutmenu :menus="menus" :menus-tree="menusTree"></layoutmenu>
        </div>
        <!-- layout-content -->
        <div class="layout-content flex1">
            <keep-alive include="v2BuildOrder">
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>
<script>
import { mapState} from 'vuex';
// import { setUserInfo, setPageMenu, setFuncMenu } from '@/store/mutation-types.js';
// import * as localStorageMng from '@/utils/local-storage-mng'
import { array2tree } from '@/utils/util'
import layoutheader from './header';
import layoutmenu from './menu';
// import MENUS from './menus'
import routes from "@/router/routes";
//import * as API from '@/api/userApi';

export default {
    name: 'layout',
    data: function() {
        return {
            menus: [], //IS_DEV ? [...MENUS, ...TEST_MENUS] : Object.freeze(MENUS),
        }
    },
    components: {
        layoutheader,
        layoutmenu
    },
    methods: {
        // ...mapMutations({ setUserInfo: setUserInfo, setPageMenu: setPageMenu, setFuncMenu: setFuncMenu }),
        // header methods
        logout() {
            // 清除浏览器存储的用户数据
            // localStorageMng.clearUserInfo()
            // 清除store 用户信息
            // this.setUserInfo({})
            // // 清除页面菜单
            // this.setPageMenu([])
            // // 清除功能菜单
            // this.setFuncMenu([])
            // // 重定到登陆
            // this.$router.replace({ path: '/login' })
        },
        // 加载菜单
        loadUserMenu() {
            //let params = { act_user_id: this.userInfo.user_id }
            // this.menus = MENUS
            this.menus = routes
            /*
            API.getUserMenuList(params).then((data) => {
                if (data.resultObj) {
                    let pageMenu = data.resultObj.page_menu || []
                    let funcMenu = data.resultObj.func_menu || []
                    this.menus = pageMenu
                    // 保存页面菜单
                    this.setPageMenu(pageMenu)
                    // 保存功能菜单
                    this.setFuncMenu(funcMenu)
                }
            })*/
        }
    },
    computed: {
        // 菜单树形列表
        menusTree() {
            return this.menus.length ? array2tree(this.menus) : [];
        },
        ...mapState(['userInfo', 'pageMenu', 'funcMenu'])
    },
    created() {
        this.loadUserMenu();
    }
}
</script>
