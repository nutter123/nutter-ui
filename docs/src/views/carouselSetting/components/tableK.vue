<template>
  <div class="pl-20">
    <div class="contain has-bread p20">
      <div>
        <!-- 查询表单 -->
        <el-form
          inline
          size="small"
          ref="searchForm"
          :model="searchForm"
          class="search-form"
          label-position="left"
          label-width="auto"
        >
          <div class="mini-search">
            <el-form-item prop="operationGroupId" label="运营组名称:">
              <el-select
                v-model="searchForm.operationGroupId"
                clearable
                size="small"
                filterable
                placeholder="请选择运营组名称"
              >
                <el-option label="请选择运营组名称" value></el-option>
                <el-option
                  :label="item.name"
                  :value="item.operationGroupId"
                  v-for="item in groupList"
                  :key="item.operationGroupId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="status" label="状态:">
              <el-select class="w180" v-model="searchForm.status" clearable placeholder="请选择状态">
                <el-option label="请选择状态" value></el-option>
                <el-option label="启用" value="1"></el-option>
                <el-option label="禁用" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="date" label="更新时间:">
              <el-date-picker
                v-model="date"
                type="daterange"
                class="line-div"
                :picker-options="pickerOptions"
                value-format="yyyy-MM-dd"
                size="small"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
              ></el-date-picker>
            </el-form-item>
            <el-button type="danger" size="small" @click="onReset()">重置</el-button>
            <el-button type="primary" size="small" @click="onSearch()">搜索</el-button>
          </div>
        </el-form>
      </div>
      <div>
        <div class="pt20 tr">
          <el-button type="primary" size="small" @click="toAddNew()">新增</el-button>
        </div>
        <el-table
          :data="tableParams.list"
          type="selection"
          stripe
          border
          tooltip-effect="light"
          ref="table"
          :default-sort="{prop: 'indexs', order: 'ascending'}"
          class="mt20 x-expand-table"
        >
          <el-table-column label="序号" prop="indexs" width="50"></el-table-column>
          <el-table-column label="图片" prop="imgUrl" show-overflow-tooltip min-width="100">
            <template slot-scope="scope">
              <el-image style="width: 100px; height: 50px" :src="scope.row.imgUrl" fit="fit"></el-image>
            </template>
          </el-table-column>
          <el-table-column label="跳转类型" prop="jumpType" show-overflow-tooltip min-width="50">
            <template slot-scope="scope">
              <span>{{ checkType(scope.row.jumpType) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="跳转地址" prop="jumpContent" show-overflow-tooltip min-width="80">
            <template slot-scope="scope">
              <span>{{scope.row.jumpContent}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="运营组名称"
            prop="operationGroupName"
            show-overflow-tooltip
            min-width="50"
          ></el-table-column>
          <el-table-column label="状态" prop="status" show-overflow-tooltip min-width="50">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.status == '1' ? 'success' : 'danger'"
                effect="dark"
              >{{ scope.row.status == '1' ? '启用' : '禁用' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="更新时间" prop="updateTime" min-width="80" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ checkTime(scope.row.updateTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="100">
            <template slot-scope="scope">
              <!-- 列表操作菜单 -->
              <span class="text-link mr5" @click="toDetail(scope.row)">查看详情</span>
              <span class="warning-link mr5" @click="toEdit(scope.row)">修改</span>
              <span class="error-link" @click="toDel(scope.row)">删除</span>
              <span class="error-link" v-if="scope.row.indexs!=1" @click="shift(scope.row,-1)">上移</span>
              <span
                class="error-link"
                v-if="scope.row.indexs<tableParams.total"
                @click="shift(scope.row,1)"
              >下移</span>
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
    <n-dialog v-model="dialogShow" :title="dialogType==1?'新增轮播图':'修改轮播图'" class="panel-zindex">
      <new-website
        ref="newWebsite"
        :type="dialogType"
        :groupType="true"
        :info="dialogInfo"
        :startType="2"
        @after-save="afterSave"
      ></new-website>
    </n-dialog>
    <detail-dialog
      :dialogVisible="detailShow"
      :modelInfo="detailModel"
      @closeDialog="closeDialog"
      ref="detailDialog"
    ></detail-dialog>
  </div>
</template>
<script>
import tableMixin from "@/mixins/tableMixin";
import newWebsite from "./New";
import detailDialog from "./detailDialog";
import { fmt } from "@/utils/index";
export default {
  name: "tableT",
  data() {
    return {
      groupList: {},
      dialogShow: false,
      searchForm: {
        status: "",
        startTime: "",
        endTime: "",
        operationGroupId: ""
      },
      date: [],
      detailShow: false,
      detailModel: {}, // 详情交互数据
      dialogType: 1,
      dialogInfo: {},
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  mixins: [tableMixin],
  components: {
    newWebsite,
    detailDialog
  },
  created() {},
  mounted() {
    this.onSearch();
    this.getGroupList();
  },
  methods: {
    onReset() {
      this.searchForm = {};
      this.date = [];
    },
    getGroupList() {
      this.$apis.common.getOptionsList().then(res => {
        this.groupList = res.infoItems;
      });
    },
    async loadList() {
      let date = this.date;
      this.searchForm.startTime = date[0];
      this.searchForm.endTime = date[1];
      let result = await this.$apis.carouseSetting.getList(
        this.assignQuery({
          ...this.searchForm,
          productId: "2d2a4ef6-4f48-40f2-95e4-458b806dc2d9"
        })
      );
      let _page = result;
      this.initialTableData(_page.rows, _page.total);
    },
    toAddNew() {
      this.dialogType = 1;
      this.dialogShow = true;
    },
    closeDialog() {
      this.detailModel = {
        templateName: "",
        templateType: 1,
        content: ""
      };
      this.detailShow = false;
    },
    async submitDialog(params) {
      let that = this;
      if (this.dialogType == 0) {
        await this.$apis.cab.sms.addSms({
          content: params.content,
          name: params.templateName,
          templateType: params.templateType,
          token: that.$token
        });
        that.onSearch();
        that.closeDialog();
        that.$message.success("添加成功！");
      } else {
        await this.$apis.cab.sms.editSms(
          {
            templateContent: params.content,
            token: this.$token
          },
          params.smsTemplateId
        );
        that.onSearch();
        that.closeDialog();
        that.$message.success("更新成功！");
      }
    },
    async toDel(row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          this.$apis.carouseSetting
            .delete({ id: row.id })
            .then(res => {
              if (res.code == "200") {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.onSearch();
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err.err_msg);
        });
    },
    toDetail(row) {
      this.detailModel = row;
      this.detailShow = true;
    },
    toEdit(row) {
      this.dialogType = 2;
      this.dialogInfo = row;
      this.dialogShow = true;
    },
    shift(row, type) {
      this.$apis.carouseSetting
        .shift({ id: row.id, shiftTab: type })
        .then(res => {
          if (res.code == "200") {
            this.$message({
              type: "success",
              message: "移动成功!"
            });
            this.onSearch();
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    toDown() {},
    afterSave() {
      this.dialogShow = false;
      this.dialogInfo = {};
      this.onSearch();
    },
    checkType(type) {
      switch (type) {
        case 0:
          return "不跳转";
        case 1:
          return "内链";
        case 2:
          return "外链";
        default:
          return "";
      }
    },
    checkTime(time) {
      return fmt.date(time);
    }
  }
};
</script>
<style>
.width-100 {
  width: 100%;
}
.menu-top {
  background: #f5a623;
  font-weight: bolder;
  height: 50px;
  line-height: 50px;
  color: #fff;
}
.lh40 {
  line-height: 40px;
}
</style>