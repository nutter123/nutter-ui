<template>
<div class="main">
  <el-form inline ref="infoForm" :model="infoForm" label-width="110px" class="info-form">
    <header>
      <p class="w160 vm">柜机管理人信息</p>
    </header>
    <div class="info-content">
      <el-form-item label="柜机管理人：" prop="nickname">
        <p class="form-content-p">{{infoForm.nickname}}</p>
      </el-form-item>
      <el-form-item label="注册手机号：" prop="username">
        <p class="form-content-p">{{infoForm.username}}</p>
      </el-form-item>
      <el-form-item label="身份证号：" prop="identityNo">
        <p class="form-content-p">{{infoForm.identityNo}}</p>
      </el-form-item>
    </div>
    <header>
      <p class="w160 vm">已绑定柜机列表</p>
      <div class="header-btn vt">
        <el-popover v-model="listShow" placement="right" width="650" trigger="click" :offset="200">
          <el-table class="pointer" :data="allCabinet" stripe border @row-click="addBind" max-height="600" v-loading="tableLoading">
            <el-table-column label="柜机列表">
              <el-table-column width="150" prop="terminalCode" label="柜机编号"></el-table-column>
              <el-table-column width="165" prop="cabName" label="柜机名称"></el-table-column>
              <el-table-column width="300" prop="cabAddress" label="柜机地址"></el-table-column>
            </el-table-column>
          </el-table>
          <el-button type="primary" slot="reference" size="small">新增绑定</el-button>
        </el-popover>
      </div>
    </header>
    <div class="info-content">
      <el-table :data="cabList" max-height="500" stripe border v-loading="tableLoading">
        <el-table-column prop="terminalCode" label="网点编号" show-overflow-tooltip min-width="120"></el-table-column>
        <el-table-column prop="cabName" label="网点名称" show-overflow-tooltip min-width="220"></el-table-column>
        <el-table-column prop="machineCode" label="主机硬件ID" show-overflow-tooltip min-width="200"></el-table-column>
        <el-table-column prop="primary" label="主柜" show-overflow-tooltip></el-table-column>
        <el-table-column prop="secondary" label="副柜" show-overflow-tooltip></el-table-column>
        <el-table-column prop="count" label="总格口数" show-overflow-tooltip></el-table-column>
        <el-table-column prop="set" label="操作" width="80">
          <template slot-scope="scope">
            <span class="error-link" @click="unBind(scope.row)">解绑</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-form>
</div>
</template>

<script>
export default {
  name: 'BindCab',
  data() {
    return {
      infoForm: {},
      cabList: [],
      allCabinet: [],
			tableLoading: false,
			listShow: false
    }
  },
  props: {
    rowData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  created() {
    this.getBossInfo()
    this.getCabinetList()
  },
  mounted() {},
  methods: {
    getBossInfo() {
      // 获取柜老板信息
      let params = {
        token: this.$token,
        id: this.rowData.id
      }
      this.$apis.cab.boss.getInfo(params).then(res => {
        if (res.msg && res.code !== 10000) {
          this.$message.error(`${res.msg ? res.msg : '请求失败'}`)
        } else {
          let resData = res.data.cabinetBossVo || {}
          this.infoForm = resData
          this.cabList = resData.cabinetList
        }
      })
    },
    getCabinetList() {
      // 获取柜机列表
      this.tableLoading = true
      let params = {
        token: this.$token
      }
      this.$apis.cab.boss.getCabList(params).then(res => {
        if (res.msg && res.code !== 10000) {
          this.$message.error(`${res.msg ? res.msg : '请求失败'}`)
        } else {
          this.allCabinet = res.data.list
        }
        this.tableLoading = false
      })
    },
    addBind(row) {
      // 新增绑定
      let params = {
        token: this.$token,
        id: this.rowData.id,
        cabId: row.id
      }
      this.$apis.cab.boss.bindCab(params).then(res => {
        if (res.msg && res.code !== 10000) {
          this.$message.error(`${res.msg ? res.msg : '请求失败'}`)
        } else {
          this.$notify({
            title: "成功",
            message: "柜机绑定成功",
            type: "success"
          })
          this.getBossInfo()
					this.getCabinetList()
					this.listShow = false
        }
      })
    },
    unBind(row) {
      // 删除绑定柜机
      this.$confirm("确定解绑该柜机吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          let params = {
            token: this.$token,
            id: row.id
          }
          this.$apis.cab.boss.unbindCab(params).then(res => {
            if (res.msg && res.code !== 10000) {
              this.$message.error(`${res.msg ? res.msg : '请求失败'}`)
            } else {
              this.$notify({
                title: "成功",
                message: "解绑成功",
                type: "success"
              });
              this.getBossInfo()
              this.getCabinetList()
            }
          })
        })
        .catch(() => {})
    }
  }
}
</script>
