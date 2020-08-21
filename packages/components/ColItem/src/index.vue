<!--
 * @Author: nutter
 * @Date: 2020-08-17 11:19:22
 * @LastEditors: nutter
 * @LastEditTime: 2020-08-21 09:31:46
 * @FilePath: \nutter-ui\packages\components\ColItem\src\index.vue
-->
<template>
  <el-col :xs="24" :sm="12" :md="10" :lg="8" :xl="6" class="n-col-item">
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
