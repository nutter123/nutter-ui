<template>
  <div>
    <el-dialog
      class="add-new-dialog"
      title="提示"
      :visible.sync="dialogShow"
      width="40%"
      :close-on-click-modal="false"
      append-to-body
    >
      <el-form
        class="info-form"
        ref="infoForm"
        :model="infoForm"
        label-width="110px"
        :rules="rules"
      >
        <el-form-item prop="disableReason" class="no-label-form-content">
          <el-input
            size="small"
            :autosize="{minRows:5}"
            type="textarea"
            v-model="infoForm.disableReason"
            placeholder="请输入禁用理由（20字以内）"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog_footer">
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button @click="closeDialog">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Dialog",
  props: {
    dialogVisible: Boolean
  },
  data() {
    return {
      infoForm: {},
      rules: {
        disableReason: [
          {
            required: true,
            message: "请输入禁用理由",
            trigger: "blur"
          }
        ]
      }
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
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    submit() {
      this.$emit("submit", this.infoForm.disableReason);
    },
    closeDialog() {
      this.$emit("closeDialog");
    }
  }
};
</script>
<style lang="scss">
</style>