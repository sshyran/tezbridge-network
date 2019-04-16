parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"39eF":[function(require,module,exports) {
"use strict";function e(e,...r){let t,n=void 0,s=e;for(;void 0!==(t=r.shift());)if(s instanceof Object&&!(s instanceof Array))n=s[t],s=s[t];else{if(!(s instanceof Array))return;{const e=parseInt(t);if(isNaN(e))return;n=s[e],s=s[e]}}return n}Object.defineProperty(exports,"__esModule",{value:!0}),exports.safeProp=e;
},{}],"Y/Oq":[function(require,module,exports) {
"use strict";function t(t,...x){let e=x.shift(),n=t;for(;void 0!==e;){if(!(e in n)||void 0===n[e])throw`Property: ${e} is not in the object`;n=n[e=x.shift()]}}function x(t){if(-1===t.indexOf("/"))throw"The input hash_url should be in this format: `xx/xx/xx/xx/xx/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`";const x="/"===t[0]?1:0,e="/"===t.slice(-1)?-1:t.length;return t.slice(x,e)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.checkProps=t,exports.filterHashUrl=x,exports.OpStep=void 0;class e{constructor(t,...x){this.main_fn=t,this.next_nodes=x}run(...t){const x=this.main_fn.apply(this,t);return"boolean"==typeof x?x?this.next_nodes[0]&&this.next_nodes[0].run():this.next_nodes[1]&&this.next_nodes[1].run():x instanceof Promise?x.then(t=>this.next_nodes[0]&&this.next_nodes[0].run(t)).catch(t=>{throw`OpStep error caught: ${t}`}):void 0}}exports.OpStep=e;
},{}],"cg5q":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.Mixed=exports.Posts=exports.Gets=void 0;var t=require("../types"),e=require("../util");function s(t,e,s){return e in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}class r{constructor(t){this.fetch=t}custom(t){return this.fetch(t)}head(t){return this.fetch(`/chains/main/blocks/head/${t||""}`)}hash(){return this.head("hash")}header(){return this.head("header")}protocol(){return this.header().then(e=>(0,t.safeProp)(e,"protocol"))}predecessor(){return this.header().then(e=>(0,t.safeProp)(e,"predecessor"))}balance(t){return this.fetch(`/chains/main/blocks/head/context/delegates/${t}/balance`)}contract(t){return this.fetch(`/chains/main/blocks/head/context/contracts/${t}`)}contract_bytes(t,s){const r=(0,e.filterHashUrl)(t);return this.fetch(`/chains/main/blocks/head/context/raw/bytes/contracts/index/originated/${r}${s||""}`)}storage_bytes(t){return this.contract_bytes(t,"/data/storage")}big_map_bytes(t){return this.contract_bytes(t,"/big_map")}manager_key(t){return this.fetch(`/chains/main/blocks/head/context/contracts/${t}/manager_key`)}counter(t){return this.fetch(`/chains/main/blocks/head/context/contracts/${t}/counter`)}}exports.Gets=r;class a{constructor(t){this.submit=t}pack_data(e,s){const r={data:e,type:s,gas:"400000"};return this.submit("/chains/main/blocks/head/helpers/scripts/pack_data",r).then(e=>(0,t.safeProp)(e,"packed"))}forge_operation(t,e){const s={branch:t,contents:e};return this.submit("/chains/main/blocks/head/helpers/forge/operations",s)}preapply_operation(t,e,s,r){const a={branch:t,contents:e,protocol:s,signature:r};return this.submit("/chains/main/blocks/head/helpers/preapply/operations",[a])}inject_operation(t){return this.submit("/injection/operation",t)}}exports.Posts=a;class n{constructor(t,e){this.fetch=t,this.submit=e}async makeOperationBytes(e,s){const r=[],a=await this.fetch.counter(e.source),i=await this.fetch.manager_key(e.source);if("string"!=typeof a)throw"Invalid counter";let o=parseInt(a)+1+"";if(!(0,t.safeProp)(i,"key")){const t=n.params.reveal(e.source,e.public_key,o);s.length&&"reveal"===s[0].kind?r.push(Object.assign({},t,s.shift())):r.push(t),o=parseInt(o)+1+""}const c=(0,t.safeProp)(i,"manager");if("string"!=typeof c)throw"Invalid manager public key hash";s.forEach(t=>{const s={reveal:null,origination:Object.assign({},n.params.origination(e.source,c,o),t),transaction:Object.assign({},n.params.transaction(e.source,t.destination||"",o),t)}[t.kind];if(!s)throw`Invalid t(${t.kind}) in makeOperationBytes`;r.push(s),o=parseInt(o)+1+""});const h=await this.fetch.hash();if("string"!=typeof h)throw`Error type for head_hash result: ${h.toString()}`;const u=await this.submit.forge_operation(h,r);return{protocol:await this.fetch.protocol(),operation_hex:u,branch:h,contents:r}}async makeOriginationBytes(t,e){return this.makeOperationBytes({source:t.source,public_key:t.public_key},[Object.assign({kind:"origination"},e)])}async makeTransactionBytes(t,e){return this.makeOperationBytes({source:t.source,public_key:t.public_key},[Object.assign({kind:"transaction"},e)])}}exports.Mixed=n,s(n,"params",{reveal:(t,e,s)=>({kind:"reveal",source:t,fee:"1300",gas_limit:"10000",storage_limit:"0",public_key:e,counter:s}),transaction:(t,e,s)=>({kind:"transaction",source:t,fee:"400000",gas_limit:"400000",storage_limit:"60000",amount:"0",counter:s,destination:e}),origination:(t,e,s)=>({kind:"origination",source:t,fee:"400000",counter:s,gas_limit:"400000",storage_limit:"60000",managerPubkey:e,balance:"0"})});var i={Gets:r,Posts:a,Mixed:n};exports.default=i;
},{"../types":"39eF","../util":"Y/Oq"}],"Focm":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.TezBridgeNetwork=void 0;var t=e(require("./PsddFKi3/api"));function e(t){return t&&t.__esModule?t:{default:t}}const s=(()=>{if("browser"===process.env.NODE_ENV)return(t,e,s)=>new Promise((o,r)=>{const i=new XMLHttpRequest;i.addEventListener("load",t=>{200===i.status?o(JSON.parse(i.responseText)):r(i.responseText)}),i.addEventListener("error",r),i.addEventListener("abort",r),i.open(s,t),"POST"===s&&i.setRequestHeader("Content-Type","application/json"),i.send(JSON.stringify(e))});{const t=require("https"),e=require("url");return(s,o,r)=>new Promise((i,n)=>{const h=e.parse(s),a={hostname:h.hostname,port:h.port,path:h.path,method:r,headers:{"Content-Type":"application/json"}},d=t.request(a,t=>{let e="";t.on("data",t=>{e+=t.toString()}),t.on("end",()=>{try{i(JSON.parse(e))}catch(t){console.log("[31m%s[0m","RPC result JSON.parse error: ",e)}})});d.on("error",t=>{n(t)}),"POST"===r&&d.write(JSON.stringify(o)),d.end()})}})(),o={PsddFKi3:t.default};class r{constructor(t){if(!t.host)throw"Please set the host parameter";this.host=t.host,this.RPCFn=s;const e=t.protocol||"PsddFKi3";if(!(e in o))throw`Protocol:${e} doesn't exist in protocols`;this.fetch=new o[e].Gets((t,e)=>this.get.call(this,t,e)),this.submit=new o[e].Posts((t,e)=>this.post.call(this,t,e)),this.mixed=new o[e].Mixed(this.fetch,this.submit)}switchProtocol(t){if(!(t in o))throw`Protocol:${t} doesn't exist in protocols`;this.fetch=new o[t].Gets((t,e)=>this.get.call(this,t,e)),this.submit=new o[t].Posts((t,e)=>this.post.call(this,t,e)),this.mixed=new o[t].Mixed(this.fetch,this.submit)}get(t,e){return this.RPCFn(this.host+t,e,"GET")}post(t,e){return this.RPCFn(this.host+t,e,"POST")}}exports.TezBridgeNetwork=r;var i=r;exports.default=i;
},{"./PsddFKi3/api":"cg5q"}]},{},["Focm"], null)
//# sourceMappingURL=/index.js.map