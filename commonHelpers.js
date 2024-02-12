import{S as l,i as d}from"./assets/vendor-7659544d.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&t(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const u=new l(".gallery a"),c=document.querySelector(".gallery");async function f(n){const r=`https://pixabay.com/api/?key=42262858-7b31826aafbc45fb5436f2ee9&q=${encodeURIComponent(n)}&image_type=photo&orientation=horizontal&safesearch=true`;try{const t=await fetch(r);if(!t.ok)throw new Error("An error occurred while making the request.");const e=await t.json();e.hits.length===0?a("Sorry, there are no images matching your search query. Please try again!"):p(e.hits)}catch(t){console.error("Error:",t.message),a(`Error fetching images: ${t}`)}}function p(n){c.innerHTML="",n.map(r=>{const t=document.createElement("div");return t.classList.add("card"),t.innerHTML=`
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
        `,t}).forEach(r=>{c.appendChild(r)}),u.refresh()}function a(n){d.error({title:"Error",message:n,backgroundColor:"#EF4040",progressBarColor:"#FFE0AC",icon:"icon-close",position:"topRight",displayMode:"replace",closeOnEscape:!0,pauseOnHover:!1,maxWidth:432,messageSize:"16px",messageLineHeight:"24px"})}function m(){document.querySelector(".search-form").addEventListener("submit",async function(s){s.preventDefault();const r=s.target.elements.query.value.trim();if(r===""){a("Please enter a search query.");return}try{await f(r)}catch(t){console.error("Error:",t.message),a(`Error searching images: ${t}`)}})}document.addEventListener("DOMContentLoaded",function(){m()});
//# sourceMappingURL=commonHelpers.js.map
