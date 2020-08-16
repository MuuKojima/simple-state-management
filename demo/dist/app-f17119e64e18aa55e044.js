!function(t){var e={};function n(s){if(e[s])return e[s].exports;var i=e[s]={i:s,l:!1,exports:{}};return t[s].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,s){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(s,i,function(e){return t[e]}.bind(null,i));return s},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/",n(n.s=4)}([function(t,e,n){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n=function(t,e){var n=t[1]||"",s=t[3];if(!s)return n;if(e&&"function"==typeof btoa){var i=(r=s,a=btoa(unescape(encodeURIComponent(JSON.stringify(r)))),c="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(a),"/*# ".concat(c," */")),o=s.sources.map((function(t){return"/*# sourceURL=".concat(s.sourceRoot||"").concat(t," */")}));return[n].concat(o).concat([i]).join("\n")}var r,a,c;return[n].join("\n")}(e,t);return e[2]?"@media ".concat(e[2]," {").concat(n,"}"):n})).join("")},e.i=function(t,n,s){"string"==typeof t&&(t=[[null,t,""]]);var i={};if(s)for(var o=0;o<this.length;o++){var r=this[o][0];null!=r&&(i[r]=!0)}for(var a=0;a<t.length;a++){var c=[].concat(t[a]);s&&i[c[0]]||(n&&(c[2]?c[2]="".concat(n," and ").concat(c[2]):c[2]=n),e.push(c))}},e}},function(t,e,n){var s=n(2),i=n(3);"string"==typeof(i=i.__esModule?i.default:i)&&(i=[[t.i,i,""]]);var o={insert:"head",singleton:!1};s(i,o);t.exports=i.locals||{}},function(t,e,n){"use strict";var s,i=function(){return void 0===s&&(s=Boolean(window&&document&&document.all&&!window.atob)),s},o=function(){var t={};return function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}t[e]=n}return t[e]}}(),r=[];function a(t){for(var e=-1,n=0;n<r.length;n++)if(r[n].identifier===t){e=n;break}return e}function c(t,e){for(var n={},s=[],i=0;i<t.length;i++){var o=t[i],c=e.base?o[0]+e.base:o[0],l=n[c]||0,u="".concat(c," ").concat(l);n[c]=l+1;var d=a(u),h={css:o[1],media:o[2],sourceMap:o[3]};-1!==d?(r[d].references++,r[d].updater(h)):r.push({identifier:u,updater:v(h,e),references:1}),s.push(u)}return s}function l(t){var e=document.createElement("style"),s=t.attributes||{};if(void 0===s.nonce){var i=n.nc;i&&(s.nonce=i)}if(Object.keys(s).forEach((function(t){e.setAttribute(t,s[t])})),"function"==typeof t.insert)t.insert(e);else{var r=o(t.insert||"head");if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(e)}return e}var u,d=(u=[],function(t,e){return u[t]=e,u.filter(Boolean).join("\n")});function h(t,e,n,s){var i=n?"":s.media?"@media ".concat(s.media," {").concat(s.css,"}"):s.css;if(t.styleSheet)t.styleSheet.cssText=d(e,i);else{var o=document.createTextNode(i),r=t.childNodes;r[e]&&t.removeChild(r[e]),r.length?t.insertBefore(o,r[e]):t.appendChild(o)}}function p(t,e,n){var s=n.css,i=n.media,o=n.sourceMap;if(i?t.setAttribute("media",i):t.removeAttribute("media"),o&&btoa&&(s+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),t.styleSheet)t.styleSheet.cssText=s;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(s))}}var m=null,f=0;function v(t,e){var n,s,i;if(e.singleton){var o=f++;n=m||(m=l(e)),s=h.bind(null,n,o,!1),i=h.bind(null,n,o,!0)}else n=l(e),s=p.bind(null,n,e),i=function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(n)};return s(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;s(t=e)}else i()}}t.exports=function(t,e){(e=e||{}).singleton||"boolean"==typeof e.singleton||(e.singleton=i());var n=c(t=t||[],e);return function(t){if(t=t||[],"[object Array]"===Object.prototype.toString.call(t)){for(var s=0;s<n.length;s++){var i=a(n[s]);r[i].references--}for(var o=c(t,e),l=0;l<n.length;l++){var u=a(n[l]);0===r[u].references&&(r[u].updater(),r.splice(u,1))}n=o}}}},function(t,e,n){"use strict";n.r(e);var s=n(0),i=n.n(s)()(!1);i.push([t.i,"body {\n  color: black;\n}\n\ntodo-app {\n  display: flex;\n  align-items: center;\n  justify-items: center;\n  flex-direction: column;\n}\n\n.todos {\n  width: 300px;\n}\n\n.user {\n  text-align: center;\n  margin-bottom: 20px;\n}\n\n.form {\n  display: flex;\n  align-items: center;\n  justify-items: flex-start;\n  margin-bottom: 20px;\n}\n\n.input {\n  flex-grow: 1;\n}\n\n.submit {\n  display: block;\n}\n\n.item {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.item + .item {\n  margin-top: 20px;\n}\n\n.item__title--checked {\n  text-decoration: line-through;\n}\n",""]),e.default=i},function(t,e,n){"use strict";n.r(e);n(1);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const s=new WeakMap,i=t=>"function"==typeof t&&s.has(t),o="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,r=(t,e,n=null)=>{for(;e!==n;){const n=e.nextSibling;t.removeChild(e),e=n}},a={},c={},l=`{{lit-${String(Math.random()).slice(2)}}}`,u=`\x3c!--${l}--\x3e`,d=new RegExp(`${l}|${u}`);class h{constructor(t,e){this.parts=[],this.element=e;const n=[],s=[],i=document.createTreeWalker(e.content,133,null,!1);let o=0,r=-1,a=0;const{strings:c,values:{length:u}}=t;for(;a<u;){const t=i.nextNode();if(null!==t){if(r++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:n}=e;let s=0;for(let t=0;t<n;t++)p(e[t].name,"$lit$")&&s++;for(;s-- >0;){const e=c[a],n=v.exec(e)[2],s=n.toLowerCase()+"$lit$",i=t.getAttribute(s);t.removeAttribute(s);const o=i.split(d);this.parts.push({type:"attribute",index:r,name:n,strings:o}),a+=o.length-1}}"TEMPLATE"===t.tagName&&(s.push(t),i.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(l)>=0){const s=t.parentNode,i=e.split(d),o=i.length-1;for(let e=0;e<o;e++){let n,o=i[e];if(""===o)n=f();else{const t=v.exec(o);null!==t&&p(t[2],"$lit$")&&(o=o.slice(0,t.index)+t[1]+t[2].slice(0,-"$lit$".length)+t[3]),n=document.createTextNode(o)}s.insertBefore(n,t),this.parts.push({type:"node",index:++r})}""===i[o]?(s.insertBefore(f(),t),n.push(t)):t.data=i[o],a+=o}}else if(8===t.nodeType)if(t.data===l){const e=t.parentNode;null!==t.previousSibling&&r!==o||(r++,e.insertBefore(f(),t)),o=r,this.parts.push({type:"node",index:r}),null===t.nextSibling?t.data="":(n.push(t),r--),a++}else{let e=-1;for(;-1!==(e=t.data.indexOf(l,e+1));)this.parts.push({type:"node",index:-1}),a++}}else i.currentNode=s.pop()}for(const t of n)t.parentNode.removeChild(t)}}const p=(t,e)=>{const n=t.length-e.length;return n>=0&&t.slice(n)===e},m=t=>-1!==t.index,f=()=>document.createComment(""),v=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class g{constructor(t,e,n){this.__parts=[],this.template=t,this.processor=e,this.options=n}update(t){let e=0;for(const n of this.__parts)void 0!==n&&n.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=o?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=[],n=this.template.parts,s=document.createTreeWalker(t,133,null,!1);let i,r=0,a=0,c=s.nextNode();for(;r<n.length;)if(i=n[r],m(i)){for(;a<i.index;)a++,"TEMPLATE"===c.nodeName&&(e.push(c),s.currentNode=c.content),null===(c=s.nextNode())&&(s.currentNode=e.pop(),c=s.nextNode());if("node"===i.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(c.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(c,i.name,i.strings,this.options));r++}else this.__parts.push(void 0),r++;return o&&(document.adoptNode(t),customElements.upgrade(t)),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const _=` ${l} `;class b{constructor(t,e,n,s){this.strings=t,this.values=e,this.type=n,this.processor=s}getHTML(){const t=this.strings.length-1;let e="",n=!1;for(let s=0;s<t;s++){const t=this.strings[s],i=t.lastIndexOf("\x3c!--");n=(i>-1||n)&&-1===t.indexOf("--\x3e",i+1);const o=v.exec(t);e+=null===o?t+(n?_:u):t.substr(0,o.index)+o[1]+o[2]+"$lit$"+o[3]+l}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const y=t=>null===t||!("object"==typeof t||"function"==typeof t),x=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class w{constructor(t,e,n){this.dirty=!0,this.element=t,this.name=e,this.strings=n,this.parts=[];for(let t=0;t<n.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new N(this)}_getValue(){const t=this.strings,e=t.length-1;let n="";for(let s=0;s<e;s++){n+=t[s];const e=this.parts[s];if(void 0!==e){const t=e.value;if(y(t)||!x(t))n+="string"==typeof t?t:String(t);else for(const e of t)n+="string"==typeof e?e:String(e)}}return n+=t[e],n}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class N{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===a||y(t)&&t===this.value||(this.value=t,i(t)||(this.committer.dirty=!0))}commit(){for(;i(this.value);){const t=this.value;this.value=a,t(this)}this.value!==a&&this.committer.commit()}}class T{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(f()),this.endNode=t.appendChild(f())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=f()),t.__insert(this.endNode=f())}insertAfterPart(t){t.__insert(this.startNode=f()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;i(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=a,t(this)}const t=this.__pendingValue;t!==a&&(y(t)?t!==this.value&&this.__commitText(t):t instanceof b?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):x(t)?this.__commitIterable(t):t===c?(this.value=c,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,n="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=n:this.__commitNode(document.createTextNode(n)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof g&&this.value.template===e)this.value.update(t.values);else{const n=new g(e,t.processor,this.options),s=n._clone();n.update(t.values),this.__commitNode(s),this.value=n}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let n,s=0;for(const i of t)n=e[s],void 0===n&&(n=new T(this.options),e.push(n),0===s?n.appendIntoPart(this):n.insertAfterPart(e[s-1])),n.setValue(i),n.commit(),s++;s<e.length&&(e.length=s,this.clear(n&&n.endNode))}clear(t=this.startNode){r(this.startNode.parentNode,t.nextSibling,this.endNode)}}class k{constructor(t,e,n){if(this.value=void 0,this.__pendingValue=void 0,2!==n.length||""!==n[0]||""!==n[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=n}setValue(t){this.__pendingValue=t}commit(){for(;i(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=a,t(this)}if(this.__pendingValue===a)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=a}}class E extends w{constructor(t,e,n){super(t,e,n),this.single=2===n.length&&""===n[0]&&""===n[1]}_createPart(){return new V(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class V extends N{}let S=!1;(()=>{try{const t={get capture(){return S=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class A{constructor(t,e,n){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=n,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;i(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=a,t(this)}if(this.__pendingValue===a)return;const t=this.__pendingValue,e=this.value,n=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),s=null!=t&&(null==e||n);n&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),s&&(this.__options=j(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=a}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const j=t=>t&&(S?{capture:t.capture,passive:t.passive,once:t.once}:t.capture)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */;const M=new class{handleAttributeExpressions(t,e,n,s){const i=e[0];if("."===i){return new E(t,e.slice(1),n).parts}if("@"===i)return[new A(t,e.slice(1),s.eventContext)];if("?"===i)return[new k(t,e.slice(1),n)];return new w(t,e,n).parts}handleTextExpression(t){return new T(t)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */function C(t){let e=$.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},$.set(t.type,e));let n=e.stringsArray.get(t.strings);if(void 0!==n)return n;const s=t.strings.join(l);return n=e.keyString.get(s),void 0===n&&(n=new h(t,t.getTemplateElement()),e.keyString.set(s,n)),e.stringsArray.set(t.strings,n),n}const $=new Map,O=new WeakMap;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.2.1");const P=(t,...e)=>new b(t,e,"html",M);function L(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function H(t,e){for(var n=0;n<e.length;n++){var s=e[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}function I(t,e,n){return e&&H(t.prototype,e),n&&H(t,n),t}var R=function(t,e){return e.split(".").reduce((function(t,e){return(t||{})[e]}),t)},B=function(){function t(){L(this,t),this.events={}}return I(t,[{key:"subscribe",value:function(t,e){var n=this;Object.prototype.hasOwnProperty.call(this.events,t)||(this.events[t]=[]),this.events[t].push(e);return function(){n.events[t]=n.events[t].filter((function(t){return e!==t}))}}},{key:"publish",value:function(t){Object.prototype.hasOwnProperty.call(this.events,t)&&this.events[t].forEach((function(t){return t()}))}}]),t}();var U=new(function(){function t(e){L(this,t);var n=e.actions,s=e.mutations,i=e.states,o=e.getters;if(!(n&&s&&i&&o))throw new Error("You must add actions, mutations, states, getters");this.events=new B,this.actions=n,this.mutations=s,this.states=i,this.getters_=o}return I(t,[{key:"dispatch",value:function(t,e){var n=R(this.actions,t);return"function"!=typeof n?(console.error("Action: actionName doesn't exist => ".concat(t)),window.Promise.reject()):n({commit:this.commit.bind(this),getters:this.getters.bind(this)},e)}},{key:"commit",value:function(t,e){var n=R(this.mutations,t);if("function"==typeof n){var s=n({states:this.states},e);this.events.publish(s)}else console.error("Mutation: mutationName doesn't exist => ".concat(t))}},{key:"getters",value:function(t,e){var n=R(this.getters_,t);if("function"==typeof n)return n({states:this.states},e);console.error("Getter: getterName doesn't exist => ".concat(t))}},{key:"subscribe",value:function(t,e){return this.events.subscribe(t,e)}}]),t}())({actions:{users:{async fetchMe(t){let e;await new Promise(t=>setTimeout(()=>{e={name:"Bob"},t()},1e3)),t.commit("users.me",e)}},todos:{async fetchList(t){let e;await new Promise(t=>setTimeout(()=>{e=[{id:0,title:"A Task",checked:!0},{id:1,title:"B Task",checked:!1},{id:2,title:"C Task",checked:!0}],t()},1e3)),t.commit("todos.list",e)},async add(t,e){const{title:n}=e,s=t.getters("todos.list").map(t=>Object.assign({},t)),i={id:s.length,title:n,checked:!1};s.push(i),t.commit("todos.list",s)},async toggle(t,e){const{id:n,checked:s}=e,i=t.getters("todos.list").map(t=>{const e=Object.assign({},t);return e.id===n&&(e.checked=s),e});t.commit("todos.list",i)},async remove(t,e){const{id:n}=e,s=t.getters("todos.list").filter(t=>t.id!==n);t.commit("todos.list",s)}}},mutations:{users:{me:(t,e)=>(t.states.users.me=e,"users")},todos:{list:(t,e)=>(t.states.todos.list=e,"todos")}},getters:{users:{me:t=>t.states.users.me},todos:{list:t=>t.states.todos.list}},states:{users:{me:null},todos:{list:[]}}});class F extends HTMLElement{static get is(){return"todo-app"}constructor(){super(),this.me=null,this.list=[],this.unsbscribeUsers=null,this.unsbscribeTodos=null}connectedCallback(){this.fetch(),this.ready(),this.draw()}disconnectedCallback(){this.unsbscribeUsers&&this.unsbscribeUsers(),this.unsbscribeTodos&&this.unsbscribeTodos()}fetch(){const t=[U.dispatch("users.fetchMe"),U.dispatch("todos.fetchList")];Promise.all(t).catch(t=>console.error(t))}ready(){this.list=U.getters("todos.list"),this.unsbscribeTodos=U.subscribe("todos",()=>{this.list=U.getters("todos.list"),this.draw()}),this.me=U.getters("users.me"),this.unsbscribeUsers=U.subscribe("users",()=>{this.me=U.getters("users.me"),this.draw()})}draw(){((t,e,n)=>{let s=O.get(e);void 0===s&&(r(e,e.firstChild),O.set(e,s=new T(Object.assign({templateFactory:C},n))),s.appendInto(e)),s.setValue(t),s.commit()})(P`
        <h1>Todo App</h1>
        <div class="todos">
          <div class="user">UserName: ${this.me?this.me.name:""}</div>
          <form class="form" @submit=${this.dispatchAdd}>
            <input class="input" placeholder="new task" type="text">
            <input class="submit" type="submit" value="add">
          </form>
          <div class="list">
            ${this.list.map(t=>P`
                <div class="item">
                  <div class="item__title ${t.checked?"item__title--checked":""}">${t.title}</div>
                  <input type="checkbox"
                    id=${t.id}
                    .checked=${t.checked}
                    @change=${this.dispatchToggle}
                  >
                  <button type="button"
                    id=${t.id}
                    @click=${this.dispatchRemove}
                  >
                    remove
                  </button>
                </div>
              `)}
          </div>
        </div>
      `,this)}dispatchAdd(t){t.preventDefault();const e={title:document.querySelector(".input").value};U.dispatch("todos.add",e)}dispatchToggle(t){const e={id:Number(t.currentTarget.id),checked:t.currentTarget.checked};U.dispatch("todos.toggle",e)}dispatchRemove(t){const e={id:Number(t.currentTarget.id)};U.dispatch("todos.remove",e)}}!window.customElements.get(F.is)&&window.customElements.define(F.is,F)}]);