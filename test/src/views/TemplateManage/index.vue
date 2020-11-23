<template>
  <div>
    <n-title>柜机模板管理</n-title>
    <div class="pd-20">
      <searchForm @search="onSearch" ref="searchForm"></searchForm>
      <el-card shadow="none">
        <div class="text-right">
          <el-button type="primary" size="small" @click="toAddNew()"
            >新增</el-button
          >
        </div>
        <el-table
          :data="tableParams.list"
          type="selection"
          tooltip-effect="light"
          ref="table"
          class="mt-20"
          header-cell-class-name="n-table-header"
        >
          <el-table-column
            label="模板名称"
            prop="name"
            min-width="80"
          ></el-table-column>
          <el-table-column
            label="规格描述"
            prop="note"
            min-width="80"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="柜体类型" prop="isPrimary" min-width="80">
            <template slot-scope="scope">
              <span>{{ checkType(scope.row.isPrimary) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="设备型号版本"
            prop="code"
            min-width="80"
          ></el-table-column>
          <el-table-column
            label="总格口数"
            prop="amount"
            min-width="80"
          ></el-table-column>
          <el-table-column
            label="大格口数"
            prop="largeAmount"
            min-width="80"
          ></el-table-column>
          <el-table-column
            label="中格口数"
            prop="mediumAmount"
            min-width="80"
          ></el-table-column>
          <el-table-column
            label="小格口数"
            prop="smallAmount"
            min-width="80"
          ></el-table-column>
          <el-table-column
            label="微格口数"
            prop="tinyAmount"
            min-width="80"
          ></el-table-column>
          <el-table-column label="状态" prop="status" min-width="80">
            <template slot-scope="scope">
              <span>{{ checkStatus(scope.row.status) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="150">
            <template slot-scope="scope">
              <!-- 列表操作菜单 -->
              <el-button type="text" @click="toDetail(scope.row)"
                >查看详情</el-button
              >
              <el-button
                type="text"
                v-if="scope.row.status == 1"
                @click="toUse(scope.row, 2)"
                >禁用</el-button
              >
              <el-button type="text" v-else @click="toUse(scope.row, 1)"
                >启用</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="tableParams.pageSize"
          :page-sizes="tableParams.pageSizes"
          :total="tableParams.total"
          :layout="tableParams.layout"
          class="mtb-15 text-right"
        ></el-pagination>
      </el-card>
      <n-dialog
        v-model="addShow"
        title="新增"
        @change="closeAddPanel"
        class="panel-zindex"
      >
        <new-website ref="newWebsite" @after-save="afterAddSave"></new-website>
      </n-dialog>
      <n-dialog
        v-model="detailShow"
        title="查看详情"
        @change="closeDetailPanel"
        class="panel-zindex"
      >
        <detail-website ref="detailWebsite" :info="info"></detail-website>
      </n-dialog>
      <delete-dialog
        :dialogVisible="deleteShow"
        @closeDialog="closeDialog"
        @submit="handleDelete"
        ref="deleteDialog"
      ></delete-dialog>
    </div>
  </div>
</template>

<script>
import searchForm from "./components/searchForm";
import tableMixin from "@/mixins/tableMixin";
// import { fmt } from "@/utils";
import newWebsite from "./components/new";
import detailWebsite from "./components/detail";
import deleteDialog from "./components/deleteDialog";
export default {
  data() {
    return {
      addShow: false, // 新增显示
      detailShow: false, // 新增显示
      deleteShow: false,
      deleteModel: {}, // 详情交互数据
      info: {},
    };
  },
  components: {
    searchForm,
    newWebsite,
    deleteDialog,
    detailWebsite,
  },
  mixins: [tableMixin],
  methods: {
    onSearch(query) {
      // 重置
      // this.tableParams.selectList = [];
      this.reset = true;
      this.allData = [];
      this.tableParams.pageNum = 1;
      this.loadList(query);
    },
    checkType(type) {
      if (type == 1) {
        return "主柜";
      } else {
        return "副柜";
      }
    },
    checkStatus(status) {
      if (status == 1) {
        return "启用";
      } else {
        return "禁用";
      }
    },
    toAddNew() {
      // 新增s
      this.addShow = true;
    },
    closeAddPanel() {
      // 关闭新增弹窗
      this.addShow = false;
      this.$refs.searchForm.onSearch();
    },
    toDetail(row) {
      // 查看详情
      this.detailShow = true;
      this.info = row;
    },
    closeDetailPanel() {
      // 关闭新增弹窗
      this.detailShow = false;
    },
    showDelete() {
      this.deleteShow = true;
    },
    closeDialog() {
      this.deleteShow = false;
    },
    afterAddSave() {
      this.closeAddPanel();
    },
    toUse(row, type) {
      this.info = row;
      if (type == 1) {
        this.handleUse();
      } else {
        this.showDelete();
      }
    },
    handleUse() {
      this.$confirm("确定启用该模版吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$apis.cab.templateN
            .setStatus(this.info.cabinetTemplateId, {
              disableReason: this.disableReason,
              status: 1,
            })
            .then((res) => {
              if (res.msg && res.code !== 10000) {
                this.$message.error(`${res.msg ? res.msg : "请求失败"}`);
              } else {
                this.$notify({
                  title: "成功",
                  message: "操作成功!",
                  type: "success",
                });
                this.$refs.searchForm.onSearch();
                this.info = "";
              }
            });
        })
        .catch(() => {});
    },
    handleDelete(value) {
      this.$confirm("确定禁用该模版吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$apis.cab.templateN
            .setStatus(this.info.cabinetTemplateId, {
              disableReason: value,
              status: 2,
            })
            .then((res) => {
              if (res.msg && res.code !== 10000) {
                this.$message.error(`${res.msg ? res.msg : "请求失败"}`);
              } else {
                this.$notify({
                  title: "成功",
                  message: "操作成功!",
                  type: "success",
                });
                this.$refs.searchForm.onSearch();
                this.closeDialog();
                this.info = "";
              }
            });
        })
        .catch(() => {});
    },
    async loadList(query) {
      let params = {
        pageNum: this.tableParams.pageNum,
        pageSize: this.tableParams.pageSize,
        ...query,
      };
      if (this.allData[this.tableParams.pageNum - 1] && !this.reset) {
        this.initialTableData(
          this.allData[this.tableParams.pageNum - 1],
          this.tableParams.total
        );
      } else {
        let _result = await this.$apis.cab.templateN.getList(
          this.assignQuery({
            ...params,
          })
        );
        if (_result.infoItems && _result.infoItems.length > 0) {
          this.$nextTick(function () {
            this.allData[this.tableParams.pageNum - 1] = _result.infoItems;
            this.initialTableData(_result.infoItems, _result.total);
            this.reset = false;
          });
        } else {
          this.$nextTick(function () {
            this.allData = [];
            this.initialTableData([], 0);
            this.reset = false;
          });
        }
        this.$refs.table.clearSelection();
      }
    },
  },
};
</script>

<style>
</style>