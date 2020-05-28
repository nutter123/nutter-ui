<template>
  <div>
    <el-table :data="cabinetmemberList" max-height="240" stripe border>
      <el-table-column label="已绑定管理员">
        <el-table-column prop="nickname" label="商家姓名" show-overflow-tooltip></el-table-column>
        <el-table-column prop="phone" label="注册手机号" show-overflow-tooltip></el-table-column>
      </el-table-column>
      <el-table-column prop="set" label="操作" width="150">
        <template slot-scope="scope">
          <span class="error-link" @click="delAdmin(scope.row)">删除</span>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="管理员设置"
      :visible.sync="addAdmin"
      width="400px"
      :close-on-click-modal="false"
      append-to-body
      :before-close="closeDialog"
      class="add-admin-dialog"
    >
      <el-form
        class="info-form"
        ref="infoForm"
        :model="adminInfo"
        label-width="110px"
        :rules="rules"
      >
        <el-form-item prop="adminPhone" class="no-label-form-content">
          <el-input
            size="small"
            type="text"
            v-model="adminInfo.adminPhone"
            placeholder="请输入腾云商家账号"
            clearable
          >
            <template slot="append">
              <el-button slot="append" type="default" @click="searchAdminClick">查询</el-button>
            </template>
          </el-input>
        </el-form-item>
        <div class="tc title">
          <p>商家信息</p>
        </div>
        <el-form-item class="ml5" label="商家姓名：" prop="nickname">
          <p class="form-content-p">{{adminInfo.nickname}}</p>
        </el-form-item>
        <el-form-item class="ml5" label="注册手机号：" prop="phone">
          <p class="form-content-p">{{adminInfo.phone}}</p>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog_footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="bindAdminClick">绑定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "AdminSet",
  data() {
    return {
      cabinetmemberList: [],
      adminInfo: {
        adminPhone: "",
        nickname: "",
        phone: ""
      },
      rules: {
        adminPhone: [
          {
            required: true,
            message: "请输入腾云商家账号",
            trigger: "blur"
          }
        ]
      }
    };
  },
  props: {
    addAdmin: {
      type: Boolean,
      default: false,
      required: true
    },
    siteData: {
      type: Object,
      default() {
        return {};
      },
      required: true
    },
    disabled: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  created() {
    this.getStoreList();
  },
  mounted() {},
  methods: {
    getStoreList() {
      // 获取该柜机下绑定腾云商家
      let params = {
        token: this.$token,
        cabId: this.siteData.id
      };
      this.$apis.cab.cabmember.list(params).then(res => {
        this.cabinetmemberList = res.data.list;
      });
    },
    delAdmin(row) {
      // 删除管理员
      console.log(row);
      if (this.disabled) {
        this.$message.error("该柜机已撤柜,禁止操作!");
        return;
      }
      this.$confirm("确定删除该腾云商家吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            token: this.$token,
            cabId: this.siteData.id,
            cabinetMemberId: row.cabinetMemberId
          };
          this.$apis.cab.cabmember.cancel(params).then(res => {
            if (res.msg && res.code !== 10000) {
              this.$message.error(`${res.msg ? res.msg : "请求失败"}`);
            } else {
              this.$notify({
                title: "成功",
                message: "删除成功",
                type: "success"
              });
              this.getStoreList();
            }
          });
        })
        .catch(() => {});
    },
    searchAdminClick() {
      // 查询管理员
      this.$refs.infoForm.validate(valid => {
        if (valid) {
          let params = {
            token: this.$token,
            phone: this.adminInfo.adminPhone
          };
          this.$apis.cab.cabmember.search(params).then(res => {
            let adminInfo = res.data.cabinetMember;
            if (!adminInfo) {
              this.$message.error("未找到相关腾云商家账号");
              return;
            }
            this.adminInfo = Object.assign(this.adminInfo, adminInfo);
          });
        }
      });
    },
    closeDialog() {
      // 关闭弹窗
      this.$refs.infoForm.resetFields();
      this.$emit("close");
    },
    bindAdminClick() {
      // 新增
      if (!this.adminInfo.id) {
        this.$message.warning("请先查询商家信息");
        return;
      }
      let params = {
        token: this.$token,
        cabId: this.siteData.id,
        cabinetMemberId: this.adminInfo.id
      };
      this.$apis.cab.cabmember.set(params).then(res => {
        if (res.msg && res.code !== 10000) {
          this.$message.error(`${res.msg ? res.msg : "请求失败"}`);
        } else {
          this.$notify({
            title: "成功",
            message: "绑定成功",
            type: "success"
          });
          this.closeDialog();
          this.getStoreList();
        }
      });
    }
  }
};
</script>
