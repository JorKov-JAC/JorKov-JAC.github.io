(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();const Xe=(e,t)=>e===t,Y=Symbol("solid-proxy"),z={equals:Xe};let Je=Ie;const R=1,Z=2,Ee={owned:null,cleanups:null,context:null,owner:null};var d=null;let ie=null,m=null,S=null,N=null,te=0;function $e(e,t){const n=m,r=d,s=e.length===0,o=t===void 0?r:t,i=s?Ee:{owned:null,cleanups:null,context:o?o.context:null,owner:o},l=s?e:()=>e(()=>C(()=>re(i)));d=i,m=null;try{return T(l,!0)}finally{m=n,d=r}}function M(e,t){t=t?Object.assign({},z,t):z;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},r=s=>(typeof s=="function"&&(s=s(n.value)),Re(n,s));return[_e.bind(n),r]}function x(e,t,n){const r=Te(e,t,!1,R);ne(r)}function b(e,t,n){n=n?Object.assign({},z,n):z;const r=Te(e,t,!0,0);return r.observers=null,r.observerSlots=null,r.comparator=n.equals||void 0,ne(r),_e.bind(r)}function C(e){if(m===null)return e();const t=m;m=null;try{return e()}finally{m=t}}function Oe(e,t,n){const r=Array.isArray(e);let s,o=n&&n.defer;return i=>{let l;if(r){l=Array(e.length);for(let f=0;f<e.length;f++)l[f]=e[f]()}else l=e();if(o){o=!1;return}const c=C(()=>t(l,s,i));return s=l,c}}function Le(e){return d===null||(d.cleanups===null?d.cleanups=[e]:d.cleanups.push(e)),e}function Ge(){return d}function Qe(e,t){const n=d,r=m;d=e,m=null;try{return T(t,!0)}catch(s){ye(s)}finally{d=n,m=r}}function Ye(e){const t=m,n=d;return Promise.resolve().then(()=>{m=t,d=n;let r;return T(e,!1),m=d=null,r?r.done:void 0})}function Ne(e,t){const n=Symbol("context");return{id:n,Provider:tt(n),defaultValue:e}}function ge(e){return d&&d.context&&d.context[e.id]!==void 0?d.context[e.id]:e.defaultValue}function me(e){const t=b(e),n=b(()=>ue(t()));return n.toArray=()=>{const r=n();return Array.isArray(r)?r:r!=null?[r]:[]},n}function _e(){if(this.sources&&this.state)if(this.state===R)ne(this);else{const e=S;S=null,T(()=>ee(this),!1),S=e}if(m){const e=this.observers?this.observers.length:0;m.sources?(m.sources.push(this),m.sourceSlots.push(e)):(m.sources=[this],m.sourceSlots=[e]),this.observers?(this.observers.push(m),this.observerSlots.push(m.sources.length-1)):(this.observers=[m],this.observerSlots=[m.sources.length-1])}return this.value}function Re(e,t,n){let r=e.value;return(!e.comparator||!e.comparator(r,t))&&(e.value=t,e.observers&&e.observers.length&&T(()=>{for(let s=0;s<e.observers.length;s+=1){const o=e.observers[s],i=ie&&ie.running;i&&ie.disposed.has(o),(i?!o.tState:!o.state)&&(o.pure?S.push(o):N.push(o),o.observers&&ke(o)),i||(o.state=R)}if(S.length>1e6)throw S=[],new Error},!1)),t}function ne(e){if(!e.fn)return;re(e);const t=te;ze(e,e.value,t)}function ze(e,t,n){let r;const s=d,o=m;m=d=e;try{r=e.fn(t)}catch(i){return e.pure&&(e.state=R,e.owned&&e.owned.forEach(re),e.owned=null),e.updatedAt=n+1,ye(i)}finally{m=o,d=s}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?Re(e,r):e.value=r,e.updatedAt=n)}function Te(e,t,n,r=R,s){const o={fn:e,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:d,context:d?d.context:null,pure:n};return d===null||d!==Ee&&(d.owned?d.owned.push(o):d.owned=[o]),o}function je(e){if(e.state===0)return;if(e.state===Z)return ee(e);if(e.suspense&&C(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<te);)e.state&&t.push(e);for(let n=t.length-1;n>=0;n--)if(e=t[n],e.state===R)ne(e);else if(e.state===Z){const r=S;S=null,T(()=>ee(e,t[0]),!1),S=r}}function T(e,t){if(S)return e();let n=!1;t||(S=[]),N?n=!0:N=[],te++;try{const r=e();return Ze(n),r}catch(r){n||(N=null),S=null,ye(r)}}function Ze(e){if(S&&(Ie(S),S=null),e)return;const t=N;N=null,t.length&&T(()=>Je(t),!1)}function Ie(e){for(let t=0;t<e.length;t++)je(e[t])}function ee(e,t){e.state=0;for(let n=0;n<e.sources.length;n+=1){const r=e.sources[n];if(r.sources){const s=r.state;s===R?r!==t&&(!r.updatedAt||r.updatedAt<te)&&je(r):s===Z&&ee(r,t)}}}function ke(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=Z,n.pure?S.push(n):N.push(n),n.observers&&ke(n))}}function re(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),r=e.sourceSlots.pop(),s=n.observers;if(s&&s.length){const o=s.pop(),i=n.observerSlots.pop();r<s.length&&(o.sourceSlots[i]=r,s[r]=o,n.observerSlots[r]=i)}}if(e.owned){for(t=e.owned.length-1;t>=0;t--)re(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function et(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function ye(e,t=d){throw et(e)}function ue(e){if(typeof e=="function"&&!e.length)return ue(e());if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++){const r=ue(e[n]);Array.isArray(r)?t.push.apply(t,r):t.push(r)}return t}return e}function tt(e,t){return function(r){let s;return x(()=>s=C(()=>(d.context={...d.context,[e]:r.value},me(()=>r.children))),void 0),s}}function P(e,t){return C(()=>e(t||{}))}function J(){return!0}const ae={get(e,t,n){return t===Y?n:e.get(t)},has(e,t){return t===Y?!0:e.has(t)},set:J,deleteProperty:J,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:J,deleteProperty:J}},ownKeys(e){return e.keys()}};function le(e){return(e=typeof e=="function"?e():e)?e:{}}function nt(){for(let e=0,t=this.length;e<t;++e){const n=this[e]();if(n!==void 0)return n}}function fe(...e){let t=!1;for(let o=0;o<e.length;o++){const i=e[o];t=t||!!i&&Y in i,e[o]=typeof i=="function"?(t=!0,b(i)):i}if(t)return new Proxy({get(o){for(let i=e.length-1;i>=0;i--){const l=le(e[i])[o];if(l!==void 0)return l}},has(o){for(let i=e.length-1;i>=0;i--)if(o in le(e[i]))return!0;return!1},keys(){const o=[];for(let i=0;i<e.length;i++)o.push(...Object.keys(le(e[i])));return[...new Set(o)]}},ae);const n={},r={},s=new Set;for(let o=e.length-1;o>=0;o--){const i=e[o];if(!i)continue;const l=Object.getOwnPropertyNames(i);for(let c=0,f=l.length;c<f;c++){const u=l[c];if(u==="__proto__"||u==="constructor")continue;const a=Object.getOwnPropertyDescriptor(i,u);if(!s.has(u))a.get?(s.add(u),Object.defineProperty(n,u,{enumerable:!0,configurable:!0,get:nt.bind(r[u]=[a.get.bind(i)])})):(a.value!==void 0&&s.add(u),n[u]=a.value);else{const h=r[u];h?a.get?h.push(a.get.bind(i)):a.value!==void 0&&h.push(()=>a.value):n[u]===void 0&&(n[u]=a.value)}}}return n}function rt(e,...t){if(Y in e){const s=new Set(t.length>1?t.flat():t[0]),o=t.map(i=>new Proxy({get(l){return i.includes(l)?e[l]:void 0},has(l){return i.includes(l)&&l in e},keys(){return i.filter(l=>l in e)}},ae));return o.push(new Proxy({get(i){return s.has(i)?void 0:e[i]},has(i){return s.has(i)?!1:i in e},keys(){return Object.keys(e).filter(i=>!s.has(i))}},ae)),o}const n={},r=t.map(()=>({}));for(const s of Object.getOwnPropertyNames(e)){const o=Object.getOwnPropertyDescriptor(e,s),i=!o.get&&!o.set&&o.enumerable&&o.writable&&o.configurable;let l=!1,c=0;for(const f of t)f.includes(s)&&(l=!0,i?r[c][s]=o.value:Object.defineProperty(r[c],s,o)),++c;l||(i?n[s]=o.value:Object.defineProperty(n,s,o))}return[...r,n]}const st=e=>`Stale read from <${e}>.`;function Me(e){const t=e.keyed,n=b(()=>e.when,void 0,{equals:(r,s)=>t?r===s:!r==!s});return b(()=>{const r=n();if(r){const s=e.children;return typeof s=="function"&&s.length>0?C(()=>s(t?r:()=>{if(!C(n))throw st("Show");return e.when})):s}return e.fallback},void 0,void 0)}const ot=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","inert","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"],it=new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline",...ot]),lt=new Set(["innerHTML","textContent","innerText","children"]),ct=Object.assign(Object.create(null),{className:"class",htmlFor:"for"}),ut=Object.assign(Object.create(null),{class:"className",formnovalidate:{$:"formNoValidate",BUTTON:1,INPUT:1},ismap:{$:"isMap",IMG:1},nomodule:{$:"noModule",SCRIPT:1},playsinline:{$:"playsInline",VIDEO:1},readonly:{$:"readOnly",INPUT:1,TEXTAREA:1}});function at(e,t){const n=ut[e];return typeof n=="object"?n[t]?n.$:void 0:n}const ft=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),ht={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function dt(e,t,n){let r=n.length,s=t.length,o=r,i=0,l=0,c=t[s-1].nextSibling,f=null;for(;i<s||l<o;){if(t[i]===n[l]){i++,l++;continue}for(;t[s-1]===n[o-1];)s--,o--;if(s===i){const u=o<r?l?n[l-1].nextSibling:n[o-l]:c;for(;l<o;)e.insertBefore(n[l++],u)}else if(o===l)for(;i<s;)(!f||!f.has(t[i]))&&t[i].remove(),i++;else if(t[i]===n[o-1]&&n[l]===t[s-1]){const u=t[--s].nextSibling;e.insertBefore(n[l++],t[i++].nextSibling),e.insertBefore(n[--o],u),t[s]=n[o]}else{if(!f){f=new Map;let a=l;for(;a<o;)f.set(n[a],a++)}const u=f.get(t[i]);if(u!=null)if(l<u&&u<o){let a=i,h=1,p;for(;++a<s&&a<o&&!((p=f.get(t[a]))==null||p!==u+h);)h++;if(h>u-l){const A=t[i];for(;l<u;)e.insertBefore(n[l++],A)}else e.replaceChild(n[l++],t[i++])}else i++;else t[i++].remove()}}}const Pe="_$DX_DELEGATE";function gt(e,t,n,r={}){let s;return $e(o=>{s=o,t===document?e():L(t,e(),t.firstChild?null:void 0,n)},r.owner),()=>{s(),t.textContent=""}}function D(e,t,n){let r;const s=()=>{const i=document.createElement("template");return i.innerHTML=e,n?i.content.firstChild.firstChild:i.content.firstChild},o=t?()=>C(()=>document.importNode(r||(r=s()),!0)):()=>(r||(r=s())).cloneNode(!0);return o.cloneNode=o,o}function we(e,t=window.document){const n=t[Pe]||(t[Pe]=new Set);for(let r=0,s=e.length;r<s;r++){const o=e[r];n.has(o)||(n.add(o),t.addEventListener(o,vt))}}function he(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function mt(e,t,n,r){r==null?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,r)}function Be(e,t){t==null?e.removeAttribute("class"):e.className=t}function yt(e,t,n,r){if(r)Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n;else if(Array.isArray(n)){const s=n[0];e.addEventListener(t,n[0]=o=>s.call(e,n[1],o))}else e.addEventListener(t,n)}function wt(e,t,n={}){const r=Object.keys(t||{}),s=Object.keys(n);let o,i;for(o=0,i=s.length;o<i;o++){const l=s[o];!l||l==="undefined"||t[l]||(ve(e,l,!1),delete n[l])}for(o=0,i=r.length;o<i;o++){const l=r[o],c=!!t[l];!l||l==="undefined"||n[l]===c||!c||(ve(e,l,!0),n[l]=c)}return n}function pt(e,t,n){if(!t)return n?he(e,"style"):t;const r=e.style;if(typeof t=="string")return r.cssText=t;typeof n=="string"&&(r.cssText=n=void 0),n||(n={}),t||(t={});let s,o;for(o in n)t[o]==null&&r.removeProperty(o),delete n[o];for(o in t)s=t[o],s!==n[o]&&(r.setProperty(o,s),n[o]=s);return n}function bt(e,t={},n,r){const s={};return r||x(()=>s.children=B(e,t.children,s.children)),x(()=>t.ref&&t.ref(e)),x(()=>At(e,t,n,!0,s,!0)),s}function L(e,t,n,r){if(n!==void 0&&!r&&(r=[]),typeof t!="function")return B(e,t,r,n);x(s=>B(e,t(),s,n),r)}function At(e,t,n,r,s={},o=!1){t||(t={});for(const i in s)if(!(i in t)){if(i==="children")continue;s[i]=Se(e,i,null,s[i],n,o)}for(const i in t){if(i==="children"){r||B(e,t.children);continue}const l=t[i];s[i]=Se(e,i,l,s[i],n,o)}}function Pt(e){return e.toLowerCase().replace(/-([a-z])/g,(t,n)=>n.toUpperCase())}function ve(e,t,n){const r=t.trim().split(/\s+/);for(let s=0,o=r.length;s<o;s++)e.classList.toggle(r[s],n)}function Se(e,t,n,r,s,o){let i,l,c,f,u;if(t==="style")return pt(e,n,r);if(t==="classList")return wt(e,n,r);if(n===r)return r;if(t==="ref")o||n(e);else if(t.slice(0,3)==="on:"){const a=t.slice(3);r&&e.removeEventListener(a,r),n&&e.addEventListener(a,n)}else if(t.slice(0,10)==="oncapture:"){const a=t.slice(10);r&&e.removeEventListener(a,r,!0),n&&e.addEventListener(a,n,!0)}else if(t.slice(0,2)==="on"){const a=t.slice(2).toLowerCase(),h=ft.has(a);if(!h&&r){const p=Array.isArray(r)?r[0]:r;e.removeEventListener(a,p)}(h||n)&&(yt(e,a,n,h),h&&we([a]))}else if(t.slice(0,5)==="attr:")he(e,t.slice(5),n);else if((u=t.slice(0,5)==="prop:")||(c=lt.has(t))||!s&&((f=at(t,e.tagName))||(l=it.has(t)))||(i=e.nodeName.includes("-")))u&&(t=t.slice(5),l=!0),t==="class"||t==="className"?Be(e,n):i&&!l&&!c?e[Pt(t)]=n:e[f||t]=n;else{const a=s&&t.indexOf(":")>-1&&ht[t.split(":")[0]];a?mt(e,a,t,n):he(e,ct[t]||t,n)}return n}function vt(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}});n;){const r=n[t];if(r&&!n.disabled){const s=n[`${t}Data`];if(s!==void 0?r.call(n,s,e):r.call(n,e),e.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function B(e,t,n,r,s){for(;typeof n=="function";)n=n();if(t===n)return n;const o=typeof t,i=r!==void 0;if(e=i&&n[0]&&n[0].parentNode||e,o==="string"||o==="number")if(o==="number"&&(t=t.toString()),i){let l=n[0];l&&l.nodeType===3?l.data=t:l=document.createTextNode(t),n=k(e,n,r,l)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t;else if(t==null||o==="boolean")n=k(e,n,r);else{if(o==="function")return x(()=>{let l=t();for(;typeof l=="function";)l=l();n=B(e,l,n,r)}),()=>n;if(Array.isArray(t)){const l=[],c=n&&Array.isArray(n);if(de(l,t,n,s))return x(()=>n=B(e,l,n,r,!0)),()=>n;if(l.length===0){if(n=k(e,n,r),i)return n}else c?n.length===0?Ce(e,l,r):dt(e,n,l):(n&&k(e),Ce(e,l));n=l}else if(t.nodeType){if(Array.isArray(n)){if(i)return n=k(e,n,r,t);k(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function de(e,t,n,r){let s=!1;for(let o=0,i=t.length;o<i;o++){let l=t[o],c=n&&n[o],f;if(!(l==null||l===!0||l===!1))if((f=typeof l)=="object"&&l.nodeType)e.push(l);else if(Array.isArray(l))s=de(e,l,c)||s;else if(f==="function")if(r){for(;typeof l=="function";)l=l();s=de(e,Array.isArray(l)?l:[l],Array.isArray(c)?c:[c])||s}else e.push(l),s=!0;else{const u=String(l);c&&c.nodeType===3&&c.data===u?e.push(c):e.push(document.createTextNode(u))}}return s}function Ce(e,t,n=null){for(let r=0,s=t.length;r<s;r++)e.insertBefore(t[r],n)}function k(e,t,n,r){if(n===void 0)return e.textContent="";const s=r||document.createTextNode("");if(t.length){let o=!1;for(let i=t.length-1;i>=0;i--){const l=t[i];if(s!==l){const c=l.parentNode===e;!o&&!i?c?e.replaceChild(s,l):e.insertBefore(s,n):c&&l.remove()}else o=!0}}else e.insertBefore(s,n);return[s]}const St=!1;function Ct(e,t,n){return e.addEventListener(t,n),()=>e.removeEventListener(t,n)}function xt([e,t],n,r){return[n?()=>n(e()):e,r?s=>t(r(s)):t]}function Et(e){if(e==="#")return null;try{return document.querySelector(e)}catch{return null}}function $t(e,t){const n=Et(`#${e}`);n?n.scrollIntoView():t&&window.scrollTo(0,0)}function Ot(e,t,n,r){let s=!1;const o=l=>typeof l=="string"?{value:l}:l,i=xt(M(o(e()),{equals:(l,c)=>l.value===c.value}),void 0,l=>(!s&&t(l),l));return n&&Le(n((l=e())=>{s=!0,i[1](o(l)),s=!1})),{signal:i,utils:r}}function Lt(e){if(e){if(Array.isArray(e))return{signal:e}}else return{signal:M({value:""})};return e}function Nt(){return Ot(()=>({value:window.location.pathname+window.location.search+window.location.hash,state:history.state}),({value:e,replace:t,scroll:n,state:r})=>{t?window.history.replaceState(r,"",e):window.history.pushState(r,"",e),$t(window.location.hash.slice(1),n)},e=>Ct(window,"popstate",()=>e()),{go:e=>window.history.go(e)})}function _t(){let e=new Set;function t(s){return e.add(s),()=>e.delete(s)}let n=!1;function r(s,o){if(n)return!(n=!1);const i={to:s,options:o,defaultPrevented:!1,preventDefault:()=>i.defaultPrevented=!0};for(const l of e)l.listener({...i,from:l.location,retry:c=>{c&&(n=!0),l.navigate(s,o)}});return!i.defaultPrevented}return{subscribe:t,confirm:r}}const Rt=/^(?:[a-z0-9]+:)?\/\//i,Tt=/^\/+|(\/)\/+$/g;function _(e,t=!1){const n=e.replace(Tt,"$1");return n?t||/^[?#]/.test(n)?n:"/"+n:""}function G(e,t,n){if(Rt.test(t))return;const r=_(e),s=n&&_(n);let o="";return!s||t.startsWith("/")?o=r:s.toLowerCase().indexOf(r.toLowerCase())!==0?o=r+s:o=s,(o||"/")+_(t,!o)}function jt(e,t){if(e==null)throw new Error(t);return e}function De(e,t){return _(e).replace(/\/*(\*.*)?$/g,"")+_(t)}function It(e){const t={};return e.searchParams.forEach((n,r)=>{t[r]=n}),t}function kt(e,t,n){const[r,s]=e.split("/*",2),o=r.split("/").filter(Boolean),i=o.length;return l=>{const c=l.split("/").filter(Boolean),f=c.length-i;if(f<0||f>0&&s===void 0&&!t)return null;const u={path:i?"":"/",params:{}},a=h=>n===void 0?void 0:n[h];for(let h=0;h<i;h++){const p=o[h],A=c[h],w=p[0]===":",O=w?p.slice(1):p;if(w&&ce(A,a(O)))u.params[O]=A;else if(w||!ce(A,p))return null;u.path+=`/${A}`}if(s){const h=f?c.slice(-f).join("/"):"";if(ce(h,a(s)))u.params[s]=h;else return null}return u}}function ce(e,t){const n=r=>r.localeCompare(e,void 0,{sensitivity:"base"})===0;return t===void 0?!0:typeof t=="string"?n(t):typeof t=="function"?t(e):Array.isArray(t)?t.some(n):t instanceof RegExp?t.test(e):!1}function Mt(e){const[t,n]=e.pattern.split("/*",2),r=t.split("/").filter(Boolean);return r.reduce((s,o)=>s+(o.startsWith(":")?2:3),r.length-(n===void 0?0:1))}function qe(e){const t=new Map,n=Ge();return new Proxy({},{get(r,s){return t.has(s)||Qe(n,()=>t.set(s,b(()=>e()[s]))),t.get(s)()},getOwnPropertyDescriptor(){return{enumerable:!0,configurable:!0}},ownKeys(){return Reflect.ownKeys(e())}})}function Ke(e){let t=/(\/?\:[^\/]+)\?/.exec(e);if(!t)return[e];let n=e.slice(0,t.index),r=e.slice(t.index+t[0].length);const s=[n,n+=t[1]];for(;t=/^(\/\:[^\/]+)\?/.exec(r);)s.push(n+=t[1]),r=r.slice(t[0].length);return Ke(r).reduce((o,i)=>[...o,...s.map(l=>l+i)],[])}const Bt=100,Ue=Ne(),se=Ne(),oe=()=>jt(ge(Ue),"Make sure your app is wrapped in a <Router />");let F;const pe=()=>F||ge(se)||oe().base,Dt=e=>{const t=pe();return b(()=>t.resolvePath(e()))},qt=e=>{const t=oe();return b(()=>{const n=e();return n!==void 0?t.renderPath(n):n})},Kt=()=>oe().location;function Ut(e,t="",n){const{component:r,data:s,children:o}=e,i=!o||Array.isArray(o)&&!o.length,l={key:e,element:r?()=>P(r,{}):()=>{const{element:c}=e;return c===void 0&&n?P(n,{}):c},preload:e.component?r.preload:e.preload,data:s};return Fe(e.path).reduce((c,f)=>{for(const u of Ke(f)){const a=De(t,u),h=i?a:a.split("/*",1)[0];c.push({...l,originalPath:u,pattern:h,matcher:kt(h,!i,e.matchFilters)})}return c},[])}function Ft(e,t=0){return{routes:e,score:Mt(e[e.length-1])*1e4-t,matcher(n){const r=[];for(let s=e.length-1;s>=0;s--){const o=e[s],i=o.matcher(n);if(!i)return null;r.unshift({...i,route:o})}return r}}}function Fe(e){return Array.isArray(e)?e:[e]}function He(e,t="",n,r=[],s=[]){const o=Fe(e);for(let i=0,l=o.length;i<l;i++){const c=o[i];if(c&&typeof c=="object"&&c.hasOwnProperty("path")){const f=Ut(c,t,n);for(const u of f){r.push(u);const a=Array.isArray(c.children)&&c.children.length===0;if(c.children&&!a)He(c.children,u.pattern,n,r,s);else{const h=Ft([...r],s.length);s.push(h)}r.pop()}}}return r.length?s:s.sort((i,l)=>l.score-i.score)}function Ht(e,t){for(let n=0,r=e.length;n<r;n++){const s=e[n].matcher(t);if(s)return s}return[]}function Wt(e,t){const n=new URL("http://sar"),r=b(c=>{const f=e();try{return new URL(f,n)}catch{return console.error(`Invalid path ${f}`),c}},n,{equals:(c,f)=>c.href===f.href}),s=b(()=>r().pathname),o=b(()=>r().search,!0),i=b(()=>r().hash),l=b(()=>"");return{get pathname(){return s()},get search(){return o()},get hash(){return i()},get state(){return t()},get key(){return l()},query:qe(Oe(o,()=>It(r())))}}function Vt(e,t="",n,r){const{signal:[s,o],utils:i={}}=Lt(e),l=i.parsePath||(y=>y),c=i.renderPath||(y=>y),f=i.beforeLeave||_t(),u=G("",t),a=void 0;if(u===void 0)throw new Error(`${u} is not a valid base path`);u&&!s().value&&o({value:u,replace:!0,scroll:!1});const[h,p]=M(!1),A=async y=>{p(!0);try{await Ye(y)}finally{p(!1)}},[w,O]=M(s().value),[j,H]=M(s().state),W=Wt(w,j),q=[],I={pattern:u,params:{},path:()=>u,outlet:()=>null,resolvePath(y){return G(u,y)}};if(n)try{F=I,I.data=n({data:void 0,params:{},location:W,navigate:Ae(I)})}finally{F=void 0}function be(y,g,v){C(()=>{if(typeof g=="number"){g&&(i.go?f.confirm(g,v)&&i.go(g):console.warn("Router integration does not support relative routing"));return}const{replace:V,resolve:X,scroll:E,state:K}={replace:!1,resolve:!0,scroll:!0,...v},$=X?y.resolvePath(g):G("",g);if($===void 0)throw new Error(`Path '${g}' is not a routable path`);if(q.length>=Bt)throw new Error("Too many redirects");const U=w();if(($!==U||K!==j())&&!St){if(f.confirm($,v)){const Ve=q.push({value:U,replace:V,scroll:E,state:j()});A(()=>{O($),H(K)}).then(()=>{q.length===Ve&&We({value:$,state:K})})}}})}function Ae(y){return y=y||ge(se)||I,(g,v)=>be(y,g,v)}function We(y){const g=q[0];g&&((y.value!==g.value||y.state!==g.state)&&o({...y,replace:g.replace,scroll:g.scroll}),q.length=0)}x(()=>{const{value:y,state:g}=s();C(()=>{y!==w()&&A(()=>{O(y),H(g)})})});{let y=function(g){if(g.defaultPrevented||g.button!==0||g.metaKey||g.altKey||g.ctrlKey||g.shiftKey)return;const v=g.composedPath().find(U=>U instanceof Node&&U.nodeName.toUpperCase()==="A");if(!v||!v.hasAttribute("link"))return;const V=v.href;if(v.target||!V&&!v.hasAttribute("state"))return;const X=(v.getAttribute("rel")||"").split(/\s+/);if(v.hasAttribute("download")||X&&X.includes("external"))return;const E=new URL(V);if(E.origin!==window.location.origin||u&&E.pathname&&!E.pathname.toLowerCase().startsWith(u.toLowerCase()))return;const K=l(E.pathname+E.search+E.hash),$=v.getAttribute("state");g.preventDefault(),be(I,K,{resolve:!1,replace:v.hasAttribute("replace"),scroll:!v.hasAttribute("noscroll"),state:$&&JSON.parse($)})};var fn=y;we(["click"]),document.addEventListener("click",y),Le(()=>document.removeEventListener("click",y))}return{base:I,out:a,location:W,isRouting:h,renderPath:c,parsePath:l,navigatorFactory:Ae,beforeLeave:f}}function Xt(e,t,n,r,s){const{base:o,location:i,navigatorFactory:l}=e,{pattern:c,element:f,preload:u,data:a}=r().route,h=b(()=>r().path);u&&u();const p={parent:t,pattern:c,get child(){return n()},path:h,params:s,data:t.data,outlet:f,resolvePath(A){return G(o.path(),A,h())}};if(a)try{F=p,p.data=a({data:t.data,params:s,location:i,navigate:l(p)})}finally{F=void 0}return p}const Jt=D("<a link>"),Gt=e=>{const{source:t,url:n,base:r,data:s,out:o}=e,i=t||Nt(),l=Vt(i,r,s);return P(Ue.Provider,{value:l,get children(){return e.children}})},Qt=e=>{const t=oe(),n=pe(),r=me(()=>e.children),s=b(()=>He(r(),De(n.pattern,e.base||""),Yt)),o=b(()=>Ht(s(),t.location.pathname)),i=qe(()=>{const u=o(),a={};for(let h=0;h<u.length;h++)Object.assign(a,u[h].params);return a});t.out&&t.out.matches.push(o().map(({route:u,path:a,params:h})=>({originalPath:u.originalPath,pattern:u.pattern,path:a,params:h})));const l=[];let c;const f=b(Oe(o,(u,a,h)=>{let p=a&&u.length===a.length;const A=[];for(let w=0,O=u.length;w<O;w++){const j=a&&a[w],H=u[w];h&&j&&H.route.key===j.route.key?A[w]=h[w]:(p=!1,l[w]&&l[w](),$e(W=>{l[w]=W,A[w]=Xt(t,A[w-1]||n,()=>f()[w+1],()=>o()[w],i)}))}return l.splice(u.length).forEach(w=>w()),h&&p?h:(c=A[0],A)}));return P(Me,{get when(){return f()&&c},keyed:!0,children:u=>P(se.Provider,{value:u,get children(){return u.outlet()}})})},xe=e=>{const t=me(()=>e.children);return fe(e,{get children(){return t()}})},Yt=()=>{const e=pe();return P(Me,{get when(){return e.child},keyed:!0,children:t=>P(se.Provider,{value:t,get children(){return t.outlet()}})})};function Q(e){e=fe({inactiveClass:"inactive",activeClass:"active"},e);const[,t]=rt(e,["href","state","class","activeClass","inactiveClass","end"]),n=Dt(()=>e.href),r=qt(n),s=Kt(),o=b(()=>{const i=n();if(i===void 0)return!1;const l=_(i.split(/[?#]/,1)[0]).toLowerCase(),c=_(s.pathname).toLowerCase();return e.end?l===c:c.startsWith(l)});return(()=>{const i=Jt();return bt(i,fe(t,{get href(){return r()||e.href},get state(){return JSON.stringify(e.state)},get classList(){return{...e.class&&{[e.class]:!0},[e.inactiveClass]:!o(),[e.activeClass]:o(),...t.classList}},get"aria-current"(){return o()?"page":void 0}}),!1,!1),i})()}const zt=D("<h1>Welcome to my Portfolio site!"),Zt=D(`<div><button>count is </button><p>Welcome to my page! Here's some code: <code>console.log("Hello world!")`);function en(){const[e,t]=M(0);return[zt(),(()=>{const n=Zt(),r=n.firstChild;return r.firstChild,r.$$click=()=>t(s=>s+1),L(r,e,null),n})()]}we(["click"]);const tn=D("<h1>404"),nn=D("<p>Quit snooping around, please stay on <!>!"),rn=()=>[tn(),(()=>{const e=nn(),t=e.firstChild,n=t.nextSibling;return n.nextSibling,L(e,P(Q,{href:"/",children:"the trail"}),n),e})()],sn="_main_v0clj_1",on="_home_v0clj_67";const ln=D("<div><div><header><nav></nav></header><main><div></div></main><footer>© Jordan Kovacs"),cn=e=>(()=>{const t=ln(),n=t.firstChild,r=n.firstChild,s=r.firstChild,o=r.nextSibling,i=o.firstChild;return L(r,P(Q,{href:"",get class(){return on},children:"Jordan Kovacs"}),s),L(s,P(Q,{href:"about",children:"About Me"}),null),L(s,P(Q,{href:"cv",children:"CV"}),null),L(i,()=>e.children),x(()=>Be(t,sn)),t})();function un(){const e=window.location.pathname,t=sessionStorage.getItem("u");return t&&(sessionStorage.removeItem("u"),window.history.replaceState(null,"",t)),P(Gt,{get children(){return P(cn,{get children(){return P(Qt,{get base(){return e},get children(){return[P(xe,{path:"/",component:en}),P(xe,{path:"/*",component:rn})]}})}})}})}const an=document.getElementById("root");gt(()=>P(un,{}),an);
