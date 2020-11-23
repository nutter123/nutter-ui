<template>
  <div
    class="cabinet-tmp-content cabinet-tmp box-set-list"
    :class="rowNum > 2 ? 'box-set-list-big' : ''"
  >
    <el-carousel indicator-position="none" :autoplay="false" v-if="rowNum > 0">
      <el-carousel-item
        v-for="(carouselItem, carouselIndex) in carouseNum"
        :key="carouselIndex"
        class="carousel-item"
      >
        <template v-for="(templateItem, templateIndex) in 2">
          <div
            class="template-card"
            :key="templateIndex"
            v-if="boxItems[templateIndex + carouselIndex * 2] && lockNum > 0"
          >
            <div class="col-num">
              <div>{{ templateIndex + 1 + carouselIndex * 2 }}列</div>
            </div>
            <div class="cabinet-col no-name-cabinet-col">
              <ul style="width: 100%">
                <div>
                  <template
                    v-for="(boxItem, boxIdx) in boxItems[
                      templateIndex + carouselIndex * 2
                    ]['box']"
                  >
                    <li class="cabinet-row" :key="boxIdx">
                      <div style="width: 50px">{{ boxIdx + 1 }}</div>
                      <el-select
                        size="small"
                        v-model="boxItem['type']"
                        placeholder="请选择类型"
                        :disabled="disabled"
                        @change="change"
                      >
                        <el-option
                          v-for="item in boxOptions"
                          :key="item.value"
                          :label="`${boxIdx + 1}：${item.label}`"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                      <el-select
                        size="small"
                        :disabled="disabled"
                        v-model="boxItem['lockDrivePlatesNo']"
                        placeholder="请选择锁驱动板号"
                        @change="change"
                      >
                        <el-option
                          v-for="(item, index) in lockNum"
                          :key="index"
                          :label="`锁驱动板${index + 1}`"
                          :value="index + 1"
                        ></el-option>
                      </el-select>
                      <el-input
                        size="small"
                        :disabled="disabled"
                        v-model="boxItem['lockDrivePlatesPortNo']"
                        type="number"
                        placeholder="请输入锁驱动板口"
                        @change="change"
                      ></el-input>
                    </li>
                  </template>
                </div>
              </ul>
            </div>
          </div>
        </template>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
      required: true,
    },
    rowNum: {
      type: Number,
      default() {
        return 0;
      },
      required: true,
    },
    lockNum: {
      type: Number,
      default() {
        return 0;
      },
      required: true,
    },
    disabled: {
      type: Boolean,
      default() {
        return false;
      },
      required: false,
    },
  },
  data() {
    return {
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
  computed: {
    carouseNum() {
      return Math.ceil(this.rowNum / 2);
    },
    boxItems() {
      return this.list;
    },
  },
  methods: {
    change() {
      this.$emit("change", this.boxItems);
    },
  },
};
</script>

<style lang="scss" scoped>
// .container-input {
//   display: flex;
//   flex-direction: column;
// }
.template-card {
  display: inline-block;
  width: 500px;
  height: auto;
}
.carousel-item {
  align-items: flex-start;
  display: flex;
  justify-content: space-around;
  overflow-y: auto;
}
.cabinet-tmp-content {
  min-width: 1100px;
  height: 100%;
  background: #f4f4f4;
  padding: 6px;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  display: inline-block;
  vertical-align: middle;
  margin: 0 auto;
}
</style>>