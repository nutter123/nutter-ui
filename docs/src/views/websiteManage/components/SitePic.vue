<!--
 * @Descripttion: 
 * @version: 
 * @Author: nut
 * @Date: 2019-09-03 11:08:27
 * @LastEditors  : nut
 * @LastEditTime : 2020-01-20 10:54:40
 -->
<template>
  <div class="site-img">
    <div class="tc">
      <at-image-upload
        v-model="images[0]"
        :limit="1"
        @on-success="imgSucess0"
        httpRequest="qiniu"
        :singleFileSize="10"
      ></at-image-upload>
      <p class="ptb10">正面90度正视图</p>
    </div>
    <div class="tc">
      <at-image-upload
        v-model="images[1]"
        :limit="1"
        @on-success="imgSucess1"
        httpRequest="qiniu"
        :singleFileSize="10"
      ></at-image-upload>
      <p class="ptb10">左侧45度侧视图</p>
    </div>
    <div class="tc">
      <at-image-upload
        v-model="images[2]"
        :limit="1"
        @on-success="imgSucess2"
        httpRequest="qiniu"
        :singleFileSize="10"
      ></at-image-upload>
      <p class="ptb10">右侧45度侧视图</p>
    </div>
    <div class="tc">
      <at-image-upload
        v-model="images[3]"
        :limit="1"
        @on-success="imgSucess3"
        httpRequest="qiniu"
        :singleFileSize="10"
      ></at-image-upload>
      <p class="ptb10">主机硬件ID图</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SitePic",
  props: {
    disabled: {
      type: Boolean,
      default() {
        return false;
      }
    },
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    id: {
      type: Number,
      default() {
        return 0;
      }
    }
  },
  data() {
    return {
      images: []
    };
  },
  created() {},
  mounted() {},
  watch: {
    list(val) {
      this.images = val;
    }
  },
  methods: {
    imgSucess0(res) {
      let name = res.domain + "/" + res.key;
      let images = JSON.parse(JSON.stringify(this.images));
      images[0] = name;
      this.$apis.cab.cabinet.editPic(this.id, { picSrcs: images }).then(() => {
        this.$notify({
          title: "成功",
          message: "设置成功",
          type: "success"
        });
        this.$emit("after-save");
      });
    },
    imgSucess1(res) {
      let name = res.domain + "/" + res.key;
      let images = JSON.parse(JSON.stringify(this.images));
      images[1] = name;
      this.$apis.cab.cabinet.editPic(this.id, { picSrcs: images }).then(() => {
        this.$notify({
          title: "成功",
          message: "设置成功",
          type: "success"
        });
        this.$emit("after-save");
      });
    },
    imgSucess2(res) {
      let name = res.domain + "/" + res.key;
      let images = JSON.parse(JSON.stringify(this.images));
      images[2] = name;
      this.$apis.cab.cabinet.editPic(this.id, { picSrcs: images }).then(() => {
        this.$notify({
          title: "成功",
          message: "设置成功",
          type: "success"
        });
        this.$emit("after-save");
      });
    },
    imgSucess3(res) {
      let name = res.domain + "/" + res.key;
      let images = JSON.parse(JSON.stringify(this.images));
      images[3] = name;
      this.$apis.cab.cabinet.editPic(this.id, { picSrcs: images }).then(() => {
        this.$notify({
          title: "成功",
          message: "设置成功",
          type: "success"
        });
        this.$emit("after-save");
      });
    }
  }
};
</script>
