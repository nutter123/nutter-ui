const boxAction = {
  data() {
    return {
      messageBox: ''
    }
  },
  methods: {
    msgFun(tipText, type) {
      if (this.messageBox) {
        this.messageBox.close()
      }
      this.messageBox = this.$message[type](tipText)
    },
    confirmMethod(tipText, fun) {
      this.$confirm(tipText, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        fun.call(this)
      }).catch(() => {})
    },
    openMouth() {
      // 开选定格口
      if (!this.chooseBoxCode || this.chooseBoxCode == '') {
        this.msgFun('请选择格口', 'warning')
        return
      }
      let openOneFun = function () {
        let params = {
          token: this.$token,
          id: this.infoForm.id,
          boxCode: this.chooseBoxCode
        }
        this.$apis.cab.cabinet.openOne(params).then(res => {
          if (res.msg && res.code !== 10000) {
            this.$message.error(`${res.msg ? res.msg : '请求失败'}`)
          } else {
            this.$notify({
              title: '成功',
              message: '选定格口已打开',
              type: 'success'
            });
            this.getDetail()
          }
        })
      }
      this.confirmMethod('确定打开选择的格口吗?', openOneFun)
    },
    openAllMouth() {
      // 格口全开
      let openAllFun = function () {
        let params = {
          token: this.$token,
          id: this.detailData.id
        };
        this.$apis.cab.cabinet.openAll(params).then(res => {
          if (res.msg && res.code !== 10000) {
            this.$message.error(`${res.msg ? res.msg : '请求失败'}`)
          } else {
            this.$notify({
              title: '成功',
              message: '格口全开操作成功',
              type: 'success'
            });
          }
        })
      }
      this.confirmMethod(`您将要把位于 '${this.infoForm.cabAddress}' 名为 '${
          this.infoForm.cabName
        }' 的柜机格口全部打开，确定要继续吗？`, openAllFun)
    },
    lockMouth() {
      // 格口锁定
      if (!this.chooseBoxCode || this.chooseBoxCode == '') {
        this.msgFun('请选择格口', 'warning')
        return
      }
      let lockFun = function () {
        let params = {
          token: this.$token,
          id: this.detailData.id,
          boxCode: this.chooseBoxCode
        }
        this.$apis.cab.cabinet.locking(params).then(res => {
          if (res.msg && res.code !== 10000) {
            this.$message.error(`${res.msg ? res.msg : '请求失败'}`)
          } else {
            this.swiperData.forEach(group => {
              group.forEach(cab => {
                cab.list.forEach(col => {
                  col.forEach(box => {
                    if (box.selected) {
                      box.status = 'locked'
                      box.selected = false
                    }
                  })
                })
              })
            })
            this.$notify({
              title: '成功',
              message: '格口锁定成功',
              type: 'success'
            })
          }
        })
      }
      this.confirmMethod('确定锁定选择的格口吗?', lockFun)
    },
    unlockMouth() {
      // 格口解锁
      if (!this.chooseBoxCode || this.chooseBoxCode == '') {
        this.msgFun('请选择格口', 'warning')
        return
      }
      let unlockFun = function () {
        let params = {
          token: this.$token,
          id: this.detailData.id,
          boxCode: this.chooseBoxCode
        }
        this.$apis.cab.cabinet.unlock(params).then(res => {
          if (res.msg && res.code !== 10000) {
            this.$message.error(`${res.msg ? res.msg : '请求失败'}`)
          } else {
            this.swiperData.forEach(group => {
              group.forEach(cab => {
                cab.list.forEach(col => {
                  col.forEach(box => {
                    if (box.selected) {
                      box.status = 'noUsed'
                      box.selected = false
                    }
                  })
                })
              })
            })
            this.$notify({
              title: '成功',
              message: '解锁成功',
              type: 'success'
            })
          }
        })
      }
      this.confirmMethod('确定解锁选择的格口吗?', unlockFun)
    },
    repair() {
      // 格口修复
      if (!this.chooseBoxCode || this.chooseBoxCode == '') {
        this.msgFun('请选择格口', 'warning')
        return
      }
      let repairFun = function () {
        let params = {
          token: this.$token,
          id: this.detailData.id,
          boxCode: this.chooseBoxCode
        }
        this.$apis.cab.cabinet.restore(params).then(res => {
          if (res.msg && res.code !== 10000) {
            this.$message.error(`${res.msg ? res.msg : '请求失败'}`)
          } else {
            this.swiperData.forEach(group => {
              group.forEach(cab => {
                cab.list.forEach(col => {
                  col.forEach(box => {
                    if (box.selected) {
                      box.status = 'noUsed'
                      box.selected = false
                    }
                  })
                })
              })
            })
            this.$notify({
              title: '成功',
              message: '修复成功',
              type: 'success'
            })
          }
        })
      }
      this.confirmMethod('确定释放选择的格口吗?', repairFun)
    },
    record() {
      // 格口记录
      if (!this.chooseBoxCode || this.chooseBoxCode == '') {
        this.msgFun('请选择格口', 'warning')
        return
      }
      let boxCode = this.chooseBoxCode.split(",")
      if (boxCode.length === 1) {
        this.recordShow = true
      } else {
        this.msgFun('只能勾选一个格口进行查询', 'warning')
      }
    },
    setBoxMac() {
      //格口门码
      if (!this.chooseBoxCode || this.chooseBoxCode == '') {
        this.msgFun('请选择格口', 'warning')
        return
      }
      let boxCode = this.chooseBoxCode.split(",")
      if (boxCode.length === 1) {
        this.boxMacShow = true
      } else {
        this.msgFun('只能勾选一个格口进行操作', 'warning')
      }
    },
    closeBoxMac() {
      this.boxMacShow = false;
    },
    saveCabInfo() {
      // 保存柜机修改
      if (!this.cabInfo.cabModel || this.cabInfo.cabModel == '') {
        this.msgFun('请输入柜体型号编码', 'warning')
        return
      }
      if (!this.cabInfo.cabDesc || this.cabInfo.cabDesc == '') {
        this.msgFun('请输入设备序列号', 'warning')
        return
      }
      let params = {
        token: this.$token,
        id: this.detailData.id,
        cabModel: this.cabInfo.cabModel,
        cabDesc: this.cabInfo.cabDesc,
        cabGroupNo: this.cabInfo.cabGroupNo
      }
      this.$apis.cab.cabinet.update(params).then(res => {
        if (res.msg && res.code !== 10000) {
          this.$message.error(`${res.msg ? res.msg : '请求失败'}`)
        } else {
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success'
          })
          this.getDetail()
          this.cabInfoShow = false
        }
      })
    }
  }
}

export default boxAction
