export default (formServer) => {
  return {
    data() {
      return {
        form: formServer.init.call(this),
      }
    },
    watch: {
      formServer() {
        console.log('++')
      }
    },
    mounted() {
      this.resetForm()
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
      validateForm() {
        return new Promise((resolve, reject) => {
          this.$refs['form'].validate((valid) => {
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
        this.form = formServer.init.call(this)
        this.$refs['form'].resetFields()
      }
    }
  }
}