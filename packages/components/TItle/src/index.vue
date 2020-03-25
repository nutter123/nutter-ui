<template>
  <div class="n-title">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>
        <slot></slot>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "n-title",
  props: {
    type: String
  }
};
</script>
