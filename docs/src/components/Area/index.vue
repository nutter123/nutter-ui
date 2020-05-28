<template>
  <el-cascader
    :options="list"
    :props="props"
    v-model="areaValue"
    class="w200"
    popper-class="regionCascader"
    size="small"
  />
</template>

<script>
import areaList from "@/assets/js/area";

export default {
  data() {
    return {
      areaList,
      list: [],
      props: {
        lazy: true,
        lazyLoad(node, resolve) {
          if (node.value) {
            let val = JSON.parse(node.value);
            setTimeout(() => {
              let nodes = [];
              if (val.provinceId) {
                Object.keys(areaList.city_list).forEach(function(key) {
                  if (val.provinceId.substr(0, 3) == key.substr(0, 3)) {
                    nodes.push({
                      value: JSON.stringify({
                        cityId: key,
                        cityName: areaList.city_list[key]
                      }),
                      name: areaList.city_list[key],
                      children: [],
                      leaf: false
                    });
                  }
                });
              } else if (val.cityId) {
                Object.keys(areaList.county_list).forEach(function(key) {
                  if (val.cityId.substr(0, 4) == key.substr(0, 4)) {
                    nodes.push({
                      value: JSON.stringify({
                        areaId: key,
                        areaName: areaList.county_list[key]
                      }),
                      name: areaList.county_list[key],
                      leaf: true
                    });
                  }
                });
              }
              resolve(nodes);
            }, 0);
          }
        },
        label: "name",
        value: "value",
        children: "children",
        leaf: "leaf",
        checkStrictly: true
      }
    };
  },
  props: {
    value: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    areaValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("change", val);
      }
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      let that = this;
      if (this.list.length == 0) {
        Object.keys(this.areaList.province_list).forEach(function(key) {
          that.list.push({
            value: JSON.stringify({
              provinceId: key,
              provinceName: that.areaList.province_list[key]
            }),
            name: that.areaList.province_list[key],
            children: []
          });
        });
      }
    }
  }
};
</script>

<style>
.regionCascader {
  z-index: 9999 !important;
}
</style>
