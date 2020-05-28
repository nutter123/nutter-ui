<template>
<div>
  <el-dialog class="site-dialog" title="设置网点开通状态" :visible.sync="value" width="600px" :close-on-click-modal="false" append-to-body :before-close="cancel">
    <div class="pos-status">
      <div class="header">
        <img :src="picList[pos.comId]" alt="暂无图片">
        <span style="font-weight:bolder;">{{pos.comName}}</span>
      </div>
      <div class="pos-list">
        <el-table class="table-select" :data="list" stripe border type='selection' tooltip-effect="light" @select="onSelectionChange" @select-all="onSelectionChange" ref="table">
          <el-table-column prop="cabName" label="网点名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <img :src="locaIcon" alt="暂无图片">
              <span>{{scope.row.cabName}}</span>
            </template>
          </el-table-column>
          <el-table-column type="selection" fixed="right" width="42"></el-table-column>
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
import locaIcon from '@/assets/img/icon_weizhe@2x.png'
export default {
  name: 'posList',
  data() {
    return {
      locaIcon,
      list: [],
      selected: [],
      picList: model.emsPicList()
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
    },
    pos: {
      type: Object,
      default () {
        return {
          comId: 0,
          comName: ''
        }
      }
    }
  },
  created() {
    this.loadList()
  },
  mounted() {},
  methods: {
    loadList() {
      // 加载品牌下柜机列表
      let params = {
        token: this.$token,
        merchantId: this.rowData.bossId,
        comId: this.pos.comId
      }
      this.$apis.cab.send.brandCabList(params).then(res => {
        if (res.msg && res.code !== 10000) {
          this.$message.error(`${res.msg ? res.msg : '请求失败'}`)
        } else {
          this.list = res.rows || []
          if (res.rows.length > 0) {
            res.rows.map(i => {
              if (i.selected) {
                this.selected.push(i)
                this.$nextTick(function () {
                  this.$refs.table.toggleRowSelection(i, true)
                })
              }
            })
          }
        }
      })
    },
    cancel() {
      // 取消
      this.list = []
      this.selected = []
      this.$emit("cancel")
    },
    save() {
      // 保存
      let arr = this.selected.map(i => i.cabId)
      let params = {
        cabIds: JSON.stringify(arr),
        token: this.$token,
        merchantId: this.rowData.bossId,
        comId: this.pos.comId
      }
      this.$apis.cab.send.saveComCab(params).then(res => {
        if (res.msg && res.code !== 10000) {
          this.$message.error(`${res.msg ? res.msg : '请求失败'}`)
        } else {
          this.$message.success('操作成功')
          this.cancel()
        }
      })
    },
    onSelectionChange(val) {
      // 多选选择
      console.log(val)
      this.selected = val
    }
  },
}
</script>