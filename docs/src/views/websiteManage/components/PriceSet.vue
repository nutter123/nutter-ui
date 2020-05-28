<template>
  <div>
    <div class="price-set">
      <el-form inline ref="priceInfo" :rules="priceRule" :model="priceInfo" label-width="90px">
        <el-form-item label="大格口：" prop="bigPrice">
          <el-input-number
            class="w90"
            controls-position="right"
            :min="0.5"
            :step="0.1"
            size="small"
            type="text"
            v-model="priceInfo.bigPrice"
            placeholder
            clearable
          ></el-input-number>
          <span>元/件</span>
        </el-form-item>
        <el-form-item label="中格口：" prop="mediumPrice">
          <el-input-number
            class="w90"
            controls-position="right"
            :min="0.5"
            :step="0.1"
            size="small"
            type="text"
            v-model="priceInfo.mediumPrice"
            placeholder
            clearable
          ></el-input-number>
          <span>元/件</span>
        </el-form-item>
        <el-form-item label="小格口：" prop="smallPrice">
          <el-input-number
            class="w90"
            controls-position="right"
            :min="0.5"
            :step="0.1"
            size="small"
            type="text"
            v-model="priceInfo.smallPrice"
            placeholder
            clearable
          ></el-input-number>
          <span>元/件</span>
        </el-form-item>
        <el-form-item label="微格口：" prop="microPrice">
          <el-input-number
            class="w90"
            controls-position="right"
            :min="0.5"
            :step="0.1"
            size="small"
            type="text"
            v-model="priceInfo.microPrice"
            placeholder
            clearable
          ></el-input-number>
          <span>元/件</span>
        </el-form-item>
        <el-form-item label>
          <el-button class="ml20" size="small" type="primary" :disabled="disabled" @click="setPrice">设置价格</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="freeMemberList" max-height="240" stripe border>
      <el-table-column label="本柜机免费快递员列表">
        <el-table-column prop="comName" label="快递品牌" show-overflow-tooltip></el-table-column>
        <el-table-column prop="nickname" label="姓名" show-overflow-tooltip></el-table-column>
        <el-table-column prop="phone" label="手机号" show-overflow-tooltip></el-table-column>
      </el-table-column>
      <el-table-column prop="set" label="操作" width="150">
        <template slot-scope="scope">
          <span class="error-link" @click="delAdmin(scope.row)">删除</span>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="新增免费快递员"
      :visible.sync="addFreeMember"
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
  name: "PriceSet",
  data() {
    return {
      priceInfo: {
        bigPrice: 0,
        mediumPrice: 0,
        smallPrice: 0,
        microPrice: 0
      },
      freeMemberList: [],
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
      priceRule: {
        bigPrice: [
          {
            required: true,
            message: "请输入大格口价格",
            trigger: "blur"
          }
        ],
        mediumPrice: [
          {
            required: true,
            message: "请输入中格口价格",
            trigger: "blur"
          }
        ],
        smallPrice: [
          {
            required: true,
            message: "请输入小格口价格",
            trigger: "blur"
          }
        ],
        microPrice: [
          {
            required: true,
            message: "请输入微格口价格",
            trigger: "blur"
          }
        ]
      }
    };
  },
  props: {
    addFreeMember: {
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
    this.getPriceList();
    this.getMemberList();
  },
  mounted() {},
  methods: {
    getPriceList() {
      // 获取柜机格口价格
      let params = {
        token: this.$token,
        cabId: this.siteData.id
      };
      this.$apis.cab.price.getPrice(params).then(res => {
        if (res.msg && res.code !== 10000) {
          this.$message.error(`${res.msg ? res.msg : "请求失败"}`);
        } else {
          this.priceInfo.bigPrice = res.data.price.price3 / 100 || 0;
          this.priceInfo.mediumPrice = res.data.price.price2 / 100 || 0;
          this.priceInfo.smallPrice = res.data.price.price1 / 100 || 0;
          this.priceInfo.microPrice = res.data.price.price4 / 100 || 0;
        }
      });
    },
    setPrice() {
      // 设置柜机格口价格
      this.$refs.priceInfo.validate(valid => {
        if (valid) {
          let params = {
            token: this.$token,
            cabId: this.siteData.id,
            updPrice_1: this.priceInfo.smallPrice * 100,
            updPrice_2: this.priceInfo.mediumPrice * 100,
            updPrice_3: this.priceInfo.bigPrice * 100,
            updPrice_4: this.priceInfo.microPrice * 100
          };
          this.$apis.cab.price.setPrice(params).then(res => {
            if (res.msg && res.code !== 10000) {
              this.$message.error(`${res.msg ? res.msg : "请求失败"}`);
            } else {
              this.$notify({
                title: "成功",
                message: "价格设置成功",
                type: "success"
              });
              this.getPriceList();
            }
          });
        }
      });
    },
    getMemberList() {
      // 获取该柜机下免费快递员
      let params = {
        token: this.$token,
        cabId: this.siteData.id
      };
      this.$apis.cab.price.memberList(params).then(res => {
        if (res.msg && res.code !== 10000) {
          this.$message.error(`${res.msg ? res.msg : "请求失败"}`);
        } else {
          this.freeMemberList = res.data.list;
        }
      });
    },
    delAdmin(row) {
      // 删除管理员
      console.log(row);
      if(this.disabled){
        this.$message.error('该柜机已撤柜,禁止操作!')
        return;
      }
      this.$confirm("确定删除该免费快递员吗?", "提示", {
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
          this.$apis.cab.price.delMember(params).then(res => {
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
      // 查询管理员
      this.$refs.infoForm.validate(valid => {
        if (valid) {
          let params = {
            token: this.$token,
            phone: this.memberInfo.memberPhone
          };
          this.$apis.cab.price.search(params).then(res => {
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
      this.$apis.cab.price.setMember(params).then(res => {
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
