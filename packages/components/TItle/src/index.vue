<!--
 * @Author: nutter
 * @Date: 2020-03-25 09:22:05
 * @LastEditors: nutter
 * @LastEditTime: 2020-08-25 09:53:22
 * @FilePath: \nutter-ui\packages\components\TItle\src\index.vue
-->
<template>
  <div class="n-title">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>
        <slot></slot>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="n-title-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "n-title",
  props: {
    type: String,
  },
};
</script>
