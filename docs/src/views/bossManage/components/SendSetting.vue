<template>
<div class="cab-plan" v-if="brandInfoList && brandInfoList.length > 0">
  <div class="brand-list">
    <ul>
      <template v-for="(item,index) in brandInfoList">
        <li :key="index" class="brand-list-row">
          <div class="img-box">
            <img :src="picList[item.comId]" alt="暂无图片">
          </div>
            <div class="com-name">
              <span>{{item.comName}}</span>
            </div>
            <div v-if="!item.showInput" class="col-item">
              <div v-if="item.account">
                <span class="col-item-label">电子面单账号：</span>
                <p class="col-item-font" :title="item.account">{{item.account}}</p>
              </div>
              <div v-else>请设置电子面单账号</div>
            </div>
            <div v-else>
              <el-input size="small" placeholder="电子面单账号" v-model="item.account" :maxlength="20" clearable>
              </el-input>
            </div>
            <div v-if="!item.showInput" class="col-item">
              <div v-if="item.password">
                <span class="col-item-label">电子面单密码：</span>
                <p class="col-item-font" :title="item.password">{{item.password}}</p>
              </div>
              <div v-else>请设置电子面单密码</div>
            </div>
            <div v-else>
              <el-input size="small" placeholder="电子面单密码" v-model="item.password" :maxlength="20" clearable>
              </el-input>
            </div>
            <div class="btn-area">
              <el-button v-if="!item.showInput" type="primary" size="mini" @click="setAccount(item, index)">设置</el-button>
              <el-button v-else type="success" size="mini" @click="setAccount(item, index)">保存</el-button>
              <el-button type="primary" size="mini" @click="setStatus(item, index)">设置各网点开通状态</el-button>
              <el-button type="primary" size="mini" @click="setPrice(item, index)">设置默认价格表</el-button>
              <el-button type="primary" size="mini" @click="setMan(item, index)">设置默认揽收员</el-button>
            </div>
        </li>
      </template>
    </ul>
  </div>
  <brand-list v-model="brandShow" :row-data="rowData" @cancel="closeBrand" @add="afterAdd"></brand-list>
  <pos-list v-if="posShow" :row-data="rowData" v-model="posShow" :pos="posDetail" @cancel="posShow=false" @after-save="afterSaveStatus"></pos-list>
  <price-table v-if="priceShow" v-model="priceShow" :pos="posDetail" :merchantId="rowData.bossId" @cancel="priceShow=false"></price-table>
  <man-list v-if="manShow" v-model="manShow" :pos="posDetail" :merchantId="rowData.bossId" @cancel="manShow=false"></man-list>
</div>
</template>

<script>
import model from '@/model'
import BrandList from './BrandList'
import PosList from './PosStatusList'
import PriceTable from './PriceTable'
import ManList from './ManList'

export default {
  name: 'BossSendSetting',
  data() {
    return {
      canAdd: false,
      brandInfoList: [],
      picList: model.emsPicList(),
      posShow: false,
      priceShow: false,
      manShow: false,
      posDetail: {
        comId: 0,
        comName: ''
      }
    }
  },
  props: {
    rowData: {
      type: Object,
      default () {
        return {}
      }
    },
    brandShow: {
      type: Boolean,
      default: false
    }
  },
  components: {
    BrandList,
    PosList,
    PriceTable,
    ManList
  },
  created() {
    this.loadList()
  },
  mounted() {},
  methods: {
    loadList() {
      // 加载已设置品牌列表
      let params = {
        token: this.$token,
        merchantId: this.rowData.bossId
      }
      this.$apis.cab.send.comBossList(params).then(res => {
        if (res.msg && res.code !== 10000) {
          this.$message.error(`${res.msg ? res.msg : '请求失败'}`)
        } else {
          this.brandInfoList = res.rows
        }
      })
    },
    closeBrand() {
      // 关闭品牌
      this.$emit('close')
    },
    afterAdd(data) {
      // 新增完成
      this.closeBrand()
      let item = {
        ...data,
        showInput: true,
        account: null,
        password: null
      }
      this.$emit('canAddFlag', true)
      this.brandInfoList.push(item)
    },
    setAccount(item, index) {
      // 设置面单账号
      if (item.showInput) {
        if (item.account && item.account != '' && item.password && item.password != '') {
          let params = {
            token: this.$token,
            merchantId: this.rowData.bossId,
            comId: item.comId,
            account: item.account,
            password: item.password
          }
          this.$apis.cab.send.saveBossCom(params).then(res => {
            if (res.msg && res.code !== 10000) {
              this.$message.error(`${res.msg ? res.msg : '请求失败'}`)
            } else {
              this.$emit('canAddFlag', false)
              item.showInput = item.showInput != undefined && item.showInput != null ? !item.showInput : true
              this.$set(this.brandInfoList, index, item)
              this.$message.success('添加成功')
            }
          })
        } else {
          this.$message.warning('请输入电子面单账号/密码')
        }
      } else {
        item.showInput = item.showInput != undefined && item.showInput != null ? !item.showInput : true
        this.$set(this.brandInfoList, index, item)
      }
    },
    setStatus(item) {
      // 设置状态
      this.posDetail = Object.assign({
        comId: item.comId,
        comName: item.comName
      })
      this.posShow = true
    },
    setPrice(item) {
      // 设置价格
      this.posDetail = Object.assign({
        comId: item.comId,
        comName: item.comName
      })
      this.priceShow = true
    },
    setMan(item) {
      // 设置揽收员
      this.posDetail = Object.assign({
        comId: item.comId,
        comName: item.comName
      })
      this.manShow = true
    },
    afterSaveStatus() {}
  },
}
</script>