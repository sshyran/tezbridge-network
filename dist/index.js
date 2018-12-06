parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"39eF":[function(require,module,exports) {
"use strict";function e(e){for(var r,t=void 0,n=e,i=arguments.length,o=new Array(i>1?i-1:0),s=1;s<i;s++)o[s-1]=arguments[s];for(;void 0!==(r=o.shift());)if(n instanceof Object&&!(n instanceof Array))t=n[r],n=n[r];else{if(!(n instanceof Array))return;var a=parseInt(r);if(isNaN(a))return;t=n[a],n=n[a]}return t}Object.defineProperty(exports,"__esModule",{value:!0}),exports.safeProp=e;
},{}],"LVu9":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.gets=void 0;var n=require("./types"),e=function(e){var t={custom:function(n){return e(n)},head:function(n){return e("/chains/main/blocks/head/".concat(n||""))},hash:function(){return t.head("hash")},header:function(){return t.head("header")},protocol:function(){return t.header().then(function(e){return(0,n.safeProp)(e,"protocol")})},balance:function(n){return e("/chains/main/blocks/head/context/delegates/".concat(n,"/balance"))},contract:function(n){return e("/chains/main/blocks/head/context/contracts/".concat(n))},manager_key:function(t){return e("/chains/main/blocks/head/context/contracts/".concat(t,"/manager_key")).then(function(e){return(0,n.safeProp)(e,"manager")})}};return t};exports.gets=e;
},{"./types":"39eF"}],"Focm":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.TezBridgeNetwork=void 0;var e=require("./api");function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function r(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var i=function(){function n(r){if(t(this,n),!r.host)throw"Please set the host parameter";this.host=r.host,this.RPCFn=r.RPCFn||null,this.bindApi(e.gets)}return r(n,[{key:"bindApi",value:function(e){var t=this;this.fetch={};var n=e(function(e,n){return t.get.call(t,e,n)});Object.keys(n).forEach(function(e){t.fetch[e]=function(){for(var t=arguments.length,r=new Array(t),o=0;o<t;o++)r[o]=arguments[o];return n[e].apply(null,r)}})}},{key:"get",value:function(e,t){return(this.RPCFn||n.RPCFn)(this.host+e,t,"GET")}},{key:"post",value:function(e,t){return(this.RPCFn||n.RPCFn)(this.host+e,t,"POST")}}]),n}();exports.TezBridgeNetwork=i,o(i,"RPCFn",function(e,t,n){return new Promise(function(r,o){var i=new XMLHttpRequest;i.addEventListener("load",function(e){200===i.status?r(JSON.parse(i.responseText)):o(i.responseText)}),i.addEventListener("error",o),i.addEventListener("abort",o),i.open(n,e),"POST"===n&&i.setRequestHeader("Content-Type","application/json"),i.send(JSON.stringify(t))})});var s=i;exports.default=s;
},{"./api":"LVu9"}]},{},["Focm"], null)
//# sourceMappingURL=/index.map