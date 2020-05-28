const detailAction = {
  methods: {
    modifyCabInfo(row) {
      // 打开柜机信息
      this.cabInfo = Object.assign({
        cabinet: this.originalData[row.cabGroupNo - 1],
        ...row
      })
      console.log(this.cabInfo)
      this.cabInfoShow = true
    },
    changeCabInfo(data) {
      // 修改柜机信息
      this.cabInfo[data.name] = data.value
      this.cabInfo = Object.assign({}, this.cabInfo)
    },
    showPreview() {
      // 打开格口预览
      this.previewShow = true
      if (this.$refs.cabBigPreview) {
        this.$refs.cabBigPreview.carouselToPage();
      }
    },
    closePreview(done) {
      // 关闭格口预览
      done()
      this.previewShow = false
    },
    updateChoose(data) {
      // 格口选中数据回调
      console.log(data)
      this.chooseBoxCode = data
    },
    closeAddAdmin() {
      // 关闭新增管理员弹窗
      this.addAdmin = false
    },
    closeAddFreeMember() {
      // 关闭新增免费快递员弹窗
      this.addFreeMember = false
    },
    closeAddReserveMember() {
      // 关闭新增预留弹窗
      this.addReserveMember = false
    },
    closeAddReject() {
      // 关闭新增拒收弹窗
      this.addReject = false
    },
    getOverdue() {
      // 查询逾期设置
      let params = {
        token: this.$token,
        cabId: this.detailData.id
      }
      this.$apis.cab.overdue.getOverdue(params).then(res => {
        if (res.msg && res.code !== 10000) {
          this.$message.error(`${res.msg ? res.msg : '请求失败'}`)
        } else {
          this.overdueInfo = res.data.overdue
        }
      })
    },
    setOverdue() {
      // 逾期设置
      this.$refs.overdueInfo.validate(valid => {
        if (valid) {
          let params = {
            token: this.$token,
            cabId: this.detailData.id,
            overdueOn: this.overdueInfo.overdueOn,
            overdueVal: this.overdueInfo.overdueVal
          }
          this.$apis.cab.overdue.setOverdue(params).then(res => {
            if (res.msg && res.code !== 10000) {
              this.$message.error(`${res.msg ? res.msg : '请求失败'}`)
            } else {
              this.$notify({
                title: "成功",
                message: "设置成功",
                type: "success"
              })
              this.getOverdue()
            }
          })
        }
      })
    },
    getSmsList() {
      let params = {
        pageNum: 1,
        pageSize: 50,
        cabinetId: this.detailData.id
      }
      this.$apis.cab.sms.getList(params).then(res => {
        this.smsModelList = res.infoItems;
      })
    },
    getSmsById() {
      let id = this.detailData.id;
      this.$apis.cab.sms.getSmsById(id).then(res => {
        let info = res.infoItems;
        if (info.length == 0 || info[0].templateName == '') {
          this.smsInfo = {
            smsVal: this.smsModelList[0].smsTemplateId,
            smsText: this.smsModelList[0].example
          };
        } else {
          this.smsInfo = {
            smsVal: info[0].smsTemplateId,
            smsText: info[0].example
          };
        }
      })
    },
    smsInfoChange(val) {
      let id = val,
        that = this;
      if (id == '') {
        this.smsInfo.smsText = '';
        return;
      }
      this.smsModelList.forEach(i => {
        if (i.smsTemplateId == id) {
          that.smsInfo.smsText = i.example;
          that.smsInfo.templateType = i.templateType;
        }
      })
    },
    setSms() {
      let params = {
        token: this.$token,
        cabinetId: this.detailData.id,
        templateType: this.smsInfo.templateType || 1,
        smsTemplateId: this.smsInfo.smsVal
      };
      this.$apis.cab.sms.bindSms(params).then(() => {
        this.$notify({
          title: "成功",
          message: "设置成功",
          type: "success"
        });
        this.getSmsById();
      })
    },
    restart() {
      // 远程重启
      this.$confirm("确定远程重启吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let params = {
          token: this.$token,
          id: this.detailData.id
        }
        this.$apis.cab.cabinet.restart(params).then(res => {
          if (res.msg && res.code !== 10000) {
            this.$message.error(`${res.msg ? res.msg : '请求失败'}`)
          } else {
            this.$notify({
              title: "成功",
              message: "重启成功",
              type: "success"
            })
          }
        })
      }).catch((e) => {
        console.error(e)
      })
    },
    upgrade() {
      // APK更新
      this.$refs.versionInfo.validate(valid => {
        if (valid) {
          let params = {
            token: this.$token,
            id: this.detailData.id,
            version: this.versionInfo.version
          }
          this.$apis.cab.cabinet.upgrade(params).then(res => {
            if (res.msg && res.code !== 10000) {
              this.$message.error(`${res.msg ? res.msg : '请求失败'}`)
            } else {
              this.$notify({
                title: "成功",
                message: "版本更新成功",
                type: "success"
              })
            }
          })
        }
      })
    }
  }
}

export default detailAction
