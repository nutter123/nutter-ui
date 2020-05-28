<template>
  <div style="display:inline-block;">
    <el-button type="primary" v-if="type=='button'" :size="size">导出</el-button>
    <i class="el-icon-download pointer" v-if="type=='icon'"></i>
  </div>
</template>

<script>
import { downloadFile, getOrpost } from "./exportMethods";
import moment from "moment";
export default {
  props: {
    exportQuery: {
      type: Object,
      default() {
        return {
          query: {},
          url: "",
          fileName: "",
          total: null
        };
      },
      required: true
    },
    size: {
      type: String,
      default: "mini"
    },
    type: {
      type: String,
      default: "button"
    },
    method: {
      type: String,
      default: "get"
    },
    respType: {
      type: String,
      default: "blob"
    }
  },
  watch: {
    exportQuery() {
      this.exportOrder();
    }
  },
  methods: {
    exportOrder() {
      let _vm = this;
      let params = Object.assign({}, _vm.exportQuery.query);
      let nowTime = moment().format("YYYYMMDDHHmmss");
      params.page_num = 1;
      if (_vm.exportQuery.total > 500) {
        _vm
          .$confirm("当前数目大于500条，将仅导出前500条", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            params.page_size = 500;
            getOrpost(
              params,
              _vm.exportQuery.url,
              _vm.method,
              _vm.respType
            ).then(res => {
              downloadFile(
                res,
                nowTime + _vm.exportQuery.fileName,
                _vm.respType
              );
            });
          })
          .catch(() => {
            _vm.$message({
              type: "info",
              message: "已取消"
            });
          });
      } else {
        params.page_size = _vm.exportQuery.total;
        getOrpost(params, _vm.exportQuery.url, _vm.method, _vm.respType).then(
          res => {
            downloadFile(res, nowTime + _vm.exportQuery.fileName, _vm.respType);
          }
        );
      }
    }
  }
};
</script>
