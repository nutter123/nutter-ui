<!--
 * @Author: nutter
 * @Date: 2020-05-28 10:26:29
 * @LastEditors: nutter
 * @LastEditTime: 2020-11-23 10:21:17
 * @FilePath: \nutter-ui\packages\components\Dialog\src\index.vue
-->
<template>
  <transition :name="transitionName">
    <div class="n-dialog-mask" :style="{zIndex: zIndex}" v-show="visible">
      <div class="n-dialog" v-if="renderEveryTime">
        <div class="n-dialog-header" v-if="showHeader">
          {{title}}
          <i class="n-dialog-close el-icon-close" @click="closePanel"></i>
        </div>
        <div class="n-dialog-body">
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import PopupManager from "element-ui/lib/utils/popup/popup-manager";

export default {
  name: "n-dialog",
  model: {
    prop: "visible",
    event: "change",
  },
  data() {
    return {
      zIndex: 999,
    };
  },
  props: {
    transitionName: {
      type: String,
      default: "el-zoom-in-top",
    },
    title: {
      type: String,
      default: "标题",
    },
    visible: {
      type: Boolean,
      default: false,
    },
    appendToBody: {
      type: Boolean,
      default: true,
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    keepAlive: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    renderEveryTime() {
      if (this.keepAlive) {
        return true;
      } else {
        return this.visible;
      }
    },
  },
  watch: {
    visible(val) {
      if (val) {
        this.openPanel();
      }
    },
  },
  mounted() {
    if (this.appendToBody) {
      document.body.appendChild(this.$el);
    }
    if (this.visible === true) {
      this.openPanel();
    }
  },
  destroyed() {
    if (this.appendToBody) {
      document.body.removeChild(this.$el);
    }
  },
  methods: {
    openPanel() {
      if (this.visible === true) {
        // this.zIndex = PopupManager.nextZIndex();
      }
    },
    closePanel() {
      this.$emit("change", false);
    },
  },
};
</script>
