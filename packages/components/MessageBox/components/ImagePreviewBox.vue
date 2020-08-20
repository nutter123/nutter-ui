<!--
 * @Author: nutter
 * @Date: 2020-08-20 16:57:28
 * @LastEditors: nutter
 * @LastEditTime: 2020-08-20 16:58:01
 * @FilePath: \nutter-ui\packages\components\MessageBox\components\ImagePreviewBox.vue
-->
<template>
  <el-dialog :visible.sync="visible" :title="title" :width="width" :show-close="showClose">
    <div class="img-container">
      <img :src="src" />
    </div>
  </el-dialog>
</template>

<script>
import { Dialog } from "element-ui";

export default {
  components: {
    ElDialog: Dialog,
  },
  data() {
    return {
      visible: false,
      title: "图片预览",
      width: "80%",
      showClose: true,
      src: false,
    };
  },
};
</script>
