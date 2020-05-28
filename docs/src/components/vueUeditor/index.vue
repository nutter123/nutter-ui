<template>
  <div>
    <at-image-upload v-model="form.cover" :limit="1" :singleFileSize="10" @on-success="imgSucess" httpRequest="qiniu" style="display:none">
      <el-button type="primary" id="imgInput">点击上传</el-button>
    </at-image-upload>
    <link-select v-model="linkTypeVisible" @after-save="afterLinkSelect"></link-select>
    <script :id="randomId" name="content" type="text/plain"></script>
  </div>
</template>

<script>
import editorConfig from "./editorConfig";
import linkSelect from "@/components/linkSelect";
export default {
  name: "VueUEditor",
  props: {
    ueditorPath: {
      // UEditor 代码的路径
      type: String,
      default: "/static/ueditor1_4_3_3/"
    },
    value: {
      type: String,
      default: ""
    },
    ueditorConfig: {
      // UEditor 配置项
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      form: {
        cover: ""
      },
      linkTypeVisible:false,
      linkData:{},
      // 为了避免麻烦，每个编辑器实例都用不同的 id
      randomId: "editor_" + Math.random() * 100000000000000000,
      instance: null,
      // scriptTagStatus -> 0:代码未加载，1:两个代码依赖加载了一个，2:两个代码依赖都已经加载完成
      scriptTagStatus: 0,
      _content: ""
    };
  },
  watch: {
    value(newVal) {
      if (this.instance) {
        if (newVal && newVal !== this._content) {
          this._content = newVal;
          setTimeout(() => {
            this.instance.setContent(newVal);
          }, 200);
        } else if (!newVal) {
          this.instance.setContent("<p></p>");
        }
      }
    }
  },
  components:{
    linkSelect
  },
  created() {
    if (window.UE !== undefined) {
      // 如果全局对象存在，说明编辑器代码已经初始化完成，直接加载编辑器
      this.scriptTagStatus = 2;
      this.initEditor();
    } else {
      // 如果全局对象不存在，说明编辑器代码还没有加载完成，需要加载编辑器代码
      this.insertScriptTag();
    }
  },
  beforeDestroy() {
    // 组件销毁的时候，要销毁 UEditor 实例
    if (this.instance !== null && this.instance.destroy) {
      this.instance.destroy();
    }
  },
  methods: {
    insertScriptTag() {
      let editorScriptTag = document.getElementById("editorScriptTag");
      let configScriptTag = document.getElementById("configScriptTag");

      // 如果这个tag不存在，则生成相关代码tag以加载代码
      if (editorScriptTag === null) {
        configScriptTag = document.createElement("script");
        configScriptTag.type = "text/javascript";
        configScriptTag.src = this.ueditorPath + "ueditor.config.js";
        configScriptTag.id = "configScriptTag";

        editorScriptTag = document.createElement("script");
        editorScriptTag.type = "text/javascript";
        editorScriptTag.src = this.ueditorPath + "ueditor.all.js";
        editorScriptTag.id = "editorScriptTag";
        let s = document.getElementsByTagName("head")[0];
        s.appendChild(configScriptTag);
        s.appendChild(editorScriptTag);
      }

      // 等待代码加载完成后初始化编辑器
      if (configScriptTag.loaded) {
        this.scriptTagStatus++;
      } else {
        configScriptTag.addEventListener("load", () => {
          this.scriptTagStatus++;
          configScriptTag.loaded = true;
          this.initEditor();
        });
      }

      if (editorScriptTag.loaded) {
        this.scriptTagStatus++;
      } else {
        editorScriptTag.addEventListener("load", () => {
          this.scriptTagStatus++;
          editorScriptTag.loaded = true;
          this.initEditor();
        });
      }

      this.initEditor();
    },
    initEditor() {
      // scriptTagStatus 为 2 的时候，说明两个必需引入的 js 文件都已经被引入，且加载完成
      if (this.scriptTagStatus === 2 && this.instance === null) {
        // Vue 异步执行 DOM 更新，这样一来代码执行到这里的时候可能 template 里面的 script 标签还没真正创建
        // 所以，我们只能在 nextTick 里面初始化 UEditor
        this.$nextTick(() => {
          this.instance = window.UE.getEditor(
            this.randomId,
            Object.assign({},editorConfig,this.ueditorConfig)
          );
          // 绑定事件，当 UEditor 初始化完成后，将编辑器实例通过自定义的 ready 事件交出去
          this.instance.addListener("ready", () => {
            // this.$emit('ready', this.instance);
            this.simpleupload()
              let link = document.getElementsByClassName("edui-for-link");
              if(link.length){
                this.addLink()
              }
            this.instance.setContent(this.value);
            this.instance.addListener("contentChange", () => {
              const ueditor = this.instance;
              let html = ueditor.getContent();
              const text = ueditor.getContentTxt();
              if (html === "<p><br></p>") html = "";
              this._content = html;
              this.$emit("input", this._content);
              this.$emit("change", { html, text, ueditor });
            });
          });
        });
      }
    },
    simpleupload() {
      let vm = this
      let simpleupload = document.getElementsByClassName(
        "edui-for-simpleupload"
      );
      simpleupload[0].addEventListener("click", vm.imageHandler);
    },
    addLink(){
      let vm = this
      let link = document.getElementsByClassName(
        "edui-for-link"
      );
      link[0].addEventListener("click", function(){
        let selectText = vm.instance.selection.getRange().cloneContents()
        if(selectText){
          vm.linkTypeVisible = true
        }else{
          vm.$message({
            message:'请先选择需要添加链接的内容!',
            type:'warning'
          })
        }
      });
    },
    afterLinkSelect(data) {
      this.linkData = Object.assign({}, data);
      // if(data.jumpType){
        let _href =this.linkData.jumpType===3?this.linkData.jumpContent:`${this.linkData.jumpContent}@@${this.linkData.jumpType}`
        this.instance.execCommand("link",{'href':_href,'_href':_href});
      // }
      this.linkTypeVisible = false;
    },
    imageHandler() {
      let fileInput = document.getElementById("imgInput");
      fileInput.click();
    },
    imgSucess() {
      this.instance.execCommand("inserthtml", `<img src="${this.form.cover}">`);
      this.form.cover = "";
    }
  }
};
</script>
