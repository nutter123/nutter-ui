<template>
  <div
    class="cabinet-tmp"
    :class="cabBoxList.length > 2 ? 'cabinet-tmp-big' : ''"
    :style="
      enterType === 'single' && showType === 'whole'
        ? cabBoxList.length > 2
          ? 'width: 400px;height: 500px;'
          : 'width: 250px;height: 500px;'
        : ''
    "
  >
    <header
      v-if="cabinet.name"
      :style="showType === 'thumbnail' ? 'font-size: 14px;' : ''"
    >
      {{ cabinet.name }}号柜
    </header>
    <div
      class="col-num"
      :style="
        showType === 'thumbnail' ? 'font-size: 10px;border-top:none;' : ''
      "
      v-if="(enterType === 'group' || !cabinet.name) && cabBoxList.length > 0"
    >
      <div v-for="idxArrItem in cabinet.indexArr" :key="idxArrItem">
        {{ idxArrItem }}列
      </div>
    </div>
    <div
      class="cabinet-col"
      :class="
        !cabinet.name && cabBoxList.length > 0 ? 'no-name-cabinet-col' : ''
      "
    >
      <ul
        v-for="(col, colIdx) in cabBoxList"
        :key="colIdx"
        :class="showType === 'thumbnail' ? 'preview-small-box' : ''"
      >
        <template v-for="(box, boxIdx) in col">
          <li
            :key="boxIdx"
            class="cabinet-row"
            :style="{
              height:
                box.type === '1'
                  ? '12.1212%'
                  : box.type === '2' || box.type === '9'
                  ? '15.1515%'
                  : '',
              color: box.status != 'noUsed' ? '#fff' : '',
            }"
            @click="selectMouth(groupIdx, cabIdx, colIdx, boxIdx, box)"
            :class="[
              box.type === '9' ? 'screen' : '',
              box.status === 'locked'
                ? 'bk-y'
                : box.status === 'used'
                ? 'bk-b'
                : box.status === 'broken'
                ? 'bk-p'
                : '',
            ]"
          >
            <span v-if="box.type != '8' && box.type != '9'">{{
              box.sindex ? box.sindex : boxIdx + 1
            }}</span>
            <span v-if="box.type == '9'">屏幕</span>
            <label
              class="checked-box"
              v-if="
                enterType === 'group' &&
                showType === 'whole' &&
                box.selected &&
                box.type != '9'
              "
            >
              <i class="el-icon-upload-success el-icon-check"></i>
            </label>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "SingleCab",
  data() {
    return {};
  },
  props: {
    cabinet: {
      type: Object,
      default() {
        return {
          list: [],
          name: "",
          indexArr: [],
        };
      },
      required: true,
    },
    groupIdx: {
      type: Number,
      default: null,
    },
    cabIdx: {
      type: Number,
      default: null,
    },
    enterType: {
      type: String,
      default: "single",
      required: true,
    },
    showType: {
      type: String,
      default: "thumbnail",
      required: true,
    },
  },
  computed: {
    cabBoxList: {
      get() {
        if (this.cabinet.list && this.cabinet.list.length > 0) {
          for (let i = 0; i < this.cabinet.list.length; i++) {
            let sereen = "";
            for (let j = 0; j < this.cabinet.list[i].length; j++) {
              if (this.cabinet.list[i][j].type === "9") {
                sereen = j;
              }
              if (sereen && j > sereen) {
                this.cabinet.list[i][j]["sindex"] = j;
              }
            }
          }
        }
        return this.cabinet.list;
      },
      set(val) {
        console.log(val);
      },
    },
  },
  created() {},
  mounted() {},
  methods: {
    selectMouth(groupIdx, cabIdx, colIdx, boxIdx, box) {
      // 选择格口
      if (this.enterType === "group" && box.type != "9") {
        this.$emit("choose-box", {
          groupIdx: groupIdx,
          cabIdx: cabIdx,
          colIdx: colIdx,
          boxIdx: boxIdx,
          box: box,
        });
      }
    },
  },
};
</script>
