<template>
  <i class="iconfont" v-on="$listeners" :class="name"></i>
</template>
<script>
export default { props: { name: String } };
</script>
<style lang="scss" scoped>
@import "@assets/iconfonts/iconfont.css";
@import "@assets/styles/index.scss";
.iconfont {
  font-size: 16px;
  color: $color-icon;
}
</style>