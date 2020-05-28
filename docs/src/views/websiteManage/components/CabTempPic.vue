<template>
<div class="cab-pic-box">
  <div v-show="tmpModelStatus" class="tmp-model">
    <p class="tc ptb10">模版列表</p>
    <ul>
      <template v-for="(item,index) of tmpList">
        <li :key="item.id" @mouseover="showPhoto(item.id)" @mouseout="hiddenPhoto" @click="selectTmpClick(item)">
          <span>{{index + 1}}</span>
          <div class="tmp-box">
            <div>
              <span>柜机名称：</span>
              <span class="fs15">{{item.tempName}}</span>
            </div>
            <div>
              <span>柜体类型：</span>
              <span>{{item.isPrimary == "1" ? "主柜" : "副柜"}}</span>
            </div>
            <div>
              <span>总格口数：</span>
              <span>{{item.amount}}</span>
            </div>
            <div>
              <span>大格口数：</span>
              <span>{{item.largeAmount}}</span>
            </div>
            <div>
              <span>中格口数：</span>
              <span>{{item.mediumAmount}}</span>
            </div>
            <div>
              <span>小格口数：</span>
              <span>{{item.smallAmount}}</span>
            </div>
            <div>
              <span>微格口数：</span>
              <span>{{item.tinyAmount}}</span>
            </div>
            <div>
              <span>柜体规格描述：</span>
              <span>{{item.note}}</span>
            </div>
          </div>
        </li>
      </template>
    </ul>
  </div>
  <!-- 柜机模型弹窗 -->
  <div v-show="photoModelStatus" class="photo-model">
    <p class="tc ptb10">模版示意图</p>
    <div>
      <ul>
        <template v-for="(item, index) of photoList.left">
          <li :class="[item == 1 ? 'middle-height': item == 2 ? 'large-height' : item == -1 ? 'large-height' : '']" :key="index">
            <div v-if="item == -1">屏幕</div>
          </li>
        </template>
      </ul>
      <ul>
        <template v-for="(item, index) of photoList.right">
          <li :class="[item == 1 ? 'middle-height': item == 2 ? 'large-height': item == -1 ? 'large-height' : '']" :key="index">
            <div v-if="item == -1">屏幕</div>
          </li>
        </template>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'CabTempPic',
  data() {
    return {
      tmpList: [],
      photoList: {
        left: [],
        right: []
      },
      tempId: '',
      photoModelStatus: false
    }
  },
  props: {
    tmpModelStatus: {
      type: Boolean,
      default: false,
      required: true
    },
    resetId: {
      type: Number,
      default: null
    },
    selectedList: {
      type: Array,
      default () {
        return []
      },
      required: true
    }
  },
  created() {},
  mounted() {},
  watch: {
    tmpModelStatus(val) {
      if (val) {
        this.getList()
      }
    }
  },
  methods: {
    async getList() {
      // 获取模版列表
      let _result = await this.$apis.cab.template.tempList({
        token: this.$token,
        page: 1,
        limit: 1000
      })
      this.tmpList = _result.data.list
    },
    showPhoto(id) {
      // 显示柜机图
      let params = {
        token: this.$token,
        id: id
      };
      this.photoModelStatus = true
      if (id == this.tempId) {
        return
      }
      this.$apis.cab.template.tempDetail(params).then(res => {
        let list = res.data.templateVo.tempValue
        let leftList = list.slice(0, list.indexOf('|'))
        let rightList = list.slice(list.indexOf('|') + 1)
        leftList = leftList.split(',')
        rightList = rightList.split(',')
        this.photoList.left = leftList
        this.photoList.right = rightList
        this.tempId = id
        this.$forceUpdate()
      })
    },
    hiddenPhoto() {
      // 隐藏柜机图
      this.photoModelStatus = false
    },
    selectTmpClick(item) {
      // 选中模版
      item['types'] = item.isPrimary == 1 ? '主柜' : '副柜'
      if (this.resetId != null) {
        item['serial'] = this.resetId
        this.$emit('reset', item)
      } else {
        item['serial'] = this.selectedList.length + 1
        this.$emit('add', item)
      }
    }
  }
}
</script>
