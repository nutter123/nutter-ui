(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue'), require('extend'), require('vue-cookie'), require('axios'), require('element-ui')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue', 'extend', 'vue-cookie', 'axios', 'element-ui'], factory) :
  (global = global || self, factory(global.nutterUi = {}, global.Vue, global.extend, global.VueCookie, global.axios$1, global.elementUi));
}(this, (function (exports, Vue, extend, VueCookie, axios$1, elementUi) { 'use strict';

  Vue = Vue && Object.prototype.hasOwnProperty.call(Vue, 'default') ? Vue['default'] : Vue;
  extend = extend && Object.prototype.hasOwnProperty.call(extend, 'default') ? extend['default'] : extend;
  VueCookie = VueCookie && Object.prototype.hasOwnProperty.call(VueCookie, 'default') ? VueCookie['default'] : VueCookie;
  axios$1 = axios$1 && Object.prototype.hasOwnProperty.call(axios$1, 'default') ? axios$1['default'] : axios$1;

  //
  //
  //
  //
  //
  //
  var script = {
    name: "n-button",
    props: {
      type: String
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      const options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      let hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (style) {
                  style.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (style) {
          hook = shadowMode
              ? function (context) {
                  style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
              }
              : function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              const originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              const existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }
  //# sourceMappingURL=normalize-component.mjs.map

  /* script */
  const __vue_script__ = script;

  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "n-button" }, [_vm._t("default")], 2)
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    const __vue_inject_styles__ = undefined;
    /* scoped */
    const __vue_scope_id__ = undefined;
    /* module identifier */
    const __vue_module_identifier__ = undefined;
    /* functional template */
    const __vue_is_functional_template__ = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__ = normalizeComponent(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      false,
      undefined,
      undefined,
      undefined
    );

  __vue_component__.install = function (Vue) {
    Vue.component(__vue_component__.name, __vue_component__);
  };

  //
  //
  //
  var script$1 = {
    name: "n-icon",
    props: {
      name: String
    }
  };

  /* script */
  const __vue_script__$1 = script$1;

  /* template */
  var __vue_render__$1 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "i",
      _vm._g({ staticClass: "iconfont", class: _vm.name }, _vm.$listeners)
    )
  };
  var __vue_staticRenderFns__$1 = [];
  __vue_render__$1._withStripped = true;

    /* style */
    const __vue_inject_styles__$1 = undefined;
    /* scoped */
    const __vue_scope_id__$1 = undefined;
    /* module identifier */
    const __vue_module_identifier__$1 = undefined;
    /* functional template */
    const __vue_is_functional_template__$1 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$1 = normalizeComponent(
      { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
      __vue_inject_styles__$1,
      __vue_script__$1,
      __vue_scope_id__$1,
      __vue_is_functional_template__$1,
      __vue_module_identifier__$1,
      false,
      undefined,
      undefined,
      undefined
    );

  __vue_component__$1.install = function (Vue) {
    Vue.component(__vue_component__$1.name, __vue_component__$1);
  };

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  var script$2 = {
    name: "n-title",
    props: {
      type: String
    }
  };

  /* script */
  const __vue_script__$2 = script$2;

  /* template */
  var __vue_render__$2 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { staticClass: "n-title" },
      [
        _c(
          "el-breadcrumb",
          { attrs: { separator: "/" } },
          [_c("el-breadcrumb-item", [_vm._t("default")], 2)],
          1
        ),
        _vm._v(" "),
        _c("div", { staticClass: "n-title-right" }, [_vm._t("right")], 2)
      ],
      1
    )
  };
  var __vue_staticRenderFns__$2 = [];
  __vue_render__$2._withStripped = true;

    /* style */
    const __vue_inject_styles__$2 = undefined;
    /* scoped */
    const __vue_scope_id__$2 = undefined;
    /* module identifier */
    const __vue_module_identifier__$2 = undefined;
    /* functional template */
    const __vue_is_functional_template__$2 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$2 = normalizeComponent(
      { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
      __vue_inject_styles__$2,
      __vue_script__$2,
      __vue_scope_id__$2,
      __vue_is_functional_template__$2,
      __vue_module_identifier__$2,
      false,
      undefined,
      undefined,
      undefined
    );

  __vue_component__$2.install = function (Vue) {
    Vue.component(__vue_component__$2.name, __vue_component__$2);
  };

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function commonjsRequire () {
  	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
  }

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var dom = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;
  exports.isInContainer = exports.getScrollContainer = exports.isScroll = exports.getStyle = exports.once = exports.off = exports.on = undefined;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* istanbul ignore next */

  exports.hasClass = hasClass;
  exports.addClass = addClass;
  exports.removeClass = removeClass;
  exports.setStyle = setStyle;



  var _vue2 = _interopRequireDefault(Vue);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var isServer = _vue2.default.prototype.$isServer;
  var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
  var MOZ_HACK_REGEXP = /^moz([A-Z])/;
  var ieVersion = isServer ? 0 : Number(document.documentMode);

  /* istanbul ignore next */
  var trim = function trim(string) {
    return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
  };
  /* istanbul ignore next */
  var camelCase = function camelCase(name) {
    return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
      return offset ? letter.toUpperCase() : letter;
    }).replace(MOZ_HACK_REGEXP, 'Moz$1');
  };

  /* istanbul ignore next */
  var on = exports.on = function () {
    if (!isServer && document.addEventListener) {
      return function (element, event, handler) {
        if (element && event && handler) {
          element.addEventListener(event, handler, false);
        }
      };
    } else {
      return function (element, event, handler) {
        if (element && event && handler) {
          element.attachEvent('on' + event, handler);
        }
      };
    }
  }();

  /* istanbul ignore next */
  var off = exports.off = function () {
    if (!isServer && document.removeEventListener) {
      return function (element, event, handler) {
        if (element && event) {
          element.removeEventListener(event, handler, false);
        }
      };
    } else {
      return function (element, event, handler) {
        if (element && event) {
          element.detachEvent('on' + event, handler);
        }
      };
    }
  }();

  /* istanbul ignore next */
  var once = exports.once = function once(el, event, fn) {
    var listener = function listener() {
      if (fn) {
        fn.apply(this, arguments);
      }
      off(el, event, listener);
    };
    on(el, event, listener);
  };

  /* istanbul ignore next */
  function hasClass(el, cls) {
    if (!el || !cls) return false;
    if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
    if (el.classList) {
      return el.classList.contains(cls);
    } else {
      return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
  }
  /* istanbul ignore next */
  function addClass(el, cls) {
    if (!el) return;
    var curClass = el.className;
    var classes = (cls || '').split(' ');

    for (var i = 0, j = classes.length; i < j; i++) {
      var clsName = classes[i];
      if (!clsName) continue;

      if (el.classList) {
        el.classList.add(clsName);
      } else if (!hasClass(el, clsName)) {
        curClass += ' ' + clsName;
      }
    }
    if (!el.classList) {
      el.className = curClass;
    }
  }
  /* istanbul ignore next */
  function removeClass(el, cls) {
    if (!el || !cls) return;
    var classes = cls.split(' ');
    var curClass = ' ' + el.className + ' ';

    for (var i = 0, j = classes.length; i < j; i++) {
      var clsName = classes[i];
      if (!clsName) continue;

      if (el.classList) {
        el.classList.remove(clsName);
      } else if (hasClass(el, clsName)) {
        curClass = curClass.replace(' ' + clsName + ' ', ' ');
      }
    }
    if (!el.classList) {
      el.className = trim(curClass);
    }
  }
  /* istanbul ignore next */
  var getStyle = exports.getStyle = ieVersion < 9 ? function (element, styleName) {
    if (isServer) return;
    if (!element || !styleName) return null;
    styleName = camelCase(styleName);
    if (styleName === 'float') {
      styleName = 'styleFloat';
    }
    try {
      switch (styleName) {
        case 'opacity':
          try {
            return element.filters.item('alpha').opacity / 100;
          } catch (e) {
            return 1.0;
          }
        default:
          return element.style[styleName] || element.currentStyle ? element.currentStyle[styleName] : null;
      }
    } catch (e) {
      return element.style[styleName];
    }
  } : function (element, styleName) {
    if (isServer) return;
    if (!element || !styleName) return null;
    styleName = camelCase(styleName);
    if (styleName === 'float') {
      styleName = 'cssFloat';
    }
    try {
      var computed = document.defaultView.getComputedStyle(element, '');
      return element.style[styleName] || computed ? computed[styleName] : null;
    } catch (e) {
      return element.style[styleName];
    }
  };

  /* istanbul ignore next */
  function setStyle(element, styleName, value) {
    if (!element || !styleName) return;

    if ((typeof styleName === 'undefined' ? 'undefined' : _typeof(styleName)) === 'object') {
      for (var prop in styleName) {
        if (styleName.hasOwnProperty(prop)) {
          setStyle(element, prop, styleName[prop]);
        }
      }
    } else {
      styleName = camelCase(styleName);
      if (styleName === 'opacity' && ieVersion < 9) {
        element.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value * 100 + ')';
      } else {
        element.style[styleName] = value;
      }
    }
  }
  var isScroll = exports.isScroll = function isScroll(el, vertical) {
    if (isServer) return;

    var determinedDirection = vertical !== null || vertical !== undefined;
    var overflow = determinedDirection ? vertical ? getStyle(el, 'overflow-y') : getStyle(el, 'overflow-x') : getStyle(el, 'overflow');

    return overflow.match(/(scroll|auto)/);
  };

  var getScrollContainer = exports.getScrollContainer = function getScrollContainer(el, vertical) {
    if (isServer) return;

    var parent = el;
    while (parent) {
      if ([window, document, document.documentElement].includes(parent)) {
        return window;
      }
      if (isScroll(parent, vertical)) {
        return parent;
      }
      parent = parent.parentNode;
    }

    return parent;
  };

  var isInContainer = exports.isInContainer = function isInContainer(el, container) {
    if (isServer || !el || !container) return false;

    var elRect = el.getBoundingClientRect();
    var containerRect = void 0;

    if ([window, document, document.documentElement, null, undefined].includes(container)) {
      containerRect = {
        top: 0,
        right: window.innerWidth,
        bottom: window.innerHeight,
        left: 0
      };
    } else {
      containerRect = container.getBoundingClientRect();
    }

    return elRect.top < containerRect.bottom && elRect.bottom > containerRect.top && elRect.right > containerRect.left && elRect.left < containerRect.right;
  };
  });

  unwrapExports(dom);
  var dom_1 = dom.isInContainer;
  var dom_2 = dom.getScrollContainer;
  var dom_3 = dom.isScroll;
  var dom_4 = dom.getStyle;
  var dom_5 = dom.once;
  var dom_6 = dom.off;
  var dom_7 = dom.on;
  var dom_8 = dom.hasClass;
  var dom_9 = dom.addClass;
  var dom_10 = dom.removeClass;
  var dom_11 = dom.setStyle;

  var popupManager = createCommonjsModule(function (module, exports) {

  exports.__esModule = true;



  var _vue2 = _interopRequireDefault(Vue);



  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var hasModal = false;
  var hasInitZIndex = false;
  var zIndex = void 0;

  var getModal = function getModal() {
    if (_vue2.default.prototype.$isServer) return;
    var modalDom = PopupManager.modalDom;
    if (modalDom) {
      hasModal = true;
    } else {
      hasModal = false;
      modalDom = document.createElement('div');
      PopupManager.modalDom = modalDom;

      modalDom.addEventListener('touchmove', function (event) {
        event.preventDefault();
        event.stopPropagation();
      });

      modalDom.addEventListener('click', function () {
        PopupManager.doOnModalClick && PopupManager.doOnModalClick();
      });
    }

    return modalDom;
  };

  var instances = {};

  var PopupManager = {
    modalFade: true,

    getInstance: function getInstance(id) {
      return instances[id];
    },

    register: function register(id, instance) {
      if (id && instance) {
        instances[id] = instance;
      }
    },

    deregister: function deregister(id) {
      if (id) {
        instances[id] = null;
        delete instances[id];
      }
    },

    nextZIndex: function nextZIndex() {
      return PopupManager.zIndex++;
    },

    modalStack: [],

    doOnModalClick: function doOnModalClick() {
      var topItem = PopupManager.modalStack[PopupManager.modalStack.length - 1];
      if (!topItem) return;

      var instance = PopupManager.getInstance(topItem.id);
      if (instance && instance.closeOnClickModal) {
        instance.close();
      }
    },

    openModal: function openModal(id, zIndex, dom$1, modalClass, modalFade) {
      if (_vue2.default.prototype.$isServer) return;
      if (!id || zIndex === undefined) return;
      this.modalFade = modalFade;

      var modalStack = this.modalStack;

      for (var i = 0, j = modalStack.length; i < j; i++) {
        var item = modalStack[i];
        if (item.id === id) {
          return;
        }
      }

      var modalDom = getModal();

      (0, dom.addClass)(modalDom, 'v-modal');
      if (this.modalFade && !hasModal) {
        (0, dom.addClass)(modalDom, 'v-modal-enter');
      }
      if (modalClass) {
        var classArr = modalClass.trim().split(/\s+/);
        classArr.forEach(function (item) {
          return (0, dom.addClass)(modalDom, item);
        });
      }
      setTimeout(function () {
        (0, dom.removeClass)(modalDom, 'v-modal-enter');
      }, 200);

      if (dom$1 && dom$1.parentNode && dom$1.parentNode.nodeType !== 11) {
        dom$1.parentNode.appendChild(modalDom);
      } else {
        document.body.appendChild(modalDom);
      }

      if (zIndex) {
        modalDom.style.zIndex = zIndex;
      }
      modalDom.tabIndex = 0;
      modalDom.style.display = '';

      this.modalStack.push({ id: id, zIndex: zIndex, modalClass: modalClass });
    },

    closeModal: function closeModal(id) {
      var modalStack = this.modalStack;
      var modalDom = getModal();

      if (modalStack.length > 0) {
        var topItem = modalStack[modalStack.length - 1];
        if (topItem.id === id) {
          if (topItem.modalClass) {
            var classArr = topItem.modalClass.trim().split(/\s+/);
            classArr.forEach(function (item) {
              return (0, dom.removeClass)(modalDom, item);
            });
          }

          modalStack.pop();
          if (modalStack.length > 0) {
            modalDom.style.zIndex = modalStack[modalStack.length - 1].zIndex;
          }
        } else {
          for (var i = modalStack.length - 1; i >= 0; i--) {
            if (modalStack[i].id === id) {
              modalStack.splice(i, 1);
              break;
            }
          }
        }
      }

      if (modalStack.length === 0) {
        if (this.modalFade) {
          (0, dom.addClass)(modalDom, 'v-modal-leave');
        }
        setTimeout(function () {
          if (modalStack.length === 0) {
            if (modalDom.parentNode) modalDom.parentNode.removeChild(modalDom);
            modalDom.style.display = 'none';
            PopupManager.modalDom = undefined;
          }
          (0, dom.removeClass)(modalDom, 'v-modal-leave');
        }, 200);
      }
    }
  };

  Object.defineProperty(PopupManager, 'zIndex', {
    configurable: true,
    get: function get() {
      if (!hasInitZIndex) {
        zIndex = zIndex || (_vue2.default.prototype.$ELEMENT || {}).zIndex || 2000;
        hasInitZIndex = true;
      }
      return zIndex;
    },
    set: function set(value) {
      zIndex = value;
    }
  });

  var getTopPopup = function getTopPopup() {
    if (_vue2.default.prototype.$isServer) return;
    if (PopupManager.modalStack.length > 0) {
      var topPopup = PopupManager.modalStack[PopupManager.modalStack.length - 1];
      if (!topPopup) return;
      var instance = PopupManager.getInstance(topPopup.id);

      return instance;
    }
  };

  if (!_vue2.default.prototype.$isServer) {
    // handle `esc` key when the popup is shown
    window.addEventListener('keydown', function (event) {
      if (event.keyCode === 27) {
        var topPopup = getTopPopup();

        if (topPopup && topPopup.closeOnPressEscape) {
          topPopup.handleClose ? topPopup.handleClose() : topPopup.handleAction ? topPopup.handleAction('cancel') : topPopup.close();
        }
      }
    });
  }

  exports.default = PopupManager;
  });

  var PopupManager = unwrapExports(popupManager);

  //
  var script$3 = {
    name: "n-dialog",
    model: {
      prop: "visible",
      event: "change"
    },
    props: {
      transitionName: {
        type: String,
        "default": "el-zoom-in-top"
      },
      title: {
        type: String,
        "default": "标题"
      },
      visible: {
        type: Boolean,
        "default": false
      },
      appendToBody: {
        type: Boolean,
        "default": true
      },
      showHeader: {
        type: Boolean,
        "default": true
      },
      keepAlive: {
        type: Boolean,
        "default": false
      }
    },
    data: function data() {
      return {
        zIndex: 1
      };
    },
    computed: {
      renderEveryTime: function renderEveryTime() {
        if (this.keepAlive) {
          return true;
        } else {
          return this.visible;
        }
      }
    },
    watch: {
      visible: function visible(val) {
        if (val) {
          this.openPanel();
        }
      }
    },
    mounted: function mounted() {
      if (this.appendToBody) {
        document.body.appendChild(this.$el);
      }

      if (this.visible === true) {
        this.openPanel();
      }
    },
    destroyed: function destroyed() {
      if (this.appendToBody) {
        document.body.removeChild(this.$el);
      }
    },
    methods: {
      openPanel: function openPanel() {
        if (this.visible === true) {
          this.zIndex = PopupManager.nextZIndex();
        }
      },
      closePanel: function closePanel() {
        this.$emit("change", false);
      }
    }
  };

  /* script */
  const __vue_script__$3 = script$3;

  /* template */
  var __vue_render__$3 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("transition", { attrs: { name: _vm.transitionName } }, [
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.visible,
              expression: "visible"
            }
          ],
          staticClass: "n-dialog-mask",
          style: { zIndex: _vm.zIndex }
        },
        [
          _vm.renderEveryTime
            ? _c("div", { staticClass: "n-dialog" }, [
                _vm.showHeader
                  ? _c("div", { staticClass: "n-dialog-header" }, [
                      _vm._v("\n        " + _vm._s(_vm.title) + "\n        "),
                      _c("i", {
                        staticClass: "n-dialog-close el-icon-close",
                        on: { click: _vm.closePanel }
                      })
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "n-dialog-body" },
                  [_vm._t("default")],
                  2
                )
              ])
            : _vm._e()
        ]
      )
    ])
  };
  var __vue_staticRenderFns__$3 = [];
  __vue_render__$3._withStripped = true;

    /* style */
    const __vue_inject_styles__$3 = undefined;
    /* scoped */
    const __vue_scope_id__$3 = undefined;
    /* module identifier */
    const __vue_module_identifier__$3 = undefined;
    /* functional template */
    const __vue_is_functional_template__$3 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$3 = normalizeComponent(
      { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
      __vue_inject_styles__$3,
      __vue_script__$3,
      __vue_scope_id__$3,
      __vue_is_functional_template__$3,
      __vue_module_identifier__$3,
      false,
      undefined,
      undefined,
      undefined
    );

  __vue_component__$3.install = function (Vue) {
    Vue.component(__vue_component__$3.name, __vue_component__$3);
  };

  var _typeof_1 = createCommonjsModule(function (module) {
  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      module.exports = _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      module.exports = _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  module.exports = _typeof;
  });

  var fmt = {
    /**
     * 格式化日期
     * @param {any} date
     * @param {string} [format='yyyy-MM-dd hh:mm:ss']
     * @returns
     */
    date: function date(_date, format) {
      if (!_date) {
        return _date;
      } else if (_date instanceof Date) {
        return fmt.dateFormat(_date, format);
      } else if (/^\d+$/.test(_date)) {
        // java格式的timestamp
        return fmt.dateFormat(new Date(_date), format);
      } else if (_typeof_1(_date) === 'object' && _date.time) {
        // java格式的日期object
        return fmt.dateFormat(new Date(_date.time), format);
      } else if (/date/i.test(_date)) {
        // .net格式的timestamp
        return fmt.dateFormat(new Date(_date.match(/\d+/)[0]), format);
      } else if (_date && typeof _date === 'string' && /\.\d$/.test(_date)) {
        // mysql字符串格式转化
        return fmt.dateFormat(new Date(_date.replace(/\.\d$/, '').replace(/-/g, '/')), format);
      }

      return _date;
    },

    /**
     * 格式化日期
     * @param {any} date
     * @param {any} format
     * @returns
     */
    dateFormat: function dateFormat(date, format) {
      var o = {
        'M+': date.getMonth() + 1,
        // month
        'd+': date.getDate(),
        // day
        'h+': date.getHours(),
        // hour
        'm+': date.getMinutes(),
        // minute
        's+': date.getSeconds(),
        // second
        'q+': Math.floor((date.getMonth() + 3) / 3),
        // quarter
        'S': date.getMilliseconds() // millisecond

      };

      if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
      }

      for (var k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
          format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
        }
      }

      return format;
    },

    /**
     * 取对象的值
     * @param {any} obj
     * @param {any} key
     * @param {any} defaultValue
     * @returns
     */
    value: function value(key, obj, defaultValue) {
      if (defaultValue == null) {
        defaultValue = '';
      }

      if (_typeof_1(key) === 'object') {
        key = arguments[1];
        obj = arguments[0];
      }

      obj = obj || {};
      var value = obj[key];
      return value == null ? defaultValue : value;
    },

    /**
     * 取对象深层属性的值
     * @param {any} propStr
     * @param {any} obj
     * @param {string} [defaultValue='']
     * @returns
     */
    prop: function prop(propStr, obj) {
      var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      if (typeof propStr !== 'string') {
        propStr = arguments[1];
        obj = arguments[0];
      }

      var props = propStr.split('.');
      var target = obj || {};

      for (var i = 0, l = props.length; i < l; i++) {
        if ((target = target[props[i]]) == null) {
          return defaultValue;
        }
      }

      return target;
    }
  };

  /*
   * @Author: nutter
   * @Date: 2020-05-28 11:19:27
   * @LastEditors: nutter
   * @LastEditTime: 2020-08-19 11:14:13
   * @FilePath: \nutter-ui\packages\utils\src\eachOwn.js
   */

  /**
   * 遍历对象的自有属性
   * @param obj 对象
   * @param fn 回调函数，fn(obj[key], key, obj)
   */
  var eachOwn = (function (obj, fn) {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn(obj[key], key, obj);
      }
    }
  });

  /**
   * call or apply
   * @param context 执行上下文
   * @param fn 函数
   * @param argsArr 参数数组
   */
  var callOrApply = (function (context, fn, argsArr) {
    if (argsArr.length <= 2) {
      fn.call(context, argsArr[0], argsArr[1]);
    } else {
      fn.apply(context, argsArr);
    }
  });

  /**
   * 是否为IE
   */
  var isIE = /msie/i.test(navigator.userAgent) && !window.opera;

  /*
   * @Author: nutter
   * @Date: 2020-05-28 11:19:27
   * @LastEditors: nutter
   * @LastEditTime: 2020-08-19 11:14:31
   * @FilePath: \nutter-ui\packages\utils\src\requireContext.js
   */
  var flatRequireContext = function flatRequireContext(context) {
    return Object.assign({}, context, context["default"] || {});
  };
  /**
   * 将require.context读取的模块数组化
   * @param {*} requireContext require.context()
   * @param {*} excludeObjKeyOrArr 排除的context
   * @param {*} flatContext 展开export default
   */


  var requireContext = function requireContext(_requireContext) {
    var excludeObjKeyOrArr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var flatContext = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    if (!Array.isArray(excludeObjKeyOrArr)) {
      excludeObjKeyOrArr = [excludeObjKeyOrArr];
    }

    return _requireContext.keys().filter(function (key) {
      return excludeObjKeyOrArr.indexOf(key) === -1;
    }).map(function (key) {
      var context = _requireContext(key);

      return flatContext ? flatRequireContext(context) : context;
    });
  };
  /**
   * 将require.context读取的模块对象话
   * @param {*} requireContext require.context()
   * @param {*} excludeObjKeyOrArr 排除的context
   * @param {*} flatContext 展开export default
   */


  var requireContextToObj = function requireContextToObj(requireContext) {
    var excludeObjKeyOrArr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var flatContext = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    if (!Array.isArray(excludeObjKeyOrArr)) {
      excludeObjKeyOrArr = [excludeObjKeyOrArr];
    }

    var requireContextObj = {};
    requireContext.keys().filter(function (key) {
      return excludeObjKeyOrArr.indexOf(key) === -1;
    }).forEach(function (key) {
      var context = requireContext(key);
      requireContextObj[key.replace(/^\.\//, '').replace(/\.js$/, '')] = flatContext ? flatRequireContext(context) : context;
    });
    return requireContextObj;
  };

  /*
   * @Author: nutter
   * @Date: 2020-08-21 16:14:12
   * @LastEditors: nutter
   * @LastEditTime: 2020-08-21 16:53:48
   * @FilePath: \nutter-ui\packages\utils\src\type.js
   */
  var toString = Object.prototype.toString;

  var class2type = function () {
    var types = {};
    'Boolean Number String Function Array Date RegExp Object Error Symbol'.split(' ').forEach(function (name) {
      types["[object ".concat(name, "]")] = name.toLowerCase();
    });
    return types;
  }();
  /**
   * 取得obj的数据类型， boolean/number/string/function/array/date/regexp/object/error/symbol
   * @param obj
   */


  var type = (function (obj) {
    if (obj == null) {
      return String(obj);
    }

    return _typeof_1(obj) === 'object' || typeof obj === 'function' ? class2type[toString.call(obj)] || 'object' : _typeof_1(obj);
  });

  /*
   * @Author: nutter
   * @Date: 2020-08-21 16:14:02
   * @LastEditors: nutter
   * @LastEditTime: 2020-08-21 16:16:38
   * @FilePath: \nutter-ui\packages\utils\src\propertyNamingStrategy.js
   */
  /**
   * 字符串转驼峰
   * @param {*} str
   */

  var strToHump = function strToHump(str) {
    return str && typeof str === 'string' ? str.replace(/_([a-z])/g, function (all, letter) {
      return letter.toUpperCase();
    }) : String(str);
  };
  /**
   * 字符串转下划线
   * @param {*} str
   */


  var strToUnderline = function strToUnderline(str) {
    return str && typeof str === 'string' ? str.replace(/([A-Z])/g, '_$1').toLowerCase() : String(str);
  };
  /**
   * 对象key转驼峰
   * @param {*} data
   */


  var dataToHump = function dataToHump(data) {
    switch (type(data)) {
      case 'object':
        {
          var newData = {};
          eachOwn(data, function (value, name) {
            newData[strToHump(name)] = dataToHump(value);
          });
          return newData;
        }

      case 'array':
        return data.map(function (v) {
          return dataToHump(v);
        });

      default:
        return data;
    }
  };
  /**
   * 对象key转下环线
   * @param {*} data
   */


  var dataToUnderline = function dataToUnderline(data) {
    switch (type(data)) {
      case 'object':
        {
          var newData = [];
          eachOwn(data, function (value, name) {
            newData[strToUnderline(name)] = dataToUnderline(value);
          });
          return newData;
        }

      case 'array':
        return data.map(function (v) {
          return dataToUnderline(v);
        });

      default:
        return data;
    }
  };

  /**
   * 将options的 key-value 扩展为 key-{default: value}
   * 方便配置组件的props默认值
   */

  var expandToDefaultProps = (function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var props = {};
    eachOwn(options, function (value, key) {
      props[key] = {
        "default": value
      };
    });
    return props;
  });

  /*
   * @Author: nutter
   * @Date: 2020-08-19 14:41:18
   * @LastEditors: nutter
   * @LastEditTime: 2020-08-19 18:31:08
   * @FilePath: \nutter-ui\packages\utils\src\restructureVueCtor.js
   */
  // 改变原构造器

  var restructureVueCtor = function restructureVueCtor(originalCtor) {
    var additionalOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return Vue.extend(true, originalCtor, additionalOptions);
  }; // 扩展options上的配置为Vue构造器的默认props值


  var restructureDefaultPropsOfVueCtorFromOptions = function restructureDefaultPropsOfVueCtorFromOptions(originalCtor) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return restructureVueCtor(originalCtor, {
      props: expandToDefaultProps(options)
    });
  };

  var applicationFormRegs = [/^application\/x-www-form-urlencoded/i, /^application\/form/i, /^form/i];
  /**
   * 是否为application/x-www-form-urlencoded格式
   * @param contentType
   */

  var isApplicationForm = (function (contentType) {
    return contentType && applicationFormRegs.some(function (applicationFormReg) {
      return applicationFormReg.test(contentType);
    });
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var classCallCheck = _classCallCheck;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var createClass = _createClass;

  var model = ['abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', '1234567890'];
  /**
   * 取得[最小值， 最大值]之间的随机数
   * @param {*} min 最小值
   * @param {*} max 最大值
   */

  var randRange = function randRange(min, max) {
    return Math.floor(Math.max(min, Math.random() * (max + 1)));
  };
  /**
   * 根据数据模生成随机字符串
   * @param len 字符串长度
   */

  var randText = (function (len) {
    var text = '';
    var modelLength = model.length - 1;

    while (len--) {
      var step = randRange(0, modelLength);
      text += model[step].charAt(randRange(0, model[step].length));
    }

    return text;
  });

  var require$$0 = {};

  var core = createCommonjsModule(function (module, exports) {
  (function (root, factory) {
  	{
  		// CommonJS
  		module.exports = exports = factory();
  	}
  }(commonjsGlobal, function () {

  	/*globals window, global, require*/

  	/**
  	 * CryptoJS core components.
  	 */
  	var CryptoJS = CryptoJS || (function (Math, undefined$1) {

  	    var crypto;

  	    // Native crypto from window (Browser)
  	    if (typeof window !== 'undefined' && window.crypto) {
  	        crypto = window.crypto;
  	    }

  	    // Native (experimental IE 11) crypto from window (Browser)
  	    if (!crypto && typeof window !== 'undefined' && window.msCrypto) {
  	        crypto = window.msCrypto;
  	    }

  	    // Native crypto from global (NodeJS)
  	    if (!crypto && typeof commonjsGlobal !== 'undefined' && commonjsGlobal.crypto) {
  	        crypto = commonjsGlobal.crypto;
  	    }

  	    // Native crypto import via require (NodeJS)
  	    if (!crypto && typeof commonjsRequire === 'function') {
  	        try {
  	            crypto = require$$0;
  	        } catch (err) {}
  	    }

  	    /*
  	     * Cryptographically secure pseudorandom number generator
  	     *
  	     * As Math.random() is cryptographically not safe to use
  	     */
  	    var cryptoSecureRandomInt = function () {
  	        if (crypto) {
  	            // Use getRandomValues method (Browser)
  	            if (typeof crypto.getRandomValues === 'function') {
  	                try {
  	                    return crypto.getRandomValues(new Uint32Array(1))[0];
  	                } catch (err) {}
  	            }

  	            // Use randomBytes method (NodeJS)
  	            if (typeof crypto.randomBytes === 'function') {
  	                try {
  	                    return crypto.randomBytes(4).readInt32LE();
  	                } catch (err) {}
  	            }
  	        }

  	        throw new Error('Native crypto module could not be used to get secure random number.');
  	    };

  	    /*
  	     * Local polyfill of Object.create

  	     */
  	    var create = Object.create || (function () {
  	        function F() {}

  	        return function (obj) {
  	            var subtype;

  	            F.prototype = obj;

  	            subtype = new F();

  	            F.prototype = null;

  	            return subtype;
  	        };
  	    }());

  	    /**
  	     * CryptoJS namespace.
  	     */
  	    var C = {};

  	    /**
  	     * Library namespace.
  	     */
  	    var C_lib = C.lib = {};

  	    /**
  	     * Base object for prototypal inheritance.
  	     */
  	    var Base = C_lib.Base = (function () {


  	        return {
  	            /**
  	             * Creates a new object that inherits from this object.
  	             *
  	             * @param {Object} overrides Properties to copy into the new object.
  	             *
  	             * @return {Object} The new object.
  	             *
  	             * @static
  	             *
  	             * @example
  	             *
  	             *     var MyType = CryptoJS.lib.Base.extend({
  	             *         field: 'value',
  	             *
  	             *         method: function () {
  	             *         }
  	             *     });
  	             */
  	            extend: function (overrides) {
  	                // Spawn
  	                var subtype = create(this);

  	                // Augment
  	                if (overrides) {
  	                    subtype.mixIn(overrides);
  	                }

  	                // Create default initializer
  	                if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
  	                    subtype.init = function () {
  	                        subtype.$super.init.apply(this, arguments);
  	                    };
  	                }

  	                // Initializer's prototype is the subtype object
  	                subtype.init.prototype = subtype;

  	                // Reference supertype
  	                subtype.$super = this;

  	                return subtype;
  	            },

  	            /**
  	             * Extends this object and runs the init method.
  	             * Arguments to create() will be passed to init().
  	             *
  	             * @return {Object} The new object.
  	             *
  	             * @static
  	             *
  	             * @example
  	             *
  	             *     var instance = MyType.create();
  	             */
  	            create: function () {
  	                var instance = this.extend();
  	                instance.init.apply(instance, arguments);

  	                return instance;
  	            },

  	            /**
  	             * Initializes a newly created object.
  	             * Override this method to add some logic when your objects are created.
  	             *
  	             * @example
  	             *
  	             *     var MyType = CryptoJS.lib.Base.extend({
  	             *         init: function () {
  	             *             // ...
  	             *         }
  	             *     });
  	             */
  	            init: function () {
  	            },

  	            /**
  	             * Copies properties into this object.
  	             *
  	             * @param {Object} properties The properties to mix in.
  	             *
  	             * @example
  	             *
  	             *     MyType.mixIn({
  	             *         field: 'value'
  	             *     });
  	             */
  	            mixIn: function (properties) {
  	                for (var propertyName in properties) {
  	                    if (properties.hasOwnProperty(propertyName)) {
  	                        this[propertyName] = properties[propertyName];
  	                    }
  	                }

  	                // IE won't copy toString using the loop above
  	                if (properties.hasOwnProperty('toString')) {
  	                    this.toString = properties.toString;
  	                }
  	            },

  	            /**
  	             * Creates a copy of this object.
  	             *
  	             * @return {Object} The clone.
  	             *
  	             * @example
  	             *
  	             *     var clone = instance.clone();
  	             */
  	            clone: function () {
  	                return this.init.prototype.extend(this);
  	            }
  	        };
  	    }());

  	    /**
  	     * An array of 32-bit words.
  	     *
  	     * @property {Array} words The array of 32-bit words.
  	     * @property {number} sigBytes The number of significant bytes in this word array.
  	     */
  	    var WordArray = C_lib.WordArray = Base.extend({
  	        /**
  	         * Initializes a newly created word array.
  	         *
  	         * @param {Array} words (Optional) An array of 32-bit words.
  	         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
  	         *
  	         * @example
  	         *
  	         *     var wordArray = CryptoJS.lib.WordArray.create();
  	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
  	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
  	         */
  	        init: function (words, sigBytes) {
  	            words = this.words = words || [];

  	            if (sigBytes != undefined$1) {
  	                this.sigBytes = sigBytes;
  	            } else {
  	                this.sigBytes = words.length * 4;
  	            }
  	        },

  	        /**
  	         * Converts this word array to a string.
  	         *
  	         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
  	         *
  	         * @return {string} The stringified word array.
  	         *
  	         * @example
  	         *
  	         *     var string = wordArray + '';
  	         *     var string = wordArray.toString();
  	         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
  	         */
  	        toString: function (encoder) {
  	            return (encoder || Hex).stringify(this);
  	        },

  	        /**
  	         * Concatenates a word array to this word array.
  	         *
  	         * @param {WordArray} wordArray The word array to append.
  	         *
  	         * @return {WordArray} This word array.
  	         *
  	         * @example
  	         *
  	         *     wordArray1.concat(wordArray2);
  	         */
  	        concat: function (wordArray) {
  	            // Shortcuts
  	            var thisWords = this.words;
  	            var thatWords = wordArray.words;
  	            var thisSigBytes = this.sigBytes;
  	            var thatSigBytes = wordArray.sigBytes;

  	            // Clamp excess bits
  	            this.clamp();

  	            // Concat
  	            if (thisSigBytes % 4) {
  	                // Copy one byte at a time
  	                for (var i = 0; i < thatSigBytes; i++) {
  	                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
  	                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
  	                }
  	            } else {
  	                // Copy one word at a time
  	                for (var i = 0; i < thatSigBytes; i += 4) {
  	                    thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
  	                }
  	            }
  	            this.sigBytes += thatSigBytes;

  	            // Chainable
  	            return this;
  	        },

  	        /**
  	         * Removes insignificant bits.
  	         *
  	         * @example
  	         *
  	         *     wordArray.clamp();
  	         */
  	        clamp: function () {
  	            // Shortcuts
  	            var words = this.words;
  	            var sigBytes = this.sigBytes;

  	            // Clamp
  	            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
  	            words.length = Math.ceil(sigBytes / 4);
  	        },

  	        /**
  	         * Creates a copy of this word array.
  	         *
  	         * @return {WordArray} The clone.
  	         *
  	         * @example
  	         *
  	         *     var clone = wordArray.clone();
  	         */
  	        clone: function () {
  	            var clone = Base.clone.call(this);
  	            clone.words = this.words.slice(0);

  	            return clone;
  	        },

  	        /**
  	         * Creates a word array filled with random bytes.
  	         *
  	         * @param {number} nBytes The number of random bytes to generate.
  	         *
  	         * @return {WordArray} The random word array.
  	         *
  	         * @static
  	         *
  	         * @example
  	         *
  	         *     var wordArray = CryptoJS.lib.WordArray.random(16);
  	         */
  	        random: function (nBytes) {
  	            var words = [];

  	            for (var i = 0; i < nBytes; i += 4) {
  	                words.push(cryptoSecureRandomInt());
  	            }

  	            return new WordArray.init(words, nBytes);
  	        }
  	    });

  	    /**
  	     * Encoder namespace.
  	     */
  	    var C_enc = C.enc = {};

  	    /**
  	     * Hex encoding strategy.
  	     */
  	    var Hex = C_enc.Hex = {
  	        /**
  	         * Converts a word array to a hex string.
  	         *
  	         * @param {WordArray} wordArray The word array.
  	         *
  	         * @return {string} The hex string.
  	         *
  	         * @static
  	         *
  	         * @example
  	         *
  	         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
  	         */
  	        stringify: function (wordArray) {
  	            // Shortcuts
  	            var words = wordArray.words;
  	            var sigBytes = wordArray.sigBytes;

  	            // Convert
  	            var hexChars = [];
  	            for (var i = 0; i < sigBytes; i++) {
  	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
  	                hexChars.push((bite >>> 4).toString(16));
  	                hexChars.push((bite & 0x0f).toString(16));
  	            }

  	            return hexChars.join('');
  	        },

  	        /**
  	         * Converts a hex string to a word array.
  	         *
  	         * @param {string} hexStr The hex string.
  	         *
  	         * @return {WordArray} The word array.
  	         *
  	         * @static
  	         *
  	         * @example
  	         *
  	         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
  	         */
  	        parse: function (hexStr) {
  	            // Shortcut
  	            var hexStrLength = hexStr.length;

  	            // Convert
  	            var words = [];
  	            for (var i = 0; i < hexStrLength; i += 2) {
  	                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
  	            }

  	            return new WordArray.init(words, hexStrLength / 2);
  	        }
  	    };

  	    /**
  	     * Latin1 encoding strategy.
  	     */
  	    var Latin1 = C_enc.Latin1 = {
  	        /**
  	         * Converts a word array to a Latin1 string.
  	         *
  	         * @param {WordArray} wordArray The word array.
  	         *
  	         * @return {string} The Latin1 string.
  	         *
  	         * @static
  	         *
  	         * @example
  	         *
  	         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
  	         */
  	        stringify: function (wordArray) {
  	            // Shortcuts
  	            var words = wordArray.words;
  	            var sigBytes = wordArray.sigBytes;

  	            // Convert
  	            var latin1Chars = [];
  	            for (var i = 0; i < sigBytes; i++) {
  	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
  	                latin1Chars.push(String.fromCharCode(bite));
  	            }

  	            return latin1Chars.join('');
  	        },

  	        /**
  	         * Converts a Latin1 string to a word array.
  	         *
  	         * @param {string} latin1Str The Latin1 string.
  	         *
  	         * @return {WordArray} The word array.
  	         *
  	         * @static
  	         *
  	         * @example
  	         *
  	         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
  	         */
  	        parse: function (latin1Str) {
  	            // Shortcut
  	            var latin1StrLength = latin1Str.length;

  	            // Convert
  	            var words = [];
  	            for (var i = 0; i < latin1StrLength; i++) {
  	                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
  	            }

  	            return new WordArray.init(words, latin1StrLength);
  	        }
  	    };

  	    /**
  	     * UTF-8 encoding strategy.
  	     */
  	    var Utf8 = C_enc.Utf8 = {
  	        /**
  	         * Converts a word array to a UTF-8 string.
  	         *
  	         * @param {WordArray} wordArray The word array.
  	         *
  	         * @return {string} The UTF-8 string.
  	         *
  	         * @static
  	         *
  	         * @example
  	         *
  	         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
  	         */
  	        stringify: function (wordArray) {
  	            try {
  	                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
  	            } catch (e) {
  	                throw new Error('Malformed UTF-8 data');
  	            }
  	        },

  	        /**
  	         * Converts a UTF-8 string to a word array.
  	         *
  	         * @param {string} utf8Str The UTF-8 string.
  	         *
  	         * @return {WordArray} The word array.
  	         *
  	         * @static
  	         *
  	         * @example
  	         *
  	         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
  	         */
  	        parse: function (utf8Str) {
  	            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
  	        }
  	    };

  	    /**
  	     * Abstract buffered block algorithm template.
  	     *
  	     * The property blockSize must be implemented in a concrete subtype.
  	     *
  	     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
  	     */
  	    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
  	        /**
  	         * Resets this block algorithm's data buffer to its initial state.
  	         *
  	         * @example
  	         *
  	         *     bufferedBlockAlgorithm.reset();
  	         */
  	        reset: function () {
  	            // Initial values
  	            this._data = new WordArray.init();
  	            this._nDataBytes = 0;
  	        },

  	        /**
  	         * Adds new data to this block algorithm's buffer.
  	         *
  	         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
  	         *
  	         * @example
  	         *
  	         *     bufferedBlockAlgorithm._append('data');
  	         *     bufferedBlockAlgorithm._append(wordArray);
  	         */
  	        _append: function (data) {
  	            // Convert string to WordArray, else assume WordArray already
  	            if (typeof data == 'string') {
  	                data = Utf8.parse(data);
  	            }

  	            // Append
  	            this._data.concat(data);
  	            this._nDataBytes += data.sigBytes;
  	        },

  	        /**
  	         * Processes available data blocks.
  	         *
  	         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
  	         *
  	         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
  	         *
  	         * @return {WordArray} The processed data.
  	         *
  	         * @example
  	         *
  	         *     var processedData = bufferedBlockAlgorithm._process();
  	         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
  	         */
  	        _process: function (doFlush) {
  	            var processedWords;

  	            // Shortcuts
  	            var data = this._data;
  	            var dataWords = data.words;
  	            var dataSigBytes = data.sigBytes;
  	            var blockSize = this.blockSize;
  	            var blockSizeBytes = blockSize * 4;

  	            // Count blocks ready
  	            var nBlocksReady = dataSigBytes / blockSizeBytes;
  	            if (doFlush) {
  	                // Round up to include partial blocks
  	                nBlocksReady = Math.ceil(nBlocksReady);
  	            } else {
  	                // Round down to include only full blocks,
  	                // less the number of blocks that must remain in the buffer
  	                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
  	            }

  	            // Count words ready
  	            var nWordsReady = nBlocksReady * blockSize;

  	            // Count bytes ready
  	            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

  	            // Process blocks
  	            if (nWordsReady) {
  	                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
  	                    // Perform concrete-algorithm logic
  	                    this._doProcessBlock(dataWords, offset);
  	                }

  	                // Remove processed words
  	                processedWords = dataWords.splice(0, nWordsReady);
  	                data.sigBytes -= nBytesReady;
  	            }

  	            // Return processed words
  	            return new WordArray.init(processedWords, nBytesReady);
  	        },

  	        /**
  	         * Creates a copy of this object.
  	         *
  	         * @return {Object} The clone.
  	         *
  	         * @example
  	         *
  	         *     var clone = bufferedBlockAlgorithm.clone();
  	         */
  	        clone: function () {
  	            var clone = Base.clone.call(this);
  	            clone._data = this._data.clone();

  	            return clone;
  	        },

  	        _minBufferSize: 0
  	    });

  	    /**
  	     * Abstract hasher template.
  	     *
  	     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
  	     */
  	    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
  	        /**
  	         * Configuration options.
  	         */
  	        cfg: Base.extend(),

  	        /**
  	         * Initializes a newly created hasher.
  	         *
  	         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
  	         *
  	         * @example
  	         *
  	         *     var hasher = CryptoJS.algo.SHA256.create();
  	         */
  	        init: function (cfg) {
  	            // Apply config defaults
  	            this.cfg = this.cfg.extend(cfg);

  	            // Set initial values
  	            this.reset();
  	        },

  	        /**
  	         * Resets this hasher to its initial state.
  	         *
  	         * @example
  	         *
  	         *     hasher.reset();
  	         */
  	        reset: function () {
  	            // Reset data buffer
  	            BufferedBlockAlgorithm.reset.call(this);

  	            // Perform concrete-hasher logic
  	            this._doReset();
  	        },

  	        /**
  	         * Updates this hasher with a message.
  	         *
  	         * @param {WordArray|string} messageUpdate The message to append.
  	         *
  	         * @return {Hasher} This hasher.
  	         *
  	         * @example
  	         *
  	         *     hasher.update('message');
  	         *     hasher.update(wordArray);
  	         */
  	        update: function (messageUpdate) {
  	            // Append
  	            this._append(messageUpdate);

  	            // Update the hash
  	            this._process();

  	            // Chainable
  	            return this;
  	        },

  	        /**
  	         * Finalizes the hash computation.
  	         * Note that the finalize operation is effectively a destructive, read-once operation.
  	         *
  	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
  	         *
  	         * @return {WordArray} The hash.
  	         *
  	         * @example
  	         *
  	         *     var hash = hasher.finalize();
  	         *     var hash = hasher.finalize('message');
  	         *     var hash = hasher.finalize(wordArray);
  	         */
  	        finalize: function (messageUpdate) {
  	            // Final message update
  	            if (messageUpdate) {
  	                this._append(messageUpdate);
  	            }

  	            // Perform concrete-hasher logic
  	            var hash = this._doFinalize();

  	            return hash;
  	        },

  	        blockSize: 512/32,

  	        /**
  	         * Creates a shortcut function to a hasher's object interface.
  	         *
  	         * @param {Hasher} hasher The hasher to create a helper for.
  	         *
  	         * @return {Function} The shortcut function.
  	         *
  	         * @static
  	         *
  	         * @example
  	         *
  	         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
  	         */
  	        _createHelper: function (hasher) {
  	            return function (message, cfg) {
  	                return new hasher.init(cfg).finalize(message);
  	            };
  	        },

  	        /**
  	         * Creates a shortcut function to the HMAC's object interface.
  	         *
  	         * @param {Hasher} hasher The hasher to use in this HMAC helper.
  	         *
  	         * @return {Function} The shortcut function.
  	         *
  	         * @static
  	         *
  	         * @example
  	         *
  	         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
  	         */
  	        _createHmacHelper: function (hasher) {
  	            return function (message, key) {
  	                return new C_algo.HMAC.init(hasher, key).finalize(message);
  	            };
  	        }
  	    });

  	    /**
  	     * Algorithm namespace.
  	     */
  	    var C_algo = C.algo = {};

  	    return C;
  	}(Math));


  	return CryptoJS;

  }));
  });

  var sha256 = createCommonjsModule(function (module, exports) {
  (function (root, factory) {
  	{
  		// CommonJS
  		module.exports = exports = factory(core);
  	}
  }(commonjsGlobal, function (CryptoJS) {

  	(function (Math) {
  	    // Shortcuts
  	    var C = CryptoJS;
  	    var C_lib = C.lib;
  	    var WordArray = C_lib.WordArray;
  	    var Hasher = C_lib.Hasher;
  	    var C_algo = C.algo;

  	    // Initialization and round constants tables
  	    var H = [];
  	    var K = [];

  	    // Compute constants
  	    (function () {
  	        function isPrime(n) {
  	            var sqrtN = Math.sqrt(n);
  	            for (var factor = 2; factor <= sqrtN; factor++) {
  	                if (!(n % factor)) {
  	                    return false;
  	                }
  	            }

  	            return true;
  	        }

  	        function getFractionalBits(n) {
  	            return ((n - (n | 0)) * 0x100000000) | 0;
  	        }

  	        var n = 2;
  	        var nPrime = 0;
  	        while (nPrime < 64) {
  	            if (isPrime(n)) {
  	                if (nPrime < 8) {
  	                    H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
  	                }
  	                K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));

  	                nPrime++;
  	            }

  	            n++;
  	        }
  	    }());

  	    // Reusable object
  	    var W = [];

  	    /**
  	     * SHA-256 hash algorithm.
  	     */
  	    var SHA256 = C_algo.SHA256 = Hasher.extend({
  	        _doReset: function () {
  	            this._hash = new WordArray.init(H.slice(0));
  	        },

  	        _doProcessBlock: function (M, offset) {
  	            // Shortcut
  	            var H = this._hash.words;

  	            // Working variables
  	            var a = H[0];
  	            var b = H[1];
  	            var c = H[2];
  	            var d = H[3];
  	            var e = H[4];
  	            var f = H[5];
  	            var g = H[6];
  	            var h = H[7];

  	            // Computation
  	            for (var i = 0; i < 64; i++) {
  	                if (i < 16) {
  	                    W[i] = M[offset + i] | 0;
  	                } else {
  	                    var gamma0x = W[i - 15];
  	                    var gamma0  = ((gamma0x << 25) | (gamma0x >>> 7))  ^
  	                                  ((gamma0x << 14) | (gamma0x >>> 18)) ^
  	                                   (gamma0x >>> 3);

  	                    var gamma1x = W[i - 2];
  	                    var gamma1  = ((gamma1x << 15) | (gamma1x >>> 17)) ^
  	                                  ((gamma1x << 13) | (gamma1x >>> 19)) ^
  	                                   (gamma1x >>> 10);

  	                    W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
  	                }

  	                var ch  = (e & f) ^ (~e & g);
  	                var maj = (a & b) ^ (a & c) ^ (b & c);

  	                var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
  	                var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7)  | (e >>> 25));

  	                var t1 = h + sigma1 + ch + K[i] + W[i];
  	                var t2 = sigma0 + maj;

  	                h = g;
  	                g = f;
  	                f = e;
  	                e = (d + t1) | 0;
  	                d = c;
  	                c = b;
  	                b = a;
  	                a = (t1 + t2) | 0;
  	            }

  	            // Intermediate hash value
  	            H[0] = (H[0] + a) | 0;
  	            H[1] = (H[1] + b) | 0;
  	            H[2] = (H[2] + c) | 0;
  	            H[3] = (H[3] + d) | 0;
  	            H[4] = (H[4] + e) | 0;
  	            H[5] = (H[5] + f) | 0;
  	            H[6] = (H[6] + g) | 0;
  	            H[7] = (H[7] + h) | 0;
  	        },

  	        _doFinalize: function () {
  	            // Shortcuts
  	            var data = this._data;
  	            var dataWords = data.words;

  	            var nBitsTotal = this._nDataBytes * 8;
  	            var nBitsLeft = data.sigBytes * 8;

  	            // Add padding
  	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
  	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
  	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
  	            data.sigBytes = dataWords.length * 4;

  	            // Hash final blocks
  	            this._process();

  	            // Return final computed hash
  	            return this._hash;
  	        },

  	        clone: function () {
  	            var clone = Hasher.clone.call(this);
  	            clone._hash = this._hash.clone();

  	            return clone;
  	        }
  	    });

  	    /**
  	     * Shortcut function to the hasher's object interface.
  	     *
  	     * @param {WordArray|string} message The message to hash.
  	     *
  	     * @return {WordArray} The hash.
  	     *
  	     * @static
  	     *
  	     * @example
  	     *
  	     *     var hash = CryptoJS.SHA256('message');
  	     *     var hash = CryptoJS.SHA256(wordArray);
  	     */
  	    C.SHA256 = Hasher._createHelper(SHA256);

  	    /**
  	     * Shortcut function to the HMAC's object interface.
  	     *
  	     * @param {WordArray|string} message The message to hash.
  	     * @param {WordArray|string} key The secret key.
  	     *
  	     * @return {WordArray} The HMAC.
  	     *
  	     * @static
  	     *
  	     * @example
  	     *
  	     *     var hmac = CryptoJS.HmacSHA256(message, key);
  	     */
  	    C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
  	}(Math));


  	return CryptoJS.SHA256;

  }));
  });

  var hmac = createCommonjsModule(function (module, exports) {
  (function (root, factory) {
  	{
  		// CommonJS
  		module.exports = exports = factory(core);
  	}
  }(commonjsGlobal, function (CryptoJS) {

  	(function () {
  	    // Shortcuts
  	    var C = CryptoJS;
  	    var C_lib = C.lib;
  	    var Base = C_lib.Base;
  	    var C_enc = C.enc;
  	    var Utf8 = C_enc.Utf8;
  	    var C_algo = C.algo;

  	    /**
  	     * HMAC algorithm.
  	     */
  	    var HMAC = C_algo.HMAC = Base.extend({
  	        /**
  	         * Initializes a newly created HMAC.
  	         *
  	         * @param {Hasher} hasher The hash algorithm to use.
  	         * @param {WordArray|string} key The secret key.
  	         *
  	         * @example
  	         *
  	         *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
  	         */
  	        init: function (hasher, key) {
  	            // Init hasher
  	            hasher = this._hasher = new hasher.init();

  	            // Convert string to WordArray, else assume WordArray already
  	            if (typeof key == 'string') {
  	                key = Utf8.parse(key);
  	            }

  	            // Shortcuts
  	            var hasherBlockSize = hasher.blockSize;
  	            var hasherBlockSizeBytes = hasherBlockSize * 4;

  	            // Allow arbitrary length keys
  	            if (key.sigBytes > hasherBlockSizeBytes) {
  	                key = hasher.finalize(key);
  	            }

  	            // Clamp excess bits
  	            key.clamp();

  	            // Clone key for inner and outer pads
  	            var oKey = this._oKey = key.clone();
  	            var iKey = this._iKey = key.clone();

  	            // Shortcuts
  	            var oKeyWords = oKey.words;
  	            var iKeyWords = iKey.words;

  	            // XOR keys with pad constants
  	            for (var i = 0; i < hasherBlockSize; i++) {
  	                oKeyWords[i] ^= 0x5c5c5c5c;
  	                iKeyWords[i] ^= 0x36363636;
  	            }
  	            oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;

  	            // Set initial values
  	            this.reset();
  	        },

  	        /**
  	         * Resets this HMAC to its initial state.
  	         *
  	         * @example
  	         *
  	         *     hmacHasher.reset();
  	         */
  	        reset: function () {
  	            // Shortcut
  	            var hasher = this._hasher;

  	            // Reset
  	            hasher.reset();
  	            hasher.update(this._iKey);
  	        },

  	        /**
  	         * Updates this HMAC with a message.
  	         *
  	         * @param {WordArray|string} messageUpdate The message to append.
  	         *
  	         * @return {HMAC} This HMAC instance.
  	         *
  	         * @example
  	         *
  	         *     hmacHasher.update('message');
  	         *     hmacHasher.update(wordArray);
  	         */
  	        update: function (messageUpdate) {
  	            this._hasher.update(messageUpdate);

  	            // Chainable
  	            return this;
  	        },

  	        /**
  	         * Finalizes the HMAC computation.
  	         * Note that the finalize operation is effectively a destructive, read-once operation.
  	         *
  	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
  	         *
  	         * @return {WordArray} The HMAC.
  	         *
  	         * @example
  	         *
  	         *     var hmac = hmacHasher.finalize();
  	         *     var hmac = hmacHasher.finalize('message');
  	         *     var hmac = hmacHasher.finalize(wordArray);
  	         */
  	        finalize: function (messageUpdate) {
  	            // Shortcut
  	            var hasher = this._hasher;

  	            // Compute HMAC
  	            var innerHash = hasher.finalize(messageUpdate);
  	            hasher.reset();
  	            var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));

  	            return hmac;
  	        }
  	    });
  	}());


  }));
  });

  var hmacSha256 = createCommonjsModule(function (module, exports) {
  (function (root, factory, undef) {
  	{
  		// CommonJS
  		module.exports = exports = factory(core, sha256, hmac);
  	}
  }(commonjsGlobal, function (CryptoJS) {

  	return CryptoJS.HmacSHA256;

  }));
  });

  var encBase64 = createCommonjsModule(function (module, exports) {
  (function (root, factory) {
  	{
  		// CommonJS
  		module.exports = exports = factory(core);
  	}
  }(commonjsGlobal, function (CryptoJS) {

  	(function () {
  	    // Shortcuts
  	    var C = CryptoJS;
  	    var C_lib = C.lib;
  	    var WordArray = C_lib.WordArray;
  	    var C_enc = C.enc;

  	    /**
  	     * Base64 encoding strategy.
  	     */
  	    var Base64 = C_enc.Base64 = {
  	        /**
  	         * Converts a word array to a Base64 string.
  	         *
  	         * @param {WordArray} wordArray The word array.
  	         *
  	         * @return {string} The Base64 string.
  	         *
  	         * @static
  	         *
  	         * @example
  	         *
  	         *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
  	         */
  	        stringify: function (wordArray) {
  	            // Shortcuts
  	            var words = wordArray.words;
  	            var sigBytes = wordArray.sigBytes;
  	            var map = this._map;

  	            // Clamp excess bits
  	            wordArray.clamp();

  	            // Convert
  	            var base64Chars = [];
  	            for (var i = 0; i < sigBytes; i += 3) {
  	                var byte1 = (words[i >>> 2]       >>> (24 - (i % 4) * 8))       & 0xff;
  	                var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
  	                var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;

  	                var triplet = (byte1 << 16) | (byte2 << 8) | byte3;

  	                for (var j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {
  	                    base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
  	                }
  	            }

  	            // Add padding
  	            var paddingChar = map.charAt(64);
  	            if (paddingChar) {
  	                while (base64Chars.length % 4) {
  	                    base64Chars.push(paddingChar);
  	                }
  	            }

  	            return base64Chars.join('');
  	        },

  	        /**
  	         * Converts a Base64 string to a word array.
  	         *
  	         * @param {string} base64Str The Base64 string.
  	         *
  	         * @return {WordArray} The word array.
  	         *
  	         * @static
  	         *
  	         * @example
  	         *
  	         *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
  	         */
  	        parse: function (base64Str) {
  	            // Shortcuts
  	            var base64StrLength = base64Str.length;
  	            var map = this._map;
  	            var reverseMap = this._reverseMap;

  	            if (!reverseMap) {
  	                    reverseMap = this._reverseMap = [];
  	                    for (var j = 0; j < map.length; j++) {
  	                        reverseMap[map.charCodeAt(j)] = j;
  	                    }
  	            }

  	            // Ignore padding
  	            var paddingChar = map.charAt(64);
  	            if (paddingChar) {
  	                var paddingIndex = base64Str.indexOf(paddingChar);
  	                if (paddingIndex !== -1) {
  	                    base64StrLength = paddingIndex;
  	                }
  	            }

  	            // Convert
  	            return parseLoop(base64Str, base64StrLength, reverseMap);

  	        },

  	        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
  	    };

  	    function parseLoop(base64Str, base64StrLength, reverseMap) {
  	      var words = [];
  	      var nBytes = 0;
  	      for (var i = 0; i < base64StrLength; i++) {
  	          if (i % 4) {
  	              var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << ((i % 4) * 2);
  	              var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> (6 - (i % 4) * 2);
  	              var bitsCombined = bits1 | bits2;
  	              words[nBytes >>> 2] |= bitsCombined << (24 - (nBytes % 4) * 8);
  	              nBytes++;
  	          }
  	      }
  	      return WordArray.create(words, nBytes);
  	    }
  	}());


  	return CryptoJS.enc.Base64;

  }));
  });

  //   warn
  // } from '@/log'

  var options = {
    debug: true,
    // 环境配置
    // false不覆盖
    // 详细配置查看 profile/index.js
    profile: {
      // 图片域名
      imgDomain: ''
    },
    // 扩展插件库配置
    // false布覆盖
    // 详细配置查看 libs/index.js
    libs: {
      // CKEDITOR
      ckeditor: null
    },
    // 插件安装配置
    // false不安装
    // 详细配置各插件中查看
    plugins: {},
    // 过滤器安装配置
    // false不安装
    filters: {
      date: true,
      currency: true,
      value: true,
      url: true
    },
    // 组件安装配置
    // false不安装
    // 详细配置各组件中查看
    components: {
      // 富文本编辑器，false则不安装
      editor: {},
      // 图片预览，false则不安装
      messageBox: {},
      // Modal，false则不安装
      modal: {},
      // 扩展Vue实例的提示方法，false则不安装
      notify: {},
      // 文件/图片上传，false则不安装
      // 提供的配置将会替换组件props的默认值
      upload: {
        // 文件上传组件，false则不安装
        upload: {},
        // 图片上传组件，false则不安装
        // 只有安装了upload，才能安装imageUpload
        imageUpload: {}
      },
      // 扩展Vue实例加载中方法，false则不安装
      loader: {}
    },
    axios: {
      defaults: {},
      interceptor: {
        applicationForm: true,
        dataToUnderline: true,
        disableCache: true,
        errorHandle: true,
        loading: true,
        authMac: {
          MAC_ID: '2YotnFZFEjr1zCsicMWpAA',
          MAC_KEY: 'mac_key',
          SESSION_ID: 'session_id',
          decode: true,
          getMacKey: function getMacKey() {
            var macKey = VueCookie.get(this.MAC_KEY) || '';
            return this.decode ? decodeURIComponent(macKey) : macKey;
          },
          getSessionId: function getSessionId() {
            var sessionId = VueCookie.get(this.SESSION_ID) || '';
            return this.decode ? decodeURIComponent(sessionId) : sessionId;
          }
        },
        removeEmpty: true,
        returnResponseData: true
      },
      transformResponse: {
        hump: true
      }
    },
    // 第三方安装配置
    // false不安装
    third: {
      qiniu: {
        httpRequest: {
          /**
           * 七牛上传配置URL
           * @param {*} type
           */
          qiniuTokenUrl: function qiniuTokenUrl(type) {
            return "/v1.0/common/".concat(type, "/qiniu_token");
          },

          /**
           * 获取七牛上传配置
           * http://192.168.1.135:9001/eam/swagger-ui.html#!/HomeController/getQiniuTokenUsingGET
           * @param {*} type 1-图片
           */
          getServerConfig: function getServerConfig() {
            var _this = this;

            var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
            return axios$1({
              url: this.qiniuTokenUrl(type),
              method: 'GET',
              responseType: 'json'
            }).then(function (data) {
              var datas = data.data;
              return {
                domain: datas.domainUrl,
                zoneUrl: _this.getZoneUrl(datas.qiniuZone.upUrls),
                token: datas.token
              };
            });
          },

          /**
           * 取七牛上传地址
           * @param {*} qiniuZone
           */
          getZoneUrl: function getZoneUrl(qiniuZone) {
            if (Array.isArray(qiniuZone)) {
              var len = qiniuZone.length;
              return qiniuZone[randRange(0, len - 1)];
            }

            return String(qiniuZone);
          }
        }
      }
    },
    // 工具类配置项
    // false则不覆盖
    utils: {
      fmt: {
        // 日期格式化
        date: {
          format: 'yyyy-MM-dd hh:mm:ss'
        },
        // 货币格式化
        currency: {
          places: 2,
          symbol: '￥',
          thousand: ', ',
          decimal: '.'
        }
      },
      // hmac 认证
      authMac: {
        requestContentSymbol: '\n',
        authMacSymbol: 'MAC',
        nonceLen: 8
      }
    }
  };
  var merger = function merger(opts) {
    return extend(true, options, opts);
  };

  var RequestContent = /*#__PURE__*/function () {
    function RequestContent() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        nonce: '',
        httpMethod: '',
        requestURI: '',
        host: '',
        symbol: ''
      };

      classCallCheck(this, RequestContent);

      this.nonce = config.nonce;
      this.httpMethod = config.httpMethod.toUpperCase();
      this.requestURI = config.requestURI;
      this.host = config.host;
      this.symbol = config.symbol;
    }

    createClass(RequestContent, [{
      key: "build",
      value: function build() {
        return this.nonce + this.symbol + this.httpMethod + this.symbol + this.requestURI + this.symbol + this.host + this.symbol;
      }
    }]);

    return RequestContent;
  }();

  var Mac = /*#__PURE__*/function () {
    function Mac() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        macKey: '',
        requestContent: null
      };

      classCallCheck(this, Mac);

      this.macKey = config.macKey;
      this.requestContent = config.requestContent;
    }

    createClass(Mac, [{
      key: "build",
      value: function build() {
        return encBase64.stringify(hmacSha256(this.requestContent.build(), this.macKey));
      }
    }]);

    return Mac;
  }();

  var AuthMac = /*#__PURE__*/function () {
    function AuthMac() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        macId: '',
        timestamp: 0,
        nonce: '',
        mac: null,
        symbol: ''
      };

      classCallCheck(this, AuthMac);

      this.macId = config.macId;
      this.timestamp = config.timestamp;
      this.nonce = config.nonce;
      this.mac = config.mac;
      this.symbol = config.symbol;
    }

    createClass(AuthMac, [{
      key: "build",
      value: function build() {
        return "".concat(this.symbol, " ").concat(["id=".concat(this.macId), "nonce=".concat(this.nonce), "mac=".concat(this.mac.build())].join(','));
      }
    }]);

    return AuthMac;
  }();

  function makeNonce() {
    var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : options.utils.authMac.nonceLen;
    var timestamp = new Date().getTime();
    var code = randText(len);
    return {
      timestamp: timestamp,
      code: code,
      nonce: "".concat(timestamp, ":").concat(code)
    };
  }
  /**
   * hmac 认证
   * https://coding.net/u/chenzuopeng/p/wm-uc/git/blob/master/docs/authorization.md
   */

  var authMac = (function () {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      macId: '',
      macKey: '',
      httpMethod: '',
      requestURI: '',
      host: ''
    };
    var macId = config.macId,
        macKey = config.macKey,
        httpMethod = config.httpMethod,
        requestURI = config.requestURI,
        host = config.host;
    var macNonce = makeNonce();
    var requestContent = new RequestContent({
      nonce: macNonce.nonce,
      httpMethod: httpMethod,
      requestURI: requestURI,
      host: host,
      symbol: options.utils.authMac.requestContentSymbol
    });
    var mac = new Mac({
      macKey: macKey,
      requestContent: requestContent
    });
    var authMac = new AuthMac({
      macId: macId,
      timestamp: macNonce.timestamp,
      nonce: macNonce.nonce,
      mac: mac,
      symbol: options.utils.authMac.authMacSymbol
    });
    return authMac.build();
  });

  /*
   * @Author: nutter
   * @Date: 2020-08-21 16:39:06
   * @LastEditors: nutter
   * @LastEditTime: 2020-08-21 16:43:30
   * @FilePath: \nutter-ui\packages\utils\src\decomposeUrl.js
   */

  /**
   * 拆解url，得到url的各个部分
   * @param url URL
   */
  var decomposeUrl = (function (url) {
    var a = document.createElement('a');
    a.href = url;
    return {
      source: url,
      protocol: a.protocol.replace(':', ''),
      host: a.host,
      port: a.port,
      hostname: a.hostname,
      origin: a.origin,
      query: a.search,
      params: function () {
        var ret = {},
            seg = a.search.replace(/^\?/, '').split('&'),
            len = seg.length,
            i = 0,
            s;

        for (; i < len; i++) {
          if (!seg[i]) {
            continue;
          }

          s = seg[i].split('=');
          ret[s[0]] = s[1];
        }

        return ret;
      }(),
      file: (a.pathname.match(/\/([^/?#]+)$/i) || ['', ''])[1],
      hash: a.hash.replace('#', ''),
      path: a.pathname.replace(/^([^/])/, '/$1'),
      uri: (a.href.match(/tps?:\/\/[^/]+(.+)/) || ['', ''])[1],
      segments: a.pathname.replace(/^\//, '').split('/')
    };
  });

  var isAbsoluteUrl = (function (url) {
    return url && /^https?/.test(String(url));
  });

  /**
   * 移除data中的空数据，如：null/undefined/''
   * @param data
   */

  var removeEmpty = (function (data) {
    eachOwn(data, function (value, key, data) {
      if (value === undefined || value === null || typeof value === 'string' && value.trim() === '') {
        delete data[key];
      }
    });
    return data;
  });

  /*
   * @Author: nutter
   * @Date: 2020-03-12 09:32:35
   * @LastEditors: nutter
   * @LastEditTime: 2020-08-21 16:40:04
   * @FilePath: \nutter-ui\packages\utils\index.js
   */

  var index = /*#__PURE__*/Object.freeze({
    __proto__: null,
    callOrApply: callOrApply,
    isIE: isIE,
    fmt: fmt,
    eachOwn: eachOwn,
    requireContext: requireContext,
    requireContextToObj: requireContextToObj,
    restructureVueCtor: restructureVueCtor,
    restructureDefaultPropsOfVueCtorFromOptions: restructureDefaultPropsOfVueCtorFromOptions,
    strToHump: strToHump,
    strToUnderline: strToUnderline,
    dataToHump: dataToHump,
    dataToUnderline: dataToUnderline,
    isApplicationForm: isApplicationForm,
    type: type,
    authMac: authMac,
    decomposeUrl: decomposeUrl,
    removeEmpty: removeEmpty,
    isAbsoluteUrl: isAbsoluteUrl
  });

  var defaultOptions = {
    title: '系统提示',
    type: 'info'
  };

  var callNotification = function callNotification() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return elementUi.Notification(Object.assign({}, defaultOptions, options));
  };

  var mergeOptions = function mergeOptions() {
    var toOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var targetOptions = arguments.length > 1 ? arguments[1] : undefined;

    if (targetOptions && _typeof_1(targetOptions) !== 'object') {
      targetOptions = {
        message: String(targetOptions)
      };
    }

    return Object.assign({}, toOptions, targetOptions);
  };

  var shortcut = {
    'success': {
      type: 'success',
      duration: 5000
    },
    'info': {
      type: 'info',
      duration: 10000
    },
    'warning': {
      type: 'warning',
      duration: 15000
    },
    'warn': {
      type: 'warning',
      duration: 15000
    },
    'danger': {
      type: 'danger',
      duration: 30000
    }
  };

  var addShortcutsToSomeObj = function addShortcutsToSomeObj(someObj) {
    Object.keys(shortcut).forEach(function (key) {
      someObj[key] = function () {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return callNotification(mergeOptions(shortcut[key], options));
      };
    });
  };

  var Notify = {};
  addShortcutsToSomeObj(Notify);
  var success = Notify.success,
      warning = Notify.warning;

  function getError(action, option, xhr) {
    var msg;

    if (xhr.response) {
      msg = "".concat(xhr.response.error || xhr.response);
    } else if (xhr.responseText) {
      msg = "".concat(xhr.responseText);
    } else {
      msg = "fail to post ".concat(action, " ").concat(xhr.status);
    }

    var err = new Error(msg);
    err.status = xhr.status;
    err.method = 'post';
    err.url = action;
    return err;
  }

  function getBody(xhr) {
    var text = xhr.responseText || xhr.response;

    if (!text) {
      return text;
    }

    try {
      return JSON.parse(text);
    } catch (e) {
      return text;
    }
  }

  function upload(option) {
    if (typeof XMLHttpRequest === 'undefined') {
      return;
    }

    var xhr = new XMLHttpRequest();
    var action = option.action;

    if (xhr.upload) {
      xhr.upload.onprogress = function progress(e) {
        if (e.total > 0) {
          e.percent = e.loaded / e.total * 100;
        }

        option.onProgress(e);
      };
    }

    var formData = new FormData();

    if (option.data) {
      Object.keys(option.data).forEach(function (key) {
        formData.append(key, option.data[key]);
      });
    }

    formData.append(option.filename, option.file);

    xhr.onerror = function error(e) {
      option.onError(e);
    };

    xhr.onload = function onload() {
      if (xhr.status < 200 || xhr.status >= 300) {
        return option.onError(getError(action, option, xhr));
      }

      option.onSuccess(getBody(xhr));
    };

    xhr.open('post', action, true);

    if (option.withCredentials && 'withCredentials' in xhr) {
      xhr.withCredentials = true;
    }

    var headers = option.headers || {};

    for (var item in headers) {
      if (headers.hasOwnProperty(item) && headers[item] !== null) {
        xhr.setRequestHeader(item, headers[item]);
      }
    }

    xhr.send(formData);
    return xhr;
  }

  /*
   * @Author: nutter
   * @Date: 2020-08-19 14:29:53
   * @LastEditors: nutter
   * @LastEditTime: 2020-08-20 16:11:23
   * @FilePath: \nutter-ui\packages\third\qiniu\index.js
   */
  var qiniuHttpRequest = (function (opts) {
    options.third.qiniu.httpRequest.getServerConfig().then(function (data) {
      opts.action = data.zoneUrl;
      Object.assign(opts.data, {
        token: data.token
      });
      var onSuccess = opts.onSuccess;

      opts.onSuccess = function (res) {
        onSuccess(Object.assign({}, data, res));
      };

      return upload(opts);
    });
  });

  //
  var script$4 = {
    name: 'n-upload',
    components: {},
    model: {
      prop: "fileList",
      event: "change"
    },
    props: {
      action: {
        type: String,
        "default": ""
      },
      headers: {
        type: Object,
        "default": function _default() {
          return null;
        }
      },
      multiple: {
        type: Boolean,
        "default": false
      },
      data: {
        type: Object,
        "default": function _default() {
          return {};
        }
      },
      name: {
        type: String,
        "default": "file"
      },
      withCredentials: {
        type: Boolean,
        "default": false
      },
      showFileList: {
        type: Boolean,
        "default": true
      },
      drag: {
        type: Boolean,
        "default": false
      },
      accept: {
        type: String,
        "default": "*"
      },
      listType: {
        type: String,
        "default": "text"
      },
      autoUpload: {
        type: Boolean,
        "default": true
      },
      fileList: {
        type: [Array, String],
        "default": function _default() {
          return [];
        }
      },
      disabled: {
        type: Boolean,
        "default": false
      },
      limit: {
        type: Number,
        "default": 1
      },
      // 自定义扩展props
      // 允许的扩展名
      exts: {
        type: Array,
        "default": function _default() {
          return [];
        }
      },
      // 允许的单文件大小，单位：MB
      singleFileSize: {
        type: Number,
        "default": 0
      },
      // 是否显示提示信息
      showMsg: {
        type: Boolean,
        "default": true
      },
      httpRequest: {
        type: [String, Function],
        required: false
      }
    },
    data: function data() {
      return {
        fileMap: {},
        tempFileList: "[]",
        removeUrl: ""
      };
    },
    computed: {
      fileSizeByte: function fileSizeByte() {
        return this.singleFileSize * 1024 * 1024;
      },
      computedFileList: {
        get: function get() {
          var tempFileList = JSON.parse(this.tempFileList);
          var fileMap = this.fileMap;
          var fileList = Array.isArray(this.fileList) ? this.fileList : this.fileList ? this.fileList.split(",") : [];
          return fileList.map(function (v) {
            var items = tempFileList.find(function (item) {
              return item.url === v;
            });

            if (typeof v === "string") {
              return fileMap[v] || {
                name: items ? items.name : v,
                url: v
              };
            } else {
              return v;
            }
          });
        },
        set: function set(val) {
          this.tempFileList = JSON.stringify(val);
          var fileMap = this.fileMap;
          val.forEach(function (v) {
            fileMap[v.url] = v;
          });
          var ret = (val || []).map(function (v) {
            return v.url;
          });
          this.$emit("change", Array.isArray(this.fileList) ? ret : ret.join(","));
        }
      },
      uploadHttpRequest: function uploadHttpRequest() {
        if (typeof this.httpRequest === "function") {
          return this.httpRequest;
        }

        switch (this.httpRequest) {
          case "qiniu":
            return qiniuHttpRequest;

          default:
            return upload;
        }
      }
    },
    mounted: function mounted() {
      if (this.computedFileList.length) {
        this.computedFileList = this.$refs.upload.uploadFiles;
      }
    },
    methods: {
      applyEmit: function applyEmit(emitName, args) {
        var argsArr = Array.from(args);
        argsArr.unshift(emitName);
        return callOrApply(this, this.$emit, argsArr);
      },
      onPreview: function onPreview() {
        this.applyEmit("on-preview", arguments);
      },
      onRemove: function onRemove(file, fileList) {
        var index = -1;

        if ((index = this.computedFileList.indexOf(file)) > -1) {
          var _fileList = this.computedFileList.slice(0);

          _fileList.splice(index, 1);

          this.computedFileList = _fileList;
          delete this.fileMap[file.url];
          this.removeUrl = file.url;
        }

        this.applyEmit("on-remove", arguments);
      },
      onSuccess: function onSuccess(res, file, fileList) {
        if (this.httpRequest === "qiniu") {
          fileList = fileList.map(function (v) {
            if (v.status === "success" && v.response) {
              v.url = v.response.domain + "/" + v.response.hash;
            }

            return v;
          });
        }

        this.computedFileList = fileList.slice(0);
        var msg = "\u4E0A\u4F20\u6210\u529F";
        this.showMessage(success, msg);
        this.applyEmit("on-success", arguments, msg);
      },
      onError: function onError(err) {
        this.applyEmit("on-error", arguments, err.message);
      },
      onProcess: function onProcess() {
        this.applyEmit("on-process", arguments);
      },
      onChange: function onChange() {
        this.applyEmit("on-change", arguments);
      },
      beforeUpload: function beforeUpload(file) {
        if (this.verifyFile(file)) {
          var res = this.applyEmit("before-upload", arguments);
          return res === undefined ? true : res;
        }

        return false;
      },
      onExceed: function onExceed() {
        var msg = "\u6700\u591A\u5141\u8BB8\u4E0A\u4F20".concat(this.limit, "\u4E2A\u6587\u4EF6");
        this.showMessage(warning, msg);
        this.applyEmit("on-exceed", arguments, msg);
      },
      emitExtsExceed: function emitExtsExceed(file) {
        var msg = "\u53EA\u652F\u6301[".concat(this.exts.join(","), "]\u6587\u4EF6\u7C7B\u578B");
        this.showMessage(warning, msg);
        this.applyEmit("on-exts-exceed", [file, msg]);
      },
      emitFileSizeExceed: function emitFileSizeExceed(file) {
        var msg = "\u6587\u4EF6\u5927\u5C0F\u4E0D\u80FD\u8D85\u8FC7".concat(this.singleFileSize, "MB");
        this.showMessage(warning, msg);
        this.applyEmit("on-file-size-exceed", [file, msg]);
      },
      verifyFile: function verifyFile(file) {
        return this.verifyExts(file) && this.verifyFileSize(file);
      },
      verifyExts: function verifyExts(file) {
        return this.checkExts(file) ? true : (this.emitExtsExceed(file), false);
      },
      verifyFileSize: function verifyFileSize(file) {
        return this.checkFileSize(file) ? true : (this.emitFileSizeExceed(file), false);
      },
      checkExts: function checkExts(file) {
        if (this.exts.length === 0) {
          return true;
        }

        var fileName = isIE ? file.value : file.name;
        var index;

        if ((index = fileName.lastIndexOf(".")) > -1) {
          var ext = fileName.substr(index + 1).toLowerCase();
          return this.exts.some(function (predictExt) {
            return predictExt.toLowerCase() === ext;
          });
        }

        return false;
      },
      checkFileSize: function checkFileSize(file) {
        return this.singleFileSize <= 0 || (isIE ? this.checkFileSizeIE(file) : this.checkFileSizeOthers(file));
      },
      checkFileSizeIE: function checkFileSizeIE(file) {
        var fso = new ActiveXObject("Scripting.FileSystemObject");
        var target = fso.getFile(file.value);

        if (target && target.size !== undefined && target.size > this.fileSizeByte) {
          return false;
        } // IE下，默认不验证文件大小


        return true;
      },
      checkFileSizeOthers: function checkFileSizeOthers(file) {
        return file.size <= this.fileSizeByte;
      },
      showMessage: function showMessage(fn, msg) {
        if (this.showMsg) {
          fn(msg);
        }
      }
    }
  };

  /* script */
  const __vue_script__$4 = script$4;

  /* template */
  var __vue_render__$4 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "el-upload",
      {
        ref: "upload",
        class: { "upload-hide-add": _vm.computedFileList.length >= _vm.limit },
        attrs: {
          action: _vm.action,
          headers: _vm.headers,
          multiple: _vm.multiple,
          data: _vm.data,
          name: _vm.name,
          "with-credentials": _vm.withCredentials,
          "show-file-list": _vm.showFileList,
          drag: _vm.drag,
          accept: _vm.accept,
          "list-type": _vm.listType,
          "auto-upload": _vm.autoUpload,
          "file-list": _vm.computedFileList,
          "http-request": _vm.uploadHttpRequest,
          disabled: _vm.disabled,
          limit: _vm.limit,
          "on-preview": _vm.onPreview,
          "on-remove": _vm.onRemove,
          "on-success": _vm.onSuccess,
          "on-error": _vm.onError,
          "on-progress": _vm.onProcess,
          "on-change": _vm.onChange,
          "before-upload": _vm.beforeUpload,
          "on-exceed": _vm.onExceed
        }
      },
      [
        _vm._t("default", [_c("i", { staticClass: "el-icon-plus" })]),
        _vm._v(" "),
        _vm.$slots.tip
          ? _c("template", { slot: "tip" }, [_vm._t("tip")], 2)
          : _vm._e()
      ],
      2
    )
  };
  var __vue_staticRenderFns__$4 = [];
  __vue_render__$4._withStripped = true;

    /* style */
    const __vue_inject_styles__$4 = undefined;
    /* scoped */
    const __vue_scope_id__$4 = undefined;
    /* module identifier */
    const __vue_module_identifier__$4 = undefined;
    /* functional template */
    const __vue_is_functional_template__$4 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$4 = normalizeComponent(
      { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
      __vue_inject_styles__$4,
      __vue_script__$4,
      __vue_scope_id__$4,
      __vue_is_functional_template__$4,
      __vue_module_identifier__$4,
      false,
      undefined,
      undefined,
      undefined
    );

  //
  var script$5 = {
    components: {
      ElDialog: elementUi.Dialog
    },
    data: function data() {
      return {
        visible: false,
        title: "图片预览",
        width: "80%",
        showClose: true,
        src: false
      };
    }
  };

  /* script */
  const __vue_script__$5 = script$5;

  /* template */
  var __vue_render__$5 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "el-dialog",
      {
        attrs: {
          visible: _vm.visible,
          title: _vm.title,
          width: _vm.width,
          "show-close": _vm.showClose
        },
        on: {
          "update:visible": function($event) {
            _vm.visible = $event;
          }
        }
      },
      [
        _c("div", { staticClass: "img-container" }, [
          _c("img", { attrs: { src: _vm.src } })
        ])
      ]
    )
  };
  var __vue_staticRenderFns__$5 = [];
  __vue_render__$5._withStripped = true;

    /* style */
    const __vue_inject_styles__$5 = undefined;
    /* scoped */
    const __vue_scope_id__$5 = undefined;
    /* module identifier */
    const __vue_module_identifier__$5 = undefined;
    /* functional template */
    const __vue_is_functional_template__$5 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$5 = normalizeComponent(
      { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
      __vue_inject_styles__$5,
      __vue_script__$5,
      __vue_scope_id__$5,
      __vue_is_functional_template__$5,
      __vue_module_identifier__$5,
      false,
      undefined,
      undefined,
      undefined
    );

  /*
   * @Author: nutter
   * @Date: 2020-08-20 16:57:28
   * @LastEditors: nutter
   * @LastEditTime: 2020-08-20 16:58:13
   * @FilePath: \nutter-ui\packages\components\MessageBox\index.js
   */
  var ImagePreviewBoxConstructor = Vue.extend(__vue_component__$5);
  var instance = null;

  var getInstance = function getInstance() {
    if (!instance) {
      instance = new ImagePreviewBoxConstructor();
      instance.vm = instance.$mount();
      document.body.appendChild(instance.vm.$el);
    }

    return instance;
  };

  var showPreview = function showPreview(src) {
    var instance = getInstance();
    instance.vm.src = src;
    instance.vm.visible = true;
  };

  //
  var script$6 = {
    name: "n-upload-image",
    components: {
      Upload: __vue_component__$4
    },
    model: {
      prop: "fileList",
      event: "change"
    },
    props: {
      action: {
        type: String,
        "default": ""
      },
      headers: {
        type: Object,
        "default": function _default() {
          return null;
        }
      },
      multiple: {
        type: Boolean,
        "default": true
      },
      data: {
        type: Object,
        "default": function _default() {
          return {};
        }
      },
      name: {
        type: String,
        "default": "file"
      },
      withCredentials: {
        type: Boolean,
        "default": false
      },
      showFileList: {
        type: Boolean,
        "default": true
      },
      drag: {
        type: Boolean,
        "default": false
      },
      accept: {
        type: String,
        "default": "image/*"
      },
      listType: {
        type: String,
        "default": "picture-card"
      },
      autoUpload: {
        type: Boolean,
        "default": true
      },
      fileList: {
        type: [Array, String],
        "default": function _default() {
          return [];
        }
      },
      httpRequest: {
        type: [Function, String],
        required: false
      },
      disabled: {
        type: Boolean,
        "default": false
      },
      limit: {
        type: Number,
        "default": 1
      },
      exts: {
        type: Array,
        "default": function _default() {
          return ["jpg", "jpeg", "gif", "png", "bmp"];
        }
      },
      singleFileSize: {
        type: Number,
        "default": 4
      },
      showMsg: {
        type: Boolean,
        "default": true
      }
    },
    computed: {
      computedFileList: {
        get: function get() {
          return this.fileList;
        },
        set: function set(val) {
          this.$emit("change", val);
        }
      }
    },
    methods: {
      applyEmit: function applyEmit(emitName, args) {
        var argsArr = Array.from(args);
        argsArr.unshift(emitName);
        return callOrApply(this, this.$emit, argsArr);
      },
      onPreview: function onPreview(file) {
        showPreview(file.url);
      },
      onRemove: function onRemove() {
        this.applyEmit("on-remove", arguments);
      },
      onSuccess: function onSuccess() {
        this.applyEmit("on-success", arguments);
      },
      onError: function onError() {
        this.applyEmit("on-error", arguments);
      },
      onProcess: function onProcess() {
        this.applyEmit("on-process", arguments);
      },
      onChange: function onChange() {
        this.applyEmit("on-change", arguments);
      },
      beforeUpload: function beforeUpload() {
        var res = this.applyEmit("before-upload", arguments);
        return res === undefined ? true : res;
      },
      onExceed: function onExceed() {
        this.applyEmit("on-exceed", arguments);
      },
      onExtsExceed: function onExtsExceed() {
        this.applyEmit("on-exts-exceed", arguments);
      },
      onFileSizeExceed: function onFileSizeExceed() {
        this.applyEmit("on-file-size-exceed", arguments);
      }
    }
  };

  /* script */
  const __vue_script__$6 = script$6;

  /* template */
  var __vue_render__$6 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "upload",
      {
        attrs: {
          action: _vm.action,
          headers: _vm.headers,
          multiple: _vm.multiple,
          data: _vm.data,
          name: _vm.name,
          "with-credentials": _vm.withCredentials,
          "show-file-list": _vm.showFileList,
          drag: _vm.drag,
          accept: _vm.accept,
          "list-type": _vm.listType,
          "auto-upload": _vm.autoUpload,
          httpRequest: _vm.httpRequest,
          disabled: _vm.disabled,
          limit: _vm.limit,
          exts: _vm.exts,
          singleFileSize: _vm.singleFileSize
        },
        on: {
          "on-preview": _vm.onPreview,
          "on-remove": _vm.onRemove,
          "on-success": _vm.onSuccess,
          "on-error": _vm.onError,
          "on-progress": _vm.onProcess,
          "on-change": _vm.onChange,
          "before-upload": _vm.beforeUpload,
          "on-exceed": _vm.onExceed,
          "on-exts-exceed": _vm.onExtsExceed,
          "on-file-size-exceed": _vm.onFileSizeExceed
        },
        model: {
          value: _vm.computedFileList,
          callback: function($$v) {
            _vm.computedFileList = $$v;
          },
          expression: "computedFileList"
        }
      },
      [
        _vm._t("default"),
        _vm._v(" "),
        _vm.$slots.tip
          ? _c("template", { slot: "tip" }, [_vm._t("tip")], 2)
          : _vm._e()
      ],
      2
    )
  };
  var __vue_staticRenderFns__$6 = [];
  __vue_render__$6._withStripped = true;

    /* style */
    const __vue_inject_styles__$6 = undefined;
    /* scoped */
    const __vue_scope_id__$6 = undefined;
    /* module identifier */
    const __vue_module_identifier__$6 = undefined;
    /* functional template */
    const __vue_is_functional_template__$6 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$6 = normalizeComponent(
      { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
      __vue_inject_styles__$6,
      __vue_script__$6,
      __vue_scope_id__$6,
      __vue_is_functional_template__$6,
      __vue_module_identifier__$6,
      false,
      undefined,
      undefined,
      undefined
    );

  /*
   * @Author: nutter
   * @Date: 2020-08-19 18:47:12
   * @LastEditors: nutter
   * @LastEditTime: 2020-08-20 17:25:05
   * @FilePath: \nutter-ui\packages\components\Upload\index.js
   */

  __vue_component__$4.install = function (Vue) {
    Vue.component(__vue_component__$4.name, __vue_component__$4);
    Vue.component(__vue_component__$6.name, __vue_component__$6);
  };

  /*
   * @Author: nutter
   * @Date: 2020-03-23 10:52:48
   * @LastEditors: nutter
   * @LastEditTime: 2020-08-21 15:22:30
   * @FilePath: \nutter-ui\packages\components\index.js
   */
  var Components = {
    install: function install(Vue) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      Vue.use(__vue_component__, opts.button);
      Vue.use(__vue_component__$1, opts.icon);
      Vue.use(__vue_component__$2, opts.title);
      Vue.use(__vue_component__$3, opts.dialog);
      Vue.use(__vue_component__$4, opts.upload);
    }
  }; // let components = []
  // const requireComponent = require.context('./', // 是否查询其子目录 
  //     true,
  //     /index.js$/);
  // requireComponent.keys().forEach(fileName => { // 获取组件配置  
  //     const componentConfig = requireComponent(fileName)
  //     // const componentName = upperFirst(camelCase( // 获取和目录深度无关的文件名 
  //     //     fileName.split('/').pop().replace(/\.\w+$/, ''))) // 全局注册组件 
  //     components.push(componentConfig.default || componentConfig)
  //     // Vue.component(componentName, componentConfig.default || componentConfig)
  // })

  /*
   * @Author: nutter
   * @Date: 2020-08-19 14:29:53
   * @LastEditors: nutter
   * @LastEditTime: 2020-08-19 14:31:34
   * @FilePath: \nutter-ui\packages\third\index.js
   */
  var Third = {};

  var flatArray = (function (data) {
    for (var key in data) {
      if (data.hasOwnProperty(key) && data[key] instanceof Array) {
        data[key] = data[key].join(',');
      }
    }

    return data;
  });

  var transformRequestFactory = {
    install: function install(transformRequestInterceptor) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (opts.flatArray) {
        transformRequestInterceptor.push(flatArray);
      }
    }
  };

  function hump (data) {
    if (data && _typeof_1(data) === 'object' && !(data instanceof Blob)) {
      return dataToHump(data);
    }

    return data;
  }

  var transformResponseFactory = {
    install: function install(transformResponseInterceptor) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (opts.hump) {
        transformResponseInterceptor.push(hump);
      }
    }
  };

  /*
   * @Author: nutter
   * @Date: 2020-08-21 16:31:18
   * @LastEditors: nutter
   * @LastEditTime: 2020-08-21 16:34:38
   * @FilePath: \nutter-ui\packages\plugins\axios\src\interceptor\src\applicationForm.js
   */

  var require_context_module_0_0 = {
    request: function request(config) {
      // config.contentType || config.ContentType
      if (isApplicationForm(config.contentType || config.ContentType)) {
        config.headers = Object.assign({
          'Content-Type': 'application/x-www-form-urlencoded;chartset=UTF-8'
        }, config.headers);

        if (config.data && type(config.data) === 'object') {
          var params = new URLSearchParams();
          eachOwn(config.data, function (value, key) {
            params.append(key, value);
          });
          config.data = params;
        }
      }

      return config;
    }
  };

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var defineProperty = _defineProperty;

  var authorization = function authorization(_ref) {
    var url = _ref.url,
        method = _ref.method,
        macId = _ref.macId,
        macKey = _ref.macKey;
    var urlDecomposion = decomposeUrl(url);
    return authMac({
      macId: macId,
      macKey: macKey,
      httpMethod: method,
      requestURI: urlDecomposion.uri,
      host: urlDecomposion.host
    });
  };

  var isDomain = function () {
    return !/^\d+$/.test(location.hostname.replace(/\./g, ''));
  }(); // hmac 认证
  // https://coding.net/u/chenzuopeng/p/wm-uc/git


  var require_context_module_0_1 = {
    install: function install(requestInterceptor, responseInterceptor) {
      var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      requestInterceptor.use(function (config) {
        // mac = false 接口不做hmac认证
        if (config.mac !== false && config.headers.Authorization == null) {
          if (!isDomain && console && console.log) {
            console.log('Cookie is used in non-domain, confirm that in your expectation.');
          }

          Object.assign(config.headers, defineProperty({
            Authorization: authorization(Object.assign({
              macId: opts.MAC_ID,
              macKey: opts.getMacKey()
            }, config))
          }, opts.SESSION_ID, opts.getSessionId()));
        }

        return config;
      });
    }
  };

  var require_context_module_0_2 = {
    request: function request(config) {
      if (config.dataToUnderline !== false) {
        var params = config.params || {};

        if (/\?/.test(config.url)) {
          var urlDecomposion = decomposeUrl(config.url);
          config.url = config.url.replace(/(\?.*)$/, '');
          config.params = dataToUnderline(Object.assign(params, urlDecomposion.params));
        } else {
          config.params = dataToUnderline(params);
        }

        if (config.method.toLowerCase() !== 'get') {
          config.data = dataToUnderline(config.data);
        }
      }

      return config;
    }
  };

  // GET禁用缓存 config.cache = true 跳过该拦截器
  var require_context_module_0_3 = {
    request: function request(config) {
      if (config.method.toLowerCase() === 'get' && config.cache !== true) {
        config.params = config.params || {};
        config.params.__ = new Date().getTime();
      }

      return config;
    }
  };

  function handleError(data) {
    elementUi.Message({
      // 格式待定
      message: data.errMsg,
      type: "warning",
      duration: 10000,
      showClose: true
    });
  }

  function handleException(_ref) {
    var status = _ref.status,
        message = _ref.message,
        stack = _ref.stack;
    elementUi.MessageBox({
      title: message || "系统提示",
      message: "<div style='max-height: 250px; overflow: auto;'>".concat(stack, "</div>"),
      type: "error",
      showClose: true,
      dangerouslyUseHTMLString: true,
      callback: function callback(action, instance) {}
    });
  }

  function netErrorTips(time) {
    elementUi.Message({
      message: "您的网络异常，请检查网络后重试!",
      type: "warning",
      duration: time,
      showClose: true
    });
    setTimeout(elementUi.Message.closeAll, time);
  } // 全局错误处理


  var require_context_module_0_4 = {
    options: {
      errorHandle401: false,
      // 全局错误处理器
      errorHandle: function errorHandle(error, opts) {
        if (error.response == null) {
          handleException({
            status: 500,
            message: error.message,
            stack: error.stack
          });
        } else if (error.response.status === 401) {
          if (window.parent && window.parent !== window && window.parent.postMessage) {
            window.parent.postMessage(JSON.stringify({
              name: "error-401",
              data: error
            }), "*");
          } else if (typeof opts.errorHandle401 === "function") {
            opts.errorHandle401(error);
          } else {
            handleException({
              status: error.response.status,
              message: error.message,
              stack: error.stack
            });
          }
        } else if (error.response.data == null || _typeof_1(error.response.data) !== "object") {
          handleException({
            status: error.response.status,
            message: error.message,
            stack: error.stack
          });
        } else if (error.config.handleError !== false) {
          handleError(error.response.data);
        }
      }
    },
    install: function install(requestInterceptor, responseInterceptor) {
      var _this = this;

      var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      opts = Object.assign({}, this.options, opts);
      responseInterceptor.use(function (response) {
        return response;
      }, function (error) {
        if (error.config && error.config.errorHandle !== false) {
          if (!error.response) {
            netErrorTips(_this.opts.netErrorColseTime || 3000);
          } else {
            opts.errorHandle(error, opts);
          }
        }

        return Promise.reject(error);
      });
    }
  };

  /*
   * @Author: nutter
   * @Date: 2020-08-21 16:48:16
   * @LastEditors: nutter
   * @LastEditTime: 2020-08-21 16:48:38
   * @FilePath: \nutter-ui\packages\components\Loader\src\loader.js
   */
  var instance$1 = null;
  var options$1 = {
    fullscreen: true,
    lock: true,
    text: '拼命加载中...'
  };

  var getInstance$1 = function getInstance() {
    // 有可能会出现多实例情况？
    var mask = document.querySelector('.el-loading-mask');

    if (mask && mask.parentNode) {
      mask.parentNode.removeChild(mask);
    }

    return instance$1 = elementUi.Loading.service(options$1);
  };

  var Loader = {
    show: function show() {
      getInstance$1();
    },
    hide: function hide() {
      if (instance$1) {
        instance$1.close();
        instance$1 = null;
      }
    }
  }; // export to window

  if (window) {
    window.__$Loader__ = Loader;
  }

  var Loader$1 = {
    mergeOptions: function mergeOptions() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return options$1 = Object.assign(options$1, opts);
    },
    hassGlobalLoader: function hassGlobalLoader() {
      // return window && window.parent && window.parent.__$Loader__
      return false;
    },
    show: function show() {
      if (this.hassGlobalLoader()) {
        window.parent.__$Loader__.show();
      } else {
        Loader.show();
      }
    },
    hide: function hide() {
      if (this.hassGlobalLoader()) {
        window.parent.__$Loader__.hide();
      } else {
        Loader.hide();
      }
    }
  };

  /*
   * @Author: nutter
   * @Date: 2020-08-21 16:31:18
   * @LastEditors: nutter
   * @LastEditTime: 2020-08-21 16:49:00
   * @FilePath: \nutter-ui\packages\plugins\axios\src\interceptor\src\loading.js
   */
  var requestCount = 0;

  var hideLoader = function hideLoader() {
    var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 150;

    if (--requestCount <= 0) {
      setTimeout(function () {
        Loader$1.hide();
      }, time);
    }
  }; // ajax开始时显示loading 
  // config.loading = false 禁用loading


  var require_context_module_0_5 = {
    request: function request(config) {
      if (config.loading !== false) {
        requestCount++;
        Loader$1.show();
      }

      return config;
    },
    response: {
      success: function success(response) {
        if (response.config.loading !== false) {
          hideLoader();
        }

        return response;
      },
      error: function error(_error) {
        if (_error && _error.config && _error.config.loading !== false) {
          hideLoader();
        }

        return Promise.reject(_error);
      }
    }
  };

  // config.mock = true 启用该拦截器

  var require_context_module_0_6 = {
    options: {
      baseURL: ''
    },
    install: function install(requestInterceptor, responseInterceptor) {
      var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var _Object$assign = Object.assign({}, this.options, opts),
          baseURL = _Object$assign.baseURL;

      if (baseURL) {
        requestInterceptor.use(function (config) {
          if (config.mock === true) {
            if (isAbsoluteUrl(config.url)) {
              if (config.baseURL && config.url.indexOf(config.baseURL) === 0) {
                config.url = config.url.replace(config.baseURL, '');
                config.baseURL = baseURL;
              }
            } else {
              config.baseURL = baseURL;
            }
          }

          return config;
        });
      }
    }
  };

  var require_context_module_0_7 = {
    request: function request(config) {
      if (config.removeEmpty === true) {
        var params = config.params || {}; // 处理params的参数

        params = removeEmpty(params); // 处理url上的参数

        if (config.url.indexOf('?') > -1) {
          var urlDecomposion = decomposeUrl(config.url);
          config.url = config.url.replace(/(\?.*)$/, '');
          params = Object.assign(params, removeEmpty(urlDecomposion.params));
        }

        config.params = params; // 处理data参数

        if (config.method.toLowerCase() !== 'get') {
          config.data = removeEmpty(config.data);
        }
      }

      return config;
    }
  };

  // 只返回response.data，该拦截器必须放置在所有response拦截器的最后
  // config.dataOnly = false 跳过该拦截器
  var require_context_module_0_8 = {
    response: function response(_response) {
      if (_response.config.dataOnly !== false) {
        return _response.data;
      }

      return _response;
    }
  };

  var interceptors = requireContextToObj(function () {
    var map = {
      'D:/项目/学习项目/nutter-ui/packages/plugins/axios/src/interceptor/src/applicationForm.js': require_context_module_0_0,
      'D:/项目/学习项目/nutter-ui/packages/plugins/axios/src/interceptor/src/authMac.js': require_context_module_0_1,
      'D:/项目/学习项目/nutter-ui/packages/plugins/axios/src/interceptor/src/dataToUnderline.js': require_context_module_0_2,
      'D:/项目/学习项目/nutter-ui/packages/plugins/axios/src/interceptor/src/disableCache.js': require_context_module_0_3,
      'D:/项目/学习项目/nutter-ui/packages/plugins/axios/src/interceptor/src/errorHandle.js': require_context_module_0_4,
      'D:/项目/学习项目/nutter-ui/packages/plugins/axios/src/interceptor/src/loading.js': require_context_module_0_5,
      'D:/项目/学习项目/nutter-ui/packages/plugins/axios/src/interceptor/src/mock.js': require_context_module_0_6,
      'D:/项目/学习项目/nutter-ui/packages/plugins/axios/src/interceptor/src/removeEmpty.js': require_context_module_0_7,
      'D:/项目/学习项目/nutter-ui/packages/plugins/axios/src/interceptor/src/returnResponseData.js': require_context_module_0_8
    };

    var req = function req(key) {
      return map[key] || function () {
        throw new Error("Cannot find module '" + key + "'.");
      }();
    };

    req.keys = function () {
      return Object.keys(map);
    };

    return req;
  }());
  var interceptorFactory = {
    install: function install(requestInterceptor, responseInterceptor) {
      var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      eachOwn(opts, function (value, name) {
        if (value !== false && interceptors[name]) {
          var interceptor = interceptors[name]; // 支持install模式
          // 完全自定义处理

          if (typeof interceptor.install === 'function') {
            interceptor.install(requestInterceptor, responseInterceptor, value);
          } // {
          //    request: Function, 
          //    response: Function(success)
          //  } 
          //  or
          // {
          //    request: Function, 
          //    response: {
          //      success: Function,
          //      error: Function
          //    }
          //  }
          else {
              if (interceptor.request) {
                requestInterceptor.use(interceptor.request);
              }

              if (interceptor.response) {
                if (typeof interceptor.response === 'function') {
                  responseInterceptor.use(interceptor.response);
                } else {
                  responseInterceptor.use(interceptor.response.success, interceptor.response.error);
                }
              }
            }
        }
      });
    }
  };

  var axios = {
    install: function install(Vue) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!axios$1) {
        console.warn('Please run npm install --save axios.');
        return;
      }

      var _Object$assign = Object.assign(opts),
          defaults = _Object$assign.defaults,
          transformRequest = _Object$assign.transformRequest,
          transformResponse = _Object$assign.transformResponse,
          interceptor = _Object$assign.interceptor;

      if (defaults !== false) {
        Object.assign(axios$1.defaults, defaults);
      }

      if (transformRequest !== false) {
        transformRequestFactory.install(axios$1.defaults.transformRequest, transformRequest);
      }

      if (transformResponse !== false) {
        transformResponseFactory.install(axios$1.defaults.transformResponse, transformResponse);
      }

      if (interceptor !== false) {
        interceptorFactory.install(axios$1.interceptors.request, axios$1.interceptors.response, interceptor);
      }
    }
  };

  /*
   * @Author: nutter
   * @Date: 2020-03-11 15:46:06
   * @LastEditors: nutter
   * @LastEditTime: 2020-08-24 10:18:44
   * @FilePath: \nutter-ui\packages\index.js
   */

  var install = function install(Vue) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (install.installed) return;
    opts = merger(opts);

    if (opts.components !== false) {
      Vue.use(Components, opts.components);
    }

    if (opts.axios !== false) {
      Vue.use(axios, opts.axios);
    } // if (opts.filters !== false) {
    //     Vue.use(Filters, opts.filters)
    // }


    if (opts.third !== false) {
      Vue.use(Third, opts.third);
    }
  };

  if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  var index$1 = {
    install: install
  };

  exports.default = index$1;
  exports.options = options;
  exports.utils = index;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
