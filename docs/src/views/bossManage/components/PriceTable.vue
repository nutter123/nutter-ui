<template>
<div>
  <el-dialog class="price-edit-table" :title="`设置${type == 1 ? '默认' : '该品牌在该网点的'}价格表`" :visible.sync="value" width="600px" :close-on-click-modal="false" append-to-body :before-close="cancel">
    <div class="pos-status">
      <div class="header">
        <div class="pos-info">
          <img :src="picList[pos.comId]" alt="暂无图片">
          <span style="font-weight:bolder;">{{pos.comName}}</span>
          <span class="cab-name" v-if="type == 0">
            <img class="icon" :src="locationIcon" alt="暂无图片">
            <p>{{pos.cabName}}</p>
          </span>
        </div>
      </div>
      <div class="area-select">
        <span>发出地：</span>
        <area-select v-model="area" @change="areaChange"></area-select>
      </div>
      <div class="pos-list">
        <el-table class="table-select" max-height="500" :data="list" stripe border tooltip-effect="light" ref="table">
          <el-table-column prop="destinationName" label="目的地（¥）" show-overflow-tooltip align="center"></el-table-column>
          <el-table-column prop="smallPrice" label="小格口（1kg）" show-overflow-tooltip align="center">
            <template slot-scope="scope">
              <el-input size="small" placeholder="" :min="0" :max="99" type="number" v-model="scope.row.smallPrice" @change="inputPrice(scope.row)" @keyup.native="validNum(scope.row.smallPrice, 'small', scope.$index)">
              </el-input>
            </template>
          </el-table-column>
          <el-table-column prop="mediumPrice" label="中格口（3kg）" show-overflow-tooltip align="center">
            <template slot-scope="scope">
              <el-input size="small" placeholder="" :min="0" :max="99" type="number" v-model="scope.row.mediumPrice" @change="inputPrice(scope.row)" @keyup.native="validNum(scope.row.mediumPrice, 'medium', scope.$index)">
              </el-input>
            </template>
          </el-table-column>
          <el-table-column prop="largePrice" label="大格口（5kg）" show-overflow-tooltip align="center">
            <template slot-scope="scope">
              <el-input size="small" placeholder="" :min="0" :max="99" type="number" v-model="scope.row.largePrice" @change="inputPrice(scope.row)" @keyup.native="validNum(scope.row.largePrice, 'large', scope.$index)">
              </el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div slot="footer" class="dialog_footer">
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button size="small" type="primary" @click="save">保存</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import model from '@/model'
import AreaSelect from '@/components/Area'
import locationIcon from '@/assets/img/icon_weizhe@2x.png'

export default {
  name: 'PriceList',
  data() {
    return {
      list: [],
      changePriceList: [],
      picList: model.emsPicList(),
      area: [],
      sourceId: null,
      locationIcon
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    pos: {
      type: Object,
      default () {
        return {
          comId: 0,
          comName: ''
        }
      }
    },
    type: {
      type: Number,
      default: 1
    },
    merchantId: {
      type: Number,
      default: null
    }
  },
  components: {
    AreaSelect
  },
  created() {},
  mounted() {},
  methods: {
    cancel() {
      this.$emit("cancel")
      this.list = []
      this.changePriceList = []
      this.area = []
      this.sourceId = null
    },
    save() {
      if (this.area.length == 0) {
        this.$message.warning('请选择发出地')
      } else if (this.changePriceList.length == 0) {
        this.$message.warning('当前价格表未做改变')
      } else {
        this.savePrice()
      }
    },
    savePrice() {
      let params = {
          token: this.$token,
          merchantId: this.type == 1 ? this.merchantId : null,
          comId: this.pos.comId,
          priceItem: JSON.stringify(this.changePriceList),
          source: +this.sourceId,
          cabId: this.type == 1 ? null : this.pos.cabId
        },
        that = this
      if (this.type == 1) {
        // 默认
        this.$apis.cab.send.merchantPriceSave(params).then(res => {
          if (res.msg && res.code !== 10000) {
            that.$message.error(`${res.msg ? res.msg : '请求失败'}`)
          } else {
            that.$message.success('操作成功')
            that.cancel()
          }
        })
      } else {
        // 柜机
        this.$apis.cab.send.cabinetPriceSave(params).then(res => {
          if (res.msg && res.code !== 10000) {
            that.$message.error(`${res.msg ? res.msg : '请求失败'}`)
          } else {
            that.$message.success('操作成功')
            that.cancel()
          }
        })
      }
    },
    areaChange(data) {
      console.log(data)
      this.area = data
      let province = JSON.parse(data[0])
      this.sourceId = province.provinceId
      this.loadList(province.provinceId)
    },
    loadList(sourceId) {
      let params = {
          token: this.$token,
          merchantId: this.type == 1 ? this.merchantId : null,
          comId: this.pos.comId,
          source: sourceId,
          cabId: this.type == 1 ? null : this.pos.cabId
        },
        that = this
      if (this.type == 1) {
        // 默认
        this.$apis.cab.send.merchantPrice(params).then(res => {
          if (res.msg && res.code !== 10000) {
            that.$message.error(`${res.msg ? res.msg : '请求失败'}`)
          } else {
            that.list = that.initTable(res.rows)
          }
        })
      } else {
        // 柜机
        this.$apis.cab.send.cabinetPrice(params).then(res => {
          if (res.msg && res.code !== 10000) {
            that.$message.error(`${res.msg ? res.msg : '请求失败'}`)
          } else {
            that.list = that.initTable(res.rows)
          }
        })
      }
    },
    initTable(list) {
      if (list && list.length > 0) {
        list.forEach(price => {
          price.smallPrice = price.smallPrice / 100
          price.mediumPrice = price.mediumPrice / 100
          price.largePrice = price.largePrice / 100
        })
        return list
      } else {
        return []
      }
    },
    validNum(val, size, idx) {
      let reg = /(^[0-9]{1,2}$)|(^[0-9]{1,2}[\.]{1}[0-9]{1,2}$)/,
        num = '' + val
      if (!reg.test(num)) {
        this.list[idx][`${size}Price`] = ''
        this.$set(this.list, idx, Object.assign({}, this.list[idx]))
        this.$message.warning('仅支持两位正整数（或包含两位小数）')
      }
    },
    inputPrice(row) {
      let arr = [],
        item = {
          destination: row.destination,
          destinationName: row.destinationName,
          largePrice: (+row.largePrice) * 100,
          mediumPrice: (+row.mediumPrice) * 100,
          smallPrice: (+row.smallPrice) * 100
        }
      if (this.changePriceList.length > 0) {
        arr = this.changePriceList.filter(i => {
          return i.destination !== row.destination
        })
        arr.push(item)
        this.changePriceList = arr
      } else {
        this.changePriceList.push(item)
      }
    }
  },
}
</script>