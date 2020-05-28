<template>
  <div
    class="main"
    :class="!rowData.id ? '' : 'mt10'"
    :style="rowData.id ? 'height: calc(100% - 10px);' : ''"
  >
    <div class="breadcrumb" v-if="!rowData.id">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>网点详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form ref="infoForm" :model="infoForm" label-width="120px" class="info-form h-100">
      <el-tabs class="h-100 overflow-y" v-model="activeName" type="border-card">
        <el-tab-pane label="信 息" name="first">
          <header>
            <p class="w160 vm">基本信息</p>
          </header>
          <div class="info-content">
            <div class="info-input">
              <el-form-item label="老板：" prop="bossName">
                <p class="form-content-p">{{infoForm.bossName+"("+infoForm.bossPhone+")"}}</p>
              </el-form-item>
              <el-form-item label="签收手机号：" prop="signPhone">
                <p class="form-content-p">{{infoForm.signPhone}}</p>
              </el-form-item>
              <el-form-item label="连接状态：" prop="onlineStatus">
                <p class="form-content-p">{{checkStatus(infoForm.onlineStatus)}}</p>
              </el-form-item>
              <el-form-item label="柜机状态：" prop="onlineStatus">
                <p
                  class="form-content-p"
                >{{checkPolicyStatus(infoForm.controlPolicy,infoForm.status)}}</p>
              </el-form-item>
              <el-form-item label="锁控型号：" prop="onlineStatus">
                <p class="form-content-p">{{checkLockStatus(infoForm.lockConfigValue)}}</p>
              </el-form-item>
            </div>
            <div class="info-input">
              <el-form-item label="网点编号：" prop="cabSysId">
                <p class="form-content-p">{{infoForm.cabSysId}}</p>
              </el-form-item>
              <el-form-item label="网点名称：" prop="cabName">
                <p class="form-content-p">{{infoForm.cabName}}</p>
              </el-form-item>
              <el-form-item label="主机硬件ID：" prop="machineCode">
                <p class="form-content-p">{{infoForm.machineCode}}</p>
              </el-form-item>
              <el-form-item label="运营组：" prop="operationGroupName">
                <p class="form-content-p">{{infoForm.operationGroupName}}</p>
              </el-form-item>
            </div>
            <div class="info-input">
              <el-form-item label="省份：" prop="provinceName">
                <p class="form-content-p">{{infoForm.provinceName}}</p>
              </el-form-item>
              <el-form-item label="城市：" prop="cityName">
                <p class="form-content-p">{{infoForm.cityName}}</p>
              </el-form-item>
              <el-form-item label="区县：" prop="countyName">
                <p class="form-content-p">{{infoForm.countyName}}</p>
              </el-form-item>
              <el-form-item label="运营手机号：" prop="operationPhone">
                <p class="form-content-p">{{infoForm.operationPhone}}</p>
              </el-form-item>
            </div>
            <div class="info-input">
              <el-form-item label="经度：" prop="longitude">
                <p class="form-content-p">{{infoForm.longitude ? infoForm.longitude/1000000 : ''}}</p>
              </el-form-item>
              <el-form-item label="纬度：" prop="latitude">
                <p class="form-content-p">{{infoForm.latitude ? infoForm.latitude/1000000 : ''}}</p>
              </el-form-item>
              <el-form-item label="详细地址：" prop="cabAddress">
                <p class="form-content-p">{{infoForm.cabAddress}}</p>
              </el-form-item>
              <el-form-item label="柜机版本号：" prop="softVersion">
                <p class="form-content-p">{{infoForm.softVersion}}</p>
              </el-form-item>
            </div>
          </div>
          <header>
            <p class="w160 vm">柜机硬件信息</p>
          </header>
          <div class="info-content">
            <div class="cab-info-left">
              <cab-info-table
                :disable="editDisable"
                :cabinetData="infoForm.cabinetGroupModels"
                :statsData="statsData"
                @modify-cab-info="modifyCabInfo"
              ></cab-info-table>
            </div>
            <div class="cab-info-right">
              <p class="tc fs16 mb10">
                柜机格口管理
                <span class="fc-red">(点击放大)</span>
              </p>
              <cab-preview
                :disable="editDisable"
                :swiperData="swiperData"
                showType="thumbnail"
                @click.native="showPreview"
                @change="previewSmallChange"
              ></cab-preview>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="设 置" name="second">
          <header>
            <p class="w160 vm">基本设置</p>
          </header>
          <div class="info-content flex">
            <el-form
              ref="editInfoForm"
              :model="editInfoForm"
              :rules="editRules"
              label-width="120px"
              class="info-form h-100 flex"
            >
              <el-form-item prop="cabName" label="网点名称：">
                <el-input
                  placeholder="请输入网点名称"
                  v-model="editInfoForm.cabName"
                  class="w180"
                  clearable
                  size="small"
                ></el-input>
              </el-form-item>
              <el-form-item prop="merchantId" label="老板：">
                <el-select
                  class="w180"
                  v-model="editInfoForm.merchantId"
                  clearable
                  filterable
                  size="small"
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
              <el-form-item prop="signPhone" label="签收手机号：">
                <el-input
                  placeholder="请输入签收手机号"
                  v-model="editInfoForm.signPhone"
                  class="w180"
                  clearable
                  size="small"
                ></el-input>
              </el-form-item>
              <el-form-item prop="operationGroupId" label="运营组：">
                <el-select
                  class="w180"
                  v-model="editInfoForm.operationGroupId"
                  clearable
                  filterable
                  size="small"
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
              <el-form-item prop="operationPhone" label="运营手机号：">
                <el-input
                  placeholder="请输入运营手机号"
                  v-model="editInfoForm.operationPhone"
                  class="w180"
                  clearable
                  size="small"
                ></el-input>
              </el-form-item>
              <el-button
                type="primary"
                size="small"
                @click="editBaseInfo"
                :disabled="editDisable"
                style="height:30px;margin-left:20px;
    margin-bottom: 22px;"
              >设置</el-button>
            </el-form>
          </div>
          <header>
            <p class="w160 vm">硬件参数配置</p>
          </header>
          <div class="info-content flex">
            <el-form
              ref="editLockForm"
              :model="editLockForm"
              :rules="editLockRules"
              label-width="120px"
              class="info-form h-100 flex"
            >
              <el-form-item prop="machineCode" label="主机硬件ID：">
                <el-input
                  placeholder="请输入主机硬件ID"
                  v-model="editLockForm.machineCode"
                  class="w180"
                  clearable
                  size="small"
                ></el-input>
              </el-form-item>
              <el-form-item prop="lockConfigValue" label="锁控型号：">
                <el-select
                  class="w180"
                  v-model="editLockForm.lockConfigValue"
                  clearable
                  filterable
                  size="small"
                  placeholder="请选择锁控型号"
                >
                  <el-option label="新锁" value="1"></el-option>
                  <el-option label="旧锁" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="screen" label="屏幕设置：">
                <el-select
                  class="w180"
                  v-model="editLockForm.screen"
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
              <el-button
                type="primary"
                size="small"
                :disabled="editDisable"
                @click="editLockConfig"
                style="height:30px;margin-left:20px;
    margin-bottom: 22px;"
              >设置</el-button>
            </el-form>
          </div>
          <header>
            <p class="w100 vm">通道开通设置</p>
            <el-button type="primary" size="small" @click.stop="handleEditWay">设置</el-button>
          </header>
          <div class="way-setting">
            <el-checkbox-group size="small" v-model="switchFlag">
              <el-checkbox
                border
                :label="index"
                v-for="(item,name,index) in wayList"
                :key="index"
                :checked="item==0"
              >{{name}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <header>
            <p class="w160 vm">寄件设置</p>
          </header>
          <div class="info-content">
          </div>
          <header>
            <p class="w160 vm">网点现场照片</p>
          </header>
          <div class="info-content">
            <site-pic
              :disabled="editDisable"
              :id="infoForm.id"
              :list="infoForm.picSrcs"
              @after-save="afterPicSave"
            ></site-pic>
          </div>
          <header>
            <p class="w160 vm">管理员设置</p>
            <el-button
              type="primary"
              size="small"
              @click.stop="addAdmin=true"
              :disabled="editDisable"
            >新 增</el-button>
          </header>
          <div class="info-content">
            <admin-set
              :addAdmin="addAdmin"
              :siteData="detailData"
              :disabled="editDisable"
              v-if="detailData.id"
              @close="closeAddAdmin"
            ></admin-set>
          </div>
          <header>
            <p class="w160 vm">价格设置</p>
            <el-button
              type="primary"
              :disabled="editDisable"
              size="small"
              @click.stop="addFreeMember=true"
            >新增免费快递员</el-button>
          </header>
          <div class="info-content">
            <price-set
              :addFreeMember="addFreeMember"
              :siteData="detailData"
              v-if="detailData.id"
              :disabled="editDisable"
              @close="closeAddFreeMember"
            ></price-set>
          </div>
          <header>
            <p class="w160 vm">逾期设置</p>
          </header>
          <div class="info-content">
            <el-form
              inline
              ref="overdueInfo"
              :rules="overdueRule"
              :model="overdueInfo"
              label-width="90px"
            >
              <el-form-item label="逾期设置：" prop="overdueVal">
                <el-select
                  v-model="overdueInfo.overdueVal"
                  size="small"
                  class="w180"
                  clearable
                  placeholder="请选择逾期设置"
                >
                  <el-option
                    v-for="item in timeLimitList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="逾期控制：" prop="overdueOn">
                <el-select
                  v-model="overdueInfo.overdueOn"
                  size="small"
                  class="w180"
                  clearable
                  placeholder="请选择逾期控制"
                >
                  <el-option
                    v-for="item in overDueControlList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button
                  class="ml20"
                  :disabled="editDisable"
                  type="primary"
                  size="small"
                  @click.stop="setOverdue"
                >设 置</el-button>
              </el-form-item>
            </el-form>
          </div>
          <header>
            <p class="w160 vm">短信设置</p>
          </header>
          <div class="info-content">
            <el-form inline ref="smsInfo" :rules="smsRule" :model="smsInfo" label-width="90px">
              <el-form-item label="取件设置：" prop="smsVal">
                <el-select
                  v-model="smsInfo.smsVal"
                  size="small"
                  class="w180"
                  clearable
                  placeholder="请选择取件模版"
                  @change="smsInfoChange"
                >
                  <el-option
                    v-for="(item) in smsModelList"
                    :key="item.smsTemplateId"
                    :label="item.templateName"
                    :value="item.smsTemplateId"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="模板示例：" class="smsText" prop="smsText">
                <el-input
                  type="textarea"
                  style="width:100%"
                  :autosize="{ minRows: 3 }"
                  disabled
                  v-model="smsInfo.smsText"
                />
              </el-form-item>
              <el-form-item>
                <el-button
                  class="ml20"
                  :disabled="editDisable"
                  type="primary"
                  size="small"
                  @click.stop="setSms"
                >设 置</el-button>
              </el-form-item>
            </el-form>
          </div>
          <header>
            <p class="w160 vm">预留设置(预留/总数)</p>
            <el-button
              class="ml10"
              type="primary"
              size="small"
              :disabled="editDisable"
              @click.stop="addReserveMember=true"
            >新增预留格口授权快递员</el-button>
          </header>
          <div class="info-content">
            <reserve-set
              :addReserveMember="addReserveMember"
              :siteData="detailData"
              :disabled="editDisable"
              v-if="detailData.id"
              @close="closeAddReserveMember"
            ></reserve-set>
          </div>
          <header>
            <p class="w160 vm">拒收设置</p>
            <el-button
              class="ml10"
              :disabled="editDisable"
              type="primary"
              size="small"
              @click.stop="addReject=true"
            >新增</el-button>
          </header>
          <div class="info-content">
            <reject-set
              :addReject="addReject"
              :siteData="detailData"
              v-if="detailData.id"
              :disabled="editDisable"
              @close="closeAddReject"
            ></reject-set>
          </div>
          <!-- <header>
            <p class="w160 vm">网点远程控制</p>
            <el-button
              type="primary"
              :disabled="editDisable"
              size="small"
              @click.stop="restart"
            >远程重启</el-button>
          </header>
          <div class="info-content">
            <el-form
              inline
              ref="versionInfo"
              :rules="versionInfoRule"
              :model="versionInfo"
              label-width="90px"
            >
              <el-form-item label prop="version">
                <el-input placeholder="请输入APK版本" size="small" v-model="versionInfo.version">
                  <template slot="append">
                    <el-button
                      slot="append"
                      size="small"
                      type="default"
                      :disabled="editDisable"
                      @click="upgrade"
                    >APK更新</el-button>
                  </template>
                </el-input>
              </el-form-item>
            </el-form>
          </div> -->
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <el-dialog
      class="cab-preview-dialog"
      title="柜机格口管理"
      :visible.sync="previewShow"
      width="85%"
      :close-on-click-modal="false"
      append-to-body
      :before-close="closePreview"
    >
      <div class="info-list">
        <ul>
          <li>网点编号</li>
          <li>{{infoForm.cabSysId}}</li>
          <li>主机硬件ID</li>
          <li>{{infoForm.machineCode}}</li>
          <li>网点名称</li>
          <li>{{infoForm.cabName}}</li>
        </ul>
      </div>
      <div class="explain">
        <ul>
          <li>
            <div class="bk-b"></div>
            <span>已占用</span>
          </li>
          <li>
            <div></div>
            <span>未占用</span>
          </li>
          <li>
            <div class="bk-y"></div>
            <span>已锁定</span>
          </li>
          <li>
            <div class="bk-p"></div>
            <span>异常</span>
          </li>
        </ul>
      </div>
      <cab-preview
        :swiperData="swiperData"
        ref="cabBigPreview"
        :index="initailIndex"
        showType="whole"
        @update-choose="updateChoose"
      ></cab-preview>
      <div slot="footer" class="dialog_footer">
        <el-button :disabled="editDisable" @click="openMouth">开选定格口</el-button>
        <el-button :disabled="editDisable" type="danger" @click="openAllMouth">格口全开!!</el-button>
        <el-button :disabled="editDisable" @click="lockMouth">锁定</el-button>
        <el-button :disabled="editDisable" @click="unlockMouth">解锁</el-button>
        <el-button :disabled="editDisable" @click="repair">修复释放</el-button>
        <el-button :disabled="editDisable" @click="record">格口记录</el-button>
        <el-button :disabled="editDisable" @click="setBoxMac">格口门码</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="查询格口日志"
      :visible.sync="recordShow"
      width="50%"
      :close-on-click-modal="false"
      append-to-body
    >
      <record-logs
        v-if="recordShow && detailData.id"
        :cabId="detailData.id"
        :boxCode="chooseBoxCode"
      ></record-logs>
    </el-dialog>
    <el-dialog
      title="设置格口门码"
      :visible.sync="boxMacShow"
      width="40%"
      :close-on-click-modal="false"
      append-to-body
    >
      <box-mac
        v-if="boxMacShow && detailData.id"
        :cabId="detailData.id"
        :boxCode="chooseBoxCode"
        @close="closeBoxMac"
      ></box-mac>
    </el-dialog>
    <el-dialog
      title="柜机硬件信息"
      :visible.sync="cabInfoShow"
      width="40%"
      :close-on-click-modal="false"
      append-to-body
    >
      <cab-info v-if="cabInfoShow" :cabInfo="cabInfo" @change="changeCabInfo"></cab-info>
      <div slot="footer" class="dialog_footer">
        <el-button @click="cabInfoShow=false">取消</el-button>
        <el-button type="primary" @click="saveCabInfo">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Action from "@/mixins/boxAction";
import CabDetail from "@/mixins/cabDetail";
import CabInfoTable from "./CabInfoTable";
import RecordLogs from "./RecordLogs";
import BoxMac from "./BoxMac";
import CabInfo from "./CabInfo";
import SitePic from "./SitePic";
import AdminSet from "./AdminSet";
import PriceSet from "./PriceSet";
import ReserveSet from "./ReserveSet";
import RejectSet from "./RejectSet";

export default {
  name: "WebsiteDetail",
  data() {
    return {
      initailIndex: 0, //柜机格口图索引
      infoForm: {}, // 表单
      editInfoForm: {},
      editLockForm: {},
      statsData: [], // 统计数据
      originalData: [], // 柜机格口原始数据
      swiperData: [], // 预览图数据
      groupList: [],
      bossList: [],
      wayList: [],
      switchFlag: [],
      previewShow: false, // 格口预览显示
      chooseBoxCode: "", // 选中格口位
      recordShow: false, // 格口记录日志显示
      boxMacShow: false, //格口门码显示
      cabInfoShow: false, // 修改单柜显示
      cabInfo: {}, // 单柜基本信息
      activeName: "first", // 选项卡
      addAdmin: false, // 新增管理员显示
      addFreeMember: false, // 新增免费快递员显示
      addReserveMember: false, // 新增预留快递员显示
      addReject: false, // 新增拒收显示
      screenList: [], //屏幕类型
      overdueInfo: {
        // 逾期表单
        overdueVal: "",
        overdueOn: ""
      },
      smsInfo: {
        //短信模板表单
        smsVal: "",
        smsText: ""
      },
      versionInfo: {
        // 版本表单
        version: ""
      },
      versionInfoRule: {
        // 版本规则
        version: {
          required: true,
          trigger: "blur",
          message: "请输入版本号"
        }
      },
      overDueControlList: [
        //逾期控制选项
        {
          label: "处理后允许投递",
          value: "1"
        },
        {
          label: "仅提醒，不限制",
          value: "0"
        }
      ],
      timeLimitList: [
        //逾期时限选项
        {
          label: "24小时",
          value: 24
        },
        {
          label: "48小时",
          value: 48
        },
        {
          label: "72小时",
          value: 72
        },
        {
          label: "96小时",
          value: 96
        }
      ],
      editLockRules: {
        lockConfigValue: [
          {
            required: true,
            message: "请选择锁控型号",
            trigger: "change"
          }
        ],
        machineCode: [
          {
            required: true,
            message: "请输入主机硬件ID",
            trigger: "blur"
          }
        ],
        screen: [
          {
            required: true,
            message: "请选择屏幕类型",
            trigger: "change"
          }
        ]
      },
      editRules: {
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
        ]
      },
      smsModelList: [],
      overdueRule: {
        overdueVal: [
          {
            required: true,
            message: "请选择逾期设置",
            trigger: "change"
          }
        ],
        overdueOn: [
          {
            required: true,
            message: "请选择逾期控制",
            trigger: "change"
          }
        ]
      },
      smsRule: {
        smsVal: [
          {
            required: true,
            message: "请选择短信模板",
            trigger: "change"
          }
        ]
      }
    };
  },
  props: {
    rowData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  components: {
    CabInfoTable, // 柜机硬件信息列表
    CabPreview: () => import("./GroupCab"), // 柜机格口预览
    RecordLogs, // 格口记录
    BoxMac, //格口门码
    CabInfo, // 柜机硬件信息
    SitePic, // 网点照片
    AdminSet, // 管理员设置
    PriceSet, // 价格设置
    ReserveSet, // 预留设置
    RejectSet // 拒收设置
  },
  mixins: [Action, CabDetail],
  computed: {
    editDisable: {
      get() {
        if (this.infoForm.businessStatus == 2) {
          return true;
        } else {
          return false;
        }
      },
      set(val) {
        console.log(val);
      }
    },
    detailData: {
      get() {
        if (
          this.$route.query.id != undefined &&
          this.$route.query.id != null &&
          this.$route.query.id != ""
        ) {
          return {
            id: this.$route.query.id
          };
        } else {
          return this.rowData;
        }
      },
      set(val) {
        console.log(val);
      }
    }
  },
  created() {
    if (this.detailData.id) {
      this.getDetail();
      this.getOverdue();
      this.getSmsList(); //获取短信模板列表
      this.getSmsById(); //获取对应短信模板
      this.getGroupList();
      this.getBossList();
      this.getWayList();
      this.getScreenList(); //获取屏幕类型
    }
  },
  mounted() {},
  methods: {
    previewSmallChange(index) {
      this.initailIndex = index;
    },
    getWayList() {
      let params = {
        siteId: this.detailData.id
      };
      this.$apis.cab.cabinet.getWayList(params).then(res => {
        this.wayList = res;
      });
    },
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
    getScreenList() {
      this.$apis.cab.cabinet.getScreenList().then(res => {
        this.screenList = res.screenTypeItems;
      });
    },
    getDetail() {
      // 获取柜机详情
      let id = this.detailData.id;
      this.$apis.cab.cabinet.detailNew(id).then(res => {
        this.statsData = [];
        this.infoForm = res;
        this.editInfoForm = {
          merchantId: res.bossId,
          operationGroupId: res.operationGroupId,
          operationPhone: res.operationPhone,
          signPhone: res.signPhone,
          cabName: res.cabName
          // machineCode: res.machineCode
        };
        this.editLockForm = {
          machineCode: res.machineCode,
          lockConfigValue: res.lockConfigValue,
          screen: res.screen
        };
        this.statsData.push({
          count: res.count,
          lCount: res.lcount,
          mCount: res.mcount,
          sCount: res.scount,
          tCount: res.tcount
        });
        let cabPreview = [],
          colList = [],
          cabNoList = Object.keys(res.cabinetDetails);
        console.log(cabNoList);
        if (cabNoList && cabNoList.length > 0) {
          cabNoList.map(i => {
            colList = colList.concat(res.cabinetDetails[i]);
          });
          setTimeout(() => {
            console.log(colList);
            let idxArr = [];
            for (let idx = 0; idx < colList.length; idx++) {
              idxArr.push(idx + 1);
            }
            console.log(idxArr);
            setTimeout(() => {
              cabPreview = cabNoList.map(i => {
                return {
                  name: i,
                  indexArr: idxArr.splice(0, res.cabinetDetails[i].length),
                  list: res.cabinetDetails[i]
                };
              });
              console.log(cabPreview);
              setTimeout(() => {
                // 将柜机每4组进行一次捆绑
                let newData = [];
                for (let i = 0; i < cabPreview.length / 4; i++) {
                  newData[i] = [];
                }
                for (let i = 0; i < cabPreview.length; i++) {
                  newData[parseInt(i / 4)].push(cabPreview[i]);
                }
                console.log(newData);
                this.originalData = cabPreview;
                this.swiperData = newData;
              }, 0);
            }, 0);
          }, 0);
        }
      });
    },
    editLockConfig() {
      let params = this.editLockForm,
        id = this.detailData.id;
      this.$refs.editLockForm.validate(valid => {
        if (valid) {
          this.$apis.cab.cabinet.editHardwareInfo(id, params).then(() => {
            this.$notify({
              title: "成功",
              message: "设置成功",
              type: "success"
            });
          });
        }
      });
    },
    editBaseInfo() {
      let params = this.editInfoForm,
        id = this.detailData.id;
      this.$refs.editInfoForm.validate(valid => {
        if (valid) {
          this.$apis.cab.cabinet.editBaseInfo(id, params).then(() => {
            this.$notify({
              title: "成功",
              message: "设置成功",
              type: "success"
            });
          });
        }
      });
    },
    checkPolicyStatus(control, status) {
      let result = "";
      switch (control) {
        case 0:
          result = "启用";
          break;
        case 1:
          result = "停用";
          break;
        default:
          result = "停用";
      }
      if (status == 2) {
        result = "撤柜";
      }
      return result;
    },
    checkLockStatus(type) {
      let result = "";
      switch (type) {
        case "0":
          result = "旧锁";
          break;
        case "1":
          result = "新锁";
          break;
        default:
          result = "未设置";
      }
      return result;
    },
    checkStatus(type) {
      let result = "";
      switch (type) {
        case 0:
          result = "未开机";
          break;
        case 1:
          result = "在线";
          break;
        case 2:
          result = "暂离";
          break;
        case 3:
          result = "离线";
          break;
        default:
          result = "无数据";
      }
      return result;
    },
    afterPicSave() {
      this.getDetail();
    },
    handleEditWay() {
      let that = this;
      this.$confirm("确定修改通道设置吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let switchList = new Array(Object.keys(that.wayList).length).fill(1);
          this.switchFlag.forEach(i => {
            switchList[i] = 0;
          });
          let params = {
            switchFlag: switchList,
            siteId: this.detailData.id
          };
          this.$apis.cab.cabinet.editWay(params).then(res => {
            if (res.msg && res.code !== 0) {
              this.$message.error(`${res.msg ? res.msg : "请求失败"}`);
            } else {
              this.$notify({
                title: "成功",
                message: "修改成功",
                type: "success"
              });
              this.getStoreList();
            }
          });
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="scss">
.smsText .el-form-item__content {
  width: 400px;
}
.flex {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.way-setting {
  margin-left: 50px;
}
</style>
