<template>
  <upload
    :action="action"
    :headers="headers"
    :multiple="multiple"
    :data="data"
    :name="name"
    :with-credentials="withCredentials"
    :show-file-list="showFileList"
    :drag="drag"
    :accept="accept"
    :list-type="listType"
    :auto-upload="autoUpload"
    v-model="computedFileList"
    :httpRequest="httpRequest"
    :disabled="disabled"
    :limit="limit"
    :exts="exts"
    :singleFileSize="singleFileSize"
    @on-preview="onPreview"
    @on-remove="onRemove"
    @on-success="onSuccess"
    @on-error="onError"
    @on-progress="onProcess"
    @on-change="onChange"
    @before-upload="beforeUpload"
    @on-exceed="onExceed"
    @on-exts-exceed="onExtsExceed"
    @on-file-size-exceed="onFileSizeExceed"
  >
    <slot />
    <template v-if="$slots.tip" slot="tip">
      <slot name="tip" />
    </template>
  </upload>
</template>

<script>
import Upload from "./index";
import { showPreview } from "@/components/MessageBox";
import { callOrApply } from "@/utils";

export default {
  name: "n-upload-image",
  components: {
    Upload,
  },
  model: {
    prop: "fileList",
    event: "change",
  },
  props: {
    action: {
      type: String,
      default: "",
    },
    headers: {
      type: Object,
      default() {
        return null;
      },
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    data: {
      type: Object,
      default() {
        return {};
      },
    },
    name: {
      type: String,
      default: "file",
    },
    withCredentials: {
      type: Boolean,
      default: false,
    },
    showFileList: {
      type: Boolean,
      default: true,
    },
    drag: {
      type: Boolean,
      default: false,
    },
    accept: {
      type: String,
      default: "image/*",
    },
    listType: {
      type: String,
      default: "picture-card",
    },
    autoUpload: {
      type: Boolean,
      default: true,
    },
    fileList: {
      type: [Array, String],
      default() {
        return [];
      },
    },
    httpRequest: {
      type: [Function, String],
      required: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    limit: {
      type: Number,
      default: 1,
    },
    exts: {
      type: Array,
      default() {
        return ["jpg", "jpeg", "gif", "png", "bmp"];
      },
    },
    singleFileSize: {
      type: Number,
      default: 4,
    },
    showMsg: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    computedFileList: {
      get() {
        return this.fileList;
      },
      set(val) {
        this.$emit("change", val);
      },
    },
  },
  methods: {
    applyEmit(emitName, args) {
      let argsArr = Array.from(args);
      argsArr.unshift(emitName);
      return callOrApply(this, this.$emit, argsArr);
    },
    onPreview(file) {
      showPreview(file.url);
    },
    onRemove() {
      this.applyEmit("on-remove", arguments);
    },
    onSuccess() {
      this.applyEmit("on-success", arguments);
    },
    onError() {
      this.applyEmit("on-error", arguments);
    },
    onProcess() {
      this.applyEmit("on-process", arguments);
    },
    onChange() {
      this.applyEmit("on-change", arguments);
    },
    beforeUpload() {
      let res = this.applyEmit("before-upload", arguments);
      return res === undefined ? true : res;
    },
    onExceed() {
      this.applyEmit("on-exceed", arguments);
    },
    onExtsExceed() {
      this.applyEmit("on-exts-exceed", arguments);
    },
    onFileSizeExceed() {
      this.applyEmit("on-file-size-exceed", arguments);
    },
  },
};
</script>
