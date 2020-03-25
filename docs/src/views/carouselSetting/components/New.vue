<template>
  <div class="main">
    <div class="pb80">
      <el-form
        inline
        ref="infoForm"
        :model="addForm"
        :rules="rules"
        label-width="110px"
        class="info-form"
      >
        <div class="info-inputs" style="margin-top:20px;">
          <el-form-item label="所属产品：" prop="productId">
            <el-select
              v-model="addForm.productId"
              clearable
              filterable
              placeholder="请选择所属产品"
            >
              <el-option label="腾云商家" value="fd6a538c-9461-4591-8cc1-c725c2f996b9"></el-option>
              <el-option label="快递柜" value="2d2a4ef6-4f48-40f2-95e4-458b806dc2d9"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="info-inputs" v-show="addForm.productId=='2d2a4ef6-4f48-40f2-95e4-458b806dc2d9'">
          <el-form-item prop="operationGroupId" label="运营组名称：">
            <el-select
              v-model="addForm.operationGroupId"
              clearable
              filterable
              placeholder="请选择运营组名称"
            >
              <el-option
                :label="item.name"
                :value="item.operationGroupId"
                v-for="item in groupList"
                :key="item.operationGroupId"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="info-inputs">
          <el-form-item label="图片：" prop="imgUrl">
            <at-image-upload
              v-model="addForm.imgUrl"
              :limit="1"
              class="logo-container"
              httpRequest="qiniu"
              :singleFileSize="10"
            >
              <div slot="tip" class="el-upload__tip">(最多上传一张图片)</div>
            </at-image-upload>
          </el-form-item>
        </div>
        <div class="info-inputs">
          <el-form-item prop="jumpType" label="跳转类型：">
            <el-select
              v-model="addForm.jumpType"
              clearable
              filterable
              placeholder="请选择跳转类型"
            >
              <el-option label="不跳转" :value="0"></el-option>
              <el-option label="内链" :value="1"></el-option>
              <el-option label="外链" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="info-inputs">
          <el-form-item label="跳转地址：" prop="jumpContent">
            <el-input
              v-model="addForm.jumpContent"
              style="min-width:400px"
              placeholder="请输入跳转地址"
            ></el-input>
          </el-form-item>
        </div>
        <div class="info-inputs">
          <el-form-item label="备注：" prop="remark">
            <el-input
              size="small"
              type="textarea"
              style="min-width:500px"
              v-model="addForm.remark"
              maxlength="15"
              placeholder="请输入备注（15字以内）"
            ></el-input>
          </el-form-item>
        </div>
        <div class="info-inputs">
          <el-form-item prop="status" label="状态：">
            <el-switch
              v-model="addForm.status"
              active-value="0"
              inactive-value="1"
              active-color="#ff4949"
              inactive-color="#13ce66"
            ></el-switch>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="foot-btn">
      <el-button @click="resetForm">重置</el-button>
      <el-button type="primary" @click="submitForm">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewWebsite",
  props: {
    type: Number,
    info: Object,
    groupType: Boolean,
    startType: Number
  },
  data() {
    return {
      groupList: {},
      addForm: {
        productId: "",
        moduleId: "",
        imgUrl: "",
        jumpType: "",
        jumpContent: "",
        remark: "",
        status: "1",
        operationGroupId: ""
      },
      rules: {
        productId: [
          {
            required: true,
            message: "请选择所属产品",
            trigger: "change"
          }
        ],
        imgUrl: [
          {
            required: true,
            message: "请上传图片",
            trigger: "change"
          }
        ],
        status: [
          {
            required: true,
            message: "请选择状态",
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: {},
  created() {
    this.getGroupList();
  },
  mounted() {
    let type = this.type,
      info = this.info,
      startType = this.startType;
    if (startType == 1) {
      this.addForm.productId = "fd6a538c-9461-4591-8cc1-c725c2f996b9";
    } else {
      this.addForm.productId = "2d2a4ef6-4f48-40f2-95e4-458b806dc2d9";
    }
    if (type == 2) {
      this.addForm = {
        id: info.id,
        productId: info.productId,
        moduleId: "",
        imgUrl: info.imgUrl,
        jumpType: info.jumpType,
        jumpContent: info.jumpContent,
        remark: info.jumpContent,
        status: info.status,
        operationGroupId: info.operationGroupId
      };
    }
  },
  methods: {
    getGroupList() {
      this.$apis.common.getOptionsList().then(res => {
        this.groupList = res.infoItems;
      });
    },
    resetForm() {
      // 重置表单
      this.$refs.infoForm.resetFields();
    },
    submitForm() {
      // 提交表单
      this.$refs.infoForm.validate(valid => {
        if (valid) {
          let params = Object.assign(this.addForm, {});
          if (this.type == 1) {
            this.$apis.carouseSetting.add(params).then(res => {
              if (res.msg && res.code != 200) {
                this.$message.error(`${res.msg ? res.msg : "请求失败"}`);
              } else {
                this.$notify({
                  title: "成功",
                  message: "创建成功",
                  type: "success"
                });
                this.$emit("after-save");
              }
            });
          } else {
            this.$apis.carouseSetting.update(params).then(res => {
              if (res.msg && res.code != 200) {
                this.$message.error(`${res.msg ? res.msg : "请求失败"}`);
              } else {
                this.$notify({
                  title: "成功",
                  message: "修改成功",
                  type: "success"
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
    }
  }
};
</script>
