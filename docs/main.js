(()=>{"use strict";function t(t){localStorage.setItem("library",JSON.stringify(t))}function e(){if(localStorage.library){let t=localStorage.getItem("library");return t=JSON.parse(t),t}return[]}function n(t){return(t=t.toLowerCase()).replace(/(^|\s)\S/g,(function(t){return t.toUpperCase()}))}function i(t){return t.replace(/\D/g,"")}function r(t,e=!1){e?(t.innerHTML="check_circle_outline",t.setAttribute("title","Mark as Unread")):(t.innerHTML="visibility",t.setAttribute("title","Mark as Complete"))}class o{constructor(t,e,i,r=!1){this.title=n(t),this.author=n(e),this.pages_total=i,this.pages_read=0,this.rating=0,this.categories=[],this.complete=r}}function a(t){for(let e=0;e<t.length;e++)if(console.log(t[e].value),""==t[e].value)return t[e].classList.add("invalid"),!1;return!0}function l(){let n=i(this.id),r=e();r.splice(n,1),t(r),E()}function c(){const n=Array.from(document.getElementById("newBookForm").querySelectorAll("input"));if(n.slice(0,3),!a(n))return;const i=new o(n[0].value,n[1].value,n[2].value,n[3].checked);let r=e();r.push(i),t(r),E()}function s(t){const n=e();let r=i(t),o=n[r];const a=document.getElementById(`tag container ${r}`);a.querySelectorAll(".tag").forEach((t=>{t.parentElement.removeChild(t)})),o.categories.slice().reverse().forEach((t=>{a.prepend(function(t){const e=document.createElement("div");e.setAttribute("class","tag");const n=document.createElement("span");n.innerHTML=t;const i=document.createElement("i");return i.innerHTML="close",i.setAttribute("class","material-icons"),i.setAttribute("id",t),i.addEventListener("click",d),e.appendChild(n),e.appendChild(i),e}(t))}))}function d(n){const r=e(),o=i(n.target.parentNode.parentNode.id),a=r[o];let l=a.categories.indexOf(n.target.id);a.categories.splice(l,1),t(r),s(o)}function u(n){if(""!=n.target.value&&"Enter"===n.key){const r=e(),o=i(n.target.id);n.target.value.split(",").forEach((e=>{r[o].categories.push(e),t(r)})),s(n.target.id),n.target.value=""}}function p(){let t=i(this.id);const e=document.getElementById(`card ${t}`);e.querySelector(".cardFace").style.display="none";const n=document.createElement("div");n.setAttribute("class","tag-edit-container"),n.setAttribute("id",`tag edit container ${t}`);const r=document.createElement("div");r.setAttribute("class","tag-container"),r.setAttribute("id",`tag container ${t}`);const o=document.createElement("input");o.setAttribute("id",`tag input ${t}`),r.appendChild(o),o.addEventListener("keyup",u);const a=document.createElement("i");a.setAttribute("type","button"),a.innerHTML="done",a.setAttribute("title","Done"),a.setAttribute("class","material-icons-round doneButton"),a.setAttribute("id",`finish tagging ${t}`),a.addEventListener("click",(()=>{e.querySelector(".cardFace").style.display="block";let t=i(this.id);document.getElementById(`tag edit container ${t}`).remove(),document.getElementById(`finish tagging ${t}`).remove()})),n.appendChild(r),e.append(n,a),s(t),o.focus()}function m(){let n=i(this.id),o=e(),a=o[n];a.complete=!a.complete,t(o),r(document.getElementById(this.id),a.complete)}function b(){let n=i(this.id),r=e(),o=r[n];const l=document.getElementById(`card ${n}`),c=l.querySelector(".content"),s=document.getElementById(`update-input-field${n}`).querySelectorAll("input");a(s)&&(o.title=s[0].value,c.querySelector(".bookTitle").innerHTML=`"${o.title}"`,c.querySelector(".bookTitle").title=`Title: "${o.title}"`,o.author=s[1].value,c.querySelector(".bookAuthor").innerHTML=o.author,c.querySelector(".bookAuthor").title=`Author: "${o.author}"`,o.pages_total=s[2].value,t(r),document.getElementById(`update-input-field${n}`).remove(),l.querySelector(".cardFace").style.display="block")}function A(){let n=i(this.id),r=e();const o=r[n];let a=parseInt(prompt("What page are you on?"));a>=o.pages_total&&(a=o.pages_total),a<0|!a||(o.pages_read=a,t(r),E())}function h(n){let r=i(this.id),o=e();const a=o[r],l=document.getElementById(`rating ${r}`).querySelector(".rating");l.style.width=n.layerX+"%",a.rating=n.layerX,l.title=a.rating/20*10/10+" stars",t(o)}function g(){let t=i(this.id),n=e()[t];const r=document.getElementById(`card ${t}`);r.querySelector(".cardFace").style.display="none";const o=function(t,e,n){const r=document.createElement("form");r.setAttribute("class","editForm"),r.id=`update-input-field${t}`;const o=document.createElement("input");o.setAttribute("value",e.title),o.setAttribute("type","text"),o.setAttribute("name","Edit Title"),o.setAttribute("oninput","classList.remove('invalid');"),r.appendChild(o);const a=document.createElement("input");a.setAttribute("value",e.author),a.setAttribute("type","text"),a.setAttribute("name","Edit Author"),a.setAttribute("oninput","classList.remove('invalid');"),r.appendChild(a);const l=document.createElement("input");l.setAttribute("value",e.pages_total),l.setAttribute("type","number"),l.setAttribute("name","Edit Total Pages"),l.setAttribute("min","1"),l.setAttribute("oninput","validity.valid||(value='');"),l.setAttribute("oninput","classList.remove('invalid');"),r.appendChild(l);const c=document.createElement("div");c.setAttribute("class","buttonDiv");const s=document.createElement("i");s.setAttribute("type","button"),s.setAttribute("class","material-icons-round"),s.setAttribute("id",`update ${t}`),s.innerHTML="done",s.addEventListener("click",b),c.appendChild(s);const d=document.createElement("i");return d.setAttribute("type","button"),d.setAttribute("class","material-icons-round"),d.innerHTML="close",d.formNoValidate=!0,d.addEventListener("click",(t=>{n.querySelector(".cardFace").style.display="initial";let e=i(n.id);document.querySelector(`#update-input-field${e}`).remove()})),c.appendChild(d),r.appendChild(c),r}(t,n,r);r.appendChild(o)}function y(t,e){const n=document.createElement("div");n.title=t.title,n.id=`card ${e}`,n.className="card";const i=document.createElement("container");i.className="cardFace";const o=document.createElement("div");o.className="content";const a=document.createElement("progress");a.setAttribute("max",t.pages_total),a.setAttribute("id",`progress ${e}`),a.setAttribute("value",t.pages_read),a.setAttribute("title",`You're on page ${t.pages_read} out of ${t.pages_total}.`),a.addEventListener("click",A),o.appendChild(a);const c=document.createElement("div");c.className="rating-box",c.title=t.rating/20*10/10+" stars";const s=document.createElement("div");s.className="rating",s.style.width=t.rating+"%",c.setAttribute("id",`rating ${e}`),c.addEventListener("click",h),c.appendChild(s),o.appendChild(c);const d=document.createElement("p");d.textContent=`"${t.title}"`,d.title=`Title: "${t.title}"`,d.setAttribute("class","bookTitle"),o.appendChild(d);const u=document.createElement("p");u.textContent=t.author,u.title=`Author: "${t.author}"`,u.setAttribute("class","bookAuthor"),o.appendChild(u),i.appendChild(o);const b=document.createElement("div");b.setAttribute("class","cardButtons");const y=document.createElement("i");y.innerHTML="delete_forever",y.setAttribute("title","Remove book from library"),y.setAttribute("class","material-icons-round deleteButton"),y.setAttribute("id",`remove ${e}`),y.addEventListener("click",l),b.appendChild(y),b.appendChild(function(t){const e=document.createElement("i");return e.innerHTML="label",e.setAttribute("title","Add tags"),e.setAttribute("class","material-icons-round tagButton"),e.setAttribute("id",`tag ${t}`),e.addEventListener("click",p),e}(e));const E=document.createElement("i");E.innerHTML="create",E.setAttribute("title","Edit book details"),E.setAttribute("class","material-icons-round editButton"),E.setAttribute("id",`edit ${e}`),E.addEventListener("click",g),b.appendChild(E);const v=function(t){const e=document.createElement("i");return e.setAttribute("class","material-icons-round completeButton"),e.setAttribute("id",`complete ${t}`),e.addEventListener("click",m),e}(e);return r(v,t.complete),b.appendChild(v),i.appendChild(b),n.appendChild(i),n}function E(){let t=e();document.querySelector("main").innerHTML="",v(t)}function v(t){const e=document.querySelector("main");e.appendChild(function(){const t=document.createElement("div");t.className="card",t.id="newBookForm";const e=document.createElement("i");e.setAttribute("type","button"),e.setAttribute("title","Add new book to Library"),e.setAttribute("id","addNewButton"),e.setAttribute("class","material-icons-round"),e.innerHTML="add",e.addEventListener("click",(()=>{document.querySelector("#input-field").style.display="initial",e.style.display="none",i.focus()})),t.appendChild(e);const n=document.createElement("form");n.id="input-field";const i=document.createElement("input");i.setAttribute("placeholder","Book Title"),i.setAttribute("id","title"),i.setAttribute("type","text"),i.setAttribute("name","title"),i.setAttribute("oninput","classList.remove('invalid');"),n.appendChild(i);const r=document.createElement("input");r.setAttribute("placeholder","Author"),r.setAttribute("id","author"),r.setAttribute("type","text"),r.setAttribute("name","author"),r.setAttribute("oninput","classList.remove('invalid');"),n.appendChild(r);const o=document.createElement("input");o.setAttribute("placeholder","Page count"),o.setAttribute("id","bookLength"),o.setAttribute("type","number"),o.setAttribute("name","bookLength"),o.setAttribute("min","1"),o.setAttribute("oninput","validity.valid||(value='');"),o.setAttribute("oninput","classList.remove('invalid');"),n.appendChild(o);const a=document.createElement("div");a.setAttribute("class","form-group");const l=document.createElement("input");l.setAttribute("id","completed"),l.setAttribute("type","checkbox"),l.setAttribute("name","completed"),a.appendChild(l);const s=document.createElement("label");s.textContent="Completed?",s.setAttribute("for","completed"),a.appendChild(s),n.appendChild(a);const d=document.createElement("div");d.setAttribute("class","buttonDiv");const u=document.createElement("i");u.setAttribute("type","button"),u.setAttribute("id","submit"),u.setAttribute("class","material-icons-round"),u.innerHTML="done",u.addEventListener("click",c),d.appendChild(u);const p=document.createElement("i");return p.setAttribute("type","button"),p.setAttribute("id","cancel"),p.setAttribute("class","material-icons-round"),p.innerHTML="close",p.formNoValidate=!0,p.addEventListener("click",(()=>{document.querySelector("#addNewButton").style.display="block",document.querySelector("#input-field").style.display="none",function(){const t=document.getElementById("newBookForm").querySelectorAll("input");for(let e=0;e<t.length-1;e++)t[e].value="",t[t.length-1].checked=!1}()})),d.appendChild(p),n.appendChild(d),t.appendChild(n),t}());for(let n=0;n<t.length;n++){let i=y(t[n],n);e.appendChild(i)}}v(e())})();