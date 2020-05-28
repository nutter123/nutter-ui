<!--
 * @Descripttion: 
 * @version: 
 * @Author: nut
 * @Date: 2019-12-17 11:31:12
 * @LastEditors  : nut
 * @LastEditTime : 2019-12-31 17:17:03
 -->
<template>
  <div class="boxMac-table">
    <!-- <header>{{boxMacInfo.cabinetName + ' ' + boxMacInfo.boxName}}</header> -->
    <el-form
      class="info-form"
      ref="infoForm"
      :model="boxMacInfo"
      label-width="110px"
      :rules="rules"
    >
      <el-form-item prop="boxMac" class="no-label-form-content">
        <el-input
          size="small"
          type="number"
          maxlength="32"
          v-model="boxMacInfo.boxMac"
          placeholder="请输入柜机门码"
          clearable
        >
          <template slot="append">
            <el-button slot="append" type="default" @click="submitForm">修改</el-button>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "boxMacLogs",
  data() {
    return {
      boxMacInfo: {
        boxMac: ""
      },
      rules: {
        boxMac: [
          {
            required: true,
            message: "请输入柜机门码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  props: {
    cabId: {
      type: String,
      default: "",
      required: true
    },
    boxCode: {
      type: String,
      default: "",
      required: true
    }
  },
  created() {
    this.getInfo();
  },
  mounted() {},
  methods: {
    async getInfo() {
      // 请求格口信息
      let params = {
        cabinetId: this.cabId,
        boxCode: this.boxCode
      };
      let _result = await this.$apis.cab.box.getBoxInfo(params);
      if (_result.boxMac) {
        this.boxMacInfo.boxMac = _result.boxMac;
      }
    },
    submitForm() {
      // 提交表单
      this.$refs.infoForm.validate(valid => {
        if (valid) {
          let params = {
            cabinetId: this.cabId,
            boxCode: this.boxCode,
            boxMac: this.boxMacInfo.boxMac
          };
          this.$apis.cab.box.updateBoxInfo(params).then(res => {
            if (res.msg) {
              this.$message.error(`${res.msg ? res.msg : "请求失败"}`);
            } else {
              this.$notify({
                title: "成功",
                message: "修改成功",
                type: "success"
              });
              this.$emit("close");
            }
          });
        } else {
          this.$message.error("请将数据填写完整");
          return false;
        }
      });
    }
  }
};
</script>
