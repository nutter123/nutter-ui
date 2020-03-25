<template>
  <div>
    <el-dialog
      class="add-new-dialog"
      title="查看详情"
      :visible.sync="dialogShow"
      width="40%"
      :close-on-click-modal="false"
      append-to-body
    >
      <div class="pb80">
        <div class="line">
          <div class="label">所属产品 :</div>
          <div class="value">{{productId}}</div>
        </div>
        <div class="line">
          <div class="label">图片 :</div>
          <el-image
            class="value"
            style="width: 100px; height: 100px;margin-right:100px"
            :src="info.imgUrl"
            :preview-src-list="[info.imgUrl]"
            fit="fit"
          ></el-image>
        </div>
        <div class="line">
          <div class="label">跳转类型 :</div>
          <div class="value">{{jumpType}}</div>
        </div>
        <div class="line">
          <div class="label">跳转地址 :</div>
          <div class="value">{{info.jumpContent}}</div>
        </div>
        <div class="line">
          <div class="label">备注 :</div>
          <div class="value">{{info.remark}}</div>
        </div>
        <div class="line">
          <div class="label">状态 :</div>
          <div class="value">{{status}}</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "DialogSms",
  props: {
    dialogVisible: Boolean,
    modelInfo: Object
  },
  data() {
    return {
      info: {}
    };
  },
  computed: {
    dialogShow: {
      get() {
        return this.dialogVisible;
      },
      set() {
        this.$emit("closeDialog");
      }
    },
    productId() {
      let id = this.info.productId;
      switch (id) {
        case "fd6a538c-9461-4591-8cc1-c725c2f996b9":
          return "腾云商家";
        case "2d2a4ef6-4f48-40f2-95e4-458b806dc2d9":
          return "快递柜";
        default:
          return "";
      }
    },
    jumpType() {
      let type = this.info.jumpType;
      switch (type) {
        case 0:
          return "不跳转";
        case 1:
          return "内链";
        case 2:
          return "外链";
        default:
          return "";
      }
    },
    status() {
      if (this.info.status == "1") {
        return "启用";
      } else {
        return "禁用";
      }
    }
  },
  created() {},
  mounted() {},
  watch: {
    dialogVisible(value) {
      if (value == true) {
        this.getInfo();
      }
    }
  },
  methods: {
    async getInfo() {
      let id = this.modelInfo.id;
      let result = await this.$apis.carouseSetting.getDetail({ id: id });
      if (result) {
        this.info = result;
      } else {
        this.$message({
          type: "error",
          message: "获取失败!"
        });
      }
    }
  }
};
</script>
<style lang="scss">
.line {
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 60px;

  .label {
    min-width: 100px;
    text-align: left;
    margin-right: 10px;
    color: #999;
    font-size: 14px;
  }
  .value {
    text-align: left;
    width: 200px;
    font-size: 16px;
  }
}
.el-image-viewer__close {
  color: white;
}
</style>