<!--
 * @Author: nutter
 * @Date: 2020-08-26 14:37:05
 * @LastEditors: nutter
 * @LastEditTime: 2020-11-19 10:04:01
 * @FilePath: \cabinet-web\src\views\TemplateManage\components\searchForm.vue
-->
<template>
  <el-card shadow="never" class="mb-20">
    <!-- 查询表单 -->
    <el-form
      inline
      size="small"
      ref="searchForm"
      :model="query"
      label-width="130px"
    >
      <el-form-item prop="name" label="模板名称：">
        <el-input
          placeholder="请输入模板名称"
          v-model="query.name"
          class="w180"
          clearable
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item prop="isPrimary" label="柜机类型：">
        <el-select
          class="w180"
          v-model="query.isPrimary"
          clearable
          placeholder="请选择柜机类型"
        >
          <el-option label="主柜" :value="1"></el-option>
          <el-option label="副柜" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="code" label="设备型号版本：">
        <el-input
          placeholder="请输入设备型号版本"
          v-model="query.code"
          class="w180"
          clearable
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item prop="status" label="状态：">
        <el-select
          class="w180"
          v-model="query.status"
          clearable
          placeholder="请选择状态"
        >
          <el-option label="启用" :value="1"></el-option>
          <el-option label="禁用" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <div class="fr">
        <el-form-item>
          <el-button size="small" @click="onReset()">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="onSearch()"
            >搜索</el-button
          >
        </el-form-item>
      </div>
    </el-form>
  </el-card>
</template>

<script>
import exportButton from "@/components/exportButton";
export default {
  data() {
    return {
      query: {
        code: "",
        isPrimary: "",
        name: "",
        status: "",
      },
      exportQuery: {}, // 导出参数
    };
  },
  components: {
    exportButton,
  },
  created() {
    this.onSearch();
  },
  methods: {
    onReset() {
      if (this.$refs.searchForm) {
        this.$refs.searchForm.resetFields();
      }
    },
    onSearch() {
      this.$emit("search", this.query);
    },
  },
};
</script>

<style>
</style>