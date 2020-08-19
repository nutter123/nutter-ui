<template>
  <div class="main">
    <div class="pb80 pt20">
      <el-form
        inline
        ref="infoForm"
        :model="addForm"
        :rules="rules"
        label-width="130px"
        class="info-form"
      >
        <div>
          <el-form-item label="快递品牌名称：" prop="companyName">
            <el-input size="small" v-model="addForm.companyName" placeholder="请输入快递品牌名称"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="logo：" prop="logoUrl">
            <at-image-upload
              v-model="addForm.logoUrl"
              :limit="1"
              class="logo-container"
              httpRequest="qiniu"
              :singleFileSize="1"
            >
              <div slot="tip" class="el-upload__tip">(最多上传一张图片)</div>
            </at-image-upload>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="备注：" prop="remark">
            <el-input
              size="small"
              type="textarea"
              style="min-width:300px"
              :autosize="{ minRows: 2, maxRows: 4}"
              v-model="addForm.remark"
              placeholder="请输入备注"
            ></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="序号：" prop="sort">
            <el-input size="small" v-model="addForm.sort" placeholder="请输入序号"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="状态：" prop="status">
            <el-switch
              v-model="addForm.status"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="n-dialog-footer">
      <el-button @click="resetForm">重置</el-button>
      <el-button type="primary" @click="submitForm">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewWebsite",
  props: {
    info: {
      type: Object,
      default() {
        return {};
      },
      required: false,
    },
    editStatus: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      infoStatus: false,
      addForm: {
        companyName: "",
        logoUrl: "",
        remark: "",
        sort: "",
        status: "1",
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入商户姓名",
            trigger: "blur",
          },
        ],
        logo: [
          {
            required: true,
            message: "请选择logo",
            trigger: "blur",
          },
        ],
        status: [
          {
            required: true,
            message: "请选择状态",
            trigger: "change",
          },
        ],
        sort: [
          {
            required: true,
            message: "请填写序号",
            trigger: "blur",
          },
        ],
        remark: [
          {
            required: true,
            message: "请输入备注",
            trigger: "blur",
          },
        ],
      },
      resetId: null,
    };
  },
  components: {},
  created() {
    if (this.editStatus == true) {
      this.addForm = {
        companyName: this.info.companyName,
        logoUrl: this.info.logoUrl,
        remark: this.info.remark,
        sort: this.info.sort,
        status: this.info.status,
      };
    }
  },
  mounted() {},
  methods: {
    resetForm() {
      // 重置表单
      this.$refs.infoForm.resetFields();
    },
    submitForm() {
      // 提交表单
      let that = this;
      this.$refs.infoForm.validate((valid) => {
        if (valid) {
          let params = that.addForm;
          if (this.editStatus == true) {
            this.$apis.cab.brand
              .edit(that.info.expressCompanyId, params)
              .then((res) => {
                if (res.msg && res.code != 200) {
                  this.$message.error(`${res.msg ? res.msg : "请求失败"}`);
                } else {
                  this.$notify({
                    title: "成功",
                    message: "修改成功",
                    type: "success",
                  });
                  this.$emit("after-save");
                }
              });
          } else {
            this.$apis.cab.brand.add(params).then((res) => {
              if (res.msg && res.code != 200) {
                this.$message.error(`${res.msg ? res.msg : "请求失败"}`);
              } else {
                this.$notify({
                  title: "成功",
                  message: "创建成功",
                  type: "success",
                });
                this.$emit("after-save");
              }
            });
          }
        } else {
          this.$message.error("请将数据填写完整");
          return false;
        }
      });
    },
  },
};
</script>
