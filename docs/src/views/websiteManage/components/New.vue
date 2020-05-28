<template>
  <div class="main" @click.stop="closeModal">
    <div class="pb80">
      <el-form
        inline
        ref="infoForm"
        :model="addForm"
        :rules="rules"
        label-width="110px"
        class="info-form"
      >
        <header>
          <p class="w100 vm">基本信息</p>
        </header>
        <div class="container-input">
          <el-form-item label="网点编号：" prop="cabSysId">
            <el-input size="small" v-model="addForm.cabSysId" placeholder="请输入网点编号"></el-input>
          </el-form-item>
          <el-form-item label="签收手机号：" prop="signPhone">
            <el-input size="small" v-model="addForm.signPhone" placeholder="请输入签收手机号"></el-input>
          </el-form-item>
          <el-form-item label="网点名称：" prop="cabName">
            <el-input size="small" v-model="addForm.cabName" placeholder="请输入网点名称"></el-input>
          </el-form-item>
          <el-form-item prop="merchantId" label="老板：">
            <el-select
              class="w180"
              v-model="addForm.merchantId"
              size="small"
              clearable
              filterable
              placeholder="请选择老板"
            >
              <el-option
                :label="item.name+'('+item.phone+')'"
                :value="item.merchantId"
                v-for="item in bossList"
                :key="item.merchantId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="operationGroupId" label="运营组：">
            <el-select
              class="w180"
              v-model="addForm.operationGroupId"
              clearable
              size="small"
              filterable
              placeholder="请选择运营组名称"
            >
              <el-option
                :label="item.name"
                :value="item.operationGroupId"
                v-for="item in groupList"
                :key="item.operationGroupId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="运营手机号：" prop="operationPhone">
            <el-input size="small" v-model="addForm.operationPhone" placeholder="请输入运营手机号"></el-input>
          </el-form-item>
        </div>
        <header>
          <p class="w100 vm">硬件参数配置</p>
        </header>
        <div class="container-input">
          <el-form-item label="主机硬件ID：" prop="machineCode">
            <el-input size="small" v-model="addForm.machineCode" placeholder="请输入主机硬件ID"></el-input>
          </el-form-item>
          <el-form-item prop="lockConfigValue" label="锁控型号：">
            <el-select
              class="w180"
              v-model="addForm.lockConfigValue"
              clearable
              size="small"
              filterable
              placeholder="请选择锁控型号"
            >
              <el-option label="新锁" value="1"></el-option>
              <el-option label="旧锁" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="screen" label="屏幕设置：">
            <el-select
              class="w180"
              v-model="addForm.screen"
              clearable
              size="small"
              filterable
              placeholder="请选择屏幕类型"
            >
              <el-option
                :label="item.desc"
                :value="item.value"
                v-for="(item,index) in screenList"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <header>
          <p class="w100 vm">地理位置信息</p>
        </header>
        <div class="container-input">
          <el-form-item prop="areaArr" label="城市：">
            <area-select v-model="addForm.areaArr" :checkStatus="false" @change="areaChange"></area-select>
          </el-form-item>
          <el-form-item label="详细地址：" prop="cabAddress">
            <el-input size="small" v-model="addForm.cabAddress" placeholder="请输入详细地址"></el-input>
          </el-form-item>
          <el-form-item label="经度：" prop="longitude">
            <el-input size="small" v-model="addForm.longitude" placeholder="请输入经度"></el-input>
          </el-form-item>
          <el-form-item label="纬度：" prop="latitude">
            <el-input size="small" v-model="addForm.latitude" placeholder="请输入纬度"></el-input>
          </el-form-item>
        </div>
        <header>
          <p class="w100 vm">通道开通设置</p>
        </header>
        <div class="way-setting">
          <el-checkbox-group size="small" v-model="switchFlag">
            <el-checkbox
              border
              :label="index"
              v-for="(item,name,index) in wayList"
              :key="index"
            >{{name}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <header class="cab-pic-wrap">
          <p class="w100 vm">新增柜机</p>
          <el-button class="ml40" type="primary" size="small" @click.stop="addCab">新 增</el-button>
          <cab-modal
            ref="cabModal"
            :tmp-model-status="cabShow"
            :reset-id="resetId"
            :selected-list="selectedList"
            @reset="rechooseTemp"
            @add="addTemp"
          ></cab-modal>
        </header>
        <div class="cab-table">
          <el-table
            :data="selectedList"
            stripe
            border
            tooltip-effect="light"
            ref="table"
            class="mt20 x-expand-table"
          >
            <el-table-column prop="serial" label width="50"></el-table-column>
            <el-table-column prop="tempName" label="模版名称"></el-table-column>
            <el-table-column prop="types" label="柜体类型"></el-table-column>
            <el-table-column prop="note" label="柜体规格描述" width="200"></el-table-column>
            <el-table-column prop="amount" label="总格口数"></el-table-column>
            <el-table-column prop="largeAmount" label="大格口数"></el-table-column>
            <el-table-column prop="mediumAmount" label="中格口数"></el-table-column>
            <el-table-column prop="smallAmount" label="小格口数"></el-table-column>
            <el-table-column prop="tinyAmount" label="微格口数"></el-table-column>
            <el-table-column fixed="right" label="操作" width="180">
              <template slot-scope="scope">
                <span class="text-link mr5" @click="reSelectClick(scope.row)">重选</span>
                <span class="error-link" @click="deleteClick(scope.row)">删除</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form>
    </div>
    <div class="foot-btn">
      <el-button @click="resetForm">重置</el-button>
      <el-button type="primary" @click="submitForm">保存</el-button>
    </div>
  </div>
</template>

<script>
import cabModal from "./CabTempPic";
import AreaSelect from "@/components/AreaSelect";
export default {
  name: "NewWebsite",
  data() {
    return {
      bossList: [],
      groupList: {
        tmpGroup: "string"
      },
      wayList: [],
      switchFlag: [],
      screenList: [],
      addForm: {
        merchantId: "",
        cabSysId: "", //网点编号
        operationGroupId: "",
        operationPhone: "",
        signPhone: "",
        machineCode: "", //主机硬件ID
        cabName: "",
        phone: "",
        longitude: "",
        latitude: "",
        cabAddress: "",
        areaArr: [],
        provinceId: "",
        cityId: "",
        areaId: "",
        lockConfigValue: "1",
        switchFlag: []
      },
      rules: {
        machineCode: [
          {
            required: true,
            message: "请输入主机硬件ID",
            trigger: "blur"
          }
        ],
        lockConfigValue: [
          {
            required: true,
            message: "请选择锁控型号",
            trigger: "change"
          }
        ],
        cabName: [
          {
            required: true,
            message: "请输入网点名称",
            trigger: "blur"
          }
        ],
        merchantId: [
          {
            required: true,
            message: "请选择老板",
            trigger: "change"
          }
        ],
        operationGroupId: [
          {
            required: true,
            message: "请选择运营组",
            trigger: "change"
          }
        ],
        screen: [
          {
            required: true,
            message: "请选择屏幕类型",
            trigger: "change"
          }
        ],
        operationPhone: [
          {
            required: true,
            message: "请输入运营手机号",
            trigger: "blur"
          }
        ],
        signPhone: [
          {
            required: true,
            message: "请输入签收手机号",
            trigger: "blur"
          }
        ],
        longitude: [
          {
            required: true,
            message: "请输入经度",
            trigger: "blur"
          }
        ],
        latitude: [
          {
            required: true,
            message: "请输入纬度",
            trigger: "blur"
          }
        ],
        areaArr: [
          {
            required: true,
            message: "请选择城市",
            trigger: "blur"
          }
        ],
        cabAddress: [
          {
            required: true,
            message: "请输入详细地址",
            trigger: "blur"
          }
        ]
      },
      cabShow: false,
      selectedList: [],
      resetId: null
    };
  },
  components: {
    cabModal,
    AreaSelect
  },
  created() {
    this.getGroupList();
    this.getBossList();
    this.getWayList();
    this.getScreenList();
  },
  mounted() {},
  methods: {
    getGroupList() {
      this.$apis.cab.group.getOptionsList().then(res => {
        this.groupList = res.infoItems;
      });
    },
    getBossList() {
      this.$apis.cab.boss.bossList().then(res => {
        this.bossList = res.infoItems;
      });
    },
    getWayList() {
      let params = {
        siteId: 0
      };
      this.$apis.cab.cabinet.getWayList(params).then(res => {
        this.wayList = res;
      });
    },
    getScreenList() {
      this.$apis.cab.cabinet.getScreenList().then(res => {
        this.screenList = res.screenTypeItems;
      });
    },
    addCab() {
      // 新增柜机
      this.cabShow = true;
    },
    closeModal() {
      // 关闭内部弹窗
      this.$refs.cabModal.photoModelStatus = false;
      this.cabShow = false;
    },
    reSelectClick(item) {
      // 点击重选
      event.stopPropagation();
      let serial = item.serial;
      this.resetId = serial;
      if (!this.cabShow) {
        this.addCab();
      }
    },
    rechooseTemp(item) {
      // 完成重选
      this.selectedList.splice(this.resetId - 1, 1, item);
      this.resetId = null;
    },
    addTemp(item) {
      // 完成添加
      this.selectedList.push(item);
    },
    areaChange(data) {
      this.addForm.areaArr = data;
      this.addForm.provinceId = data[0];
      this.addForm.cityId = data[1];
      this.addForm.areaId = data[2];
    },
    deleteClick(item) {
      // 删除模版
      for (let i = 0; i < this.selectedList.length; i++) {
        if (i >= item.serial) {
          this.selectedList[i].serial -= 1;
        }
      }
      this.selectedList.splice(item.serial - 1, 1);
    },
    resetForm() {
      // 重置表单
      this.$refs.infoForm.resetFields();
      this.resetId = null;
      this.selectedList = [];
      this.addForm.provinceId = "";
      this.addForm.cityId = "";
      this.addForm.areaId = "";
      this.closeModal();
    },
    submitForm() {
      // 提交表单
      let that = this;
      this.$refs.infoForm.validate(valid => {
        if (valid) {
          let tmpGroup = [];
          if (this.selectedList.length > 0) {
            tmpGroup = this.selectedList.map(i => i.id);
          } else {
            this.$message({
              message: "请至少添加一组柜子",
              type: "warning"
            });
            return;
          }
          let switchList = new Array(Object.keys(that.wayList).length).fill(1);
          this.switchFlag.forEach(i => {
            switchList[i] = 0;
          });
          let params = Object.assign(this.addForm, {
            switchFlag: switchList,
            token: this.$token,
            longitude: this.addForm.longitude * 1000000,
            latitude: this.addForm.latitude * 1000000,
            tmpGroup: tmpGroup.join(",")
          });
          this.$apis.cab.cabinet.addNew(params).then(res => {
            if (res.msg && res.code !== 10000) {
              this.$message.error(`${res.msg ? res.msg : "请求失败"}`);
            } else {
              this.$notify({
                title: "成功",
                message: "网点创建成功",
                type: "success"
              });
              this.$emit("after-save");
            }
          });
        } else {
          this.$message.error("请将数据填写完整");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.way-setting {
  margin-left: 50px;
}
</style>