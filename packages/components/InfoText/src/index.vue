<!--
 * @Author: nutter
 * @Date: 2020-11-16 13:53:20
 * @LastEditors: nutter
 * @LastEditTime: 2020-11-16 13:57:38
 * @FilePath: \nutter-ui\packages\components\Divider\src\index.vue
-->
<template>
  <div class="n-info-item" :style="{ width: width }">
    <div class="n-info-label">{{ label }}：</div>
    <div class="n-info-value">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "n-info-text",
  props: {
    label: {
      type: String,
      default() {
        return "";
      },
    },
    width: {
      type: String,
      default() {
        return "25%";
      },
    },
  },
};
</script>
