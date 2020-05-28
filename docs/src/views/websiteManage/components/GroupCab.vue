<!--
 * @Descripttion: 
 * @version: 
 * @Author: nut
 * @Date: 2019-09-03 11:08:27
 * @LastEditors  : nut
 * @LastEditTime : 2020-01-20 10:35:58
 -->
<template>
  <div class="cabinet-list">
    <el-carousel
      indicator-position="outside"
      ref="carousel"
      :initial-index="index"
      @change="carouselChange"
      :autoplay="false"
    >
      <el-carousel-item v-for="(group, groupIdx) in swiperData" :key="groupIdx">
        <template v-for="(cabinet, cabIdx) in group">
          <single-cab
            :key="cabIdx"
            :cabinet="cabinet"
            :groupIdx="groupIdx"
            :cabIdx="cabIdx"
            enterType="group"
            :showType="showType"
            @choose-box="chooseBox"
          ></single-cab>
        </template>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "GroupCab",
  data() {
    return {
      initailIndex: 0
    };
  },
  props: {
    swiperData: {
      type: Array,
      default() {
        return [];
      },
      required: true
    },
    index: {
      type: Number,
      default() {
        return 0;
      }
    },
    showType: {
      type: String,
      default: "thumbnail",
      required: true
    }
  },
  components: {
    singleCab: () => import("./SingleCab")
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    carouselChange(index) {
      this.initailIndex = index;
      this.$emit("change", index);
    },
    carouselToPage() {
      let that = this;
      this.$refs.carousel.setActiveItem(that.index);
    },
    chooseBox(data) {
      // 选择格口
      if (this.showType !== "thumbnail") {
        this.$set(
          this.swiperData[data.groupIdx][data.cabIdx].list[data.colIdx][
            data.boxIdx
          ],
          "selected",
          !this.swiperData[data.groupIdx][data.cabIdx].list[data.colIdx][
            data.boxIdx
          ].selected
        );
        let selectBoxCodeArr = [];
        this.swiperData.map(group => {
          group.map(cab => {
            cab.list.map(col => {
              col.map(box => {
                if (box.selected) {
                  selectBoxCodeArr.push(box.boxCode);
                }
              });
            });
          });
        });
        let selectBoxCode =
          selectBoxCodeArr.length > 0 ? selectBoxCodeArr.join(",") : "";
        console.log(selectBoxCode);
        this.$emit("update-choose", selectBoxCode);
      }
    }
  }
};
</script>
