<!--
 * @Descripttion: 
 * @version: 
 * @Author: nut
 * @Date: 2019-09-03 11:08:27
 * @LastEditors  : nut
 * @LastEditTime : 2020-01-20 10:08:42
 -->
<template>
  <div>
    <el-table :data="cabinetData" max-height="240" border class="mtb20">
      <el-table-column prop="cabGroupNo" label="序号" width="50"></el-table-column>
      <el-table-column prop label="柜机类型" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.isPrimary?'主柜':'副柜'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="cabModel" label="柜体型号编号" show-overflow-tooltip width="120"></el-table-column>
      <el-table-column prop="cabDesc" label="柜体规格描述" show-overflow-tooltip></el-table-column>
      <el-table-column prop="set" label="操作" width="60">
        <template slot-scope="scope">
          <span class="text-link" @click="modCabInfoClick(scope.row)">修改</span>
        </template>
      </el-table-column>
    </el-table>

    <el-table :data="statsData" border>
      <el-table-column prop="count" label="总格口数"></el-table-column>
      <el-table-column prop="lCount" label="大格口数"></el-table-column>
      <el-table-column prop="mCount" label="中格口数"></el-table-column>
      <el-table-column prop="sCount" label="小格口数"></el-table-column>
      <el-table-column prop="tCount" label="微格口数"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "CabInfoTable",
  data() {
    return {};
  },
  props: {
    cabinetData: {
      type: Array,
      default() {
        return [];
      }
    },
    statsData: {
      type: Array,
      default() {
        return [];
      }
    },
    disable: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    modCabInfoClick(row) {
      if(this.disable){
        this.$message.error('该柜机已撤柜,禁止操作!')
        return;
      }
      this.$emit("modify-cab-info", row);
    }
  }
};
</script>
