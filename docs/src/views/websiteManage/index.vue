<template>
  <div class="main">
    <n-title>网点管理</n-title>
    <div class="contain has-bread plr-20">
      <search-form :value="searchValue"></search-form>
      <div>
        <div class="pt-20 pb-20 tr">
          <el-button
            type="success"
            size="small"
            @click="banControl(0)"
            :disabled="tableParams.selectList.length == 0"
          >启用</el-button>
          <el-button
            type="danger"
            size="small"
            @click="banControl(2)"
            :disabled="tableParams.selectList.length == 0"
          >停用</el-button>
          <el-button
            type="info"
            size="small"
            @click="deleteControl()"
            :disabled="tableParams.selectList.length != 1"
          >撤柜</el-button>
          <el-button type="primary" size="small" @click="addNew">新增</el-button>
        </div>
        <!-- 数据列表 -->
        <el-table
          :data="tableParams.list"
          stripe
          border
          tooltip-effect="light"
          ref="table"
          class="mt20 x-expand-table"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <!-- 列表内嵌表单 -->
              <el-form label-position="left" inline class="table-expand-form">
                <el-form-item label="网点名称">
                  <span>{{ props.row.cabName }}</span>
                </el-form-item>
                <el-form-item label="网点编号">
                  <span>{{ props.row.cabSysId }}</span>
                </el-form-item>
                <el-form-item label="主机硬件ID">
                  <span>{{ props.row.machineCode }}</span>
                </el-form-item>
                <el-form-item label="开通时间">
                  <span>{{checkTime(props.row.createDate)}}</span>
                </el-form-item>
                <el-form-item label="最近在线时间">
                  <span>{{checkTime(props.row.lastOnlineTime)}}</span>
                </el-form-item>
                <el-form-item label="省份">
                  <span>{{ props.row.provinceName }}</span>
                </el-form-item>
                <el-form-item label="城市">
                  <span>{{ props.row.cityName }}</span>
                </el-form-item>
                <el-form-item label="区县">
                  <span>{{ props.row.countyName }}</span>
                </el-form-item>
                <el-form-item label="详细地址">
                  <span>{{ props.row.cabAddress }}</span>
                </el-form-item>
                <el-form-item label="老板">
                  <span>{{ props.row.bossName+'('+props.row.bossPhone+')' }}</span>
                </el-form-item>
                <el-form-item label="运营手机号">
                  <span>{{ props.row.operationPhone }}</span>
                </el-form-item>
                <el-form-item label="经度">
                  <span>{{ props.row.longitude/1000000 }}</span>
                </el-form-item>
                <el-form-item label="纬度">
                  <span>{{ props.row.latitude/1000000 }}</span>
                </el-form-item>
                <el-form-item label="主柜">
                  <span>{{ props.row.primary }}</span>
                </el-form-item>
                <el-form-item label="副柜">
                  <span>{{ props.row.secondary }}</span>
                </el-form-item>
                <el-form-item label="签收手机号">
                  <span>{{ props.row.signPhone }}</span>
                </el-form-item>
                <el-form-item label="总格口数">
                  <span>{{ props.row.count }}</span>
                </el-form-item>
                <el-form-item label="大格口数">
                  <span>{{ props.row.lcount }}</span>
                </el-form-item>
                <el-form-item label="中格口数">
                  <span>{{ props.row.mcount }}</span>
                </el-form-item>
                <el-form-item label="小格口数">
                  <span>{{ props.row.scount }}</span>
                </el-form-item>
                <el-form-item label="微格口数">
                  <span>{{ props.row.tcount }}</span>
                </el-form-item>
                <el-form-item label="连接状态">
                  <span>{{checkStatus(props.row.onlineStatus)}}</span>
                </el-form-item>
                <el-form-item label="柜机状态">
                  <span>{{checkPolicyStatus(props.row.controlPolicy,props.row.status)}}</span>
                </el-form-item>
                <el-form-item label="运营组名称">
                  <span>{{props.row.operationGroupName}}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column type="selection" width="55" fixed="left"></el-table-column>
          <el-table-column label="网点编号" prop="cabSysId" show-overflow-tooltip min-width="100"></el-table-column>
          <el-table-column label="网点名称" prop="cabName" show-overflow-tooltip min-width="100"></el-table-column>
          <el-table-column label="老板" prop="bossName" show-overflow-tooltip min-width="90"></el-table-column>
          <el-table-column
            label="运营组"
            prop="operationGroupName"
            show-overflow-tooltip
            min-width="110"
          ></el-table-column>
          <!-- <el-table-column label="开通时间" prop="createDate" show-overflow-tooltip min-width="160">
            <template slot-scope="scope">{{checkTime(scope.row.createDate)}}</template>
          </el-table-column>-->
          <el-table-column
            label="最近在线时间"
            prop="lastOnlineTime"
            show-overflow-tooltip
            min-width="160"
          >
            <template slot-scope="scope">{{checkTime(scope.row.lastOnlineTime)}}</template>
          </el-table-column>
          <!-- <el-table-column label="详细地址" prop="cabAddress" show-overflow-tooltip min-width="280"></el-table-column> -->
          <el-table-column label="柜机状态" prop="status" show-overflow-tooltip min-width="80">
            <template slot-scope="scope">
              <el-tag
                :type="(scope.row.businessStatus == '2'||scope.row.controlPolicy>0) ? 'danger' : 'success'"
                disable-transitions
              >{{checkPolicyStatus(scope.row.controlPolicy,scope.row.status)}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="连接状态" prop="onlineStatus" show-overflow-tooltip min-width="80">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.onlineStatus == '1' ? 'success' : 'danger'"
                disable-transitions
              >{{checkStatus(scope.row.onlineStatus)}}</el-tag>
            </template>
          </el-table-column>
          <!-- <el-table-column label="状态" prop="status" show-overflow-tooltip min-width="80"></el-table-column> -->
          <el-table-column label="操作" width="80" fixed="right">
            <template slot-scope="scope">
              <!-- 列表操作菜单 -->
              <span class="text-link" @click="toDetail(scope.row)">查看详情</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="text-right mt-20">
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
    <n-dialog v-model="addShow" title="新增网点" @change="closeAddPanel" class="panel-zindex">
      <new-website ref="newWebsite" @after-save="afterSave"></new-website>
    </n-dialog>
    <n-dialog v-model="detailShow" title="网点详情" @change="closeDetailPanel" class="panel-zindex">
      <website-detail ref="websiteDetail" :row-data="detailData"></website-detail>
    </n-dialog>
  </div>
</template>

<script>
import tableMixin from "@/mixins/tableMixin";
import exportButton from "@/components/exportButton";
import newWebsite from "./components/New";
import websiteDetail from "./components/Detail";
import searchForm from "./components/SearchForm";
import { fmt } from "@/utils/index";
import AreaSelect from "@/components/AreaSelect";
import { ims } from "@/api/config";

export default {
  name: "WebsiteManage",
  data() {
    return {
      query: {
        // 查询参数
        cabSysId: "",
        machineCode: "",
        cabName: "",
        // statusValue: "",
        cabAddress: "",
        onlineStatus: "",
        areaArr: [],
        province: "",
        city: "",
        area: "",
        limit: 10,
        merchantId: "",
        operationGroupId: "",
        page: 1,
        businessStatus: ""
      },
      searchValue: [
        ["柜机网点名称", "cabName", 1],
        ["网点编号", "cabSysId", 1],
        ["主机硬件ID", "machineCode", 1],
        ["城市", "areaArr", 5],
        ["连接状态", "onlineStatus", 2, [{ 在线: 1 }, { 离线: 3 }]],
        ["详细地址", "cabAddress", 1],
        ["老板", "merchantId", 6],
        ["运营组名称", "operationGroupId", 7],
        [
          "柜机状态",
          "businessStatus",
          2,
          [{ 启用: 0 }, { 停用: 1 }, { 撤柜: 2 }]
        ]
      ],
      searchExpand: false, // 筛选展开状态
      status: [
        //网点状态列表
        {
          value: "0",
          label: "未审核"
        },
        {
          value: "1",
          label: "已审核"
        }
      ],
      bossList: [],
      groupList: [],
      cityList: [], // 城市列表
      exportQuery: {}, // 导出参数
      addShow: false, // 新增显示
      detailShow: false, // 详情显示
      detailData: {} // 详情交互数据
    };
  },
  mixins: [tableMixin],
  components: {
    exportButton,
    newWebsite,
    websiteDetail,
    AreaSelect,
    searchForm
  },
  created() {
    this.onSearch();
    this.getCity();
    this.getGroupList();
    this.getBossList();
  },
  mounted() {},
  methods: {
    getCity() {
      // 获取城市列表
      let params = {
        token: this.$token
      };
      this.$apis.cab.common.cityList(params).then(res => {
        this.cityList = res.data.list;
      });
    },
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
        let areaObj = this.getAreaObj();
        let _result = await this.$apis.cab.cabinet.getListNew(
          this.assignQuery({
            ...this.query,
            ...areaObj,
            areaArr: null
          })
        );
        if (_result.infoItems && _result.infoItems.length > 0) {
          // _result.infoItems.forEach(i => {
          //   i.status = "已审核";
          // });
          this.$nextTick(function() {
            this.allData[this.tableParams.pageNum - 1] = _result.infoItems;
            this.initialTableData(_result.infoItems, _result.total);
            this.reset = false;
          });
        } else {
          this.$nextTick(function() {
            this.allData = [];
            this.initialTableData([], 0);
            this.reset = false;
          });
        }
        this.$refs.table.clearSelection();
      }
    },
    getAreaObj() {
      let arr = this.query.areaArr,
        obj = {};
      let id = arr[arr.length - 1];
      if (arr.length == 1) {
        obj.province = id;
        obj.city = "";
        obj.area = "";
      } else if (arr.length == 2) {
        obj.province = "";
        obj.city = id;
        obj.area = "";
      } else if (arr.length == 3) {
        obj.province = "";
        obj.city = "";
        obj.area = id;
      } else {
        obj.province = "";
        obj.city = "";
        obj.area = "";
      }
      return obj;
    },
    areaChange(data) {
      this.query.areaArr = data;
    },
    toDetail(row) {
      // 详情
      console.log(row);
      this.detailData = Object.assign({}, row);
      this.detailShow = true;
    },
    deleteControl() {
      this.$confirm("确定对该网点执行撤柜操作吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let ids = this.tableParams.selectList.map(i => i.id);
          let id = ids[0];
          if (!id) {
            this.$message.error("该网点id不存在!");
          }
          this.$apis.cab.cabinet.deleteCab(id).then(() => {
            this.$message.success("操作成功");
            this.onSearch();
          });
        })
        .catch(e => {
          console.error(e);
        });
    },
    banControl(type) {
      this.$confirm("确定执行操作吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let ids = this.tableParams.selectList.map(i => i.id);
          let params = {
            cabinetIds: ids,
            controlPolicy: type
          };
          this.$apis.cab.cabinet.banControl(params).then(() => {
            this.$message.success("操作成功");
            this.onSearch();
          });
        })
        .catch(e => {
          console.error(e);
        });
    },
    addNew() {
      // 新增
      this.addShow = true;
    },
    closeAddPanel() {
      // 关闭新增弹窗
      this.addShow = false;
      this.$refs.newWebsite.resetForm();
    },
    afterSave() {
      // 新增回调
      this.closeAddPanel();
      this.onSearch();
    },
    closeDetailPanel() {
      // 关闭详情弹窗
      this.detailData = Object.assign({});
      this.detailShow = false;
    },
    checkTime(time) {
      if (time > 0) {
        return fmt.date(time);
      } else {
        return "--:--";
      }
    },
    checkPolicyStatus(control, status) {
      let result = "";
      switch (control) {
        case 0:
          result = "启用";
          break;
        case 1:
          result = "停用";
          break;
        default:
          result = "停用";
      }
      if (status == 2) {
        result = "撤柜";
      }
      return result;
    },
    checkStatus(type) {
      let result = "";
      switch (type) {
        case 0:
          result = "未开机";
          break;
        case 1:
          result = "在线";
          break;
        case 2:
          result = "暂离";
          break;
        case 3:
          result = "离线";
          break;
        default:
          result = "无数据";
      }
      return result;
    }
  }
};
</script>