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
