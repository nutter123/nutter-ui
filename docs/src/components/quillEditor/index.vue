<template>
<div>
  <quill-editor ref="myTextEditor" class="self-quill-editor" v-model="value" :options="editorOption" @ready="onEditorReady($event)"></quill-editor>
  <at-image-upload v-model="imgFile" :limit="1" httpRequest="qiniu" @before-upload="fullscreenLoading=true" @on-success="imgSucess" :singleFileSize="10" style="display:none;">
    <el-button size="small" type="primary" id="imgInput" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="插入中,请稍候">点击上传</el-button>
  </at-image-upload>
  <el-button size="small" type="primary" id="linkButton" style="display:none;" @click="openLinkSelect">点击输入</el-button>
  <select-type v-model="linkTypeVisible" @after-save="linkSelect"></select-type>
</div>
</template>

<script>
import {
  config1,
  config2
} from "./config";
import Quill from "quill";
import selectType from "@/components/linkSelect";
export default {
  data() {
    return {
      imgFile: "",
      editorOption: config1,
      addRange: null,
      addLink: null,
      linkTypeVisible: false,
      fullscreenLoading: false,
      linkData: {}
    };
  },
  model: {
    prop: "content",
    event: "change"
  },
  props: {
    content: {
      type: String,
      default: ""
    },
    hasLink: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    value: {
      get() {
        return this.content;
      },
      set(val) {
        this.$emit("change", val);
      }
    }
  },
  created() {
    if (!this.hasLink) {
      this.editorOption = Object.assign({}, config2);
    }
  },
  mounted() {
    this.$refs.myTextEditor.quill
      .getModule("toolbar")
      .addHandler("image", this.imgHandler);
    if (this.hasLink) {
      this.$refs.myTextEditor.quill
        .getModule("toolbar")
        .addHandler("link", this.linkHandler);
    }
  },
  components: {
    selectType
  },
  methods: {
    onEditorReady() {},
    imgHandler(state) {
      this.addRange = this.$refs.myTextEditor.quill.getSelection();
      if (state) {
        let fileInput = document.getElementById("imgInput");
        fileInput.click(); // 加一个触发事件
      }
    },
    linkHandler(state) {
      this.addLink = this.$refs.myTextEditor.quill.getSelection();
      if (state&&this.addLink.length) {
        let fileInput = document.getElementById("linkButton");
        fileInput.click(); // 加一个触发事件
      }else{
        this.$message({
          message:'请选择需要添加链接的内容',
          type:'warning'
        })
      }
    },
    openLinkSelect() {
      this.linkTypeVisible = true;
    },
    linkSelect(data) {
      this.linkData = Object.assign({}, data);
      this.$refs.myTextEditor.quill.format("link",this.linkData.jumpType===3?this.linkData.jumpContent:`${this.linkData.jumpContent}@@${this.linkData.jumpType}`);
      this.linkTypeVisible = false;
    },
    imgSucess() {
      let vm = this;
      this.$refs.myTextEditor.quill.insertEmbed(
        vm.addRange !== null ? vm.addRange.index : 0,
        "image",
        this.imgFile,
        Quill.sources.USER
      );
      this.imgFile = "";
      this.fullscreenLoading = false;
    }
  }
};
</script>

<style>
</style>
