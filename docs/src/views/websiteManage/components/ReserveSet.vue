<template>
  <div>
    <div class="price-set">
      <el-form
        inline
        ref="reserveInfo"
        :rules="reserveRule"
        :model="reserveInfo"
        label-width="90px"
      >
        <el-form-item label="大格口：" prop="largeBK">
          <el-input-number
            controls-position="right"
            :min="0"
            :step="1"
            placeholder
            clearable
            class="w90"
            size="small"
            type="text"
            v-model="reserveInfo.largeBK"
          ></el-input-number>
          <span>/{{reserveInfo.largeTOT}}个</span>
        </el-form-item>
        <el-form-item label="中格口：" prop="middleBK">
          <el-input-number
            controls-position="right"
            :min="0"
            :step="1"
            placeholder
            clearable
            class="w90"
            size="small"
            type="text"
            v-model="reserveInfo.middleBK"
          ></el-input-number>
          <span>/{{reserveInfo.middleTOT}}个</span>
        </el-form-item>
        <el-form-item label="小格口：" prop="smallBK">
          <el-input-number
            controls-position="right"
            :min="0"
            :step="1"
            placeholder
            clearable
            class="w90"
            size="small"
            type="text"
            v-model="reserveInfo.smallBK"
          ></el-input-number>
          <span>/{{reserveInfo.smallTOT}}个</span>
        </el-form-item>
        <el-form-item label="微格口：" prop="microBK">
          <el-input-number
            controls-position="right"
            :min="0"
            :step="1"
            placeholder
            clearable
            class="w90"
            size="small"
            type="text"
            v-model="reserveInfo.microBK"
          ></el-input-number>
          <span>/{{reserveInfo.microTOT}}个</span>
        </el-form-item>
        <el-form-item label>
          <el-button class="ml20" size="small" :disabled="disabled" type="primary" @click="setReserve">设置预留</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="reserveMemberList" max-height="240" stripe border>
      <el-table-column label="本柜机预留格口授权快递员列表">
        <el-table-column prop="comName" label="快递品牌" show-overflow-tooltip></el-table-column>
        <el-table-column prop="nickname" label="姓名" show-overflow-tooltip></el-table-column>
        <el-table-column prop="phone" label="手机号" show-overflow-tooltip></el-table-column>
      </el-table-column>
      <el-table-column prop="set" label="操作" width="150">
        <template slot-scope="scope">
          <span class="error-link" @click="delReserveMember(scope.row)">删除</span>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="新增预留快递员"
      :visible.sync="addReserveMember"
      width="40%"
      :close-on-click-modal="false"
      append-to-body
      :before-close="closeDialog"
      class="add-admin-dialog"
    >
      <el-form
        class="info-form"
        ref="infoForm"
        :model="memberInfo"
        label-width="110px"
        :rules="rules"
      >
        <el-form-item prop="memberPhone" class="no-label-form-content">
          <el-input
            size="small"
            type="text"
            v-model="memberInfo.memberPhone"
            placeholder="请输入快递员账号"
            clearable
          >
            <template slot="append">
              <el-button slot="append" type="default" @click="searchMemberClick">查询</el-button>
            </template>
          </el-input>
        </el-form-item>
        <div class="tc title">
          <p>快递员信息</p>
        </div>
        <el-form-item label="快递公司：" prop="comName">
          <p class="form-content-p">{{memberInfo.comName}}</p>
        </el-form-item>
        <el-form-item label="姓名：" prop="nickname">
          <p class="form-content-p">{{memberInfo.nickname}}</p>
        </el-form-item>
        <el-form-item label="注册手机号：" prop="phone">
          <p class="form-content-p">{{memberInfo.phone}}</p>
        </el-form-item>
        <el-form-item label="身份证号码：" prop="identiNo">
          <p class="form-content-p">{{memberInfo.identiNo}}</p>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog_footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="setMemberClick">设置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ReserveSet",
  data() {
    return {
      reserveInfo: {
        largeBK: 0,
        middleBK: 0,
        smallBK: 0,
        microBK: 0,
        largeTOT: 0,
        middleTOT: 0,
        smallTOT: 0,
        microTOT: 0
      },
      reserveMemberList: [],
      memberInfo: {
        memberPhone: "",
        comName: "",
        nickname: "",
        phone: "",
        identiNo: ""
      },
      rules: {
        memberPhone: [
          {
            required: true,
            message: "请输入快递员账号",
            trigger: "blur"
          }
        ]
      },
      reserveRule: {
        largeBK: [
          {
            required: true,
            message: "请输入大格口预留数",
            trigger: "blur"
          }
        ],
        middleBK: [
          {
            required: true,
            message: "请输入中格口预留数",
            trigger: "blur"
          }
        ],
        smallBK: [
          {
            required: true,
            message: "请输入小格口预留数",
            trigger: "blur"
          }
        ],
        microBK: [
          {
            required: true,
            message: "请输入微格口预留数",
            trigger: "blur"
          }
        ]
      }
    };
  },
  props: {
    addReserveMember: {
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
    this.getReserveList();
    this.getMemberList();
  },
  mounted() {},
  methods: {
    getReserveList() {
      // 查询预留格口数量
      let params = {
        token: this.$token,
        cabId: this.siteData.id
      };
      this.$apis.cab.reserve.getReserve(params).then(res => {
        if (res.msg && res.code !== 10000) {
          this.$message.error(`${res.msg ? res.msg : "请求失败"}`);
        } else {
          this.reserveInfo = res.data.boxReserve;
        }
      });
    },
    // 确定预留设置
    setRreserveSubmit() {
      let params = {
        token: localStorage.token,
        cabId: localStorage.websiteParams,
        smallUpd: this.reserveSet.smallBK,
        middleUpd: this.reserveSet.middleBK,
        largeUpd: this.reserveSet.largeBK,
        microUpd: this.reserveSet.microBK
      };
      this.postRequest("reserve/set", params).then(res => {
        if (!res) {
          return;
        }
        this.$notify({
          title: "成功",
          message: "预留格口设置成功",
          type: "success"
        });
        this.dialogReserve = false;
        this.getReserve();
      });
    },
    setReserve() {
      // 设置柜机预留格口
      this.$refs.reserveInfo.validate(valid => {
        if (valid) {
          let params = {
            token: this.$token,
            cabId: this.siteData.id,
            smallUpd: this.reserveInfo.smallBK,
            middleUpd: this.reserveInfo.middleBK,
            largeUpd: this.reserveInfo.largeBK,
            microUpd: this.reserveInfo.microBK
          };
          this.$apis.cab.reserve.setReserve(params).then(res => {
            if (res.msg && res.code !== 10000) {
              this.$message.error(`${res.msg ? res.msg : "请求失败"}`);
            } else {
              this.$notify({
                title: "成功",
                message: "预留格口设置成功",
                type: "success"
              });
              this.getReserveList();
            }
          });
        }
      });
    },
    getMemberList() {
      // 获取预留格口账户列表
      let params = {
        token: this.$token,
        cabId: this.siteData.id
      };
      this.$apis.cab.reserve.memberList(params).then(res => {
        if (res.msg && res.code !== 10000) {
          this.$message.error(`${res.msg ? res.msg : "请求失败"}`);
        } else {
          this.reserveMemberList = res.data.list;
        }
      });
    },
    delReserveMember(row) {
      // 删除预留快递员
      console.log(row);
      if(this.disabled){
        this.$message.error('该柜机已撤柜,禁止操作!')
        return;
      }
      this.$confirm("确定删除该预留快递员吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            token: this.$token,
            cabId: this.siteData.id,
            memberId: row.memberId
          };
          this.$apis.cab.reserve.delMember(params).then(res => {
            if (res.msg && res.code !== 10000) {
              this.$message.error(`${res.msg ? res.msg : "请求失败"}`);
            } else {
              this.$notify({
                title: "成功",
                message: "删除成功",
                type: "success"
              });
              this.getMemberList();
            }
          });
        })
        .catch(() => {});
    },
    searchMemberClick() {
      // 查询预留快递员
      this.$refs.infoForm.validate(valid => {
        if (valid) {
          let params = {
            token: this.$token,
            phone: this.memberInfo.memberPhone
          };
          this.$apis.cab.reserve.search(params).then(res => {
            let memberInfo = res.data.expressMember;
            if (!memberInfo) {
              this.$message.error("未找到相关快递员信息");
              return;
            }
            this.memberInfo = Object.assign(this.memberInfo, memberInfo);
          });
        }
      });
    },
    closeDialog() {
      // 关闭弹窗
      this.$refs.infoForm.resetFields();
      this.$emit("close");
    },
    setMemberClick() {
      // 新增
      if (!this.memberInfo.memberId) {
        this.$message.warning("请先查询快递员信息");
        return;
      }
      let params = {
        token: this.$token,
        cabId: this.siteData.id,
        memberId: this.memberInfo.memberId
      };
      this.$apis.cab.reserve.setMember(params).then(res => {
        if (res.msg && res.code !== 10000) {
          this.$message.error(`${res.msg ? res.msg : "请求失败"}`);
        } else {
          this.$notify({
            title: "成功",
            message: "设置成功",
            type: "success"
          });
          this.closeDialog();
          this.getMemberList();
        }
      });
    }
  }
};
</script>
