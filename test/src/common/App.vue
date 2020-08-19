<template>
  <div id="app" class="app-container df">
    <div class="layout-content flex1">
      <router-view></router-view>
    </div>
    <!-- <layout></layout> -->
  </div>
</template>
<script>
import layout from "./layout/index";
export default {
  name: "app",
  data: function() {
    return {
      routes: {}
    };
  },
  components: {
    layout
  },
  created() {},
  computed: {},
  mounted() {}
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
}
</style>
