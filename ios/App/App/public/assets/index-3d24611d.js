var oe=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Wr($){return $&&$.__esModule&&Object.prototype.hasOwnProperty.call($,"default")?$.default:$}function ae($){throw new Error('Could not dynamically require "'+$+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var We={exports:{}};/*!
    localForage -- Offline Storage, Improved
    Version 1.10.0
    https://localforage.github.io/localForage
    (c) 2013-2017 Mozilla, Apache License 2.0
*/(function($,S){(function(E){$.exports=E()})(function(){return function E(F,Q,I){function L(B,z){if(!Q[B]){if(!F[B]){var d=typeof ae=="function"&&ae;if(!z&&d)return d(B,!0);if(_)return _(B,!0);var h=new Error("Cannot find module '"+B+"'");throw h.code="MODULE_NOT_FOUND",h}var R=Q[B]={exports:{}};F[B][0].call(R.exports,function(N){var W=F[B][1][N];return L(W||N)},R,R.exports,E,F,Q,I)}return Q[B].exports}for(var _=typeof ae=="function"&&ae,O=0;O<I.length;O++)L(I[O]);return L}({1:[function(E,F,Q){(function(I){var L=I.MutationObserver||I.WebKitMutationObserver,_;if(L){var O=0,B=new L(N),z=I.document.createTextNode("");B.observe(z,{characterData:!0}),_=function(){z.data=O=++O%2}}else if(!I.setImmediate&&typeof I.MessageChannel<"u"){var d=new I.MessageChannel;d.port1.onmessage=N,_=function(){d.port2.postMessage(0)}}else"document"in I&&"onreadystatechange"in I.document.createElement("script")?_=function(){var T=I.document.createElement("script");T.onreadystatechange=function(){N(),T.onreadystatechange=null,T.parentNode.removeChild(T),T=null},I.document.documentElement.appendChild(T)}:_=function(){setTimeout(N,0)};var h,R=[];function N(){h=!0;for(var T,K,x=R.length;x;){for(K=R,R=[],T=-1;++T<x;)K[T]();x=R.length}h=!1}F.exports=W;function W(T){R.push(T)===1&&!h&&_()}}).call(this,typeof oe<"u"?oe:typeof self<"u"?self:typeof window<"u"?window:{})},{}],2:[function(E,F,Q){var I=E(1);function L(){}var _={},O=["REJECTED"],B=["FULFILLED"],z=["PENDING"];F.exports=d;function d(l){if(typeof l!="function")throw new TypeError("resolver must be a function");this.state=z,this.queue=[],this.outcome=void 0,l!==L&&W(this,l)}d.prototype.catch=function(l){return this.then(null,l)},d.prototype.then=function(l,g){if(typeof l!="function"&&this.state===B||typeof g!="function"&&this.state===O)return this;var y=new this.constructor(L);if(this.state!==z){var w=this.state===B?l:g;R(y,w,this.outcome)}else this.queue.push(new h(y,l,g));return y};function h(l,g,y){this.promise=l,typeof g=="function"&&(this.onFulfilled=g,this.callFulfilled=this.otherCallFulfilled),typeof y=="function"&&(this.onRejected=y,this.callRejected=this.otherCallRejected)}h.prototype.callFulfilled=function(l){_.resolve(this.promise,l)},h.prototype.otherCallFulfilled=function(l){R(this.promise,this.onFulfilled,l)},h.prototype.callRejected=function(l){_.reject(this.promise,l)},h.prototype.otherCallRejected=function(l){R(this.promise,this.onRejected,l)};function R(l,g,y){I(function(){var w;try{w=g(y)}catch(C){return _.reject(l,C)}w===l?_.reject(l,new TypeError("Cannot resolve promise with itself")):_.resolve(l,w)})}_.resolve=function(l,g){var y=T(N,g);if(y.status==="error")return _.reject(l,y.value);var w=y.value;if(w)W(l,w);else{l.state=B,l.outcome=g;for(var C=-1,P=l.queue.length;++C<P;)l.queue[C].callFulfilled(g)}return l},_.reject=function(l,g){l.state=O,l.outcome=g;for(var y=-1,w=l.queue.length;++y<w;)l.queue[y].callRejected(g);return l};function N(l){var g=l&&l.then;if(l&&(typeof l=="object"||typeof l=="function")&&typeof g=="function")return function(){g.apply(l,arguments)}}function W(l,g){var y=!1;function w(U){y||(y=!0,_.reject(l,U))}function C(U){y||(y=!0,_.resolve(l,U))}function P(){g(C,w)}var M=T(P);M.status==="error"&&w(M.value)}function T(l,g){var y={};try{y.value=l(g),y.status="success"}catch(w){y.status="error",y.value=w}return y}d.resolve=K;function K(l){return l instanceof this?l:_.resolve(new this(L),l)}d.reject=x;function x(l){var g=new this(L);return _.reject(g,l)}d.all=ue;function ue(l){var g=this;if(Object.prototype.toString.call(l)!=="[object Array]")return this.reject(new TypeError("must be an array"));var y=l.length,w=!1;if(!y)return this.resolve([]);for(var C=new Array(y),P=0,M=-1,U=new this(L);++M<y;)V(l[M],M);return U;function V(Z,re){g.resolve(Z).then(se,function(J){w||(w=!0,_.reject(U,J))});function se(J){C[re]=J,++P===y&&!w&&(w=!0,_.resolve(U,C))}}}d.race=j;function j(l){var g=this;if(Object.prototype.toString.call(l)!=="[object Array]")return this.reject(new TypeError("must be an array"));var y=l.length,w=!1;if(!y)return this.resolve([]);for(var C=-1,P=new this(L);++C<y;)M(l[C]);return P;function M(U){g.resolve(U).then(function(V){w||(w=!0,_.resolve(P,V))},function(V){w||(w=!0,_.reject(P,V))})}}},{1:1}],3:[function(E,F,Q){(function(I){typeof I.Promise!="function"&&(I.Promise=E(2))}).call(this,typeof oe<"u"?oe:typeof self<"u"?self:typeof window<"u"?window:{})},{2:2}],4:[function(E,F,Q){var I=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function L(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _(){try{if(typeof indexedDB<"u")return indexedDB;if(typeof webkitIndexedDB<"u")return webkitIndexedDB;if(typeof mozIndexedDB<"u")return mozIndexedDB;if(typeof OIndexedDB<"u")return OIndexedDB;if(typeof msIndexedDB<"u")return msIndexedDB}catch(e){return}}var O=_();function B(){try{if(!O||!O.open)return!1;var e=typeof openDatabase<"u"&&/(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent)&&!/BlackBerry/.test(navigator.platform),t=typeof fetch=="function"&&fetch.toString().indexOf("[native code")!==-1;return(!e||t)&&typeof indexedDB<"u"&&typeof IDBKeyRange<"u"}catch(r){return!1}}function z(e,t){e=e||[],t=t||{};try{return new Blob(e,t)}catch(n){if(n.name!=="TypeError")throw n;for(var r=typeof BlobBuilder<"u"?BlobBuilder:typeof MSBlobBuilder<"u"?MSBlobBuilder:typeof MozBlobBuilder<"u"?MozBlobBuilder:WebKitBlobBuilder,o=new r,a=0;a<e.length;a+=1)o.append(e[a]);return o.getBlob(t.type)}}typeof Promise>"u"&&E(3);var d=Promise;function h(e,t){t&&e.then(function(r){t(null,r)},function(r){t(r)})}function R(e,t,r){typeof t=="function"&&e.then(t),typeof r=="function"&&e.catch(r)}function N(e){return typeof e!="string"&&(console.warn(e+" used as a key, but it is not a string."),e=String(e)),e}function W(){if(arguments.length&&typeof arguments[arguments.length-1]=="function")return arguments[arguments.length-1]}var T="local-forage-detect-blob-support",K=void 0,x={},ue=Object.prototype.toString,j="readonly",l="readwrite";function g(e){for(var t=e.length,r=new ArrayBuffer(t),o=new Uint8Array(r),a=0;a<t;a++)o[a]=e.charCodeAt(a);return r}function y(e){return new d(function(t){var r=e.transaction(T,l),o=z([""]);r.objectStore(T).put(o,"key"),r.onabort=function(a){a.preventDefault(),a.stopPropagation(),t(!1)},r.oncomplete=function(){var a=navigator.userAgent.match(/Chrome\/(\d+)/),n=navigator.userAgent.match(/Edge\//);t(n||!a||parseInt(a[1],10)>=43)}}).catch(function(){return!1})}function w(e){return typeof K=="boolean"?d.resolve(K):y(e).then(function(t){return K=t,K})}function C(e){var t=x[e.name],r={};r.promise=new d(function(o,a){r.resolve=o,r.reject=a}),t.deferredOperations.push(r),t.dbReady?t.dbReady=t.dbReady.then(function(){return r.promise}):t.dbReady=r.promise}function P(e){var t=x[e.name],r=t.deferredOperations.pop();if(r)return r.resolve(),r.promise}function M(e,t){var r=x[e.name],o=r.deferredOperations.pop();if(o)return o.reject(t),o.promise}function U(e,t){return new d(function(r,o){if(x[e.name]=x[e.name]||_e(),e.db)if(t)C(e),e.db.close();else return r(e.db);var a=[e.name];t&&a.push(e.version);var n=O.open.apply(O,a);t&&(n.onupgradeneeded=function(i){var f=n.result;try{f.createObjectStore(e.storeName),i.oldVersion<=1&&f.createObjectStore(T)}catch(u){if(u.name==="ConstraintError")console.warn('The database "'+e.name+'" has been upgraded from version '+i.oldVersion+" to version "+i.newVersion+', but the storage "'+e.storeName+'" already exists.');else throw u}}),n.onerror=function(i){i.preventDefault(),o(n.error)},n.onsuccess=function(){var i=n.result;i.onversionchange=function(f){f.target.close()},r(i),P(e)}})}function V(e){return U(e,!1)}function Z(e){return U(e,!0)}function re(e,t){if(!e.db)return!0;var r=!e.db.objectStoreNames.contains(e.storeName),o=e.version<e.db.version,a=e.version>e.db.version;if(o&&(e.version!==t&&console.warn('The database "'+e.name+"\" can't be downgraded from version "+e.db.version+" to version "+e.version+"."),e.version=e.db.version),a||r){if(r){var n=e.db.version+1;n>e.version&&(e.version=n)}return!0}return!1}function se(e){return new d(function(t,r){var o=new FileReader;o.onerror=r,o.onloadend=function(a){var n=btoa(a.target.result||"");t({__local_forage_encoded_blob:!0,data:n,type:e.type})},o.readAsBinaryString(e)})}function J(e){var t=g(atob(e.data));return z([t],{type:e.type})}function be(e){return e&&e.__local_forage_encoded_blob}function $e(e){var t=this,r=t._initReady().then(function(){var o=x[t._dbInfo.name];if(o&&o.dbReady)return o.dbReady});return R(r,e,e),r}function Ke(e){C(e);for(var t=x[e.name],r=t.forages,o=0;o<r.length;o++){var a=r[o];a._dbInfo.db&&(a._dbInfo.db.close(),a._dbInfo.db=null)}return e.db=null,V(e).then(function(n){return e.db=n,re(e)?Z(e):n}).then(function(n){e.db=t.db=n;for(var i=0;i<r.length;i++)r[i]._dbInfo.db=n}).catch(function(n){throw M(e,n),n})}function G(e,t,r,o){o===void 0&&(o=1);try{var a=e.db.transaction(e.storeName,t);r(null,a)}catch(n){if(o>0&&(!e.db||n.name==="InvalidStateError"||n.name==="NotFoundError"))return d.resolve().then(function(){if(!e.db||n.name==="NotFoundError"&&!e.db.objectStoreNames.contains(e.storeName)&&e.version<=e.db.version)return e.db&&(e.version=e.db.version+1),Z(e)}).then(function(){return Ke(e).then(function(){G(e,t,r,o-1)})}).catch(r);r(n)}}function _e(){return{forages:[],db:null,dbReady:null,deferredOperations:[]}}function Ve(e){var t=this,r={db:null};if(e)for(var o in e)r[o]=e[o];var a=x[r.name];a||(a=_e(),x[r.name]=a),a.forages.push(t),t._initReady||(t._initReady=t.ready,t.ready=$e);var n=[];function i(){return d.resolve()}for(var f=0;f<a.forages.length;f++){var u=a.forages[f];u!==t&&n.push(u._initReady().catch(i))}var s=a.forages.slice(0);return d.all(n).then(function(){return r.db=a.db,V(r)}).then(function(c){return r.db=c,re(r,t._defaultConfig.version)?Z(r):c}).then(function(c){r.db=a.db=c,t._dbInfo=r;for(var v=0;v<s.length;v++){var m=s[v];m!==t&&(m._dbInfo.db=r.db,m._dbInfo.version=r.version)}})}function Ge(e,t){var r=this;e=N(e);var o=new d(function(a,n){r.ready().then(function(){G(r._dbInfo,j,function(i,f){if(i)return n(i);try{var u=f.objectStore(r._dbInfo.storeName),s=u.get(e);s.onsuccess=function(){var c=s.result;c===void 0&&(c=null),be(c)&&(c=J(c)),a(c)},s.onerror=function(){n(s.error)}}catch(c){n(c)}})}).catch(n)});return h(o,t),o}function Qe(e,t){var r=this,o=new d(function(a,n){r.ready().then(function(){G(r._dbInfo,j,function(i,f){if(i)return n(i);try{var u=f.objectStore(r._dbInfo.storeName),s=u.openCursor(),c=1;s.onsuccess=function(){var v=s.result;if(v){var m=v.value;be(m)&&(m=J(m));var p=e(m,v.key,c++);p!==void 0?a(p):v.continue()}else a()},s.onerror=function(){n(s.error)}}catch(v){n(v)}})}).catch(n)});return h(o,t),o}function He(e,t,r){var o=this;e=N(e);var a=new d(function(n,i){var f;o.ready().then(function(){return f=o._dbInfo,ue.call(t)==="[object Blob]"?w(f.db).then(function(u){return u?t:se(t)}):t}).then(function(u){G(o._dbInfo,l,function(s,c){if(s)return i(s);try{var v=c.objectStore(o._dbInfo.storeName);u===null&&(u=void 0);var m=v.put(u,e);c.oncomplete=function(){u===void 0&&(u=null),n(u)},c.onabort=c.onerror=function(){var p=m.error?m.error:m.transaction.error;i(p)}}catch(p){i(p)}})}).catch(i)});return h(a,r),a}function Xe(e,t){var r=this;e=N(e);var o=new d(function(a,n){r.ready().then(function(){G(r._dbInfo,l,function(i,f){if(i)return n(i);try{var u=f.objectStore(r._dbInfo.storeName),s=u.delete(e);f.oncomplete=function(){a()},f.onerror=function(){n(s.error)},f.onabort=function(){var c=s.error?s.error:s.transaction.error;n(c)}}catch(c){n(c)}})}).catch(n)});return h(o,t),o}function je(e){var t=this,r=new d(function(o,a){t.ready().then(function(){G(t._dbInfo,l,function(n,i){if(n)return a(n);try{var f=i.objectStore(t._dbInfo.storeName),u=f.clear();i.oncomplete=function(){o()},i.onabort=i.onerror=function(){var s=u.error?u.error:u.transaction.error;a(s)}}catch(s){a(s)}})}).catch(a)});return h(r,e),r}function Je(e){var t=this,r=new d(function(o,a){t.ready().then(function(){G(t._dbInfo,j,function(n,i){if(n)return a(n);try{var f=i.objectStore(t._dbInfo.storeName),u=f.count();u.onsuccess=function(){o(u.result)},u.onerror=function(){a(u.error)}}catch(s){a(s)}})}).catch(a)});return h(r,e),r}function ke(e,t){var r=this,o=new d(function(a,n){if(e<0){a(null);return}r.ready().then(function(){G(r._dbInfo,j,function(i,f){if(i)return n(i);try{var u=f.objectStore(r._dbInfo.storeName),s=!1,c=u.openKeyCursor();c.onsuccess=function(){var v=c.result;if(!v){a(null);return}e===0||s?a(v.key):(s=!0,v.advance(e))},c.onerror=function(){n(c.error)}}catch(v){n(v)}})}).catch(n)});return h(o,t),o}function Ze(e){var t=this,r=new d(function(o,a){t.ready().then(function(){G(t._dbInfo,j,function(n,i){if(n)return a(n);try{var f=i.objectStore(t._dbInfo.storeName),u=f.openKeyCursor(),s=[];u.onsuccess=function(){var c=u.result;if(!c){o(s);return}s.push(c.key),c.continue()},u.onerror=function(){a(u.error)}}catch(c){a(c)}})}).catch(a)});return h(r,e),r}function qe(e,t){t=W.apply(this,arguments);var r=this.config();e=typeof e!="function"&&e||{},e.name||(e.name=e.name||r.name,e.storeName=e.storeName||r.storeName);var o=this,a;if(!e.name)a=d.reject("Invalid arguments");else{var n=e.name===r.name&&o._dbInfo.db,i=n?d.resolve(o._dbInfo.db):V(e).then(function(f){var u=x[e.name],s=u.forages;u.db=f;for(var c=0;c<s.length;c++)s[c]._dbInfo.db=f;return f});e.storeName?a=i.then(function(f){if(f.objectStoreNames.contains(e.storeName)){var u=f.version+1;C(e);var s=x[e.name],c=s.forages;f.close();for(var v=0;v<c.length;v++){var m=c[v];m._dbInfo.db=null,m._dbInfo.version=u}var p=new d(function(b,A){var D=O.open(e.name,u);D.onerror=function(Y){var ee=D.result;ee.close(),A(Y)},D.onupgradeneeded=function(){var Y=D.result;Y.deleteObjectStore(e.storeName)},D.onsuccess=function(){var Y=D.result;Y.close(),b(Y)}});return p.then(function(b){s.db=b;for(var A=0;A<c.length;A++){var D=c[A];D._dbInfo.db=b,P(D._dbInfo)}}).catch(function(b){throw(M(e,b)||d.resolve()).catch(function(){}),b})}}):a=i.then(function(f){C(e);var u=x[e.name],s=u.forages;f.close();for(var c=0;c<s.length;c++){var v=s[c];v._dbInfo.db=null}var m=new d(function(p,b){var A=O.deleteDatabase(e.name);A.onerror=function(){var D=A.result;D&&D.close(),b(A.error)},A.onblocked=function(){console.warn('dropInstance blocked for database "'+e.name+'" until all open connections are closed')},A.onsuccess=function(){var D=A.result;D&&D.close(),p(D)}});return m.then(function(p){u.db=p;for(var b=0;b<s.length;b++){var A=s[b];P(A._dbInfo)}}).catch(function(p){throw(M(e,p)||d.resolve()).catch(function(){}),p})})}return h(a,t),a}var er={_driver:"asyncStorage",_initStorage:Ve,_support:B(),iterate:Qe,getItem:Ge,setItem:He,removeItem:Xe,clear:je,length:Je,key:ke,keys:Ze,dropInstance:qe};function rr(){return typeof openDatabase=="function"}var H="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",tr="~~local_forage_type~",we=/^~~local_forage_type~([^~]+)~/,te="__lfsc__:",ce=te.length,le="arbf",de="blob",Se="si08",Ee="ui08",Ie="uic8",De="si16",Re="si32",Ae="ur16",Ne="ui32",Te="fl32",xe="fl64",Be=ce+le.length,Ce=Object.prototype.toString;function Oe(e){var t=e.length*.75,r=e.length,o,a=0,n,i,f,u;e[e.length-1]==="="&&(t--,e[e.length-2]==="="&&t--);var s=new ArrayBuffer(t),c=new Uint8Array(s);for(o=0;o<r;o+=4)n=H.indexOf(e[o]),i=H.indexOf(e[o+1]),f=H.indexOf(e[o+2]),u=H.indexOf(e[o+3]),c[a++]=n<<2|i>>4,c[a++]=(i&15)<<4|f>>2,c[a++]=(f&3)<<6|u&63;return s}function ve(e){var t=new Uint8Array(e),r="",o;for(o=0;o<t.length;o+=3)r+=H[t[o]>>2],r+=H[(t[o]&3)<<4|t[o+1]>>4],r+=H[(t[o+1]&15)<<2|t[o+2]>>6],r+=H[t[o+2]&63];return t.length%3===2?r=r.substring(0,r.length-1)+"=":t.length%3===1&&(r=r.substring(0,r.length-2)+"=="),r}function nr(e,t){var r="";if(e&&(r=Ce.call(e)),e&&(r==="[object ArrayBuffer]"||e.buffer&&Ce.call(e.buffer)==="[object ArrayBuffer]")){var o,a=te;e instanceof ArrayBuffer?(o=e,a+=le):(o=e.buffer,r==="[object Int8Array]"?a+=Se:r==="[object Uint8Array]"?a+=Ee:r==="[object Uint8ClampedArray]"?a+=Ie:r==="[object Int16Array]"?a+=De:r==="[object Uint16Array]"?a+=Ae:r==="[object Int32Array]"?a+=Re:r==="[object Uint32Array]"?a+=Ne:r==="[object Float32Array]"?a+=Te:r==="[object Float64Array]"?a+=xe:t(new Error("Failed to get type for BinaryArray"))),t(a+ve(o))}else if(r==="[object Blob]"){var n=new FileReader;n.onload=function(){var i=tr+e.type+"~"+ve(this.result);t(te+de+i)},n.readAsArrayBuffer(e)}else try{t(JSON.stringify(e))}catch(i){console.error("Couldn't convert value into a JSON string: ",e),t(null,i)}}function or(e){if(e.substring(0,ce)!==te)return JSON.parse(e);var t=e.substring(Be),r=e.substring(ce,Be),o;if(r===de&&we.test(t)){var a=t.match(we);o=a[1],t=t.substring(a[0].length)}var n=Oe(t);switch(r){case le:return n;case de:return z([n],{type:o});case Se:return new Int8Array(n);case Ee:return new Uint8Array(n);case Ie:return new Uint8ClampedArray(n);case De:return new Int16Array(n);case Ae:return new Uint16Array(n);case Re:return new Int32Array(n);case Ne:return new Uint32Array(n);case Te:return new Float32Array(n);case xe:return new Float64Array(n);default:throw new Error("Unkown type: "+r)}}var he={serialize:nr,deserialize:or,stringToBuffer:Oe,bufferToString:ve};function Le(e,t,r,o){e.executeSql("CREATE TABLE IF NOT EXISTS "+t.storeName+" (id INTEGER PRIMARY KEY, key unique, value)",[],r,o)}function ar(e){var t=this,r={db:null};if(e)for(var o in e)r[o]=typeof e[o]!="string"?e[o].toString():e[o];var a=new d(function(n,i){try{r.db=openDatabase(r.name,String(r.version),r.description,r.size)}catch(f){return i(f)}r.db.transaction(function(f){Le(f,r,function(){t._dbInfo=r,n()},function(u,s){i(s)})},i)});return r.serializer=he,a}function X(e,t,r,o,a,n){e.executeSql(r,o,a,function(i,f){f.code===f.SYNTAX_ERR?i.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?",[t.storeName],function(u,s){s.rows.length?n(u,f):Le(u,t,function(){u.executeSql(r,o,a,n)},n)},n):n(i,f)},n)}function ir(e,t){var r=this;e=N(e);var o=new d(function(a,n){r.ready().then(function(){var i=r._dbInfo;i.db.transaction(function(f){X(f,i,"SELECT * FROM "+i.storeName+" WHERE key = ? LIMIT 1",[e],function(u,s){var c=s.rows.length?s.rows.item(0).value:null;c&&(c=i.serializer.deserialize(c)),a(c)},function(u,s){n(s)})})}).catch(n)});return h(o,t),o}function fr(e,t){var r=this,o=new d(function(a,n){r.ready().then(function(){var i=r._dbInfo;i.db.transaction(function(f){X(f,i,"SELECT * FROM "+i.storeName,[],function(u,s){for(var c=s.rows,v=c.length,m=0;m<v;m++){var p=c.item(m),b=p.value;if(b&&(b=i.serializer.deserialize(b)),b=e(b,p.key,m+1),b!==void 0){a(b);return}}a()},function(u,s){n(s)})})}).catch(n)});return h(o,t),o}function Pe(e,t,r,o){var a=this;e=N(e);var n=new d(function(i,f){a.ready().then(function(){t===void 0&&(t=null);var u=t,s=a._dbInfo;s.serializer.serialize(t,function(c,v){v?f(v):s.db.transaction(function(m){X(m,s,"INSERT OR REPLACE INTO "+s.storeName+" (key, value) VALUES (?, ?)",[e,c],function(){i(u)},function(p,b){f(b)})},function(m){if(m.code===m.QUOTA_ERR){if(o>0){i(Pe.apply(a,[e,u,r,o-1]));return}f(m)}})})}).catch(f)});return h(n,r),n}function ur(e,t,r){return Pe.apply(this,[e,t,r,1])}function sr(e,t){var r=this;e=N(e);var o=new d(function(a,n){r.ready().then(function(){var i=r._dbInfo;i.db.transaction(function(f){X(f,i,"DELETE FROM "+i.storeName+" WHERE key = ?",[e],function(){a()},function(u,s){n(s)})})}).catch(n)});return h(o,t),o}function cr(e){var t=this,r=new d(function(o,a){t.ready().then(function(){var n=t._dbInfo;n.db.transaction(function(i){X(i,n,"DELETE FROM "+n.storeName,[],function(){o()},function(f,u){a(u)})})}).catch(a)});return h(r,e),r}function lr(e){var t=this,r=new d(function(o,a){t.ready().then(function(){var n=t._dbInfo;n.db.transaction(function(i){X(i,n,"SELECT COUNT(key) as c FROM "+n.storeName,[],function(f,u){var s=u.rows.item(0).c;o(s)},function(f,u){a(u)})})}).catch(a)});return h(r,e),r}function dr(e,t){var r=this,o=new d(function(a,n){r.ready().then(function(){var i=r._dbInfo;i.db.transaction(function(f){X(f,i,"SELECT key FROM "+i.storeName+" WHERE id = ? LIMIT 1",[e+1],function(u,s){var c=s.rows.length?s.rows.item(0).key:null;a(c)},function(u,s){n(s)})})}).catch(n)});return h(o,t),o}function vr(e){var t=this,r=new d(function(o,a){t.ready().then(function(){var n=t._dbInfo;n.db.transaction(function(i){X(i,n,"SELECT key FROM "+n.storeName,[],function(f,u){for(var s=[],c=0;c<u.rows.length;c++)s.push(u.rows.item(c).key);o(s)},function(f,u){a(u)})})}).catch(a)});return h(r,e),r}function hr(e){return new d(function(t,r){e.transaction(function(o){o.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'",[],function(a,n){for(var i=[],f=0;f<n.rows.length;f++)i.push(n.rows.item(f).name);t({db:e,storeNames:i})},function(a,n){r(n)})},function(o){r(o)})})}function mr(e,t){t=W.apply(this,arguments);var r=this.config();e=typeof e!="function"&&e||{},e.name||(e.name=e.name||r.name,e.storeName=e.storeName||r.storeName);var o=this,a;return e.name?a=new d(function(n){var i;e.name===r.name?i=o._dbInfo.db:i=openDatabase(e.name,"","",0),e.storeName?n({db:i,storeNames:[e.storeName]}):n(hr(i))}).then(function(n){return new d(function(i,f){n.db.transaction(function(u){function s(p){return new d(function(b,A){u.executeSql("DROP TABLE IF EXISTS "+p,[],function(){b()},function(D,Y){A(Y)})})}for(var c=[],v=0,m=n.storeNames.length;v<m;v++)c.push(s(n.storeNames[v]));d.all(c).then(function(){i()}).catch(function(p){f(p)})},function(u){f(u)})})}):a=d.reject("Invalid arguments"),h(a,t),a}var yr={_driver:"webSQLStorage",_initStorage:ar,_support:rr(),iterate:fr,getItem:ir,setItem:ur,removeItem:sr,clear:cr,length:lr,key:dr,keys:vr,dropInstance:mr};function gr(){try{return typeof localStorage<"u"&&"setItem"in localStorage&&!!localStorage.setItem}catch(e){return!1}}function Fe(e,t){var r=e.name+"/";return e.storeName!==t.storeName&&(r+=e.storeName+"/"),r}function pr(){var e="_localforage_support_test";try{return localStorage.setItem(e,!0),localStorage.removeItem(e),!1}catch(t){return!0}}function br(){return!pr()||localStorage.length>0}function _r(e){var t=this,r={};if(e)for(var o in e)r[o]=e[o];return r.keyPrefix=Fe(e,t._defaultConfig),br()?(t._dbInfo=r,r.serializer=he,d.resolve()):d.reject()}function wr(e){var t=this,r=t.ready().then(function(){for(var o=t._dbInfo.keyPrefix,a=localStorage.length-1;a>=0;a--){var n=localStorage.key(a);n.indexOf(o)===0&&localStorage.removeItem(n)}});return h(r,e),r}function Sr(e,t){var r=this;e=N(e);var o=r.ready().then(function(){var a=r._dbInfo,n=localStorage.getItem(a.keyPrefix+e);return n&&(n=a.serializer.deserialize(n)),n});return h(o,t),o}function Er(e,t){var r=this,o=r.ready().then(function(){for(var a=r._dbInfo,n=a.keyPrefix,i=n.length,f=localStorage.length,u=1,s=0;s<f;s++){var c=localStorage.key(s);if(c.indexOf(n)===0){var v=localStorage.getItem(c);if(v&&(v=a.serializer.deserialize(v)),v=e(v,c.substring(i),u++),v!==void 0)return v}}});return h(o,t),o}function Ir(e,t){var r=this,o=r.ready().then(function(){var a=r._dbInfo,n;try{n=localStorage.key(e)}catch(i){n=null}return n&&(n=n.substring(a.keyPrefix.length)),n});return h(o,t),o}function Dr(e){var t=this,r=t.ready().then(function(){for(var o=t._dbInfo,a=localStorage.length,n=[],i=0;i<a;i++){var f=localStorage.key(i);f.indexOf(o.keyPrefix)===0&&n.push(f.substring(o.keyPrefix.length))}return n});return h(r,e),r}function Rr(e){var t=this,r=t.keys().then(function(o){return o.length});return h(r,e),r}function Ar(e,t){var r=this;e=N(e);var o=r.ready().then(function(){var a=r._dbInfo;localStorage.removeItem(a.keyPrefix+e)});return h(o,t),o}function Nr(e,t,r){var o=this;e=N(e);var a=o.ready().then(function(){t===void 0&&(t=null);var n=t;return new d(function(i,f){var u=o._dbInfo;u.serializer.serialize(t,function(s,c){if(c)f(c);else try{localStorage.setItem(u.keyPrefix+e,s),i(n)}catch(v){(v.name==="QuotaExceededError"||v.name==="NS_ERROR_DOM_QUOTA_REACHED")&&f(v),f(v)}})})});return h(a,r),a}function Tr(e,t){if(t=W.apply(this,arguments),e=typeof e!="function"&&e||{},!e.name){var r=this.config();e.name=e.name||r.name,e.storeName=e.storeName||r.storeName}var o=this,a;return e.name?a=new d(function(n){e.storeName?n(Fe(e,o._defaultConfig)):n(e.name+"/")}).then(function(n){for(var i=localStorage.length-1;i>=0;i--){var f=localStorage.key(i);f.indexOf(n)===0&&localStorage.removeItem(f)}}):a=d.reject("Invalid arguments"),h(a,t),a}var xr={_driver:"localStorageWrapper",_initStorage:_r,_support:gr(),iterate:Er,getItem:Sr,setItem:Nr,removeItem:Ar,clear:wr,length:Rr,key:Ir,keys:Dr,dropInstance:Tr},Br=function(t,r){return t===r||typeof t=="number"&&typeof r=="number"&&isNaN(t)&&isNaN(r)},Cr=function(t,r){for(var o=t.length,a=0;a<o;){if(Br(t[a],r))return!0;a++}return!1},Me=Array.isArray||function(e){return Object.prototype.toString.call(e)==="[object Array]"},q={},Ue={},k={INDEXEDDB:er,WEBSQL:yr,LOCALSTORAGE:xr},Or=[k.INDEXEDDB._driver,k.WEBSQL._driver,k.LOCALSTORAGE._driver],ne=["dropInstance"],me=["clear","getItem","iterate","key","keys","length","removeItem","setItem"].concat(ne),Lr={description:"",driver:Or.slice(),name:"localforage",size:4980736,storeName:"keyvaluepairs",version:1};function Pr(e,t){e[t]=function(){var r=arguments;return e.ready().then(function(){return e[t].apply(e,r)})}}function ye(){for(var e=1;e<arguments.length;e++){var t=arguments[e];if(t)for(var r in t)t.hasOwnProperty(r)&&(Me(t[r])?arguments[0][r]=t[r].slice():arguments[0][r]=t[r])}return arguments[0]}var Fr=function(){function e(t){L(this,e);for(var r in k)if(k.hasOwnProperty(r)){var o=k[r],a=o._driver;this[r]=a,q[a]||this.defineDriver(o)}this._defaultConfig=ye({},Lr),this._config=ye({},this._defaultConfig,t),this._driverSet=null,this._initDriver=null,this._ready=!1,this._dbInfo=null,this._wrapLibraryMethodsWithReady(),this.setDriver(this._config.driver).catch(function(){})}return e.prototype.config=function(r){if((typeof r>"u"?"undefined":I(r))==="object"){if(this._ready)return new Error("Can't call config() after localforage has been used.");for(var o in r){if(o==="storeName"&&(r[o]=r[o].replace(/\W/g,"_")),o==="version"&&typeof r[o]!="number")return new Error("Database version must be a number.");this._config[o]=r[o]}return"driver"in r&&r.driver?this.setDriver(this._config.driver):!0}else return typeof r=="string"?this._config[r]:this._config},e.prototype.defineDriver=function(r,o,a){var n=new d(function(i,f){try{var u=r._driver,s=new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");if(!r._driver){f(s);return}for(var c=me.concat("_initStorage"),v=0,m=c.length;v<m;v++){var p=c[v],b=!Cr(ne,p);if((b||r[p])&&typeof r[p]!="function"){f(s);return}}var A=function(){for(var ee=function(Yr){return function(){var zr=new Error("Method "+Yr+" is not implemented by the current driver"),Ye=d.reject(zr);return h(Ye,arguments[arguments.length-1]),Ye}},ge=0,Ur=ne.length;ge<Ur;ge++){var pe=ne[ge];r[pe]||(r[pe]=ee(pe))}};A();var D=function(ee){q[u]&&console.info("Redefining LocalForage driver: "+u),q[u]=r,Ue[u]=ee,i()};"_support"in r?r._support&&typeof r._support=="function"?r._support().then(D,f):D(!!r._support):D(!0)}catch(Y){f(Y)}});return R(n,o,a),n},e.prototype.driver=function(){return this._driver||null},e.prototype.getDriver=function(r,o,a){var n=q[r]?d.resolve(q[r]):d.reject(new Error("Driver not found."));return R(n,o,a),n},e.prototype.getSerializer=function(r){var o=d.resolve(he);return R(o,r),o},e.prototype.ready=function(r){var o=this,a=o._driverSet.then(function(){return o._ready===null&&(o._ready=o._initDriver()),o._ready});return R(a,r,r),a},e.prototype.setDriver=function(r,o,a){var n=this;Me(r)||(r=[r]);var i=this._getSupportedDrivers(r);function f(){n._config.driver=n.driver()}function u(v){return n._extend(v),f(),n._ready=n._initStorage(n._config),n._ready}function s(v){return function(){var m=0;function p(){for(;m<v.length;){var b=v[m];return m++,n._dbInfo=null,n._ready=null,n.getDriver(b).then(u).catch(p)}f();var A=new Error("No available storage method found.");return n._driverSet=d.reject(A),n._driverSet}return p()}}var c=this._driverSet!==null?this._driverSet.catch(function(){return d.resolve()}):d.resolve();return this._driverSet=c.then(function(){var v=i[0];return n._dbInfo=null,n._ready=null,n.getDriver(v).then(function(m){n._driver=m._driver,f(),n._wrapLibraryMethodsWithReady(),n._initDriver=s(i)})}).catch(function(){f();var v=new Error("No available storage method found.");return n._driverSet=d.reject(v),n._driverSet}),R(this._driverSet,o,a),this._driverSet},e.prototype.supports=function(r){return!!Ue[r]},e.prototype._extend=function(r){ye(this,r)},e.prototype._getSupportedDrivers=function(r){for(var o=[],a=0,n=r.length;a<n;a++){var i=r[a];this.supports(i)&&o.push(i)}return o},e.prototype._wrapLibraryMethodsWithReady=function(){for(var r=0,o=me.length;r<o;r++)Pr(this,me[r])},e.prototype.createInstance=function(r){return new e(r)},e}(),Mr=new Fr;F.exports=Mr},{3:3}]},{},[4])(4)})})(We);var $r=We.exports;const fe=Wr($r),ie={SecureStorage:"ionicSecureStorage",IndexedDB:fe.INDEXEDDB,LocalStorage:fe.LOCALSTORAGE},ze={name:"_ionicstorage",storeName:"_ionickv",dbKey:"_ionickey",driverOrder:[ie.SecureStorage,ie.IndexedDB,ie.LocalStorage]};class Vr{constructor(S=ze){this._db=null,this._secureStorageDriver=null;const E=Object.assign({},ze,S||{});this._config=E}async create(){const S=fe.createInstance(this._config);return this._db=S,await S.setDriver(this._config.driverOrder||[]),this}async defineDriver(S){return S._driver===ie.SecureStorage&&(this._secureStorageDriver=S),fe.defineDriver(S)}get driver(){var S;return((S=this._db)===null||S===void 0?void 0:S.driver())||null}assertDb(){if(!this._db)throw new Error("Database not created. Must call create() first");return this._db}get(S){return this.assertDb().getItem(S)}set(S,E){return this.assertDb().setItem(S,E)}remove(S){return this.assertDb().removeItem(S)}clear(){return this.assertDb().clear()}length(){return this.assertDb().length()}keys(){return this.assertDb().keys()}forEach(S){return this.assertDb().iterate(S)}setEncryptionKey(S){var E;if(this._secureStorageDriver)(E=this._secureStorageDriver)===null||E===void 0||E.setEncryptionKey(S);else throw new Error("@ionic-enterprise/secure-storage not installed. Encryption support not available")}}export{Vr as S};
