<template>
  <el-button v-if="showStatus" :type="type" :size="size" @click="handleClick" :disabled="disabled">
    <slot />
  </el-button>
</template>

<script>
// import VueCookie from 'vue-cookie'
export default {
  name: "authButton",
  props: {
    value: {
      type: String,
      default() {
        return "";
      }
    },
    type: {
      type: String,
      default() {
        return "";
      }
    },
    size: {
      type: String,
      default() {
        return "";
      }
    },
    disabled: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      showStatus: true
    };
  },
  created() {
    this.auth();
  },
  methods: {
    auth() {
      // let authArr = JSON.parse(localStorage.getItem("AUTH_CODE"));
      this.showStatus = true;
      // let authArr = JSON.parse(VueCookie.get("AUTH_CODE"));
      // if (authArr) {
      //   let value = this.value;
      //   if (authArr.includes(value)) {
      //     this.showStatus = true;
      //   } else {
      //     this.showStatus = false;
      //   }
      // } else {
      //   this.showStatus = false;
      // }
    },
    handleClick() {
      this.$emit("click");
    }
  }
};
</script>

<style>
</style>