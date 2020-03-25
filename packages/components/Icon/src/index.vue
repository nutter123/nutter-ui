<template>
  <i class="iconfont" v-on="$listeners" :class="name"></i>
</template>
<script>
export default {
  name: "n-icon",
  props: { name: String }
};
</script>