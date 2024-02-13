import{S as u,i as f}from"./assets/vendor-7659544d.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&t(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const m=new u(".gallery a"),c=document.querySelector(".gallery"),l=document.querySelector(".loader"),d=document.querySelector(".search-form");async function p(s){g();const r=`https://pixabay.com/api/?key=42262858-7b31826aafbc45fb5436f2ee9&q=${encodeURIComponent(s)}&image_type=photo&orientation=horizontal&safesearch=true`;try{const t=await fetch(r);if(!t.ok)throw new Error("An error occurred while making the request.");const e=await t.json();e.hits.length===0?a("Sorry, there are no images matching your search query. Please try again!"):(h(e.hits),L())}catch(t){console.error("Error:",t.message),a(`Error fetching images: ${t}`)}finally{y()}}function h(s){c.innerHTML="",s.map(r=>{const t=document.createElement("div");return t.classList.add("card"),t.innerHTML=`
            <a href="${r.largeImageURL}">
                <img src="${r.webformatURL}" alt="${r.tags}" title="${r.tags}">
            </a>
            <div class="overlay">
                <div class="details">
                    <p>Likes: ${r.likes}</p>
                    <p>Views: ${r.views}</p>
                    <p>Comments: ${r.comments}</p>
                    <p>Downloads: ${r.downloads}</p>
                </div>
            </div>
        `,t}).forEach(r=>{c.appendChild(r)}),m.refresh()}function a(s){f.error({title:"Error",message:s,backgroundColor:"#EF4040",progressBarColor:"#FFE0AC",icon:"icon-close",position:"topRight",displayMode:"replace",closeOnEscape:!0,pauseOnHover:!1,maxWidth:432,messageSize:"16px",messageLineHeight:"24px"})}function g(){l.classList.remove("hidden")}function y(){l.classList.add("hidden")}function L(){d.reset()}function E(){d.addEventListener("submit",async function(s){s.preventDefault();const n=s.target.elements.query.value.trim();if(n===""){a("Please enter a search query.");return}try{await p(n)}catch(r){console.error("Error:",r.message),a(`Error searching images: ${r}`)}})}document.addEventListener("DOMContentLoaded",function(){E()});
//# sourceMappingURL=commonHelpers.js.map
