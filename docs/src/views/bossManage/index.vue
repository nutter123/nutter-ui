<template>
  <div class="main">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>柜老板管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="contain has-bread p20">
      <div>
        <!-- 查询表单 -->
        <el-form inline size="small" ref="searchForm" :model="query" class="search-form">
          <div class="mini-search">
            <el-form-item prop="nickname" label="柜机管理人：">
              <el-input
                placeholder="请输入柜机管理人"
                v-model="query.nickname"
                class="w180"
                clearable
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item prop="identityNo" label="身份证号：">
              <el-input
                placeholder="请输入身份证号"
                v-model="query.identityNo"
                class="w180"
                clearable
                size="small"
              ></el-input>
            </el-form-item>
            <div :class="{'search-open':searchExpand, 'search-close':!searchExpand}">
              <el-form-item prop="username" label="注册手机号：">
                <el-input
                  placeholder="请输入注册手机号"
                  v-model="query.username"
                  class="w180"
                  clearable
                  size="small"
                ></el-input>
              </el-form-item>
              <el-form-item prop="terminalCode" label="网点编号：">
                <el-input
                  placeholder="请输入网点编号"
                  v-model="query.terminalCode"
                  class="w180"
                  clearable
                  size="small"
                ></el-input>
              </el-form-item>
              <el-form-item prop="machineCode" label="主机硬件ID：">
                <el-input
                  placeholder="请输入主机硬件ID"
                  v-model="query.machineCode"
                  class="w180"
                  clearable
                  size="small"
                ></el-input>
              </el-form-item>
              <el-form-item prop="cabName" label="网点名称：">
                <el-input
                  placeholder="请输入网点名称"
                  v-model="query.cabName"
                  class="w180"
                  clearable
                  size="small"
                ></el-input>
              </el-form-item>
            </div>
            <!-- 展开筛选 -->
            <el-button
              type="default"
              size="small"
              @click="openSelect"
            >{{searchExpand?'- 收起筛选':'+ 展开筛选'}}</el-button>
            <el-button type="danger" size="small" @click="onReset">重置</el-button>
            <el-button type="primary" size="small" @click="onSearch">搜索</el-button>
            <export-button
              class="ml10"
              :exportQuery="exportQuery"
              type="button"
              method="post"
              respType="text"
              @click.native="exportOrder"
            ></export-button>
          </div>
        </el-form>
      </div>
      <div>
        <!-- 数据列表 -->
        <el-table
          :data="tableParams.list"
          stripe
          border
          tooltip-effect="light"
          ref="table"
          class="mt20 x-expand-table"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <!-- 列表内嵌表单 -->
              <el-form label-position="left" inline class="table-expand-form">
                <el-form-item label="柜机管理人">
                  <span>{{ props.row.nickname }}</span>
                </el-form-item>
                <el-form-item label="注册手机号">
                  <span>{{ props.row.username }}</span>
                </el-form-item>
                <el-form-item label="身份证号">
                  <span>{{ props.row.identityNo }}</span>
                </el-form-item>
                <el-form-item label="银行卡号">
                  <span>{{ props.row.bankCard }}</span>
                </el-form-item>
                <el-form-item label="开户行">
                  <span>{{ props.row.bankName }}</span>
                </el-form-item>
                <el-form-item label="网点编号">
                  <span>{{ props.row.cabSysId }}</span>
                </el-form-item>
                <el-form-item label="主机硬件ID">
                  <span>{{ props.row.machineCode }}</span>
                </el-form-item>
                <el-form-item label="网点名称">
                  <span>{{ props.row.cabName }}</span>
                </el-form-item>
                <el-form-item label="开通时间">
                  <span>{{ props.row.createDate }}</span>
                </el-form-item>
                <el-form-item label="状态">
                  <span>{{ props.row.status }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="柜机管理人" prop="nickname" show-overflow-tooltip min-width="90"></el-table-column>
          <el-table-column label="注册手机号" prop="username" show-overflow-tooltip min-width="120"></el-table-column>
          <el-table-column label="网点名称" prop="cabName" show-overflow-tooltip min-width="200"></el-table-column>
          <el-table-column label="网点编号" prop="cabSysId" show-overflow-tooltip min-width="120"></el-table-column>
          <el-table-column label="开通时间" prop="createDate" show-overflow-tooltip min-width="160"></el-table-column>
          <el-table-column label="主机硬件ID" prop="machineCode" show-overflow-tooltip min-width="150"></el-table-column>
          <el-table-column label="状态" prop="status" show-overflow-tooltip min-width="80"></el-table-column>
          <el-table-column label="操作" width="150" fixed="right">
            <template slot-scope="scope">
              <!-- 列表操作菜单 -->
              <span class="text-link mr5" @click="toDetail(scope.row)">查看详情</span>
              <span class="warning-link" @click="toBind(scope.row)">绑定</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="page-wrapper">
          <!-- 分页组件 -->
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
      </div>
    </div>
    <n-dialog v-model="bindShow" title="绑定柜机" @change="closeBindPanel" class="panel-zindex">
      <add-bind v-if="bindShow" :rowData="rowData"></add-bind>
    </n-dialog>
    <n-dialog v-model="detailShow" title="柜老板详情" @change="closeDetailPanel" class="panel-zindex">
      <detail v-if="detailShow" :rowData="rowData"></detail>
    </n-dialog>
  </div>
</template>

<script>
import tableMixin from "@/mixins/tableMixin";
import exportButton from "@/components/exportButton";
import AddBind from "./components/Bind";
import Detail from "./components/Detail";
import { cab } from "@/api/config";

export default {
  name: "BossManage",
  data() {
    return {
      query: {
        // 查询参数
        nickname: "",
        identityNo: "",
        username: "",
        terminalCode: "",
        machineCode: "",
        cabName: "",
        limit: 10,
        page: 1
      },
      searchExpand: true, // 筛选展开状态
      status: [
        //状态列表
        {
          value: "0",
          label: "未审核"
        },
        {
          value: "1",
          label: "已审核"
        }
      ],
      isPrimary: [
        //柜体类型
        {
          value: "1",
          label: "主柜"
        },
        {
          value: "0",
          label: "副柜"
        }
      ],
      exportQuery: {}, // 导出参数
      bindShow: false, // 绑定显示
      detailShow: false, // 详情显示
      rowData: {} // 组件通信值
    };
  },
  mixins: [tableMixin],
  components: {
    exportButton,
    AddBind,
    Detail
  },
  created() {
    this.onSearch();
  },
  mounted() {},
  methods: {
    async loadList() {
      // 获取列表
      this.query.page = this.tableParams.pageNum;
      this.query.limit = this.tableParams.pageSize;
      if (this.allData[this.tableParams.pageNum - 1] && !this.reset) {
        this.initialTableData(
          this.allData[this.tableParams.pageNum - 1],
          this.tableParams.total
        );
      } else {
        let _result = await this.$apis.cab.boss.list(
          this.assignQuery({
            token: this.$token,
            ...this.query
          })
        );
        if (_result.data.list && _result.data.list.length > 0) {
          _result.data.list.forEach(i => {
            i.status = "已审核";
          });
          this.$nextTick(function() {
            this.allData[this.tableParams.pageNum - 1] = _result.data.list;
            this.initialTableData(_result.data.list, _result.data.amount);
            this.reset = false;
          });
        }
      }
    },
    openSelect() {
      // 展开筛选
      this.searchExpand = !this.searchExpand;
    },
    exportOrder() {
      //导出
      let params = {
        query: {
          token: this.$token,
          ...this.query
        },
        total: null,
        url: `${cab}/cabinetBoss/export`,
        fileName: "柜老板列表.xls"
      };
      this.exportQuery = Object.assign({}, params);
    },
    toDetail(row) {
      // 详情
      console.log(row);
      this.detailShow = true;
      this.rowData = Object.assign({}, row);
    },
    toBind(row) {
      // 绑定
      console.log(row);
      this.bindShow = true;
      this.rowData = Object.assign({}, row);
    },
    closeBindPanel() {
      // 关闭绑定
      this.bindShow = false;
      this.rowData = Object.assign({});
    },
    closeDetailPanel() {
      // 关闭详情
      this.detailShow = false;
      this.rowData = Object.assign({});
    }
  }
};
</script>
