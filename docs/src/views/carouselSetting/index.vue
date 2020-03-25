<template>
  <div class="main">
    <n-title>轮播图设置</n-title>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="腾云商家" name="1">
        <table-t v-if="activeIndex==1"></table-t>
      </el-tab-pane>
      <el-tab-pane label="快递柜" name="2">
        <table-k v-if="activeIndex==2"></table-k>
      </el-tab-pane>
    </el-tabs>
    <div class="page-main p0 df main__custom">
      <div class="br width-100">
        <el-row>
          <el-col :span="3" :offset="1" class="setting-menu">
            <div class="menu-top">所属产品</div>
            <el-menu
              :default-active="activeIndex"
              class="el-menu-vertical-demo"
              background-color="#fff"
              text-color="#111"
              active-text-color="#f5a623"
              @select="onMenuSelect"
            >
              <el-menu-item index="1">
                <span slot="title">腾云商家</span>
              </el-menu-item>
              <el-menu-item index="2">
                <span slot="title">快递柜</span>
              </el-menu-item>
            </el-menu>
          </el-col>
          <el-col :span="20" v-show="activeIndex==1">
            <table-t></table-t>
          </el-col>
          <el-col :span="20" v-show="activeIndex==2">
            <table-k></table-k>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import tableT from "./components/tableT";
import tableK from "./components/tableK";
export default {
  data() {
    return {
      activeIndex: "2"
    };
  },
  components: {
    tableT,
    tableK
  },
  methods: {
    onMenuSelect(index) {
      this.activeIndex = index;
    }
  }
};
</script>
<style>
.width-100 {
  width: 100%;
}
.menu-top {
  background: #f5a623;
  font-weight: bolder;
  height: 50px;
  line-height: 50px;
  color: #fff;
}
.lh40 {
  line-height: 40px;
}
.setting-menu {
  height: 500px;
  margin-top: 10px;
  text-align: center;
  border: 1px solid #c5c5c5;
}
.pl-20 {
  padding-left: 20px;
}
</style>
