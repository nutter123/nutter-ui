<template>
<div class="tc">
  <el-form size="small" inline label-width="110px">
    <el-form-item label="柜体型号编码：" prop="cabModel">
      <el-input placeholder="请输入柜体型号编码" v-model="cabModel" clearable size="small"></el-input>
    </el-form-item>
    <el-form-item label="设备序列号：" prop="cabDesc">
      <el-input placeholder="请输入设备序列号" v-model="cabDesc" clearable size="small"></el-input>
    </el-form-item>
  </el-form>
  <div class="tc">
    <single-cab :cabinet="cabInfo.cabinet" enterType="single" showType="whole"></single-cab>
  </div>
</div>
</template>

<script>
export default {
  name: 'CabInfo',
  data() {
    return {}
  },
  props: {
    cabInfo: {
      type: Object,
      default () {
        return {}
      },
      required: true
    }
  },
  components: {
    singleCab: () => import('./SingleCab')
  },
  computed: {
    cabModel: {
      get() {
        return this.cabInfo.cabModel
      },
      set(val) {
        this.$emit('change', {
          name: 'cabModel',
          value: val
        })
      }
    },
    cabDesc: {
      get() {
        return this.cabInfo.cabDesc
      },
      set(val) {
        this.$emit('change', {
          name: 'cabDesc',
          value: val
        })
      }
    }
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>
