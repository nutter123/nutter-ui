<template>
<div class="record-table">
  <header>{{recordInfo.cabName + ' ' + recordInfo.boxName}}</header>
  <el-table :data="tableParams.list" stripe border tooltip-effect="light" ref="table" class="mt20 tight-expand-table">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="table-expand-form" v-for="item of props.row.records" :key="item.operatorTime">
          <el-form-item label>
            <span>{{ item.operator }}</span>
          </el-form-item>
          <el-form-item label>
            <span>{{ item.operatorPhone }}</span>
          </el-form-item>
          <el-form-item label>
            <span>{{ item.operatorTime}}</span>
          </el-form-item>
          <el-form-item label>
            <span>{{ item.status }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="快递公司" prop="comName" show-overflow-tooltip min-width="100">
    </el-table-column>
    <el-table-column label="运单号" prop="expressId" show-overflow-tooltip min-width="200">
    </el-table-column>
    <el-table-column label="状态" prop="expressStateStr" show-overflow-tooltip min-width="100">
    </el-table-column>
    <el-table-column label="手机号" prop="memPhone" show-overflow-tooltip min-width="120">
    </el-table-column>
  </el-table>
  <div class="page-wrapper">
    <!-- 分页组件 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="tableParams.pageSize" :page-sizes="tableParams.pageSizes" :total="tableParams.total" :layout="tableParams.layout" class="mt15"></el-pagination>
  </div>
</div>
</template>

<script>
import tableMixin from "@/mixins/tableMixin"

export default {
  name: 'RecordLogs',
  data() {
    return {
      recordInfo: {}
    }
  },
  mixins: [tableMixin],
  props: {
    cabId: {
      type: String,
      default: '',
      required: true
    },
    boxCode: {
      type: String,
      default: '',
      required: true
    }
  },
  created() {
    this.onSearch()
  },
  mounted() {},
  methods: {
    async loadList() {
      // 请求格口记录
      let params = {
        token: this.$token,
        cabId: this.cabId,
        boxCode: this.boxCode,
        page: this.tableParams.pageNum,
        limit: this.tableParams.pageSize
      }
      if (this.allData[this.tableParams.pageNum - 1] && !this.reset) {
        this.initialTableData(this.allData[this.tableParams.pageNum - 1], this.tableParams.total)
      } else {
        let _result = await this.$apis.cab.box.getRecord(
          this.assignQuery({
            token: this.$token,
            ...params
          })
        )
        this.allData[this.tableParams.pageNum - 1] = _result.data.expressRecords
        this.initialTableData(_result.data.expressRecords, _result.data.total)
        this.recordInfo = _result.data.expressCabinet
        this.reset = false
      }
    }
  }
}
</script>
