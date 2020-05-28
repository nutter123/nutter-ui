<script>
import AreaSelect from "@/components/AreaSelect";
export default {
  name: "searchItem",
  render: function(createElement) {
    let result = this.init(this.value, createElement);
    return createElement.apply(this, result);
  },
  props: {
    value: {
      type: Array,
      required: true
    }
  },
  methods: {
    input(val) {
      this.itemValue = val;
      this.$emit("input", val);
    },
    getInput(val) {
      let self = this;
      return [
        "el-input",
        {
          attrs: {
            placeholder: `请输入${val[0]}`
          },
          props: {
            size: "small",
            clearable: true,
            value: self.itemValue
          },
          on: {
            input: self.input
          }
        }
      ];
    },
    getSelect(val, createElement) {
      let self = this;
      let optionArr = val[3].map(i => {
        return createElement("el-option", {
          attrs: {
            label: Object.keys(i)[0],
            value: Object.values(i)[0]
          }
        });
      });
      return [
        "el-select",
        {
          attrs: {
            placeholder: `请选择${val[0]}`
          },
          props: {
            size: "small",
            clearable: true,
            value: self.itemValue
          },
          on: {
            input: self.input
          }
        },
        optionArr
      ];
    },
    getBoss(val, createElement) {
      let self = this;
      let optionArr = [];
      this.getBossList().then(res => {
        res.forEach(element => {
          optionArr.push(
            createElement("el-option", {
              attrs: {
                label: element.name + "(" + element.phone + ")",
                value: element.merchantId
              }
            })
          );
        });
      });
      return [
        "el-select",
        {
          attrs: {
            placeholder: `请选择${val[0]}`
          },
          props: {
            filterable: true,
            clearable: true,
            value: self.itemValue
          },
          on: {
            input: self.input
          }
        },
        optionArr
      ];
    },
    getGroup(val, createElement) {
      let self = this;
      let optionArr = [];
      this.getBossList().then(res => {
        res.forEach(element => {
          optionArr.push(
            createElement("el-option", {
              attrs: {
                label: element.name + "(" + element.phone + ")",
                value: element.merchantId
              }
            })
          );
        });
      });
      return [
        "el-select",
        {
          attrs: {
            placeholder: `请选择${val[0]}`
          },
          props: {
            size: "small",
            clearable: true,
            value: self.itemValue
          },
          on: {
            input: self.input
          }
        },
        optionArr
      ];
    },
    getBossList() {
      this.$apis.boss.bossList().then(res => {
        return new Promise(function(resolve, reject) {
          if (res.infoItems) {
            resolve(res.infoItems);
          } else {
            reject("获取失败");
          }
        });
      });
    },
    getGroupList() {
      this.$apis.cab.group.getOptionsList().then(res => {
        return new Promise(function(resolve, reject) {
          if (res.infoItems) {
            resolve(res.infoItems);
          } else {
            reject("获取失败");
          }
        });
      });
    },
    getArea() {
      let self = this;
      return [
        AreaSelect,
        {
          attrs: {},
          props: {
            value: self.itemValue
          },
          on: {
            change: self.input,
            input: self.input
          }
        }
      ];
    },
    init(itemInfo, createElement) {
      let result = [];
      switch (itemInfo[2]) {
        case 1:
          result = this.getInput(itemInfo);
          break;
        case 2:
          result = this.getSelect(itemInfo, createElement);
          break;
        case 5:
          result = this.getArea(itemInfo, createElement);
          break;
        case 6:
          result = this.getBoss(itemInfo, createElement);
          break;
        case 7:
          result = this.getGroup(itemInfo, createElement);
          break;
      }
      return result;
    }
  },
  data() {
    return {
      itemValue: ""
    };
  }
};
</script>

<style>
</style>