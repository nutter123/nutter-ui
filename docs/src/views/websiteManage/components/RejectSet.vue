<template>
  <div class="reject-set">
    <el-form inline ref="phoneInfo" :rules="phoneInfoRule" :model="phoneInfo" label-width="90px">
      <el-form-item label prop="phone">
        <el-input placeholder="请输入用户手机号" size="small" v-model="phoneInfo.phone">
          <template slot="append">
            <el-button slot="append" size="small" type="default" @click="search">查询</el-button>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <el-table :data="tableParams.list" max-height="240" stripe border>
      <el-table-column label="本柜机拒收用户列表">
        <el-table-column prop="phone" label="手机号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="note" label="备注" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createDate" label="添加时间" show-overflow-tooltip></el-table-column>
      </el-table-column>
      <el-table-column prop="set" label="操作" width="150">
        <template slot-scope="scope">
          <span class="error-link" @click="delReject(scope.row)">删除</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-wrapper">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="tableParams.pageSize"
        :page-sizes="tableParams.pageSizes"
        :total="tableParams.total"
        :layout="tableParams.layout"
        class="mt15"
      ></el-pagination>
    </div>
    <el-dialog
      title="新增拒收用户"
      :visible.sync="addReject"
      width="35%"
      :close-on-click-modal="false"
      append-to-body
      :before-close="closeDialog"
      class="add-admin-dialog"
    >
      <el-form
        class="info-form"
        ref="customerInfo"
        :model="customerInfo"
        label-width="110px"
        :rules="customerRule"
      >
        <el-form-item prop="phone" label="手机号：">
          <el-input
            size="small"
            type="text"
            v-model="customerInfo.phone"
            placeholder="请输入手机号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="note" label="备注：">
          <el-input
            size="small"
            type="textarea"
            :rows="2"
            :maxlength="50"
            v-model="customerInfo.note"
            placeholder="请输入备注"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog_footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="add">新增</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tableMixin from "@/mixins/tableMixin";
import expRules from "@/utils/validateRules";

export default {
  name: "RejectSet",
  data() {
    return {
      phoneInfo: {
        phone: ""
      },
      customerInfo: {
        phone: "",
        note: ""
      },
      phoneInfoRule: {
        phone: [
          {
            required: true,
            validator: expRules.mobile
          }
        ]
      },
      customerRule: {
        phone: [
          {
            required: true,
            validator: expRules.mobile
          }
        ]
      }
    };
  },
  props: {
    addReject: {
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
  mixins: [tableMixin],
  created() {
    this.getRejectList();
  },
  mounted() {},
  methods: {
    closeDialog() {
      // 关闭弹窗
      this.$refs.customerInfo.resetFields();
      this.$emit("close");
    },
    search() {
      // 查询
      this.$refs.phoneInfo.validate(valid => {
        if (valid) {
          console.log(1);
        }
      });
    },
    add() {
      // 新增
      this.$refs.customerInfo.validate(valid => {
        if (valid) {
          let params = {
            token: this.$token,
            cabId: this.siteData.id,
            phone: this.customerInfo.phone,
            note: this.customerInfo.note
          };
          this.$apis.cab.reject.setReject(params).then(res => {
            if (res.msg && res.code !== 10000) {
              this.$message.error(`${res.msg ? res.msg : "请求失败"}`);
            } else {
              this.$notify({
                title: "成功",
                message: "添加成功",
                type: "success"
              });
              this.getRejectList();
            }
          });
        }
      });
    },
    delReject(row) {
      // 删除
      console.log(row);
      if(this.disabled){
        this.$message.error('该柜机已撤柜,禁止操作!')
        return;
      }
      this.$confirm("是否删除该拒收账号?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            token: this.$token,
            cabId: this.siteData.id,
            phone: row.phone
          };
          this.$apis.cab.reject.delReject(params).then(res => {
            if (res.msg && res.code !== 10000) {
              this.$message.error(`${res.msg ? res.msg : "请求失败"}`);
            } else {
              this.$notify({
                title: "成功",
                message: "删除成功",
                type: "success"
              });
              this.getRejectList();
            }
          });
        })
        .catch(() => {});
    },
    getRejectList() {
      // 获取拒收列表
      let params = {
        token: this.$token,
        cabId: this.siteData.id,
        page: this.tableParams.pageNum,
        limit: this.tableParams.pageSize
      };
      this.$apis.cab.reject.getList(params).then(res => {
        this.initialTableData(res.data.list, res.data.total);
        this.reset = false;
      });
    }
  }
};
</script>
