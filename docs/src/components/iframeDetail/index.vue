<template>
    <div>
        <n-dialog :title="title" :visible.sync="value" v-loading="loading" class="iframeDialog" @change="dialogClose">
            <div class="main">
                <div class="page-main hi p0 df">
                    <div id="iframeBox" ref="iframeBox"></div>
                </div>
            </div>
        </n-dialog>
    </div>
</template>

<script>
import { urlEncode } from "./url";
export default {
  data() {
    return {
      iframeSrc: "",
      height: "300px",
      width: "800px",
      loading: false,
      ownIframe: null,
      postMessage: {}
    };
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    query: {
      type: Object,
      default: () => {
        return {

        }
      }
    },
    title: {
      type: String,
      default: "详情"
    },
    iframeUrl: String
  },
  watch: {
    value(val) {
      if (val) {
        this.iframeSrc = `${this.iframeUrl}?${urlEncode(
          this.query
        ).slice(1)}`;
        this.$nextTick(function() {
          this.createIframe();
        });
      } else {
        this.closeDialogCb();
      }
    },
    postMessage: {
      handler(nv, ov) {
        this.$emit('post-message', nv)
        console.log(ov)
      },
      deep: true
    }
  },
  mounted() {
    this.loading = true
  },
  methods: {
    // iframe load
    loadIframe() {
      var vm = this;
      vm.width = Math.max(document.body.scrollWidth, document.body.clientWidth) - 60;
      vm.height = document.body.clientHeight - 110;
      vm.loading = false;
    },
    // 添加postmessage事件监听
    watchMessage() {
      let vm = this;
      if (typeof window.addEventListener !== "undefined") {
        window.addEventListener("message", vm.watchPostmessage, false);
      } else if (typeof window.attachEvent !== "undefined") {
        window.attachEvent("message", vm.watchPostmessage, false);
      }
    },
    // 取得message
    watchPostmessage(e) {
      this.postMessage = JSON.parse(e.data);
    },
    // 去除postmessage监听
    removeWatch() {
      let vm = this;
      if (typeof window.removeEventListener !== "undefined") {
        window.removeEventListener("message", vm.watchPostmessage, false);
      } else if (typeof window.detachEvent !== "undefined") {
        window.detachEvent("message", vm.watchPostmessage, false);
      }
    },
    dialogClose() {
      this.$emit("input", false);
    },
    // 关闭回调
    closeDialogCb() {
      let ownIframe = document.getElementById("ownIframe");
      ownIframe && this.$refs.iframeBox.removeChild(ownIframe);
      this.removeWatch();
    },
    changeIframeStyle() {},
    createIframe() {
      let vm = this;
      // let box = document.getElementById("iframeBox");
      let iframe = document.createElement("iframe");
      iframe.src = vm.iframeSrc;
      console.log(iframe.src)
      iframe.ref = "iframe";
      iframe.id = "ownIframe";
      iframe.setAttribute("marginheight", "0");
      iframe.setAttribute("marginwidth", "0");
      iframe.setAttribute("frameborder", "0");
      // iframe.setAttribute("display", "block");
      iframe.scrolling = "no";
      iframe.addEventListener("load", vm.loadIframe());
      iframe.height = vm.height;
      iframe.width = vm.width;
      vm.$refs.iframeBox.appendChild(iframe);
      vm.watchMessage();
      let ownIframe = document.getElementById("ownIframe");
      window.onresize = () => {
        if (ownIframe) {
          setTimeout(function() {
            vm.loadIframe();
            ownIframe.height = vm.height;
            ownIframe.width = vm.width;
          }, 400);
        }
      };
    }
  }
};
</script>
