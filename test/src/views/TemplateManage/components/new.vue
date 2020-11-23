<template>
  <div class="main bg-white">
    <el-form
      ref="infoForm"
      :model="addForm"
      :rules="rules"
      label-width="130px"
      class="info-form pb-60"
      inline
    >
      <div class="n-label mtb-20 pl-20">模版信息</div>
      <el-form-item label="模板名称：" prop="name">
        <el-input
          size="small"
          v-model="addForm.name"
          placeholder="请输入模板名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="设备型号版本：" prop="code">
        <el-input
          size="small"
          v-model="addForm.code"
          placeholder="请输入设备型号版本"
        ></el-input>
      </el-form-item>
      <el-form-item label="锁驱动板数量：" prop="lockNum">
        <el-input
          size="small"
          v-model="addForm.lockNum"
          placeholder="请输入锁驱动板数量"
        ></el-input>
      </el-form-item>
      <el-form-item label="柜机列数：" prop="rowNum">
        <el-input
          size="small"
          v-model="addForm.rowNum"
          @input="rowNumInput"
          type="number"
          placeholder="请输入柜机列数"
        ></el-input>
      </el-form-item>
      <el-form-item
        :label="`第${index + 1}列格口数：`"
        prop="boxNum"
        v-for="(item, index) in boxItems"
        :key="index"
      >
        <el-input
          size="small"
          type="number"
          v-model="boxItems[index].num"
          @input="
            (val) => {
              boxNumInput(val, index);
            }
          "
          :placeholder="`请输入设备第${index + 1}列格口数`"
        ></el-input>
      </el-form-item>
      <n-divider></n-divider>
      <div class="n-label mtb-20 pl-20">模版设置</div>
      <div class="info-content text-center">
        <cab-template
          :list="cabinetList"
          :lockNum="lockNum"
          @cabinetListChange="cabinetListChange"
        ></cab-template>
        <div class="cabinet-box-set">
          <p class="text-center fc-blue mb-10">格口设置</p>
          <box-set
            :list="boxItems"
            :rowNum="rowNum"
            :lockNum="lockNum"
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
    </el-form>
    <div class="dialog-button_foot">
      <el-button size="small" @click="resetForm">重置</el-button>
      <el-button size="small" type="primary" @click="submitForm"
        >保存</el-button
      >
    </div>
  </div>
</template>

<script>
import BoxSet from "./boxSet";
import CabTemplate from "./cabTemplate";
export default {
  name: "NewWebsite",
  props: {},
  data() {
    return {
      rowNum: 0,
      carouselList: [],
      boxItems: [],
      addForm: {
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
    CabTemplate,
  },
  computed: {
    lockNum() {
      return parseInt(this.addForm.lockNum);
    },
    carouseNum() {
      return Math.ceil(this.rowNum / 2);
    },
    cabinetList() {
      return this.boxItems;
    },
  },
  created() {},
  mounted() {},
  methods: {
    changeBox(val) {
      this.boxItems = val;
    },
    rowNumInput(value) {
      if (value <= 10) {
        let boxArr = [];
        this.rowNum = parseInt(value);
        for (let i = 0; i < parseInt(value); i++) {
          boxArr.push({
            num: 0,
          });
        }
        this.boxItems = boxArr;
      } else {
        this.addForm.rowNum = 10;
        this.rowNum = 10;
        let boxArr = [];
        for (let i = 0; i < 10; i++) {
          boxArr.push({
            num: 0,
          });
        }
        this.boxItems = boxArr;
      }
    },
    boxNumInput(value, index) {
      if (value <= 20) {
        let boxArr = [];
        // this.boxItems[index]["num"] = parseInt(value);
        for (let i = 0; i < parseInt(value); i++) {
          boxArr.push({
            type: "",
            lockDrivePlatesPortNo: "",
            lockDrivePlatesNo: "",
          });
        }
        this.$set(this.boxItems[index], "box", boxArr);
        // this.boxItems[index]["box"] = boxArr;
      } else {
        let boxArr = [];
        // this.boxItems[index]["num"] = parseInt(20);
        for (let i = 0; i < 20; i++) {
          boxArr.push({
            type: "1",
            lockDrivePlatesPortNo: "",
            lockDrivePlatesNo: "",
          });
        }
        this.boxItems[index]["box"] = boxArr;
      }
    },
    cabinetListChange(list) {
      this.boxItems = list;
    },
    resetForm() {
      // 重置表单
      this.$refs.infoForm.resetFields();
      this.boxItems = [];
    },
    submitForm() {
      // 提交表单
      this.$refs.infoForm.validate((valid) => {
        let boxList = [];
        this.boxItems.forEach((col, colIndex) => {
          col.box.forEach((box, boxIndex) => {
            boxList.push({
              column: colIndex + 1,
              lockDrivePlatesNo: box.lockDrivePlatesNo,
              lockDrivePlatesPortNo: box.lockDrivePlatesPortNo,
              row: boxIndex + 1,
              type: box.type,
            });
          });
        });
        if (valid) {
          let params = {
            boxItems: boxList,
            code: this.addForm.code,
            name: this.addForm.name,
          };
          this.$apis.cab.templateN.add(params).then((res) => {
            if (res.msg && res.code !== 10000) {
              this.$message.error(`${res.msg ? res.msg : "请求失败"}`);
            } else {
              this.$notify({
                title: "成功",
                message: "创建成功",
                type: "success",
              });
              this.$emit("after-save");
            }
          });
        } else {
          this.$message.error("请将数据填写完整");
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>>
