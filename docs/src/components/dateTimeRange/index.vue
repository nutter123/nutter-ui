<template>
  <div style="display:inline-block;">
    <el-date-picker v-model="dateRange" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" size="mini" :picker-options="pickerOptions" :clearable="false" @change="chooseDate" :default-time="['00:00:00', '23:59:59']">
    </el-date-picker>
  </div>
</template>
<script>
import { getPassTimeArea, formatDate } from "@/utils/index";

export default {
  name: "dateTimeRange",
  data() {
    return {
      dateRange: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Number(new Date(formatDate(new Date(),'end')));
        }
      },
      query: {
        beginDate: null,
        endDate: null
      }
    };
  },
  props: {
    defaultDays: {
      type: Number,
      default: 1
    }
  },
  created() {
    this.initDateRange();
  },
  mounted() {},
  methods: {
    initDateRange() {
      this.query = Object.assign({}, getPassTimeArea(this.defaultDays));
      this.dateRange = [
        new Date(this.query.beginDate),
        new Date(this.query.endDate)
      ];
      this.$emit("dateChange", this.dateRange);
    },
    chooseDate(val) {
      console.log(val)
      this.$emit("dateChange", val);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>