!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("axios"),require("extend"),require("vue-cookie")):"function"==typeof define&&define.amd?define("NutterUi",["axios","extend","vue-cookie"],t):"object"==typeof exports?exports.NutterUi=t(require("axios"),require("extend"),require("vue-cookie")):e.NutterUi=t(e.axios,e.extend,e["vue-cookie"])}("undefined"!=typeof self?self:this,function(e,t,n){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=101)}({10:function(e,t){e.exports=n},101:function(e,t,n){e.exports=n(5)},4:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=["abcdefghijklmnopqrstuvwxyz","ABCDEFGHIJKLMNOPQRSTUVWXYZ","1234567890"],o=(t.setModel=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];r=e.slice()},t.randRange=function(e,t){return Math.floor(Math.max(e,Math.random()*(t+1)))});t.default=function(e){for(var t="",n=r.length-1;e--;){var i=o(0,n);t+=r[i].charAt(o(0,r[i].length))}return t}},5:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.merger=void 0;var o=n(9),i=r(o),u=n(10),a=r(u),d=n(4),s=n(7),c=r(s),l={debug:!0,profile:{imgDomain:""},libs:{ckeditor:null},plugins:{},filters:{date:!0,currency:!0,value:!0,url:!0},components:{editor:{},messageBox:{},modal:{},notify:{},upload:{upload:{},imageUpload:{}},loader:{}},axios:{defaults:{},interceptor:{applicationForm:!0,dataToUnderline:!0,disableCache:!0,errorHandle:!0,loading:!0,authMac:{MAC_ID:"2YotnFZFEjr1zCsicMWpAA",MAC_KEY:"mac_key",SESSION_ID:"session_id",decode:!0,getMacKey:function(){var e=a.default.get(this.MAC_KEY)||"";return this.decode?decodeURIComponent(e):e},getSessionId:function(){var e=a.default.get(this.SESSION_ID)||"";return this.decode?decodeURIComponent(e):e}},removeEmpty:!0,returnResponseData:!0},transformResponse:{hump:!0}},third:{qiniu:{httpRequest:{qiniuTokenUrl:function(e){return"/v1.0/common/"+e+"/qiniu_token"},getServerConfig:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return(0,c.default)({url:this.qiniuTokenUrl(t),method:"GET",responseType:"json"}).then(function(t){var n=t;return{domain:n.domainUrl,zoneUrl:e.getZoneUrl(n.qiniuZone.upUrls),token:n.token}})},getZoneUrl:function(e){if(Array.isArray(e)){var t=e.length;return e[(0,d.randRange)(0,t-1)]}return String(e)}}}},utils:{fmt:{date:{format:"yyyy-MM-dd hh:mm:ss"},currency:{places:2,symbol:"￥",thousand:", ",decimal:"."}},authMac:{requestContentSymbol:"\n",authMacSymbol:"MAC",nonceLen:8}}};t.merger=function(e){return(0,i.default)(!0,l,e)};t.default=l},7:function(t,n){t.exports=e},9:function(e,n){e.exports=t}})});