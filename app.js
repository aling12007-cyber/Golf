(function(){
  const menuBtn=document.getElementById("menuBtn"),moreBtn=document.getElementById("moreBtn"),menu=document.getElementById("menuPanel"),more=document.getElementById("morePanel");
  function close(){menu&&menu.classList.remove("open");more&&more.classList.remove("open");}
  if(menuBtn&&moreBtn&&menu&&more){menuBtn.addEventListener("click",function(e){e.stopPropagation();more.classList.remove("open");menu.classList.toggle("open");});moreBtn.addEventListener("click",function(e){e.stopPropagation();menu.classList.remove("open");more.classList.toggle("open");});document.addEventListener("click",close);menu.addEventListener("click",close);more.addEventListener("click",function(e){e.stopPropagation();});}
  const tabs=[].slice.call(document.querySelectorAll("#tabs a")); const sections=tabs.map(function(a){return document.querySelector(a.getAttribute("href"));}); let current=-1,ticking=false;
  function sync(){ticking=false;let index=0,offset=window.scrollY+window.innerHeight*.24;sections.forEach(function(s,i){if(s&&s.offsetTop<=offset)index=i;});if(index===current)return;current=index;tabs.forEach(function(a,i){a.classList.toggle("active",i===index);}); const t=tabs[index]; if(t)t.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"});}
  function onScroll(){if(!ticking){requestAnimationFrame(sync);ticking=true;}}
  window.addEventListener("scroll",onScroll,{passive:true});window.addEventListener("resize",onScroll);sync();
})();
