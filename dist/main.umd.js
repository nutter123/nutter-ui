(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue'), require('element-ui'), require('extend'), require('axios')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue', 'element-ui', 'extend', 'axios'], factory) :
  (global = global || self, factory(global.nutterUi = {}, global.Vue, global.elementUi, global.extend, global.axios));
}(this, (function (exports, Vue, elementUi, extend, axios) { 'use strict';

  Vue = Vue && Object.prototype.hasOwnProperty.call(Vue, 'default') ? Vue['default'] : Vue;
  extend = extend && Object.prototype.hasOwnProperty.call(extend, 'default') ? extend['default'] : extend;
  axios = axios && Object.prototype.hasOwnProperty.call(axios, 'default') ? axios['default'] : axios;

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
        )
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
  var script$4 = {
    name: "n-col-item",
    props: {
      type: String
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
      "el-col",
      {
        staticClass: "n-col-item",
        attrs: { xs: 24, sm: 12, md: 10, lg: 8, xl: 6 }
      },
      [_vm._t("default")],
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

  /*
   * @Author: nutter
   * @Date: 2020-08-19 11:23:01
   * @LastEditors: nutter
   * @LastEditTime: 2020-08-19 11:23:17
   * @FilePath: \nutter-ui\packages\components\ColItem\index.js
   */

  __vue_component__$4.install = function (Vue) {
    Vue.component(__vue_component__$4.name, __vue_component__$4);
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

  /*
   * @Author: nutter
   * @Date: 2020-03-12 09:32:35
   * @LastEditors: nutter
   * @LastEditTime: 2020-08-20 14:35:22
   * @FilePath: \nutter-ui\packages\utils\index.js
   */

  var index = /*#__PURE__*/Object.freeze({
    __proto__: null,
    callOrApply: callOrApply,
    isIE: isIE,
    fmt: fmt,
    eachOwn: eachOwn,
    restructureVueCtor: restructureVueCtor,
    restructureDefaultPropsOfVueCtorFromOptions: restructureDefaultPropsOfVueCtorFromOptions
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

  /**
   * 取得[最小值， 最大值]之间的随机数
   * @param {*} min 最小值
   * @param {*} max 最大值
   */

  var randRange = function randRange(min, max) {
    return Math.floor(Math.max(min, Math.random() * (max + 1)));
  };

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
            return axios({
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
  var script$5 = {
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
  const __vue_script__$5 = script$5;

  /* template */
  var __vue_render__$5 = function() {
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

  //
  var script$6 = {
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
  const __vue_script__$6 = script$6;

  /* template */
  var __vue_render__$6 = function() {
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
   * @Date: 2020-08-20 16:57:28
   * @LastEditors: nutter
   * @LastEditTime: 2020-08-20 16:58:13
   * @FilePath: \nutter-ui\packages\components\MessageBox\index.js
   */
  var ImagePreviewBoxConstructor = Vue.extend(__vue_component__$6);
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
  var script$7 = {
    name: "n-upload-image",
    components: {
      Upload: __vue_component__$5
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
  const __vue_script__$7 = script$7;

  /* template */
  var __vue_render__$7 = function() {
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
  var __vue_staticRenderFns__$7 = [];
  __vue_render__$7._withStripped = true;

    /* style */
    const __vue_inject_styles__$7 = undefined;
    /* scoped */
    const __vue_scope_id__$7 = undefined;
    /* module identifier */
    const __vue_module_identifier__$7 = undefined;
    /* functional template */
    const __vue_is_functional_template__$7 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$7 = normalizeComponent(
      { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
      __vue_inject_styles__$7,
      __vue_script__$7,
      __vue_scope_id__$7,
      __vue_is_functional_template__$7,
      __vue_module_identifier__$7,
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

  __vue_component__$5.install = function (Vue) {
    Vue.component(__vue_component__$5.name, __vue_component__$5);
    Vue.component(__vue_component__$7.name, __vue_component__$7);
  };

  /*
   * @Author: nutter
   * @Date: 2020-03-23 10:52:48
   * @LastEditors: nutter
   * @LastEditTime: 2020-08-20 14:16:00
   * @FilePath: \nutter-ui\packages\components\index.js
   */
  var Components = {
    install: function install(Vue) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      Vue.use(__vue_component__, opts.button);
      Vue.use(__vue_component__$1, opts.icon);
      Vue.use(__vue_component__$2, opts.title);
      Vue.use(__vue_component__$3, opts.dialog);
      Vue.use(__vue_component__$4, opts.colItem);
      Vue.use(__vue_component__$5, opts.upload);
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

  /*
   * @Author: nutter
   * @Date: 2020-03-11 15:46:06
   * @LastEditors: nutter
   * @LastEditTime: 2020-08-20 17:17:17
   * @FilePath: \nutter-ui\packages\index.js
   */

  var install = function install(Vue) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (install.installed) return;
    opts = merger(opts);

    if (opts.components !== false) {
      Vue.use(Components, opts.components);
    } // if (opts.plugins !== false) {
    //     Vue.use(Plugins, opts.plugins)
    // }
    // if (opts.filters !== false) {
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
