<template>
    <div id="layoutHeader" class="layout-header clearfix">
        <div class="fl logo-box logo" :class="[isCollaps ? 'logo-slide' : '']">
            <span class="logo-img vm"></span>
            <span class="vm logo-text"></span>
        </div>
        <div class="fl top-menu">
            <el-menu
                :default-active="activeIndex2"
                class="el-menu-demo"
                mode="horizontal"
                text-color="#fff"
                active-text-color="#00C1DE">
                <el-menu-item index="1"></el-menu-item>
            </el-menu>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
import clickoutside from "@/directives/clickoutside";
// import defaultAvatar from "@/assets/icons/avatar.png";
export default {
  name: "layoutHeader",
  data() {
    return {
      keyword: "",
      packageUrl: "",
      isWindow: true,
      showUserInfo: false,
      showUserInfo2: false,
      // defaultAvatar: defaultAvatar,
      isCollaps: false,
      activeIndex2: "1",
      collapsLogo: "logo-slide"
    };
  },
  directives: { clickoutside },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    logout() {
      this.$emit("logout");
    },
    toggleUserInfo() {
      this.showUserInfo = !this.showUserInfo;
    },
    toggleUserInfo2() {
      this.showUserInfo2 = !this.showUserInfo2;
    },
    closeUserInfo() {
      if (this.showUserInfo) {
        this.showUserInfo = false;
      }
    },
    closeUserInfo2() {
      if (this.showUserInfo2) {
        this.showUserInfo2 = false;
      }
    }
  },
  created() {
    this.isWindow = navigator.platform.toLowerCase().indexOf("macintel") == -1;
  },
  mounted() {
    bus.$on("collaps-change", boolean => {
      this.isCollaps = boolean;
    });
  }
};
</script>
<style lang="scss" scoped>
.layout-header .logo {
  background: transparent !important;
  color: #fff;
  padding: 5px 0 5px 20px;
  &.logo-slide {
    padding: 5px 0 5px 10px;
    .logo-text {
      display: none;
    }
  }
  .logo-img {
    // background: url("../../assets/logo.png") no-repeat center;
    display: inline-block;
    height: 40px;
    width: 40px;
    background-size: contain;
    vertical-align: middle;
  }
  .logo-text {
    font-size: 16px;
    position: absolute;
    color: #dade34;
    width: 100px;
    left: 78px;
    top: 15px;
    font-weight: 700;
  }
}
</style>

