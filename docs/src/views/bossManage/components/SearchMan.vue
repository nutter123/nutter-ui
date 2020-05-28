<template>
<div>
  <el-dialog class="add-admin-dialog" :title="`设置${type == 1 ? '默认' : ''}揽收员`" :visible.sync="value" width="30%" :close-on-click-modal="false" append-to-body :before-close="cancel">
    <el-form class="info-form" ref="infoForm" :model="query" label-width="110px" :rules="rules">
      <el-form-item prop="search" class="no-label-form-content">
        <el-input size="small" type="text" v-model="query.search" placeholder="请输入快递员账号" clearable>
          <template slot="append">
            <el-button slot="append" type="default" @click="search">查询</el-button>
          </template>
        </el-input>
      </el-form-item>
      <div class="tc title">
        <p>快递员信息</p>
      </div>
      <el-form-item class="ml5" label="快递公司：" prop="comName">
        <p class="form-content-p">{{query.comName}}</p>
      </el-form-item>
      <el-form-item class="ml5" label="姓名：" prop="nickname">
        <p class="form-content-p">{{query.nickname}}</p>
      </el-form-item>
      <el-form-item class="ml5" label="注册手机号：" prop="phone">
        <p class="form-content-p">{{query.phone}}</p>
      </el-form-item>
      <el-form-item class="ml5" label="身份证号码：" prop="identiNo">
        <p class="form-content-p">{{query.identiNo}}</p>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog_footer">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="confirm">绑定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
export default {
  name: 'SearchMan',
  data() {
    return {
      query: {
        search: '',
        id: '',
        comName: '',
        name: '',
        phone: '',
        idCardNo: ''
      },
      rules: {
        search: [{
          required: true,
          message: '请输入快递员账号',
          trigger: 'blur'
        }]
      }
    }
  },
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
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
    value: {
      type: Boolean,
      default: false
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
  created() {},
  mounted() {},
  methods: {
    cancel() {
      this.reset()
      this.$emit("cancel");
    },
    confirm() {
      let arr = []
      arr = this.list.filter(i => {
        return i.id === this.query.id
      })
      if (arr.length > 0) {
        this.$message.warning('该快递员已存在揽收员列表，无须重复设置')
      } else {
        this.save()
      }
    },
    save() {
      let params = {
          token: this.$token,
          merchantId: this.type == 1 ? this.merchantId : null,
          comId: this.pos.comId,
          memberId: this.query.id,
          cabId: this.type == 1 ? null : this.pos.cabId
        },
        that = this
      console.log(params)
      if (this.type == 1) {
        // 默认
        this.$apis.cab.send.merchantMemSet(params).then(res => {
          if (res.msg && res.code !== 10000) {
            that.$message.error(`${res.msg ? res.msg : '请求失败'}`)
          } else {
            that.$message.success('操作成功')
            that.cancel()
            that.$emit('save')
          }
        })
      } else {
        // 柜机
        this.$apis.cab.send.cabinetMemSet(params).then(res => {
          if (res.msg && res.code !== 10000) {
            that.$message.error(`${res.msg ? res.msg : '请求失败'}`)
          } else {
            that.$message.success('操作成功')
            that.cancel()
            that.$emit('save')
          }
        })
      }
    },
    reset() {
      this.$refs.infoForm.resetFields()
    },
    search() {
      this.$refs.infoForm.validate(valid => {
        if (valid) {
          let params = {
              token: this.$token,
              comId: this.pos.comId,
              phone: this.query.search
            }
          this.$apis.cab.send.memberInfo(params).then(res => {
            if (res.msg && res.code !== 10000) {
              this.$message.error(`${res.msg ? res.msg : '请求失败'}`)
            } else {
              this.query = Object.assign(this.query, res)
            }
          })
        }
      })
    }
  },
}
</script>