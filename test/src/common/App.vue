<!--
 * @Author: nutter
 * @Date: 2020-08-19 14:05:01
 * @LastEditors: nutter
 * @LastEditTime: 2020-11-13 10:07:45
 * @FilePath: \nutter-ui\test\src\common\App.vue
-->
<template>
  <div id="app" class="app-container df">
    <div class="main layout-content">
      <router-view></router-view>
    </div>
    <!-- <layout></layout> -->
  </div>
</template>
<script>
import layout from "./layout/index";
export default {
  name: "app",
  data: function () {
    return {
      routes: {},
    };
  },
  components: {
    layout,
  },
  created() {},
  computed: {},
  mounted() {},
};
</script>
<style>
body {
  overflow: auto;
}

#app {
  width: 100%;
  height: 100%;
  min-width: 600px;
  overflow: hidden;
}
.main {
  overflow: auto;
  height: 100%;
}
</style>
