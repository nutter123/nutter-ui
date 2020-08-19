<!--
 * @Author: nutter
 * @Date: 2020-08-03 13:46:31
 * @LastEditors: nutter
 * @LastEditTime: 2020-08-17 15:55:47
 * @FilePath: \channel-web\src\views\BrandManage\components\SearchForm.vue
-->
<template>
  <div class="mtb-10">
    <!-- 查询表单 -->
    <el-form
      inline
      size="small"
      ref="searchForm"
      label-width="130px"
      :model="query"
      class="search-form"
    >
      <el-row :gutter="20" align="middle">
        <n-col-item>
          <el-form-item prop="companyName" label="快递品牌名称：">
            <el-input
              placeholder="请输入快递品牌名称"
              v-model="query.companyName"
              class="w180"
              clearable
              size="small"
            ></el-input>
          </el-form-item>
        </n-col-item>
        <n-col-item>
          <el-form-item prop="status" label="状态：">
            <el-select class="w180" v-model="query.status" clearable placeholder="请选择状态">
              <el-option label="全部" value></el-option>
              <el-option label="启用" :value="1"></el-option>
              <el-option label="禁用" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </n-col-item>
        <n-col-item>
          <el-button type="danger" size="small" @click="onReset()">重置</el-button>
          <el-button type="primary" size="small" @click="onSearch()">搜索</el-button>
        </n-col-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
// import { fmt } from "@/utils";
export default {
  data() {
    return {
      query: {
        companyName: "",
        status: "",
      },
    };
  },
  components: {},
  created() {
    this.onSearch();
  },
  methods: {
    onSearch() {
      this.$emit("search", this.query);
    },
    onReset() {
      this.query = {
        companyName: "",
        status: "",
      };
      this.$emit("search", this.query);
    },
  },
};
</script>

<style>
</style>