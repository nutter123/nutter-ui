<template>
<el-cascader :options="list" @active-item-change="handleItemChange" @focus="init" :props="props" v-model="computedValue" style="width: 100%;" popper-class="regionCascader" />
</template>

<script>
import mixin from './mixin'
import {
  getProvinces,
  getCitys
} from '@/api/common.js'

export default {
  mixins: [mixin],
  created() {
    this.init();
  },
  methods: {
    listParent() {
      return getProvinces().then(data => {
        return data.map(v => {
          return {
            value: v.orgCode,
            label: v.orgName
          }
        })
      })
    },
    listChildren(val) {
      return getCitys(val).then(data => {
        return data.map(v => {
          return {
            value: v.orgCode,
            label: v.orgName
          }
        })
      })
    }
  }
}
</script>

<style>
.regionCascader {
  z-index: 9999 !important;
}
</style>
