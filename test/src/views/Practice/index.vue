<!--
 * @Author: nutter
 * @Date: 2020-11-06 15:05:18
 * @LastEditors: nutter
 * @LastEditTime: 2020-11-06 17:26:59
 * @FilePath: \nutter-ui\test\src\views\Practice\index.vue
-->
<template>
  <div>
    <div>{{ wareList }}</div>
    <div v-for="(i, index) of logList" :key="index">{{ i }}</div>
  </div>
</template>

<script>
export default {
  name: "practice",
  data() {
    return {
      typeList: [], // 快件类型
      wareList: [], //当前店铺货架数
      sendList: [
        //寄件
      ],
      pickupList: [
        // 取件
      ],
      logList: [],
    };
  },
  components: {},
  created() {
    this.initType();
    this.initWare();
    let sendList = [
      { type: 1, value: "", id: "1234", phone: 12323123132, com: "邮政" },
    ];
    this.expressDown(sendList);
    let pickupList = [
      {
        value: "",
        id: "1234",
        phone: 12323123132,
        com: "邮政",
        position: "A0",
      },
    ];
    this.expressUp(pickupList);
  },
  methods: {
    initType() {
      this.typeList = [1, 2, 3, 4, 5];
    },
    initWare() {
      this.wareList = [
        {
          type: 1,
          name: "A",
          level: 10,
          capacity: 10,
          value: [[], []],
        },
      ];
    },
    expressUp(pickupList) {
      this.pickupList = pickupList;
      this.getExpress();
    },
    expressDown(sendList) {
      this.sendList = sendList;
      this.splitExpress();
    },
    splitExpress() {
      // 快件到站,分堆
      this.addLog(`快递到门口了.`);
      let enterArr = this.sendList;
      let typeArr = [];
      for (let el of enterArr) {
        if (el.type) {
          if (!typeArr[el.type]) {
            typeArr[el.type] = [];
          }
          typeArr[el.type].push(el);
        }
      }
      this.addLog(`快递拆分完成了.`);
      this.insertExpress(typeArr);
    },
    insertExpress(typeArr) {
      //对快递堆进行上架
      for (let i = 0; i <= typeArr.length; i++) {
        if (!typeArr[i]) {
          continue;
        }
        for (let j = 0; j < typeArr[i].length; j++) {
          // 写单号(会出现先遍历在合适位置添加单号情况),确定货架号,录件
          // 货架对应层数
          this.wareList.some((m) => {
            if (m.type == i) {
              let insertR = false;
              for (let r = 0; r < m.level; r++) {
                // 找可以存放的货架层
                let n = m["value"][r] || [];
                if (n.length < m.capacity) {
                  let position = m.name + r; // 生成对应取件货架编码
                  typeArr[i][j]["positon"] = position;
                  n.push(typeArr[i][j]); //对应取件码生成,入库数据插入,手机号发送.**会出现手机号识别出错上架.
                  this.addLog(`快递${typeArr[i][j].id}上架了.`);
                  insertR = true;
                  return;
                } else {
                  console.log("当前货架层已满!");
                  break;
                }
              }
              if (insertR) {
                return true;
              } else {
                console.log("当前货架已满!");
                return false;
              }
            } else {
              // console.log("快递找不到对应类型货架!");
              // return false;
            }
          });
        }
      }
    },
    getExpress() {
      let pickupList = this.pickupList;
      for (let express of pickupList) {
        let position = express.position;
        let wareTypeRow = this.getPosition(position);
        // 通过位置编号获取对应货架和对应行
        //找到对应货架
        for (let e of wareTypeRow) {
          // 遍历货架行上对应快递,时间复杂度随单行当前快递数增加.**会出现找不到对应快递.
          if (e.id == express.id) {
            //取件
            console.log("取到相应快件" + e.id);
            this.addLog(`快递${e.id}已出库.`);
            break;
          }
        }
      }
    },
    getPosition(position) {
      // 新手容易记错,熟练可以忽略
      //根据货架编号获取货架位置
      let p = position.split("--")[0];
      let name = p[0];
      let row = p.slice(1);
      let rowList = [];
      this.wareList.some((m) => {
        if (m.name == name) {
          if (!m["value"][row]) {
            console.log("对应货架行无货物!");
            return false;
          } else {
            rowList = m["value"][row];
          }
        } else {
          console.log("未找到对应货架!");
          return false;
        }
      });
      return rowList;
    },
    addLog(str) {
      this.logList.push(str);
    },
  },
};
</script>

<style>
</style>