<template>
  <div class="main">
    <el-card shadow="never">
      <div slot="header" class="clearfix">
        <span>模版信息</span>
      </div>
      <div class="info-container">
        <n-info-text label="模板名称">{{ infoForm.name }}</n-info-text>
        <n-info-text label="柜机类型">{{
          checkType(infoForm.isPrimary)
        }}</n-info-text>
        <n-info-text label="状态">{{ checkStatus(infoForm.status) }}</n-info-text>
        <n-info-text label="设备型号版本">{{ infoForm.code }}</n-info-text>
        <n-info-text label="规格描述">{{ infoForm.note }}</n-info-text>
        <n-info-text label="锁驱动板数量">{{
          infoForm.lockDrivePlatesCount
        }}</n-info-text>
        <n-info-text label="总格口数">{{ infoForm.amount }}</n-info-text>
        <n-info-text label="大格口数">{{ infoForm.largeAmount }}</n-info-text>
        <n-info-text label="中格口数">{{ infoForm.mediumAmount }}</n-info-text>
        <n-info-text label="小格口数">{{ infoForm.smallAmount }}</n-info-text>
        <n-info-text label="柜机列数">{{ infoForm.columnCount }}</n-info-text>
        <n-info-text
          :label="`第${index + 1}列格口数`"
          v-for="(item, index) in boxItems"
          :key="index"
          >{{ index }}</n-info-text
        >
        <n-info-text label="理由" v-if="infoForm.status != 1">{{
          infoForm.disableReason
        }}</n-info-text>
      </div>
    </el-card>
    <el-card shadow="never" class="mt-20">
      <div slot="header" class="clearfix">
        <span>模板预览</span>
      </div>
      <div class="info-content text-center">
        <div class="cabinet-box-set">
          <p class="text-center fc-blue mb-10">锁控设置图</p>
          <box-set
            :list="boxItems"
            :rowNum="infoForm.columnCount"
            :lockNum="infoForm.lockDrivePlatesCount"
            :disabled="true"
            @change="changeBox"
          ></box-set>
        </div>
        <div class="cabinet-preview">
          <p class="text-center mb-10 fc-blue">实时预览</p>
          <div class="cabinet-tmp" v-if="boxItems.length > 0">
            <div class="cabBoxName">快递柜</div>
            <div class="col-num">
              <div v-for="(idxArrItem, index) in boxItems" :key="index">
                {{ index + 1 }}列
              </div>
            </div>
            <div
              class="cabinet-col"
              :class="boxItems.length > 0 ? 'no-name-cabinet-col' : ''"
            >
              <ul
                v-for="(col, colIdx) in boxItems"
                :key="colIdx"
                class="cabinet-column"
              >
                <template v-for="(box, boxIdx) in col['box']">
                  <li
                    :key="boxIdx"
                    class="cabinet-row"
                    :style="{
                      height:
                        box.type === '1'
                          ? '36px'
                          : box.type === '2' || box.type === '9'
                          ? '48px'
                          : '',
                      color: box.status != 'noUsed' ? '#fff' : '',
                    }"
                    @click="selectMouth(groupIdx, cabIdx, colIdx, boxIdx, box)"
                    :class="[
                      box.status === 'locked'
                        ? 'cabBox-lock'
                        : box.status === 'used'
                        ? 'cabBox-use'
                        : box.status === 'broken'
                        ? 'cabBox-error'
                        : '',
                    ]"
                  >
                    <span v-if="box.type != '8' && box.type != '9'">{{
                      box.sindex ? box.sindex : boxIdx + 1
                    }}</span>
                    <div v-if="box.type == '9'" class="screen">屏幕</div>
                  </li>
                </template>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import BoxSet from "./boxSet";
export default {
  name: "NewWebsite",
  props: {
    info: {
      type: Object,
      default() {
        return {};
      },
      required: true,
    },
  },
  data() {
    return {
      rowNum: 0,
      boxItems: [],
      infoForm: {
        name: "",
        code: "",
        lockNum: 0,
        rowNum: 0,
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入模板名称",
            trigger: "blur",
          },
        ],
        code: [
          {
            required: true,
            message: "请输入设备型号版本",
            trigger: "blur",
          },
        ],
      },
    };
  },
  components: {
    singleCab: () => import("./SingleCab"),
    BoxSet,
  },
  computed: {
    lockNum() {
      return parseInt(this.infoForm.lockNum);
    },
    carouseNum() {
      return Math.ceil(this.rowNum / 2);
    },
  },
  created() {},
  mounted() {
    this.getInfo();
  },
  methods: {
    async getInfo() {
      let id = this.info.cabinetTemplateId;
      let result = await this.$apis.cab.templateN.getDetail(id);
      if (result) {
        this.$set(this, "infoForm", result);
        // this.infoForm = result;
        let column = [];
        result.boxItems.forEach((i) => {
          if (!column[i.column - 1]) {
            column[i.column - 1] = {
              box: [],
              num: 0,
            };
          }
          column[i.column - 1]["box"].push(i);
          column[i.column - 1]["num"] = column[i.column - 1]["num"] + 1;
        });
        this.boxItems = column;
      } else {
        this.$message({
          type: "error",
          message: "获取失败!",
        });
      }
    },
    checkType(type) {
      if (type == 1) {
        return "主柜";
      } else {
        return "副柜";
      }
    },
    checkStatus(status) {
      if (status == 1) {
        return "启用";
      } else {
        return "禁用";
      }
    },
    changeBox(val) {
      this.boxItems = val;
    },
    rowNumInput() {},
    boxNumInput() {},
  },
};
</script>
<style lang="scss" scoped>
.info-input .el-form-item {
  width: 100%;
}
.width-24 {
  width: 24%;
}
</style>>
