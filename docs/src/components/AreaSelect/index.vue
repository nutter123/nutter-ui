<template>
  <el-cascader
    ref="areaSelect"
    :options="list"
    :props="props"
    v-model="areaValue"
    :disabled="disable"
    clearable
    popper-class="regionCascader"
    size="small"
  />
</template>

<script>
export default {
  data() {
    var vue = this;
    return {
      list: [],
      props: {
        lazy: true,
        expandTrigger: "click",
        lazyLoad: async function(node, resolve) {
          if (node.level < vue.level && node.level > 0) {
            let list =
              node.level == 1
                ? await vue.$apis.cab.area.getCityList({
                    provinceId: node.value
                  })
                : await vue.$apis.cab.area.getAreaList({
                    cityId: node.value
                  });
            setTimeout(() => {
              let nodes = [];
              if (list.length !== 0) {
                nodes = vue.mapItem(list, node.level < vue.level - 1);
              }
              resolve(nodes);
            }, 0);
          } else {
            resolve(null);
          }
        },
        label: "areaName",
        value: "id",
        children: "children",
        leaf: "leaf",
        checkStrictly: vue.checkStatus
      }
    };
  },
  props: {
    value: {
      type: Array,
      default() {
        return [];
      }
    },
    level: {
      type: Number,
      default() {
        return 3;
      }
    },
    disable: {
      type: Boolean,
      default() {
        return false;
      }
    },
    checkStatus: {
      type: Boolean,
      default() {
        return true;
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
    this.initData();
  },
  mounted() {},
  methods: {
    async init() {
      let areaList = await this.$apis.cab.area.getProvinceList();
      let _opt = JSON.stringify(this.mapItem(areaList));
      this.list = JSON.parse(_opt);
    },
    async initData() {
      let areaIndex = [];
      let areaValue = this.areaValue;
      let provinceList = await this.getProvinceList();
      if (areaValue[0] && this.level > 1) {
        provinceList.some((i, index) => {
          if (i.id == areaValue[0]) {
            areaIndex[0] = index;
          }
        });
        let cityList = await this.getCityList(this.areaValue[0]);
        provinceList[areaIndex[0]].children = cityList;
      }
      if (areaValue[1] && this.level > 2) {
        provinceList[areaIndex[0]].children.some((i, index) => {
          if (i.id == areaValue[1]) {
            areaIndex[1] = index;
          }
        });
        let areaList = await this.getAreaList(this.areaValue[1]);
        provinceList[areaIndex[0]].children[areaIndex[1]].children = areaList;
      }
      console.log(areaIndex);
      this.list = provinceList;
    },
    async getProvinceList() {
      let list = await this.$apis.cab.area.getProvinceList();
      let _opt = JSON.stringify(this.mapItem(list, this.level > 1));
      return JSON.parse(_opt);
    },
    async getCityList(id) {
      let list = await this.$apis.cab.area.getCityList({
        provinceId: id
      });
      let _opt = JSON.stringify(this.mapItem(list, this.level > 2));
      return JSON.parse(_opt);
    },
    async getAreaList(id) {
      let list = await this.$apis.cab.area.getAreaList({
        cityId: id
      });
      let _opt = JSON.stringify(this.mapItem(list, this.level > 3));
      return JSON.parse(_opt);
    },
    mapItem(res, addChildren = true) {
      return res.map(item => {
        let _item = {
          id: item.areaId,
          areaName: item.areaName,
          ...item
        };
        if (!addChildren) {
          return {
            leaf: true,
            ..._item
          };
        } else {
          return {
            children: [],
            ..._item
          };
        }
      });
    }
  }
};
</script>

<style>
.regionCascader {
  z-index: 9999 !important;
}
</style>
