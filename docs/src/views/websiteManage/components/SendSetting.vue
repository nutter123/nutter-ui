<template>
  <div class="brand" v-if="brandInfoList && brandInfoList.length > 0">
    <div>该柜机已开通如下品牌寄件</div>
    <div class="brand-list">
      <ul>
        <template v-for="(item,index) in brandInfoList">
          <li :key="index" class="brand-list-row">
            <div class="img-box">
              <img :src="picList[item.comId]" alt="暂无图片" />
            </div>
            <div>
              <span>{{item.comName}}</span>
            </div>
            <div class="col-item">
              <div>
                <span class="col-item-label">{{statusList[item.closeState]}}</span>
              </div>
            </div>
            <div>
              <el-button
                type="primary"
                size="mini"
                @click="openStatus(item, index)"
                v-if="item.closeState==1"
              >开通</el-button>
              <el-button type="danger" size="mini" @click="closeStatus(item, index)" v-else>关闭</el-button>
              <el-button type="primary" size="mini" @click="setPrice(item, index)">设置该网点价格表</el-button>
              <el-button type="primary" size="mini" @click="setMan(item, index)">设置该网点揽收员</el-button>
            </div>
          </li>
        </template>
      </ul>
    </div>
    <price-table
      v-if="priceShow"
      v-model="priceShow"
      :type="0"
      :pos="posDetail"
      :merchantId="cabInfo.bossId"
      @cancel="priceShow=false"
    ></price-table>
    <man-list
      v-if="manShow"
      v-model="manShow"
      :type="0"
      :pos="posDetail"
      :merchantId="cabInfo.bossId"
      @cancel="manShow=false"
    ></man-list>
  </div>
</template>

<script>
import model from "@/model";
import PriceTable from "@/views/BossManage/components/PriceTable";
import ManList from "@/views/BossManage/components/ManList";

export default {
  name: "WebsiteSendSetting",
  data() {
    return {
      brandInfoList: [],
      statusList: ["已开通", "已关闭"],
      picList: model.emsPicList(),
      priceShow: false,
      manShow: false,
      posDetail: {
        comId: 0,
        comName: ""
      }
    };
  },
  props: {
    cabId: {
      type: Number,
      default() {
        return 0;
      },
      required: true
    },
    cabInfo: {
      type: Object,
      default() {
        return {};
      },
      required: true
    }
  },
  components: {
    PriceTable,
    ManList
  },
  created() {
    this.loadList();
  },
  mounted() {},
  methods: {
    loadList() {
      // 品牌列表加载
      let params = {
          token: this.$token,
          cabId: this.cabId
        },
        that = this;
      this.$apis.cab.send.comList(params).then(res => {
        if (res != false) {
          that.brandInfoList = res.rows || [];
        }
      });
    },
    openStatus(item, index) {
      // 开通网点
      console.log(item, index);
      let params = {
          token: this.$token,
          cabId: this.cabInfo.id,
          comId: item.comId
        },
        that = this;
      this.$apis.cab.send.openSite(params).then(() => {
        that.loadList();
      });
    },
    closeStatus(item, index) {
      // 关闭网点
      console.log(item, index);
      let params = {
          token: this.$token,
          cabId: this.cabInfo.id,
          comId: item.comId
        },
        that = this;
      this.$apis.cab.send.closeSite(params).then(() => {
        that.loadList();
      });
    },
    setPrice(item, index) {
      // 设置价格
      console.log(item, index);
      this.posDetail = Object.assign({
        comId: item.comId,
        comName: item.comName,
        cabName: this.cabInfo.cabName,
        cabId: this.cabInfo.id
      });
      this.priceShow = true;
    },
    setMan(item, index) {
      // 设置揽收员
      console.log(item, index);
      this.posDetail = Object.assign({
        comId: item.comId,
        comName: item.comName,
        cabName: this.cabInfo.cabName,
        cabId: this.cabInfo.id
      });
      this.manShow = true;
    },
    afterSaveStatus() {}
  }
};
</script>

<style scoped>
.brand-list {
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
}

.brand-list-row {
  padding: 10px;
  margin: 10px 0;
  border-bottom: 1px solid rgba(228, 228, 228, 1);
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
}

.img-box {
  width: 40px;
  height: 40px;
}

.img-box img {
  width: 100%;
  height: 100%;
}

.col-item {
  color: #999999;
  font-size: 14px;
}

.col-item-label {
  color: #606060;
}
</style>
<style>
.el-button--primary {
  background-color: #3d7ac8;
  border-color: #3d7ac8;
}
</style>
