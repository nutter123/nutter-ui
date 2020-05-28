<template>
<div class="main">
  <el-form ref="infoForm" :model="infoForm" label-width="110px" class="info-form">
    <header>
      <p class="w160 vm">柜老板信息</p>
    </header>
    <div class="info-content">
      <div class="info-input">
        <el-form-item label="柜老板信息：" prop="nickname">
          <p class="form-content-p">{{infoForm.nickname}}</p>
        </el-form-item>
        <el-form-item label="注册手机号：" prop="username">
          <p class="form-content-p">{{infoForm.username}}</p>
        </el-form-item>
      </div>
      <div class="info-input">
        <el-form-item label="银行卡号：" prop="bankCard">
          <p class="form-content-p">{{infoForm.bankCard}}</p>
        </el-form-item>
        <el-form-item label="开户行：" prop="bankName">
          <p class="form-content-p">{{infoForm.bankName}}</p>
        </el-form-item>
      </div>
      <div class="info-input">
        <el-form-item label="身份证号：" prop="identityNo">
          <p class="form-content-p">{{infoForm.identityNo}}</p>
        </el-form-item>
        <el-form-item label="总收益：" prop="accountIncomeTotal">
          <p class="form-content-p">{{infoForm.accountIncomeTotal}}</p>
        </el-form-item>
      </div>
      <div class="info-input">
        <el-form-item label="可提现余额：" prop="accountIncome">
          <p class="form-content-p">{{infoForm.accountIncome}}</p>
        </el-form-item>
        <el-form-item label="已提现余额：">
          <p class="form-content-p">{{infoForm.accountIncomeTotal - infoForm.accountIncome}}</p>
        </el-form-item>
      </div>
    </div>
    <header>
      <p class="w160 vm">该老板名下所有网点</p>
    </header>
    <div class="info-content">
      <el-table class="pointer" :data="siteList" max-height="500" style="width: 98%;" stripe border @row-click="showInfo">
        <el-table-column prop="terminalCode" label="网点编号" show-overflow-tooltip min-width="120"></el-table-column>
        <el-table-column prop="cabName" label="网点名称" show-overflow-tooltip min-width="220"></el-table-column>
        <el-table-column prop="machineCode" label="主机硬件ID" show-overflow-tooltip min-width="200"></el-table-column>
      </el-table>
    </div>
    <header>
      <p class="w160 vm">寄件设置</p>
      <el-button type="primary" size="small" @click="addBrand" :disabled="canAdd">新增</el-button>
    </header>
    <div class="info-content">
      <send-setting class="boss-send-setting" :row-data="rowData" :brandShow="brandShow" @close="brandShow = false" @canAddFlag="canAddFlag"></send-setting>
    </div>
  </el-form>
  <el-dialog title="柜机网点信息" :visible.sync="siteDetailShow" width="80%" :close-on-click-modal="false" append-to-body :before-close="closeDetailDialog">
		<detail-info :detail-data="detailData"></detail-info>
    <div slot="footer" class="dialog_footer">
      <el-button @click="closeDetailDialog">关闭</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import SendSetting from './SendSetting'
import DetailInfo from './DetailInfo'
export default {
  name: 'BossDetail',
  data() {
    return {
      infoForm: {},
      siteList: [],
      canAdd: false,
      brandShow: false,
      siteDetailShow: false,
      detailData: {}
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
  components: {
		SendSetting,
		DetailInfo
  },
  created() {
    this.getBossInfo()
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
          this.siteList = resData.cabinetList
        }
      })
    },
    addBrand() {
      // 新增品牌
      this.brandShow = true
    },
    canAddFlag(flag) {
      // 按钮禁用
      this.canAdd = flag
    },
    showInfo(row) {
      // 展示网点详情
      console.log(row)
      this.detailData = row
      this.siteDetailShow = true
    },
    closeDetailDialog() {
      // 关闭网点详情
      this.siteDetailShow = false
    }
  }
}
</script>
