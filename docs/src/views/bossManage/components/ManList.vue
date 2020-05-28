<template>
<div>
  <el-dialog class="man-list-dialog" :title="`设置${type == 1 ? '默认' : '该品牌在该网点的'}揽收员`" :visible.sync="value" width="600px" :close-on-click-modal="false" append-to-body :before-close="cancel">
    <div class="pos-status">
      <div class="header">
        <img :src="picList[pos.comId]" alt="暂无图片">
        <span style="font-weight:bolder;">{{pos.comName}}</span>
        <span class="cab-name" v-if="type == 0">
          <img class="icon" :src="locationIcon" alt="暂无图片">
          <p>{{pos.cabName}}</p>
        </span>
      </div>
      <div class="pos-list">
        <div class="add-btn">
          <el-button type="primary" size="mini" @click="add" v-if="(type == 1 && list.length < 1) || type == 0">新增</el-button>
          <el-button type="primary" size="mini" @click="add" v-if="type == 1 && list.length > 0">修改</el-button>
        </div>
        <el-table class="table-select" :data="list" stripe :show-header="false" tooltip-effect="light" ref="table">
          <el-table-column width="42">
            <template slot-scope="scope">
              <p class="round-dot"></p>
              <span style="display:none;">{{scope.row.id}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="comName" label="公司名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.comName ? scope.row.comName : pos.comName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="nickname" label="快递员" show-overflow-tooltip></el-table-column>
          <el-table-column prop="phone" label="联系方式" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="80" fixed="right" v-if="type == 0">
            <template slot-scope="scope">
              <span class="default-tag">{{scope.row.default ? '默认' : ''}}</span>
              <el-button v-if="!scope.row.default" type="danger" size="mini" @click="del(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div slot="footer" class="dialog_footer">
      <el-button size="small" @click="cancel">取消</el-button>
      <!-- <el-button size="small" type="primary" @click="save">保存</el-button> -->
    </div>
  </el-dialog>
  <search-man v-model="addShow" :pos="pos" :list="list" :merchantId="merchantId" :type="type" @cancel="addShow = false" @save="loadList"></search-man>
</div>
</template>

<script>
import model from '@/model'
import SearchMan from './SearchMan'
import locationIcon from '@/assets/img/icon_weizhe@2x.png'

export default {
  name: 'manList',
  data() {
    return {
      list: [],
      picList: model.emsPicList(),
      addShow: false,
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
    SearchMan
  },
  created() {
    this.loadList()
  },
  mounted() {},
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    loadList() {
      let params = {
          token: this.$token,
          merchantId: this.type == 1 ? this.merchantId : null,
          comId: this.pos.comId,
          cabId: this.type == 1 ? null : this.pos.cabId
        },
        that = this
      if (this.type == 1) {
        // 默认
        this.$apis.cab.send.merchantMem(params).then(res => {
          if (res.msg && res.code !== 10000) {
            that.$message.error(`${res.msg ? res.msg : '请求失败'}`)
          } else {
            that.list = res.data.rows || []
          }
        })
      } else {
        // 柜机
        this.$apis.cab.send.cabinetMem(params).then(res => {
          if (res.msg && res.code !== 10000) {
            that.$message.error(`${res.msg ? res.msg : '请求失败'}`)
          } else {
            that.list = res.data.rows || []
          }
        })
      }
    },
    save() {},
    add() {
      this.addShow = true
    },
    del(row) {
      console.log(row)
      let params = {
          token: this.$token,
          comId: this.pos.comId,
          memberId: row.id,
          cabId: this.pos.cabId
        },
        that = this
      this.$confirm("确认删除该揽收员？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          that.$apis.cab.send.delMem(params).then(res => {
            if (res.msg && res.code !== 10000) {
              that.$message.error(`${res.msg ? res.msg : '请求失败'}`)
            } else {
              that.$message.success('操作成功')
              that.loadList()
            }
          })
        }).catch(() => {});
    }
  },
}
</script>