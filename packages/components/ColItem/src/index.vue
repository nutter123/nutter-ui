<!--
 * @Author: nutter
 * @Date: 2020-08-17 11:19:22
 * @LastEditors: nutter
 * @LastEditTime: 2020-08-19 11:23:26
 * @FilePath: \nutter-ui\packages\components\ColItem\src\index.vue
-->
<template>
  <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="n-col-item">
    <slot></slot>
  </el-col>
</template>

<script>
export default {
  name: "n-col-item",
  props: {
    type: String,
  },
};
</script>
