export default (formServer) => {
  return {
    data() {
      return {
        form: this.cloneObjectKeys(this.formData)
      }
    },
    watch: {
      formData() {
        this.form = this.cloneObjectKeys(this.formData)
      }
    },
    mounted() {
      this.initForm()
    },
    computed: {
      rules() {
        return formServer.rules
      }
    },
    methods: {
      resetForm() {
        if (this.$refs['form']) {
          this.$refs['form'].resetFields()
        }
      },
      validateForm(formName = 'form') {
        return new Promise((resolve, reject) => {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              resolve()
            } else {
              return reject()
            }
          })
        })
      },
      validateOne(propName) {
        return new Promise((resolve, reject) => {
          this.$refs['form'].validateField(propName, (err) => {
            if (err) {
              reject(err)
            } else {
              return resolve()
            }
          })
        })
      },
      initForm() {
        if (this.$refs['form']) {
          this.$refs['form'].resetFields()
        }
      },
      cloneObjectKeys(data) {
        const tmp = {}
        if (data) {
          const keys = Object.keys(data)
          if (keys.length) {
            keys.forEach(key => {
              if (key === 'office_phone' && data[key]) {
                const phoneFilter = data[key].split('-')
                tmp.office_phoneFront = phoneFilter[0]
                tmp.office_phoneEnd = phoneFilter[1]
                return
              }
              tmp[key] = data[key]
            })
          }
        }
        return tmp
      }
    }
  }
}