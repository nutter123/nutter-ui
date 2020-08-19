<template>
    <el-menu
        class="el-menu-vertical-demo"
        text-color="#fff"
        :router="true"
        :collapse="isCollapse"
        :class="[isCollapse?'meun-collapse':'']"
        :unique-opened="true"
        >
        <div class="menu-controller" @click="collaps" :class="[isCollapse?'menu-controller2':'']">
            <i :class="[isCollapse?'el-icon-arrow-right':'el-icon-arrow-left']"></i>
        </div>
        <template v-for="item in menus">
            <el-submenu v-if="item.children && item.children.length>0" :index="item.id">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>{{item.title}}</span>
                </template>
                <el-menu-item :key="children.id" v-for="children in item.children" :index="children.id"  :route="{path: children.path}">{{children.title}}</el-menu-item>
            </el-submenu>
            <el-menu-item v-else :index="item.id"   :route="{path: item.path}">
                <i class="el-icon-menu"></i>
                <span slot="title">{{item.title}}</span>
            </el-menu-item>
        </template>
    </el-menu>
</template>

<script>

export default {
    name: 'sidebar',
    data() {
        return {
            leaf: Object.freeze(null),
            leafs: Object.freeze([]),
            index:'1',
            isCollapse:false
        }
    },
    props: {
        menusTree: {
            required: true,
            type: Array
        },
        menus: {
            required: true,
            type: Array
        },
        theme: {
            type: String,
            default: 'dark'
        }
    },
    watch: {
    },
    computed: {},
    created () {

    },
    mounted(){
        /*
        bus.$on("collaps-change",(e)=>{
            this.isCollapse = e
        })*/
    },
    methods: {
        collaps(){
            this.isCollapse = !this.isCollapse
            bus.$emit('collaps-change',this.isCollapse)
        }
	},
}

</script>
