<template>
  <div class="search_container">
    <!-- 查询表单 -->
    <el-form inline size="small" ref="searchForm" :model="query" label-width="130px">
      <el-row :gutter="20" align="middle">
        <el-col
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
          :xl="4"
          v-for="(searchItem,index) in value"
          :key="index"
        >
          <el-form-item :prop="searchItem[1]" :label="searchItem[0]+'：'">
            <search-item @input="(val)=>inputValue(val,searchItem[1])" :value="searchItem"></search-item>
          </el-form-item>
        </el-col>
        <!-- <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
          <el-form-item prop="cabSysId" label="网点编号：">
            <el-input placeholder="请输入网点编号" v-model="query.cabSysId" clearable size="small"></el-input>
          </el-form-item>
        </el-col>
        <div :class="{'search-open':searchExpand, 'search-close':!searchExpand}">
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item prop="machineCode" label="主机硬件ID：">
              <el-input placeholder="请输入主机硬件ID" v-model="query.machineCode" clearable size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item prop="areaArr" label="城市：">
              <area-select v-model="query.areaArr" @change="areaChange"></area-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item prop="status" label="连接状态：">
              <el-select v-model="query.onlineStatus" clearable placeholder="请选择连接状态">
                <el-option label="在线" :value="1"></el-option>
                <el-option label="离线" :value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item prop="cabAddress" label="详细地址：">
              <el-input placeholder="请输入详细地址" v-model="query.cabAddress" clearable size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item prop="merchantId" label="老板：">
              <el-select v-model="query.merchantId" filterable clearable placeholder="请选择老板">
                <el-option
                  :label="item.name+'('+item.phone+')'"
                  :value="item.merchantId"
                  v-for="item in bossList"
                  :key="item.merchantId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item prop="operationGroupId" label="运营组名称：">
              <el-select
                v-model="query.operationGroupId"
                filterable
                clearable
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
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <el-form-item prop="businessStatus" label="柜机状态：">
              <el-select v-model="query.businessStatus" clearable placeholder="请选择柜机状态">
                <el-option label="启用" :value="0"></el-option>
                <el-option label="停用" :value="1"></el-option>
                <el-option label="撤柜" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </div>-->
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-button
            type="default"
            size="small"
            class="ml-20"
            @click="openSelect"
          >{{searchExpand?'- 收起筛选':'+ 展开筛选'}}</el-button>
          <el-button type="primary" size="small" @click="onSearch">搜索</el-button>
          <el-button type="danger" size="small" @click="onReset">重置</el-button>
          <export-button
            class="ml-10"
            :exportQuery="exportQuery"
            type="button"
            size="small"
            method="get"
            respType="blob"
            @click.native="exportOrder"
          ></export-button>
        </el-col>
      </el-row>
      <!-- 展开筛选 -->
    </el-form>
  </div>
</template>

<script>
import exportButton from "@/components/exportButton";
import searchItem from "./SearchItem";
import { ims } from "@/api/config";

export default {
  name: "search-form",
  props: {
    value: {
      type: Array,
      default() {
        return [["名称", "name", 1]];
      },
      required: true
    }
  },
  components: {
    searchItem,
    exportButton
  },
  data() {
    return {
      exportQuery: {}, // 导出参数
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
      searchExpand: false // 筛选展开状态
    };
  },
  created() {},
  methods: {
    inputValue(val, key) {
      this.query[key] = val;
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
          ...this.query,
          pageNum: 0,
          pageSize: 0
        },
        total: null,
        url: `${ims}/express/cabinet/general/info/list/export`,
        fileName: "网点列表.xls"
      };
      this.exportQuery = Object.assign({}, params);
    }
  }
};
</script>

<style>
</style>