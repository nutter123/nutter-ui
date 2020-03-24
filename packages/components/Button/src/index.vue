<template>
  <div class="nt-button">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "nt-button",
  props: {
    type: String
  }
};
</script>

<style scoped lang="scss">
.nt-button {
  display: inline-block;
  padding: 3px 6px;
  background: #000;
  color: #fff;
}
</style>
