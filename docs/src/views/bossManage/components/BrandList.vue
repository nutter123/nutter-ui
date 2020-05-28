<template>
<div>
  <el-dialog class="brand-add-dialog" title="可支持的寄件品牌" :visible.sync="value" width="600px" :close-on-click-modal="false" append-to-body :before-close="cancel">
    <div class="img-list">
      <div class="img-item" v-for="(item, index) in brandList" :key="index" @click="addBrand(item, index)">
        <i class="img-icon el-icon-success" v-if="item.bind"></i>
        <img :src="picList[item.comId]" alt="暂无图片">
        <p>{{item.comName}}</p>
      </div>
    </div>
    <div slot="footer" class="dialog_footer">
      <el-button size="small" @click="cancel">取消</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import model from '@/model'

export default {
  name: 'BrandList',
  data() {
    return {
      brandList: [],
      picList: model.emsPicList(),
      disabled: false
    }
  },
  props: {
    rowData: {
      type: Object,
      default () {
        return {}
      }
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.loadList()
  },
  mounted() {},
  methods: {
    loadList() {
      // 加载品牌列表
      let params = {
        token: this.$token,
        merchantId: this.rowData.bossId
      }
      this.$apis.cab.send.brandList(params).then(res => {
        if (res.msg && res.code !== 10000) {
          this.$message.error(`${res.msg ? res.msg : '请求失败'}`)
        } else {
          this.brandList = res.rows
        }
      })
    },
    cancel() {
      // 取消
      this.$emit("cancel")
    },
    addBrand(item, idx) {
      // 新增点击
      if (!this.disabled) {
        this.disabled = true
        if (!item.bind) {
          this.brandList[idx] = Object.assign({
            ...this.brandList[idx],
            bind: true
          })
          this.$emit('add', item)
        }
        setTimeout(() => {
          this.disabled = false
        }, 500)
      }
    }
  },
}
</script>