export default {
  data() {
      return {
          provinceList: [],
          cityList: []
      }
  },
  methods: {
      handlerProvinceChange(orgCode) {
          this.getCityList(orgCode)
      },
      getProvinceList() {
          this.$api.common.getProvinceList().then(data => {
              this.provinceList = data
          })
      },
      getCityList(orgCode) {
          this.$api.common.getCityList({ orgCode }).then(data => {
              this.cityList = data
          })
      }
  },
  created() {
      this.getProvinceList()

  }
}