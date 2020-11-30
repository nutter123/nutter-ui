<!--
 * @Author: nutter
 * @Date: 2020-11-19 14:28:37
 * @LastEditors: nutter
 * @LastEditTime: 2020-11-25 09:56:27
 * @FilePath: \nutter-ui\test\src\views\TemplateManage\components\cabTemplate.vue
-->
<template>
  <div>
    <div class="template-container">
      <div class="template-info">
        <div class="template-info-container">
          <div class="n-label pl-20 mtb-10">格口{{ infoForm.name }}</div>
          <el-form
            ref="infoForm"
            :model="infoForm"
            label-position="top"
            :inline="true"
          >
            <el-form-item label="类型" prop="type">
              <el-select
                v-model="infoForm.type"
                clearable
                filterable
                placeholder="请选择类型"
              >
                <el-option
                  v-for="item in boxOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="锁驱动板号" prop="lockDrivePlatesNo">
              <el-select
                :disabled="disabled"
                v-model="infoForm['lockDrivePlatesNo']"
                placeholder="请选择锁驱动板号"
              >
                <el-option
                  v-for="(item, index) in lockNum"
                  :key="index"
                  :label="`锁驱动板${index + 1}`"
                  :value="index + 1"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="锁驱动板口" prop="lockDrivePlatesPortNo">
              <el-input
                :disabled="disabled"
                v-model="infoForm['lockDrivePlatesPortNo']"
                type="number"
                clearable
                placeholder="请输入锁驱动板口"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                class="mt-20"
                @click="handleEditGridInfo"
                >修改</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="template-cabinet">
        <div class="template-cabinet-title">{{ name }}</div>
        <div class="template-cabinet-box">
          <div
            v-for="(col, colIdx) in cabBoxList"
            :key="colIdx"
            class="template-box-column"
            :class="colIdx % 2 == 0 ? 'template-box-column_divider' : ''"
          >
            <div class="template-box-row_title">{{ colIdx }}列</div>
            <div
              class="template-box-grid"
              :class="gridStyle[box['type']]"
              v-for="(box, boxIdx) in col['box']"
              :key="boxIdx"
              @click="handleEditGrid(box, colIdx, boxIdx)"
            >
              <span v-if="box['type'] != '9'">{{
                +colIdx + 1 + "-" + (+boxIdx + 1)
              }}</span>
              <el-image
                v-else
                :src="screenImg"
                class="flex-1"
                fit="fit"
              ></el-image>
            </div>
          </div>
        </div>
      </div>
      <div class="template-info">
        <div class="template-info-container">
          <div class="n-label pl-20 mtb-10">柜机结构图</div>
          <el-tree
            :data="data"
            node-key="id"
            class="template-tree"
            default-expand-all
            :expand-on-click-node="false"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>
                <el-button type="text" size="mini" @click="() => append(data)">
                  添加
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  @click="() => remove(node, data)"
                >
                  删除
                </el-button>
              </span>
            </span>
          </el-tree>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import screenImg from "@/assets/screen.png";
export default {
  name: "cab-template",
  data() {
    const data = [
      {
        id: 1,
        label: "一级 1",
        children: [
          {
            id: 4,
            label: "二级 1-1",
            children: [
              {
                id: 9,
                label: "三级 1-1-1",
              },
              {
                id: 10,
                label: "三级 1-1-2",
              },
            ],
          },
        ],
      },
      {
        id: 2,
        label: "一级 2",
        children: [
          {
            id: 5,
            label: "二级 2-1",
          },
          {
            id: 6,
            label: "二级 2-2",
          },
        ],
      },
      {
        id: 3,
        label: "一级 3",
        children: [
          {
            id: 7,
            label: "二级 3-1",
          },
          {
            id: 8,
            label: "二级 3-2",
          },
        ],
      },
    ];
    return {
      screenImg,
      infoForm: {
        type: "0",
      },
      disabled: false,
      data: JSON.parse(JSON.stringify(data)),
      gridStyle: {
        3: "grid-mini",
        0: "grid-small",
        1: "grid-medium",
        2: "grid-large",
        9: "grid-screen",
        8: "grid-null",
      },
      boxOptions: [
        {
          value: "3",
          label: "微",
        },
        {
          value: "0",
          label: "小",
        },
        {
          value: "1",
          label: "中",
        },
        {
          value: "2",
          label: "大",
        },
        {
          value: "9",
          label: "屏幕",
        },
        {
          value: "8",
          label: "空",
        },
      ],
    };
  },
  props: {
    name: {
      type: String,
      default() {
        return "柜机模版";
      },
    },
    lockNum: {
      type: Number,
      default() {
        return 0;
      },
    },
    list: {
      type: Array,
      default() {
        return [];
      },
      required: true,
    },
  },
  computed: {
    cabBoxList: {
      get() {
        if (this.list && this.list.length > 0) {
          for (let i = 0; i < this.list.length; i++) {
            let sereen = "";
            for (let j = 0; j < this.list[i].length; j++) {
              if (this.list[i][j].type === "9") {
                sereen = j;
              }
              if (sereen && j > sereen) {
                this.list[i][j]["sindex"] = j;
              }
            }
          }
        }
        return this.list;
      },
      set(val) {
        console.log(val);
      },
    },
  },
  methods: {
    handleEditGrid(info, col, row) {
      this.infoForm = {
        row: row,
        col: col,
        name: +col + 1 + "-" + (+row + 1),
        ...info,
      };
    },
    handleEditGridInfo() {
      let info = this.infoForm;
      let list = JSON.parse(JSON.stringify(this.list));
      list[info.col]["box"][info.row] = {
        type: info.type,
        lockDrivePlatesPortNo: info.lockDrivePlatesPortNo,
        lockDrivePlatesNo: info.lockDrivePlatesNo,
      };
      this.$emit("cabinetListChange", list);
    },
  },
};
</script>

<style lang="scss" scoped>
.template-container {
  display: inline-flex;
  height: auto;
  background: #f0f2f5;
}
.template-cabinet {
  width: 300px;
  height: 640px;
  background: #fff;
  border: 6px solid #585555;
  box-sizing: border-box;
  display: inline-block;
}
.template-cabinet-title {
  width: 100%;
  height: 40px;
  text-align: center;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  font-size: 16px;
  font-family: PingFang-SC-Regular;
  font-weight: bold;
  color: #606060;
  line-height: 40px;
}
.template-cabinet-box {
  width: 100%;
  height: 588px;
  background: #f4f4f4;
  display: flex;
  flex-direction: row;
}
.template-box-column {
  flex: 1;
  height: 100%;
  box-sizing: border-box;
  border-top: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-right: 1px solid #585555;
}
.template-box-column_divider {
  border-right: 20px solid #585555;
}
.template-box-row_title {
  display: none;
}
.template-box-grid {
  width: 100%;
  flex: 1;
  display: flex;
  border-top: 1px solid #585555;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  color: #606060;
  background-color: #fff;
  cursor: pointer;
}
.grid-mini {
  flex: 1;
}
.grid-small {
  flex: 1;
}
.grid-medium {
  flex: 2;
}
.grid-large {
  flex: 4;
}
.grid-screen {
  flex: 3;
}
.grid-null {
  flex: 1;
}
.template-info {
  display: inline-block;
  width: 300px;
  height: 640px;
}
.template-info-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.template-tree{
  background: #f0f2f5;
}
</style>