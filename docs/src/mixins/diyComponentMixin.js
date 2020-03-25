import {
  DiyAddress,
  DiyDatetime,
  DiyInput,
  DiyRadio,
  DiyCheckbox,
  DiySelect,
  DiyTextarea,
  DiyImg,
  DiyPriority,
  DiyService
} from "@/components/diyAttr";
import { optTypeMap, formCpModel } from "@/views/module/template/order/const";
import draggable from "vuedraggable";
import formProp from "@/components/diyAttr/formProp";
import emptyData from "@/components/emptyData";
let _formCpModel = JSON.stringify(formCpModel);
export default {
  data() {
    return {
      showSelectMap: optTypeMap,
      selectedItem: {}, //选中的表单
      listForm: [],
      fixedForm: [],
      listComponents: [],
      listSys: []
    };
  },
  components: {
    draggable,
    formProp,
    emptyData
  },
  methods: {
    getComponent(item) {
      switch (item.componentType) {
        case 1:
          return DiyInput;
        case 2:
          return DiyTextarea;
        case 3:
          return DiyRadio;
        case 4:
          return DiyCheckbox;
        case 5:
          return DiySelect;
        case 6:
          return DiyImg;
        case 7:
          return DiyDatetime;
        case 8:
          return DiyAddress;
        //系统控件
        case 20:
          return DiyService;
        case 21:
          return DiyPriority;
        default:
          if (isDev) {
            console.error(`不支持的类型: ${item.componentType}`);
          }
      }
    },
    //表单信息
    async getInfo() {
      let res = await this.$apis.template.itemInfo({
        templateId: this.templateId
      });
      let _res = res.map(element => {
        return Object.assign({}, element, {
          selected: false
        });
      });
      this.fixedForm = _res.filter(item => {
        return !!item.isMustField;
      });
      this.listForm = _res.filter(item => {
        return !item.isMustField;
      });
      if (this.fixedForm.length) {
        this.activeItem(0, "fixedForm");
      } else if (this.listForm.length) {
        this.activeItem(0, "listForm");
      }
    },
    //组件列表
    async getComponentList() {
      let res = await this.$apis.component.queryType();
      this.listComponents = res.base.map((item, index) => {
        return Object.assign({}, item, {
          sort: index
        });
      });
      this.listSys = res.sys.map((item, index) => {
        return Object.assign({}, item, {
          sort: index
        });
      });
    },
    insertItem(item) {
      let _item = Object.assign(
        {},
        JSON.parse(_formCpModel),
        {
          title: item.added.element.componentName,
          ...item.added.element
        },
        {
          sort: item.added.newIndex,
          templateId: this.templateId
        }
      );
      _item.optValue = [];
      if (this.showSelectMap.indexOf(item.added.element.componentType) > -1) {
        for (let i = 0; i < 3; i++) {
          _item.optValue.push("未名命");
        }
      }
      return _item;
    },
    delDragItem(index, element) {
      let vm = this;
      this.$set(
        this.listForm,
        index,
        Object.assign(element, {
          ani: true
        })
      );
      setTimeout(function() {
        vm.listForm.splice(index, 1);
      }, 400);
    }
  }
};
