<template>
<div>
  <el-form inline class="info-form" ref="detailForm" :model="detailData" label-width="110px">
    <header>
      <p class="w160 vm">基础信息</p>
    </header>
    <div class="info-content">
      <el-form-item label="网点编号：" prop="terminalCode">
        <p class="form-content-p">{{detailData.terminalCode}}</p>
      </el-form-item>
      <el-form-item label="主机硬件ID：" prop="machineCode">
        <p class="form-content-p">{{detailData.machineCode}}</p>
      </el-form-item>
      <el-form-item label="网点名称：" prop="cabName">
        <p class="form-content-p">{{detailData.cabName}}</p>
      </el-form-item>
    </div>
    <header>
      <p class="w160 vm">价格信息</p>
    </header>
    <div class="info-content">
      <el-table :data="detailList" stripe border>
        <el-table-column label="数量单价信息">
          <el-table-column prop="count" label="总格口数" show-overflow-tooltip></el-table-column>
          <el-table-column prop="lCount" label="大格口数/单价" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.lCount}} / {{scope.row.lPrice / 100}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="mCount" label="中格口数/单价" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.mCount}} / {{scope.row.mPrice / 100}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="sCount" label="小格口数/单价" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.sCount}} / {{scope.row.sPrice / 100}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="tCount" label="微格口数/单价" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.tCount}} / {{scope.row.tPrice / 100}}</span>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <header>
      <p class="vm">授权免费投递账号信息<span class="ml10 fs12 fc-gray">仅该网点有效</span></p>
    </header>
    <div class="info-content" v-if="detailData.freeAccountList">
      <el-table :data="detailData.freeAccountList" stripe border>
        <el-table-column label="详细信息">
          <el-table-column prop="memberId" min-width="160" label="ID"></el-table-column>
          <el-table-column prop="nickname" min-width="90" label="姓名"></el-table-column>
          <el-table-column prop="phone" min-width="110" label="注册手机号"></el-table-column>
          <el-table-column prop="password" min-width="100" label="密码"></el-table-column>
          <el-table-column prop="identiNo" min-width="180" label="身份证号"></el-table-column>
          <el-table-column prop="balance" min-width="80" label="账户余额"></el-table-column>
          <el-table-column prop="comName" min-width="80" label="公司名称"></el-table-column>
          <el-table-column prop="comId" min-width="80" label="公司ID"></el-table-column>
          <el-table-column prop="createDate" min-width="180" label="注册日期"></el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </el-form>
</div>
</template>

<script>
export default {
  name: 'DetailInfo',
  data() {
    return {}
  },
  props: {
    detailData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    detailList: {
      get() {
        return [this.detailData]
      },
      set(val) {
        console.log(val)
      }
    }
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>
